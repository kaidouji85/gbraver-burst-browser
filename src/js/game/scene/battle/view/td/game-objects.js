// @flow

import type {Stage} from "../../../../../game-object/stage/stage";
import {TurnIndicator} from "../../../../../game-object/turn-indicator/turn-indicator";
import type {Resources} from "../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../action/game-object-action";
import SchoolField from "../../../../../game-object/stage/shopping-street";
import * as THREE from "three";

/** 3Dレイヤーのゲームオブジェクト */
export class TDGameObjects {
  stage: Stage;
  turnIndicator: TurnIndicator;

  constructor(resources: Resources, listener: Observable<GameObjectAction>) {
    this.stage = new SchoolField(resources);

    this.turnIndicator = new TurnIndicator({
      listener: listener,
      resources: resources
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.stage.destructor();
    this.turnIndicator.destructor();
  }

  /**
   * 3Dレイヤーゲームオブジェクトをシーンに追加する
   *
   * @param scene 追加対象シーン
   */
  appendScene(scene: THREE.Scene): void {
    this.stage.getThreeJsObjects()
      .forEach(item => scene.add(item));
    scene.add(this.turnIndicator.getObject3D());
  }
}
