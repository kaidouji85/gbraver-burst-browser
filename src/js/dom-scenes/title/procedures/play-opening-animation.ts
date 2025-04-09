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
          transform: "translate(30vh)",
        },
        {
          transform: `translate(0)`,
        },
      ],
      {
        duration: 200,
        fill: "forwards",
        easing: "ease",
      },
    ),
    options,
  );
}
