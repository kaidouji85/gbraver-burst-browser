// @flow

import {Observer} from "../base/observer";
import type {BattleSceneAction} from "../../action/battle-scene";

/** 戦闘シーン関連のオブザーバ */
export class BattleSceneObserver extends Observer<BattleSceneAction> {
  constructor() {
    super();
  }
}