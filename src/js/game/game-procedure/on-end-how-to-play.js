// @flow
import {fadeIn} from "../../bgm/bgm-operators";
import type {GameProps} from "../game-props";

/**
 * 遊び方ダイアログを閉じる
 *
 * @param props ゲームプロパティ
 */
export function onEndHowToPlay(props: $ReadOnly<GameProps>): void {
  props.bgm.do(fadeIn)
  props.domDialogs.hidden();
}