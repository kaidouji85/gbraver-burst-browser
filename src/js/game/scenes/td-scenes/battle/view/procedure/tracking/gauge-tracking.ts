import * as THREE from "three";

import { toHUDCoordinate } from "../../../../../../../web-gl/tracking/to-hud-coordinate";
import { Gauge } from "../../../../../../game-object/gauge/gauge";
import { PredicatedDamage } from "../../../../../../game-object/predicated-damage";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../../../../../game-object/td-position";
import { TrackingParams } from "./tracking-params";

/**
 * プレイヤー側ゲージのトラッキング
 * @param options オプション
 * @param options.gauge トラッキングするゲージ
 * @param options.tdCamera 3Dレイヤーのカメラ
 * @param options.rendererDOM レンダラDOM
 * @returns 変換結果
 */
function playerGaugeTracking(options: {
  gauge: Gauge;
  tdCamera: Readonly<THREE.PerspectiveCamera>;
  rendererDOM: Readonly<HTMLElement>;
}) {
  const { gauge, tdCamera, rendererDOM } = options;
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
 * @param options オプション
 * @param options.gauge トラッキングするゲージ
 * @param options.tdCamera 3Dレイヤーのカメラ
 * @param options.rendererDOM レンダラDOM
 * @returns 変換結果
 */
function enemyGaugeTracking(options: {
  gauge: Gauge;
  tdCamera: Readonly<THREE.PerspectiveCamera>;
  rendererDOM: Readonly<HTMLElement>;
}) {
  const { gauge, tdCamera, rendererDOM } = options;
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
    const camera = td.camera.getCamera();
    tracking({ gauge, tdCamera: camera, rendererDOM });
  });
}
