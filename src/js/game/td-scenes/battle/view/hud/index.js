// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../../resource';
import type {Player, PlayerId} from "gbraver-burst-core";
import {Observable, Subscription} from "rxjs";
import type {TdDOMEvent} from "../../../../../action/td-dom";
import {toOverlapStream} from "../../../../../action/overlap/overlap-stream";
import type {BattleSceneAction} from "../../../../../action/battle-scene";
import type {Update} from "../../../../../action/game-loop/update";
import type {PreRender} from "../../../../../action/game-loop/pre-render";
import {PlainHUDCamera} from "../../../../../game-object/camera/plain-hud";
import type {HUDGameObjects} from "./game-objects";
import {appendHUDGameObjects, createHUDGameObjects, disposeHUDGameObjects} from "./game-objects";
import type {OverlapAction} from "../../../../../action/overlap";
import {gameObjectStream} from "../../../../../action/game-object-action/game-object-stream";
import type {SafeAreaInset} from "../../../../../safe-area/safe-area-inset";
import type {Resize} from "../../../../../action/resize/resize";
import type {HUDArmdozer} from "./armdozer";
import {enemyArmdozerHUD, playerArmdozerHUD} from "./armdozer";
import {enemyHUDObjects, HUDPlayer, playerHUDObjects} from "./player";

/** コンストラクタのパラメータ */
export type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  safeAreaInset: SafeAreaInset,
  playerId: PlayerId,
  players: Player[],
  listener: {
    update: Observable<Update>,
    preRender: Observable<PreRender>,
    domEvent: Observable<TdDOMEvent>,
    resize: Observable<Resize>,
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
  scene: THREE.Scene;
  camera: PlainHUDCamera;
  playres: HUDPlayer[];
  armdozers: HUDArmdozer[];
  gameObjects: HUDGameObjects;

  _playerId: PlayerId;
  _rendererDOM: HTMLElement;
  _safeAreaInset: SafeAreaInset;
  _overlap: Observable<OverlapAction>;
  _subscription: Subscription[];

  constructor(param: Param) {
    this._playerId = param.playerId;
    this._rendererDOM = param.rendererDOM;
    this._safeAreaInset = param.safeAreaInset;

    this.scene = new THREE.Scene();
    this.camera = new PlainHUDCamera(param.listener.resize);

    this._overlap = toOverlapStream(param.listener.domEvent, this._rendererDOM, this.camera.getCamera());
    const gameObjectAction = gameObjectStream(param.listener.update, param.listener.preRender, this._overlap);

    const player = param.players.find(v => v.playerId === param.playerId)
      || param.players[0];
    this.gameObjects = createHUDGameObjects(param.resources, gameObjectAction, player);
    appendHUDGameObjects(this.scene, this.gameObjects);

    this.playres = param.players.map(v => v.playerId === param.playerId
      ? playerHUDObjects(param.resources, v, gameObjectAction)
      : enemyHUDObjects(param.resources, v, gameObjectAction)
    );
    this.playres.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });

    this.armdozers = param.players.map(v => v.playerId === param.playerId
      ? playerArmdozerHUD(param.resources, gameObjectAction, v)
      : enemyArmdozerHUD(param.resources, gameObjectAction, v)
    );
    this.armdozers.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v)
      });

    this._subscription = [
      param.listener.resize.subscribe(action => {
        this._resize(action);
      }),
    ];
  }

  /** デストラクタ */
  destructor(): void {
    disposeHUDGameObjects(this.gameObjects);
    this.camera.destructor();
    this.scene.dispose();
    this._subscription.forEach(v => {
      v.unsubscribe();
    });
    this.armdozers.forEach(v => {
      v.destructor();
    });
  }

  /**
   * イベント通知ストリームを取得
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      battleAction: this.gameObjects.notifier.battleSceneAction
    };
  }

  /** リサイズ */
  _resize(action: Resize): void {
    this._safeAreaInset = action.safeAreaInset;
  }
}