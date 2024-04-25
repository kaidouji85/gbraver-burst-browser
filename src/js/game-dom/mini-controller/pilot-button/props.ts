import { Subject } from "rxjs";

import { PILOT } from "../dom/class-name";

/** パイロットボタンプロパティ */
export type PilotButtonProps = {
  /** ルートHTML要素 */
  root: HTMLButtonElement;
  /** ボタン押下通知 */
  push: Subject<void>;
};

/**
 * パイロットボタンプロパティを生成する
 * @returns 生成結果
 */
export function createPilotButtonProps(): PilotButtonProps {
  const root = document.createElement("button");
  root.className = PILOT;
  root.accessKey = "p";
  const push = new Subject<void>();
  return { root, push };
}
