import { Observable, Subject } from "rxjs";

import { Resources } from "../../../resource";
import { GameObjectAction } from "../../action/game-object-action";
import { createInitialValue } from "../model/initial-value";
import { PilotButtonSounds } from "../sounds/pilot-button-sounds";
import { PilotButtonView } from "../view/pilot-button-view";
import { PilotIcon } from "../view/pilot-icon";
import { PilotButtonProps } from "./pilot-button-props";

/** PilotButtonProps生成パラメータ */
export type GeneratePilotButtonPropsParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** パイロットアイコン */
  pilotIcon: PilotIcon;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * PilotButtonPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createPilotButtonProps(
  params: GeneratePilotButtonPropsParams,
): PilotButtonProps {
  const { resources, pilotIcon, gameObjectAction } = params;
  return {
    model: createInitialValue(),
    sounds: new PilotButtonSounds(resources),
    view: new PilotButtonView(resources, pilotIcon, gameObjectAction),
    pushButton: new Subject(),
  };
}
