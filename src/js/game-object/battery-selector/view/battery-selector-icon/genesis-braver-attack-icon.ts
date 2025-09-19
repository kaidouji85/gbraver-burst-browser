import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { Resources } from "../../../../resource";
import { findTextureOrThrow } from "../../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { createOutlineSilhouetteTexture } from "../../../../texture/create-outline-silhouette-texture";
import { BatterySelectorIcon } from "./battery-selector-icon";

/** メッシュのサイズ */
const MESH_SIZE = 540;

/** アウトラインメッシュのサイズ */
const OUTLINE_SIZE = MESH_SIZE + 60;

/**
 * ジェネシスブレイバー攻撃アイコンを生成する
 * @param options オプション
 * @returns 生成結果
 */
export const genesisBraverAttackIcon = (
  resources: Resources,
): BatterySelectorIcon => {
  const group = new THREE.Group();

  const texture = findTextureOrThrow(
    resources,
    TEXTURE_IDS.GENESIS_BRAVER_SP_ATTACK,
  ).texture;
  const mesh = new HorizontalAnimationMesh({
    texture,
    maxAnimation: 4,
    width: MESH_SIZE,
    height: MESH_SIZE,
  });
  const colorStrength = 0.8;
  mesh.color(colorStrength, colorStrength, colorStrength);
  mesh.animate(1);
  group.add(mesh.getObject3D());

  const outlineTexture = createOutlineSilhouetteTexture({
    texture,
    color: { r: 255, g: 0, b: 128 },
  });
  const outlineMesh = new HorizontalAnimationMesh({
    texture: outlineTexture,
    maxAnimation: 4,
    width: OUTLINE_SIZE,
    height: OUTLINE_SIZE,
  });
  outlineMesh.animate(1);
  outlineMesh.getObject3D().position.set(10, 0, -0.01);
  group.add(outlineMesh.getObject3D());

  return {
    destructor: () => {
      mesh.destructor();
      outlineMesh.destructor();
    },
    getObject3D: () => group,
    opacity: (value: number) => {
      mesh.opacity(value);
      outlineMesh.opacity(value);
    },
    position: { x: 40, y: 90 },
  };
};
