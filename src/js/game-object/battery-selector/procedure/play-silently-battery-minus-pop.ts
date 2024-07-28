import { silentlyBatteryMinusPop } from "../animation/battery-minus-pop";
import { BatterySelectorProps } from "../props/battery-selector-props";

export async function playSilentlyBatteryMinusPop(props: BatterySelectorProps) {
  const { batteryMinusTween } = props;
  batteryMinusTween.update();
  batteryMinusTween.removeAll();
  await silentlyBatteryMinusPop(props).play(batteryMinusTween);
}
