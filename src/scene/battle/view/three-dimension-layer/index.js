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
import {merge, Observable, Subject} from "rxjs";
import {filter, map} from 'rxjs/operators';
import type {GameObjectAction} from "../../../../action/game-object-action";
import type {Update} from "../../../../action/game-loop/update";
import type {Render} from "../../../../action/game-loop/render";
import type {PreRender} from "../../../../action/game-loop/pre-render";
import type {GameLoop} from "../../../../action/game-loop/game-loop";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  renderer: THREE.WebGLRenderer,
  playerId: PlayerId,
  players: Player[],
  listener: {
    gameLoop: Observable<GameLoop>,
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
    this.scene = new THREE.Scene();
    this.camera = createCamera();

    const playerInfo = param.players.find(v => v.playerId === param.playerId) || param.players[0];
    const enemyInfo = param.players.find(v => v.playerId !== param.playerId) || param.players[0];
    const ownGameLoop = new OwnGameLoop(param.listener.gameLoop, this.camera);
    const gameObjectAction: Observable<GameObjectAction> = merge(
      ownGameLoop.update,
      ownGameLoop.preRender
    );
    ownGameLoop.render.subscribe(() => {
      param.renderer.render(this.scene, this.camera);
    });

    this.stage = createStage(param.resources);
    this.stage.getThreeJsObjects().forEach(item => this.scene.add(item));

    this.playerSprite = createPlayerSprite(param.resources, gameObjectAction, playerInfo);
    this.scene.add(this.playerSprite.getObject3D());

    this.enemySprite = createEnemySprite(param.resources, gameObjectAction, enemyInfo);
    this.scene.add(this.enemySprite.getObject3D());
  }
}

/**
 * 3Dレイヤーのゲームループ制御
 * 以下の順番でイベントが呼ばれる
 *
 * (1)update
 * (2)preRender
 * (3)render
 */
class OwnGameLoop {
  update: Subject<Update>;
  preRender: Subject<PreRender>;
  render: Subject<Render>;

  /**
   * コンストラクタ
   *
   * @param gameLoop 起点となるゲームループ
   * @param camera カメラ
   */
  constructor(gameLoop: Observable<GameLoop>, camera: THREE.Camera) {
    this.update = new Subject();
    this.preRender = new Subject();
    this.render = new Subject();

    gameLoop.subscribe(action => {
      this.update.next({
        type: 'Update',
        time: action.time
      });

      this.preRender.next({
        type: 'PreRender',
        camera: camera
      });

      this.render.next({
        type: 'Render'
      })
    })
  }
}