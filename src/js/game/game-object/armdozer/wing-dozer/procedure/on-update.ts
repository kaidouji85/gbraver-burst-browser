import { WingDozerProps } from "../props/wing-dozer-props";

/**
 * アップデート時の処理
 * @param props ゲームオブジェクトプロパティ
 */
export function onUpdate(props: WingDozerProps) {
  const { view, model } = props;
  view.engage(model);
}
