// @flow

import {Shinya} from "./shinya";
import type {Resources} from "../../../resource";
import {PlayerShinyaView} from "./view/player-shinya-view";

export function playerShinya(resources: Resources): Shinya {
  const view = new PlayerShinyaView(resources);
  return new Shinya(view);
}