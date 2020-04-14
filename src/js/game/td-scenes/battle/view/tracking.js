// @flow

import * as THREE from 'three';
import {Gauge} from "../../../../game-object/gauge/gauge";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../../../game-object/armdozer/position";
import {toHUDCoordinate} from "./coordinate";
import {NeoLandozerCutIn} from "../../../../game-object/cut-in/neo-landozer/neo-landozer-cutin";
import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";
import {ShinBraverCutIn} from "../../../../game-object/cut-in/shin-braver/shin-braver-cutin";

/**
 * プレイヤーゲージをトラッキングする
 *
 * @param tdCamera 3Dレイヤーカメラ
 * @param rendererDOM レンダリング対象のHTML要素
 * @param gauge ゲージ
 */
export function trackingPlayerGauge(tdCamera: THREE.Camera, rendererDOM: HTMLElement, gauge: Gauge): void {
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
export function trackingEnemyGauge(tdCamera: THREE.Camera, rendererDOM: HTMLElement, gauge: Gauge): void {
  const tdCoordinate = {
    x: -ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z
  };
  const hudCoordinate = toHUDCoordinate(tdCoordinate, tdCamera, rendererDOM);
  gauge.tracking(hudCoordinate.x, hudCoordinate.y);
}

/**
 * シンブレイバーカットインのトラッキング
 *
 * @param tdCamera 3Dレイヤーカメラ
 * @param rendererDOM レンダリング対象のHTML要素
 * @param cutIn カットイン
 * @param sprite スプライト
 */
export function trackingShinBraverCutIn(tdCamera: THREE.Camera, rendererDOM: HTMLElement, cutIn: ShinBraverCutIn, sprite: ArmDozerSprite): void {
  const target =sprite.getObject3D();
  const tdPosition = {
    x: target.position.x,
    y: ARMDOZER_EFFECT_STANDARD_Y,
    z: target.position.z
  };
  const hudPosition = toHUDCoordinate(tdPosition, tdCamera, rendererDOM);
  cutIn.tracking(hudPosition.x, hudPosition.y);
}

/**
 * ネオランドーザカットインのトラッキング
 *
 * @param tdCamera 3Dレイヤーカメラ
 * @param rendererDOM レンダリング対象のHTML要素
 * @param cutIn カットイン
 * @param sprite スプライト
 */
export function trackingNeoLandozerCutIn(tdCamera: THREE.Camera, rendererDOM: HTMLElement, cutIn: NeoLandozerCutIn, sprite: ArmDozerSprite): void {
  const target =sprite.getObject3D();
  const tdPosition = {
    x: target.position.x,
    y: ARMDOZER_EFFECT_STANDARD_Y,
    z: target.position.z
  };
  const hudPosition = toHUDCoordinate(tdPosition, tdCamera, rendererDOM);
  cutIn.tracking(hudPosition.x, hudPosition.y);
}