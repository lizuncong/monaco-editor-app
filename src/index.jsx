import React, { memo, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as monaco from "monaco-editor";

const defaultCode = `
<style>
.zoom {
overflow: hidden;
margin: 0 auto;
}
.zoom img {
width: 100%;
transition: 0.9s all ease-in-out;
cursor: pointer;
}
.zoom:hover img {
transform: scale(1.2);
}
.modal-fullscreen{
width:40vw !important;
max-width:none;
height:100%;
margin:0;
margin-right: 0 !important;
}
</style><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<div id="app"><!-- Gallery -->
<div class="container mx-auto"><!-- Header -->
<div class="text-center">
<h1>Find Your Inspiration.</h1>
<p>Browse lifestyle photos for inspiration.</p>
</div>
<!-- Photo Grid -->
<div class="row">
<div class="col">
<div class="my-4 zoom"><img style="width: 100%;" /></div>
</div>
</div>
</div>
<!-- Modal -->
<div id="myModal" class="modal fade" tabindex="-1" data-bs-keyboard="true" aria-hidden="true">
<div class="modal-dialog modal-fullscreen">
<div class="modal-content">
<div class="modal-header">
<h5 id="staticBackdropLabel" class="modal-title">Details</h5>
<button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
<div class="bg-white border-bottom pb-4">
<div class="modal-body overflow-hidden mb-3" style="padding-left: 0 !important; padding-right: 0 !important; padding-top: 0 !important;"><img class="w-100" /></div>
<div class="p-3 fs-5 border-bottom">{{ description }}</div>
<div class="p-3">
<div class="row">
<div>
<div class="col-12 col-md-8"><img class="w-100" /></div>
<div class="col-12 col-md-3 my-3"><a class="btn btn-outline-dark">Buy now</a></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
<script src="https://s3.ehomeinc.com/gallery.js"></script>
`;

const CodeEditor = memo(() => {
  const editorCountainerRef = useRef(null);
  const subscriptionRef = useRef(null);
  let editorRef = useRef(null);
  useEffect(() => {
    if (editorCountainerRef.current) {
      editorRef.current = monaco.editor.create(editorCountainerRef.current, {
        value: defaultCode,
        language: "html",
        formatOnPaste: true,
        formatOnType: true,
      });
    }
    return () => {
      editorRef.current.dispose();
    };
  }, [editorCountainerRef]);
  // 监听内容变化
  useEffect(() => {
    subscriptionRef.current = editorRef.current.onDidChangeModelContent(
      (value) => {
        console.log("onchagne...", editorRef.current.getValue());
      }
    );
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.dispose();
      }
    };
  }, []);

  return (
    <div
      onKeyDown={(e) => {
        const keyCode = event.keyCode || event.which || event.charCode;
        const keyCombination = event.ctrlKey;
        if (keyCode === 83 && keyCombination) {
          editorRef.current.trigger("editor", "editor.action.formatDocument");
        }
      }}
    >
      <button
        onClick={() => {
          editorRef.current.colorizeElement(document.getElementById("code"));

          // editorRef.current.trigger("editor", "editor.action.formatDocument");
        }}
      >
        格式化
      </button>
      <div style={{ height: "500px" }} ref={editorCountainerRef}></div>
    </div>
  );
});

ReactDOM.render(<CodeEditor />, document.getElementById("root"));
