import React, { useCallback } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { Style } from "types";
import { useActions } from "typeless";
import { getGlobalState, GlobalActions } from "features/global/interface";
import css from "./style.module.css";

export const StyleEditor = () => {
  const { tree, target } = getGlobalState.useState();
  const { stylingNode } = useActions(GlobalActions);
  const node = tree.find(({ id }) => id === target);
  const style = node && node.style;

  const onChange = (type: keyof Style) => ({ hex }: ColorResult) => {
    stylingNode({ [type]: hex });
  };

  const deps = [stylingNode];
  const changeColor = useCallback(onChange("color"), deps);
  const changeBackground = useCallback(onChange("background"), deps);

  if (!style) {
    return <></>;
  }

  const { color, background } = style;

  return (
    <div className={css.container}>
      <div>
        <div>
          文字色
          <ChromePicker color={color} onChange={changeColor} />
        </div>
        <div>
          背景色
          <ChromePicker color={background} onChange={changeBackground} />
        </div>
      </div>
    </div>
  );
};
