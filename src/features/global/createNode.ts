import { generate } from "shortid";
import placeholder from "assets/placeholder.png";
import { Component, Style, Contents, UUID, Slot, Node } from "types";

export const createNode = (component: Component): Node => {
  const contents: Contents = {};
  const style: Partial<Style> = {};
  const id = generate() as UUID;

  for (const slot of Object.entries(component.slot)) {
    const [name, { type }] = slot;
    contents[name] = { type, content: getDefaultContent(type) };
  }

  return { id, contents, style, component };
};

const getDefaultContent = (type: Slot) => {
  switch (type) {
    case "markdown":
      return "## サブタイトル\n**Markdown**が利用可能です。";
    case "plaintext":
      return "プレーンテキスト";
    case "image":
      return placeholder;
  }
};
