import { EpisodeTitle } from "../../../dom-scenes/episode-title";
import { GameProps } from "../../game-props";

/**
 * エピソードタイトル画面に切り替える
 * @param props ゲームプロパティ
 * @param scene エピソードタイトル画面
 */
export const switchEpisodeTitle = (props: GameProps, scene: EpisodeTitle) =>
  props.domSceneBinder.bind(scene, []);
