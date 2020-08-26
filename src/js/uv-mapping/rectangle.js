// @flow
import * as THREE from 'three';

/**
 * 平面オブジェクトに矩型ＵＶマッピングの設定をする
 * 本関数にはparam.geoの平面オブジェクトのUVマッピング情報を直接変更する副作用がある
 * なお、各種UV座標の単位は、画像全体の縦、横に対するパーセント指定で行う。
 * 数字的には0～1の間をとるようにする。
 * また、一般的な座標タイプと異なり、three.jsでは画像ファイルの左下を原点として扱っている。
 *
 * @param param 各種パラメータ
 * @return UVマッピングを設定した平面オブジェクト
 */
export function rectangle(param: {
  // 平面オブジェクト
  geo: typeof THREE.PlaneGeometry,
  // 基準点
  pos: typeof THREE.Vector2,
  // 幅
  width: number,
  // 高さ
  height: number,
}) {
  param.geo.faceVertexUvs[0][0] = [
    new THREE.Vector2(param.pos.x, param.pos.y + param.height),
    param.pos,
    new THREE.Vector2(param.pos.x + param.width, param.pos.y + param.height)
  ];
  param.geo.faceVertexUvs[0][1] = [
    param.pos,
    new THREE.Vector2(param.pos.x + param.width, param.pos.y),
    new THREE.Vector2(param.pos.x + param.width, param.pos.y + param.height)
  ];

  return param.geo;
}