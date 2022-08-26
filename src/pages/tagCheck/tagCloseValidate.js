import * as monaco from 'monaco-editor';

const sendData = (html) => {
  return new Promise((resolve, reject) => {
    var formData = new FormData();
    formData.append('out', 'json'); // xhtml会提示错误，但不能识别css，json可以识别css错误
    formData.append('parser', 'none');
    formData.append('level', 'error');
    // formData.append("css", "yes");
    formData.append('content', html);
    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        const response = JSON.parse(req.responseText);
        resolve(response)
      }
    };
    // req.open("post", "http://html5.validator.nu/", true);
    req.open('post', 'http://validator.w3.org/nu/', true);

    req.send(formData);
  });
};
async function validate(model) {
  const res = await sendData(model.getValue());
  const markers = [];
  res.messages.forEach(m => {
    if(m.message.indexOf('Unclosed element') > -1){
        markers.push({
            message: '标签未闭合',
            severity: monaco.MarkerSeverity.Error,
            startLineNumber: m.lastLine,
            startColumn: m.firstColumn,
            endLineNumber: m.lastLine,
            endColumn: m.lastColumn,
        })
    }
  })

  monaco.editor.setModelMarkers(model, 'owner', markers);
}

export default validate;
