// @flow

import type {Stage} from "../../../../../game-object/stage/stage";
import {TurnIndicator} from "../../../../../game-object/turn-indicator/turn-indicator";
import type {Resources} from "../../../../../resource";
import {Observable} from "rxjs";
import SchoolField from "../../../../../game-object/stage/shopping-street";
import * as THREE from "three";
import {SkyBrightness} from "../../../../../game-object/sky-brightness/sky-brightness";
import {Illumination} from "../../../../../game-object/illumination/illumination";
import type {GameObjectAction} from "../../../../../game-object/action/game-object-action";
import {toStream} from "../../../../../stream/rxjs";

/**
 * 3Dレイヤーのゲームオブジェクト
 */
export class TDGameObjects {
  stage: Stage;
  turnIndicator: TurnIndicator;
  skyBrightness: SkyBrightness;
  illumination: Illumination;

  constructor(resources: Resources, listener: Observable<GameObjectAction>) {
    this.stage = new SchoolField(resources);
    this.turnIndicator = new TurnIndicator({
        listener: listener,
        resources: resources
      });
    this.skyBrightness = new SkyBrightness(toStream(listener));
    this.illumination = new Illumination(toStream(listener));
  }

  /**
   * デストラクタ相当の処理
   */
  destructor() {
    this.stage.destructor();
    this.turnIndicator.destructor();
    this.skyBrightness.destructor();
    this.illumination.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): typeof THREE.Object3D[] {
    return [
      ...this.stage.getThreeJsObjects(),
      this.turnIndicator.getObject3D(),
      this.skyBrightness.getObject3D(),
      ...this.illumination.getObject3Ds()
    ];
  }
}
