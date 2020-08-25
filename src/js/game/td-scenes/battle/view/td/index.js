// @flow
import type {Resources} from '../../../../../resource';
import * as THREE from 'three';
import type {Player, PlayerId} from "gbraver-burst-core";
import {Observable} from "rxjs";
import type {Update} from "../../../../../action/game-loop/update";
import type {PreRender} from "../../../../../action/game-loop/pre-render";
import {TDCamera} from "../../../../../game-object/camera/td";
import type {TdDOMEvent} from "../../../../../action/td-dom";
import type {TDPlayer} from "./player";
import {enemyTDObject, playerTDObjects} from "./player";
import {TDGameObjects} from "./game-objects";
import {toOverlapStream} from "../../../../../action/overlap/overlap-stream";
import type {OverlapAction} from "../../../../../action/overlap";
import {gameObjectStream} from "../../../../../action/game-object-action/game-object-stream";
import type {Resize} from "../../../../../action/resize/resize";
import {skyBox} from "./sky-box";
import {enemySprite, playerSprite} from "./armdozer-sprite";
import {enemyTDArmdozer, playerTDArmdozer} from "./armdozer-objects";
import type {GameObjectAction} from "../../../../../action/game-object-action";
import type {TDArmdozerObjects} from "./armdozer-objects/armdozer-objects";
import {TDArmdozerSprite} from "./armdozer-sprite/armdozer-sprite";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  playerId: PlayerId,
  players: Player[],
  rendererDOM: HTMLElement,
  listener: {
    domEvent: Observable<TdDOMEvent>,
    resize: Observable<Resize>,
    update: Observable<Update>,
    preRender: Observable<PreRender>,
  }
};

/** 3Dレイヤー */
export class ThreeDimensionLayer {
  scene: typeof THREE.Scene;
  camera: TDCamera;
  players: TDPlayer[];
  sprites: TDArmdozerSprite[];
  armdozerObjects: TDArmdozerObjects[];
  gameObjects: TDGameObjects;
  _overlap: Observable<OverlapAction>;
  _gameObjectAction: Observable<GameObjectAction>;

  constructor(param: Param) {
    const player = param.players.find(v => v.playerId === param.playerId) || param.players[0];
    const enemy = param.players.find(v => v.playerId !== param.playerId) || param.players[0];

    this.scene = new THREE.Scene();
    this.scene.background = skyBox(param.resources);

    this.camera = new TDCamera(param.listener.update, param.listener.resize);

    this._overlap = toOverlapStream(param.listener.domEvent, param.rendererDOM, this.camera.getCamera());
    this._gameObjectAction = gameObjectStream(param.listener.update, param.listener.preRender, this._overlap);

    this.players = [
      playerTDObjects(param.resources, player, this._gameObjectAction),
      enemyTDObject(param.resources, enemy, this._gameObjectAction)
    ];
    this.players.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });

    this.sprites = param.players.map(v => v.playerId === param.playerId
      ? playerSprite(param.resources, v, this._gameObjectAction)
      : enemySprite(param.resources, v, this._gameObjectAction)
    );
    this.sprites.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });

    this.armdozerObjects = param.players.map(v => v.playerId === param.playerId
      ? playerTDArmdozer(param.resources, this._gameObjectAction, v)
      : enemyTDArmdozer(param.resources, this._gameObjectAction, v)
    );
    this.armdozerObjects.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });
    this.armdozerObjects.forEach(armdozer => {
      this.sprites
        .filter(sprite => sprite.playerId === armdozer.playerId)
        .forEach(sprite => {
          armdozer.getUnderSprite().forEach(object3D => {
            sprite.sprite.addObject3D(object3D);
          });
        })
    });

    this.gameObjects = new TDGameObjects(param.resources, this._gameObjectAction);
    this.gameObjects.getObject3Ds().forEach(object => {
      this.scene.add(object);
    });
  }

  /** デストラクタ */
  destructor(): void {
    this.scene.background.dispose();
    this.players.forEach(player => {
      player.getObject3Ds().forEach(object => {
        this.scene.remove(object)
      });
      player.destructor();
    });
    this.sprites.forEach(sprite => {
      sprite.getObject3Ds().forEach(object => {
        this.scene.remove(object);
      });
      sprite.destructor();
    });
    this.armdozerObjects.forEach(armdozer => {
      armdozer.getObject3Ds().forEach(object => {
        this.scene.remove(object);
      });
      armdozer.destructor();
    });
    this.gameObjects.getObject3Ds().forEach(object => {
      this.scene.remove(object);
    });
    this.gameObjects.destructor();

    this.camera.destructor();
    this.scene.dispose();
  }
}