// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../../resource';
import type {Player, PlayerId} from "gbraver-burst-core";
import {Observable} from "rxjs";
import type {BattleSceneAction} from "../../actions";
import type {Update} from "../../../../../game-loop/update";
import type {PreRender} from "../../../../../game-loop/pre-render";
import {PlainHUDCamera} from "../../../../../game-object/camera/plain-hud";
import {HUDGameObjects} from "./game-objects";
import type {OverlapEvent} from "../../../../../render/overlap-event/overlap-event";
import {gameObjectStream} from "../../../../../game-object/action/game-object-action";
import type {Resize} from "../../../../../window/resize";
import {enemyArmdozerHUD, playerArmdozerHUD} from "./armdozer-objects";
import {enemyHUDObjects, HUDPlayer, playerHUDObjects} from "./player";
import {enemyHUDPilotObjects, playerHUDPilotObjects} from "./pilot-objects";
import type {HUDPilotObjects} from "./pilot-objects/hud-pilot-objects";
import type {HUDArmdozerObjects} from "./armdozer-objects/hud-armdozer-ibjects";
import type {GameObjectAction} from "../../../../../game-object/action/game-object-action";
import type {OverlapNotifier} from "../../../../../render/overla-notifier";
import type {Stream} from "../../../../../stream/core";

/** コンストラクタのパラメータ */
export type Param = {
  resources: Resources,
  renderer: OverlapNotifier,
  playerId: PlayerId,
  players: Player[],
  listener: {
    update: Stream<Update>,
    preRender: Stream<PreRender>,
    resize: Stream<Resize>,
  }
};

/** イベント通知 */
type Notifier = {
  battleAction: Observable<BattleSceneAction>,
};

/**
 * HUDレイヤーで使用するオブジェクトを全て集めたもの
 */
export class HudLayer {
  scene: typeof THREE.Scene;
  camera: PlainHUDCamera;
  players: HUDPlayer[];
  armdozers: HUDArmdozerObjects[];
  pilots: HUDPilotObjects[];
  gameObjects: HUDGameObjects;
  _overlap: Stream<OverlapEvent>;
  _gameObjectAction: Stream<GameObjectAction>;

  constructor(param: Param) {
    this.scene = new THREE.Scene();
    this.camera = new PlainHUDCamera(param.listener.resize);

    this._overlap = param.renderer.createOverlapNotifier(this.camera.getCamera());
    this._gameObjectAction = gameObjectStream(param.listener.update, param.listener.preRender, this._overlap);

    const player = param.players.find(v => v.playerId === param.playerId)
      || param.players[0];
    this.gameObjects = new HUDGameObjects(param.resources, this._gameObjectAction, player);
    this.gameObjects.getObject3Ds().forEach(object => {
      this.scene.add(object);
    });

    this.players = param.players.map(v => v.playerId === param.playerId
      ? playerHUDObjects(param.resources, v, this._gameObjectAction)
      : enemyHUDObjects(param.resources, v, this._gameObjectAction)
    );
    this.players.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });

    this.armdozers = param.players.map(v => v.playerId === param.playerId
      ? playerArmdozerHUD(param.resources, this._gameObjectAction, v)
      : enemyArmdozerHUD(param.resources, this._gameObjectAction, v)
    );
    this.armdozers.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });

    this.pilots = param.players.map(v => v.playerId === param.playerId
      ? playerHUDPilotObjects(param.resources, this._gameObjectAction, v)
      : enemyHUDPilotObjects(param.resources, this._gameObjectAction, v)
    );
    this.pilots.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });
  }

  /** デストラクタ */
  destructor(): void {
    const removeTargets: typeof THREE.Object3D[] = [
      ...this.gameObjects.getObject3Ds(),
      ...this.armdozers.flatMap(v => v.getObject3Ds()),
      ...this.players.flatMap(v => v.getObject3Ds()),
      ...this.pilots.flatMap(v => v.getObject3Ds()),
    ];
    removeTargets.forEach(v => {
      this.scene.remove(v);
    });

    this.gameObjects.destructor();
    this.armdozers.forEach(armdozer => {
      armdozer.destructor();
    });
    this.players.forEach(player => {
      player.destructor();
    });
    this.pilots.forEach(pilot => {
      pilot.destructor();
    })
    this.camera.destructor();
  }

  /**
   * イベント通知ストリームを取得
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      battleAction: this.gameObjects.notifier().battleSceneAction
    };
  }
}