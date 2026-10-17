import { waitFinishAnimation } from "../../../../dom/wait-finish-animation";
import { EasterEggProps } from "../props";

/**
 * イースターエッグを表示する
 * @param props イースターエッグのプロパティ
 * @returns アニメーションが終了したら発火するPromise
 */
export const show = async (props: Readonly<EasterEggProps>): Promise<void> => {
  const animation = props.root.animate(
    [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
    { duration: 400, fill: "forwards", easing: "ease" },
  );
  await waitFinishAnimation(animation);
};
