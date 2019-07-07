import { createModule } from "typeless";
import { TreeSymbol } from "./symbol";
import { UUID } from "types";

export const [useModule, TreeActions, getTreeState] = createModule(TreeSymbol)
  .withActions({
    open: (opened: UUID | null) => ({ payload: { opened } })
  })
  .withState<TreeState>();

export interface TreeState {
  opened: UUID | null;
}
