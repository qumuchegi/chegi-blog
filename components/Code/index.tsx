import React, { useMemo } from "react";
//@ts-ignore
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-jsx";
import "../../assets/codeStyle/prism.js";
import styles from "./styles.module.css";

export default function Code(props: any) {
  const { code, language } = props;
  const languageL = language.toLowerCase();
  const prismLanguage = languages[languageL] || languages.javascript;
  return (
    <pre className={`notion-code ` + styles.container}>
      <code
        className={`language-${languageL} ${styles.code}`}
        dangerouslySetInnerHTML={useMemo(
          () => ({
            __html: highlight(code, prismLanguage, language),
          }),
          [code, prismLanguage, language]
        )}
      ></code>
    </pre>
  );
}
