import {auto as asyncAuto,parallel as asyncParallel,series as asyncSeries} from "async"

// only export those methods
export const auto = asyncAuto;
export const parallel = asyncParallel;
export const series = asyncSeries;
//
export default {
  auto,
  parallel,
  series
}