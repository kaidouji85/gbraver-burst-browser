import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { PostBattleFloaterProps } from "../props";

/**
 * 本フローターをボトムアップ表示する
 * @param props プロパティ
 * @returns アニメーションが完了したら発火するプロミス
 */
export async function bottomUp(props: PostBattleFloaterProps): Promise<void> {
  props.root.style.display = "flex";
  const animation = props.root.animate(
    [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
    { duration: 400, fill: "forwards", easing: "ease" },
  );
  const { signal } = props.abortController;
  await waitFinishAnimation(animation, { signal });
}
