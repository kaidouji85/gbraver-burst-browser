// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../resource/resource-manager';
import type {BattleSceneState} from "../../index";
import {createPlayerHpGauge} from './player-hp-gauge';
import {HpGauge} from "../../../../game-object/gauge/hp-gauge/base";
import {createEnemyHpGauge} from "./enemy-hp-gauge";
import {BatteryGauge} from "../../../../game-object/gauge/battery-gauge/base";
import {createPlayerBatteryGauge} from "./player-battery-gauge";
import {createEnemyBatteryGauge} from "./enemy-battery-gauge";

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
  /** プレイヤーHPゲージ */
  playerHpGauge: HpGauge;
  /** プレイヤーバッテリーゲージ*/
  playerBatteryGauge: BatteryGauge;
  /** 敵HPゲージ */
  enemyHpGauge: HpGauge;
  /** 敵バッテリーゲージ */
  enemyBatteryGauge: BatteryGauge;

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

    this.playerHpGauge = createPlayerHpGauge(props.resources, props.state);
    this.playerHpGauge.getThreeJsObjectList().forEach(v => this.scene.add(v));

    this.playerBatteryGauge = createPlayerBatteryGauge(props.resources, props.state);
    this.playerBatteryGauge.getThreeJsObjectList().forEach(v => this.scene.add(v));

    this.enemyHpGauge = createEnemyHpGauge(props.resources, props.state);
    this.enemyHpGauge.getThreeJsObjectList().forEach(v => this.scene.add(v));

    this.enemyBatteryGauge = createEnemyBatteryGauge(props.resources, props.state);
    this.enemyBatteryGauge.getThreeJsObjectList().forEach(v => this.scene.add(v));
  }
}