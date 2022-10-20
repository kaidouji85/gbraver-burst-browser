// @flow
import { fadeOut } from "../../bgm/bgm-operators";
import type { GameProps } from "../game-props";

/**
 * 遊び方ダイアログ表示
 *
 * @param props ゲームプロパティ
 */
export function onShowHowToPlay(props: $ReadOnly<GameProps>): void {
  props.bgm.do(fadeOut);
  props.domDialogs.startHowToPlay(props.resources, props.howToPlayMovieURL);
}
