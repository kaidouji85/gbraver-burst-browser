import { NeoLandozerProps } from "../props/neo-landozer-props";

/**
 * アップデート時の処理
 * @param props ゲームオブジェクトプロパティ
 */
export function onUpdate(props: NeoLandozerProps) {
  const { view, model } = props;
  view.engage(model);
}
