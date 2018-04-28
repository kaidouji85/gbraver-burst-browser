// @flow

import type {DOMEvent} from "../../../action/dom-event";
import {BattleScene} from "../index";
import {resize} from "./resize";
import {mouseDown} from "./mouse-down";

export function htmlActionHandler(event: DOMEvent, scene: BattleScene): void {
  switch(event.type) {
    case 'resize':
      return resize(scene.view, scene.state);
    case 'mouseDown':
      return mouseDown(scene.view, scene.state, event);
    default:
      return;
  }
}