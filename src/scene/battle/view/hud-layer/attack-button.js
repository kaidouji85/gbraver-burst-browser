// @flow

import type {Resources} from "../../../../resource";
import {Button} from "../../../../game-object/button/button";
import type {BattleSceneNotifier} from "../../../../observer/battle-scene/battle-scene-notifier";
import {AttackButton} from "../../../../game-object/button";

/** コウゲキボタンを生成する */
export function createAttackButton(resources: Resources, notifier: BattleSceneNotifier): Button {
  return AttackButton({
    resources,
    onPush: () => notifier.notify({type: 'pushAttackButton'})
  })
}