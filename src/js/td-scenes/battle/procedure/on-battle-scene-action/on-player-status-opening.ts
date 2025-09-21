import { BattleSceneProps } from "../../props";
import { openPlayerStatus } from "../open-player-status";

/**
 * プレイヤーステータスを開く時の処理
 * @param props 戦闘シーンプロパティ
 */
export function onPlayerStatusOpening(props: Readonly<BattleSceneProps>): void {
  props.exclusive.execute(async () => {
    openPlayerStatus(props);
  });
}
