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
import {gotoEndingIfNeeded} from "./goto-ending-if-needed";
import {gotoTitleIfNeeded} from "./goto-title-if-needed";
import {gotoNPCBattleStageIfNeeded} from "./goto-npc-battle-stage";

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

  const isGotoNPCBattleStageExecuted = await gotoNPCBattleStageIfNeeded(props, action);
  if (isGotoNPCBattleStageExecuted) {
    return;
  }

  //const npcBattle = createNPCBattle(props.inProgress);
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
