// @flow
import type {GameEndResult} from "gbraver-burst-core";
import {BattleAnimationTimeScales, parseBattleAnimationTimeScale} from "../config/browser-config";
import type {PostBattleButtonConfig} from "../dom-floaters/post-battle/post-battle-button-config";
import {
  PostNetworkBattleButtons,
  PostNPCBattleComplete,
  PostNPCBattleLoseButtons,
  PostNPCBattleWinButtons,
  PostTutorialLoseButtons,
  PostTutorialWinButtons,
  PostTutorialCompleteButtons,
} from "../dom-floaters/post-battle/post-battle-buttons";
import type {EndBattle} from "../game-actions";
import type {GameProps} from "../game-props";
import type {InProgress} from "../in-progress/in-progress";
import type {NPCBattle, PlayingNPCBattle} from "../in-progress/npc-battle";
import type {Tutorial} from "../in-progress/tutorial";
import type {NPCBattleResult} from "../npc-battle";
import {updateNPCBattleState} from "../npc-battle";
import {updateTutorialState} from "../tutorial";
import type { TutorialResult } from "../tutorial";

/**
 * 戦闘画面のアニメーションタイムスケールを設定に反映する
 *
 * @param props ゲームプロパティ
 * @param animationTimeScale 反映するタイムスケール
 */
const saveAnimationTimeScale = async (props: $ReadOnly<GameProps>, animationTimeScale: number) => {
  const battleAnimationTimeScale = parseBattleAnimationTimeScale(animationTimeScale) ?? BattleAnimationTimeScales[0];
  const origin = await props.config.load();
  const update = {...origin, battleAnimationTimeScale};
  await props.config.save(update);
};

/**
 * カジュアルマッチが終了した際の処理
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
const endCasualMatch = async (props: $ReadOnly<GameProps>) => {
  props.suddenlyBattleEnd.unbind();
  await props.api.disconnectWebsocket();
  await props.domFloaters.showPostBattle(props.resources, PostNetworkBattleButtons);
};

/**
 * NPCバトル終了後に表示するアクションボタンを求める
 *
 * @param result NPCバトル結果
 * @return 表示するアクションボタン
 */
const postNPCBattleButtons = (result: NPCBattleResult) => {
  switch(result) {
    case 'NPCBattleComplete':
      return PostNPCBattleComplete;
    case 'StageClear':
      return PostNPCBattleWinButtons;
    case 'StageMiss':
    default:
      return PostNPCBattleLoseButtons;
  }
}

/**
 * NPCバトル進行中に利用するデータを生成する
 *
 * @param inProgress 進行中のフロー
 * @param gameEndResult 戦闘結果
 * @return 生成結果、NPCバトル中でない場合はnullを返す
 */
const createNPCBattle = (inProgress: InProgress, gameEndResult: GameEndResult) => {
  if (inProgress.type !== 'NPCBattle' || inProgress.subFlow.type !== 'PlayingNPCBattle') {
    return null;
  }
  const npcBattle = (inProgress: NPCBattle);
  const playingNPCBattle = (inProgress.subFlow: PlayingNPCBattle);
  const updated = updateNPCBattleState(playingNPCBattle.state, gameEndResult);
  if (!updated) {
    return null;
  }

  const postBattleButtons = postNPCBattleButtons(updated.result);
  const updatedInProgress =  {...npcBattle, subFlow: {...playingNPCBattle, state: updated.state}};
  return {updatedInProgress, postBattleButtons};
};

/**
 * NPCバトルステージが終了した際の処理
 * 
 * @param props ゲームプロパティ
 * @param postBattleButtons 戦闘終了後アクションボタン設定
 * @return 処理が完了したら発火するPromise
 */
const endNPCBattleStage = async (props: $ReadOnly<GameProps>, postBattleButtons: PostBattleButtonConfig[]) => {
  await props.domFloaters.showPostBattle(props.resources, postBattleButtons);
};

/**
 * チュートリアル終了後に表示するアクションボタンを求める
 *
 * @param result チュートリアル結果
 * @return 表示するアクションボタン
 */
const postTutorialButtons = (result: TutorialResult) => {
  switch(result) {
    case 'TutorialComplete':
      return PostTutorialCompleteButtons;
    case 'StageClear':
      return PostTutorialWinButtons;
    case 'StageMiss':
    default:
      return PostTutorialLoseButtons;
  }
}

/**
 * チュートリアル進行中に利用するデータを生成する
 *
 * @param inProgress 進行中のフロー
 * @return 生成結果、チュートリアル中でない場合はnullを返す
 */
const createTutorial = (inProgress: InProgress, gameEndResult: GameEndResult) => {
  if (inProgress.type !== 'Tutorial') {
    return null;
  }
  const tutorial = (inProgress: Tutorial);
  const updated = updateTutorialState(tutorial.state, gameEndResult);
  if (!updated) {
    return null;
  }

  const postBattleButtons = postTutorialButtons(updated.result);
  const updatedInProgress = {...tutorial, state: updated.state};
  return {postBattleButtons, updatedInProgress};
};

/**
 * チュートリアルが終了した際の処理
 *
 * @param props ゲームプロパティ
 * @param postBattleButtons 戦闘終了後アクションボタン設定
 * @return 処理が完了したら発火するPromise
 */
const endTutorial = async (props: $ReadOnly<GameProps>, postBattleButtons: PostBattleButtonConfig[]) => {
  await props.domFloaters.showPostBattle(props.resources, postBattleButtons);
};

/**
 * 戦闘終了時の処理
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onEndBattle(props: GameProps, action: EndBattle): Promise<void> {
  const npcBattle = createNPCBattle(props.inProgress, action.gameEnd.result);
  const tutorial = createTutorial(props.inProgress, action.gameEnd.result);
  await saveAnimationTimeScale(props, action.animationTimeScale);
  if (npcBattle) {
    props.inProgress = npcBattle.updatedInProgress;
    await endNPCBattleStage(props, npcBattle.postBattleButtons);  
  } else if (props.inProgress.type === 'CasualMatch') {
    await endCasualMatch(props);
  } else if (tutorial) {
    props.inProgress = tutorial.updatedInProgress;
    await endTutorial(props, tutorial.postBattleButtons);
  }
}