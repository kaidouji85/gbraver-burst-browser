import { SEPlayerContainer } from "../../../../se/se-player";
import { NeoLandozerModel } from "../model/neo-landozer-model";
import { NeoLandozerSounds } from "../sounds/neo-landozer-sounds";

/** ネオランドーザ アニメーション プロパティ */
export type NeoLandozerAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: NeoLandozerModel;
  /** サウンド */
  sounds: NeoLandozerSounds;
};
