import { flash } from "../../../../dom/flash";
import { EpisodeElementProps } from "../props";

/**
 * @deprecated
 * ステージ選択アニメーション
 * @return アニメーションが完了したら発火するPromise
 */
export async function selected(
  props: Readonly<EpisodeElementProps>,
): Promise<void> {
  props.pushButton.sound.play();
  await flash(props.overlay);
}
