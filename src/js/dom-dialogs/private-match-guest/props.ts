/** プライベートマッチゲストダイアログのプロパティ */
export type PrivateMatchGuestDialogProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
};

/**
 * PrivateMatchGuestDialogPropsを生成する
 * @return 生成結果
 */
export function createPrivateMatchGuestDialogProps(): PrivateMatchGuestDialogProps {
  const root = document.createElement("div");
  return { root };
}