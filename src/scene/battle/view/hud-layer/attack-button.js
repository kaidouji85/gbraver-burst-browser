// @flow

import type {Resources} from "../../../../resource";
import {AttackButton} from "../../../../game-object/button/attack-button/index";
import {DepricatedObserver} from "../../../depricated-observer";

/** コウゲキボタンを生成する */
export function createAttackButton(resources: Resources, observer: DepricatedObserver): AttackButton {
  return new AttackButton({
    resources,
    onPush: () => observer.notify({type: 'pushAttackButton'})
  })
}