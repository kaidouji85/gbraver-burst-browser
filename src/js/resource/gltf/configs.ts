import { GLTF_IDS } from "./ids";
import { GlTFConfig } from "./resource";

/** 設定集 */
export const GLTF_CONFIGS: GlTFConfig[] = [
  {
    id: GLTF_IDS.SHOPPING_STREET,
    path: "model/shopping-street/shopping-street.glb",
  },
].map((g) => ({ ...g, type: "Shared" }));
