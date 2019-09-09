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
import {addEventToLoadingManager} from "./loading/loading-dom";
import {Subject} from "rxjs";
import type {EndBattle} from "./action/game/end-battle";
import {Game} from "./game";

/**
 * Gブレイバーバーストのエントリポイント
 */
async function main(): Promise<void> {
  try {
    addEventToLoadingManager();
    loadServiceWorker();
    viewPerformanceStatics(document.body);
    const resources = await loadAllResource(`${GBRAVER_BURST_RESOURCE_HASH}/`);
    new Game(resources);
  } catch (e) {
    console.error(e.stack);
  }
}

window.onload = main;