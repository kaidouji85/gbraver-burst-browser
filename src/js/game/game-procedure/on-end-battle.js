// @flow
import type {GameEndResult} from "gbraver-burst-core";
import {BattleAnimationTimeScales, parseBattleAnimationTimeScale} from "../config/browser-config";
import type {PostBattleButtonConfig} from "../dom-floaters/post-battle/post-battle-button-config";
import {
  PostNetworkBattleButtons,
  PostNPCBattleComplete,
  PostNPCBattleLoseButtons,
  PostNPCBattleWinButtons,
  PostTutorialWinButtons,
  PostTutorialLoseButtons,
} from "../dom-floaters/post-battle/post-battle-buttons";
import type {EndBattle} from "../game-actions";
import type {GameProps} from "../game-props";
import type {InProgress} from "../in-progress/in-progress";
import type {NPCBattle, PlayingNPCBattle} from "../in-progress/npc-battle";
import {isTutorialWin} from "../in-progress/tutorial";
import type {Tutorial} from "../in-progress/tutorial";
import {isNPCBattleStageClear, updateNPCBattle} from "../npc-battle";

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
 * @param isStageClear ステージクリアをしたか、trueでステージクリア
 * @param isGameClear ゲームクリアしたか、trueでゲームクリア
 * @return 表示するアクションボタン
 */
const postNPCBattleButtons = (isStageClear: boolean, isGameClear: boolean) => {
  if (isGameClear) {
    return PostNPCBattleComplete;
  } else if (isStageClear) {
    return PostNPCBattleWinButtons;
  }
  return PostNPCBattleLoseButtons;
}

/**
 * NPCバトル進行中に利用するデータを生成する
 *
 * @param inProgress 進行中のフロー
 * @return 生成結果、NPCバトル中でない場合はnullを返す
 */
const createNPCBattle = (inProgress: InProgress, gameEndResult: GameEndResult) => {
  if (inProgress.type !== 'NPCBattle' || inProgress.subFlow.type !== 'PlayingNPCBattle') {
    return null;
  }
  const npcBattle = (inProgress: NPCBattle);
  const playingNPCBattle = (inProgress.subFlow: PlayingNPCBattle);
  const isStageClear = isNPCBattleStageClear(playingNPCBattle.state, gameEndResult);
  const updatedState = updateNPCBattle(playingNPCBattle.state, isStageClear);
  const updatedInProgress = {...npcBattle, subFlow: {...playingNPCBattle, state: updatedState}};
  const postBattleButtons = postNPCBattleButtons(isStageClear, updatedState.isGameClear);
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
  const isWin = isTutorialWin(tutorial, gameEndResult);
  const postBattleButtons = isWin ? PostTutorialWinButtons : PostTutorialLoseButtons;
  return {postBattleButtons};
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
    await endTutorial(props, tutorial.postBattleButtons);
  }
}