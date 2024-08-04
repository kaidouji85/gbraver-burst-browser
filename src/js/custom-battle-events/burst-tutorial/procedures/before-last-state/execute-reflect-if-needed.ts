import { Battle, GameState } from "gbraver-burst-core";

import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { failReflectDamage } from "../../stories/fail-reflect-damage";
import { successReflectDamage } from "../../stories/success-reflect-damage";

/**
 * 条件を満たした場合、ダメージ反射ストーリーを再生する
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function executeReflectIfNeeded(
  props: Readonly<LastState>,
): Promise<void> {
  const foundLastBattle = props.update.find((v) => v.effect.name === "Battle");
  if (!foundLastBattle) {
    return;
  }

  const lastBattle: GameState = foundLastBattle;
  const player = lastBattle.players.find((v) => v.playerId === props.playerId);
  const enemy = lastBattle.players.find((v) => v.playerId !== props.playerId);
  if (!player || !enemy || lastBattle.effect.name !== "Battle") {
    return;
  }

  const battleEffect: Battle = lastBattle.effect;
  const isEnemyAttack = battleEffect.attacker !== props.playerId;
  const hasNotEnemyTryReflect =
    enemy.armdozer.effects.filter((v) => v.type === "TryReflect").length <= 0;
  if (isEnemyAttack || hasNotEnemyTryReflect) {
    return;
  }

  const reflectSuccessful =
    props.update.filter(
      (v) =>
        v.effect.name === "Reflect" &&
        v.effect.damagedPlayer === props.playerId,
    ).length > 0;
  if (reflectSuccessful) {
    await successReflectDamage(props);
  } else {
    await failReflectDamage(props);
  }
}
