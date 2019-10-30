// @flow

import {BattleSceneView} from "../view";
import {empty} from "../../../../animation/delay";
import {Animate} from "../../../../animation/animate";

/** 入力系UIを非表示にする */
export function invisibleUI(view: BattleSceneView): Animate {
  return empty()
    .chain(
      view.hud.gameObjects.batterySelector.close(),
      view.hud.gameObjects.burstButton.close()
    )
}