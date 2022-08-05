// @flow
import {fadeOut, stop} from "../../bgm/bgm-operators";
import {createTutorialEvent} from "../../custom-battle-events/tutorial";
import {NPCBattleRoom} from "../../npc/npc-battle-room";
import {SOUND_IDS} from "../../resource/sound";
import type {GameProps} from "../game-props";
import {createTutorial} from "../in-progress/tutorial";
import {fullResourceLoading} from "./full-resource-loading";

/**
 * チュートリアル開始時の処理
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onTutorialStart(props: GameProps): Promise<void> {
  if (!props.isFullResourceLoaded) {
    await fullResourceLoading(props);
  }

  props.inProgress = createTutorial();
  await props.fader.fadeOut();
  const tutorialEvent = createTutorialEvent();
  const npcBattle = new NPCBattleRoom(tutorialEvent.player, tutorialEvent.npc);
  const battleProgress = {progress: v => Promise.resolve(npcBattle.progress(v))};
  const config = await props.config.load();
  const battleScene = props.tdScenes.startBattle({resources: props.resources, bgm: props.bgm,
    playingBGM: SOUND_IDS.TUTORIAL_BGM, pixelRatio: config.webGLPixelRatio, initialAnimationTimeScale: config.battleAnimationTimeScale,
    battleProgress, player: npcBattle.player, enemy: npcBattle.enemy, initialState: npcBattle.stateHistory(), customBattleEvent: tutorialEvent});
  props.domScenes.hidden();
  await props.bgm.do(fadeOut);
  await props.bgm.do(stop);
  await props.fader.fadeIn();
  await battleScene.start();
}