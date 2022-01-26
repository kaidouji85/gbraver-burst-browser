// @flow

import type {ResourceRoot} from "./resource-root";

/**
 * パス ID
 */
export type PathId = string;

/**
 * パス設定
 */
export type PathConfig = {
  id: PathId,
  path: (basePath: ResourceRoot) => string
}

/**
 * パス
 */
export type Path = {
  id: PathId,
  path: string
};

/**
 * パスIDを集めたもの
 */
export const PathIds = {
  TITLE_BACK: 'TITLE_BACK',
  LOGO: 'LOGO',
  SHIN_BRAVER_ICON: 'SHIN_BRAVER_ICON',
  SHIN_BRAVER_BUST_SHOT: 'SHIN_BRAVER_BUST_SHOT',
  NEO_LANDOZER_ICON: 'NEO_LANDOZER_ICON',
  NEO_LANDOZER_BUST_SHOT: 'NEO_LANDOZER_BUST_SHOT',
  LIGHTNING_DOZER_ICON: 'LIGHTNING_DOZER_ICON',
  LIGHTNING_DOZER_BUST_SHOT: 'LIGHTNING_DOZER_BUST_SHOT',
  WING_DOZER_ICON: 'WING_DOZER_ICON',
  WING_DOZER_BUST_SHOT: 'WING_DOZER_BUST_SHOT',
  SHINYA_ICON: 'SHINYA_ICON',
  SHINYA_SKILL_CUTIN: 'SHINYA_SKILL_CUTIN',
  GAI_ICON: 'GAI_ICON',
  GAI_SKILL_CUTIN: 'GAI_SKILL_CUTIN',
  RAITO_ICON: 'RAITO_ICON',
  RAITO_SKILL_CUTIN: 'RAITO_SKILL_CUTIN',
  TSUBASA_SKILL_CUTIN: 'TSUBASA_SKILL_CUTIN',
  TSUBASA_ICON: 'TSUBASA_ICON',
  END: 'END',
  END_CARD: 'END_CARD',
  CLOSER: 'CLOSER',
  PLAY_IN_LANDSCAPE: 'PLAY_IN_LANDSCAPE',
  CHECK: 'CHECK',
};

/**
 * パス設定を集めたもの
 */
export const PathConfigs: PathConfig[] = [
  {
    id: PathIds.TITLE_BACK,
    path: root => `${root.get()}/title-back.webp`
  },
  {
    id: PathIds.LOGO,
    path: root => `${root.get()}/logo.svg`
  },
  {
    id: PathIds.SHIN_BRAVER_ICON,
    path: root => `${root.get()}/armdozer/shin-braver/player-select.png`
  },
  {
    id: PathIds.SHIN_BRAVER_BUST_SHOT,
    path: root => `${root.get()}/armdozer/shin-braver/bust-shot.png`
  },
  {
    id: PathIds.NEO_LANDOZER_ICON,
    path: root => `${root.get()}/armdozer/neo-landozer/player-select.png`
  },
  {
    id: PathIds.NEO_LANDOZER_BUST_SHOT,
    path: root => `${root.get()}/armdozer/neo-landozer/bust-shot.png`
  },
  {
    id: PathIds.LIGHTNING_DOZER_ICON,
    path: root => `${root.get()}/armdozer/lightning-dozer/player-select.png`
  },
  {
    id: PathIds.LIGHTNING_DOZER_BUST_SHOT,
    path: root => `${root.get()}/armdozer/lightning-dozer/bust-shot.png`
  },
  {
    id: PathIds.WING_DOZER_ICON,
    path: root => `${root.get()}/armdozer/wing-dozer/player-select.png`
  },
  {
    id: PathIds.WING_DOZER_BUST_SHOT,
    path: root => `${root.get()}/armdozer/wing-dozer/bust-shot.png`
  },
  {
    id: PathIds.SHINYA_ICON,
    path: root => `${root.get()}/pilot/shinya/player-select.png`
  },
  {
    id: PathIds.SHINYA_SKILL_CUTIN,
    path: root => `${root.get()}/pilot/shinya/skill-cutin.png`
  },
  {
    id: PathIds.GAI_ICON,
    path: root => `${root.get()}/pilot/gai/player-select.png`
  },
  {
    id: PathIds.GAI_SKILL_CUTIN,
    path: root => `${root.get()}/pilot/gai/skill-cutin.png`
  },
  {
    id: PathIds.RAITO_SKILL_CUTIN,
    path: root => `${root.get()}/pilot/raito/skill-cutin.png`
  },
  {
    id: PathIds.RAITO_ICON,
    path: root => `${root.get()}/pilot/raito/player-select.png`
  },
  {
    id: PathIds.TSUBASA_SKILL_CUTIN,
    path: root => `${root.get()}/pilot/tsubasa/skill-cutin.png`
  },
  {
    id: PathIds.TSUBASA_ICON,
    path: root => `${root.get()}/pilot/tsubasa/player-select.png`
  },
  {
    id: PathIds.END,
    path: root => `${root.get()}/ending/end.svg`
  },
  {
    id: PathIds.END_CARD,
    path: root => `${root.get()}/ending/end-card.png`
  },
  {
    id: PathIds.CLOSER,
    path: root => `${root.get()}/dialog/closer.svg`
  },
  {
    id: PathIds.PLAY_IN_LANDSCAPE,
    path: root => `${root.get()}/waring/play-in-landscape.png`
  },
  {
    id: PathIds.CHECK,
    path: root => `${root.get()}/check/check.png`
  },
];

/**
 * パス設定をパスに変換する
 *
 * @param config 設定
 * @param resourceRoot リソースルート
 * @return パス
 */
export function toPath(config: PathConfig, resourceRoot: ResourceRoot): Path {
  return {
    id: config.id,
    path: config.path(resourceRoot)
  };
}

/**
 * 全てのパスを取得する
 *
 * @param resourceRoot リソースルート
 * @return 全てのパス
 */
export function getAllPaths(resourceRoot: ResourceRoot): Path[] {
  return PathConfigs.map(config => toPath(config, resourceRoot));
}
