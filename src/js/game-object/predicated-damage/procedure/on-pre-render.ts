import { PreRender } from "../../../game-loop/pre-render";
import { PredicatedDamageProps } from "../props/predicated-damage-props";

/**
 * アップデート時の処理
 * @param props ゲームオブジェクトプロパティ
 * @param action アクション情報
 */
export function onPreRender(props: PredicatedDamageProps, action: PreRender) {
  const { model, view } = props;
  view.engage(model, action);
}
