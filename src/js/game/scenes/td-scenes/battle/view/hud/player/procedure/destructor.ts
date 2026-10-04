import { HUDPlayerProps } from "../props";

/**
 * デストラクタ相当の処理
 * @param props プロパティ
 */
export function destructor(props: HUDPlayerProps) {
  const { gauge, predicatedDamage, statusIcon, turnStart, resultIndicator } =
    props;

  gauge.destructor();
  predicatedDamage.destructor();
  statusIcon.destructor();
  turnStart.destructor();
  resultIndicator.destructor();
}
