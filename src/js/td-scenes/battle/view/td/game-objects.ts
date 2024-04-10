import { Observable } from "rxjs";
import * as THREE from "three";

import type { GameObjectAction } from "../../../../game-object/action/game-object-action";
import { Illumination } from "../../../../game-object/illumination/illumination";
import { SkyBrightness } from "../../../../game-object/sky-brightness/sky-brightness";
import SchoolField from "../../../../game-object/stage/shopping-street/shopping-street";
import type { Stage } from "../../../../game-object/stage/stage";
import { TurnIndicator } from "../../../../game-object/turn-indicator/turn-indicator";
import { GenerateBattleViewParams } from "../generate-params";

/** 3Dレイヤーゲームオブジェクト コンストラクタのパラメータ */
type GenerateTDGameObjectsParams = GenerateBattleViewParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** 3Dレイヤーのゲームオブジェクト */
export class TDGameObjects {
  stage: Stage;
  turnIndicator: TurnIndicator;
  skyBrightness: SkyBrightness;
  illumination: Illumination;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: GenerateTDGameObjectsParams) {
    const { resources, gameObjectAction } = params;
    this.stage = new SchoolField(resources);
    this.turnIndicator = new TurnIndicator({
      gameObjectAction: gameObjectAction,
      resources: resources,
    });
    this.skyBrightness = new SkyBrightness(gameObjectAction);
    this.illumination = new Illumination(gameObjectAction);
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
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return [
      ...this.stage.getThreeJsObjects(),
      this.turnIndicator.getObject3D(),
      this.skyBrightness.getObject3D(),
      ...this.illumination.getObject3Ds(),
    ];
  }
}
