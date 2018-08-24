// @flow

import {TurnIndicator} from "../../../../game-object/turn-indicator/turn-indicator";
import type {Resources} from "../../../../resource";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import {Observable} from "rxjs";

/** ターンインジケーターを生成する */
export function createTurnIndicator(resources: Resources, listener: Observable<GameLoop>): TurnIndicator {
  return new TurnIndicator({
    listener: listener,
    resources: resources
  });
}