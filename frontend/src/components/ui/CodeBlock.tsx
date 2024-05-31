import { useEffect } from "react";
import Prism from "prismjs";
import "./prism.css";

const CodeBlock = ({ code }: { code: string }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);
  return (
    <pre>
      <code children={code} className={"language-js"} />
    </pre>
  );
};

export default CodeBlock;
