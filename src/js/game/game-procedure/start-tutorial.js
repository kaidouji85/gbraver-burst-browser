// @flow
import type {PlayerId} from "gbraver-burst-core";
import {fadeOut, stop} from "../../bgm/bgm-operators";
import {createTutorialEvent} from "../../custom-battle-events/tutorial";
import {NPCBattleRoom} from "../../npc/npc-battle-room";
import {SOUND_IDS} from "../../resource/sound";
import type {GameProps} from "../game-props";

/**
 * チュートリアルを開始するヘルパー関数
 *
 * @param props ゲームプロパティ
 * @param playerId プレイヤーID
 * @return 処理が完了したら発火するPromise
 */
export async function startTutorial(props: $ReadOnly<GameProps>, playerId: PlayerId): Promise<void> {
  await props.fader.fadeOut();
  const tutorialEvent = createTutorialEvent(playerId);
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