import { waitFinishAnimation } from "./wait-finish-animation";

/**
 * 点滅アニメーション
 * @param element アニメーションさせるHTML要素
 * @param maxOpacity 最大不透明度
 * @returns アニメーション
 */
export async function flash(
  element: Readonly<HTMLElement>,
  maxOpacity = 0.3,
): Promise<void> {
  const animation = element.animate(
    [
      {
        filter: "opacity(0)",
      },
      {
        filter: `opacity(${maxOpacity})`,
      },
      {
        filter: "opacity(0)",
      },
    ],
    {
      duration: 200,
      fill: "forwards",
      easing: "ease",
    },
  );
  await waitFinishAnimation(animation);
}
