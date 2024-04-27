import { GBraverBurstBrowserConfig } from "../browser-config";

/** ブラウザ設定リポジトリ */
export interface GBraverBurstBrowserConfigRepository {
  /**
   * ブラウザ設定を保存する
   * @param config ブラウザ設定
   * @returns 保存が完了したら発火するPromise
   */
  save(config: GBraverBurstBrowserConfig): Promise<void>;

  /**
   * ブラウザ設定を読み込む
   * @returns 読み込んだブラウザ設定
   */
  load(): Promise<GBraverBurstBrowserConfig>;
}
