import { Observable, Subject } from "rxjs";

import { ResourcesContainer } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { GameObjectAction } from "../../action/game-object-action";
import { createInitialValue } from "../model/initial-value";
import { ArmdozerIcon } from "../view/armdozer-icon";
import { BurstButtonView } from "../view/burst-button-view";
import { BurstButtonProps } from "./burst-button-props";

/** BurstButtonProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
    /** アームドーザアイコン */
    armdozerIcon: ArmdozerIcon;
  };

/**
 * BurstButtonPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createBurstButtonProps(
  params: PropsCreatorParams,
): BurstButtonProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    view: new BurstButtonView(params),
    pushButtonSound:
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource(),
    pushButton: new Subject(),
  };
}
