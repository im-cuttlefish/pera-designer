import React from "react";
import { TreeActions, TreeState, useModule } from "./interface";
import { Tree } from "./components/Tree";

const initialState: TreeState = { opened: null };

useModule.reducer(initialState).on(TreeActions.open, (state, { opened }) => {
  state.opened = opened;
});

export const TreeModule = () => {
  useModule();
  return <Tree />;
};
