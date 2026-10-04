import { Subject } from "rxjs";

import { BURST } from "../dom/class-name";

/** バーストボタン押下通知情報 */
export type BurstPush = {
  /** バーストボタン押下時のDOMイベント */
  event: Event;
};

/** バーストボタンプロパティ */
export type BurstButtonProps = {
  /** ルートHTML要素 */
  root: HTMLButtonElement;
  /** ボタン押下通知 */
  push: Subject<BurstPush>;
};

/**
 * バーストボタンプロパティを生成する
 * @returns 生成結果
 */
export function createBurstButtonProps(): BurstButtonProps {
  const root = document.createElement("button");
  root.className = BURST;
  root.accessKey = "b";
  const push = new Subject<BurstPush>();
  return { root, push };
}
