// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../resource/index';
import {createCamera} from "./camera";
import {BatterySelector} from "../../../../game-object/battery-selector";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import {createBatterySelector} from "./battery-selector";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {createPlayerGauge} from "./player-gauge";
import {createEnemyGauge} from "./enemy-gauge";
import {TurnIndicator} from "../../../../game-object/turn-indicator/turn-indicator";
import {createTurnIndicator} from "./turn-indicator";
import {BurstButton} from "../../../../game-object/burst-button/burst-button";
import {createBurstButton} from "./burst-button";
import {merge, Observable, Observer, Subject} from "rxjs";
import type {DOMEvent} from "../../../../action/dom-event";
import {toOverlapObservable} from "../../../../action/overlap/dom-event-to-overlap";
import type {BattleSceneAction} from "../../../../action/battle-scene";
import type {GameObjectAction} from "../../../../action/game-object-action";
import {BatteryNumber} from "../../../../game-object/battery-number/battery-number";
import {DamageIndicator} from "../../../../game-object/damage-indicator/damage-indicator";
import {enemyDamageIndicator, playerDamageIndicator} from "../../../../game-object/damage-indicator";
import {enemyBatteryNumber, playerBatteryNumber} from "../../../../game-object/battery-number";
import type {Update} from "../../../../action/game-loop/update";
import type {Render} from "../../../../action/game-loop/render";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import type {PreRender} from "../../../../action/game-loop/pre-render";

/** コンストラクタのパラメータ */
export type Param = {
  resources: Resources,
  renderer: THREE.WebGLRenderer,
  playerId: PlayerId,
  players: Player[],
  listener: {
    gameLoop: Observable<GameLoop>,
    domEvent: Observable<DOMEvent>,
  },
  notifier: {
    battleAction: Observer<BattleSceneAction>
  }
};

/**
 * HUDレイヤーで使用するオブジェクトを全て集めたもの
 *
 * @author y.takeuchi
 */
export class HudLayer {
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  batterySelector: BatterySelector;
  playerGauge: Gauge;
  enemyGauge: Gauge;
  turnIndicator: TurnIndicator;
  burstButton: BurstButton;
  playerBatteryNumber: BatteryNumber;
  playerDamageIndicator: DamageIndicator;
  enemyBatteryNumber: BatteryNumber;
  enemyDamageIndicator: DamageIndicator;

  _update: Subject<Update>;
  _preRender: Subject<PreRender>;
  _renderer: THREE.WebGLRenderer;

  constructor(param: Param) {
    this.scene = new THREE.Scene();
    this.camera = createCamera();

    this._update = new Subject();
    this._preRender = new Subject();
    this._renderer = param.renderer;

    const player = param.players.find(v => v.playerId === param.playerId) || param.players[0];
    const enemy = param.players.find(v => v.playerId !== param.playerId) || param.players[0];
    const gameObjectAction: Observable<GameObjectAction> = merge(
      toOverlapObservable(param.listener.domEvent, param.renderer, this.camera),
      this._update,
      this._preRender
    );

    this.batterySelector = createBatterySelector({
      resources: param.resources,
      listener: gameObjectAction,
      notifier: param.notifier.battleAction,
      playerInfo: player
    });
    this.scene.add(this.batterySelector.getObject3D());

    this.playerGauge = createPlayerGauge(param.resources, gameObjectAction, player);
    this.scene.add(this.playerGauge.getObject3D());

    this.enemyGauge = createEnemyGauge(param.resources, gameObjectAction, enemy);
    this.scene.add(this.enemyGauge.getObject3D());

    this.turnIndicator = createTurnIndicator(param.resources, gameObjectAction);
    this.scene.add(this.turnIndicator.getObject3D());

    this.burstButton = createBurstButton(param.resources, gameObjectAction);
    this.scene.add(this.burstButton.getObject3D());

    this.playerBatteryNumber = playerBatteryNumber({
      resources: param.resources,
      listener: gameObjectAction
    });
    this.scene.add(this.playerBatteryNumber.getObject3D());

    this.playerDamageIndicator = playerDamageIndicator({
      resources: param.resources,
      listener: gameObjectAction
    });
    this.scene.add(this.playerDamageIndicator.getObject3D());

    this.enemyBatteryNumber = enemyBatteryNumber({
      resources: param.resources,
      listener: gameObjectAction
    });
    this.scene.add(this.enemyBatteryNumber.getObject3D());

    this.enemyDamageIndicator = enemyDamageIndicator({
      resources: param.resources,
      listener: gameObjectAction
    });
    this.scene.add(this.enemyDamageIndicator.getObject3D());


    param.listener.gameLoop.subscribe(action => {
      this._gameLoop(action);
    });
  }

  /** ゲームループ */
  _gameLoop(action: GameLoop): void {
    this._update.next({
      type: 'Update',
      time: action.time
    });

    this._preRender.next({
      type: 'PreRender',
      camera: this.camera
    });

    this._renderer.render(this.scene, this.camera);
  }
}