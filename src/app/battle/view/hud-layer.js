// @flow
import * as THREE from 'three';
import type {Resources} from '../../../resource/resource-manager';
import {PlayerGauge, EnemyGauge} from '../../../gauge/index';
import type {BattleAppState} from "../state";
import {setHudComponentPos} from "../helper/set-hud-component-pos";

/**
 * HUDレイヤーで使用するオブジェクトを全て集めたもの
 *
 * @author y.takeuchi
 */
export class HudLayer {
  /** 本レイヤーのベースとなるシーン */
  scene: THREE.Scene;
  /** 本レイヤーのカメラ */
  camera: THREE.OrthographicCamera;
  /** プレイヤーゲージ */
  playerGauge: PlayerGauge;
  /** 敵ゲージ */
  enemyGauge: EnemyGauge;

  constructor(props: {resources: Resources, state: BattleAppState}) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(
      -window.innerWidth/2,
      window.innerWidth/2,
      window.innerHeight/2,
      -window.innerHeight/2,
      0,
      30
    );

    this.playerGauge = new PlayerGauge(props.resources);
    this.playerGauge.refresh();
    this.scene.add(this.playerGauge.mesh);

    this.enemyGauge = new EnemyGauge(props.resources);
    this.enemyGauge.refresh();
    this.scene.add(this.enemyGauge.mesh);

    setHudComponentPos(this);
  }
}