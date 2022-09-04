// @flow
import type {Player} from "gbraver-burst-core";
import {fadeOut, stop} from "../../bgm/bgm-operators";
import {NPCBattleRoom} from "../../npc/npc-battle-room";
import {waitAnimationFrame} from "../../wait/wait-animation-frame";
import {waitTime} from "../../wait/wait-time";
import type {GameProps} from "../game-props";
import type {NPCBattleStage} from "../npc-battle";

/**
 * NPCバトルのステージを開始するヘルパー関数
 *
 * @param props ゲームプロパティ
 * @param player プレイヤー
 * @param stage NPCバトルステージ
 * @param level ステージレベル
 */
export async function startNPCBattleStage(props: $ReadOnly<GameProps>, player: Player, stage: NPCBattleStage, level: number) {
  const npcBattle = new NPCBattleRoom(player, stage.npc);
  await props.fader.fadeOut();
  props.domDialogs.hidden();
  await props.domScenes.startStageTitle(props.resources, level, stage.caption, npcBattle.enemy.armdozer.id);
  await props.fader.fadeIn();

  const startNPCStageTitleTime = Date.now();
  const battleProgress = {progress: v => Promise.resolve(npcBattle.progress(v))}
  const config = await props.config.load();
  const battleScene = props.tdScenes.startBattle({resources: props.resources, bgm: props.bgm, playingBGM: stage.bgm,
    pixelRatio: config.webGLPixelRatio, initialAnimationTimeScale: config.battleAnimationTimeScale ,battleProgress,
    player: npcBattle.player, enemy: npcBattle.enemy, initialState: npcBattle.stateHistory()});
  await waitAnimationFrame();
  const latency = Date.now() - startNPCStageTitleTime;
  await waitTime(3000- latency);

  await Promise.all([(async () => {
    await props.fader.fadeOut();
    props.domScenes.hidden();
  })(), (async () => {
    await props.bgm.do(fadeOut);
    await props.bgm.do(stop);
  })()]);
  await props.fader.fadeIn();
  await battleScene.start();
}