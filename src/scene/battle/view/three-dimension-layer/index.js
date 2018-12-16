// @flow
import type {Resources} from '../../../../resource/index';
import * as THREE from 'three';
import {createPlayerSprite} from "./player-sprite";
import {createEnemySprite} from "./enemy-sprite";
import type {ArmDozerSprite} from '../../../../game-object/armdozer/armdozer-sprite';
import {createStage} from './stage';
import type {Stage} from "../../../../game-object/stage/stage";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import {merge, Observable, Observer, Subject} from "rxjs";
import {filter, map} from 'rxjs/operators';
import type {GameObjectAction} from "../../../../action/game-object-action";
import type {Update} from "../../../../action/game-loop/update";
import type {PreRender} from "../../../../action/game-loop/pre-render";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import type {Render} from "../../../../action/game-loop/render";
import {Battle3DCamera} from "../../../../game-object/camera/battle-3d";
import type {DOMEvent} from "../../../../action/dom-event";
import {TurnIndicator} from "../../../../game-object/turn-indicator/turn-indicator";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {BatteryNumber} from "../../../../game-object/battery-number/battery-number";
import {DamageIndicator} from "../../../../game-object/damage-indicator/damage-indicator";
import {enemyBatteryNumber, playerBatteryNumber} from "../../../../game-object/battery-number";
import {enemyDamageIndicator, playerDamageIndicator} from "../../../../game-object/damage-indicator";
import {createPlayerGauge} from "./player-gauge";
import {createEnemyGauge} from "./enemy-gauge";
import {createTurnIndicator} from "./turn-indicator";
import {RecoverBattery} from "../../../../game-object/recover-battery/recover-battery";
import {enemyRecoverBattery, playerRecoverBattery} from "../../../../game-object/recover-battery";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  playerId: PlayerId,
  players: Player[],
  listener: {
    domEvent: Observable<DOMEvent>,
    gameLoop: Observable<GameLoop>,
  },
  notifier: {
    render: Observer<Render>
  }
};

/**
 *  3D空間に関連するオブジェクト、つまりは関連する全役者をまとめたクラス
 */
export class ThreeDimensionLayer {
  scene: THREE.Scene;
  camera: Battle3DCamera;
  stage: Stage;
  turnIndicator: TurnIndicator;
  playerSprite: ArmDozerSprite;
  playerGauge: Gauge;
  playerBatteryNumber: BatteryNumber;
  playerRecoverBattery: RecoverBattery;
  playerDamageIndicator: DamageIndicator;
  enemySprite: ArmDozerSprite;
  enemyGauge: Gauge;
  enemyBatteryNumber: BatteryNumber;
  enemyRecoverBattery: RecoverBattery;
  enemyDamageIndicator: DamageIndicator;


  _update: Subject<Update>;
  _preRender: Subject<PreRender>;
  _render: Observer<Render>;

  constructor(param: Param) {
    this._update = new Subject();
    this._preRender = new Subject();
    this._render = param.notifier.render;
    const gameObjectListener: Observable<GameObjectAction> = merge(
      this._update,
      this._preRender
    );

    this.scene = new THREE.Scene();
    this.camera = new Battle3DCamera({
      listener: {
        domEvent: param.listener.domEvent,
        gameObject: gameObjectListener
      }
    });

    const player = param.players.find(v => v.playerId === param.playerId) || param.players[0];
    const enemy = param.players.find(v => v.playerId !== param.playerId) || param.players[0];

    this.stage = createStage(param.resources);
    this.stage.getThreeJsObjects().forEach(item => this.scene.add(item));

    this.turnIndicator = createTurnIndicator(param.resources, gameObjectListener);
    this.scene.add(this.turnIndicator.getObject3D());

    this.playerSprite = createPlayerSprite(param.resources, gameObjectListener, player);
    this.scene.add(this.playerSprite.getObject3D());

    this.playerGauge = createPlayerGauge(param.resources, gameObjectListener, player);
    this.scene.add(this.playerGauge.getObject3D());

    this.playerBatteryNumber = playerBatteryNumber({
      resources: param.resources,
      listener: gameObjectListener
    });
    this.scene.add(this.playerBatteryNumber.getObject3D());

    this.playerDamageIndicator = playerDamageIndicator({
      resources: param.resources,
      listener: gameObjectListener
    });
    this.scene.add(this.playerDamageIndicator.getObject3D());

    this.playerRecoverBattery = playerRecoverBattery(param.resources, gameObjectListener);
    this.scene.add(this.playerRecoverBattery.getObject3D());

    this.enemySprite = createEnemySprite(param.resources, gameObjectListener, enemy);
    this.scene.add(this.enemySprite.getObject3D());

    this.enemyGauge = createEnemyGauge(param.resources, gameObjectListener, enemy);
    this.scene.add(this.enemyGauge.getObject3D());

    this.enemyBatteryNumber = enemyBatteryNumber({
      resources: param.resources,
      listener: gameObjectListener
    });
    this.scene.add(this.enemyBatteryNumber.getObject3D());

    this.enemyRecoverBattery = enemyRecoverBattery(param.resources, gameObjectListener);
    this.scene.add(this.enemyRecoverBattery.getObject3D());

    this.enemyDamageIndicator = enemyDamageIndicator({
      resources: param.resources,
      listener: gameObjectListener
    });
    this.scene.add(this.enemyDamageIndicator.getObject3D());

    param.listener.gameLoop.subscribe(action => {
      this._gameLoop(action);
    });
  }

  /** ゲームループの処理 */
  _gameLoop(action: GameLoop): void {
    this._update.next({
      type: 'Update',
      time: action.time
    });

    this._preRender.next({
      type: 'PreRender',
      camera: this.camera.getCamera()
    });

    this._render.next({
      type: 'Render',
      scene: this.scene,
      camera: this.camera.getCamera()
    });
  }
}