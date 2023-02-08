import type { Battle as BattleSDK } from "@gbraver-burst-network/browser-core";

import { fadeOut, stop } from "../../bgm/bgm-operators";
import { MatchingDialog } from "../../dom-dialogs/matching/matching-dialog";
import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { WaitingDialog } from "../../dom-dialogs/waiting/waiting-dialog";
import { MatchCard } from "../../dom-scenes/match-card";
import { SOUND_IDS } from "../../resource/sound";
import { BattleScene } from "../../td-scenes/battle";
import { BattleProgress } from "../../td-scenes/battle/battle-progress";
import { waitAnimationFrame } from "../../wait/wait-animation-frame";
import { waitTime } from "../../wait/wait-time";
import { battleSceneConnector } from "../action-connector/battle-scene-connector";
import { matchCardConnector } from "../action-connector/match-card-connector";
import { matchingDialogConnector } from "../action-connector/matching-dialog-connector";
import { networkErrorDialogConnector } from "../action-connector/network-error-dialog-connector";
import { waitingDialogConnector } from "../action-connector/waiting-dialog-connector";
import { MAX_LOADING_TIME } from "../dom-scene-binder/max-loading-time";
import { SelectionComplete } from "../game-actions";
import { GameProps } from "../game-props";

/**
 * マッチングするまで待機するヘルパー関数
 * @param props ゲームプロパティ
 * @param action アクション
 * @return バトルSDK
 */
async function waitUntilMatching(
  props: Readonly<GameProps>,
  action: SelectionComplete
): Promise<BattleSDK> {
  try {
    await props.api.disconnectWebsocket();
    return await props.api.startCasualMatch(action.armdozerId, action.pilotId);
  } catch (e) {
    const dialog = new NetworkErrorDialog(props.resources, {
      type: "GotoTitle",
    });
    props.domDialogBinder.bind(dialog, networkErrorDialogConnector);
    throw e;
  }
}

/**
 * BattleProgressを生成するヘルパー関数
 * @param props ゲームプロパティ
 * @param battle バトルSDK
 * @return 生成結果
 */
function createBattleProgress(
  props: Readonly<GameProps>,
  battle: BattleSDK
): BattleProgress {
  return {
    progress: async (v) => {
      try {
        const dialog = new WaitingDialog("通信中......");
        props.domDialogBinder.bind(dialog, waitingDialogConnector);
        const update = await battle.progress(v);
        props.domDialogBinder.hidden();
        return update;
      } catch (e) {
        const dialog = new NetworkErrorDialog(props.resources, {
          type: "GotoTitle",
        });
        props.domDialogBinder.bind(dialog, networkErrorDialogConnector);
        throw e;
      }
    },
  };
}

/**
 * カジュアルマッチを開始して戦闘画面まで遷移するヘルパー関数
 * @param props ゲームプロパティ
 * @param action アクション
 */
export async function startCasualMatch(
  props: Readonly<GameProps>,
  action: SelectionComplete
): Promise<void> {
  const dialog = new MatchingDialog(props.resources);
  props.domDialogBinder.bind(dialog, matchingDialogConnector);
  const battle = await waitUntilMatching(props, action);
  props.suddenlyBattleEnd.bind(battle);
  await props.fader.fadeOut();
  props.domDialogBinder.hidden();
  const scene = new MatchCard({
    resources: props.resources,
    player: battle.player.armdozer.id,
    enemy: battle.enemy.armdozer.id,
    caption: "CASUAL MATCH",
  });
  props.domSceneBinder.bind(scene, matchCardConnector);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  await props.fader.fadeIn();
  const battleProgress = createBattleProgress(props, battle);
  const config = await props.config.load();
  props.renderer.setPixelRatio(config.webGLPixelRatio);
  const battleScene = new BattleScene({
    resources: props.resources,
    bgm: props.bgm,
    playingBGM: SOUND_IDS.BATTLE_BGM_01,
    initialAnimationTimeScale: config.battleAnimationTimeScale,
    battleProgress,
    player: battle.player,
    enemy: battle.enemy,
    initialState: battle.initialState,
    resize: props.resize,
    pushWindow: props.pushWindow,
    gameLoop: props.gameLoop,
    renderer: props.renderer,
  });
  props.tdBinder.bind(battleScene, battleSceneConnector);
  await waitAnimationFrame();
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
