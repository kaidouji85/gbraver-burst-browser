import { BURST } from "../dom/class-name";

/** バーストボタンプロパティ */
export type BurstButtonProps = {
  /** ルートHTML要素 */
  root: HTMLButtonElement;
};

/**
 * バーストボタンプロパティを生成する
 * @return 生成結果
 */
export function createBurstButtonProps(): BurstButtonProps {
  const root = document.createElement("button");
  root.className = BURST;
  root.accessKey = "b";
  return { root };
}