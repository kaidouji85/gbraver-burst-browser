import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { EpisodeSelectorProps } from "../props";

/**
 * 戻るボタンを押した時の処理
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onPrevPush(
  props: Readonly<EpisodeSelectorProps>,
  action: Readonly<PushDOM>,
): void {
  action.event.stopPropagation();
  action.event.preventDefault();
  props.exclusive.execute(async () => {
    props.se.play(props.changeValueSound);
    await pop(props.prevButton);
    props.prev.next();
  });
}
