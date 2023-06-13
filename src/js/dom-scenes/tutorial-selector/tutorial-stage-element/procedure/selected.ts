import {TutorialStageElementProps} from "../props";
import {flash} from "../../../../dom/flash";

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
