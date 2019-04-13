// @flow
import type {Resources} from '../../../../resource/index';
import * as THREE from 'three';
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
import type {TDArmdozer} from "./td-armdozer/td-armdozer";
import {playerArmdozerObjects} from "./td-armdozer/player-armdozer";
import {enemyArmdozerObjects} from "./td-armdozer/enemy-amrdozer";
import SchoolField from "../../../../game-object/stage/shopping-street";
import {appendScene} from "./td-armdozer/append-scene";
import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";

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
  armdozers: TDArmdozer<ArmDozerSprite>[];
  stage: Stage;
  turnIndicator: TurnIndicator;
  _update: Subject<Update>;
  _preRender: Subject<PreRender>;
  _render: Observer<Render>;

  constructor(param: Param) {
    const player = param.players.find(v => v.playerId === param.playerId) || param.players[0];
    const enemy = param.players.find(v => v.playerId !== param.playerId) || param.players[0];

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

    this.armdozers = [
      playerArmdozerObjects(param.resources, player, gameObjectListener),
      enemyArmdozerObjects(param.resources, enemy, gameObjectListener)
    ];
    this.armdozers.forEach(v => {
      appendScene(this.scene, v);
    });

    this.stage = new SchoolField(param.resources);
    this.stage.getThreeJsObjects()
      .forEach(item => this.scene.add(item));

    this.turnIndicator = new TurnIndicator({
      listener: gameObjectListener,
      resources: param.resources
    });
    this.scene.add(this.turnIndicator.getObject3D());

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