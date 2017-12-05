// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../resource/resource-manager';
import {EnemyGaugeContext} from '../../../../game-object/gauge/enemy-gauge';
import type {BattleSceneState} from "../../state";
import {PlayerGaugeContext} from "../../../../game-object/gauge/player-gauge";
import {createPlayerGauge} from "./player-gauge";
import {createEnemyGauge} from "./enemy-gauge";

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
  playerGauge: PlayerGaugeContext;
  /** 敵ゲージ */
  enemyGauge: EnemyGaugeContext;

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
    this.playerGauge.target.getThreeJsObjectList().forEach(v => this.scene.add(v));

    this.enemyGauge = createEnemyGauge(props.resources, props.state);
    this.enemyGauge.target.getThreeJsObjectList().forEach(v => this.scene.add(v));
  }
}