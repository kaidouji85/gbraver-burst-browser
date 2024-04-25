import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { EpisodeSelectorProps } from "../props";
import { onEpisodeSelect } from "./on-episode-select";
import { onMainEpisodeTabSelected } from "./on-main-episode-tab-selected";
import { onPlayPush } from "./on-play-push";
import { onPrevPush } from "./on-prev-push";
import { onSideEpisodeTabSelected } from "./on-side-episode-tab-selected";

/**
 * 画面にイベントリスナをバインドする
 * @param props 画面プロパティ
 * @returns バインドしたイベントリスナのアンサブスクライバ
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
    domPushStream(props.mainEpisodeTab).subscribe((action) => {
      onMainEpisodeTabSelected(props, action);
    }),
    domPushStream(props.sideEpisodeTab).subscribe((action) => {
      onSideEpisodeTabSelected(props, action);
    }),
    ...props.episodeElements.map((stage) =>
      stage.selectionNotifier().subscribe(() => {
        onEpisodeSelect(props, stage);
      }),
    ),
  ];
}
