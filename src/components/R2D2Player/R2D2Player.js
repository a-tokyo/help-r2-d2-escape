import React from 'react';
import InlineSVG from 'svg-inline-react';

import './R2D2Player.css';

const svgSource = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" version="1.1" class="r2d2-svg">
<g id="surface1">
<path style=" fill:#9FA8DA;" d="M 9 39 L 12 39 L 12 41 L 9 41 Z "></path>
<path style=" fill:#9FA8DA;" d="M 11 15 L 37 15 L 37 22 L 11 22 Z "></path>
<path style=" fill:#E8EAF6;" d="M 40 37 L 39 39 L 36 39 L 36 14 L 40 14 Z "></path>
<path style=" fill:#C5CAE9;" d="M 36 24 L 40 24 L 40 34 L 36 34 Z "></path>
<path style=" fill:#C5CAE9;" d="M 34 15 L 34 11 C 34 5.5 29.5 1 24 1 C 18.5 1 14 5.5 14 11 L 14 15 Z "></path>
<path style=" fill:#3F51B5;" d="M 22 7 L 26 7 L 26 14 L 22 14 Z "></path>
<path style=" fill:#000001;" d="M 25 9 C 25 9.550781 24.550781 10 24 10 C 23.449219 10 23 9.550781 23 9 C 23 8.449219 23.449219 8 24 8 C 24.550781 8 25 8.449219 25 9 Z "></path>
<path style=" fill:#FFFF8D;" d="M 25 12.5 C 25 12.777344 24.777344 13 24.5 13 C 24.222656 13 24 12.777344 24 12.5 C 24 12.222656 24.222656 12 24.5 12 C 24.777344 12 25 12.222656 25 12.5 Z "></path>
<path style=" fill:#7986CB;" d="M 29 12 C 29 12.550781 28.550781 13 28 13 C 27.449219 13 27 12.550781 27 12 C 27 11.449219 27.449219 11 28 11 C 28.550781 11 29 11.449219 29 12 Z "></path>
<path style=" fill:#3F51B5;" d="M 31.117188 4 C 29.300781 2.152344 26.78125 1 24 1 C 21.21875 1 18.699219 2.152344 16.882813 4 Z "></path>
<path style=" fill:#3F51B5;" d="M 34 11 C 34 10.664063 33.980469 10.328125 33.949219 10 L 30 10 L 30 14 L 34 14 Z "></path>
<path style=" fill:#3F51B5;" d="M 21.058594 14 L 21.058594 10 L 14.109375 10 C 14.078125 10.328125 14.058594 10.664063 14.058594 11 L 14.058594 14 Z "></path>
<path style=" fill:#E8EAF6;" d="M 13 14 L 35 14 L 35 37 L 13 37 Z "></path>
<path style=" fill:#3F51B5;" d="M 17 15 L 31 15 L 31 17 L 17 17 Z "></path>
<path style=" fill:#3F51B5;" d="M 17 18 L 31 18 L 31 20 L 17 20 Z "></path>
<path style=" fill:#3F51B5;" d="M 22 22 L 26 22 L 26 31 L 22 31 Z "></path>
<path style=" fill:#3F51B5;" d="M 22 33 L 26 33 L 26 37 L 22 37 Z "></path>
<path style=" fill:#90A4AE;" d="M 30 33 L 32 33 L 32 36 L 30 36 Z "></path>
<path style=" fill:#90A4AE;" d="M 15 32 L 17 32 L 17 36 L 15 36 Z "></path>
<path style=" fill:#CFD8DC;" d="M 24 23 C 24.550781 23 25 23.449219 25 24 L 25 25 C 25 25.550781 24.550781 26 24 26 C 23.449219 26 23 25.550781 23 25 L 23 24 C 23 23.449219 23.449219 23 24 23 Z "></path>
<path style=" fill:#CFD8DC;" d="M 24 27 C 24.550781 27 25 27.449219 25 28 L 25 29 C 25 29.550781 24.550781 30 24 30 C 23.449219 30 23 29.550781 23 29 L 23 28 C 23 27.449219 23.449219 27 24 27 Z "></path>
<path style=" fill:#000001;" d="M 25 35 C 25 35.550781 24.550781 36 24 36 C 23.449219 36 23 35.550781 23 35 C 23 34.449219 23.449219 34 24 34 C 24.550781 34 25 34.449219 25 35 Z "></path>
<path style=" fill:#9FA8DA;" d="M 31 40 L 17 40 L 15 37 L 33 37 Z "></path>
<path style=" fill:#3F51B5;" d="M 40 16 L 41 16 L 41 20 L 40 20 Z "></path>
<path style=" fill:#E8EAF6;" d="M 8 37 L 9 39 L 12 39 L 12 14 L 8 14 Z "></path>
<path style=" fill:#C5CAE9;" d="M 8 23 L 12 23 L 12 33 L 8 33 Z "></path>
<path style=" fill:#3F51B5;" d="M 7 16 L 8 16 L 8 20 L 7 20 Z "></path>
<path style=" fill:#C5CAE9;" d="M 8 40 L 7 46 L 8 47 L 13 47 L 14 46 L 14 40 Z "></path>
<path style=" fill:#9FA8DA;" d="M 13 45 C 12.449219 45 12 44.550781 12 44 L 12 39 C 12 38.449219 12.449219 38 13 38 C 13.550781 38 14 38.449219 14 39 L 14 44 C 14 44.550781 13.550781 45 13 45 Z "></path>
<path style=" fill:#8D6E63;" d="M 13 45 L 10 45 C 9.449219 45 9 44.550781 9 44 C 9 43.449219 9.449219 43 10 43 L 13 43 C 13.550781 43 14 43.449219 14 44 C 14 44.550781 13.550781 45 13 45 Z "></path>
<path style=" fill:#9FA8DA;" d="M 36 39 L 39 39 L 39 41 L 36 41 Z "></path>
<path style=" fill:#C5CAE9;" d="M 40 40 L 41 46 L 40 47 L 35 47 L 34 46 L 34 40 Z "></path>
<path style=" fill:#9FA8DA;" d="M 35 45 C 35.550781 45 36 44.550781 36 44 L 36 39 C 36 38.449219 35.550781 38 35 38 C 34.449219 38 34 38.449219 34 39 L 34 44 C 34 44.550781 34.449219 45 35 45 Z "></path>
<path style=" fill:#8D6E63;" d="M 35 45 L 38 45 C 38.550781 45 39 44.550781 39 44 C 39 43.449219 38.550781 43 38 43 L 35 43 C 34.449219 43 34 43.449219 34 44 C 34 44.550781 34.449219 45 35 45 Z "></path>
</g>
</svg>`;

const R2D2Player = () => <InlineSVG src={svgSource} />;

export default R2D2Player;
