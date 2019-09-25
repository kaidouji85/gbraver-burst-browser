// @flow
import type {Resources} from '../../../resource';
import * as THREE from 'three';
import {CUBE_TEXTURE_IDS} from "../../../resource/cube-texture";

const WIDTH = 9000;
const HEIGHT = 9000;
const DEPTH = 9000;

/**
 * 青空スカイボックス
 *
 * @param resources リソース管理クラス
 * @return 青空スカイボックス
 */
export default function BlueSky(resources: Resources): THREE.Mesh {
  const textureResource = resources.cubeTextures.find(v => v.id === CUBE_TEXTURE_IDS.BlueSky);
  const texture: THREE.CubeTexture = textureResource
    ? textureResource.texture
    : new THREE.CubeTexture();
  const cubeShader = THREE.ShaderLib["cube"];
  const cubeMaterial = new THREE.ShaderMaterial({
    fragmentShader: cubeShader.fragmentShader,
    vertexShader: cubeShader.vertexShader,
    uniforms: cubeShader.uniforms,
    depthWrite: false,
    side: THREE.BackSide,
  });
  cubeMaterial.uniforms["tCube"].value = texture;
  const geometry = new THREE.CubeGeometry(WIDTH, HEIGHT, DEPTH, 32, 32, 32);
  return new THREE.Mesh(geometry, cubeMaterial);
}