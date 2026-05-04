import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { PrivateMatchGuestDialogProps } from "../props";

/**
 * マッチング失敗メッセージをフラッシュする
 * @param props プロパティ
 * @returns アニメーションが完了したら発火するPromise
 */
export async function flashFailedMessage(props: PrivateMatchGuestDialogProps) {
  const { matchingFailed } = props;
  const animation = matchingFailed.animate(
    [
      { transform: "translate(0, 0%)", opacity: 0 },
      { transform: "translate(0, -40%)", opacity: 1, offset: 0.2 },
      { opacity: 1, offset: 0.8 },
      { transform: "translate(0, -40%)", opacity: 0 },
    ],
    {
      duration: 2000,
      fill: "forwards",
      easing: "linear",
    },
  );
  await waitFinishAnimation(animation);
}
