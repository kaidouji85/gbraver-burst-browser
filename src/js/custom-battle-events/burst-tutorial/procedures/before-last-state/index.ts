import { Battle, GameState } from "gbraver-burst-core";

import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { BurstTutorialProps } from "../../props";
import { BurstTutorialState } from "../../state";
import { failReflectDamage } from "../../stories/fail-reflect-damage";
import { introduction } from "../../stories/introduction";
import { successReflectDamage } from "../../stories/success-reflect-damage";

/**
 * 条件を満たした場合、ダメージ反射ストーリーを再生する
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
async function executeReflectIfNeeded(
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
  reflectSuccessful
    ? await successReflectDamage(props)
    : await failReflectDamage(props);
}

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @return ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastState & BurstTutorialProps>,
): Promise<BurstTutorialState> {
  if (!props.state.isIntroductionComplete) {
    await introduction(props);
    return { ...props.state, isIntroductionComplete: true };
  }

  await executeReflectIfNeeded(props);
  return props.state;
}
