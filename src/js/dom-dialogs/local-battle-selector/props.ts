import { Exclusive } from "../../exclusive/exclusive";

/** ローカル対戦セレクターダイアログのプロパティ */
export type LocalBattleSelectorDialogProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** ローカル対戦ホストボタン */
  localBattleHostButton: HTMLButtonElement;

  /** 排他制御 */
  exclusive: Exclusive;
};
