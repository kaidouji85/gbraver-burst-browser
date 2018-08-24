// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../resource/index';
import {createCamera} from "./camera";
import {BatterySelector} from "../../../../game-object/battery-selector";
import type {BattleSceneNotifier} from "../../../../observer/battle-scene/battle-scene-notifier";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import {createBatterySelector} from "./battery-selector";
import type {OverlapListener} from "../../../../observer/overlap/overlap-listener";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {createPlayerGauge} from "./player-gauge";
import {createEnemyGauge} from "./enemy-gauge";
import {TurnIndicator} from "../../../../game-object/turn-indicator/turn-indicator";
import {createTurnIndicator} from "./turn-indicator";
import {BurstButton} from "../../../../game-object/burst-button/burst-button";
import {createBurstButton} from "./burst-button";
import {Observable} from "rxjs";
import type {GameLoop} from "../../../../action/game-loop/game-loop";

/** コンストラクタのパラメータ */
export type Param = {
  resources: Resources,
  playerId: PlayerId,
  players: Player[],
  listener: Observable<GameLoop>,
  deprecatedListener: OverlapListener,
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
  /** バッテリーセレクタ */
  batterySelector: BatterySelector;
  /** プレイヤーのゲージ */
  playerGauge: Gauge;
  /** 敵のゲージ */
  enemyGauge: Gauge;
  /** ターンインジケーター */
  turnIndicator: TurnIndicator;
  /** バーストボタン */
  burstButton: BurstButton;

  constructor(param: Param) {
    const player = param.players.find(v => v.playerId === param.playerId) || param.players[0];
    const enemy = param.players.find(v => v.playerId !== param.playerId) || param.players[0];

    this.scene = new THREE.Scene();
    this.camera = createCamera();

    this.batterySelector = createBatterySelector(param.resources, param.listener, param.deprecatedListener, param.notifier, player);
    this.scene.add(this.batterySelector.getObject3D());

    this.playerGauge = createPlayerGauge(param.resources, param.listener, player);
    this.scene.add(this.playerGauge.getObject3D());

    this.enemyGauge = createEnemyGauge(param.resources, param.listener, enemy);
    this.scene.add(this.enemyGauge.getObject3D());

    this.turnIndicator = createTurnIndicator(param.resources, param.listener);
    this.scene.add(this.turnIndicator.getObject3D());

    this.burstButton = createBurstButton(param.resources, param.listener);
    this.scene.add(this.burstButton.getObject3D());
  }
}