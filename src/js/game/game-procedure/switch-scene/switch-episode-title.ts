import { EpisodeTitle } from "../../../dom-scenes/episode-title";
import { GameProps } from "../../game-props";
import { switchDOMScene } from "./switch-dom-scene";

/**
 * エピソードタイトル画面に切り替える
 * @param props ゲームプロパティ
 * @param scene エピソードタイトル画面
 */
export const switchEpisodeTitle = (props: GameProps, scene: EpisodeTitle) =>
  switchDOMScene({ ...props, scene, unsubscribers: [] });
