import { Unsubscribable } from "rxjs";

/** アクションボタン */
export type ActionButton = {
  /** ボタンのHTML要素 */
  readonly button: HTMLButtonElement;
  /** ボタンイベントのUnsubscriber */
  readonly unsubscriber: Unsubscribable;
};
