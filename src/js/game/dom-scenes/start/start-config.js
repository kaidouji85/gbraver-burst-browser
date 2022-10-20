// @flow
import type { Resources } from "../../../resource";
import type { GbraverBurstBrowserConfig } from "../../config/browser-config";
import { bindScene } from "../bind-scene";
import { discardCurrentScene } from "../discard-current-scene";
import type { DOMScenesProps } from "../props";
import { Config } from "../scene/config";

/**
 * 設定画面を開始する
 *
 * @param props DOMScenesプロパティ
 * @param resources リソース管理オブジェクト
 * @param config Gブレイバーバースト ブラウザ側設定項目
 * @return 開始された設定画面
 */
export function startConfig(
  props: DOMScenesProps,
  resources: Resources,
  config: GbraverBurstBrowserConfig
): Config {
  discardCurrentScene(props);
  const scene = new Config(resources, config);
  bindScene(props, scene);
  props.unsubscribers = [
    scene.prevNotifier().subscribe(() => {
      props.gameAction.next({ type: "ConfigChangeCancel" });
    }),
    scene.configChangeNotifier().subscribe((config) => {
      props.gameAction.next({ type: "ConfigChangeComplete", config });
    }),
  ];
  return scene;
}
