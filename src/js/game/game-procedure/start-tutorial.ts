import { fadeOut, stop } from "../../bgm/bgm-operators";
import { TutorialTitle } from "../../dom-scenes/tutorial-title";
import { NPCBattleRoom } from "../../npc/npc-battle-room";
import { BattleScene } from "../../td-scenes/battle";
import { waitAnimationFrame } from "../../wait/wait-animation-frame";
import { waitTime } from "../../wait/wait-time";
import { battleSceneConnector } from "../action-connector/battle-scene-connector";
import { tutorialTitleConnector } from "../action-connector/tutorial-title-connector";
import { MAX_LOADING_TIME } from "../dom-scene-binder/max-loading-time";
import type { GameProps } from "../game-props/game-props";
import type { TutorialStage } from "../tutorial-stages/tutorial-stage";

/**
 * チュートリアルを開始するヘルパー関数
 *
 * @param props ゲームプロパティ
 * @param level チュートリアルステージレベル
 * @param stage チュートリアルステージ
 * @return 処理が完了したら発火するPromise
 */
export async function startTutorial(
  props: Readonly<GameProps>,
  level: number,
  stage: TutorialStage,
): Promise<void> {
  const npcBattle = new NPCBattleRoom(stage.player, stage.npc);
  await Promise.all([
    props.fader.fadeOut(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);
  const scene = new TutorialTitle({
    resources: props.resources,
    level,
    title: stage.title,
  });
  props.domSceneBinder.bind(scene, tutorialTitleConnector);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  await props.fader.fadeIn();
  const startTutorialStageTime = Date.now();
  const config = await props.config.load();
  props.renderer.setPixelRatio(config.webGLPixelRatio);
  const battleScene = new BattleScene({
    resources: props.resources,
    bgm: props.bgm,
    playingBGM: stage.bgm,
    initialAnimationTimeScale: config.battleAnimationTimeScale,
    battleProgress: npcBattle,
    player: npcBattle.player,
    enemy: npcBattle.enemy,
    initialState: npcBattle.stateHistory(),
    customBattleEvent: stage.event(props.resources),
    resize: props.resize,
    pushWindow: props.pushWindow,
    gameLoop: props.gameLoop,
    renderer: props.renderer,
    controllerType: "BigButton",
  });
  props.tdBinder.bind(battleScene, battleSceneConnector);
  await waitAnimationFrame();
  const latency = Date.now() - startTutorialStageTime;
  await waitTime(3000 - latency);
  await props.fader.fadeOut();
  props.domSceneBinder.hidden();
  await props.fader.fadeIn();
  await battleScene.start();
}
