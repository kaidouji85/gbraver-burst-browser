import * as THREE from "three";

import { Gauge } from "../../../../../game-object/gauge/gauge";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../../../../game-object/td-position";
import { toHUDCoordinate } from "../../../../../tracking/to-hud-coordinate";
import { TrackingParams } from "./tracking-params";

/**
 * プレイヤー側ゲージのトラッキング
 * @param gauge トラッキングするゲージ
 * @param tdCamera 3Dレイヤーのカメラ
 * @param rendererDOM レンダラDOM
 * @returns 変換結果
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
 * @returns 変換結果
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
  const { td, hud, playerId, rendererDOM } = params;
  hud.players.forEach(({ playerId: currentPlayerId, gauge }) => {
    const isPlayer = currentPlayerId === playerId;
    const tracking = isPlayer ? playerGaugeTracking : enemyGaugeTracking;
    tracking(gauge, td.camera.getCamera(), rendererDOM);
  });
}
