import { Update } from "../../../game-loop/update";
import { TimeScaleButtonProps } from "../props/time-scale-button-props";

/**
 * アップデート時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onUpdate(props: TimeScaleButtonProps, action: Update) {
  const { toggleTween } = props;
  toggleTween.update(action.time);
}
