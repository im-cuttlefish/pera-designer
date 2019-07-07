import React from "react";
import {
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useActions } from "typeless";
import { getPickerState, PickerActions } from "../interface";
import { GlobalActions } from "../../global/interface";

export const Picker = () => {
  const { addNode } = useActions(GlobalActions);
  const { displayTab } = useActions(PickerActions);
  const { tabList, displayed, descriptions } = getPickerState.useState();

  return (
    <>
      {tabList && displayed && descriptions && (
        <div>
          <Paper square>
            <Tabs
              value={displayed}
              indicatorColor="primary"
              textColor="primary"
            >
              {tabList.map((type, key) => (
                <Tab
                  onClick={() => displayTab(key)}
                  value={type}
                  key={key}
                  label={type}
                />
              ))}
            </Tabs>
          </Paper>
          <List>
            {descriptions[displayed].map((component, key) => {
              const { name, description, tagName } = component;
              return (
                <ListItem key={key}>
                  <ListItemText primary={name} secondary={description} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => addNode(tagName)}>
                      <Add />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      )}
    </>
  );
};
