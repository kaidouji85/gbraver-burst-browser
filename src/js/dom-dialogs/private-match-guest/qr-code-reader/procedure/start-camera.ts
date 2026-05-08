import { isMobile } from "../../../../device-ditect/is-mobile";
import { PrivateMatchQRCodeReaderProps } from "../props";

type CameraProfile = {
  idealWidth: number;
  idealHeight: number;
  idealFrameRate: number;
};

const MOBILE_CAMERA_PROFILE: CameraProfile = {
  idealWidth: 1280,
  idealHeight: 720,
  idealFrameRate: 24,
};

const DESKTOP_OR_TABLET_CAMERA_PROFILE: CameraProfile = {
  idealWidth: 1920,
  idealHeight: 1080,
  idealFrameRate: 30,
};

function selectCameraProfile(): CameraProfile {
  return isMobile()
    ? MOBILE_CAMERA_PROFILE
    : DESKTOP_OR_TABLET_CAMERA_PROFILE;
}

/**
 * 可能な限り高解像度で背面カメラを起動するための制約を生成する
 */
function createCameraConstraints(profile: CameraProfile): MediaTrackConstraints {
  const supported = navigator.mediaDevices.getSupportedConstraints();
  const constraints: MediaTrackConstraints = {
    facingMode: { ideal: "environment" },
    width: { ideal: profile.idealWidth },
    height: { ideal: profile.idealHeight },
    frameRate: { ideal: profile.idealFrameRate, max: profile.idealFrameRate },
  };

  // 一部ブラウザでは未対応キーを含むと失敗するため、対応キーのみを渡す
  if (!supported.facingMode) {
    delete constraints.facingMode;
  }
  if (!supported.width) {
    delete constraints.width;
  }
  if (!supported.height) {
    delete constraints.height;
  }
  if (!supported.frameRate) {
    delete constraints.frameRate;
  }

  return constraints;
}

/**
 * trackの能力から、解像度とフレームレートを上げすぎない範囲で制約を最適化する
 */
async function tuneTrackConstraints(track: MediaStreamTrack, profile: CameraProfile) {
  if (typeof track.getCapabilities !== "function") {
    return;
  }

  const capabilities = track.getCapabilities();
  const constraints: MediaTrackConstraints = {};

  if (capabilities.width?.max) {
    constraints.width = { ideal: Math.min(capabilities.width.max, profile.idealWidth) };
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
