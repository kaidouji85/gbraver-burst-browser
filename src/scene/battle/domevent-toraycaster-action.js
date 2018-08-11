// @flow

import type {RaycasterAction} from "../../observer/raycaster/action";
import type {DOMEvent} from "../../observer/dom-event/action";
import {BattleSceneView} from "./view";
import type {MouseDown} from "../../observer/dom-event/action/mouse-down";
import type {MouseRaycaster} from "../../overlap/check/mouse/mouse-raycaster";
import {createMouseRaycaster} from "../../overlap/check/mouse/mouse-raycaster";
import type {MouseDownRaycaster} from "../../observer/raycaster/action/mouse-down-raycaster";
import type {MouseMoveRaycaster} from "../../observer/raycaster/action/mouse-move-raycaster";
import type {MouseMove} from "../../observer/dom-event/action/mouse-move";
import {isMouseLeftButtonPushed} from "../../mouse/mouse-left-button";
import type {TouchStartRaycaster} from "../../observer/raycaster/action/touch-start-raycaster";
import {createTouchEventRaycaster} from "../../overlap/check/touch/touch-raycaster";
import type {TouchMoveRaycaster} from "../../observer/raycaster/action/touch-move-raycaster";
import type {TouchStart} from "../../observer/dom-event/action/touch-start";
import type {TouchMove} from "../../observer/dom-event/action/touch-move";

/**
 * DOMイベントをRaycasterアクションに変換する
 *
 * @param domEvent DOMイベント
 * @param view 戦闘画面ビュー
 * @return Raycasterアクション、対応するものがない場合はnullを返す
 */
export function domEventToRaycasterAction(domEvent: DOMEvent, view: BattleSceneView): ?RaycasterAction {
  switch(domEvent.type) {
    case 'mouseDown':
      return mouseDown(domEvent, view);
    case 'mouseMove':
      return mouseMove(domEvent, view);
    case 'touchStart':
      return touchStart(domEvent, view);
    case 'touchMove':
      return touchMove(domEvent, view);
    default:
      return null;
  }
}

function mouseDown(action: MouseDown, view: BattleSceneView): MouseDownRaycaster {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(action.event, view.renderer, view.hudLayer.camera);
  return {
    type: 'mouseDownRaycaster',
    mouse: mouseRaycaster
  };
}

function mouseMove(action: MouseMove, view: BattleSceneView): MouseMoveRaycaster {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(action.event, view.renderer, view.hudLayer.camera);
  const isLeftButtonClicked = isMouseLeftButtonPushed(action.event);

  return {
    type: 'mouseMoveRaycaster',
    mouse: mouseRaycaster,
    isLeftButtonClicked: isLeftButtonClicked
  };
}

function touchStart(action: TouchStart, view: BattleSceneView): TouchStartRaycaster {
  const touch = createTouchEventRaycaster(action.event, view.renderer, view.hudLayer.camera);
  return {
    type: 'touchStartRaycaster',
    touch: touch
  };
}

function touchMove(action: TouchMove, view: BattleSceneView): TouchMoveRaycaster {
  const touch = createTouchEventRaycaster(action.event, view.renderer, view.hudLayer.camera);
  return {
    type: 'touchMoveRaycaster',
    touch: touch
  };
}