// @flow
import {fadeOut, stop} from "../../bgm/bgm-operators";
import {NPCBattleRoom} from "../../npc/npc-battle-room";
import {waitAnimationFrame} from "../../wait/wait-animation-frame";
import {waitTime} from "../../wait/wait-time";
import type {GameProps} from "../game-props";
import {BattleScene} from "../../td-scenes/battle";
import {battleSceneConnector} from "../td-scenes/battle-scene-connector";
import type {TutorialStage} from "../tutorial-stages";

/**
 * チュートリアルを開始するヘルパー関数
 *
 * @param props ゲームプロパティ
 * @param level チュートリアルステージレベル
 * @param stage チュートリアルステージ
 * @return 処理が完了したら発火するPromise
 */
export async function startTutorial(props: $ReadOnly<GameProps>, level: number, stage: TutorialStage): Promise<void> {
  const npcBattle = new NPCBattleRoom(stage.player, stage.npc);
  await props.fader.fadeOut();
  await props.domScenes.startTutorialTitle({resources: props.resources, level, title: stage.title});
  await props.fader.fadeIn();

  const startTutorialStageTime = Date.now();
  const config = await props.config.load();
  props.renderer.setPixelRatio(config.webGLPixelRatio);
  const battleScene = new BattleScene({resources: props.resources, bgm: props.bgm,
    playingBGM: stage.bgm, initialAnimationTimeScale: config.battleAnimationTimeScale,
    battleProgress: npcBattle, player: npcBattle.player, enemy: npcBattle.enemy, initialState: npcBattle.stateHistory(), customBattleEvent: stage.event(),
    resize: props.resize, pushWindow: props.pushWindow, gameLoop: props.gameLoop, renderer: props.renderer
  });
  props.tdBinder.bind(battleScene, battleSceneConnector);
  await waitAnimationFrame();
  const latency = Date.now() - startTutorialStageTime;
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