// @flow
import * as THREE from "three";

/** ウインドウリサイズに応じたカメラ更新処理を集めたもの */

/**
 * ウインドウリサイズに応じて、PerspectiveCameraの各種パラメータを更新する
 * 本関数には副作用がある
 *
 * @param camera 更新対象のカメラ
 */
export function onResizePerspectiveCamera(camera: THREE.PerspectiveCamera): void {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

/**
 * ウインドウリサイズに応じて、OrthographicCameraの各種パラメータを更新する
 * 本関数には副作用がある
 *
 * @param camera 更新対象のカメラ
 */
export function onResizeOrthographicCamera(camera: THREE.OrthographicCamera): void {
  camera.left = -window.innerWidth/2;
  camera.right = window.innerWidth/2;
  camera.top = window.innerHeight/2;
  camera.bottom = -window.innerHeight/2;
  camera.updateProjectionMatrix();
}