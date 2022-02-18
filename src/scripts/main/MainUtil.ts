/* eslint-disable max-len */
import { createSVG } from '../util/Util';

export function getHiddenSvgs() {
  const svgHidden = createSVG('svg', [], [['display', 'none']]);

  svgHidden.append(createSpotSymbol());
  return svgHidden;
}

function createSpotSymbol() {
  const symbolSpot = createSVG(
    'symbol',
    [],
    [
      ['viewBox', '0 0 775 802'],
      ['id', 'about-spot'],
    ],
  );
  const pathSpot = createSVG(
    'path',
    [],
    [
      [
        'd',
        'M415.672 5.07702C523.83 19.681 516.579 180.482 581.595 268.033C640.835 347.807 773.811 381.497 768.866 480.693C763.586 586.602 652.597 647.634 560.077 699.659C456.327 757.998 342.651 824.482 231.019 783.127C110.148 738.349 15.6683 622.162 4.61927 493.882C-5.34749 378.168 107.216 303.015 182.006 214.079C252.754 129.948 306.658 -9.64261 415.672 5.07702Z',
      ],
    ],
  );
  symbolSpot.append(pathSpot);
  return symbolSpot;
}
