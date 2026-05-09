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
 * trackの能力から、解像度とフレームレートを上げすぎない範囲で制約を最適化する
 * @param track メディアストリームトラック
 * @param profile カメラプロファイル
 * @returns 制約の適用に成功した場合はPromiseが解決し、失敗した場合はPromiseが拒否される
 */
async function tuneTrackConstraints(
  track: MediaStreamTrack,
  profile: CameraProfile,
) {
  if (typeof track.getCapabilities !== "function") {
    return;
  }

  const capabilities = track.getCapabilities();
  const constraints: MediaTrackConstraints = {};

  if (capabilities.width?.max) {
    constraints.width = {
      ideal: Math.min(capabilities.width.max, profile.idealWidth),
    };
  }
  if (capabilities.height?.max) {
    constraints.height = {
      ideal: Math.min(capabilities.height.max, profile.idealHeight),
    };
  }
  if (capabilities.frameRate?.max) {
    const frameRateUpperLimit = Math.min(
      capabilities.frameRate.max,
      profile.idealFrameRate,
    );
    constraints.frameRate = {
      ideal: frameRateUpperLimit,
      max: frameRateUpperLimit,
    };
  }

  if (Object.keys(constraints).length === 0) {
    return;
  }

  await track.applyConstraints(constraints);
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
    await tuneTrackConstraints(videoTrack, cameraProfile).catch(() => {
      // 制約適用失敗時は取得済みストリームを継続利用する
    });
  }

  // videoタグのplaysinline属性には値がないので、2番目の引数は空文字である
  video.setAttribute("playsinline", "");
  await video.play();
}
