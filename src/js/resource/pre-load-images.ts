import { Player } from "gbraver-burst-core";
import { Resources } from ".";
import { PathId } from "./path/resource";
import { getArmdozerStandPathId } from "../path/armdozer-stand-path";
import { getPilotSkillCutinPathId } from "../path/pilot-skill-cutin-path";

/**
 * 画像をプリロードする
 * @param src 画像のパス
 * @returns プリロードが完了したら発火するPromise
 */
const preLoadImage = (src: string) => {
  const img = new Image();
  let onLoad: null | (() => void) = null;
  let onError: null | ((e: Event) => void) = null;
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    onLoad = () => resolve();
    onError = (e) => reject(e);
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);
    img.src = src;
  }).finally(() => {
    if (onLoad) {
      img.removeEventListener("load", onLoad);
    }
    if (onError) {
      img.removeEventListener("error", onError);
    }
  });
};

/**
 * 指定されたパスIDの画像をプリロードする
 * @param resources リソース管理オブジェクト
 * @param pathIds プリロードするパスIDの配列
 * @returns プリロードが完了したら発火するPromise
 */
export const preLoadImages = (resources: Resources, pathIds: PathId[]) => {
  const uniquePathIds = Array.from(new Set(pathIds));
  return Promise.all(
    uniquePathIds
      .map((pathId) => resources.paths.find((p) => p.id === pathId)?.path)
      .filter((p) => p !== undefined)
      .map((path) => preLoadImage(path)),
  );
};

/**
 * バトルシーンで使用する画像をプリロードする
 * @param resources リソース管理オブジェクト
 * @param players ゲームに参加するプレイヤーの情報
 * @returns
 */
export const preloadBattleSceneImages = (
  resources: Resources,
  players: [Player, Player],
) =>
  preLoadImages(
    resources,
    players.flatMap((player) => [
      getArmdozerStandPathId(player.armdozer.id),
      getPilotSkillCutinPathId(player.pilot.id),
    ]),
  );
