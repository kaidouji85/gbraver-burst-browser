import { Command, Player } from "gbraver-burst-core";

import { fadeOut, stop } from "../../bgm/bgm-operators";
import { createSeriousMatchEvent } from "../../custom-battle-events/serious-match-event";
import { MAX_LOADING_TIME } from "../../dom-scenes/dom-scene-binder/max-loading-time";
import { StageTitle } from "../../dom-scenes/stage-title";
import { NPCBattleRoom } from "../../npc/npc-battle-room";
import { BattleScene } from "../../td-scenes/battle";
import { waitAnimationFrame } from "../../wait/wait-animation-frame";
import { waitTime } from "../../wait/wait-time";
import { waitUntilWindowPushWithStream } from "../../wait/wait-until-window-push-with-stream";
import { GameProps } from "../game-props";
import { NPCBattleStage } from "../npc-battle";
import { bindBattleScene } from "./bind-scene/bind-battle-scene";
import { switchStageTitle } from "./switch-scene/switch-stage-title";

/**
 * NPCバトルのステージを開始するヘルパー関数
 * 本関数ではフェードアウト、フェードインを行う
 * @param props ゲームプロパティ
 * @param player プレイヤー
 * @param stage NPCバトルステージ
 * @param level ステージレベル
 */
export async function startNPCBattleStage(
  props: Readonly<GameProps>,
  player: Player,
  stage: NPCBattleStage,
  level: number,
) {
  const npcBattle = new NPCBattleRoom(player, stage.npc);
  await Promise.all([
    props.fader.fadeOut(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);
  props.domDialogBinder.hidden();
  const scene = new StageTitle({
    resources: props.resources,
    level,
    caption: stage.caption,
    armdozerId: npcBattle.enemy.armdozer.id,
  });
  switchStageTitle(props, scene);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  await props.fader.fadeIn();
  const startNPCStageTitleTime = Date.now();
  const battleProgress = {
    progress: (v: Command) => Promise.resolve(npcBattle.progress(v)),
  };
  const config = await props.config.load();
  props.renderer.setPixelRatio(config.webGLPixelRatio);
  const battleScene = new BattleScene({
    ...props,
    playingBGM: stage.bgm,
    initialAnimationTimeScale: config.battleAnimationTimeScale,
    battleProgress,
    player: npcBattle.player,
    enemy: npcBattle.enemy,
    initialState: npcBattle.stateHistory(),
    controllerType: config.battleControllerType,
    customBattleEvent: createSeriousMatchEvent(),
  });
  bindBattleScene(props, battleScene);
  await waitAnimationFrame();
  const latency = Date.now() - startNPCStageTitleTime;
  await Promise.race([
    waitTime(3000 - latency),
    waitUntilWindowPushWithStream(props.pushWindow),
  ]);
  await props.fader.fadeOut();
  props.domSceneBinder.dispose();
  await props.fader.fadeIn();
  await battleScene.start();
}
