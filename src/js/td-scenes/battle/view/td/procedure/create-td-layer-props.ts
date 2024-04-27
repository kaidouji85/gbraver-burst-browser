import { Observable } from "rxjs";
import * as THREE from "three";

import { PreRender } from "../../../../../game-loop/pre-render";
import { Update } from "../../../../../game-loop/update";
import { gameObjectStream } from "../../../../../game-object/action/game-object-action";
import { TDCamera } from "../../../../../game-object/camera/td";
import { OverlapNotifier } from "../../../../../render/overlap-notifier";
import { BattleViewCreatorParams } from "../../creator-params";
import { enemyTDArmdozer, playerTDArmdozer } from "../armdozer-objects";
import { TDLayerObjectCreatorParams } from "../creator-params";
import { createTDGameObjects } from "../game-objects";
import { enemyTDObject, playerTDObjects } from "../player";
import { TDLayerProps } from "../props";
import { createSkyBox } from "../sky-box";

/** 生成パラメータ */
export type TDLayerPropsCreatorParams = BattleViewCreatorParams & {
  /** レンダラ */
  renderer: OverlapNotifier;
  /** アップデート */
  update: Observable<Update>;
  /** プリレンダ */
  preRender: Observable<PreRender>;
};

/**
 * TDLayerPropsを生成する
 * @params params 生成パラメータ
 * @returns 生成結果
 */
export function createTDLayerProps(
  params: TDLayerPropsCreatorParams,
): TDLayerProps {
  const { resources, update, preRender, resize, renderer } = params;

  const scene = new THREE.Scene();
  scene.background = createSkyBox(resources);

  const camera = new TDCamera(update, resize);

  const overlap = renderer.createOverlapNotifier(camera.getCamera());

  const gameObjectAction = gameObjectStream(update, preRender, overlap);
  const creatorParams: TDLayerObjectCreatorParams = {
    ...params,
    gameObjectAction,
  };

  const players = [
    playerTDObjects(creatorParams),
    enemyTDObject(creatorParams),
  ];
  players
    .map((v) => v.getObject3Ds())
    .flat()
    .forEach((v) => {
      scene.add(v);
    });

  const armdozers = [
    playerTDArmdozer(creatorParams),
    enemyTDArmdozer(creatorParams),
  ];
  armdozers
    .map((v) => v.getObject3Ds())
    .flat()
    .forEach((v) => {
      scene.add(v);
    });

  const gameObjects = createTDGameObjects(creatorParams);
  gameObjects.getObject3Ds().forEach((object) => {
    scene.add(object);
  });

  return {
    scene,
    camera,
    overlap,
    gameObjectAction,
    players,
    armdozers,
    gameObjects,
  };
}
