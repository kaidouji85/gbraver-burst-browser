// @flow

import type {Resources} from "../../../../resource";
import {Observable} from "rxjs/index";
import type {GameObjectAction} from "../../../../action/game-object-action";
import {BurstButton} from "../../../../game-object/burst-button/burst-button";

/** バーストボタンを生成する */
export function createBurstButton(resources: Resources, listener: Observable<GameObjectAction>): BurstButton {
  return new BurstButton({
    resources: resources,
    listener: listener
  });
}