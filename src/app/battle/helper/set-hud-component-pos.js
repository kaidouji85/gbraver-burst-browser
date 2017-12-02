// @flow

import {HudLayer} from "../view/hud-layer";
import {MESH_WIDTH, MESH_HEIGHT} from "../../../gauge";

export function setHudComponentPos(layer: HudLayer) {
  layer.playerGauge.mesh.position.x = (window.innerWidth - MESH_WIDTH) / 2;
  layer.playerGauge.mesh.position.y = (window.innerHeight - MESH_HEIGHT) / 2;

  layer.enemyGauge.mesh.position.x = (-window.innerWidth + MESH_WIDTH) / 2;
  layer.enemyGauge.mesh.position.y = (window.innerHeight - MESH_HEIGHT) / 2;
}