import { pop } from "../../../dom/animation";
import type { PushDOM } from "../../../dom/event-stream";
import type { ConfigProps } from "../props";
import { setInputDisabled } from "./set-input-disabled";
import { parseConfig } from "./parse-config";

/**
 * 設定変更するボタンを押した際の処理
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onConfigChangeButtonPush(
  props: ConfigProps,
  action: Readonly<PushDOM>
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    setInputDisabled(props);
    await Promise.all([pop(props.configChangeButton), props.pushButton.play()]);
    const config = parseConfig(props);
    props.configChange.next(config);
  });
}
