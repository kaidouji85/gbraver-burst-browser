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
import {NeoLandozerNpc} from "./npc/neo-landozer-npc";
import {OfflineBattleRoom} from "./battle-room/offline-battle-room";
import {BattleScene} from "./scene/battle";
import {Renderer} from "./game-object/renderer";
import {hiddenLoading} from "./loading/loading";

async function main() {
  try {
    loadServiceWorker();
    viewPerformanceStatics(document.body);

    const resources = await loadAllResource(`${GBRAVER_BURST_RESOURCE_HASH}/`);
    hiddenLoading();

    const threeJsRender = createRender();
    if (threeJsRender.domElement && document.body) {
      document.body.appendChild(threeJsRender.domElement);
    }
    const gameLoopListener = createGameLoopListener();
    const domEventListener = createDOMEventListener(threeJsRender.domElement);
    const renderer = new Renderer({
      renderer: threeJsRender,
      listener: {
        domEvent: domEventListener
      }
    });

    // TODO 開発用にダミーデータを作成している
    const player: Player = {
      playerId: 'test01',
      armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
    };
    const npc: NPC = NeoLandozerNpc;
    const battleRoom = new OfflineBattleRoom(player, npc);
    const initialState = await battleRoom.start();
    const scene = new BattleScene({
      resources: resources,
      rendererDOM: threeJsRender.domElement,
      battleRoom: battleRoom,
      initialState: initialState,
      listener: {
        domEvent: domEventListener,
        gameLoop: gameLoopListener,
      },
      notifier: {
        render: renderer.getRenderNotifier()
      }
    });
  } catch (e) {
    console.error(e.stack);
  }
}

window.onload = main;