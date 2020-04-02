// @flow

import {PlayerLightningView} from "./player-lightning-view";
import type {Resources} from "../../../../resource";
import type {LightningModel} from "../model/lightning-model";

export class EnemyLightningView extends PlayerLightningView {
  constructor(resources: Resources) {
    super(resources);
  }

  engage(model: LightningModel): void {
    super.engage(model);
    const object3D = this.getObject3D();
    object3D.position.x *= -1;
    object3D.scale.x *= -1;
  }
}