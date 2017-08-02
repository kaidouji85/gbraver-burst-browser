// @flow
import type {Resources} from '../common/resource-manager';
import ThreeLib from 'three-js';
import SchoolStage from '../stage/kamata/index';
import ShinBraver from '../armdozer/shin-breaver';
import NeoLandozer from '../armdozer/neo-landozer';

const THREE = ThreeLib([]);

/**
 * バトルフィールドのレイヤー
 */
export default class Battle {
  /** シーン */
  scene: THREE.Scene;

  /** カメラ */
  camera: THREE.Camera;

  /** 学校フィールド */
  battleField: SchoolStage;

  /** プレイヤースプライト */
  playerSprite: ShinBraver;

  /** 敵スプライト */
  enemySprite: NeoLandozer;

  constructor(props: {resources: Resources}) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z = 900;
    this.camera.position.y = 70;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.battleField = new SchoolStage(props.resources);
    this.battleField.values().forEach(item => this.scene.add(item));

    this.playerSprite = new ShinBraver(props.resources);
    this.playerSprite.mesh.position.x = 150;
    this.scene.add(this.playerSprite.mesh);

    this.enemySprite = new NeoLandozer(props.resources);
    this.enemySprite.mesh.position.x = -150;
    this.scene.add(this.enemySprite.mesh);
  }

  /** ゲームループでの処理 */
  animate() {
    this.battleField.animate(this.camera);
    this.playerSprite.animate(this.camera);
    this.enemySprite.animate(this.camera);
  }

  /** ウインドウリサイズ時の処理 */
  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}