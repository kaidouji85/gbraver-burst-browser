// @flow
import type {ConfigProps} from "../props";

/**
 * 設定変更ダイアログで「設定変更を破棄」を選択した時の処理
 *
 * @param props 画面プロパティ
 */
export function onDiscardConfigChange(props: ConfigProps): void {
  props.exclusive.execute(async () => {
    props.prev.next();
  });
}