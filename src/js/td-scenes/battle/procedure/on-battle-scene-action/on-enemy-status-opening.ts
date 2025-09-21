import { BattleSceneProps } from "../../props";
import { openEnemyStatus } from "../open-enemy-status";

/**
 * 敵ステータスを開く時の処理
 * @param props 戦闘シーンプロパティ
 */
export function onEnemyStatusOpening(props: Readonly<BattleSceneProps>): void {
  props.exclusive.execute(async () => {
    openEnemyStatus(props);
  });
}
