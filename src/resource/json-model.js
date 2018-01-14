// @flow
import * as THREE from "three";
import * as R from 'ramda';

/** JSONモデルID */
export type JsonModelId = string;

/** JSONモデル設定 */
export type JsonModelConfig = {
  /** JSONモデルID */
  id: JsonModelId,
  /** リソースのパス */
  path: string,
};

/** JSONモデルリソース */
export type JsonModelResource = {
  /** JSONモデルID */
  id: JsonModelId,
  /** 形状 */
  geometry: THREE.Geometry,
  /** 材質 */
  material: THREE.Material,
};

/** JSONモデルIDを集めたもの */
export const JSON_MODEL_IDS = {
  SCHOOL: 'SCHOOL',
};

/** JSONモデル設定をあつめたもの */
export const JSON_MODEL_CONFIGS: {[string]: JsonModelConfig} = {
  SCHOOL: {
    id: JSON_MODEL_IDS.SCHOOL,
    path: 'model/school/school.js'
  }
};

/**
 * JSONモデルを読み込むヘルパー関数
 *
 * @param basePath ベースとなるパス
 * @param config 読み込み設定
 * @return 読み込み結果
 */
export function loadJsonModel(basePath: string, config: JsonModelConfig): Promise<JsonModelResource> {
  const loader = new THREE.JSONLoader();
  return new Promise(resolve => loader.load(`${basePath}${config.path}`, (geometry, material) => resolve({
    id: config.id,
    geometry,
    material
  })));
}

/**
 * ゲームで使うJSONモデルを全て読み込む
 *
 * @param basePath
 * @return 読み込み結果
 */
export function loadAllJsonModel(basePath: string): Promise<JsonModelResource[]> {
  const configs: JsonModelConfig[] = R.values(JSON_MODEL_CONFIGS);
  return Promise.all(configs.map(config => loadJsonModel(basePath, config)));
}