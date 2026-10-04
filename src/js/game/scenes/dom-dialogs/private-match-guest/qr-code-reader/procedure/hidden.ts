import { ROOT_HIDDEN } from "../dom/class-name";
import { PrivateMatchQRCodeReaderProps } from "../props";

/**
 * プライベートマッチQRコードリーダーを非表示にする
 * @param props プロパティ
 */
export function hidden(props: PrivateMatchQRCodeReaderProps) {
  props.root.className = ROOT_HIDDEN;
}
