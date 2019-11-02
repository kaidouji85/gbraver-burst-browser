// @flow

import {Observable, Subject} from "rxjs";
import type {ServiceWorkerAction} from "../action/service-worker/service-worker";
import type {LoadingAction} from "../action/loading/loading";
import {createLoadingActionListener} from "../action/loading/create-listener";
import * as THREE from "three";
import type {StartBattle} from "../action/game/start-battle";

/** Gameが使用するストリーム */
export class GameStream {
  serviceWorker: Subject<ServiceWorkerAction>;
  loading: Observable<LoadingAction>;
  startBattle: Subject<StartBattle>;

  constructor() {
    this.serviceWorker = new Subject();
    this.loading = createLoadingActionListener(THREE.DefaultLoadingManager);
    this.startBattle = new Subject();
  }
}