// @flow
import * as THREE from "three";

/** ウインドウリサイズに応じたカメラ更新処理を集めたもの */

/**
 * ウインドウリサイズに応じて、PerspectiveCameraの各種パラメータを更新する
 * 本関数には副作用がある
 *
 * @param camera 更新対象のカメラ
 */
export function onResizePerspectiveCamera(camera: THREE.PerspectiveCamera, width: number, height: number): void {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

/**
 * ウインドウリサイズに応じて、OrthographicCameraの各種パラメータを更新する
 * 本関数には副作用がある
 *
 * @param camera 更新対象のカメラ
 */
export function onResizeOrthographicCamera(camera: THREE.OrthographicCamera, width: number, height: number): void {
  camera.left = -width / 2;
  camera.right = width / 2;
  camera.top = height / 2;
  camera.bottom = -height / 2;
  camera.updateProjectionMatrix();
}