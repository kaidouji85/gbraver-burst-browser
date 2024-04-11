import { NeoLandozerModel } from "../model/neo-landozer-model";
import { NeoLandozerSounds } from "../sounds/neo-landozer-sounds";
import { NeoLandozerView } from "../view/neo-landozer-view";

/** ネオランドーザ プロパティ */
export type NeoLandozerProps = {
  /** モデル */
  model: NeoLandozerModel;
  /** ビュー */
  view: NeoLandozerView;
  /** サウンド */
  sounds: NeoLandozerSounds;
};
