import * as TWEEN from "@tweenjs/tween.js";

import { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { createDeathAlertSounds } from "../sounds/create-death-alert-sounds";
import { DeathAlertView } from "../view/death-alert-view";

/** プロパティ生成オプション */
export type DeathAlertPropsCreatorOptions = SEPlayerContainer &
  ResourcesContainer;

/**
 * プロパティを生成する
 * @param options オプション
 * @returns プロパティ
 */
export const createDeathAlertProps = (
  options: DeathAlertPropsCreatorOptions,
) => {
  const { se } = options;
  const model = createInitialValue();
  const view = new DeathAlertView(options);
  const sounds = createDeathAlertSounds(options.resources);
  return { model, tweenGroup: new TWEEN.Group(), view, sounds, se };
};
