// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../resource/index';
import {createPlayerHpGauge} from './player-hp-gauge';
import {HpGauge} from "../../../../game-object/gauge/hp-gauge/hp-gauge";
import {createEnemyHpGauge} from "./enemy-hp-gauge";
import {BatteryGauge} from "../../../../game-object/gauge/battery-gauge/battery-gauge";
import {createPlayerBatteryGauge} from "./player-battery-gauge";
import {createEnemyBatteryGauge} from "./enemy-battery-gauge";
import {createCamera} from "./camera";
import {BatterySelector} from "../../../../game-object/battery-selector";
import type {BattleSceneNotifier} from "../../../../observer/battle-scene/battle-scene-notifier";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import {BurstGauge} from "../../../../game-object/gauge/burst-gauge/burst-gauge";
import {createPlayerBurstGauge} from "./player-burst-gauge";
import {createEnemyBurstGauge} from "./enemy-burst-gauge";
import {createBatterySelector} from "./battery-slider";
import type {OverlapListener} from "../../../../observer/overlap/overlap-listener";

/** コンストラクタのパラメータ */
export type Param = {
  resources: Resources,
  playerId: PlayerId,
  players: Player[],
  listener: OverlapListener,
  notifier: BattleSceneNotifier
};

/**
 * HUDレイヤーで使用するオブジェクトを全て集めたもの
 *
 * @author y.takeuchi
 */
export class HudLayer {
  /** 本レイヤーのベースとなるthree.jsのシーン */
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
  /** バッテリーセレクタ */
  batterySelector: BatterySelector;
  /** プレイヤーバーストゲージ */
  playerBurstGauge: BurstGauge;
  /** 敵バーストゲージ */
  enemyBurstGauge: BurstGauge;

  constructor(param: Param) {
    const playerInfo = param.players.find(v => v.playerId === param.playerId) || param.players[0];
    const enemyInfo = param.players.find(v => v.playerId !== param.playerId) || param.players[0];

    this.scene = new THREE.Scene();
    this.camera = createCamera();

    this.playerHpGauge = createPlayerHpGauge(param.resources, playerInfo);
    this.playerHpGauge.getThreeJsObjectList().forEach(v => this.scene.add(v));

    this.playerBatteryGauge = createPlayerBatteryGauge(param.resources, playerInfo);
    this.playerBatteryGauge.getThreeJsObjectList().forEach(v => this.scene.add(v));

    this.enemyHpGauge = createEnemyHpGauge(param.resources, enemyInfo);
    this.enemyHpGauge.getThreeJsObjectList().forEach(v => this.scene.add(v));

    this.enemyBatteryGauge = createEnemyBatteryGauge(param.resources, enemyInfo);
    this.enemyBatteryGauge.getThreeJsObjectList().forEach(v => this.scene.add(v));

    this.batterySelector = createBatterySelector(param.resources, param.listener, param.notifier, playerInfo);
    this.scene.add(this.batterySelector.getObject3D());

    this.playerBurstGauge = createPlayerBurstGauge(param.resources);
    this.playerBurstGauge.getThreeJsObjectList().forEach(v => this.scene.add(v));

    this.enemyBurstGauge = createEnemyBurstGauge(param.resources);
    this.enemyBurstGauge.getThreeJsObjectList().forEach(v => this.scene.add(v));
  }
}