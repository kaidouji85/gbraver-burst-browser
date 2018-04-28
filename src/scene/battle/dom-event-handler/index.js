// @flow

import type {DOMEvent} from "../../../action/dom-event";
import {BattleScene} from "../index";
import {resize} from "./resize";

export function htmlActionHandler(event: DOMEvent, scene: BattleScene): void {
  switch(event.type) {
    case 'resize':
      return resize(scene.view, scene.state);
    default:
      return;
  }
}