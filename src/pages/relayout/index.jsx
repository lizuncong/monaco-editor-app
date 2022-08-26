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
  const editorCountainerRef = useRef(null);
  let editorRef = useRef(null);
  const debounceRef = useRef({
    layoutTimerId: null,
  });
  useEffect(() => {
    if (editorCountainerRef.current) {
      editorRef.current = monaco.editor.create(editorCountainerRef.current, {
        value: defaultCode,
        language: "html",
        // automaticLayout: true, // 不建议打开，影响性能
      });
    }
    return () => {
      editorRef.current.dispose();
    };
  }, [editorCountainerRef]);

  useEffect(() => {
    // 原本也可以通过打开这个automaticLayout属性自动重排，但这个属性会影响性能
    const reLayout = () => {
      if (debounceRef.current.layoutTimerId) {
        clearTimeout(debounceRef.current.layoutTimerId);
      }
      debounceRef.current.layoutTimerId = setTimeout(() => {
        editorRef.current.layout();
      }, 300);
    };
    window.addEventListener("resize", reLayout);
    return () => {
      window.removeEventListener("resize", reLayout);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>可以使用ctrl + s快捷键格式化</div>
      <div className={styles.editor} ref={editorCountainerRef}></div>
    </div>
  );
});

export default CodeEditor;
