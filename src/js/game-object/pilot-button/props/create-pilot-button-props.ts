import { Observable, Subject } from "rxjs";

import { Resources } from "../../../resource";
import { SEPlayer } from "../../../se/se-player";
import { GameObjectAction } from "../../action/game-object-action";
import { createInitialValue } from "../model/initial-value";
import { PilotButtonSounds } from "../sounds/pilot-button-sounds";
import { PilotButtonView } from "../view/pilot-button-view";
import { PilotIcon } from "../view/pilot-icon";
import { PilotButtonProps } from "./pilot-button-props";

/** PilotButtonProps生成パラメータ */
export type PropsCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
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
  params: PropsCreatorParams,
): PilotButtonProps {
  const { resources, pilotIcon, gameObjectAction } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new PilotButtonSounds(resources),
    view: new PilotButtonView(resources, pilotIcon, gameObjectAction),
    pushButton: new Subject(),
  };
}
