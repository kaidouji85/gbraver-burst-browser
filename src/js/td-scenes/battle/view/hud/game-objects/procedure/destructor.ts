import { HUDGameObjectsProps } from "../props";

/**
 * デストラクタ相当の処理
 * @param props プロパティ
 */
export function destructor(props: HUDGameObjectsProps) {
  props.batterySelector.destructor();
  props.batterySelectorLeadLine.destructor();
  props.burstButton.destructor();
  props.burstButtonLeadLine.destructor();
  props.pilotButton.destructor();
  props.pilotButtonLeadLine.destructor();
  props.timeScaleButton.destructor();
  props.rearmostFader.destructor();
  props.frontmostFader.destructor();
  props.drawIndicator.destructor();
}
