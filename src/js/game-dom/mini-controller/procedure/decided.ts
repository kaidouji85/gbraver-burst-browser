import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { popRoot } from "../animation/pop-root";
import { MiniControllerProps } from "../props";

/**
 * コマンド決定アニメーション
 * @param props コンポネントプロパティ
 * @return アニメーション
 */
export function decided(props: Readonly<MiniControllerProps>): Animate {
  return onStart(() => {
    props.pushButtonSound.sound.play();
  }).chain(popRoot(props));
}
