import { PilotButtonConfig } from "../config";
import { PilotButtonProps } from "../props";
import { disabled } from "./disabled";
import { enabled } from "./enabled";

/**
 * 設定をパイロットボタンに反映させる
 * @param props コンポネントプロパティ
 * @param config 反映させる設定
 */
export function engage(props: Readonly<PilotButtonProps>, config: PilotButtonConfig): void {
  config.canPilotSkill ? enabled(props) : disabled(props);
}