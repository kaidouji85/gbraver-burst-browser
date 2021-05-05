// @flow
import * as THREE from "three";
import type {HUDTracking} from "../../../../../tracking/hud-tracking";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../../../../game-object/armdozer/position";
import {toHUDCoordinate} from "../../../../../tracking/coordinate";
import {ThreeDimensionLayer} from "../td";
import {HudLayer} from "../hud";
import type {PlayerId} from "gbraver-burst-core";
import type {Coordinate} from "../../../../../tracking/coordinate";
import {HUDPlayer} from "../hud/player";

/**
 * ゲージをトラッキングする
 *
 * @param td 3Dレイヤー
 * @param hud HUDレイヤー
 * @param activePlayerId アクティブプレイヤーID
 * @param rendererDOM レンダラDOM
 */
export function trackingGauges(td: ThreeDimensionLayer, hud: HudLayer, activePlayerId: PlayerId, rendererDOM: HTMLElement): void {
  hud.players.forEach(hudPlayer => {
    const isActivePlayer = hudPlayer.playerId === activePlayerId;
    const hudPosition = isActivePlayer
      ? toPlayerGaugeHUDPos(td.camera.getCamera(), rendererDOM)
      : toEnemyGaugeHUDPos(td.camera.getCamera(), rendererDOM);
    const tracks = getTracksFromHUDPlayer(hudPlayer);
    tracks.forEach(v => {
      v.tracking(hudPosition.x, hudPosition.y);
    });
  });
}

/**
 * HUDプレイヤーオブジェクトからトラッキング対象を取得する
 *
 * @param hudPlayer HUDプレイヤーオブジェクト
 * @return 取得結果
 */
function getTracksFromHUDPlayer(hudPlayer: HUDPlayer): HUDTracking[] {
  return [hudPlayer.gauge];
}

/**
 * プレイヤーゲージ用に3D系座標をHUD系座標に変換する
 *
 * @param tdCamera 3Dレイヤーのカメラ
 * @param rendererDOM レンダラDOM
 * @return 変換結果
 */
function toPlayerGaugeHUDPos(tdCamera: typeof THREE.Camera, rendererDOM: HTMLElement,): Coordinate {
  const tdCoordinate = {
    x: ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z
  };
  return toHUDCoordinate(tdCoordinate, tdCamera, rendererDOM);
}

/**
 * 敵ゲージ用に3D系座標をHUD系座標に変換する
 *
 * @param tdCamera 3Dレイヤーのカメラ
 * @param rendererDOM レンダラDOM
 * @return 変換結果
 */
function toEnemyGaugeHUDPos(tdCamera: typeof THREE.Camera, rendererDOM: HTMLElement,): Coordinate {
  const tdCoordinate = {
    x: -ARMDOZER_EFFECT_STANDARD_X,
    y: ARMDOZER_EFFECT_STANDARD_Y + 200,
    z: ARMDOZER_EFFECT_STANDARD_Z
  };
  return toHUDCoordinate(tdCoordinate, tdCamera, rendererDOM);
}
