// @flow

import type {RaycasterAction} from "../../observer/raycaster/action";
import type {DOMEvent} from "../../observer/dom-event/action";
import {BattleSceneView} from "./view";
import type {MouseDown} from "../../observer/dom-event/action/mouse-down";
import type {MouseRaycaster} from "../../overlap/check/mouse/mouse-raycaster";
import {createMouseRaycaster} from "../../overlap/check/mouse/mouse-raycaster";
import type {MouseDownRaycaster} from "../../observer/raycaster/action/mouse-down-raycaster";

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