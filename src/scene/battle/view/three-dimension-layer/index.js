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

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  renderer: THREE.WebGLRenderer,
  playerId: PlayerId,
  players: Player[],
  listener: {
    update: Observable<Update>,
    render: Observable<Render>
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
    const enemyInfo = param.players.find(v => v.playerId !== param.playerId) || param.players[0];
    const preRender: Subject<PreRender> = new Subject();
    const gameObjectAction: Observable<GameObjectAction> = merge(
      param.listener.update,
      preRender
    );
    param.listener.render.subscribe(() => {
      preRender.next({
        type: 'PreRender',
        camera: this.camera
      });
      param.renderer.render(this.scene, this.camera);
    });

    this.scene = new THREE.Scene();
    this.camera = createCamera();

    this.stage = createStage(param.resources);
    this.stage.getThreeJsObjects().forEach(item => this.scene.add(item));

    this.playerSprite = createPlayerSprite(param.resources, gameObjectAction, playerInfo);
    this.scene.add(this.playerSprite.getObject3D());

    this.enemySprite = createEnemySprite(param.resources, gameObjectAction, enemyInfo);
    this.scene.add(this.enemySprite.getObject3D());
  }
}
