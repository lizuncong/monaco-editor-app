import React, { memo, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./index.module.less";
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
</style>
`;

const CodeEditor = memo(() => {
  const [language, setLanguage] = useState("html");
  const editorCountainerRef = useRef(null);
  let editorRef = useRef(null);
  useEffect(() => {
    if (editorCountainerRef.current) {
      editorRef.current = monaco.editor.create(editorCountainerRef.current, {
        value: defaultCode,
        language: "html",
      });
    }
    return () => {
      editorRef.current.dispose();
    };
  }, [editorCountainerRef]);

  return (
    <div
      className={styles.format}
      onKeyDown={(e) => {
        const keyCode = event.keyCode || event.which || event.charCode;
        const keyCombination = event.ctrlKey;
        if (keyCode === 83 && keyCombination) {
          editorRef.current.trigger("editor", "editor.action.formatDocument");
        }
      }}
    >
      <div className={styles.header}>可以使用ctrl + s快捷键格式化</div>
      <div className={styles.editor} ref={editorCountainerRef}></div>
    </div>
  );
});

export default CodeEditor;
