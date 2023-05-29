import { pop } from "../../../dom/animation";
import { isConfigChanged } from "../../../game/config/config-changed";
import type { ConfigProps } from "../props";
import { parseConfig } from "./parse-config";
import {PushDOM} from "../../../dom/push-dom";

/**
 * 戻るボタンを押した際の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onPrevButtonPush(
  props: ConfigProps,
  action: Readonly<PushDOM>
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
