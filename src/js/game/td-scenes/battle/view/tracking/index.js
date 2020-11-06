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
import type {HUDArmdozerObjects} from "../hud/armdozer-objects/hud-armdozer-ibjects";
import {GaiHUD} from "../hud/pilot-objects/gai";

/**
 * 3Dレイヤーのオブジェクトをトラッキングする
 *
 * @param td 3Dレイヤー
 * @param hud HUDレイヤー
 * @param activePlayerId このゲームを操作しているプレイヤーID
 * @param rendererDOM レンダリング対象のDOM
 */
export function tracking(td: ThreeDimensionLayer, hud: HudLayer, activePlayerId: PlayerId, rendererDOM: HTMLElement): void {
  const playerIds = td.players.map(v => v.playerId);
  playerIds.forEach(playerId => {
    const tdArmdozer = td.armdozerObjects.find(v => v.playerId === playerId);
    const hudPlayer = hud.players.find(v => v.playerId === playerId);
    const hudArmdozer = hud.armdozers.find(v => v.playerId === playerId);
    const hudPilot = hud.pilots.find(v => v.playerId === playerId);
    if (!tdArmdozer || !hudPlayer || !hudArmdozer || !hudPilot) {
      return;
    }

    trackingGauge(td.camera.getCamera(), rendererDOM, hudPlayer, activePlayerId);
    trackingPilotCutIn(td.camera.getCamera(), rendererDOM, hudPilot, tdArmdozer.sprite());
    trackingArmdozerCutIn(td.camera.getCamera(), rendererDOM, hudArmdozer, tdArmdozer.sprite());
  });
}

/**
 * ゲージのトラッキング処理
 *
 * @param tdCamera カメラ
 * @param rendererDOM レンダリング対象のDOM
 * @param hudPlayer ゲージが含まれるHUDプレイヤー固有オブジェクト
 * @param activePlayerId このゲームを操作しているプレイヤーID
 */
function trackingGauge(tdCamera: typeof THREE.Camera, rendererDOM: HTMLElement, hudPlayer: HUDPlayer, activePlayerId: PlayerId): void {
  if (hudPlayer.playerId === activePlayerId) {
    trackingPlayerGauge(tdCamera, rendererDOM, hudPlayer.gauge);
  } else {
    trackingEnemyGauge(tdCamera, rendererDOM, hudPlayer.gauge);
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
  } else if (pilot instanceof GaiHUD) {
    trackingCutIn(tdCamera, rendererDOM, pilot.cutIn, sprite);
  }
}

/**
 * アームドーザカットインのトラッキング
 *
 * @param tdCamera カメラ
 * @param rendererDOM レンダリング対象のDOM
 * @param hudArmdozer アームドーザカットインが含まれるアームドーザ固有オブジェクト
 * @param sprite トラッキング対象のスプライト
 */
function trackingArmdozerCutIn(tdCamera: typeof THREE.Camera, rendererDOM: HTMLElement, hudArmdozer: HUDArmdozerObjects, sprite: ArmDozerSprite): void {
  if (hudArmdozer instanceof ShinBraverHUD) {
    trackingCutIn(tdCamera, rendererDOM, hudArmdozer.cutIn, sprite);
  } else if (hudArmdozer instanceof NeoLandozerHUD) {
    trackingCutIn(tdCamera, rendererDOM, hudArmdozer.cutIn, sprite);
  } else if (hudArmdozer instanceof LightningDozerHUD) {
    trackingCutIn(tdCamera, rendererDOM, hudArmdozer.cutIn, sprite);
  } else if (hudArmdozer instanceof WingDozerHUD) {
    trackingCutIn(tdCamera, rendererDOM, hudArmdozer.cutIn, sprite);
  }
}