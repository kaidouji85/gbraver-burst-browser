import {EpisodeSelectorProps} from "../props";
import {PushDOM} from "../../../dom/push-dom";
import {pop} from "../../../dom/pop";

/**
 * このエピソードをプレイボタンが押された時の処理
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onPlayPush(
  props: Readonly<EpisodeSelectorProps>,
  action: Readonly<PushDOM>,
): void {
  action.event.stopPropagation();
  action.event.preventDefault();
  props.exclusive.execute(async () => {
    props.changeValue.sound.play();
    await pop(props.playButton);
    //props.prev.next();
  });
}