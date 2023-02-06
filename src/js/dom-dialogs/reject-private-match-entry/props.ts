/** RejectPrivateMatchEntryDialogのプロパティ */
export type RejectPrivateMatchEntryDialogProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
};

/**
 * RejectPrivateMatchEntryDialogPropsを生成する
 * @return 生成結果
 */
export function createRejectPrivateMatchEntryDialogProps(): RejectPrivateMatchEntryDialogProps {
  const root = document.createElement("div");
  return { root };
}
