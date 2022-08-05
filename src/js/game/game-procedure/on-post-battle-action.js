// @flow
import type {Player, PlayerId} from 'gbraver-burst-core';
import {fadeOut, stop} from "../../bgm/bgm-operators";
import type {PostBattleAction} from "../game-actions";
import type {GameProps} from "../game-props";
import type { NPCBattleStage, NPCBattleState } from "../npc-battle";
import {getCurrentStage, getStageLevel} from "../npc-battle";
import {DefaultStage} from "../npc-battle-courses";
import {startNPCBattleStage} from "./start-npc-battle-stage";
import {startTitle} from "./start-title";
import {startTutorial} from "./start-tutorial";
import type {Tutorial} from "../in-progress/tutorial";

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

const gotoNPCBattleStage = async (props: $ReadOnly<GameProps>, player: Player, stage: NPCBattleStage, level: number) => {
  props.domFloaters.hiddenPostBattle();
  await startNPCBattleStage(props, player, stage, level);
};

const gotoTutorial = async (props: $ReadOnly<GameProps>, playerId: PlayerId) => {
  props.domFloaters.hiddenPostBattle();
  await startTutorial(props, playerId);
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
  const npcBattle = ((props: $ReadOnly<GameProps>) => {
    if (props.inProgress.type !== 'NPCBattle' || props.inProgress.subFlow.type !== 'PlayingNPCBattle') {
      return null;
    }
    const state = (props.inProgress.subFlow.state: NPCBattleState);
    const stage = getCurrentStage(state) ?? DefaultStage;
    const level = getStageLevel(state);
    const player = state.player;
    return {player, stage, level};
  })(props);
  const tutorial = ((props: $ReadOnly<GameProps>) => {
    if (props.inProgress.type !== 'Tutorial') {
      return null;
    }
    const inProgress = (props.inProgress: Tutorial);
  })(props);

  if (action.action.type === 'GotoTitle') {
    props.inProgress = {type: 'None'};
    await gotoTitle(props);
  } else if (action.action.type === 'GotoEnding') {
    props.inProgress = {type: 'None'};
    await gotoEnding(props);
  } else if (npcBattle && (action.action.type === 'NextStage' || action.action.type === 'Retry')) {
    await gotoNPCBattleStage(props, npcBattle.player, npcBattle.stage, npcBattle.level);
  } else if (tutorial && action.action.type === 'Retry') {
    await gotoTutorial(props, tutorial.playerId);
  }
}