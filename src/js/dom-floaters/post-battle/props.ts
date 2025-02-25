import { Subject, Unsubscribable } from "rxjs";

import { AbortControllerContainer } from "../../abort-controller/abort-controller-container";
import { Exclusive } from "../../exclusive/exclusive";
import { PostBattle } from "../../game/post-battle";

/** PostBattleFloaterのプロパティ */
export type PostBattleFloaterProps = AbortControllerContainer & {
  /** ルートHTML要素 */
  readonly root: HTMLElement;
  /** 排他制御 */
  readonly exclusive: Exclusive;
  /** 選択完了通知 */
  readonly selectionComplete: Subject<PostBattle>;
  /** アンサブスクライバ */
  unsubscribers: Unsubscribable[];
};
