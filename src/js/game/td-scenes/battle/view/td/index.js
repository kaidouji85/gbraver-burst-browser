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
import type {TDGameObjects} from "./game-objects";
import {appendTDGameObjects, createTDGameObjects, disposeTDGameObjects} from "./game-objects";
import {toOverlapStream} from "../../../../../action/overlap/overlap-stream";
import type {OverlapAction} from "../../../../../action/overlap";
import {gameObjectStream} from "../../../../../action/game-object-action/game-object-stream";
import type {Resize} from "../../../../../action/resize/resize";
import {skyBox} from "./sky-box";
import {enemySprite, playerSprite, TDSprite} from "./sprite";
import type {TDArmdozer} from "./armdozer";
import {enemyTDArmdozer, playerTDArmdozer} from "./armdozer";

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
  scene: THREE.Scene;
  camera: TDCamera;
  players: TDPlayer[];
  sprites: TDSprite[];
  armdozers: TDArmdozer[];
  gameObjects: TDGameObjects;
  _overlap: Observable<OverlapAction>;

  constructor(param: Param) {
    const player = param.players.find(v => v.playerId === param.playerId) || param.players[0];
    const enemy = param.players.find(v => v.playerId !== param.playerId) || param.players[0];

    this.scene = new THREE.Scene();
    this.scene.background = skyBox(param.resources);

    this.camera = new TDCamera(param.listener.update, param.listener.resize);

    this._overlap = toOverlapStream(param.listener.domEvent, param.rendererDOM, this.camera.getCamera());
    const gameObjectAction = gameObjectStream(param.listener.update, param.listener.preRender, this._overlap);

    this.players = [
      playerTDObjects(param.resources, player, gameObjectAction),
      enemyTDObject(param.resources, enemy, gameObjectAction)
    ];
    this.players.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });

    this.sprites = param.players.map(v => v.playerId === param.playerId
      ? playerSprite(param.resources, v, gameObjectAction)
      : enemySprite(param.resources, v, gameObjectAction)
    );
    this.sprites.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });

    this.armdozers = param.players.map(v => v.playerId === param.playerId
      ? playerTDArmdozer(param.resources, gameObjectAction, v)
      : enemyTDArmdozer(param.resources, gameObjectAction, v)
    );
    this.armdozers.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });
    this.armdozers.forEach(armdozer => {
      this.sprites
        .filter(sprite => sprite.playerId === armdozer.playerId)
        .forEach(sprite => {
          armdozer.getUnderSprite().forEach(object3D => {
            sprite.sprite.addObject3D(object3D);
          });
        })
    });

    this.gameObjects = createTDGameObjects(param.resources, gameObjectAction);
    appendTDGameObjects(this.scene, this.gameObjects);
  }

  /** デストラクタ */
  destructor(): void {
    this.scene.background.dispose();
    this.players.forEach(v => {
      v.destructor();
    });
    this.sprites.forEach(v => {
      v.destructor();
    });
    this.armdozers.forEach(v => {
      v.destructor();
    });
    disposeTDGameObjects(this.gameObjects);
    this.camera.destructor();
    this.scene.dispose();
  }
}