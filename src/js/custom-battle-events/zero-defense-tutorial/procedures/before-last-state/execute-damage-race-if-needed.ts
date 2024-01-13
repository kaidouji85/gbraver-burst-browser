import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { separatePlayers } from "../../../separate-players";
import { ZeroDefenseTutorialProps } from "../../props";
import { ZeroDefenseTutorialState } from "../../state";
import { damageRace } from "../../stories/damage-race";

/**
 * 条件を満たした場合、ダメージレースストーリーを再生する
 * @param props イベントプロパティ
 * @return ステート更新結果
 */
export async function executeDamageRaceIfNeeded(
  props: Readonly<LastState & ZeroDefenseTutorialProps>,
): Promise<ZeroDefenseTutorialState> {
  if (props.state.isDamageRaceComplete) {
    return props.state;
  }

  const battle = props.update.find((state) => state.effect.name === "Battle");
  if (!battle || battle.effect.name !== "Battle") {
    return props.state;
  }

  const separatedPlayers = separatePlayers(props, battle);
  if (!separatedPlayers) {
    return props.state;
  }

  const { player, enemy } = separatedPlayers;
  const isEnemyAttack = battle.effect.attacker === enemy.playerId;
  if (isEnemyAttack) {
    await damageRace(props, player.armdozer.hp, enemy.armdozer.hp);
    return { ...props.state, isDamageRaceComplete: true };
  }

  return props.state;
}
