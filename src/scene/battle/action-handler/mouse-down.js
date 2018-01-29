// @flow

import {BattleSceneView} from "../view";
import type {MouseDown} from "../../action";
import type {BattleSceneState} from "../index";

export function mouseDown(view: BattleSceneView, state: BattleSceneState, action: MouseDown) {
  console.log('mousedown');
}
