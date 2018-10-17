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
    const stream = createStream(param.listener.gameLoop);
    this.renderer = param.renderer;

    this.threeDimensionLayer = new ThreeDimensionLayer({
      renderer: param.renderer,
      resources: param.resources,
      listener: {
        update: stream.update3D,
        render: stream.render3D,
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
        update: stream.updateHUD,
        render: stream.renderHUD,
        domEvent: param.listener.domEvent,
      },
      notifier: {
        battleAction: param.notifier.battleAction,
      }
    });
  }
}

/**
 * ゲームループで、以下の順番に処理が実行されるストリームの集合を返す
 *
 * 1) 3Dレイヤーのアップデート
 * 2) HUDレイヤーのアップデート
 * 3) 3Dレイヤーの描画
 * 4) HUDレイヤーの描画
 *
 * @return シーン全体のゲームループストリーム
 */
function createStream(gameLoop: Observable<GameLoop>) {
  const update3D: Subject<Update> = new Subject();
  const render3D: Subject<Render> = new Subject();
  const updateHUD: Subject<Update> = new Subject();
  const renderHUD: Subject<Render> = new Subject();

  gameLoop.subscribe(action => {
    const update = {type: 'Update', time: action.time};
    update3D.next(update);
    updateHUD.next(update);

    const render = {type: 'Render'};
    render3D.next(render);
    renderHUD.next(render);
  });

  return {
    update3D: update3D,
    render3D: render3D,
    updateHUD: updateHUD,
    renderHUD: renderHUD
  };
}