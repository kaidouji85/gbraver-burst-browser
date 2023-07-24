import { PILOT, PILOT_DISABLED, PILOT_ENABLED } from "../../dom/class-name";
import { PilotButtonConfig } from "../config";
import { PilotButtonProps } from "../props";

/**
 * 設定をパイロットボタンに反映させる
 * @param props コンポネントプロパティ
 * @param config 反映させる設定
 */
export function engage(
  props: Readonly<PilotButtonProps>,
  config: PilotButtonConfig,
): void {
  props.root.className = [
    PILOT,
    config.canPilotSkill ? PILOT_ENABLED : PILOT_DISABLED,
  ].join(" ");
  props.root.disabled = !config.canPilotSkill;
  props.root.innerText = config.canPilotSkill ? "パイロット(p)" : "";
}
