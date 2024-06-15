import { GameEnd, PlayerState } from "gbraver-burst-core";

import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../../invisible-all-message-windows";
import { separatePlayersFromLastState } from "../../../separate-players";
import { shinyaMonologueWhenHeLose } from "../../stories/shinya-monologue-when-he-lose";
import { shinyaVictory } from "../../stories/shinya-vistory";
import { yuuyaShoutWhenYuuyaCompleteVictory } from "../../stories/yuuya-shout-when-yuuya-complete-victory";
import { yuuyaShoutWhenYuuyaNarrowVictory } from "../../stories/yuuya-shout-when-yuuya-narrow-victory";
import { yuuyaShoutWhenYuuyaVictory } from "../../stories/yuuya-shout-when-yuuya-victory";

/** 条件オブジェクト */
type Conditions = {
  /** ユウヤのステート */
  yuuya: PlayerState;
  /** ゲーム終了情報 */
  gameEnd: GameEnd;
};

/**
 * 条件オブジェクトを生成する
 * @param props イベントプロパティ
 * @returns 条件判断オブジェクト
 */
function createDecision(props: Readonly<LastState>): Conditions | null {
  const effectName = "GameEnd";
  const gameEnd = props.update.find(
    (state) => state.effect.name == effectName,
  )?.effect;
  const separatedPlayers = separatePlayersFromLastState(props);
  return gameEnd?.name === effectName && separatedPlayers
    ? { yuuya: separatedPlayers.enemy, gameEnd }
    : null;
}

/**
 * 条件を満たした場合、ゲーム終了時のシナリオを再生する
 * @param props イベントプロパティ
 * @returns ゲーム終了時のシナリオを再生した場合、trueを返す
 */
export async function endGameIfNeeded(
  props: Readonly<LastState>,
): Promise<boolean> {
  const decision = createDecision(props);
  if (!decision) {
    return false;
  }

  const { yuuya, gameEnd } = decision;
  const isShinyaVictory =
    gameEnd.result.type === "GameOver" &&
    gameEnd.result.winner === props.playerId;
  const isYuuyaCompleteVictory =
    yuuya.armdozer.hp === yuuya.armdozer.maxHp && yuuya.pilot.enableSkill;
  const isYuuyaNarrowVictory =
    yuuya.armdozer.hp < yuuya.armdozer.maxHp && !yuuya.pilot.enableSkill;

  props.view.dom.enemyShoutMessageWindow.visible(false);
  if (isShinyaVictory) {
    await shinyaVictory(props);
  } else if (isYuuyaCompleteVictory) {
    await yuuyaShoutWhenYuuyaCompleteVictory(props);
    await shinyaMonologueWhenHeLose(props);
  } else if (isYuuyaNarrowVictory) {
    await yuuyaShoutWhenYuuyaNarrowVictory(props);
    await shinyaMonologueWhenHeLose(props);
  } else {
    await yuuyaShoutWhenYuuyaVictory(props);
    await shinyaMonologueWhenHeLose(props);
  }

  invisibleAllMessageWindows(props);
  return true;
}
