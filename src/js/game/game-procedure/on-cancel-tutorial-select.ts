import type { GameProps } from "../game-props";
import { startTitle } from "./start-title";

/**
 * チュートリアル選択キャンセル
 *
 * @returns 処理が完了したら発火するPromise
 */
export async function onCancelTutorialSelect(
  props: Readonly<GameProps>,
): Promise<void> {
  await props.fader.fadeOut();
  await startTitle(props);
  await props.fader.fadeIn();
}
