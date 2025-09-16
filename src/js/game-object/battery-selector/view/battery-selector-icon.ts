import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";

/** バッテリーセレクタのアイコン */
export type BatterySelectorIcon = {
  /** メッシュ */
  mesh: HorizontalAnimationMesh;
  /** アイコ位置（ローカル座標） */
  position: {
    /** x座標 */
    x: number;
    /** y座標 */
    y: number;
  };
};
