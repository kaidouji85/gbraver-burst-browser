import { GbraverBurstBrowserConfig } from "../browser-config";

/** ブラウザ設定リポジトリ */
export interface GbraverBurstBrowserConfigRepository {
  /**
   * ブラウザ設定を保存する
   * @param config ブラウザ設定
   * @return 保存が完了したら発火するPromise
   */
  save(config: GbraverBurstBrowserConfig): Promise<void>;

  /**
   * ブラウザ設定を読み込む
   * @return 読み込んだブラウザ設定
   */
  load(): Promise<GbraverBurstBrowserConfig>;
}