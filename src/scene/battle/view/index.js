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
  /** レンダラ */
  renderer: THREE.WebGLRenderer;
  /** 3D空間レイヤー */
  threeDimensionLayer: ThreeDimensionLayer;
  /** Head Up Display(HUD)レイヤー */
  hudLayer: HudLayer;

  constructor(param: Param) {
    const stream = createStream(param.listener.gameLoop);
    this.renderer = param.renderer;

    this.threeDimensionLayer = new ThreeDimensionLayer({
      renderer: param.renderer,
      resources: param.resources,
      listener: {
        gameLoop: stream.update3D,
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
        gameLoop: stream.updateHUD,
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