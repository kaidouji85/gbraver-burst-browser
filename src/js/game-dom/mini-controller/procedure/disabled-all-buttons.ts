import { MiniControllerProps } from "../props";

/**
 * 全コントローラーを強制的に無効化する
 * @param props コンポネントプロパティ
 */
export function disabledAllButtons(props: Readonly<MiniControllerProps>): void {
  props.batteryButtons.forEach((batteryButton) => {
    batteryButton.disabled();
  });
  props.burstButton.disabled();
  props.pilotButton.disabled();
}
