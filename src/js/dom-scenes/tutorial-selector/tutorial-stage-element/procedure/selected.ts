import { flash } from "../../../../dom/flash";
import { TutorialStageElementProps } from "../props";

/**
 * ステージ選択アニメーション
 * @return アニメーションが完了したら発火するPromise
 */
export async function selected(
  props: Readonly<TutorialStageElementProps>
): Promise<void> {
  props.pushButton.sound.play();
  await flash(props.root);
}
