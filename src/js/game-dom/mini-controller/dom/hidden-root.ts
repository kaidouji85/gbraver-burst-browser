import { waitFinishAnimation } from "../../../dom/animation";

/**
 * ルート要素を非表示にするアニメーション
 * @param root ルート要素
 * @return アニメーションが完了したら発火するPromise
 */
export async function hiddenRoot(root: HTMLElement): Promise<void> {
  await waitFinishAnimation(root.animate([
    { opacity: 1 },
    { opacity: 0 }
  ], {
    duration: 200,
    fill: "forwards",
  }));
}
