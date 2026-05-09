import { isMobile } from "../../../../device-ditect/is-mobile";
import { PrivateMatchQRCodeReaderProps } from "../props";

/** カメラのプロファイル */
type CameraProfile = {
  /** カメラ映像の理想的な幅 */
  idealWidth: number;
  /** カメラ映像の理想的な高さ */
  idealHeight: number;
  /** カメラ映像の理想的なフレームレート */
  idealFrameRate: number;
};

/** モバイル端末用のカメラプロファイル */
const MOBILE_CAMERA_PROFILE: CameraProfile = {
  idealWidth: 1280,
  idealHeight: 720,
  idealFrameRate: 24,
};

/** デスクトップまたはタブレット用のカメラプロファイル */
const DESKTOP_OR_TABLET_CAMERA_PROFILE: CameraProfile = {
  idealWidth: 1920,
  idealHeight: 1080,
  idealFrameRate: 30,
};

/**
 * 端末に応じたカメラプロファイルを選択する
 * @returns カメラプロファイル
 */
function selectCameraProfile(): CameraProfile {
  return isMobile() ? MOBILE_CAMERA_PROFILE : DESKTOP_OR_TABLET_CAMERA_PROFILE;
}

/**
 * 可能な限り高解像度で背面カメラを起動するための制約を生成する
 * @param profile カメラプロファイル
 * @returns カメラ制約
 */
function createCameraConstraints(
  profile: CameraProfile,
): MediaTrackConstraints {
  const supported = navigator.mediaDevices.getSupportedConstraints();
  return {
    ...(supported.facingMode && { facingMode: { ideal: "environment" } }),
    ...(supported.width && { width: { ideal: profile.idealWidth } }),
    ...(supported.height && { height: { ideal: profile.idealHeight } }),
    ...(supported.frameRate && {
      frameRate: { ideal: profile.idealFrameRate, max: profile.idealFrameRate },
    }),
  };
}

/**
 * OverconstrainedErrorかどうかを判定する
 * @param error 判定対象
 * @returns 判定結果、OverconstrainedErrorであればtrue、そうでなければfalse
 */
function isOverconstrainedError(error: unknown): error is Error {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    typeof error.name === "string" &&
    error.name === "OverconstrainedError"
  );
}

/**
 * trackの能力から、解像度とフレームレートを上げすぎない範囲で制約を最適化する
 * @param track メディアストリームトラック
 * @param profile カメラプロファイル
 * @returns 処理が完了したら発火するPromise
 */
async function tuneTrackConstraints(
  track: MediaStreamTrack,
  profile: CameraProfile,
) {
  if (typeof track.getCapabilities !== "function") {
    return;
  }

  const capabilities = track.getCapabilities();
  const constraints: MediaTrackConstraints = {
    ...(capabilities.width?.max && {
      width: { ideal: Math.min(capabilities.width.max, profile.idealWidth) },
    }),
    ...(capabilities.height?.max && {
      height: { ideal: Math.min(capabilities.height.max, profile.idealHeight) },
    }),
    ...(capabilities.frameRate?.max && {
      frameRate: {
        ideal: Math.min(capabilities.frameRate.max, profile.idealFrameRate),
        max: Math.min(capabilities.frameRate.max, profile.idealFrameRate),
      },
    }),
  };
  if (Object.keys(constraints).length === 0) {
    return;
  }

  try {
    await track.applyConstraints(constraints);
  } catch (error: unknown) {
    if (isOverconstrainedError(error)) {
      // applyConstraintsが失敗した時でも処理をそのまま続けたいので、
      // 同メソッドが投げるOverconstrainedErrorは握り潰す
      return;
    }
    throw error;
  }
}

/**
 * QRコードリーダーのためにカメラを起動する
 * @param props プロパティ
 */
export async function startCamera(props: PrivateMatchQRCodeReaderProps) {
  const { video } = props;
  const cameraProfile = selectCameraProfile();
  const stream = await navigator.mediaDevices.getUserMedia({
    video: createCameraConstraints(cameraProfile),
  });
  video.srcObject = stream;

  const [videoTrack] = stream.getVideoTracks();
  if (videoTrack) {
    await tuneTrackConstraints(videoTrack, cameraProfile);
  }

  // videoタグのplaysinline属性には値がないので、2番目の引数は空文字である
  video.setAttribute("playsinline", "");
  await video.play();
}
