import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { PrivateMatchHostDialogProps } from "../props";

/**
 * コピー成功メッセージをフラッシュする
 * @param props プロパティ
 * @returns アニメーションが完了したら発火するPromise
 */
export async function flushSuccessCopyRoomId(
  props: PrivateMatchHostDialogProps,
) {
  const { successCopyRoomID } = props;
  const animation = successCopyRoomID.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: "translate(0, -105%)", opacity: 1, offset: 0.25 },
      { opacity: 1, offset: 0.75 },
      { transform: "translate(0, -105%)", opacity: 0 },
    ],
    {
      duration: 3000,
      fill: "forwards",
      easing: "ease",
    },
  );
  await waitFinishAnimation(animation);
}
