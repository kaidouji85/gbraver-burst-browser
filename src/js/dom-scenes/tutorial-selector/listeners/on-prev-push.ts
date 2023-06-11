import {TutorialSelectorProps} from "../props";
import {PushDOM} from "../../../dom/push-dom";
import {pop} from "../../../dom/animation";

/**
 * 戻るボタンを押した時の処理
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onPrevPush(
  props: Readonly<TutorialSelectorProps>,
  action: Readonly<PushDOM>
): void {
  action.event.stopPropagation();
  action.event.preventDefault();
  props.exclusive.execute(async () => {
    props.changeValue.sound.play();
    await pop(props.prevButton);
    props.prev.next();
  });
}