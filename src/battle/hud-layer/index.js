// @flow
import type {State} from '../state';
import type {Resources} from '../../common/resource-manager';
import ThreeLib from 'three-js';
import PlayerGauge from '../../gauge/player-gauge';

const THREE = ThreeLib(['JSONLoader', 'OrbitControls']);

/** Head Up Display(HUD)のレイヤー */
export default class HudLayer {
  /** リソース管理オブジェクト */
  resources: Resources;

  /** レンダラー */
  rendeer: THREE.WebGLRenderer;

  /** 本レイヤーのベースとなるシーン */
  scene: THREE.Scene;

  /** 本レイヤーのカメラ */
  camera: THREE.OrthographicCamera;

  /** プレイヤーゲージ */
  playerGauge: PlayerGauge;

  constructor(props: {renderer: THREE.WebGLRenderer, resources: Resources}) {
    this.resources = props.resources;
    this.rendeer = props.renderer;
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      -window.innerWidth/2,
      window.innerWidth/2,
      window.innerHeight/2,
      -window.innerHeight/2,
      0,
      30
    );

    this.playerGauge = new PlayerGauge(this.resources);
    this.scene.add(this.playerGauge.mesh);
  }

  /** ゲームループでの処理 */
  animate() {
    this.playerGauge.mesh.position.x = 0;
    this.playerGauge.mesh.position.y = 0;

    this.rendeer.render(this.scene, this.camera);
  }

  /** リサイズ時の処理 */
  resize() {
    this.camera.left = -window.innerWidth/2;
    this.camera.right = window.innerWidth/2;
    this.camera.top = window.innerHeight/2;
    this.camera.bottom = -window.innerHeight/2;
    this.camera.updateProjectionMatrix();
  }

  /**
   * 画面状態が更新された場合の処理
   *
   * @param state 画面除隊
   * @return 結果を返すPromise
   */
  update(state: State): Promise<void> {
    // NOP
    return Promise.resolve();
  }

}