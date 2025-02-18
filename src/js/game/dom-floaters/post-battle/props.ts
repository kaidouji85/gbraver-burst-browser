import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { PostBattle } from "../../post-battle";

/** PostBattleFloaterのプロパティ */
export type PostBattleFloaterProps = {
  /** ルートHTML要素 */
  readonly root: HTMLElement;
  /** 排他制御 */
  readonly exclusive: Exclusive;
  /** 選択完了通知 */
  readonly selectionComplete: Subject<PostBattle>;
};
