// @flow

import {BattleSceneView} from "../../view/index";
import type {MouseUp} from "../../../../action/dom-event/mouse-up";
import type {BattleSceneState} from "../../state";
import type {MouseRaycaster} from "../../../../overlap/check/mouse/mouse-raycaster";
import {createMouseRaycaster} from "../../../../overlap/check/mouse/mouse-raycaster";

/** ゲーム画面をマウスアップした際のイベント */
export function mouseUp(view: BattleSceneView, state: BattleSceneState, action: MouseUp) {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(action.event, view.renderer, view.hudLayer.camera);
}