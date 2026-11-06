import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('maps bounds with independent scales', () => {
  assert.deepEqual(
    api.mapBounds(
      { minX: 0, minY: 0, maxX: 2, maxY: 1 },
      { minX: 10, minY: 20, maxX: 14, maxY: 23 },
    ),
    { scaleX: 2, scaleY: 3, translateX: 10, translateY: 20 },
  );
});
test('maps source minimum to target minimum', () => {
  const m = api.mapBounds(
    { minX: -1, minY: -1, maxX: 1, maxY: 1 },
    { minX: 0, minY: 0, maxX: 10, maxY: 20 },
  );
  assert.deepEqual(api.applyAxisMap(m, { x: -1, y: -1 }), { x: 0, y: 0 });
});
test('maps source maximum to target maximum', () => {
  const m = api.mapBounds(
    { minX: 0, minY: 0, maxX: 1, maxY: 1 },
    { minX: 2, minY: 4, maxX: 6, maxY: 9 },
  );
  assert.deepEqual(api.applyAxisMap(m, { x: 1, y: 1 }), { x: 6, y: 9 });
});
test('supports translation', () => {
  assert.deepEqual(
    api.applyAxisMap({ scaleX: 1, scaleY: 1, translateX: 3, translateY: -2 }, { x: 1, y: 4 }),
    { x: 4, y: 2 },
  );
});
test('supports point scaling', () => {
  assert.deepEqual(
    api.applyAxisMap({ scaleX: 2, scaleY: 3, translateX: 0, translateY: 0 }, { x: 2, y: 2 }),
    { x: 4, y: 6 },
  );
});
test('rejects zero source area', () => {
  assert.throws(
    () =>
      api.mapBounds({ minX: 0, minY: 0, maxX: 0, maxY: 1 }, { minX: 0, minY: 0, maxX: 1, maxY: 1 }),
    RangeError,
  );
});
