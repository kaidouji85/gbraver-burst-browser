import { Observable } from "rxjs";
import * as THREE from "three";

import { PreRender } from "../../../../../game-loop/pre-render";
import { Update } from "../../../../../game-loop/update";
import { gameObjectStream } from "../../../../../game-object/action/game-object-action";
import { PlainHUDCamera } from "../../../../../game-object/camera/plain-hud/plain-hud-camera";
import { OverlapNotifier } from "../../../../../render/overlap-notifier";
import { BattleViewCreatorParams } from "../../creator-params";
import { enemyArmdozerHUD, playerArmdozerHUD } from "../armdozer-objects";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import { createHUDGameObjects } from "../game-objects";
import { enemyHUDPilotObjects, playerHUDPilotObjects } from "../pilot-objects";
import { enemyHUDObjects, playerHUDObjects } from "../player";
import { HUDLayerProps } from "../props";

/** 生成パラメータ */
export type HUDLayerPropsCreatorParams = BattleViewCreatorParams & {
  /** レンダラ */
  renderer: OverlapNotifier;
  /** アップデート */
  update: Observable<Update>;
  /** プリレンダ */
  preRender: Observable<PreRender>;
};

/**
 * HUDLayerPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createHUDLayerProps(
  params: HUDLayerPropsCreatorParams,
): HUDLayerProps {
  const scene = new THREE.Scene();
  const camera = new PlainHUDCamera(params.resize);
  const overlap = params.renderer.createOverlapNotifier(camera.getCamera());
  const gameObjectAction = gameObjectStream(
    params.update,
    params.preRender,
    overlap,
  );

  const creatorParams: HUDLayerObjectCreatorParams = {
    ...params,
    gameObjectAction,
  };
  const gameObjects = createHUDGameObjects(creatorParams);
  gameObjects.getObject3Ds().forEach((object) => {
    scene.add(object);
  });

  const players = [
    playerHUDObjects(creatorParams),
    enemyHUDObjects(creatorParams),
  ];
  players
    .map((v) => v.getObject3Ds())
    .flat()
    .forEach((v) => {
      scene.add(v);
    });

  const armdozers = [
    playerArmdozerHUD(creatorParams),
    enemyArmdozerHUD(creatorParams),
  ];
  armdozers
    .map((v) => v.getObject3Ds())
    .flat()
    .forEach((v) => {
      scene.add(v);
    });

  const pilots = [
    playerHUDPilotObjects(creatorParams),
    enemyHUDPilotObjects(creatorParams),
  ];
  pilots
    .map((v) => v.getObject3Ds())
    .flat()
    .forEach((v) => {
      scene.add(v);
    });

  return {
    scene,
    camera,
    overlap,
    gameObjectAction,
    gameObjects,
    players,
    armdozers,
    pilots,
  };
}
