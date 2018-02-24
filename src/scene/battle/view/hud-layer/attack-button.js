// @flow

import type {Resources} from "../../../../resource";
import {Button} from "../../../../game-object/controller/button/button";
import {AttackButton} from "../../../../game-object/controller/button";

/** コウゲキボタンを生成する */
export function createAttackButton(resources: Resources): Button {
  return new AttackButton(resources)
}