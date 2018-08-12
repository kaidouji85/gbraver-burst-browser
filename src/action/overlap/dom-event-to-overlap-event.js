// @flow

import type {OverlapAction} from "./index";
import type {DOMEvent} from "../dom-event/index";
import {BattleSceneView} from "../../scene/battle/view/index";
import type {MouseDown} from "../dom-event/mouse-down";
import type {MouseRaycaster} from "../../overlap/check/mouse/mouse-raycaster";
import {createMouseRaycaster} from "../../overlap/check/mouse/mouse-raycaster";
import type {MouseDownRaycaster} from "./mouse-down-raycaster";
import type {MouseMoveRaycaster} from "./mouse-move-raycaster";
import type {MouseMove} from "../dom-event/mouse-move";
import {isMouseLeftButtonPushed} from "../../mouse/mouse-left-button";
import type {TouchStartRaycaster} from "./touch-start-raycaster";
import {createTouchEventRaycaster} from "../../overlap/check/touch/touch-raycaster";
import type {TouchMoveRaycaster} from "./touch-move-raycaster";
import type {TouchStart} from "../dom-event/touch-start";
import type {TouchMove} from "../dom-event/touch-move";

/**
 * DOMイベントをRaycasterアクションに変換する
 *
 * @param domEvent DOMイベント
 * @param view 戦闘画面ビュー
 * @return Raycasterアクション、対応するものがない場合はnullを返す
 */
export function domEventToOverlapEvent(domEvent: DOMEvent, view: BattleSceneView): ?OverlapAction {
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