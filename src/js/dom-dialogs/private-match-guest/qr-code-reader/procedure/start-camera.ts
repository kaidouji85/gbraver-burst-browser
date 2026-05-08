import { PrivateMatchQRCodeReaderProps } from "../props";

const IDEAL_CAMERA_WIDTH = 1920;
const IDEAL_CAMERA_HEIGHT = 1080;
const IDEAL_CAMERA_FRAME_RATE = 30;

/**
 * 可能な限り高解像度で背面カメラを起動するための制約を生成する
 */
function createCameraConstraints(): MediaTrackConstraints {
  const supported = navigator.mediaDevices.getSupportedConstraints();
  const constraints: MediaTrackConstraints = {
    facingMode: { ideal: "environment" },
    width: { ideal: IDEAL_CAMERA_WIDTH },
    height: { ideal: IDEAL_CAMERA_HEIGHT },
    frameRate: { ideal: IDEAL_CAMERA_FRAME_RATE, max: IDEAL_CAMERA_FRAME_RATE },
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
async function tuneTrackConstraints(track: MediaStreamTrack) {
  if (typeof track.getCapabilities !== "function") {
    return;
  }

  const capabilities = track.getCapabilities();
  const constraints: MediaTrackConstraints = {};

  if (capabilities.width?.max) {
    constraints.width = { ideal: Math.min(capabilities.width.max, IDEAL_CAMERA_WIDTH) };
  }
  if (capabilities.height?.max) {
    constraints.height = {
      ideal: Math.min(capabilities.height.max, IDEAL_CAMERA_HEIGHT),
    };
  }
  if (capabilities.frameRate?.max) {
    const frameRateUpperLimit = Math.min(
      capabilities.frameRate.max,
      IDEAL_CAMERA_FRAME_RATE,
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
  const stream = await navigator.mediaDevices.getUserMedia({
    video: createCameraConstraints(),
  });
  video.srcObject = stream;

  const [videoTrack] = stream.getVideoTracks();
  if (videoTrack) {
    await tuneTrackConstraints(videoTrack).catch(() => {
      // 制約適用失敗時は取得済みストリームを継続利用する
    });
  }

  // videoタグのplaysinline属性には値がないので、2番目の引数は空文字である
  video.setAttribute("playsinline", "");
  await video.play();
}
