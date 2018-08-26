// @flow
import type {Resources} from '../../../../resource/index';
import * as THREE from 'three';
import {createPlayerSprite} from "./player-sprite";
import {createEnemySprite} from "./enemy-sprite";
import type {ArmDozerSprite} from '../../../../game-object/armdozer/armdozer-sprite';
import {createStage} from './stage';
import type {Stage} from "../../../../game-object/stage/stage";
import {createCamera} from "./camera";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import {Observable} from "rxjs";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import {map, filter} from 'rxjs/operators';
import type {SpriteGameLoop} from "../../../../action/sprite/armdozer-game-loop";

type Param = {
  resources: Resources,
  gameLoopListener: Observable<GameLoop>,
  playerId: PlayerId,
  players: Player[]
};

/**
 *  3D空間に関連するオブジェクト、つまりは関連する全役者をまとめたクラス
 */
export class ThreeDimensionLayer {
  /** シーン */
  scene: THREE.Scene;
  /** カメラ */
  camera: THREE.PerspectiveCamera;
  /** 背景 */
  stage: Stage;
  /** プレイヤースプライト */
  playerSprite: ArmDozerSprite;
  /** 敵スプライト */
  enemySprite: ArmDozerSprite;

  constructor(param: Param) {
    const playerInfo = param.players.find(v => v.playerId === param.playerId) || param.players[0];
    const enemyInfo = param.players.find(v => v.playerId !== param.playerId) || param.players[0];
    const spriteGameLoopListener = param.gameLoopListener
      .pipe(
        filter(v => v.type === 'GameLoop'),
        map(v => ({
          type: 'SpriteGameLoop',
          time: v.time,
          camera: this.camera
        }))
      );

    this.scene = new THREE.Scene();
    this.camera = createCamera();

    this.stage = createStage(param.resources);
    this.stage.getThreeJsObjects().forEach(item => this.scene.add(item));

    this.playerSprite = new createPlayerSprite(param.resources, spriteGameLoopListener, playerInfo);
    this.playerSprite.getThreeJsObjects().forEach(obj => this.scene.add(obj));

    this.enemySprite = new createEnemySprite(param.resources, spriteGameLoopListener, enemyInfo);
    this.enemySprite.getThreeJsObjects().forEach(obj => this.scene.add(obj));
  }
}
