import {waitFinishAnimation} from "./wait-finish-animation";

/**
 * 点滅アニメーション
 * @param element アニメーションさせるHTML要素
 * @param brightness 点滅の明るさ
 * @return アニメーション
 */
export async function flash(
  element: Readonly<HTMLElement>,
  brightness: number = 0.5
): Promise<void> {
  const animation = element.animate(
    [
      {
        filter: "brightness(1)",
      },
      {
        transform: `brightness(${brightness})`,
      },
      {
        filter: "brightness(1)",
      },
    ],
    {
      duration: 200,
      fill: "forwards",
      easing: "ease",
    }
  );
  await waitFinishAnimation(animation);
}