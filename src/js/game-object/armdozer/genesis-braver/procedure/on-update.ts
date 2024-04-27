import { GenesisBraverProps } from "../props/genesis-braver-props";

/**
 * アップデート時の処理
 * @param props ゲームオブジェクトプロパティ
 */
export function onUpdate(props: GenesisBraverProps) {
  const { view, model } = props;
  view.engage(model);
}
