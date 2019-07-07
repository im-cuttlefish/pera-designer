import React, { useCallback } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  IconButton
} from "@material-ui/core";
import { useActions } from "typeless";
import { GlobalActions, getGlobalState } from "features/global/interface";
import {
  ExpandMore,
  Delete,
  ArrowUpward,
  ArrowDownward
} from "@material-ui/icons";
import { UUID } from "types";
import style from "./style.module.css";
import { SlotsList } from "./SlotsList";
import { TreeActions, getTreeState } from "../interface";

export const Tree = () => {
  const { opened } = getTreeState.useState();
  const { tree, target } = getGlobalState.useState();
  const { open } = useActions(TreeActions);
  const { moveNode, removeNode, selectNode } = useActions(GlobalActions);

  const onClick = useCallback(
    (id: UUID) => {
      open(id === opened ? null : id);
    },
    [opened, target]
  );

  const remove = useCallback(() => {
    target && removeNode(target);
    selectNode(null);
  }, [target]);

  return (
    <div className={style.container}>
      <div className={style.scroll}>
        {tree.map(node => {
          const { id, component } = node;
          const { name, slot } = component;
          const slots = Object.entries(slot);

          return (
            <ExpansionPanel expanded={id === opened} key={id}>
              <ExpansionPanelSummary
                onClick={() => onClick(id)}
                expandIcon={<ExpandMore />}
              >
                {name}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <SlotsList slots={slots} target={id} />
              </ExpansionPanelDetails>
              <ExpansionPanelActions>
                <IconButton onClick={() => moveNode("up")}>
                  <ArrowUpward />
                </IconButton>
                <IconButton onClick={() => moveNode("down")}>
                  <ArrowDownward />
                </IconButton>
                <IconButton onClick={remove}>
                  <Delete />
                </IconButton>
              </ExpansionPanelActions>
            </ExpansionPanel>
          );
        })}
      </div>
    </div>
  );
};
