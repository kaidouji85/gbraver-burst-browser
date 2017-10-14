// @flow

/**
 * メッシュ関連のユーティリティ
 */
import type {Resources} from '../resource/resource-manager'
import * as THREE from 'three';

/**
 * JSONから読み込んだデータからメッシュを生成するヘルパー関数
 *
 * @param modelPath モデルのパス
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function createMeshFromJson(modelPath: string, resources: Resources): THREE.MeshFaceMaterial {
  const model = resources.models.find(item => item.path === modelPath);

  if (!model) {
    return null;
  }

  let faceMat = new THREE.MeshFaceMaterial(model.material);
  return new THREE.Mesh(model.geometry, faceMat);
}

/**
 * キャンバスから平面メッシュを生成する
 *
 * @param canvas キャンバス
 * @param width 幅
 * @param height 高
 * @return キャンバスから生成したメッシュ
 */
export function createCanvasMesh(canvas: HTMLCanvasElement, width: number, height: number) {
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  const material = new THREE.MeshBasicMaterial( {map: texture } );
  material.transparent = true;

  var planeGeometry = new THREE.PlaneGeometry( width, height );
  return new THREE.Mesh(planeGeometry, material);
}