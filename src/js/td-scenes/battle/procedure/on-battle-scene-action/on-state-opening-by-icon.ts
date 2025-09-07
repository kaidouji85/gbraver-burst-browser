import { StatusOpeningByIcon } from "../../actions/status-opening-by-icon";
import { BattleSceneProps } from "../../props";
import { openEnemyStatus } from "../open-enemy-status";
import { openPlayerStatus } from "../open-player-status";

/**
 * アイコンによりステータスを開く時の処理
 * @param props プロパティ
 */
export function onStatusOpeningByIcon(
  props: BattleSceneProps,
  action: StatusOpeningByIcon,
) {
  const { playerId } = action;
  props.exclusive.execute(async () => {
    const hudPlyer = props.view.hud.players.find(
      (p) => p.playerId === playerId,
    );
    if (!hudPlyer) {
      return;
    }

    await hudPlyer.statusIcon.decide().play();
    const isPlayer = props.playerId === playerId;
    if (isPlayer) {
      openPlayerStatus(props);
    } else {
      openEnemyStatus(props);
    }
  });
}
