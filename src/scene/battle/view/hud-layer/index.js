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
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import type {DOMEvent} from "../../../../action/dom-event";
import {toOverlapObservable} from "../../../../action/overlap/dom-event-to-overlap";
import type {BattleSceneAction} from "../../../../action/battle-scene";
import type {GameObjectAction} from "../../../../action/game-object-action";
import {divideIntoUpdateAndRender} from "../../../../action/game-loop/divide-into-update-and-render";
import {BatteryNumber} from "../../../../game-object/battery-number/battery-number";
import {DamageIndicator} from "../../../../game-object/damage-indicator/damage-indicator";
import {enemyDamageIndicator, playerDamageIndicator} from "../../../../game-object/damage-indicator";
import {enemyBatteryNumber, playerBatteryNumber} from "../../../../game-object/battery-number";

/** コンストラクタのパラメータ */
export type Param = {
  resources: Resources,
  renderer: THREE.WebGLRenderer,
  playerId: PlayerId,
  players: Player[],
  gameLoopListener: Observable<GameLoop>,
  renderListener: Observable<void>,
  domEventListener: Observable<DOMEvent>,
  battleActionNotifier: Observer<BattleSceneAction>
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

  constructor(param: Param) {
    const player = param.players.find(v => v.playerId === param.playerId) || param.players[0];
    const enemy = param.players.find(v => v.playerId !== param.playerId) || param.players[0];

    this.scene = new THREE.Scene();
    this.camera = createCamera();

    const gameObjectAction: Observable<GameObjectAction> = merge(
      toOverlapObservable(param.domEventListener, param.renderer, this.camera),
      param.gameLoopListener
    );

    this.batterySelector = createBatterySelector({
      resources: param.resources,
      listener: gameObjectAction,
      notifier: param.battleActionNotifier,
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

    param.renderListener.subscribe(() => {
      param.renderer.render(this.scene, this.camera);
    });
  }
}