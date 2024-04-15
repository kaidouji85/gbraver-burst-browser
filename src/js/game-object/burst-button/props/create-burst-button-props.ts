import { Observable, Subject } from "rxjs";

import { Resources } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayer } from "../../../se/se-player";
import { GameObjectAction } from "../../action/game-object-action";
import { createInitialValue } from "../model/initial-value";
import { ArmdozerIcon } from "../view/armdozer-icon";
import { BurstButtonView } from "../view/burst-button-view";
import { BurstButtonProps } from "./burst-button-props";

/** BurstButtonProps生成パラメータ */
export type PropsCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
  /** アームドーザアイコン */
  armdozerIcon: ArmdozerIcon;
};

/**
 * BurstButtonPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
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
