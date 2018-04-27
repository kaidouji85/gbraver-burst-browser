// @flow
import type {Resources} from '../../resource/index';
import type {Action} from "../action";
import type {Observer} from '../observer';
import {BattleSceneView} from "./view";
import {actionHandler} from "./action-handler";
import {bindHtmlEventToScene} from "./html-event-binder";
import type {BattleSceneState} from "./state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import * as THREE from "three";

/** コンストラクタのパラメータ */
type Params = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** 戦闘状態 */
  battleState: GameState[],
  /** 画面を開いているプレイヤーID */
  playerId: PlayerId,
  /** レンダラ */
  renderer: THREE.WebGLRenderer
};

/**
 * 戦闘画面アプリケーション
 */
export class BattleScene implements Observer {
  /** ビュー */
  view: BattleSceneView;
  /** 戦闘画面全体の状態 */
  state: BattleSceneState;

  constructor(params: Params) {
    this.state = {
      battleState: params.battleState,
      playerId: params.playerId
    };
    this.view = new BattleSceneView({
      resources: params.resources,
      state: this.state,
      observer: this,
      renderer: params.renderer
    });
    bindHtmlEventToScene(this, this.view.renderer.domElement);
  };

  /** 通知されたイベントに応じて、実際のアクションを呼び出す */
  notify(action: Action): void {
    actionHandler(action, this);
  }
}
