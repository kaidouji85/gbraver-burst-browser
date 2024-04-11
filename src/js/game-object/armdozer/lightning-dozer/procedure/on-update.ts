import { LightningDozerProps } from "../props/lightning-dozer-props";

/**
 * アップデート時の処理
 * @param props ゲームオブジェクトプロパティ
 */
export function onUpdate(props: LightningDozerProps): void {
  const { view, model } = props;
  view.engage(model);
}
