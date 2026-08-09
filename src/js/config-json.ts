import { z } from "zod";

/**
 * config.jsonのデータ型
 * リリース後のアプリ挙動を手軽に変更するために利用する
 */
export type ConfigJSON = {
  /**
   * バックエンドサーバーが利用可能かどうか
   * trueの場合、バックエンドサーバーが利用可能である
   */
  isBackendServerAvailable: boolean;
};

/** ConfigJSON zod スキーマ */
export const ConfigJSONSchema = z.object({
  isBackendServerAvailable: z.boolean(),
});

/**
 * config.jsonを取得する
 * @returns 取得結果
 */
export const fetchConfigJSON = async (): Promise<ConfigJSON> => {
  const response = await fetch("config.json");
  const json = await response.json();
  return ConfigJSONSchema.parse(json);
};
