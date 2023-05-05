import { BurstButtonConfig } from "../config";
import { BurstButtonProps } from "../props";
import {BURST, BURST_DISABLED, BURST_ENABLED} from "../../dom/class-name";

/**
 * 設定を反映させる
 * @param props コンポネントプロパティ
 * @param config 反映させる設定
 */
export function engage(
  props: Readonly<BurstButtonProps>,
  config: BurstButtonConfig
): void {
  props.root.className = [
    BURST,
    config.canBurst ? BURST_ENABLED : BURST_DISABLED,
  ].join(" ");
  props.root.disabled = !config.canBurst;
  props.root.innerText = config.canBurst ? "バースト(b)" : "";
}
