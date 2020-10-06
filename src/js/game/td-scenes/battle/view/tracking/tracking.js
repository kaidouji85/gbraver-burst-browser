// @flow

import * as THREE from "three";
import {ThreeDimensionLayer} from "../td";
import {HudLayer} from "../hud";
import type {PlayerId} from "gbraver-burst-core";
import {ShinBraverHUD} from "../hud/armdozer-objects/shin-braver";
import {NeoLandozerHUD} from "../hud/armdozer-objects/neo-landozer";
import {LightningDozerHUD} from "../hud/armdozer-objects/lightning-dozer";
import {WingDozerHUD} from "../hud/armdozer-objects/wing-dozer";
import {ShinyaHUD} from "../hud/pilot-objects/shinya";
import {trackingEnemyGauge, trackingPlayerGauge} from "./gauge";
import {trackingCutIn} from "./cutin";
import {HUDPlayer} from "../hud/player";
import type {HUDPilotObjects} from "../hud/pilot-objects/hud-pilot-objects";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";

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
    trackingGauge(v, td, playerId, rendererDOM);
  });

  hud.pilots.forEach(pilot => {
    td.sprites
      .filter(tdSprite => tdSprite.playerId === pilot.playerId)
      .forEach(tdSprite => {
        trackingPilotCutIn(td.camera.getCamera(), rendererDOM, pilot, tdSprite.sprite);
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
 * ゲージのトラッキング処理
 *
 * @param hudPlayer ゲージが存在するHUDプレイヤー固有オブジェクト
 * @param td 3Dレイヤー
 * @param playerId プレイヤーID
 * @param rendererDOM レンダリング対象のDOM
 */
function trackingGauge(hudPlayer: HUDPlayer, td:ThreeDimensionLayer, playerId: PlayerId, rendererDOM: HTMLElement): void {
  if (hudPlayer.playerId === playerId) {
    trackingPlayerGauge(td.camera.getCamera(), rendererDOM, hudPlayer.gauge);
  } else {
    trackingEnemyGauge(td.camera.getCamera(), rendererDOM, hudPlayer.gauge);
  }
}

/**
 * パイロットカットインのトラッキング
 *
 * @param tdCamera カメラ
 * @param rendererDOM レンダリング対象のDOM
 * @param pilot パイロットカットインが含まれるパイロット固有オブジェクト
 * @param sprite トラッキング対象のスプライト
 */
function trackingPilotCutIn(tdCamera: typeof THREE.Camera, rendererDOM: HTMLElement, pilot: HUDPilotObjects, sprite: ArmDozerSprite): void {
  if (pilot instanceof ShinyaHUD) {
    trackingCutIn(tdCamera, rendererDOM, pilot.cutIn, sprite);
  }
}