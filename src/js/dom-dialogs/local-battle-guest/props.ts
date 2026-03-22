import { Exclusive } from "../../exclusive/exclusive";

/** ローカル対戦ゲストダイアログのプロパティ */
export type LocalBattleGuestDialogProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** バトルスタートボタン */
  battleStartButton: HTMLElement;

  /** 排他制御 */
  exclusive: Exclusive;
};
