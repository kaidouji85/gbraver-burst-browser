// @flow

import type {Resources} from "../../../../resource";
import {AttackButton} from "../../../../game-object/button/attack-button/index";
import {Observer} from "../../../observer";

/** コウゲキボタンを生成する */
export function createAttackButton(resources: Resources, observer: Observer): AttackButton {
  return new AttackButton({
    resources,
    onPush: () => observer.notify({type: 'pushAttackButton'})
  })
}