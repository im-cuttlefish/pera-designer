import { createModule } from "typeless";
import { GlobalSymbol } from "./symbol";
import { Style, Node, UUID, Component, Editing } from "types";

export const [useModule, GlobalActions, getGlobalState] = createModule(
  GlobalSymbol
)
  .withActions({
    removeNode: (uuid: UUID) => ({ payload: { uuid } }),
    selectNode: (uuid: UUID | null) => ({ payload: { uuid } }),
    selectName: (name: string) => ({ payload: { name } }),
    toggleEditing: (editing: Editing) => ({ payload: { editing } }),
    addNode: (tagName: string) => ({ payload: { tagName } }),
    moveNode: (direction: "up" | "down") => ({ payload: { direction } }),
    writeText: (text: string) => ({ payload: { text } }),
    stylingNode: (style: Partial<Style>) => ({ payload: { style } }),
    registerImage: (image: File) => ({ payload: { image } }),
    componentLoaded: (component: Component) => ({ payload: { component } })
  })
  .withState<GlobalState>();

export interface GlobalState {
  tree: Node[];
  editing: Editing;
  target: UUID | null;
  name?: string;
}
