import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import type { ConfigProps } from "../props";
import { parseConfig } from "./parse-config";
import { setInputDisabled } from "./set-input-disabled";

/**
 * 設定変更するボタンを押した際の処理
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onConfigChangeButtonPush(
  props: ConfigProps,
  action: Readonly<PushDOM>,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    setInputDisabled(props);
    props.pushButton.sound.play()
    await pop(props.configChangeButton);
    const config = parseConfig(props);
    props.configChange.next(config);
  });
}
