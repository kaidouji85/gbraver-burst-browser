// @flow
import type {Resources} from '../../resource/resource-manager';
import type {BattleState, PlayerId} from "gbraver-burst-core/lib/flow-type";
import {gameLoop} from "./action-handler/game-loop";
import {resize} from "./action-handler/resize";
import type {Action} from "../action";
import type {Observer} from '../observer';
import {BattleAppCore} from "./core";
import {debugMode} from "./action-handler/debug-mode";

/** コンストラクタのパラメータ */
type Props = {
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
export class BattleApplication implements Observer {
  /** コア */
  _core: BattleAppCore;

  constructor(props: Props) {
    this._core = new BattleAppCore({
      resources: props.resources,
      battleState: props.battleState,
      playerId: props.playerId,
      observer: this
    });
  };

  /** 通知されたイベントに応じて、実際のアクションを呼び出す */
  notify(action: Action) {
    switch (action.type) {
      case 'resize':
        resize(this._core);
        break;
      case 'gameLoop':
        gameLoop(this._core);
        break;
      case 'debugMode':
        debugMode(this._core);
        break;
      default:
        break;
    }
  }
}