import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { MessageWindowProps } from "../props";

/**
 * メッセージを上スクロールする
 * @param props コンポネントプロパティ
 * @returns アニメーションが完了したら発火するPromise
 */
export async function scrollUp(
  props: Readonly<MessageWindowProps>,
): Promise<void> {
  await waitFinishAnimation(
    props.messages.animate(
      [
        {
          transform: "translateY(2vh)",
        },
        {
          transform: "translateY(0%)",
        },
      ],
      {
        duration: 100,
      },
    ),
  );
}
