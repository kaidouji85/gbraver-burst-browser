// @flow

import {TurnIndicator} from "../../../../game-object/turn-indicator/turn-indicator";
import type {Resources} from "../../../../resource";

/** ターンインジケーターを生成する */
export function createTurnIndicator(resources: Resources): TurnIndicator {
  return new TurnIndicator({
    resources: resources
  });
}