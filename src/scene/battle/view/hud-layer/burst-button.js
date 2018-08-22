// @flow

import {BurstButton} from "../../../../game-object/burst-button/burst-button";
import type {Resources} from "../../../../resource";

/** バーストボタンを生成する */
export function createBurstButton(resources: Resources): BurstButton {
  return new BurstButton({resources: resources});
}