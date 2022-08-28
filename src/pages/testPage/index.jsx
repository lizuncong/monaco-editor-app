import React, { memo, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./index.module.less";
import * as monaco from "monaco-editor";

// 注册标签自动补全插件


const defaultCode = `
<style>
.maga {
  overflow: hidden;
  margin: 0 auto;
}
.maga img {
  width: 100%;
  transition: 0.9s all ease-in-out;
  cursor: pointer;
}
.maga:hover img {
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
        foldingStrategy: 'indentation', // 折叠代码
        snippetSuggestions: 'top',
        language: "css",
        autoIndent: 'full',
      });
    }
    return () => {
      editorRef.current.dispose();
    };
  }, [editorCountainerRef]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>折叠代码配置</div>
      <div className={styles.editor} ref={editorCountainerRef}></div>
    </div>
  );
});

export default CodeEditor;
