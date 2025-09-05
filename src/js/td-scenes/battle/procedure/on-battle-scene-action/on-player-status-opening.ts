import { BattleSceneProps } from "../../props";

export function onPlayerStatusOpening(props: Readonly<BattleSceneProps>): void {
  const { stateHistory, playerId } = props;
  props.exclusive.execute(async () => {
    const lastState = stateHistory.at(-1);
    if (!lastState) {
      return;
    }

    const player = lastState.players.find((p) => p.playerId === playerId);
    if (!player) {
      return;
    }
  });
}