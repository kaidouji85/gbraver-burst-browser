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
    return getTracksFromHUDShinBraver(hudArmdozer);
  }

  return [];
}

/**
 * シンブレイバーHUDからHUDTrackingを取得する
 *
 * @param shinBraverHUD 取得元
 * @return 取得結果
 */
function getTracksFromHUDShinBraver(shinBraverHUD: ShinBraverHUD): HUDTracking[] {
  return [shinBraverHUD.cutIn];
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
