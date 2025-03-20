import { Subject, Unsubscribable } from "rxjs";

import {AbortManagerContainer} from "../../abort-controller/abort-manager-container";
import { Exclusive } from "../../exclusive/exclusive";
import { PostBattle } from "../../game/post-battle";

/** PostBattleFloaterのプロパティ */
export type PostBattleFloaterProps = Readonly<AbortManagerContainer> & {
  /** ルートHTML要素 */
  readonly root: HTMLElement;
  /** 排他制御 */
  readonly exclusive: Exclusive;
  /** 選択完了通知 */
  readonly selectionComplete: Subject<PostBattle>;
  /** アンサブスクライバ */
  unsubscribers: Unsubscribable[];
};
