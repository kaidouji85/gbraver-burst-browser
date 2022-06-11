// @flow
import type {Player} from "gbraver-burst-core";
import type {NPCBattleStage} from "../npc-battle";
import {NPCBattleRoom} from "../../npc/npc-battle-room";
import {waitAnimationFrame} from "../../wait/wait-animation-frame";
import {waitTime} from "../../wait/wait-time";
import {fadeOut, stop} from "../../bgm/bgm-operators";
import type {GameProps} from "../game-props";

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
  await props.domScenes.startNPCStageTitle(props.resources, level, stage.caption, npcBattle.enemy.armdozer.id);
  await props.fader.fadeIn();

  const startNPCStageTitleTime = Date.now();
  const progress = v => Promise.resolve(npcBattle.progress(v));
  const config = await props.config.load();
  const battleScene = props.tdScenes.startBattle(props.resources, props.bgm, stage.bgm, config.webGLPixelRatio,
    config.battleAnimationTimeScale ,{progress}, npcBattle.player, npcBattle.enemy, npcBattle.stateHistory());
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