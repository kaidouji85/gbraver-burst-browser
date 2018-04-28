// @flow

import type {DOMEvent} from "../../../../action/dom-event/index";
import {BattleScene} from "../../index";
import {resize} from "./resize";
import {mouseDown} from "./mouse-down";
import {mouseMove} from "./mouse-move";
import {mouseUp} from "./mouse-up";
import {touchStart} from "./touch-start";
import {touchMove} from "./touch-move";
import {touchEnd} from "./touch-end";

// TODO パラメータにシーンを直接渡さないようにする
/**
 * HTMLイベントハンドラ
 *
 * @param action htmlイベント
 * @param scene 戦闘シーン
 */
export function domEventHandler(action: DOMEvent, scene: BattleScene): void {
  switch(action.type) {
    case 'resize':
      return resize(scene._view, scene._state);
    case 'mouseDown':
      return mouseDown(scene._view, scene._state, action);
    case 'mouseMove':
      return mouseMove(scene._view, scene._state, action);
    case 'mouseUp':
      return mouseUp(scene._view, scene._state, action);
    case 'touchStart':
      return touchStart(scene._view, scene._state, action);
    case 'touchMove':
      return touchMove(scene._view, scene._state, action);
    case 'touchEnd':
      return touchEnd(scene._view, scene._state, action);
    default:
      return;
  }
}