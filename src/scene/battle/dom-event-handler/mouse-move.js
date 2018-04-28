// @flow

import {BattleSceneView} from "../view/index";
import type {MouseMove} from "../../../action/dom-event/mouse-move";
import type {BattleSceneState} from "../state";
import type {MouseRaycaster} from "../../../screen-touch/mouse/mouse-raycaster";
import {createMouseRaycaster} from "../../../screen-touch/mouse/mouse-raycaster";
import {isMouseLeftButtonPushed} from "../../../mouse/mouse-left-button";

/** ゲーム画面をマウスムーブした際のイベント */
export function mouseMove(view: BattleSceneView, state: BattleSceneState, action: MouseMove) {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(action.event, view.renderer, view.hudLayer.camera);
  const isLeftButtonPushed = isMouseLeftButtonPushed(action.event);

  view.hudLayer.batterySlider.onMouseMove(mouseRaycaster, isLeftButtonPushed);
}