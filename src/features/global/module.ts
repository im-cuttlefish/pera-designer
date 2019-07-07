import { map } from "typeless/rx";
import * as R from "ramda";
import { getComponentByTagName } from "services/API";
import { GlobalState, GlobalActions, useModule } from "./interface";
import { createNode } from "./createNode";

const initialState: GlobalState = { tree: [], editing: "style", target: null };

export const epic = useModule
  .epic()
  .on(GlobalActions.addNode, ({ tagName }) =>
    getComponentByTagName(tagName).pipe(map(GlobalActions.componentLoaded))
  )
  .on(GlobalActions.registerImage, ({ image }) => {
    const url = URL.createObjectURL(image);
    return GlobalActions.writeText(url);
  });

export const reducer = useModule
  .reducer(initialState)
  .on(GlobalActions.toggleEditing, (state, { editing }) => {
    state.editing = editing;
  })
  .on(GlobalActions.selectNode, (state, { uuid }) => {
    state.target = uuid;
  })
  .on(GlobalActions.selectName, (state, { name }) => {
    state.name = name;
  })
  .on(GlobalActions.componentLoaded, (state, { component }) => {
    const node = createNode(component);
    state.tree.push(node);
  })
  .on(GlobalActions.removeNode, (state, { uuid }) => {
    const { tree } = state;
    const index = tree.findIndex(R.propEq("id", uuid));
    tree.splice(index, 1);
  })
  .on(GlobalActions.moveNode, (state, { direction }) => {
    const { tree, target } = state;
    const index = tree.findIndex(R.propEq("id", target));
    const to = direction === "up" ? index - 1 : index + 1;
    state.tree = R.move(index, to, tree);
  })
  .on(GlobalActions.writeText, (state, { text }) => {
    const { tree, target, name } = state;
    const index = tree.findIndex(R.propEq("id", target));

    if (!target || !name) {
      return;
    }

    const path = [index, "contents", name, "content"];
    state.tree = R.assocPath(path, text, tree);
  })
  .on(GlobalActions.stylingNode, (state, { style }) => {
    const { tree, target } = state;
    const index = tree.findIndex(R.propEq("id", target));

    if (!target) {
      return;
    }

    const path = [index, "style"];
    const merged = { ...R.path(path, tree), ...style };
    state.tree = R.assocPath(path, merged, tree);
  });

export const useGlobalModule = useModule;
