// @flow

import type {DOMEvent} from "../../../../action/dom-event/index";
import {resize} from "./resize";
import {mouseDown} from "./mouse-down";
import {mouseMove} from "./mouse-move";
import {mouseUp} from "./mouse-up";
import {touchStart} from "./touch-start";
import {touchMove} from "./touch-move";
import {touchEnd} from "./touch-end";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state";

/**
 * HTMLイベントハンドラ
 *
 * @param action htmlイベント
 * @param scene 戦闘シーン
 */
export function domEventHandler(action: DOMEvent, view: BattleSceneView, state: BattleSceneState): void {
  switch(action.type) {
    case 'resize':
      return resize(view, state);
    case 'mouseDown':
      return mouseDown(view, state, action);
    case 'mouseMove':
      return mouseMove(view, state, action);
    case 'mouseUp':
      return mouseUp(view, state, action);
    case 'touchStart':
      return touchStart(view, state, action);
    case 'touchMove':
      return touchMove(view, state, action);
    case 'touchEnd':
      return touchEnd(view, state, action);
    default:
      return;
  }
}