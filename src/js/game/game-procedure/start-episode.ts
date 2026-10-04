import { Player } from "gbraver-burst-core";

import { waitAnimationFrame } from "../../event/wait/wait-animation-frame";
import { waitTime } from "../../event/wait/wait-time";
import { waitUntilWindowPushWithStream } from "../../event/wait/wait-until-window-push-with-stream";
import {
  preloadBattleSceneImages,
  preloadImages,
} from "../../resource/preload-images";
import { updateBattleSceneResources } from "../../resource/update-battle-scene-resources";
import { fadeOut, stop } from "../../sounds/bgm/bgm-operators";
import { GameProps } from "../game-props";
import { NPCBattleRoom } from "../npc/npc-battle-room";
import { MAX_LOADING_TIME } from "../scenes/dom-scenes/dom-scene-binder/max-loading-time";
import { EpisodeTitle } from "../scenes/dom-scenes/episode-title";
import { BattleScene } from "../scenes/td-scenes/battle";
import { Episode } from "../story-mode/episode";
import { bindBattleScene } from "./bind-scene/bind-battle-scene";
import { switchEpisodeTitle } from "./switch-scene/switch-episode-title";

/**
 * エピソードを開始するヘルパー関数
 * @param options オプションオブジェクト
 * @returns 処理が完了したら発火するPromise
 */
export async function startEpisode(options: {
  /** ゲームプロパティ */
  props: GameProps;
  /** エピソード */
  episode: Episode;
  /**
   * リトライした戦闘か否か、trueでリトライした
   * @default false
   */
  isRetry?: boolean;
}): Promise<void> {
  const { props, episode, isRetry = false } = options;
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
  const players: [Player, Player] = [npcBattle.player, npcBattle.enemy];
  props.resources = await updateBattleSceneResources({
    resources: props.resources,
    players,
  });
  const customBattleEvent = episode.event(props.resources);
  await Promise.all([
    preloadBattleSceneImages(props.resources, players),
    preloadImages(props.resources, customBattleEvent.preloadImagePathIds),
  ]);
  const battleScene = new BattleScene({
    ...props,
    isRetry,
    playingBGM: episode.bgm,
    initialAnimationTimeScale: config.battleAnimationTimeScale,
    battleProgress: npcBattle,
    player: npcBattle.player,
    enemy: npcBattle.enemy,
    initialState: npcBattle.stateHistory(),
    customBattleEvent,
    controllerType: "BigButton",
    playerPilotVisibility: "visible",
    canRetry: true,
  });
  bindBattleScene(props, battleScene);
  await waitAnimationFrame();
  const latency = Date.now() - startTutorialStageTime;
  await Promise.race([
    waitTime(3000 - latency),
    waitUntilWindowPushWithStream(props.pushWindow),
  ]);
  await props.fader.fadeOut();
  props.domSceneBinder.dispose();
  await props.fader.fadeIn();
  await battleScene.start();
}
