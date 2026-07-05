import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** カメラアイコン パス設定 */
export const CameraIconConfigs: PathConfig[] = [
  {
    id: PathIds.CAMERA_ICON,
    path: (root) => `${root.get()}/camera-icon.svg`,
  },
];
