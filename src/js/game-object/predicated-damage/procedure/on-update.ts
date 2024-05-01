import { PredicatedDamageProps } from "../props/predicated-damage-props";

/**
 * アップデート時の処理
 * @param props ゲームオブジェクトプロパティ
 */
export function onUpdate(props: PredicatedDamageProps) {
  const { model, view } = props;
  view.engage(model);
}
