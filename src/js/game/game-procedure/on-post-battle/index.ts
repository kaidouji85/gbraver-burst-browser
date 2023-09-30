import type { Player } from "gbraver-burst-core";

import { fadeOut, stop } from "../../../bgm/bgm-operators";
import { NPCEnding } from "../../../dom-scenes/npc-ending";
import { waitTime } from "../../../wait/wait-time";
import { npcEndingConnector } from "../../action-connector/npc-ending-connector";
import { MAX_LOADING_TIME } from "../../dom-scene-binder/max-loading-time";
import type { Episode } from "../../episodes/episode";
import { PostBattleAction } from "../../game-actions/post-battle-action";
import type { GameProps } from "../../game-props";
import type { InProgress } from "../../in-progress/in-progress";
import type { PlayingEpisode } from "../../in-progress/story";
import type { NPCBattleStage, NPCBattleState } from "../../npc-battle";
import { getCurrentNPCStage, getNPCStageLevel } from "../../npc-battle";
import { DefaultStage } from "../../npc-battle-courses";
import { playTitleBGM } from "../play-title-bgm";
import { startEpisodeSelector } from "../start-episode-selector";
import { startNPCBattleStage } from "../start-npc-battle-stage";
import { startTitle } from "../start-title";
import { startTutorial } from "../start-tutorial";

/**
 * タイトルに遷移する
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
const gotoTitle = async (props: Readonly<GameProps>) => {
  props.domFloaters.hiddenPostBattle();
  await Promise.all([
    (async () => {
      await props.fader.fadeOut();
      return await startTitle(props);
    })(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);
  await props.fader.fadeIn();
  playTitleBGM(props);
};

/**
 * エンディングに遷移する
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
const gotoEnding = async (props: Readonly<GameProps>) => {
  props.domFloaters.hiddenPostBattle();
  await props.fader.fadeOut();
  props.tdBinder.hidden();
  const scene = new NPCEnding(props.resources, props.bgm);
  props.domSceneBinder.bind(scene, npcEndingConnector);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  await props.fader.fadeIn();
  scene.playBGM();
};

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
  const npcBattle = createNPCBattle(props.inProgress);

  if (action.action.type === "GotoTitle") {
    props.inProgress = {
      type: "None",
    };
    await gotoTitle(props);
    return;
  }

  if (action.action.type === "GotoEnding") {
    props.inProgress = {
      type: "None",
    };
    await gotoEnding(props);
    return;
  }

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
