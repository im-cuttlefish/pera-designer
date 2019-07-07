import React from "react";
import style from "./style.module.css";
import { TreeModule } from "features/tree/module";
import { Editor } from "../Editor/Editor";
import { Header } from "../Header/Header";
import { Preview } from "../Preview/Preview";
import { useGlobalModule } from "features/global/module";
import { getGlobalState } from "features/global/interface";
import { PickerModule } from "features/picker/module";

export const App = () => {
  useGlobalModule();
  const { editing, target } = getGlobalState.useState();

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.left}>
        <TreeModule />
      </div>
      <div className={style.center}>
        {target ? <Editor /> : <PickerModule />}
      </div>
      <div className={style.right}>
        <Preview />
      </div>
    </div>
  );
};
