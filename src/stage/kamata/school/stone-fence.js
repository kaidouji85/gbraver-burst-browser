// @flow
import type {Resources} from '../../../common/resource-manager';
import ThreeLib from 'three-js';
import {TEXTURE_PATHS} from '../../../common/resource-manager';
import R from 'ramda';

const THREE = ThreeLib();
const BASIC_WIDTH = 275;
const BASIC_HEIGHT = 30;

/**
 * 学校の石垣
 *
 * @param resources リソース管理クラス
 * @return 学校の石垣
 */
export default function stoneFence(resources: Resources): THREE.Mesh[] {
  const basic = (x:number, z:number): THREE.Mesh => {
    let geometry = new THREE.BoxGeometry(BASIC_WIDTH, BASIC_HEIGHT, 20);
    let texture = resources.textures.find(item => item.path === TEXTURE_PATHS.BUILD_BASIC) || {};
    let material = new THREE.MeshBasicMaterial({
      color: 0x696969,
      map: texture.texture
    });
    let mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(x, BASIC_HEIGHT / 2, z);
    return mesh;
  };

  const basicX = 50 + BASIC_WIDTH / 2;

  const left = R.times(R.identity, 2).map(i => basic(basicX + BASIC_WIDTH * i, 600));
  const right = R.times(R.identity, 2).map(i => basic(-basicX -BASIC_WIDTH * i, 600));
  return left.concat(right);
}