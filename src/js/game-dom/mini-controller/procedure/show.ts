import { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import { showRoot } from "../animation/show-root";
import { ButtonConfig } from "../button-config";
import { ROOT } from "../dom/class-name";
import { MiniControllerProps } from "../props";
import { engageButtonConfig } from "./engage-button-config";

/**
 * ミニコントローラを表示する
 * @param props コンポネントプロパティ
 * @param config ボタン設定
 * @return アニメーション
 */
export function show(
  props: MiniControllerProps,
  config: Readonly<ButtonConfig>
): Animate {
  return process(() => {
    props.root.className = ROOT;
    engageButtonConfig(props, config);
  }).chain(showRoot(props));
}
