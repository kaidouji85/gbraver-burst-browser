// @flow

import {ArmDozerIdList, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import {fadeOut, stop} from "../../bgm/bgm-operators";
import {NPCBattleRoom} from "../../npc/npc-battle-room";
import {oneBatteryNeoLandozerNPC} from "../../npc/one-battery";
import {SOUND_IDS} from "../../resource/sound";
import {playerUuid} from "../../uuid/player";
import type {GameProps} from "../game-props";
import {reflectSoundVolume} from "../reflect-sound-volume";
import {fullResourceLoading} from "./full-resource-loading";

/**
 * チュートリアル開始時の処理
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onTutorialStart(props: GameProps): Promise<void> {
  if (!props.isFullResourceLoaded) {
    await fullResourceLoading(props);
    const config = await props.config.load();
    reflectSoundVolume(props.resources, config);
  }

  await props.fader.fadeOut();
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) ?? ArmDozers[0];;
  const pilot = Pilots.find(v => v.id === PilotIds.SHINYA)  ?? Pilots[0];
  const player = {playerId: playerUuid(), armdozer, pilot};
  const npcBattle = new NPCBattleRoom(player, oneBatteryNeoLandozerNPC());
  const progress = v => Promise.resolve(npcBattle.progress(v));
  const config = await props.config.load();
  const battleScene = props.tdScenes.startBattle(props.resources, props.bgm, SOUND_IDS.BATTLE_BGM_01, config.webGLPixelRatio,
    config.battleAnimationTimeScale ,{progress}, npcBattle.player, npcBattle.enemy, npcBattle.stateHistory());
  props.domScenes.hidden();
  await props.bgm.do(fadeOut);
  await props.bgm.do(stop);
  await props.fader.fadeIn();
  await battleScene.start();
}