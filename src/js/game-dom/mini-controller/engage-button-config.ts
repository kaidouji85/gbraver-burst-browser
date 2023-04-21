import { ButtonConfig } from "./button-config";
import {
  disabledBattery,
  enabledBatttery,
  getBattery,
  invisibleBattery,
  visibleBattery,
  visibleBatteryAsFirst,
  visibleBatteryAsLast,
} from "./dom/battery-button";
import { disabledBurst, enabledBurst } from "./dom/burst-button";
import { disabledPilot, enabledPilot } from "./dom/pilot-button";
import { MiniControllerProps } from "./props";

/**
 * バッテリーボタンに設定を反映させる
 * @param batteryButton 設定反映対象となるバッテリーボタン
 * @param config 設定
 */
function engageBatteryButton(
  batteryButton: HTMLButtonElement,
  config: ButtonConfig
): void {
  const battery = getBattery(batteryButton);
  if (battery === null) {
    return;
  }

  const isVisible = battery <= config.maxBattery;
  const isFirst = battery === 0;
  const isLast = battery === config.maxBattery;
  if (isVisible && isFirst) {
    visibleBatteryAsFirst(batteryButton);
  } else if (isVisible && isLast) {
    visibleBatteryAsLast(batteryButton);
  } else if (isVisible) {
    visibleBattery(batteryButton);
  } else {
    invisibleBattery(batteryButton);
  }

  const isEnabled = battery <= config.battery;
  if (isEnabled) {
    enabledBatttery(batteryButton);
  } else {
    disabledBattery(batteryButton);
  }
}

/**
 * バーストボタンに設定を反映させる
 * @param batteryButton 設定反映対象となるバーストボタン
 * @param config 設定
 */
function engageBurstButton(burstButton: HTMLButtonElement, config: ButtonConfig): void {
  config.canBurst ? enabledBurst(burstButton) : disabledBurst(burstButton);
}

/**
 * パイロットボタンに設定を反映させる
 * @param batteryButton 設定反映対象となるパイロットボタン
 * @param config 設定
 */
function engagePilotButton(pilotButton: HTMLButtonElement, config: ButtonConfig): void {
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
    engageBatteryButton(batteryButton, config);
  });
  engageBurstButton(props.burst, config);
  engagePilotButton(props.pilot, config);
}
