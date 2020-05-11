// @flow

import {DOMScenes} from "../dom-scenes";
import {TDScenes} from "../td-scenes";
import type {Resources} from "../../resource";
import type {NPCBattle} from "../state/npc-battle/npc-battle";
import type {Player} from "gbraver-burst-core";
import type {NPCBattleCourse} from "../state/npc-battle/npc-battle-course";
import {DefaultCourse, NPCBattleCourses} from "../state/npc-battle/npc-battle-course";
import {OfflineBattleRoom} from "../../battle-room/offline-battle-room";
import {waitTime} from "../../wait/wait-time";

/**
 * NPC戦闘のフロー
 *
 * @param resources  リソース管理オブジェクト
 * @param npcBattle NPC戦闘ステート
 * @param domScenes DOMシーン
 * @param tdScenes 3Dシーン
 * @return 処理結果
 */
export async function npcBattleFlow(resources: Resources, npcBattle: NPCBattle, domScenes: DOMScenes, tdScenes: TDScenes, ): Promise<void> {
  try {
    if (!npcBattle.player) {
      return;
    }
    const player: Player = npcBattle.player;

    const course: NPCBattleCourse = NPCBattleCourses.find(v =>
      v.armdozerId === player.armdozer.id
      && v.level === npcBattle.level
    ) ?? DefaultCourse;
    const npc = course.npc();
    domScenes.showMatchCard(
      player.armdozer.id,
      npc.armdozer.id,
      course.stageName,
    );
    const room = new OfflineBattleRoom(player, npc);
    const initialState = await room.start();
    await waitTime(1000);

    tdScenes.startBattle(resources, room, initialState);
    domScenes.hidden();
  } catch(e) {
    throw e;
  }
}