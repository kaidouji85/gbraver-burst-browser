import { BattleSceneProps } from "../props";

/**
 * バトルシミュレータ開始時の処理
 * @param props 戦闘シーンプロパティ
 */
export function onBattleSimulator(props: BattleSceneProps) {
  const { exclusive, playerId, stateHistory, battleSimulate } = props;
  exclusive.execute(async () => {
    const lastState = stateHistory.at(-1);
    if (!lastState) {
      return;
    }

    const player = lastState.players.find((p) => p.playerId === playerId);
    const enemy = lastState.players.find((p) => p.playerId !== playerId);
    if (!player || !enemy) {
      return;
    }

    const isPlayerAttacker = lastState.activePlayerId === playerId;
    battleSimulate.next({
      player,
      enemy,
      isPlayerAttacker,
    });
  });
}
