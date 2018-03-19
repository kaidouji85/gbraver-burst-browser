// @flow

import {BattleSceneView} from "../view";
import type {BattleSceneState} from "../index";
import type {PushAttackButton} from "../../action";

/** コウゲキボタンを押した際のイベント */
export function pushAttackButton(view: BattleSceneView, state: BattleSceneState, action: PushAttackButton): void {
  console.log('push attack button');
  view.hudLayer.attackButton.push().start();
}