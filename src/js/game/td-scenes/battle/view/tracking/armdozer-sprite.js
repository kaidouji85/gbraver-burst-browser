// @flow

import * as THREE from "three";
import type {HUDTracking} from "../../../../../tracking/hud-tracking";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import {ARMDOZER_EFFECT_STANDARD_Y} from "../../../../../game-object/armdozer/position";
import {toHUDCoordinate} from "../../../../../tracking/coordinate";
import {ThreeDimensionLayer} from "../td";
import {HudLayer} from "../hud";
import type {Coordinate} from "../../../../../tracking/coordinate";
import {ShinBraverHUD} from "../hud/armdozer-objects/shin-braver";
import type {HUDArmdozerObjects} from "../hud/armdozer-objects/hud-armdozer-ibjects";
import {NeoLandozerHUD} from "../hud/armdozer-objects/neo-landozer";
import {LightningDozerHUD} from "../hud/armdozer-objects/lightning-dozer";
import {WingDozerHUD} from "../hud/armdozer-objects/wing-dozer";

/**
 * アームドーザスプライトをトラッキングする
 *
 * @param td 3Dレイヤー
 * @param hud HUDレイヤー
 * @param rendererDOM レンダラDOM
 */
export function trackingArmdozerSprites(td: ThreeDimensionLayer, hud: HudLayer, rendererDOM: HTMLElement): void {
  td.armdozerObjects.forEach(tdArmdozer => {
    const hudArmdozer = hud.armdozers.find(v => v.playerId === tdArmdozer.playerId);
    if (!hudArmdozer) {
      return;
    }

    const tracks = getTracksFromHUDArmdozer(hudArmdozer);
    tracks.forEach(v => {
      const position = toCutInHUDPos(td.camera.getCamera(), rendererDOM, tdArmdozer.sprite());
      v.tracking(position.x, position.y);
    });
  });
}

/**
 * HUDアームドーザからHUDTrackingを取得する
 *
 * @param hudArmdozer 取得元
 * @return 取得結果
 */
function getTracksFromHUDArmdozer(hudArmdozer: HUDArmdozerObjects): HUDTracking[] {
  if (hudArmdozer instanceof ShinBraverHUD) {
    return getTracksFromShinBraverHUD(hudArmdozer);
  }

  if (hudArmdozer instanceof NeoLandozerHUD) {
    return getTracksFromNeoLandozerHUD(hudArmdozer);
  }

  if (hudArmdozer instanceof LightningDozerHUD) {
    return getTracksFromLightningDozerHUD(hudArmdozer);
  }

  if (hudArmdozer instanceof WingDozerHUD) {
    return getTracksFromWingDozerHUD(hudArmdozer);
  }

  return [];
}

/**
 * シンブレイバーHUDからHUDTrackingを取得する
 *
 * @param shinBraverHUD 取得元
 * @return 取得結果
 */
function getTracksFromShinBraverHUD(shinBraverHUD: ShinBraverHUD): HUDTracking[] {
  return [shinBraverHUD.cutIn];
}

/**
 * ネオランドーザHUDからHUDTrackingを取得する
 *
 * @param neoLandozerHUD 取得元
 * @return 取得結果
 */
function getTracksFromNeoLandozerHUD(neoLandozerHUD: NeoLandozerHUD): HUDTracking[] {
  return [neoLandozerHUD.cutIn];
}

/**
 * ライトニングドーザHUDからHUDTrackingを取得する
 *
 * @param lightningDozerHUD 取得元
 * @return 取得結果
 */
function getTracksFromLightningDozerHUD(lightningDozerHUD: LightningDozerHUD): HUDTracking[] {
  return [lightningDozerHUD.cutIn];
}

/**
 * ウィングドーザHUDからHUDTrackingを取得する
 *
 * @param wingDozerHUD 取得元
 * @return 取得結果
 */
function getTracksFromWingDozerHUD(wingDozerHUD: WingDozerHUD): HUDTracking[] {
  return [wingDozerHUD.cutIn];
}

/**
 * 3D座標系をHUD座標系に変換する
 *
 * @param tdCamera 3Dレイヤーのカメラ
 * @param rendererDOM レンダラDOM
 * @param sprite トラッキングするスプライト
 * @return 変換結果
 */
function toCutInHUDPos(tdCamera: typeof THREE.Camera, rendererDOM: HTMLElement, sprite: ArmDozerSprite): Coordinate {
  const target = sprite.getObject3D();
  const tdPosition = {
    x: target.position.x,
    y: ARMDOZER_EFFECT_STANDARD_Y,
    z: target.position.z
  };
  return toHUDCoordinate(tdPosition, tdCamera, rendererDOM);
}
