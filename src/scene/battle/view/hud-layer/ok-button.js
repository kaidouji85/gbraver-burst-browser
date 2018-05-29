// @flow

import type {Resources} from "../../../../resource";
import type {BattleSceneNotifier} from "../../../../observer/battle-scene/battle-scene-notifier";
import {Button} from "../../../../game-object/button/button";
import {OkButton} from "../../../../game-object/button/ok-button";

export function createOkButton(resources: Resources, notifier: BattleSceneNotifier): Button {
  const button = OkButton({
    resources,
    onPush: () => console.log('ok pushed'),    // TODO オブザーバに伝える,
    visible: false
  });
  return button;
}