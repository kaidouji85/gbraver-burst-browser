// @flow
import {loadServiceWorker} from "./service-worker/load-service-worker";
import {viewPerformanceStatics} from "./stats/view-performance-statics";
import {loadAllResource} from "./resource";
import {createRender} from "./render/create-render";
import {createGameLoopListener} from "./action/game-loop/create-listener";
import {createDOMEventListener} from "./action/dom-event/create-listener";
import type {Player} from "gbraver-burst-core/lib/player/player";
import {ArmDozerIdList, ArmDozers} from "gbraver-burst-core/lib/master/armdozers";
import type {NPC} from "./npc/npc";
import {NeoLandozerNPC} from "./npc/neo-landozer-n-p-c";
import {OfflineBattleRoom} from "./battle-room/offline-battle-room";
import {BattleScene} from "./scene/battle";
import Tween from "@tweenjs/tween.js";

async function main() {
  loadServiceWorker();
  viewPerformanceStatics(document.body);

  const resources = await loadAllResource('');

  const renderer = createRender();
  if (renderer.domElement && document.body) {
    document.body.appendChild(renderer.domElement);
  }

  const gameLoopListener = createGameLoopListener();
  const domEventListener = createDOMEventListener(renderer.domElement);

  // TODO 開発用にダミーデータを作成している
  const player: Player = {
    playerId: 'test01',
    armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
  };
  const npc: NPC = NeoLandozerNPC;
  const battleRoom = new OfflineBattleRoom(player, npc);
  const initialState = await battleRoom.start();
  const scene = new BattleScene({
    resources: resources,
    renderer: renderer,
    battleRoom: battleRoom,
    initialState: initialState,
    listener: {
      domEvent: domEventListener,
      gameLoop: gameLoopListener,
    }
  });

  gameLoopListener.subscribe(time => {
    Tween.update(time);
  });
}

window.onload = main;