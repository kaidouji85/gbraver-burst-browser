import { waitFinishAnimation } from "../../../../dom/wait-finish-animation";
import { ROOT_CLASS } from "../dom/class-name";
import { EasterEggProps } from "../props";

/**
 * イースターエッグを表示する
 * @param props イースターエッグのプロパティ
 * @returns アニメーションが終了したら発火するPromise
 */
export const show = async (props: Readonly<EasterEggProps>): Promise<void> => {
  props.root.className = ROOT_CLASS;
  const animation = props.content.animate(
    [{ transform: "translateY(-25%)" }, { transform: "translateY(0)" }],
    { duration: 300, fill: "forwards", easing: "ease" },
  );
  await waitFinishAnimation(animation);
};
