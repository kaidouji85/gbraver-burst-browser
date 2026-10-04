import * as THREE from "three";

/** アームドーザアニメーション */
export interface ArmdozerAnimation {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * アニメーション進捗を変更する
   * @param animation 0〜1で指定するアニメーション進捗度
   */
  animate(animation: number): void;

  /**
   * 不透明度を設定する
   * @param value 設定値
   */
  opacity(value: number): void;

  /**
   * 色の強さを設定する
   * @param r 赤要素の倍率(1でそのまま)
   * @param g 緑要素の倍率(1でそのまま)
   * @param b 青要素の倍率(1でそのまま)
   */
  color(r: number, g: number, b: number): void;

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D;
}
