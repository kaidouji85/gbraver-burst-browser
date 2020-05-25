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
import {LightningDozerCutIn} from "../../../../game-object/cut-in/lightning-dozer/lightning-dozer-cutin";
import {ThreeDimensionLayer} from "./td";
import {HudLayer} from "./hud";
import type {PlayerId} from "gbraver-burst-core";
import {ShinBraverHUD} from "./hud/armdozer-objects/shin-braver";
import {NeoLandozerHUD} from "./hud/armdozer-objects/neo-landozer";
import {LightningDozerHUD} from "./hud/armdozer-objects/lightning-dozer";

/**
 * 3Dレイヤーのオブジェクトをトラッキングする
 *
 * @param td 3Dレイヤー
 * @param hud HUDレイヤー
 * @param playerId プレイヤーID
 * @param rendererDOM レンダリング対象のDOM
 */
export function tracking(td: ThreeDimensionLayer, hud: HudLayer, playerId: PlayerId, rendererDOM: HTMLElement): void {
  hud.players.forEach(v => {
    if (v.playerId === playerId) {
      trackingPlayerGauge(td.camera.getCamera(), rendererDOM, v.gauge);
    } else {
      trackingEnemyGauge(td.camera.getCamera(), rendererDOM, v.gauge);
    }
  });

  hud.armdozers.forEach(hudArmdozer => {
    td.sprites
      .filter(tdSprite => tdSprite.playerId === hudArmdozer.playerId)
      .forEach(tdSprite => {
        if (hudArmdozer instanceof ShinBraverHUD) {
          trackingShinBraverCutIn(td.camera.getCamera(), rendererDOM, hudArmdozer.cutIn, tdSprite.sprite)
        } else if (hudArmdozer instanceof NeoLandozerHUD) {
          trackingNeoLandozerCutIn(td.camera.getCamera(), rendererDOM, hudArmdozer.cutIn, tdSprite.sprite);
        } else if (hudArmdozer instanceof LightningDozerHUD) {
          trackingLightningDozerCutIn(td.camera.getCamera(), rendererDOM, hudArmdozer.cutIn, tdSprite.sprite)
        }
      });
  });
}

/**
 * プレイヤーゲージをトラッキングする
 *
 * @param tdCamera 3Dレイヤーカメラ
 * @param rendererDOM レンダリング対象のHTML要素
 * @param gauge ゲージ
 */
function trackingPlayerGauge(tdCamera: THREE.Camera, rendererDOM: HTMLElement, gauge: Gauge): void {
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
function trackingEnemyGauge(tdCamera: THREE.Camera, rendererDOM: HTMLElement, gauge: Gauge): void {
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
function trackingShinBraverCutIn(tdCamera: THREE.Camera, rendererDOM: HTMLElement, cutIn: ShinBraverCutIn, sprite: ArmDozerSprite): void {
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
function trackingNeoLandozerCutIn(tdCamera: THREE.Camera, rendererDOM: HTMLElement, cutIn: NeoLandozerCutIn, sprite: ArmDozerSprite): void {
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
function trackingLightningDozerCutIn(tdCamera: THREE.Camera, rendererDOM: HTMLElement, cutIn: LightningDozerCutIn, sprite: ArmDozerSprite): void {
  const target =sprite.getObject3D();
  const tdPosition = {
    x: target.position.x,
    y: ARMDOZER_EFFECT_STANDARD_Y,
    z: target.position.z
  };
  const hudPosition = toHUDCoordinate(tdPosition, tdCamera, rendererDOM);
  cutIn.tracking(hudPosition.x, hudPosition.y);
}