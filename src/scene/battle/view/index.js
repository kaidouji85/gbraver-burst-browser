// @flow
import type {Resources} from '../../../resource/index';
import * as THREE from 'three';
import {ThreeDimensionLayer} from './three-dimension-layer';
import {HudLayer} from './hud-layer/index';
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import type {GameLoop} from "../../../action/game-loop/game-loop";
import {Observable, Observer, Subject} from "rxjs";
import type {DOMEvent} from "../../../action/dom-event";
import type {BattleSceneAction} from "../../../action/battle-scene";
import type {Update} from "../../../action/game-loop/update";
import type {Render} from "../../../action/game-loop/render";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  renderer: THREE.WebGLRenderer,
  playerId: PlayerId,
  players: Player[],
  listener: {
    gameLoop: Observable<GameLoop>,
    domEvent: Observable<DOMEvent>,
  },
  notifier: {
    battleAction: Observer<BattleSceneAction>,
  },
};

/**
 * 戦闘画面のビュー
 */
export class BattleSceneView {
  renderer: THREE.WebGLRenderer;
  threeDimensionLayer: ThreeDimensionLayer;
  hudLayer: HudLayer;

  constructor(param: Param) {
    const sceneGameLoop = new BattleSceneGameLoop(param.listener.gameLoop);

    this.renderer = param.renderer;

    this.threeDimensionLayer = new ThreeDimensionLayer({
      renderer: param.renderer,
      resources: param.resources,
      listener: {
        update: sceneGameLoop.update3D,
        render: sceneGameLoop.render3D,
      },
      playerId: param.playerId,
      players: param.players
    });

    this.hudLayer = new HudLayer({
      resources: param.resources,
      renderer: param.renderer,
      playerId: param.playerId,
      players: param.players,
      listener: {
        update: sceneGameLoop.updateHUD,
        render: sceneGameLoop.renderHUD,
        domEvent: param.listener.domEvent,
      },
      notifier: {
        battleAction: param.notifier.battleAction,
      }
    });
  }
}

/**
 * 戦闘シーンのゲームループストリーム
 * 各ストリームは以下の順番に実行される
 *
 * 1) update3D
 * 2) updateHUD
 * 3) render3D
 * 4) renderHUD
 *
 * @return シーン全体のゲームループストリーム
 */
class BattleSceneGameLoop {
  update3D: Subject<Update>;
  render3D: Subject<Render>;
  updateHUD: Subject<Update>;
  renderHUD: Subject<Render>;

  constructor(gameLoop: Observable<GameLoop>) {
    this.update3D = new Subject();
    this.render3D = new Subject();
    this.updateHUD = new Subject();
    this.renderHUD = new Subject();

    gameLoop.subscribe(action => {
      const update = {type: 'Update', time: action.time};
      this.update3D.next(update);
      this.updateHUD.next(update);

      const render = {type: 'Render'};
      this.render3D.next(render);
      this.renderHUD.next(render);
    });
  }
}