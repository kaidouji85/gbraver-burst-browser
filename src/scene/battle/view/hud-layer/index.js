// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../resource/index';
import type {BattleSceneState} from "../../state";
import {createPlayerHpGauge} from './player-hp-gauge';
import {HpGauge} from "../../../../game-object/gauge/hp-gauge/hp-gauge";
import {createEnemyHpGauge} from "./enemy-hp-gauge";
import {BatteryGauge} from "../../../../game-object/gauge/battery-gauge/battery-gauge";
import {createPlayerBatteryGauge} from "./player-battery-gauge";
import {createEnemyBatteryGauge} from "./enemy-battery-gauge";
import {createAttackButton} from "./attack-button";
import {AttackButton} from "../../../../game-object/button/attack-button/index";
import {createCamera} from "./camera";
import {BatterySlider} from "../../../../game-object/slider/battery-slider";
import {createBatterySlider} from "./battery-slider";
import type {BattleSceneNotifier} from "../../../../observer/battle-scene/battle-scene-notifier";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";

/** コンストラクタのパラメータ */
export type Param = {
  resources: Resources,
  playerId: PlayerId,
  players: Player[],
  notifier: BattleSceneNotifier
};

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
  /** コウゲキボタン */
  attackButton: AttackButton;
  /** バッテリースライダー */
  batterySlider: BatterySlider;

  constructor(param: Param) {
    this.scene = new THREE.Scene();
    this.camera = createCamera();

    this.playerHpGauge = createPlayerHpGauge(param.resources, param.playerId, param.players);
    this.playerHpGauge.getThreeJsObjectList().forEach(v => this.scene.add(v));

    this.playerBatteryGauge = createPlayerBatteryGauge(param.resources, param.playerId, param.players);
    this.playerBatteryGauge.getThreeJsObjectList().forEach(v => this.scene.add(v));

    this.enemyHpGauge = createEnemyHpGauge(param.resources, param.playerId, param.players);
    this.enemyHpGauge.getThreeJsObjectList().forEach(v => this.scene.add(v));

    this.enemyBatteryGauge = createEnemyBatteryGauge(param.resources, param.playerId, param.players);
    this.enemyBatteryGauge.getThreeJsObjectList().forEach(v => this.scene.add(v));

    this.attackButton = createAttackButton(param.resources, param.notifier);
    this.attackButton.getThreeJsObjectList().forEach(v => this.scene.add(v));

    this.batterySlider = createBatterySlider(param.resources, param.notifier);
    this.batterySlider.getThreeJsObjectList().forEach(v => this.scene.add(v));
  }
}