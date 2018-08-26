// @flow
import type {Resources} from "../resource";
import {DOMEventObserver} from "../deperecated-observer/dom-event/dom-event-observer";
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
import type {DOMEvent} from "../action/dom-event";

/** パラメータ */
type Param = {
  resources: Resources,
  gameLoopListener: Observable<GameLoop>,
  domEventListener: Observable<DOMEvent>,
  depretartedDomEventObserver: DOMEventObserver, // TODO 削除する
  renderer: THREE.WebGLRenderer
};

/** 戦闘シーン生成のヘルパー関数 */
export function createBattleScene(param: Param): BattleScene {
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
    resources: param.resources,
    renderer: param.renderer,
    playerId: player.playerId,
    players: [player, enemy],
    initialState: initialState,
    progressBattle: async (command: Command) => {
      return battleRoom.progress(command);
    },
    depricatedDomListener: param.depretartedDomEventObserver,
    domEventListener: param.domEventListener,
    gameLoopListener: param.gameLoopListener,
  });
}