import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { EpisodeSelectorProps } from "../props";
import { onEpisodeSelect } from "./on-episode-select";
import { onPlayPush } from "./on-play-push";
import { onPrevPush } from "./on-prev-push";

/**
 * 画面にイベントリスナをバインドする
 * @param props 画面プロパティ
 * @return バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(
  props: Readonly<EpisodeSelectorProps>,
): Unsubscribable[] {
  return [
    domPushStream(props.prevButton).subscribe((action) => {
      onPrevPush(props, action);
    }),
    domPushStream(props.playButton).subscribe((action) => {
      onPlayPush(props, action);
    }),
    ...props.episodeElements.map((stage) =>
      stage.selectionNotifier().subscribe(() => {
        onEpisodeSelect(props, stage);
      }),
    ),
  ];
}
