import React, { memo, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./index.module.less";
import * as monaco from "monaco-editor";
import registerCompletionItemProvider from './autoclose';

// 注册标签自动补全插件
registerCompletionItemProvider(monaco)

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
    <div className={styles.container}>
      <div className={styles.header}>回车或者tab键自动闭合</div>
      <div className={styles.editor} ref={editorCountainerRef}></div>
    </div>
  );
});

export default CodeEditor;
