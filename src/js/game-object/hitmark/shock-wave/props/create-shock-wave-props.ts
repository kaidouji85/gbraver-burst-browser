import { Resources } from "../../../../resource";
import { createEmptySoundResource } from "../../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";
import { ShockWaveModel } from "../model/shock-wave-model";
import { ShockWaveView } from "../view/shock-wave-view";
import { ShockWaveProps } from "./shock-wave-props";
import { SEPlayer } from "../../../../se/se-player";

/** ShockWaveProps生成パラメータ */
export type GenerateShockWavePropsParams = {
  /** ビュー */
  view: ShockWaveView;
  /** 初期モデル */
  initialModel: ShockWaveModel;
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
};

/**
 * ShockWavePropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createShockWaveProps(
  params: GenerateShockWavePropsParams,
): ShockWaveProps {
  const { initialModel, resources } = params;
  return {
    ...params,
    model: initialModel,
    hitSound:
      resources.sounds.find((v) => v.id === SOUND_IDS.MECHA_IMPACT) ??
      createEmptySoundResource(),
  };
}
