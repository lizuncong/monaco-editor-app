import React, { memo, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./index.module.less";
import tagCloseValidate from "./tagCloseValidate";
import * as monaco from "monaco-editor";

const defaultCode = `
<div>hello world</div>
`;

const CodeEditor = memo(() => {
  const editorCountainerRef = useRef(null);
  let editorRef = useRef(null);
  const subscriptionRef = useRef(null);
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
          tagCloseValidate(editorRef.current.getModel());
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
      <div className={styles.header}>HTML标签未闭合会一直提示，直到修复</div>
      <div className={styles.editor} ref={editorCountainerRef}></div>
    </div>
  );
});

export default CodeEditor;
