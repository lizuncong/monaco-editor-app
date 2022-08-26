// 标签闭合插件
const register = (monaco) => {
  monaco.languages.registerCompletionItemProvider("html", {
    provideCompletionItems: (model, position) => {
      let suggestions =
        "div,script,style,html,body,head,title,p,span,h1,h2,h3,h4,h5,h6,b,strong,i,em,center,ul,ol,li,font,sub,sup,table,tbody,thead,th,tr,td,form"
          .split(",")
          .map((symbol) => {
            return {
              label: symbol,
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `<${symbol}>$0</${symbol}>`,
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "AUTO CLOSE",
            };
          });

      const selfCloseTags = "meta".split(",").map((symbol) => {
        return {
          label: symbol,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: `<${symbol} />$0`,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "AUTO CLOSE",
        };
      });
      suggestions.push({
        label: "img",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: `<img src="$0" alt="" />`,
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "AUTO CLOSE",
      });
      suggestions.push({
        label: "iframe",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: `<iframe src="$0" frameborder="0"></iframe>`,
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "AUTO CLOSE",
      });
      suggestions.push({
        label: "link",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: `<link rel="stylesheet" href="$0" />`,
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "AUTO CLOSE",
      });
      suggestions.push({
        label: "a",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: `<a href="$0"></a>`,
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "AUTO CLOSE",
      });
      suggestions.push({
        label: "input",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: `<input type="text$0" />`,
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "AUTO CLOSE",
      });
      suggestions = [...suggestions, ...selfCloseTags];

      return { suggestions };
    },
  });
};

export default register;
