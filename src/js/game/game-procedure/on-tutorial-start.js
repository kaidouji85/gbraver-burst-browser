// @flow
import {fadeOut, stop} from "../../bgm/bgm-operators";
import {createTutorialEvent} from "../../custom-battle-etenvts/tutorial";
import {NPCBattleRoom} from "../../npc/npc-battle-room";
import {SOUND_IDS} from "../../resource/sound";
import type {GameProps} from "../game-props";
import {fullResourceLoading} from "./full-resource-loading";

/**
 * チュートリアル開始時の処理
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onTutorialStart(props: GameProps): Promise<void> {
  if (!props.isFullResourceLoaded) {
    await fullResourceLoading(props);
  }

  await props.fader.fadeOut();
  const tutorialEvent = createTutorialEvent();
  const npcBattle = new NPCBattleRoom(tutorialEvent.player, tutorialEvent.npc);
  const progress = v => Promise.resolve(npcBattle.progress(v));
  const config = await props.config.load();
  const battleScene = props.tdScenes.startBattle(props.resources, props.bgm, SOUND_IDS.BATTLE_BGM_01, config.webGLPixelRatio,
    config.battleAnimationTimeScale ,{progress}, npcBattle.player, npcBattle.enemy, npcBattle.stateHistory());
  props.domScenes.hidden();
  await props.bgm.do(fadeOut);
  await props.bgm.do(stop);
  await props.fader.fadeIn();
  await battleScene.start();
}