import { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import { popRoot } from "../animation/pop-root";
import { MiniControllerProps } from "../props";

/**
 * コマンド決定アニメーション
 * @param props コンポネントプロパティ
 * @return アニメーション
 */
export function decided(
  props: Readonly<MiniControllerProps>
): Animate {
  return process(() => {
    props.pushButtonSound.sound.play();
  })
  .chain(popRoot(props));
}
