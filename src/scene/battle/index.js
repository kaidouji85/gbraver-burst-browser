// @flow
import type {Resources} from '../../resource/index';
import type {BattleState, PlayerId} from "gbraver-burst-core/lib/flow-type";
import type {Action} from "../action";
import type {Observer} from '../observer';
import {BattleSceneView} from "./view";
import {actionHandler} from "./action-handler";

/** コンストラクタのパラメータ */
type Params = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** 戦闘状態 */
  battleState: BattleState,
  /** 画面を開いているプレイヤーID */
  playerId: PlayerId,
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
      observer: this
    });
  };

  /** 通知されたイベントに応じて、実際のアクションを呼び出す */
  notify(action: Action): void {
    actionHandler(action, this);
  }
}

/** 戦闘シーン全体の状態 */
export type BattleSceneState = {
  /** 戦闘状態 */
  battleState: BattleState,
  /** 画面を開いているプレイヤーID */
  playerId: PlayerId,
}
