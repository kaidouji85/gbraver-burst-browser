// @flow

import {BattleSceneView} from "../view/index";
import type {MouseUp} from "../../action";
import type {BattleSceneState} from "../state";
import type {MouseRaycaster} from "../../../screen-touch/mouse/mouse-raycaster";
import {createMouseRaycaster} from "../../../screen-touch/mouse/mouse-raycaster";

/** ゲーム画面をマウスアップした際のイベント */
export function mouseUp(view: BattleSceneView, state: BattleSceneState, action: MouseUp) {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(action.event, view.renderer, view.hudLayer.camera);
}