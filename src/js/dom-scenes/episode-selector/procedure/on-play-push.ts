import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { EpisodeSelectorProps } from "../props";

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
  const episode = props.episodeElements.find((v) => v.isChecked());
  if (!episode) {
    return;
  }

  props.exclusive.execute(async () => {
    props.se.play(props.pushButtonSound);
    await pop(props.playButton);
    props.episodeSelect.next({
      id: episode.id,
    });
  });
}
