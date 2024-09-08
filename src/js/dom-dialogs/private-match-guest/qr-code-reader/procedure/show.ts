import { ROOT } from "../dom/class-name";
import { PrivateMatchQRCodeReaderProps } from "../props";

/**
 * プライベートマッチQRコードリーダーを表示する
 * @param props プロパティ
 */
export function show(props: PrivateMatchQRCodeReaderProps) {
  props.root.className = ROOT;
}
