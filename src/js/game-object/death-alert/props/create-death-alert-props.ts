import * as TWEEN from "@tweenjs/tween.js";

import { ResourcesContainer } from "../../../resource";
import { createInitialValue } from "../model/initial-value";
import { DeathAlertView } from "../view/death-alert-view";

/**
 * プロパティを生成する
 * @param options オプション
 * @returns プロパティ
 */
export const createDeathAlertProps = (options: ResourcesContainer) => {
  const view = new DeathAlertView(options);
  const model = createInitialValue();
  return { model, tweenGroup: new TWEEN.Group(), view };
};
