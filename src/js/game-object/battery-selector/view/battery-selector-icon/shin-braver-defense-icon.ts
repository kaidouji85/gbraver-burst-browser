import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { Resources } from "../../../../resource";
import { findTextureOrThrow } from "../../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { BatterySelectorIcon } from "./battery-selector-icon";

/**
 * シンブレイバー防御アイコンを生成する
 * @param options オプション
 * @returns 生成結果
 */
export const shinBraverDefenseIcon = (
  resources: Resources,
): BatterySelectorIcon => {
  const texture = findTextureOrThrow(
    resources,
    TEXTURE_IDS.SHIN_BRAVER_GUARD,
  ).texture;
  const mesh = new HorizontalAnimationMesh({
    texture,
    maxAnimation: 4,
    width: 600,
    height: 600,
  });
  const position = { x: 0, y: 100 };
  mesh.animate(1);

  return {
    destructor: () => {
      mesh.destructor();
    },
    getObject3D: () => mesh.getObject3D(),
    opacity: (value: number) => {
      mesh.opacity(value);
    },
    position,
  };
};
