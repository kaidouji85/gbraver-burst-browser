// @flow

import {BattleSceneView} from "../../view/index";
import type {MouseDown} from "../../../../action/dom-event/mouse-down";
import type {BattleSceneState} from "../../state";
import type {MouseRaycaster} from "../../../../screen-touch/mouse/mouse-raycaster";
import {createMouseRaycaster} from "../../../../screen-touch/mouse/mouse-raycaster";

/** ゲーム画面内をマウスダウンした際のイベント */
export function mouseDown(view: BattleSceneView, state: BattleSceneState, action: MouseDown) {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(action.event, view.renderer, view.hudLayer.camera);

  view.hudLayer.attackButton.onMouseDown(mouseRaycaster);
  view.hudLayer.okButton.onMouseDown(mouseRaycaster);
  view.hudLayer.batterySlider.onMouseDown(mouseRaycaster);
}
