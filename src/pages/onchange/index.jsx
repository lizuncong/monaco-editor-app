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
  const subscriptionRef = useRef(null);
  let editorRef = useRef(null);
  const debounceRef = useRef({
    changeTimerId: null,
  });
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

  useEffect(() => {
    // 监听文本内容变化
    subscriptionRef.current = editorRef.current.onDidChangeModelContent(
      (value) => {
        if (debounceRef.current.changeTimerId) {
          clearTimeout(debounceRef.current.changeTimerId);
        }
        debounceRef.current.changeTimerId = setTimeout(() => {
          console.log("value change：", editorRef.current.getValue());
        }, 300);
      }
    );
    return () => {
      subscriptionRef.current.dispose();
      subscriptionRef.current = null;
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>监听内容变化</div>
      <div className={styles.editor} ref={editorCountainerRef}></div>
    </div>
  );
});

export default CodeEditor;
