import { PrivateMatchQRCodeReaderProps } from "../props";

/**
 * 可能な限り高解像度で背面カメラを起動するための制約を生成する
 */
function createCameraConstraints(): MediaTrackConstraints {
  const supported = navigator.mediaDevices.getSupportedConstraints();
  const constraints: MediaTrackConstraints = {
    facingMode: { ideal: "environment" },
    width: { ideal: 3840 },
    height: { ideal: 2160 },
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

  return constraints;
}

/**
 * trackの能力から可能な範囲で解像度制約を引き上げる
 */
async function raiseResolutionAsMuchAsPossible(track: MediaStreamTrack) {
  if (typeof track.getCapabilities !== "function") {
    return;
  }

  const capabilities = track.getCapabilities();
  if (!capabilities.width || !capabilities.height) {
    return;
  }

  await track.applyConstraints({
    width: { ideal: capabilities.width.max },
    height: { ideal: capabilities.height.max },
  });
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
    await raiseResolutionAsMuchAsPossible(videoTrack).catch(() => {
      // 制約適用失敗時は取得済みストリームを継続利用する
    });
  }

  // videoタグのplaysinline属性には値がないので、2番目の引数は空文字である
  video.setAttribute("playsinline", "");
  await video.play();
}
