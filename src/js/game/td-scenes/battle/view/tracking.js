// @flow

import * as THREE from 'three';
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../../../game-object/armdozer/position";
import {toHUDCoordinate} from "./coordinate";
import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";
import {ThreeDimensionLayer} from "./td";
import {HudLayer} from "./hud";
import type {PlayerId} from "gbraver-burst-core";
import {ShinBraverHUD} from "./hud/armdozer-objects/shin-braver";
import {NeoLandozerHUD} from "./hud/armdozer-objects/neo-landozer";
import {LightningDozerHUD} from "./hud/armdozer-objects/lightning-dozer";
import type {HUDTracking} from "../../../../tracking/hud-tracking";
import {WingDozerHUD} from "./hud/armdozer-objects/wing-dozer";
import {ShinyaHUD} from "./hud/pilot-objects/shinya";

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

  hud.pilots.forEach(pilot => {
    td.sprites
      .filter(tdSprite => tdSprite.playerId === pilot.playerId)
      .forEach(tdSprite => {
        if (pilot instanceof ShinyaHUD) {
          trackingCutIn(td.camera.getCamera(), rendererDOM, pilot.cutIn, tdSprite.sprite);
        }
      });
  });

  hud.armdozers.forEach(hudArmdozer => {
    td.sprites
      .filter(tdSprite => tdSprite.playerId === hudArmdozer.playerId)
      .forEach(tdSprite => {
        if (hudArmdozer instanceof ShinBraverHUD) {
          trackingCutIn(td.camera.getCamera(), rendererDOM, hudArmdozer.cutIn, tdSprite.sprite);
        } else if (hudArmdozer instanceof NeoLandozerHUD) {
          trackingCutIn(td.camera.getCamera(), rendererDOM, hudArmdozer.cutIn, tdSprite.sprite);
        } else if (hudArmdozer instanceof LightningDozerHUD) {
          trackingCutIn(td.camera.getCamera(), rendererDOM, hudArmdozer.cutIn, tdSprite.sprite);
        } else if (hudArmdozer instanceof WingDozerHUD) {
          trackingCutIn(td.camera.getCamera(), rendererDOM, hudArmdozer.cutIn, tdSprite.sprite);
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
function trackingPlayerGauge(tdCamera: typeof THREE.Camera, rendererDOM: HTMLElement, gauge: HUDTracking): void {
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
function trackingEnemyGauge(tdCamera: typeof THREE.Camera, rendererDOM: HTMLElement, gauge: HUDTracking): void {
  const tdCoordinate = {
    x: -ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z
  };
  const hudCoordinate = toHUDCoordinate(tdCoordinate, tdCamera, rendererDOM);
  gauge.tracking(hudCoordinate.x, hudCoordinate.y);
}

/**
 * カットインのトラッキング
 *
 * @param tdCamera 3Dレイヤーカメラ
 * @param rendererDOM レンダリング対象のHTML要素
 * @param cutIn カットイン
 * @param sprite スプライト
 */
function trackingCutIn(tdCamera: typeof THREE.Camera, rendererDOM: HTMLElement, cutIn: HUDTracking, sprite: ArmDozerSprite): void {
  const target =sprite.getObject3D();
  const tdPosition = {
    x: target.position.x,
    y: ARMDOZER_EFFECT_STANDARD_Y,
    z: target.position.z
  };
  const hudPosition = toHUDCoordinate(tdPosition, tdCamera, rendererDOM);
  cutIn.tracking(hudPosition.x, hudPosition.y);
}
