import { ShinBraverProps } from "../props/shin-braver-props";

/**
 * アップデート時の処理
 * @param props ゲームオブジェクトプロパティ
 */
export function onUpdate(props: ShinBraverProps) {
  const { view, model } = props;
  view.engage(model);
}
