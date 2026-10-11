import { waitFinishAnimation } from "../../../../dom/wait-finish-animation";
import { PlayerPickerDialogProps } from "../props";

/**
 * ダイアログを表示する
 * @param props プレイヤーピッカーダイアログのプロパティ
 * @returns アニメーションの完了を示すPromise
 */
export const show = (props: PlayerPickerDialogProps) => {
  return waitFinishAnimation(
    props.dialog.animate(
      [
        { transform: "translate(-50%, 50%)" },
        { transform: "translate(-50%, 0)" },
      ],
      { duration: 400, fill: "forwards", easing: "ease" },
    ),
  );
};
