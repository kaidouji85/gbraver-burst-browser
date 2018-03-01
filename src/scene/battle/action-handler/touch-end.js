// @flow

import {BattleSceneView} from "../view";
import type {TouchEnd} from "../../action";
import type {BattleSceneState} from "../index";

/** ゲーム画面内をタッチエンドした際のイベント */
export function touchEnd(view: BattleSceneView, state: BattleSceneState, action: TouchEnd) {
  console.log('touchEnd');
  console.log(action.event);
}
