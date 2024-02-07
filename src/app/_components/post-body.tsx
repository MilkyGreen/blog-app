'use client'

import markdownStyles from "./markdown-styles.module.css";
import "highlight.js/styles/github.css"; // github样式文件
import hljs from "highlight.js/lib/core"; // highlight.js核心
import javascript from "highlight.js/lib/languages/javascript";
import java from "highlight.js/lib/languages/java";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import golang from "highlight.js/lib/languages/go";
import shell from "highlight.js/lib/languages/shell";
import sql from "highlight.js/lib/languages/sql";
import css from "highlight.js/lib/languages/css";
import bash from "highlight.js/lib/languages/bash";
import c from "highlight.js/lib/languages/c";

import { useEffect } from "react";


type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  useEffect(() => {
    hljs.registerLanguage("jsx", javascript);
    hljs.registerLanguage("java", java);
    hljs.registerLanguage("python", python);
    hljs.registerLanguage("typescript", typescript);
    hljs.registerLanguage("golang", golang);
    hljs.registerLanguage("shell", shell);
    hljs.registerLanguage("sql", sql);
    hljs.registerLanguage("css", css);
    hljs.registerLanguage("bash", bash);
    hljs.registerLanguage("c", c);
    hljs.highlightAll();
  })
  return (
    <div className="max-w-4xl mx-auto ">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
