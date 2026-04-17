import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { LocalBattleGuestDialogProps } from "../props";

/**
 * マッチング失敗メッセージをフラッシュする
 * @param props プロパティ
 * @returns アニメーションが完了したら発火するPromise
 */
export async function flashFailedMessage(props: LocalBattleGuestDialogProps) {
  const { matchingFailed } = props;
  const animation = matchingFailed.animate(
    [
      { transform: "translate(0, -100%)" },
      { transform: "translate(0, -120%)", opacity: 1, offset: 0.2 },
      { opacity: 1, offset: 0.8 },
      { transform: "translate(0, -120%)", opacity: 0 },
    ],
    {
      duration: 1500,
      fill: "forwards",
      easing: "linear",
    },
  );
  await waitFinishAnimation(animation);
}
