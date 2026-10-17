import { waitFinishAnimation } from "../../../../dom/wait-finish-animation";
import { ROOT_CLASS_HIDDEN } from "../dom/class-name";
import { EasterEggProps } from "../props";

/**
 * イースターエッグを非表示にする
 * @param props イースターエッグのプロパティ
 * @returns アニメーションが完了したら発火するPromise
 */
export const hidden = async (
  props: Readonly<EasterEggProps>,
): Promise<void> => {
  const animation = props.content.animate(
    [{ opacity: "1" }, { opacity: "0" }],
    { duration: 300, fill: "forwards", easing: "ease" },
  );
  await waitFinishAnimation(animation);
  props.root.className = ROOT_CLASS_HIDDEN;
};
