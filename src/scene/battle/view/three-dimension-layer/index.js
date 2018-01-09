// @flow
import type {Resources} from '../../../../resource/resource-manager';
import * as THREE from 'three';
import type {BattleSceneState} from "../../index";
import {createPlayerSprite} from "./player-sprite";
import {createEnemySprite} from "./enemy-sprite";
import type {ArmDozerSprite} from '../../../../game-object/armdozer/base';
import {createStage} from './stage';
import type {Stage} from "../../../../game-object/stage/base";
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

    this.enemySprite = new createEnemySprite(props);
    this.enemySprite.getThreeJsObjects().forEach(obj => this.scene.add(obj));
  }
}
