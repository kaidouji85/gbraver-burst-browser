// @flow
import type {Resources} from "../resource";
import {DOMEventObserver} from "../observer/dom-event/dom-event-observer";
import * as THREE from "three";
import {BattleScene} from "../scene/battle";
import {ArmDozerIdList, ArmDozers} from "gbraver-burst-core/lib/master/armdozers";
import type {Player} from "gbraver-burst-core/lib/player/player";
import type {NPC} from "../npc/npc";
import {NeoLandozer} from "../npc/neo-landozer";
import {OfflineBattleRoom} from "../battle-room/offline-battle-room";
import type {Command} from "gbraver-burst-core/lib/command/command";
import {Observable} from "rxjs";
import type {GameLoop} from "../action/game-loop/game-loop";

/** 戦闘シーン生成のヘルパー関数 */
export function createBattleScene(resources: Resources, listener: Observable<GameLoop>, domEventObserver: DOMEventObserver, renderer: THREE.WebGLRenderer): BattleScene {
  // TODO 開発用にダミーデータを作成している
  const player: Player = {
    playerId: 'test01',
    armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
  };
  const npc: NPC = NeoLandozer;
  const enemy: Player = {
    playerId: 'test02',
    armdozer: npc.armdozer
  };
  const battleRoom = new OfflineBattleRoom(player, enemy, npc.routine);
  const initialState = battleRoom.start();

  return new BattleScene({
    resources: resources,
    renderer: renderer,
    domEventListener: domEventObserver,
    playerId: player.playerId,
    players: [player, enemy],
    initialState: initialState,
    progressBattle: async (command: Command) => {
      return battleRoom.progress(command);
    },
    listener: listener
  });
}