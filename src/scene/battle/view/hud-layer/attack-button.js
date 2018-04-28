// @flow

import type {Resources} from "../../../../resource";
import {AttackButton} from "../../../../game-object/button/attack-button/index";
import {BattleSceneObserver} from "../../../../observer/battle-scene/battle-scene-observer";

/** コウゲキボタンを生成する */
export function createAttackButton(resources: Resources, observer: BattleSceneObserver): AttackButton {
  return new AttackButton({
    resources,
    onPush: () => observer.notify({type: 'pushAttackButton'})
  })
}