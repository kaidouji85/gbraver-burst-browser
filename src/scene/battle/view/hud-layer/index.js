// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../resource/index';
import {createCamera} from "./camera";
import {BatterySelector} from "../../../../game-object/battery-selector";
import type {BattleSceneNotifier} from "../../../../deperecated-observer/battle-scene/battle-scene-notifier";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import {createBatterySelector} from "./battery-selector";
import type {OverlapListener} from "../../../../deperecated-observer/overlap/overlap-listener";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {createPlayerGauge} from "./player-gauge";
import {createEnemyGauge} from "./enemy-gauge";
import {TurnIndicator} from "../../../../game-object/turn-indicator/turn-indicator";
import {createTurnIndicator} from "./turn-indicator";
import {BurstButton} from "../../../../game-object/burst-button/burst-button";
import {createBurstButton} from "./burst-button";
import {Observable} from "rxjs";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import type {DOMEvent} from "../../../../action/dom-event";
import {toOverlapObservable} from "../../../../observer/to-overlap";

/** コンストラクタのパラメータ */
export type Param = {
  resources: Resources,
  renderer: THREE.WebGLRenderer,
  playerId: PlayerId,
  players: Player[],
  gameLoopListener: Observable<GameLoop>,
  domEventListener: Observable<DOMEvent>,
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
    const overlapListener = toOverlapObservable(param.domEventListener, param.renderer, this.camera);

    this.batterySelector = createBatterySelector({
      resources: param.resources,
      gameLoopListener: param.gameLoopListener,
      overlapListener: overlapListener,
      deprecatedListener: param.deprecatedListener,
      notifier: param.notifier,
      playerInfo: player
    });
    this.scene.add(this.batterySelector.getObject3D());

    this.playerGauge = createPlayerGauge(param.resources, param.gameLoopListener, player);
    this.scene.add(this.playerGauge.getObject3D());

    this.enemyGauge = createEnemyGauge(param.resources, param.gameLoopListener, enemy);
    this.scene.add(this.enemyGauge.getObject3D());

    this.turnIndicator = createTurnIndicator(param.resources, param.gameLoopListener);
    this.scene.add(this.turnIndicator.getObject3D());

    this.burstButton = createBurstButton(param.resources, param.gameLoopListener);
    this.scene.add(this.burstButton.getObject3D());
  }
}