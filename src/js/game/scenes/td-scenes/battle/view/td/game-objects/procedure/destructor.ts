import { TDGameObjectsProps } from "../props";

/**
 * デストラクタ相当の処理
 * @param props プロパティ
 */
export function destructor(props: TDGameObjectsProps) {
  props.stage.destructor();
  props.turnIndicator.destructor();
  props.skyBrightness.destructor();
  props.illumination.destructor();
}
