// @flow
import {BattleAnimationTimeScales, parseBattleAnimationTimeScale} from "../config/browser-config";
import {
  PostNetworkBattleButtons,
  PostNPCBattleComplete,
  PostNPCBattleLoseButtons,
  PostNPCBattleWinButtons
} from "../dom-floaters/post-battle/post-battle-buttons";
import type {EndBattle} from "../game-actions";
import type {GameProps} from "../game-props";
import type {NPCBattleX, PlayingNPCBattle} from "../in-progress/npc-battle";
import {isNPCBattleStageClear, updateNPCBattle} from "../npc-battle";

const saveAnimationTimeScale = async (props: $ReadOnly<GameProps>, animationTimeScale: number) => {
  const battleAnimationTimeScale = parseBattleAnimationTimeScale(animationTimeScale) ?? BattleAnimationTimeScales[0];
  const origin = await props.config.load();
  const update = {...origin, battleAnimationTimeScale};
  await props.config.save(update);
};

const endCasualMatch = async (props: $ReadOnly<GameProps>) => {
  props.suddenlyBattleEnd.unbind();
  await props.api.disconnectWebsocket();
  await props.domFloaters.showPostBattle(props.resources, PostNetworkBattleButtons);
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
  const endNPCBattleStage = async (inProgress: NPCBattleX<PlayingNPCBattle>) => {
    const isStageClear = isNPCBattleStageClear(inProgress.subFlow.state, action.gameEnd.result);
    const updatedState = updateNPCBattle(inProgress.subFlow.state, isStageClear);
    props.inProgress = {...inProgress, subFlow: {...inProgress.subFlow, state: updatedState}};
    const postBattleButtons = (() => {
      if (isStageClear && updatedState.isGameClear) {
        return PostNPCBattleComplete;
      } else if (isStageClear) {
        return PostNPCBattleWinButtons;
      } else {
        return PostNPCBattleLoseButtons;
      }
    })();
    await props.domFloaters.showPostBattle(props.resources, postBattleButtons);
  };


  await saveAnimationTimeScale(props, action.animationTimeScale);
  if (props.inProgress.type === 'NPCBattle' && props.inProgress.subFlow.type === 'PlayingNPCBattle') {
    const playingNPCBattle: PlayingNPCBattle = props.inProgress.subFlow;
    const inProgress = ((props.inProgress: any): NPCBattleX<typeof playingNPCBattle>);
    await endNPCBattleStage(inProgress);
  } else if (props.inProgress.type === 'CasualMatch') {
    await endCasualMatch(props);
  }
}