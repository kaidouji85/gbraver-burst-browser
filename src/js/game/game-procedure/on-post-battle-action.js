// @flow
import type { Player } from "gbraver-burst-core";

import { fadeOut, stop } from "../../bgm/bgm-operators";
import type { PostBattleAction } from "../game-actions";
import type { GameProps } from "../game-props";
import type { InProgress } from "../in-progress/in-progress";
import type { PlayingTutorialStage } from "../in-progress/tutorial";
import type { NPCBattleStage, NPCBattleState } from "../npc-battle";
import { getCurrentNPCStage, getNPCStageLevel } from "../npc-battle";
import { DefaultStage } from "../npc-battle-courses";
import type { TutorialStage } from "../tutorial-stages";
import { playTitleBGM } from "./play-title-bgm";
import { startNPCBattleStage } from "./start-npc-battle-stage";
import { startTitle } from "./start-title";
import { startTutorial } from "./start-tutorial";
import { startTutorialSelector } from "./start-tutorial-selector";

/**
 * タイトルに遷移する
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
const gotoTitle = async (props: $ReadOnly<GameProps>) => {
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
const gotoEnding = async (props: $ReadOnly<GameProps>) => {
  props.domFloaters.hiddenPostBattle();
  await props.fader.fadeOut();
  props.tdBinder.hidden();
  const ending = await props.domScenes.startNPCEnding(
    props.resources,
    props.bgm
  );
  await props.fader.fadeIn();
  ending.playBGM();
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
    inProgress.subFlow.type !== "PlayingNPCBattle"
  ) {
    return null;
  }
  const state = (inProgress.subFlow.state: NPCBattleState);
  const stage = getCurrentNPCStage(state) ?? DefaultStage;
  const level = getNPCStageLevel(state);
  const player = state.player;
  return { player, stage, level };
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
  props: $ReadOnly<GameProps>,
  player: Player,
  stage: NPCBattleStage,
  level: number
) => {
  props.domFloaters.hiddenPostBattle();
  await startNPCBattleStage(props, player, stage, level);
};

/**
 * チュートリアルに遷移する
 *
 * @param props ゲームプロパティ
 * @param level チュートリアルステージレベル
 * @param stage チュートリアルステージ
 * @return 処理が完了したら発火するPromise
 */
const gotoTutorial = async (
  props: $ReadOnly<GameProps>,
  level: number,
  stage: TutorialStage
) => {
  props.domFloaters.hiddenPostBattle();
  await startTutorial(props, level, stage);
};

/**
 * チュートリアル選択画面に遷移する
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
const gotoTutorialSelector = async (props: $ReadOnly<GameProps>) => {
  props.domFloaters.hiddenPostBattle();
  await startTutorialSelector(props);
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
  action: PostBattleAction
): Promise<void> {
  const npcBattle = createNPCBattle(props.inProgress);
  if (action.action.type === "GotoTitle") {
    props.inProgress = { type: "None" };
    await gotoTitle(props);
  } else if (action.action.type === "GotoEnding") {
    props.inProgress = { type: "None" };
    await gotoEnding(props);
  } else if (
    npcBattle &&
    (action.action.type === "NextStage" || action.action.type === "Retry")
  ) {
    await gotoNPCBattleStage(
      props,
      npcBattle.player,
      npcBattle.stage,
      npcBattle.level
    );
  } else if (
    action.action.type === "Retry" &&
    props.inProgress.type === "Tutorial" &&
    props.inProgress.subFlow.type === "PlayingTutorialStage"
  ) {
    const playingTutorial = (props.inProgress.subFlow: PlayingTutorialStage);
    await gotoTutorial(props, playingTutorial.level, playingTutorial.stage);
  } else if (action.action.type === "GotoTutorialSelect") {
    props.inProgress = {
      type: "Tutorial",
      subFlow: { type: "TutorialStageSelect" },
    };
    await gotoTutorialSelector(props);
  }
}
