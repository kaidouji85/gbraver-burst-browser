import { waitFinishAnimation } from "../../../../dom/wait-finish-animation";
import { ROOT_CLASS } from "../dom/class-name";
import { EasterEggProps } from "../props";

/**
 * イースターエッグを表示する
 * @param props イースターエッグのプロパティ
 * @returns アニメーションが終了したら発火するPromise
 */
export const show = async (props: Readonly<EasterEggProps>): Promise<void> => {
  props.se.play(props.sound);

  props.root.className = ROOT_CLASS;
  const animation = props.content.animate(
    [
      { transform: "translate(-50%, -25%)", opacity: 1 },
      { transform: "translate(-50%, 0)", opacity: 1 },
    ],
    { duration: 300, fill: "forwards", easing: "ease" },
  );
  await waitFinishAnimation(animation);
};
