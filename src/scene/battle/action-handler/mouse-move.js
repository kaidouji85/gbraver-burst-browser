// @flow

import {BattleSceneView} from "../view";
import type {MouseMove} from "../../action";
import type {BattleSceneState} from "../state";
import type {MouseRaycaster} from "../../../screen-touch/mouse/mouse-raycaster";
import {createMouseRaycaster} from "../../../screen-touch/mouse/mouse-raycaster";

/** ゲーム画面をマウスムーブした際のイベント */
export function mouseMove(view: BattleSceneView, state: BattleSceneState, action: MouseMove) {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(action.event, view.renderer, view.hudLayer.camera);

  view.hudLayer.batterySlider.onMouseMove(mouseRaycaster);
}