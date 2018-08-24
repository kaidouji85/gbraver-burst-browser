// @flow

import {BurstButton} from "../../../../game-object/burst-button/burst-button";
import type {Resources} from "../../../../resource";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import {Observable} from "rxjs";

/** バーストボタンを生成する */
export function createBurstButton(resources: Resources, listener: Observable<GameLoop>): BurstButton {
  return new BurstButton({
    resources: resources,
    listener: listener
  });
}