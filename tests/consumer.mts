import * as api from '@lp-labs/affine-rectangle-fit';
import { mapBounds } from '@lp-labs/affine-rectangle-fit';
console.log(
  mapBounds({ minX: 0, minY: 0, maxX: 2, maxY: 1 }, { minX: 10, minY: 20, maxX: 14, maxY: 23 }),
);
// @ts-expect-error invalid argument must be rejected by declarations
api.mapBounds('source', { minX: 0, minY: 0, maxX: 1, maxY: 1 });
