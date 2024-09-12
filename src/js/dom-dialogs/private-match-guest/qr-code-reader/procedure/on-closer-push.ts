import { pop } from "../../../../dom/pop";
import { PrivateMatchQRCodeReaderProps } from "../props";

/**
 * クローザーを押したときの処理
 * @param props プロパティ
 */
export function onCloserPush(props: PrivateMatchQRCodeReaderProps) {
  props.exclusive.execute(async () => {
    await pop(props.closer, 1.3);
    props.notificationOfClose.next();
  });
}
