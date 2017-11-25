// @flow
import type {Resources} from '../../../../../resource/resource-manager';
import * as THREE from 'three';
import SchoolStage from '../../../../../stage/kamata/index';
import {PlayerShinBraver} from '../../../../../armdozer/shin-breaver';
import {EnemyNeoLandozer} from '../../../../../armdozer/neo-landozer';
import type {ArmDozerSprite} from "../../../../../armdozer/armdozer-sprite";
import type {BattleAppState} from "../../../state";
import {PlayerSprite} from "./player-sprite";

/**
 *  3D空間に関連するオブジェクト、つまりは関連する全役者をまとめたクラス
 */
export class ThreeDimensionObjects {
  /** シーン */
  scene: THREE.Scene;
  /** カメラ */
  camera: THREE.Camera;
  /** 学校フィールド */
  battleField: SchoolStage;
  /** プレイヤースプライト */
  playerSprite: ArmDozerSprite;
  /** 敵スプライト */
  enemySprite: ArmDozerSprite;

  constructor(props: {resources: Resources, state: BattleAppState}) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z = 900;
    this.camera.position.y = 70;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.battleField = new SchoolStage(props.resources);
    this.battleField.values().forEach(item => this.scene.add(item));

    this.playerSprite = new PlayerSprite(props);
    this.playerSprite.getTheeJsObjects().forEach(obj => this.scene.add(obj));

    //this.scene.add(this.playerSprite.mesh);

    this.enemySprite = new EnemyNeoLandozer(props.resources);
    this.scene.add(this.enemySprite.mesh);
  }
}