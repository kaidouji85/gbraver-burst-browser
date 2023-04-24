import { ButtonConfig } from "../button-config";
import { disabledBurst, enabledBurst } from "../dom/burst-button";
import { disabledPilot, enabledPilot } from "../dom/pilot-button";
import { MiniControllerProps } from "../props";

/**
 * バーストボタンに設定を反映させる
 * @param batteryButton 設定反映対象となるバーストボタン
 * @param config 設定
 */
function engageBurstButton(
  burstButton: HTMLButtonElement,
  config: ButtonConfig
): void {
  config.canBurst ? enabledBurst(burstButton) : disabledBurst(burstButton);
}

/**
 * パイロットボタンに設定を反映させる
 * @param batteryButton 設定反映対象となるパイロットボタン
 * @param config 設定
 */
function engagePilotButton(
  pilotButton: HTMLButtonElement,
  config: ButtonConfig
): void {
  config.canPilotSkill ? enabledPilot(pilotButton) : disabledPilot(pilotButton);
}

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
  engageBurstButton(props.burst, config);
  engagePilotButton(props.pilot, config);
}
