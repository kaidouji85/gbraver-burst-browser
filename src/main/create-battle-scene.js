// @flow
import type {Resources} from "../resource";
import {DOMEventObserver} from "../observer/dom-event/dom-event-observer";
import * as THREE from "three";
import {BattleScene} from "../scene/battle";
import {ArmDozerIdList, ArmDozers} from "gbraver-burst-core/lib/master/armdozers";

/** 戦闘シーン生成のヘルパー関数 */
export function createBattleScene(resources: Resources, domEventObserver: DOMEventObserver, renderer: THREE.WebGLRenderer): BattleScene {
  // TODO 開発用にダミーデータを作成している
  const players = [
    {
      playerId: 'test01',
      armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
    }, {
      playerId: 'test02',
      armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) || ArmDozers[0]
    }
  ];

  return new BattleScene({
    resources: resources,
    renderer: renderer,
    domEventListener: domEventObserver,
    playerId: 'test01',
    players: players
  });
}