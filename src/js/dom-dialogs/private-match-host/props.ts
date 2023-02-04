/** プライベートマッチホストダイアログのプロパティ */
export type PrivateMatchHostDialogProps = {
  /** ルート要素HTML */
  root: HTMLElement;
};

/**
 * PrivateMatchHostDialogPropsを生成する
 * @return 生成結果
 */
export function createPrivateMatchHostDialogProps(): PrivateMatchHostDialogProps {
  const root = document.createElement("div");
  return { root };
}
