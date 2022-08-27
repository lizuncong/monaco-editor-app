// import { Registry } from 'monaco-editor/esm/vs/platform/registry/common/platform'
// const colors = Registry.data.get('base.contributions.colors').colorSchema.properties

// Object.keys(colors).forEach(function (key) {
//     var val = colors[key];
//     console.log('//' + val.description + '\n' + key);
// })
const defineTheme = (monaco) => {

    monaco.editor.defineTheme("myTheme", {
        base: "vs",
        inherit: true,
        rules: [{ background: "EDF9FA" }],
        colors: {
            // "editor.foreground": "#ff0000",
            // "editor.background": "#ff0000",
            // "editorCursor.foreground": "red",
            "editor.lineHighlightBackground": "#ffff00", // 黄色
            "editorGutter.background": "#ffc0cb", // 粉色
            "editorLineNumber.activeForeground": "#ff0000", // 红色
            // "editorLineNumber.foreground": "red", // 不支持传 red或者pink等这种参数，要传16进制的
            // "editor.selectionBackground": "pink",
            // "editor.inactiveSelectionBackground": "yellow",
        },
    });
    monaco.editor.setTheme("myTheme");
};


export default defineTheme