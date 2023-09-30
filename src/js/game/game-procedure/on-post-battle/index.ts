import { Player } from "gbraver-burst-core";

import { Episode } from "../../episodes/episode";
import { PostBattleAction } from "../../game-actions/post-battle-action";
import { GameProps } from "../../game-props";
import { InProgress } from "../../in-progress/in-progress";
import { PlayingEpisode } from "../../in-progress/story";
import { NPCBattleStage, NPCBattleState } from "../../npc-battle";
import { getCurrentNPCStage, getNPCStageLevel } from "../../npc-battle";
import { DefaultStage } from "../../npc-battle-courses";
import { playTitleBGM } from "../play-title-bgm";
import { startEpisodeSelector } from "../start-episode-selector";
import { startNPCBattleStage } from "../start-npc-battle-stage";
import { startTutorial } from "../start-tutorial";
import {gotoTitleIfNeeded} from "./goto-title-if-needed";
import {gotoEndingIfNeeded} from "./goto-ending-if-needed";

/**
 * NPCバトル進行中に利用するデータを生成する
 *
 * @param inProgress 進行中のフロー
 * @return 生成結果、NPCバトル中でない場合はnullを返す
 */
const createNPCBattle = (inProgress: InProgress) => {
  if (
    inProgress.type !== "NPCBattle" ||
    inProgress.npcBattle.type !== "PlayingNPCBattle"
  ) {
    return null;
  }

  const state: NPCBattleState = inProgress.npcBattle.state;
  const stage = getCurrentNPCStage(state) ?? DefaultStage;
  const level = getNPCStageLevel(state);
  const player = state.player;
  return {
    player,
    stage,
    level,
  };
};

/**
 * NPCバトルステージに遷移する
 *
 * @param props ゲームプロパティ
 * @param player プレイヤー情報
 * @param stage ステージ情報
 * @param level レベル
 * @return 処理が完了したら発火するPromise
 */
const gotoNPCBattleStage = async (
  props: Readonly<GameProps>,
  player: Player,
  stage: NPCBattleStage,
  level: number,
) => {
  props.domFloaters.hiddenPostBattle();
  await startNPCBattleStage(props, player, stage, level);
};

/**
 * チュートリアルに遷移する
 * @param props ゲームプロパティ
 * @param level チュートリアルステージレベル
 * @param episode エピソード
 * @return 処理が完了したら発火するPromise
 */
const gotoTutorial = async (
  props: Readonly<GameProps>,
  level: number,
  episode: Episode,
) => {
  props.domFloaters.hiddenPostBattle();
  await startTutorial(props, level, episode);
};

/**
 * チュートリアル選択画面に遷移する
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
const gotoTutorialSelector = async (props: Readonly<GameProps>) => {
  props.domFloaters.hiddenPostBattle();
  await startEpisodeSelector(props);
  playTitleBGM(props);
};

/**
 * 戦闘終了後アクション決定時の処理
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onPostBattleAction(
  props: GameProps,
  action: PostBattleAction,
): Promise<void> {
  const isGotoTitleExecuted = await gotoTitleIfNeeded(props, action);
  if (isGotoTitleExecuted) {
    props.inProgress = {
      type: "None",
    };
    return;
  }

  const isGotoEndingExecuted = await gotoEndingIfNeeded(props, action);
  if (isGotoEndingExecuted) {
    props.inProgress = {
      type: "None",
    };
    return;
  }

  const npcBattle = createNPCBattle(props.inProgress);
  if (
    npcBattle &&
    (action.action.type === "NextStage" || action.action.type === "Retry")
  ) {
    await gotoNPCBattleStage(
      props,
      npcBattle.player,
      npcBattle.stage,
      npcBattle.level,
    );
    return;
  }

  if (
    action.action.type === "Retry" &&
    props.inProgress.type === "Story" &&
    props.inProgress.story.type === "PlayingEpisode"
  ) {
    const playingTutorial: PlayingEpisode = props.inProgress.story;
    await gotoTutorial(props, playingTutorial.level, playingTutorial.episode);
  } else if (action.action.type === "GotoTutorialSelect") {
    props.inProgress = {
      type: "Story",
      story: {
        type: "EpisodeSelect",
      },
    };
    await gotoTutorialSelector(props);
  }
}
