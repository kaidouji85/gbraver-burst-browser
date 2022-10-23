// @flow
import type { Battle as BattleSDK } from "@gbraver-burst-network/browser-core";

import { fadeOut, stop } from "../../bgm/bgm-operators";
import { DifficultyDialog } from "../../dom-dialogs/difficulty/difficulty-dialog";
import { MatchingDialog } from "../../dom-dialogs/matching/matching-dialog";
import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { WaitingDialog } from "../../dom-dialogs/waiting/waiting-dialog";
import { MatchCard } from "../../dom-scenes/match-card";
import { SOUND_IDS } from "../../resource/sound";
import { BattleScene } from "../../td-scenes/battle";
import type { BattleProgress } from "../../td-scenes/battle/battle-progress";
import { waitAnimationFrame } from "../../wait/wait-animation-frame";
import { waitTime } from "../../wait/wait-time";
import { difficultyDialogConnector } from "../dom-dialog-binder/action-connector/difficulty-dialog-connector";
import { matchingDialogConnector } from "../dom-dialog-binder/action-connector/matching-dialog-connector";
import { networkErrorDialogConnector } from "../dom-dialog-binder/action-connector/network-error-dialog-connector";
import { waitingDialogConnector } from "../dom-dialog-binder/action-connector/waiting-dialog-connector";
import { matchCardConnector } from "../dom-scene-binder/action-connector/match-card-connector";
import { MAX_LOADING_TIME } from "../dom-scene-binder/max-loading-time";
import type { SelectionComplete } from "../game-actions";
import type { GameProps } from "../game-props";
import type { CasualMatch } from "../in-progress/casual-match";
import type { NPCBattle } from "../in-progress/npc-battle";
import { battleSceneConnector } from "../td-scene-binder/action-connector/battle-scene-connector";

/**
 * プレイヤーキャラクター 選択完了時の処理
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onSelectionComplete(
  props: GameProps,
  action: SelectionComplete
): Promise<void> {
  const courseDifficultySelect = async (
    npcBattle: NPCBattle
  ): Promise<void> => {
    props.inProgress = {
      ...npcBattle,
      subFlow: {
        type: "DifficultySelect",
        armdozerId: action.armdozerId,
        pilotId: action.pilotId,
      },
    };
    const dialog = new DifficultyDialog(props.resources);
    props.domDialogs.bind(dialog, difficultyDialogConnector);
  };
  const waitUntilMatching = async (): Promise<BattleSDK> => {
    try {
      await props.api.disconnectWebsocket();
      return await props.api.startCasualMatch(
        action.armdozerId,
        action.pilotId
      );
    } catch (e) {
      const dialog = new NetworkErrorDialog(props.resources, {
        type: "GotoTitle",
      });
      props.domDialogs.bind(dialog, networkErrorDialogConnector);
      throw e;
    }
  };
  const createBattleProgress = (battle: BattleSDK): BattleProgress => ({
    progress: async (v) => {
      try {
        const dialog = new WaitingDialog("通信中......");
        props.domDialogs.bind(dialog, waitingDialogConnector);
        const update = await battle.progress(v);
        props.domDialogs.hidden();
        return update;
      } catch (e) {
        const dialog = new NetworkErrorDialog(props.resources, {
          type: "GotoTitle",
        });
        props.domDialogs.bind(dialog, networkErrorDialogConnector);
        throw e;
      }
    },
  });
  const startMatching = async (origin: CasualMatch): Promise<void> => {
    const dialog = new MatchingDialog(props.resources);
    props.domDialogs.bind(dialog, matchingDialogConnector);
    const battle = await waitUntilMatching();
    props.suddenlyBattleEnd.bind(battle);
    props.inProgress = { ...origin, subFlow: { type: "Battle" } };

    await props.fader.fadeOut();
    props.domDialogs.hidden();
    const scene = new MatchCard({
      resources: props.resources,
      player: battle.player.armdozer.id,
      enemy: battle.enemy.armdozer.id,
      caption: "CASUAL MATCH",
    });
    props.domSceneBinder.bind(scene, matchCardConnector);
    await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
    await props.fader.fadeIn();

    const battleProgress = createBattleProgress(battle);
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
  };

  if (props.inProgress.type === "NPCBattle") {
    await courseDifficultySelect(props.inProgress);
  } else if (props.inProgress.type === "CasualMatch") {
    await startMatching(props.inProgress);
  }
}
