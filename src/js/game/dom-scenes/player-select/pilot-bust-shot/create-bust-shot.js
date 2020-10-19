// @flow

import type {PilotId} from 'gbraver-burst-core';
import {PilotBustShot} from "./pilot-bust-shot";
import type {Resources} from '../../../../resource';
import {PathIds} from "../../../../resource/path";
import { PilotIds } from 'gbraver-burst-core';

/**
 * ルート要素のクラス名
 */
const ROOT_CLASS_NAME = 'player-select__pilot-bust-shot';

/**
 * パイロットIDに対応したバストショットを生成する
 * 
 * @param resources リソース管理オブジェクト 
 * @param pitlotId パイロットID
 * @return 生成結果 
 */
export function createPilotBustShot(resources: Resources, pilotId: PilotId): PilotBustShot {
  switch (pilotId) {
    case PilotIds.SHINYA:
      return shinyaBustShot(resources);
    default:
      return shinyaBustShot(resources);
  }
}

/**
 * シンヤのバストショットを生成する
 * 
 * @param resources リソース管理オブジェクト
 * @return 生成結果 
 */
function shinyaBustShot(resources: Resources): PilotBustShot {
  const path = resources.paths.find(v => v.id === PathIds.SHINYA_SKILL_CUTIN)
    ?.path ?? '';
  const className = `${ROOT_CLASS_NAME}__shinya`;  
  return new PilotBustShot(path, className);
}