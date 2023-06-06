import type { Battle, GameState } from "gbraver-burst-core";

import type { LastState } from "../../../td-scenes/battle/custom-battle-event";
import type { BurstTutorialState } from "../state";
import { failReflectDamage } from "../stories/fail-reflect-damage";
import { introduction } from "../stories/introduction";
import { successReflectDamage } from "../stories/success-reflect-damage";

/**
 * 条件を満たした場合、ダメージ反射ストーリーを再生する
 *
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
async function doReflectOrNothing(props: Readonly<LastState>): Promise<void> {
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
        v.effect.name === "Reflect" && v.effect.damagedPlayer === props.playerId
    ).length > 0;
  reflectSuccessful
    ? await successReflectDamage(props)
    : await failReflectDamage(props);
}

/**
 * 最終ステート直前イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastState>,
  state: BurstTutorialState
): Promise<BurstTutorialState> {
  if (!state.isIntroductionComplete) {
    await introduction(props);
    return { ...state, isIntroductionComplete: true };
  }

  await doReflectOrNothing(props);
  return state;
}
