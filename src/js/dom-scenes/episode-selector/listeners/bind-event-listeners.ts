import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { EpisodeSelectorProps } from "../props";
import { onPrevPush } from "./on-prev-push";
import { onEpisodeSelect } from "./on-episode-select";

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
    ...props.episodeElements.map((stage) =>
      stage.notifyStageSelection().subscribe(() => {
        onEpisodeSelect(props, stage);
      }),
    ),
  ];
}
