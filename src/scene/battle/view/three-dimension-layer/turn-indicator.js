// @flow

import {TurnIndicator} from "../../../../game-object/turn-indicator/turn-indicator";
import type {Resources} from "../../../../resource/index";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../action/game-object-action/index";

/** ターンインジケーターを生成する */
export function createTurnIndicator(resources: Resources, listener: Observable<GameObjectAction>): TurnIndicator {
  return new TurnIndicator({
    listener: listener,
    resources: resources
  });
}