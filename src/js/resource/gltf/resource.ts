import * as THREE from "three";

/** glTFリソースID */
export type GlTFId = string;

/** glTFリソース設定 */
export type GlTFConfig = {
  /** ID */
  id: GlTFId;
  /** glTFファイルのパス */
  path: string;
};

/** glTFリソース */
export type GlTFResource = {
  /** ID */
  id: GlTFId;
  /** glTFモデル */
  object: THREE.Group;
};
