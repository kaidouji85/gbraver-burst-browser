// @flow
import { fadeOut } from "../../bgm/bgm-operators";
import { HowToPlay } from "../../dom-dialogs/how-to-play/how-to-play-dialog";
import { howToPlayConnector } from "../dom-dialog-binder/action-connector/how-to-play-connector";
import type { GameProps } from "../game-props";

/**
 * 遊び方ダイアログ表示
 *
 * @param props ゲームプロパティ
 */
export function onShowHowToPlay(props: $ReadOnly<GameProps>): void {
  props.bgm.do(fadeOut);
  const dialog = new HowToPlay(props.resources, props.howToPlayURL);
  props.domDialogBinder.bind(dialog, howToPlayConnector);
}
