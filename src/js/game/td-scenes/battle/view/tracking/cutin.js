// @flow

import * as THREE from "three";
import type {HUDTracking} from "../../../../../tracking/hud-tracking";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import {ARMDOZER_EFFECT_STANDARD_Y} from "../../../../../game-object/armdozer/position";
import {toHUDCoordinate} from "../../../../../tracking/coordinate";

/**
 * カットインのトラッキング
 *
 * @param tdCamera 3Dレイヤーカメラ
 * @param rendererDOM レンダリング対象のHTML要素
 * @param cutIn カットイン
 * @param sprite スプライト
 */
export function trackingCutIn(tdCamera: typeof THREE.Camera, rendererDOM: HTMLElement, cutIn: HUDTracking, sprite: ArmDozerSprite): void {
  const target = sprite.getObject3D();
  const tdPosition = {
    x: target.position.x,
    y: ARMDOZER_EFFECT_STANDARD_Y,
    z: target.position.z
  };
  const hudPosition = toHUDCoordinate(tdPosition, tdCamera, rendererDOM);
  cutIn.tracking(hudPosition.x, hudPosition.y);
}