// @flow

import type {DOMEvent} from "../../../action/dom-event";
import {BattleScene} from "../index";
import {resize} from "./resize";
import {mouseDown} from "./mouse-down";
import {mouseMove} from "./mouse-move";
import {mouseUp} from "./mouse-up";
import {touchStart} from "./touch-start";
import {touchMove} from "./touch-move";
import {touchEnd} from "./touch-end";

/**
 * HTMLイベントに応じて戦闘シーンが実行する処理
 *
 * @param action htmlイベント
 * @param scene 戦闘シーン
 */
export function htmlActionHandler(action: DOMEvent, scene: BattleScene): void {
  switch(action.type) {
    case 'resize':
      return resize(scene.view, scene.state);
    case 'mouseDown':
      return mouseDown(scene.view, scene.state, action);
    case 'mouseMove':
      return mouseMove(scene.view, scene.state, action);
    case 'mouseUp':
      return mouseUp(scene.view, scene.state, action);
    case 'touchStart':
      return touchStart(scene.view, scene.state, action);
    case 'touchMove':
      return touchMove(scene.view, scene.state, action);
    case 'touchEnd':
      return touchEnd(scene.view, scene.state, action);
    default:
      return;
  }
}