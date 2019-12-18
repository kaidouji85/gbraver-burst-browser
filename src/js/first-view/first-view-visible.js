// @flow


import {FIRST_VIEW_ID} from "./first-view-selector";
import {FIRST_VIEW_INVISIBLE} from "./first-view-style";

/** ファーストビューを非表示にする */
export function invisibleFirstView(): void {
  const dom = document.querySelector(FIRST_VIEW_ID);
  if (!dom) {
    return;
  }

  dom.className = FIRST_VIEW_INVISIBLE;
}