import { ActionManager } from "../../action-manager/action-manager";
import { GameAction } from "../game-actions";

/** ゲームアクション管理コンテナ */
export type GameActionManageContainer = {
  /**
   * ゲームアクション管理オブジェクト
   * 動的生成されるシーン、ダイアログの通知を購読するために利用する
   */
  gameAction: ActionManager<GameAction>;
};
