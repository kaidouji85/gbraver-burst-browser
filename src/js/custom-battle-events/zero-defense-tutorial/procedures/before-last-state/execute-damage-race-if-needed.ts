import { Battle, GameStateX } from "gbraver-burst-core";

import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { extractBattle } from "../../../game-state-extractor";
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

  const extractedBattle = extractBattle(props.update);
  if (!extractedBattle) {
    return props.state;
  }

  const battle: GameStateX<Battle> = extractedBattle;
  const player = battle.players.find((v) => v.playerId === props.playerId);
  const enemy = battle.players.find((v) => v.playerId !== props.playerId);
  const isEnemyAttack = battle.effect.attacker !== props.playerId;

  if (player && enemy && isEnemyAttack) {
    await damageRace(props, player.armdozer.hp, enemy.armdozer.hp);
    return { ...props.state, isDamageRaceComplete: true };
  }

  return props.state;
}
