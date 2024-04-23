import { HUDPlayerProps } from "../props";

/**
 * デストラクタ相当の処理
 * @param props プロパティ
 */
export function destructor(props: HUDPlayerProps) {
  props.gauge.destructor();
  props.turnStart.destructor();
  props.resultIndicator.destructor();
}
