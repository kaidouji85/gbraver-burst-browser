// @flow

import {ThreeDimensionLayer} from "./td";
import {HudLayer} from "./hud";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../../../game-object/armdozer/position";
import {toHUDCoordinate} from "./coordinate";

export function trackingTD(td: ThreeDimensionLayer, hud: HudLayer, rendererDOM: HTMLElement, playerId: PlayerId) {
  const tdPlayerEffect = {
    x: ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z
  };
  const tdEnemyEffect = {
    x: -ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z
  };
  const hudPlayerEffect = toHUDCoordinate(tdPlayerEffect, td.camera.getCamera(), rendererDOM);
  const hudEnemyEffect = toHUDCoordinate(tdEnemyEffect, td.camera.getCamera(), rendererDOM);
  hud.players.forEach(v => {
    const target = v.playerId === playerId
      ? hudPlayerEffect
      : hudEnemyEffect;
    v.gauge.tracking(target.x, target.y);
  });
}


