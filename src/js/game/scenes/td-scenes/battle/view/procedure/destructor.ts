import { BattleSceneViewProps } from "../props";

/**
 * デストラクタ相当の処理
 * @param props ビュープロパティ
 */
export function destructor(props: BattleSceneViewProps) {
  const { hud, td, dom } = props;
  hud.destructor();
  td.destructor();
  dom.destructor();
}
