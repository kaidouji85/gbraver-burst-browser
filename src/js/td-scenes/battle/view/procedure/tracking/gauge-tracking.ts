import * as THREE from "three";

import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../../../../game-object/armdozer/position";
import { Gauge } from "../../../../../game-object/gauge/gauge";
import { toHUDCoordinate } from "../../../../../tracking/to-hud-coordinate";
import { TrackingParams } from "./tracking-params";

/**
 * プレイヤー側ゲージのトラッキング
 * @param gauge トラッキングするゲージ
 * @param tdCamera 3Dレイヤーのカメラ
 * @param rendererDOM レンダラDOM
 * @return 変換結果
 */
function playerGaugeTracking(
  gauge: Gauge,
  tdCamera: Readonly<THREE.PerspectiveCamera>,
  rendererDOM: Readonly<HTMLElement>,
) {
  const origin = {
    x: ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z,
  };
  const hudCoordinate = toHUDCoordinate(origin, tdCamera, rendererDOM);
  gauge.tracking(hudCoordinate);
}

/**
 * 敵側ゲージのトラッキング
 * @param gauge トラッキングするゲージ
 * @param tdCamera 3Dレイヤーのカメラ
 * @param rendererDOM レンダラDOM
 * @return 変換結果
 */
function enemyGaugeTracking(
  gauge: Gauge,
  tdCamera: Readonly<THREE.PerspectiveCamera>,
  rendererDOM: Readonly<HTMLElement>,
) {
  const origin = {
    x: -ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z,
  };
  const hudCoordinate = toHUDCoordinate(origin, tdCamera, rendererDOM);
  gauge.tracking(hudCoordinate);
}

/**
 * ゲージのトラッキング
 * @param params パラメータ
 */
export function gaugeTracking(params: TrackingParams): void {
  const { td, hud, activePlayerId, rendererDOM } = params;
  hud.players.forEach(({ playerId, gauge }) => {
    const tracking =
      playerId === activePlayerId ? playerGaugeTracking : enemyGaugeTracking;
    tracking(gauge, td.camera.getCamera(), rendererDOM);
  });
}
