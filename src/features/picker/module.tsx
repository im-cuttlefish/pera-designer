import React from "react";
import * as Rx from "typeless/rx";
import { PickerActions, PickerState } from "./interface";
import { useModule } from "./interface";
import { getDescriptions } from "services/API";
import { Picker } from "./components/Picker";

const initialState: PickerState = {
  tabList: null,
  displayed: null,
  descriptions: null
};

useModule
  .reducer(initialState)
  .on(PickerActions.descriptionsLoaded, (state, { descriptions }) => {
    const tabList = Object.keys(descriptions);
    state.descriptions = descriptions;
    state.tabList = tabList;
    state.displayed = tabList[0];
  })
  .on(PickerActions.displayTab, (state, { tabIndex }) => {
    const { tabList } = state;
    state.displayed = tabList![tabIndex];
  });

useModule.epic().on(PickerActions.$mounted, () => {
  return getDescriptions().pipe(Rx.map(PickerActions.descriptionsLoaded));
});

export const PickerModule = () => {
  useModule();
  return <Picker />;
};
