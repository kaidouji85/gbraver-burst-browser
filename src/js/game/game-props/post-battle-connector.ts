import type { DomFloaterActionConnector } from "../dom-floaters/dom-floater-action-connector";
import { PostBattleFloater } from "../dom-floaters/post-battle";

/** バトル終了後行動選択フローターとゲームアクションを関連づける */
export const postBattleConnector: DomFloaterActionConnector<
  PostBattleFloater
> = (floater, gameAction) => [
  floater.selectionCompleteNotifier().subscribe((postAction) => {
    gameAction.next({ type: "PostBattleAction", postAction });
  }),
];
