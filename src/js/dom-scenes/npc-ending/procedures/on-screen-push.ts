import { PushDOM } from "../../../dom/push-dom";
import { NPCEndingProps } from "../props";

/**
 * 画面がクリックされた際の処理
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onScreenPush(
  props: NPCEndingProps,
  action: Readonly<PushDOM>,
): void {
  if (!props.canOperation) {
    return;
  }

  props.canOperation = false;
  action.event.preventDefault();
  action.event.stopPropagation();
  props.pushButtonSound.sound.play();
  props.endNPCEnding.next();
}
