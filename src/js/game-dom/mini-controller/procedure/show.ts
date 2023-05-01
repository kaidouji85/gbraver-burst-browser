import { ButtonConfig } from "../button-config";
import { ROOT } from "../dom/class-name";
import { showRoot } from "../dom/show-root";
import { MiniControllerProps } from "../props";
import { engageButtonConfig } from "./engage-button-config";

/**
 * ミニコントローラを表示する
 * @param props コンポネントプロパティ
 * @param config ボタン設定
 * @return 処理が完了したら発火するPromise
 */
export async function show(
  props: Readonly<MiniControllerProps>,
  config: Readonly<ButtonConfig>
): Promise<void> {
  props.root.className = ROOT;
  engageButtonConfig(props, config);
  await showRoot(props.root);
}
