// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../resource/resource-manager';
import {EnemyGauge} from '../../../../game-object/gauge/index';
import type {BattleSceneState} from "../../state";
import {PlayerGauge} from "../../../../game-object/player-gauge/index";
import {createPlayerGauge} from "./player-gauge-creator";

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

  constructor(props: {resources: Resources, state: BattleSceneState}) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(
      -window.innerWidth/2,
      window.innerWidth/2,
      window.innerHeight/2,
      -window.innerHeight/2,
      0,
      30
    );
    this.playerGauge = createPlayerGauge(props.resources, props.state);
    this.playerGauge._target.getThreeJsObjectList().forEach(v => this.scene.add(v));

    this.enemyGauge = new EnemyGauge(props.resources);
    this.enemyGauge.refresh();
    this.scene.add(this.enemyGauge.mesh);
  }
}