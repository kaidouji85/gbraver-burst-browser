import { StatusIconModel } from "./status-icon-model";

/**
 * モデルの初期値を生成する
 * @returns モデルの初期値
 */
export function createInitialModel(): StatusIconModel {
  return {
    opacity: 0,
    scale: 1,
  };
}
