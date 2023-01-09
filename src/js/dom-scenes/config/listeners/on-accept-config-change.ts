import type { ConfigProps } from "../props";
import { parseConfig } from "./parse-config";

/**
 * 設定変更ダイアログで「この設定にする」を選択した時の処理
 *
 * @param props 画面プロパティ
 */
export function onAcceptConfigChange(props: ConfigProps): void {
  props.exclusive.execute(async () => {
    const config = parseConfig(props);
    props.configChange.next(config);
  });
}
