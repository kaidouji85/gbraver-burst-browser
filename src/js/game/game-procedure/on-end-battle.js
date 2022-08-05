// @flow
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
  const npcBattle = ((props: $ReadOnly<GameProps>) => {
    if (props.inProgress.type !== 'NPCBattle' || props.inProgress.subFlow.type !== 'PlayingNPCBattle') {
      return null;
    }
    const inProgress = (props.inProgress: NPCBattle);
    const subFlow = (props.inProgress.subFlow: PlayingNPCBattle);
    const isStageClear = isNPCBattleStageClear(subFlow.state, action.gameEnd.result);
    const updatedState = updateNPCBattle(subFlow.state, isStageClear);
    const updatedInProgress = {...inProgress, subFlow: {...inProgress.subFlow, state: updatedState}};
    const postBattleButtons = (() => {
      if (isStageClear && updatedState.isGameClear) {
        return PostNPCBattleComplete;
      } else if (isStageClear) {
        return PostNPCBattleWinButtons;
      }
      return PostNPCBattleLoseButtons;
    })();
    return {updatedInProgress, postBattleButtons};
  })(props);
  const tutorial = ((props: $ReadOnly<GameProps>) => {
    if (props.inProgress.type !== 'Tutorial') {
      return null;
    }
    const inProgress = (props.inProgress: Tutorial);
    const isWin = isTutorialWin(inProgress, action.gameEnd.result);
    const postBattleButtons = isWin ? PostTutorialWinButtons : PostTutorialLoseButtons;
    return {postBattleButtons};
  })(props);

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