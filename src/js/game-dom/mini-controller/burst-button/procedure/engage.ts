import { BurstButtonConfig } from "../config";
import { BurstButtonProps } from "../props";
import { disabled } from "./disabled";
import { enabled } from "./enabled";

/**
 * 設定を反映させる
 * @param props 反映させる設定
 */
export function engage(
  props: Readonly<BurstButtonProps>,
  config: BurstButtonConfig
): void {
  config.canBurst ? enabled(props) : disabled(props);
}
