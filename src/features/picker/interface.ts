import { createModule } from "typeless";
import { PickerSymbol } from "./symbol";
import { Descriptions } from "types";

export const [useModule, PickerActions, getPickerState] = createModule(
  PickerSymbol
)
  .withActions({
    $mounted: null,
    loadDescriptions: null,
    descriptionsLoaded: (descriptions: Descriptions) => ({
      payload: { descriptions }
    }),
    displayTab: (tabIndex: number) => ({ payload: { tabIndex } })
  })
  .withState<PickerState>();

export interface PickerState {
  tabList: string[] | null;
  displayed: string | null;
  descriptions: Descriptions | null;
}
