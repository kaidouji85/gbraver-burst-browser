import { ActionManager } from "../../action-manager/action-manager";
import { BattleSceneAction } from "./actions";

/** 戦闘シーンアクション管理コンテナ */
export type BattleSceneActionManageContainer = {
  /**
   * 戦闘シーンアクション管理オブジェクト
   * 動的生成されるダイアログからの通知を購読するために利用する
   */
  readonly battleSceneAction: ActionManager<BattleSceneAction>;
};
