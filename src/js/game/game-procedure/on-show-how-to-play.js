// @flow
import { fadeOut } from "../../bgm/bgm-operators";
import { howToPlayConnector } from "../dom-dialogs/action-connector/how-to-play-connector";
import { HowToPlay } from "../dom-dialogs/how-to-play/how-to-play-dialog";
import type { GameProps } from "../game-props";

/**
 * 遊び方ダイアログ表示
 *
 * @param props ゲームプロパティ
 */
export function onShowHowToPlay(props: $ReadOnly<GameProps>): void {
  props.bgm.do(fadeOut);
  const dialog = new HowToPlay(props.resources, props.howToPlayMovieURL);
  props.domDialogs.bind(dialog, howToPlayConnector);
}
