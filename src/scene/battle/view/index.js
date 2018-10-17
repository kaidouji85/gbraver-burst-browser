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
import {createLayerGameLoop} from "./layer-game-loop";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  battleActionNotifier: Observer<BattleSceneAction>,
  gameLoopListener: Observable<GameLoop>,
  domEventListener: Observable<DOMEvent>,
  renderer: THREE.WebGLRenderer,
  playerId: PlayerId,
  players: Player[]
};

/**
 * 戦闘画面のビュー
 */
export class BattleSceneView {
  /** レンダラ */
  renderer: THREE.WebGLRenderer;
  /** 3D空間レイヤー */
  threeDimensionLayer: ThreeDimensionLayer;
  /** Head Up Display(HUD)レイヤー */
  hudLayer: HudLayer;

  constructor(param: Param) {
    const stream = createStream(param.gameLoopListener);
    this.renderer = param.renderer;

    this.threeDimensionLayer = new ThreeDimensionLayer({
      renderer: param.renderer,
      gameLoopListener: stream.update3D,
      renderListener: stream.render3D,
      resources: param.resources,
      playerId: param.playerId,
      players: param.players
    });

    this.hudLayer = new HudLayer({
      resources: param.resources,
      renderer: param.renderer,
      playerId: param.playerId,
      players: param.players,
      battleActionNotifier: param.battleActionNotifier,
      gameLoopListener: stream.updateHUD,
      renderListener: stream.renderHUD,
      domEventListener: param.domEventListener,
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
  const update3D: Subject<GameLoop> = new Subject();
  const render3D: Subject<void> = new Subject();
  const updateHUD: Subject<GameLoop> = new Subject();
  const renderHUD: Subject<void> = new Subject();

  gameLoop.subscribe(action => {
    update3D.next(action);
    updateHUD.next(action);

    render3D.next();
    renderHUD.next();
  });

  return {
    update3D: update3D,
    render3D: render3D,
    updateHUD: updateHUD,
    renderHUD: renderHUD
  };
}