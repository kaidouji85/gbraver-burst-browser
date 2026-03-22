import { Exclusive } from "../../exclusive/exclusive";

/** ローカル対戦ホストダイアログのプロパティ */
export type LocalBattleHostDialogProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** クロージャー */
  closer: HTMLElement;

  /** 排他制御 */
  exclusive: Exclusive;
};
