import { StatusDialogProps } from "../props";

/**
 * ステータスダイアログのプロパティを生成する
 * @returns ステータスダイアログのプロパティ
 */
export function createStatusDialogProps(): StatusDialogProps {
  const root = document.createElement("div");
  return { root };
}
