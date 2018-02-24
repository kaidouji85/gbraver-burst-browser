// @flow

import type {Resources} from "../../../../resource";
import {TextureButton} from "../../../../game-object/button/texture-button/texture-button";
import {AttackButton} from "../../../../game-object/button/texture-button";

/** コウゲキボタンを生成する */
export function createAttackButton(resources: Resources): TextureButton {
  return new AttackButton(resources)
}