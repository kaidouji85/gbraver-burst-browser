// @flow

import type {Stage} from "../../../../../game-object/stage/stage";
import {TurnIndicator} from "../../../../../game-object/turn-indicator/turn-indicator";
import type {Resources} from "../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../action/game-object-action";
import SchoolField from "../../../../../game-object/stage/shopping-street";
import * as THREE from "three";

/** 3Dレイヤーのゲームオブジェクト */
export type TDGameObjects = {
  stage: Stage;
  turnIndicator: TurnIndicator;
};

/**
 * 3Dレイヤーゲームオブジェクトを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 3Dレイヤーゲームオブジェクト
 */
export function createTDGameObjects(resources: Resources, listener: Observable<GameObjectAction>): TDGameObjects {
  return {
    stage: new SchoolField(resources),
    turnIndicator: new TurnIndicator({
      listener: listener,
      resources: resources
    })
  };
}

/**
 * 3Dレイヤーゲームオブジェクトをシーンに追加する
 *
 * @param scene 追加するシーン
 * @param target 3Dレイヤーゲームオブジェクト
 */
export function appendTDGameObjects(scene: THREE.Scene, target: TDGameObjects): void {
  target.stage.getThreeJsObjects()
    .forEach(item => scene.add(item));
  scene.add(target.turnIndicator.getObject3D());
}

/**
 * 3Dレイヤーゲームオブジェクトのデストラクタ相当処理
 *
 * @param target デストラクト対象
 */
export function destructorTDGameObjects(target: TDGameObjects): void {
  target.stage.destructor();
  target.turnIndicator.destructor();
}