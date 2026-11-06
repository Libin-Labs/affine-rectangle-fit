# @lp-labs/affine-rectangle-fit

Maps a source rectangle to a target rectangle with axis-aligned scale and translation.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/affine-rectangle-fit
```

## Working example

```js
import { mapBounds } from '@lp-labs/affine-rectangle-fit';
console.log(
  mapBounds({ minX: 0, minY: 0, maxX: 2, maxY: 1 }, { minX: 10, minY: 20, maxX: 14, maxY: 23 }),
);
```

CommonJS: `const api = require('@lp-labs/affine-rectangle-fit')`.

## Behavior, customization and limits

Returns independent x/y scale factors and translation that map source bounds exactly onto target bounds, including reflections when target dimensions are negative only if explicitly represented by endpoints. Rectangles are supplied as min/max bounds.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface Bounds {
  readonly minX: number;
  readonly minY: number;
  readonly maxX: number;
  readonly maxY: number;
}
export interface AxisMap {
  readonly scaleX: number;
  readonly scaleY: number;
  readonly translateX: number;
  readonly translateY: number;
}
export declare function mapBounds(source: Bounds, target: Bounds): AxisMap;
export declare function applyAxisMap(
  map: AxisMap,
  point: {
    readonly x: number;
    readonly y: number;
  },
): {
  x: number;
  y: number;
};
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
