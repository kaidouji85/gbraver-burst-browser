import { ResourceType } from "../resource-type";

/** キャンバス用画像ID */
export type CanvasImageId = string;

/** キャンバス用画像設定 */
export type CanvasImageConfig = ResourceType & {
  id: CanvasImageId;
  path: string;
};

/** キャンバス用画像リソース */
export type CanvasImageResource = ResourceType & {
  id: CanvasImageId;
  image: HTMLImageElement;
};
