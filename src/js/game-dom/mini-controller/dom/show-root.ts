import { waitFinishAnimation } from "../../../dom/animation";

/**
 * ルート要素を表示するアニメーション
 * @param root ルート要素
 * @return アニメーションが完了したら発火するPromise
 */
export async function showRoot(root: HTMLElement): Promise<void> {
  const animation = root.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 200,
    fill: "forwards",
  });
  await waitFinishAnimation(animation);
}
