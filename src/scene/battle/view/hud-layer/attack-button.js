// @flow

import type {Resources} from "../../../../resource";
import {AttackButton} from "../../../../game-object/button/index";
import type {BattleSceneNotifier} from "../../../../observer/battle-scene/battle-scene-notifier";

/** コウゲキボタンを生成する */
export function createAttackButton(resources: Resources, notifier: BattleSceneNotifier): AttackButton {
  return new AttackButton({
    resources,
    onPush: () => notifier.notify({type: 'pushAttackButton'})
  })
}