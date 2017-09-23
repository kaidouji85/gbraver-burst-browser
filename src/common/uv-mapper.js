// @flow
import * as THREE from 'three';

/**
 * 平面オブジェクトにＵＶマッピングの設定をする
 * 本関数にはparam.geoの平面オブジェクトのUVマッピング情報を直接変更する副作用がある
 * なお、各種UV座標の単位は、画像全体の縦、横に対するパーセント指定で行う。
 * 数字的には0～1の間をとるようにする。
 * また、一般的な座標タイプと異なり、three.jsでは画像ファイルの左下を原点として扱っている。
 *
 * @param param 各種パラメータ
 * @return UVマッピングを設定した平面オブジェクト
 */
export function setUvMapping(param: {
  // 平面オブジェクト
  geo: THREE.PlaneGeometry,
  // UV座標　左下
  p1: THREE.Vector2,
  // UV座標 右下
  p2: THREE.Vector2,
  // UV座標 右上
  p3: THREE.Vector2,
  // UV座標 左上
  p4: THREE.Vector2
}): THREE.PlaneGeometry
{
  param.geo.faceVertexUvs[0][0] = [param.p1, param.p2, param.p4];
  param.geo.faceVertexUvs[0][1] = [param.p2, param.p3, param.p4];

  return param.geo;
}