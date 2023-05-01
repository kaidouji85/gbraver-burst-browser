import { pop } from "../../../dom/animation";
import { MiniControllerProps } from "../props";

/**
 * コマンド決定アニメーション
 * @param props コンポネントプロパティ
 * @return アニメーションが完了したら発火するPromise
 */
export async function decided(props: Readonly<MiniControllerProps>): Promise<void> {
  props.pushButtonSound.sound.play();
  await pop(props.root);
}