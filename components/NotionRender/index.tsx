import * as React from "react";
import {
  NotionRenderer,
  Equation,
  Collection,
  CollectionRow,
  NotionRendererProps,
} from "react-notion-x";
import "react-notion-x/src/styles.css";
import Code from "../Code";

interface IProps {
  className: string;
  notionBlock: NotionRendererProps["recordMap"];
}
export default function NotionRender({ className, notionBlock }: IProps) {
  return (
    <NotionRenderer
      //@ts-ignore
      recordMap={notionBlock}
      fullPage={false}
      darkMode={false}
      showTableOfContents
      disableHeader
      showCollectionViewDropdown={false}
      // rootDomain
      previewImages
      className={className}
      components={{
        equation: Equation,
        code: Code,
        collection: Collection,
        collectionRow: CollectionRow,
      }}
    />
  );
}
