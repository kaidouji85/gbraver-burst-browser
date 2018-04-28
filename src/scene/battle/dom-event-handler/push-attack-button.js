// @flow

import {BattleSceneView} from "../view/index";
import type {BattleSceneState} from "../state";
import type {PushAttackButton} from "../../action";

/** コウゲキボタンを押した際のイベント */
export function pushAttackButton(view: BattleSceneView, state: BattleSceneState, action: PushAttackButton): void {
  console.log('push attack button');
}