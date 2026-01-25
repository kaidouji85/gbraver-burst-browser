import * as THREE from "three";

/**
 * テクスチャ画像をアウトライン表示するためのシェーダー
 * @param shader シェーダーパラメータ
 */
export const outlineShader = (
  shader: THREE.WebGLProgramParametersWithUniforms,
) => {
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <map_fragment>",
    [
      "#ifdef USE_MAP",
      "  vec4 texelColor = texture2D( map, vMapUv );",
      "  diffuseColor.a *= texelColor.a;",
      "#endif",
    ].join("\n"),
  );
};
