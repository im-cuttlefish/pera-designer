import React, { useCallback } from "react";
import { Close } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { getGlobalState } from "features/global/interface";
import { StyleEditor } from "../StyleEditor/StyleEditor";
import { TextEditor } from "../TextEditor/TextEditor";
import { ImageEditor } from "../ImageEditor/ImageEditor";
import { Editing } from "types";
import { useActions } from "typeless";
import { GlobalActions } from "features/global/interface";
import style from "./style.module.css";

export const Editor = () => {
  const { editing } = getGlobalState.useState();
  const { selectNode } = useActions(GlobalActions);
  const matched = matchEditing(editing);

  const close = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  return (
    <div className={style.container}>
      <div className={style.icon}>
        <IconButton onClick={close}>
          <Close />
        </IconButton>
      </div>
      <div>{matched}</div>
    </div>
  );
};

const matchEditing = (editing: Editing) => {
  switch (editing) {
    case "markdown":
    case "plaintext":
      return <TextEditor />;
    case "style":
      return <StyleEditor />;
    case "image":
      return <ImageEditor />;
  }

  return <></>;
};
