import React, { ChangeEvent, useCallback } from "react";
import { useActions } from "typeless";
import { getGlobalState, GlobalActions } from "features/global/interface";
import style from "./style.module.css";

type Event = ChangeEvent<HTMLTextAreaElement>;

export const TextEditor = () => {
  const { writeText } = useActions(GlobalActions);
  const { tree, target, name } = getGlobalState.useState();
  const node = tree.find(({ id }) => id === target)!;
  const { content } = node.contents[name!];

  const onChange = useCallback(
    (event: Event) => {
      writeText(event.target.value);
    },
    [writeText]
  );

  return (
    <textarea
      onChange={onChange}
      value={content}
      placeholder="入力してください"
      className={style.editor}
    />
  );
};
