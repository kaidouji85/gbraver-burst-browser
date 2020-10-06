// @flow
import * as THREE from "three";
import type {HUDTracking} from "../../../../../tracking/hud-tracking";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../../../../game-object/armdozer/position";
import {toHUDCoordinate} from "../../../../../tracking/coordinate";

/**
 * プレイヤーゲージをトラッキングする
 *
 * @param tdCamera 3Dレイヤーカメラ
 * @param rendererDOM レンダリング対象のHTML要素
 * @param gauge ゲージ
 */
export function trackingPlayerGauge(tdCamera: typeof THREE.Camera, rendererDOM: HTMLElement, gauge: HUDTracking): void {
  const tdCoordinate = {
    x: ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z
  };
  const hudCoordinate = toHUDCoordinate(tdCoordinate, tdCamera, rendererDOM);
  gauge.tracking(hudCoordinate.x, hudCoordinate.y);
}

/**
 * 敵ゲージをトラッキングする
 *
 * @param tdCamera 3Dレイヤーカメラ
 * @param rendererDOM レンダリング対象のHTML要素
 * @param gauge ゲージ
 */
export function trackingEnemyGauge(tdCamera: typeof THREE.Camera, rendererDOM: HTMLElement, gauge: HUDTracking): void {
  const tdCoordinate = {
    x: -ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z
  };
  const hudCoordinate = toHUDCoordinate(tdCoordinate, tdCamera, rendererDOM);
  gauge.tracking(hudCoordinate.x, hudCoordinate.y);
}