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
  renderer: THREE.WebGLRenderer;
  threeDimensionLayer: ThreeDimensionLayer;
  hudLayer: HudLayer;

  constructor(param: Param) {
    const ownGameLoop = new OwnGameLoop(param.listener.gameLoop);

    this.renderer = param.renderer;

    this.threeDimensionLayer = new ThreeDimensionLayer({
      renderer: param.renderer,
      resources: param.resources,
      listener: {
        gameLoop: ownGameLoop.threeDimensionLayer
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
        gameLoop: ownGameLoop.hudLayer,
        domEvent: param.listener.domEvent,
      },
      notifier: {
        battleAction: param.notifier.battleAction,
      }
    });
  }
}

/**
 * 戦闘シーン全体のゲームループ制御
 * HUDレイヤーが上に表示されるように、以下の順番でゲームループが実行される
 *
 * (1)3Dレイヤーのゲームループ
 * (2)HUDレイヤーのゲームループ
 */
class OwnGameLoop {
  threeDimensionLayer: Subject<GameLoop>;
  hudLayer: Subject<GameLoop>;

  constructor(gameLoop: Observable<GameLoop>) {
    this.threeDimensionLayer = new Subject();
    this.hudLayer = new Subject();

    gameLoop.subscribe(action => {
      this.threeDimensionLayer.next(action);
      this.hudLayer.next(action);
    });
  }
}
