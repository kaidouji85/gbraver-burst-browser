// @flow
import type {Resources} from '../../../../resource/index';
import * as THREE from 'three';
import {createPlayerSprite} from "./player-sprite";
import {createEnemySprite} from "./enemy-sprite";
import type {ArmDozerSprite} from '../../../../game-object/armdozer/common/armdozer-sprite';
import {createStage} from './stage';
import type {Stage} from "../../../../game-object/stage/stage";
import {createCamera} from "./camera";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import {Observable, merge} from "rxjs";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import {filter, map} from 'rxjs/operators';
import {toSpriteGameLoopObservable} from "../../../../action/sprite-game-loop/game-loop-to-sprite-game-loop";
import type {GameObjectAction} from "../../../../action/game-object-action";

type Param = {
  resources: Resources,
  renderer: THREE.WebGLRenderer,
  playerId: PlayerId,
  players: Player[],
  listener: {
    gameLoop: Observable<GameLoop>,
    render: Observable<void>
  },
};

/**
 *  3D空間に関連するオブジェクト、つまりは関連する全役者をまとめたクラス
 */
export class ThreeDimensionLayer {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  stage: Stage;
  playerSprite: ArmDozerSprite;
  enemySprite: ArmDozerSprite;

  constructor(param: Param) {
    const playerInfo = param.players.find(v => v.playerId === param.playerId) || param.players[0];
    const enemyInfo =
      param.players.find(v => v.playerId !== param.playerId) || param.players[0];

    this.scene = new THREE.Scene();
    this.camera = createCamera();

    const gameObjectAction: Observable<GameObjectAction> = merge(
      toSpriteGameLoopObservable(param.listener.gameLoop, this.camera),
      param.listener.gameLoop,
    );

    this.stage = createStage(param.resources);
    this.stage.getThreeJsObjects().forEach(item => this.scene.add(item));

    this.playerSprite = createPlayerSprite(param.resources, gameObjectAction, playerInfo);
    this.scene.add(this.playerSprite.getObject3D());

    this.enemySprite = createEnemySprite(param.resources, gameObjectAction, enemyInfo);
    this.scene.add(this.enemySprite.getObject3D());

    param.listener.render.subscribe(action => {
      param.renderer.render(this.scene, this.camera);
    });
  }
}
