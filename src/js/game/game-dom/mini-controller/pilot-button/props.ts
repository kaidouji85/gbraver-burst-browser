import { Subject } from "rxjs";

import { PILOT } from "../dom/class-name";

/** パイロットスキルボタン押下 */
export type PilotPush = {
  /** パイロットスキルボタン押下時のDOMイベント */
  event: Event;
};

/** パイロットボタンプロパティ */
export type PilotButtonProps = {
  /** ルートHTML要素 */
  root: HTMLButtonElement;
  /** ボタン押下通知 */
  push: Subject<PilotPush>;
};

/**
 * パイロットボタンプロパティを生成する
 * @returns 生成結果
 */
export function createPilotButtonProps(): PilotButtonProps {
  const root = document.createElement("button");
  root.className = PILOT;
  root.accessKey = "p";
  const push = new Subject<PilotPush>();
  return { root, push };
}
