import React, { createElement, useRef } from "react";
import marked from "marked";
import objectHash from "object-hash";
import { Node, Contents } from "types";

export const usePreview = (tree: Node[]) => {
  const memoized = useRef(new Map<string, JSX.Element>()).current;
  const memoizer: Array<[string, JSX.Element]> = [];

  const nodes = tree.map(node => {
    const { id, contents, style } = node;
    const { tagName } = node.component;
    const hash = objectHash({ id, contents, style });

    if (memoized.has(hash)) {
      return memoized.get(hash);
    }

    const children = Object.entries(contents).map(createContent);
    const element = createElement(tagName, { style, key: id }, children);
    memoizer.push([hash, element]);
    return element;
  });

  memoized.clear();

  for (const [id, element] of memoizer) {
    memoized.set(id, element);
  }

  return <>{nodes}</>;
};

const createContent = (entry: [string, Contents[string]], index: number) => {
  const [name, slot] = entry;
  const { type, content } = slot;

  switch (type) {
    case "markdown":
      const markdown = marked(content, {
        headerIds: false,
        breaks: true
      });
      return createDiv(index, name, markdown);
    case "plaintext":
      return createDiv(index, name, content);
    case "image":
      return <img key={index} slot={name} src={content} />;
  }
};

const createDiv = (index: number, name: string, html: string) => (
  <div key={index} slot={name} dangerouslySetInnerHTML={{ __html: html }} />
);
