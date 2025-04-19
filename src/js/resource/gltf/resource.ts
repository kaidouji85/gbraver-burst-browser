import * as THREE from "three";

import { ResourceType } from "../resource-type";

/** glTFリソースID */
export type GlTFId = string;

/** glTFリソース設定 */
export type GlTFConfig = ResourceType & {
  /** ID */
  id: GlTFId;
  /** glTFファイルのパス */
  path: string;
};

/** glTFリソース */
export type GlTFResource = ResourceType & {
  /** ID */
  id: GlTFId;
  /** glTFモデル */
  object: THREE.Group;
};
