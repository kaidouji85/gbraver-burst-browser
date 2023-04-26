import { PILOT } from "../dom/class-name";

/** パイロットボタンプロパティ */
export type PilotButtonProps = {
  /** ルートHTML要素 */
  root: HTMLButtonElement;
};

/**
 * パイロットボタンプロパティを生成する
 * @return 生成結果
 */
export function createPilotButtonProps(): PilotButtonProps {
  const root = document.createElement("button");
  root.className = PILOT;
  root.accessKey = "p";
  return {root};
}