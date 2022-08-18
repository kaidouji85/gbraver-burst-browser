// @flow
import {fadeOut, stop} from "../../bgm/bgm-operators";
import {NPCBattleRoom} from "../../npc/npc-battle-room";
import {SOUND_IDS} from "../../resource/sound";
import type {GameProps} from "../game-props";
import type {TutorialStage} from "../tutorial";

/**
 * チュートリアルを開始するヘルパー関数
 *
 * @param props ゲームプロパティ
 * @param playerId プレイヤーID
 * @return 処理が完了したら発火するPromise
 */
export async function startTutorial(props: $ReadOnly<GameProps>, stage: TutorialStage): Promise<void> {
  await props.fader.fadeOut();
  const npcBattle = new NPCBattleRoom(stage.player, stage.npc);
  const battleProgress = {progress: v => Promise.resolve(npcBattle.progress(v))};
  const config = await props.config.load();
  const battleScene = props.tdScenes.startBattle({resources: props.resources, bgm: props.bgm,
    playingBGM: SOUND_IDS.TUTORIAL_BGM, pixelRatio: config.webGLPixelRatio, initialAnimationTimeScale: config.battleAnimationTimeScale,
    battleProgress, player: npcBattle.player, enemy: npcBattle.enemy, initialState: npcBattle.stateHistory(), customBattleEvent: stage.event});
  props.domScenes.hidden();
  await props.bgm.do(fadeOut);
  await props.bgm.do(stop);
  await props.fader.fadeIn();
  await battleScene.start();
}