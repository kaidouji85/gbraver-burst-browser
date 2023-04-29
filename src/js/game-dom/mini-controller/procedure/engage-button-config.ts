import { ButtonConfig } from "../button-config";
import { MiniControllerProps } from "../props";

/**
 * ボタン設定をコンポネントに反映される
 * @param props コンポネントプロパティ
 * @param config ボタン設定
 */
export function engageButtonConfig(
  props: MiniControllerProps,
  config: ButtonConfig
): void {
  props.batteryButtons.forEach((batteryButton) => {
    batteryButton.engage(config);
  });
  props.burstButton.engage(config);
  props.pilotButton.engage(config);
}
