// @flow

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

