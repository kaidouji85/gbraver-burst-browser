// @flow
import type { ConfigProps } from "../props";

/**
 * 設定変更通知ダイアログを閉じた時の処理
 *
 * @param props 画面プロパティ
 */
export function onDialogClose(props: ConfigProps): void {
  props.exclusive.execute(async () => {
    props.dialog.hidden();
  });
}
