import type { Command, Player } from "gbraver-burst-core";

import { fadeOut, stop } from "../../bgm/bgm-operators";
import { StageTitle } from "../../dom-scenes/stage-title/stage-title";
import { NPCBattleRoom } from "../../npc/npc-battle-room";
import { BattleScene } from "../../td-scenes/battle";
import { waitAnimationFrame } from "../../wait/wait-animation-frame";
import { waitTime } from "../../wait/wait-time";
import { battleSceneConnector } from "../action-connector/battle-scene-connector";
import { stageTitleConnector } from "../action-connector/stage-title-connector";
import { MAX_LOADING_TIME } from "../dom-scene-binder/max-loading-time";
import type { GameProps } from "../game-props";
import type { NPCBattleStage } from "../npc-battle";

/**
 * NPCバトルのステージを開始するヘルパー関数
 *
 * @param props ゲームプロパティ
 * @param player プレイヤー
 * @param stage NPCバトルステージ
 * @param level ステージレベル
 */
export async function startNPCBattleStage(
  props: Readonly<GameProps>,
  player: Player,
  stage: NPCBattleStage,
  level: number
) {
  const npcBattle = new NPCBattleRoom(player, stage.npc);
  await props.fader.fadeOut();
  props.domDialogBinder.hidden();
  const scene = new StageTitle({
    resources: props.resources,
    stagePrefix: "NPCBattle",
    level,
    caption: stage.caption,
    armDozerId: npcBattle.enemy.armdozer.id,
  });
  props.domSceneBinder.bind(scene, stageTitleConnector);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  await props.fader.fadeIn();
  const startNPCStageTitleTime = Date.now();
  const battleProgress = {
    progress: (v: Command) => Promise.resolve(npcBattle.progress(v)),
  };
  const config = await props.config.load();
  props.renderer.setPixelRatio(config.webGLPixelRatio);
  const battleScene = new BattleScene({
    resources: props.resources,
    bgm: props.bgm,
    playingBGM: stage.bgm,
    initialAnimationTimeScale: config.battleAnimationTimeScale,
    battleProgress,
    player: npcBattle.player,
    enemy: npcBattle.enemy,
    initialState: npcBattle.stateHistory(),
    resize: props.resize,
    pushWindow: props.pushWindow,
    gameLoop: props.gameLoop,
    renderer: props.renderer,
    controllerType: "BigButton",  // TODO アプリ設定から値をセットする
  });
  props.tdBinder.bind(battleScene, battleSceneConnector);
  await waitAnimationFrame();
  const latency = Date.now() - startNPCStageTitleTime;
  await waitTime(3000 - latency);
  await Promise.all([
    (async () => {
      await props.fader.fadeOut();
      props.domSceneBinder.hidden();
    })(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);
  await props.fader.fadeIn();
  await battleScene.start();
}
