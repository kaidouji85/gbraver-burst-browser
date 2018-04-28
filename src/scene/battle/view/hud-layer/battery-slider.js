// @flow

import type {Resources} from "../../../../resource";
import type {BattleSceneState} from "../../state";
import {DepricatedObserver} from "../../../depricated-observer";
import {BatterySlider} from "../../../../game-object/slider/battery-slider";
import {BattleSceneObserver} from "../../../../observer/battle-scene/battle-scene-observer";

/** バッテリースライダーを生成する */
export function createBatterySlider(resources: Resources, state: BattleSceneState, observer: BattleSceneObserver): BatterySlider {
  return new BatterySlider({
    resources,
    onBatteryChange: (battery: number) => {
      // TODO オブザーバに通知する
      console.log(`change battery ${battery}`);
    }
  });
}