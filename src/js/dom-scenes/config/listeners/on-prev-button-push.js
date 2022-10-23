// @flow
import { pop } from "../../../dom/animation";
import type { PushDOM } from "../../../dom/event-stream";
import { isConfigChanged } from "../../../game/config/browser-config";
import type { ConfigProps } from "../props";
import { parseConfig } from "./parse-config";

/**
 * 戻るボタンを押した際の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onPrevButtonPush(
  props: ConfigProps,
  action: $ReadOnly<PushDOM>
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    await Promise.all([pop(props.prevButton), props.changeValue.play()]);
    const updatedConfig = parseConfig(props);
    if (isConfigChanged(props.originConfig, updatedConfig)) {
      props.dialog.show();
      return;
    }
    props.prev.next();
  });
}
