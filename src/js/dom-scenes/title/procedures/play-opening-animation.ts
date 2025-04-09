import { SignalContainer } from "../../../abort-controller/signal-container";
import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { TitleProps } from "../props";

/** オープニングアニメーションオプション */
export type OpeningAnimationOptions = SignalContainer;

/**
 * オープニングアニメーションを再生する
 * @param props 画面プロパティ
 * @param options オプション
 * @returns アニメーションPromise
 */
export async function playOpeningAnimation(
  props: Readonly<TitleProps>,
  options?: OpeningAnimationOptions,
): Promise<void> {
  const { logo } = props;
  await waitFinishAnimation(
    logo.animate(
      [
        {
          transform: `translateY(0)`,
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        //easing: "ease",
      },
    ),
    options,
  );
}
