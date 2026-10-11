import { waitFinishAnimation } from "../../../../dom/wait-finish-animation";
import { PlayerPickerDialogProps } from "../props";

/**
 * ダイアログを表示する
 * @param props プレイヤーピッカーダイアログのプロパティ
 * @returns アニメーションの完了を示すPromise
 */
export const show = (props: PlayerPickerDialogProps) => {
  return waitFinishAnimation(
    props.dialog.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 300,
      easing: "ease-out",
      fill: "forwards",
    }),
  );
};
