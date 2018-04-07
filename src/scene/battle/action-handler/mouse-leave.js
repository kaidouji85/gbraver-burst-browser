// @flow

import {BattleSceneView} from "../view";
import type {MouseLeave} from "../../action";
import type {BattleSceneState} from "../state";
import type {MouseRaycaster} from "../../../screen-touch/mouse/mouse-raycaster";
import {createMouseRaycaster} from "../../../screen-touch/mouse/mouse-raycaster";

/** ゲーム画面内をマウスリーブした際のイベント */
export function mouseLeave(view: BattleSceneView, state: BattleSceneState, action: MouseLeave) {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(action.event, view.renderer, view.hudLayer.camera);
}
