// @flow
import type {Resources} from '../../../../resource/index';
import * as THREE from 'three';
import type {BattleSceneState} from "../../state";
import {createPlayerSprite} from "./player-sprite";
import {createEnemySprite} from "./enemy-sprite";
import type {ArmDozerSprite} from '../../../../game-object/armdozer/armdozer-sprite';
import {createStage} from './stage';
import type {Stage} from "../../../../game-object/stage/stage";
import {createCamera} from "./camera";

/**
 *  3D空間に関連するオブジェクト、つまりは関連する全役者をまとめたクラス
 */
export class ThreeDimensionLayer {
  /** シーン */
  scene: THREE.Scene;
  /** カメラ */
  camera: THREE.Camera;
  /** 背景 */
  stage: Stage;
  /** プレイヤースプライト */
  playerSprite: ArmDozerSprite;
  /** 敵スプライト */
  enemySprite: ArmDozerSprite;

  constructor(props: {resources: Resources, state: BattleSceneState}) {
    this.scene = new THREE.Scene();
    this.camera = createCamera();

    this.stage = createStage(props);
    this.stage.getThreeJsObjects().forEach(item => this.scene.add(item));

    this.playerSprite = new createPlayerSprite(props);
    this.playerSprite.getThreeJsObjects().forEach(obj => this.scene.add(obj));
    this.playerSprite.stand().start();

    this.enemySprite = new createEnemySprite(props);
    this.enemySprite.getThreeJsObjects().forEach(obj => this.scene.add(obj));
    this.enemySprite.stand().start();
  }
}
