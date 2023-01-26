import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";

const TextBlock = ({ page, block }: any) => {
  return (
    <div className="nl:max-w-46rem">
    
      {page.text1.map((block: { children: any[]; }) => {
        return block.children.map((child: { marks: string | string[]; text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => {
          return child.marks.indexOf("strong") !== -1 ? (
            <strong>{child.text}</strong>
          ) : (
            child.text
          );
        });
      })}
    </div>
  );
};

export default TextBlock