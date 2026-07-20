import { DeathAlertProps } from "../props/death-alert-props";

/**
 * アップデート時の処理
 * @param props プロパティ
 */
export const onUpdate = (props: DeathAlertProps) => {
  const { view, model } = props;
  view.engage(model);
};
