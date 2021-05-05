// @flow

import * as THREE from "three";
import {ThreeDimensionLayer} from "../td";
import {HudLayer} from "../hud";
import type {PlayerId} from "gbraver-burst-core";
import {ShinBraverHUD} from "../hud/armdozer-objects/shin-braver";
import {NeoLandozerHUD} from "../hud/armdozer-objects/neo-landozer";
import {LightningDozerHUD} from "../hud/armdozer-objects/lightning-dozer";
import {WingDozerHUD} from "../hud/armdozer-objects/wing-dozer";
import {trackingGauges} from "./gauge";
import {trackingCutIn} from "./cutin";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import type {HUDArmdozerObjects} from "../hud/armdozer-objects/hud-armdozer-ibjects";

/**
 * 3Dレイヤーのオブジェクトをトラッキングする
 *
 * @param td 3Dレイヤー
 * @param hud HUDレイヤー
 * @param activePlayerId このゲームを操作しているプレイヤーID
 * @param rendererDOM レンダリング対象のDOM
 */
export function tracking(td: ThreeDimensionLayer, hud: HudLayer, activePlayerId: PlayerId, rendererDOM: HTMLElement): void {
  trackingGauges(td, hud, activePlayerId, rendererDOM);

  const playerIds = td.players.map(v => v.playerId);
  playerIds.forEach(playerId => {
    const tdArmdozer = td.armdozerObjects.find(v => v.playerId === playerId);
    const hudPlayer = hud.players.find(v => v.playerId === playerId);
    const hudArmdozer = hud.armdozers.find(v => v.playerId === playerId);
    const hudPilot = hud.pilots.find(v => v.playerId === playerId);
    if (!tdArmdozer || !hudPlayer || !hudArmdozer || !hudPilot) {
      return;
    }
    trackingArmdozerCutIn(td.camera.getCamera(), rendererDOM, hudArmdozer, tdArmdozer.sprite());
  });
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