import React from "react";
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { Edit, FormatPaint } from "@material-ui/icons";
import { Editing, Slot, UUID } from "types";
import { useActions } from "typeless";
import { GlobalActions } from "features/global/interface";

interface IProps {
  slots: Array<[string, { type: Slot; role: string }]>;
  target: UUID;
}

export const SlotsList = ({ slots, target }: IProps) => {
  const { selectName, selectNode, toggleEditing } = useActions(GlobalActions);

  const editNode = (type: Editing, name?: string) => {
    selectNode(target);

    if (name != null) {
      selectName(name);
    }

    toggleEditing(type);
  };

  return (
    <List>
      {slots.map((slot, key) => {
        const [name, { type, role }] = slot;
        return (
          <ListItem onClick={() => editNode(type, name)} button key={key}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText inset primary={role} />
          </ListItem>
        );
      })}
      <ListItem onClick={() => editNode("style")} button>
        <ListItemIcon>
          <FormatPaint />
        </ListItemIcon>
        <ListItemText inset primary="スタイル編集" />
      </ListItem>
    </List>
  );
};
