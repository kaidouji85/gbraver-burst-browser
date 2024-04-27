import { Subject } from "rxjs";

import { BURST } from "../dom/class-name";

/** バーストボタンプロパティ */
export type BurstButtonProps = {
  /** ルートHTML要素 */
  root: HTMLButtonElement;
  /** ボタン押下通知 */
  push: Subject<void>;
};

/**
 * バーストボタンプロパティを生成する
 * @returns 生成結果
 */
export function createBurstButtonProps(): BurstButtonProps {
  const root = document.createElement("button");
  root.className = BURST;
  root.accessKey = "b";
  const push = new Subject<void>();
  return { root, push };
}
