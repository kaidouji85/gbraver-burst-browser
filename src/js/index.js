// @flow

import {GbraverBurstBrowser} from "./app/app";

/**
 * Gブレイバーバーストのエントリポイント
 */
window.onload = () => {
  const app = new GbraverBurstBrowser();
  app.start();
};