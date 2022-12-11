// @flow

import { PostBattleFloater } from "../post-battle/post-battle";
import type { DomFloaterActionConnector } from "./dom-floater-action-connector";

/** バトル終了後行動選択フローターとゲームアクションを関連づける */
export const postBattleConnector: DomFloaterActionConnector<
  PostBattleFloater
> = (floater, gameAction) => [
  floater.selectionCompleteNotifier().subscribe((postBattle) => {
    gameAction.next({ type: "PostBattleAction", action: postBattle });
  }),
];
