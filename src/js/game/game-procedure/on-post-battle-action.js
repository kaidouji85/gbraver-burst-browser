// @flow
import {fadeOut, stop} from "../../bgm/bgm-operators";
import type {PostBattleAction} from "../game-actions";
import type {GameProps} from "../game-props";
import type {NPCBattleState} from "../npc-battle";
import {getCurrentStage, getStageLevel} from "../npc-battle";
import {DefaultStage} from "../npc-battle-courses";
import {startNPCBattleStage} from "./start-npc-battle-stage";
import {startTitle} from "./start-title";

const gotoTitle = async (props: $ReadOnly<GameProps>) => {
  props.domFloaters.hiddenPostBattle();
  const [title] = await Promise.all([(async () => {
    await props.fader.fadeOut();
    return await startTitle(props);
  })(), (async () => {
    await props.bgm.do(fadeOut);
    await props.bgm.do(stop);
  })()]);
  await props.fader.fadeIn();
  title.playBGM();
};

const gotoEnding = async (props: $ReadOnly<GameProps>) => {
  props.domFloaters.hiddenPostBattle();
  await props.fader.fadeOut();
  props.tdScenes.hidden();
  const ending = await props.domScenes.startNPCEnding(props.resources, props.bgm);
  await props.fader.fadeIn();
  ending.playBGM();
};

const gotoNPCBattleStage = async (props: $ReadOnly<GameProps>, state: NPCBattleState) => {
  props.domFloaters.hiddenPostBattle();
  const stage = getCurrentStage(state) ?? DefaultStage;
  const level = getStageLevel(state);
  await startNPCBattleStage(props, state.player, stage, level);
};

/**
 * 戦闘終了後アクション決定時の処理
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onPostBattleAction(props: GameProps, action: PostBattleAction): Promise<void> {
  if (action.action.type === 'GotoTitle') {
    props.inProgress = {type: 'None'};
    await gotoTitle(props);
  } else if (action.action.type === 'GotoEnding') {
    props.inProgress = {type: 'None'};
    await gotoEnding(props);
  } else if (action.action.type === 'NextStage' && props.inProgress.type === 'NPCBattle' && props.inProgress.subFlow.type === 'PlayingNPCBattle') {
    await gotoNPCBattleStage(props, props.inProgress.subFlow.state);
  } else if (action.action.type === 'Retry' && props.inProgress.type === 'NPCBattle' && props.inProgress.subFlow.type === 'PlayingNPCBattle') {
    await gotoNPCBattleStage(props, props.inProgress.subFlow.state);
  }
}