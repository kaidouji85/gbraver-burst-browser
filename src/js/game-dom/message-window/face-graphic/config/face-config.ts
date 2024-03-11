import { Resources } from "../../../../resource";
import { FaceType } from "./face-type";

/** 顔画像設定 */
export type FaceConfig = {
  /** 顔画像タイプ */
  type: FaceType;
  /** class属性 */
  className: string;
  /** 右向き時のclass属性 */
  rightwardClassName: string;
  /** 非表示時のclass属性 */
  invisibleClassName: string;

  /**
   * 顔画像パス
   * @param resources リソース管理オブジェクト
   * @return 顔画像パス
   */
  src: (resources: Resources) => string;
};
