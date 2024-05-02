import * as THREE from "three";

import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../../../../game-object/armdozer/position";
import { PredicatedDamage } from "../../../../../game-object/predicated-damage";
import { toHUDCoordinate } from "../../../../../tracking/to-hud-coordinate";
import { TrackingParams } from "./tracking-params";

/** ダメージ予想 トラッキング パラメータ */
type PredicatedDamageTrackingParams = {
  /** ダメージ予想 */
  predicatedDamage: PredicatedDamage;
  /** 3Dレイヤーカメラ */
  tdCamera: THREE.PerspectiveCamera;
  /** レンダラのHTML要素 */
  rendererDOM: HTMLElement;
};

/**
 * ダメージ予想のトラッキング（プレイヤー側）
 * @param params パラメータ
 */
function playerPredicatedDamageTracking(
  params: PredicatedDamageTrackingParams,
) {
  const { predicatedDamage, tdCamera, rendererDOM } = params;
  const origin = {
    x: ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z,
  };
  const hudCoordinate = toHUDCoordinate(origin, tdCamera, rendererDOM);
  predicatedDamage.getObject3D().position.x = hudCoordinate.x;
  predicatedDamage.getObject3D().position.y = hudCoordinate.y;
}

/**
 * ダメージ予想のトラッキング（敵側）
 * @param params パラメータ
 */
function enemyPredicatedDamageTracking(params: PredicatedDamageTrackingParams) {
  const { predicatedDamage, tdCamera, rendererDOM } = params;
  const origin = {
    x: -ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z,
  };
  const hudCoordinate = toHUDCoordinate(origin, tdCamera, rendererDOM);
  predicatedDamage.getObject3D().position.x = hudCoordinate.x;
  predicatedDamage.getObject3D().position.y = hudCoordinate.y;
}

/**
 * 予想ダメージのトラッキング
 * @param params パラメータ
 */
export function predicatedDamageTracking(params: TrackingParams) {
  const { td, hud, rendererDOM, activePlayerId } = params;
  hud.players.forEach(({ playerId, predicatedDamage }) => {
    const isPlayer = playerId === activePlayerId;
    const trackingParams = {
      tdCamera: td.camera.getCamera(),
      rendererDOM,
      predicatedDamage,
    };
    isPlayer
      ? playerPredicatedDamageTracking(trackingParams)
      : enemyPredicatedDamageTracking(trackingParams);
  });
}
