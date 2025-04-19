/** キャンバス用画像ID */
export type CanvasImageId = string;

/** キャンバス用画像設定 */
export type CanvasImageConfig = {
  id: CanvasImageId;
  path: string;
};

/** キャンバス用画像リソース */
export type CanvasImageResource = {
  id: CanvasImageId;
  image: HTMLImageElement;
};
