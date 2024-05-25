import { Observable } from "rxjs";

import { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import { GameObjectAction } from "../../action/game-object-action";
import { createInitialValue } from "../model/initial-value";
import { PilotButtonSounds } from "../sounds/pilot-button-sounds";
import { PilotButtonView } from "../view/pilot-button-view";
import { PilotIcon } from "../view/pilot-icon";
import { PilotButtonProps } from "./pilot-button-props";

/** PilotButtonProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** パイロットアイコン */
    pilotIcon: PilotIcon;
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/**
 * PilotButtonPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createPilotButtonProps(
  params: PropsCreatorParams,
): PilotButtonProps {
  const { resources, pilotIcon, gameObjectAction } = params;
  return {
    ...params,
    disabled: false,
    model: createInitialValue(),
    sounds: new PilotButtonSounds(resources),
    view: new PilotButtonView(resources, pilotIcon, gameObjectAction),
  };
}
