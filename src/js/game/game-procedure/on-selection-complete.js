// @flow
import type {Battle as BattleSDK} from "@gbraver-burst-network/browser-core";
import {fadeOut, stop} from "../../bgm/bgm-operators";
import {SOUND_IDS} from "../../resource/sound";
import {waitAnimationFrame} from "../../wait/wait-animation-frame";
import type {SelectionComplete} from "../game-actions";
import type {GameProps} from "../game-props";
import type {CasualMatch} from "../in-progress/casual-match";
import type {NPCBattle} from "../in-progress/npc-battle";
import {BattleScene} from "../../td-scenes/battle";
import {battleSceneConnector} from "../td-scenes/battle-scene-connector";
import type {BattleProgress} from "../../td-scenes/battle/battle-progress";

/**
 * プレイヤーキャラクター 選択完了時の処理
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onSelectionComplete(props: GameProps,  action: SelectionComplete): Promise<void> {
  const courseDifficultySelect = async (npcBattle: NPCBattle): Promise<void> => {
    props.inProgress = {...npcBattle, subFlow: {type: 'DifficultySelect', armdozerId: action.armdozerId, pilotId: action.pilotId}};
    props.domDialogs.startDifficulty(props.resources);
  };
  const waitUntilMatching = async (): Promise<BattleSDK> => {
    try {
      await props.api.disconnectWebsocket();
      return await props.api.startCasualMatch(action.armdozerId, action.pilotId);
    } catch(e) {
      props.domDialogs.startNetworkError(props.resources, {type: 'GotoTitle'});
      throw e;
    }
  };
  const createBattleProgress = (battle: BattleSDK): BattleProgress => ({
    progress: async (v) =>  {
      try {
        props.domDialogs.startWaiting('通信中......');
        const update = await battle.progress(v);
        props.domDialogs.hidden();
        return update;
      } catch(e) {
        props.domDialogs.startNetworkError(props.resources, {type: 'GotoTitle'});
        throw e;
      }
    }
  });
  const startMatching = async (origin: CasualMatch): Promise<void> => {
    props.domDialogs.startMatching(props.resources);
    const battle = await waitUntilMatching();
    props.suddenlyBattleEnd.bind(battle);
    props.inProgress = {...origin, subFlow: {type: 'Battle'}};

    await props.fader.fadeOut();
    props.domDialogs.hidden();
    await props.domScenes.startMatchCard(props.resources, battle.player.armdozer.id, battle.enemy.armdozer.id, 'CASUAL MATCH');
    await props.fader.fadeIn();

    const battleProgress = createBattleProgress(battle);
    const config = await props.config.load();
    props.renderer.setPixelRatio(config.webGLPixelRatio);
    const battleScene = new BattleScene({resources: props.resources, bgm: props.bgm,
      playingBGM: SOUND_IDS.BATTLE_BGM_01, initialAnimationTimeScale: config.battleAnimationTimeScale,
      battleProgress, player: battle.player, enemy: battle.enemy, initialState: battle.initialState,
      resize: props.resize, pushWindow: props.pushWindow, gameLoop: props.gameLoop, renderer: props.renderer
    });
    props.tdBinder.bind(battleScene, battleSceneConnector);
    await waitAnimationFrame();
    await Promise.all([(async () => {
      await props.fader.fadeOut();
      props.domScenes.hidden();
    })(), (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })()]);
    await props.fader.fadeIn();
    await battleScene.start();
  };

  if (props.inProgress.type === 'NPCBattle') {
  await courseDifficultySelect(props.inProgress);
} else if (props.inProgress.type === 'CasualMatch') {
  await startMatching(props.inProgress);
}
}