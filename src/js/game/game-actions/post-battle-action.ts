import { PostBattle } from "../post-battle";

/** 戦闘終了後アクション決定 */
export type PostBattleAction = {
  type: "PostBattleAction";
  /** 決定したアクション */
  postAction: PostBattle;
};
