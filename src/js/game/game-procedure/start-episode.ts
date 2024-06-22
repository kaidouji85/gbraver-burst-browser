import { fadeOut, stop } from "../../bgm/bgm-operators";
import { MAX_LOADING_TIME } from "../../dom-scenes/dom-scene-binder/max-loading-time";
import { EpisodeTitle } from "../../dom-scenes/episode-title";
import { NPCBattleRoom } from "../../npc/npc-battle-room";
import { BattleScene } from "../../td-scenes/battle";
import { waitAnimationFrame } from "../../wait/wait-animation-frame";
import { waitTime } from "../../wait/wait-time";
import { waitUntilWindowPushWithStream } from "../../wait/wait-until-window-push-with-stream";
import { Episode } from "../episodes/episode";
import { GameProps } from "../game-props";
import { switchBattleScene } from "./switch-scene/switch-battle-scene";
import { switchEpisodeTitle } from "./switch-scene/switch-episode-title";

/**
 * エピソードを開始するヘルパー関数
 * @param props ゲームプロパティ
 * @param episode エピソード
 * @returns 処理が完了したら発火するPromise
 */
export async function startEpisode(
  props: Readonly<GameProps>,
  episode: Episode,
): Promise<void> {
  const npcBattle = new NPCBattleRoom(episode.player, episode.npc);
  await Promise.all([
    props.fader.fadeOut(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);
  const scene = new EpisodeTitle({
    ...episode,
    resources: props.resources,
    armdozerId: episode.player.armdozer.id,
  });
  switchEpisodeTitle(props, scene);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  await props.fader.fadeIn();
  const startTutorialStageTime = Date.now();
  const config = await props.config.load();
  props.renderer.setPixelRatio(config.webGLPixelRatio);
  const battleScene = new BattleScene({
    ...props,
    playingBGM: episode.bgm,
    initialAnimationTimeScale: config.battleAnimationTimeScale,
    battleProgress: npcBattle,
    player: npcBattle.player,
    enemy: npcBattle.enemy,
    initialState: npcBattle.stateHistory(),
    customBattleEvent: episode.event(props.resources),
    controllerType: "BigButton",
  });
  switchBattleScene(props, battleScene);
  await waitAnimationFrame();
  const latency = Date.now() - startTutorialStageTime;
  await Promise.race([
    waitTime(3000 - latency),
    waitUntilWindowPushWithStream(props.pushWindow),
  ]);
  await props.fader.fadeOut();
  props.domSceneBinder.hidden();
  await props.fader.fadeIn();
  await battleScene.start();
}
