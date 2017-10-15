import React from 'react';
import InlineSVG from 'svg-inline-react';

import './Rock.css';

const svgSource = `<svg baseProfile="tiny" class="lightsaber-svg" width="30px" version="1.2" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M505.144,8.171c-5.613-5.955-14.964-6.25-20.919-0.637L220.686,255.354l36.625,36.626L505.144,28.441  C510.426,22.793,510.521,13.901,505.144,8.171" fill="#6DBE45"/><polygon points="2.936,445.924 15.695,458.682 2.936,471.43 41.213,509.718 53.972,496.959 66.742,509.718 168.802,407.635   105.019,343.84 "/><polygon points="124.157,337.461 175.193,388.496 187.963,375.737 136.916,324.689 "/><polygon points="149.675,311.932 200.71,362.979 213.481,350.22 162.434,299.172 "/><polygon points="245.378,305.563 207.09,267.287 194.331,280.046 181.572,267.287 168.813,280.046 232.608,343.84 245.378,331.082   232.608,318.322 "/></svg>`;

const Rock = () => <InlineSVG src={svgSource} />;

export default Rock;
