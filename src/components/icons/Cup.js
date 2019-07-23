import * as React from 'react';

/**
 * @param {object} props
 */
export default props => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 viewBox="0 0 512 512" { ...props }>
      <g>
        <g>
          <path d="M511.982,97.701c-0.51-43.455-22.748-67.388-62.619-67.388c-15.432,0-30.302,3.592-40.023,6.589
			c0.968-17.762,0.983-28.726,0.983-29.271l0.001-7.604H101.683v7.603c0,0.26,0.026,11.397,1.005,29.281
			c-9.72-2.999-24.604-6.598-40.051-6.598c-39.87,0-62.109,23.932-62.619,67.388c-0.502,42.75,9.248,80.804,28.977,113.107
			c19.37,31.715,44.128,50.826,61.487,61.271c27.803,16.732,55.59,20.244,74.006,20.244c4.54,0,8.914-0.214,13.005-0.636
			c0.271-0.028,0.522-0.06,0.787-0.089c8.904,9.589,18.503,17.27,28.76,22.978c7.561,4.207,12.82,11.544,14.622,19.977
			c-10.195,3.173-17.618,12.698-17.618,23.923c0,11.477,7.763,21.17,18.31,24.12v31.91h-41.142v33.301h-40.6v64.167h230.781v-64.167
			h-40.6v-33.301h-41.142v-31.91c10.548-2.951,18.311-12.643,18.311-24.12c0-11.226-7.423-20.75-17.618-23.923
			c1.802-8.433,7.06-15.769,14.622-19.977c10.232-5.693,19.897-13.416,28.779-22.974c3.147,0.349,7.866,0.72,13.766,0.72
			c0.002,0,0.001,0,0.004,0c18.414,0,46.2-3.514,74.001-20.244c17.358-10.446,42.117-29.556,61.487-61.271
			C502.735,178.505,512.484,140.45,511.982,97.701z M394.992,15.233c-0.068,2.781-0.176,6.277-0.342,10.369H117.387
			c-0.172-4.091-0.287-7.592-0.361-10.369H394.992z M405.334,85.046c10.302-3.429,23.654-6.887,35.615-6.887
			c10.029,0,17.25,2.45,21.463,7.282c4.842,5.554,6.403,14.884,4.637,27.734c-7.353,53.526-30.562,95.308-65.354,117.647
			c-12.119,7.782-25.171,10.997-36.109,12.139C388.723,194.33,399.921,133.314,405.334,85.046z M114.495,138.009
			c7.479,40.115,17.805,74.563,30.693,102.386c0.399,0.864,0.805,1.715,1.209,2.566c-10.934-1.145-23.978-4.359-36.092-12.137
			c-34.791-22.34-58.001-64.121-65.354-117.647c-1.765-12.851-0.205-22.182,4.638-27.734c4.213-4.832,11.435-7.281,21.463-7.281
			c11.971,0,25.335,3.463,35.641,6.894C108.534,101.518,111.051,119.537,114.495,138.009z M164.488,277.117
			c-16.488,0-41.353-3.135-66.164-18.066C72.949,243.781,14.054,197.507,15.224,97.88c0.414-35.233,15.923-52.36,47.413-52.36
			c16.841,0,33.474,5.077,41.077,7.755c0.379,5.101,0.804,10.217,1.274,15.312c-10.335-3.036-22.512-5.634-33.936-5.634
			c-14.618,0-25.695,4.203-32.925,12.493c-7.859,9.013-10.632,22.403-8.242,39.798c4.094,29.801,12.65,56.141,25.431,78.287
			c12.201,21.142,27.938,37.994,46.772,50.086c18.396,11.813,38.293,14.792,52.486,15.077c0.048,0.084,0.097,0.164,0.145,0.247
			c0.778,1.363,1.564,2.703,2.358,4.026c0.247,0.413,0.496,0.823,0.745,1.232c0.757,1.244,1.52,2.476,2.291,3.683
			c0.29,0.454,0.584,0.897,0.876,1.347c0.525,0.807,1.053,1.607,1.585,2.398c0.514,0.765,1.03,1.522,1.549,2.271
			c0.509,0.733,1.019,1.462,1.533,2.181c0.241,0.338,0.478,0.689,0.719,1.023C165.763,277.112,165.134,277.117,164.488,277.117z
			 M356.188,463.015v33.753H155.82v-33.753h25.393h149.581H356.188z M289.653,429.714h25.934v18.094H196.42v-18.094h25.935H289.653z
			 M237.561,414.507v-30.982h36.885v30.982H237.561z M292.757,358.476c0,5.427-4.416,9.842-9.842,9.842h-53.822
			c-5.427,0-9.842-4.415-9.842-9.842s4.415-9.842,9.842-9.842h53.822C288.342,348.634,292.757,353.049,292.757,358.476z
			 M330.791,271.552c-0.084,0.109-0.168,0.218-0.252,0.327c-0.748,0.968-1.502,1.912-2.26,2.843
			c-0.186,0.227-0.369,0.458-0.556,0.684c-0.833,1.012-1.673,2.002-2.517,2.968c-0.041,0.046-0.079,0.094-0.12,0.14
			c-8.479,9.673-17.735,17.334-27.512,22.774c-12.051,6.704-20.245,18.611-22.499,32.139h-38.142
			c-2.255-13.529-10.449-25.435-22.5-32.139c-9.436-5.249-17.958-12.266-25.657-20.651l-1.86-2.122
			c-7.56-8.622-14.686-19.068-21.179-31.045l-1.989-3.671c-32.697-63.177-42.587-154.488-45.569-202.991h275.705
			c-0.127,2.11-0.266,4.289-0.42,6.552c-0.007,0.105-0.015,0.213-0.022,0.318c-0.168,2.452-0.348,4.911-0.539,7.372
			c-0.005,0.072-0.011,0.144-0.016,0.217c-0.608,7.8-1.328,15.629-2.149,23.365l-0.497,4.678
			c-5.525,49.528-17.194,112.625-41.801,160.153l-2.173,4.006C341.432,256.385,336.246,264.451,330.791,271.552z M413.677,259.051
			c-24.813,14.932-49.673,18.066-66.16,18.066c-0.001,0-0.003,0-0.004,0c-0.647,0-1.276-0.005-1.889-0.015
			c0.01-0.014,0.02-0.029,0.03-0.043c0.987-1.362,1.959-2.744,2.916-4.145c0.117-0.171,0.232-0.346,0.349-0.517
			c0.809-1.192,1.606-2.4,2.394-3.62c0.203-0.313,0.406-0.627,0.607-0.942c0.872-1.369,1.735-2.747,2.581-4.149
			c0.133-0.219,0.262-0.444,0.394-0.665c0.693-1.158,1.378-2.327,2.054-3.507c0.158-0.276,0.321-0.54,0.48-0.818
			c14.193-0.285,34.09-3.264,52.486-15.077c18.834-12.094,34.571-28.946,46.772-50.086c12.78-22.146,21.336-48.486,25.431-78.287
			c2.388-17.396-0.384-30.786-8.242-39.798c-7.229-8.291-18.307-12.494-32.925-12.494c-11.423,0-23.602,2.596-33.936,5.633
			c0.479-5.195,0.89-10.178,1.242-14.914c0.01-0.132,0.021-0.265,0.031-0.396c7.605-2.679,24.237-7.755,41.077-7.755
			c31.49,0,46.999,17.127,47.414,52.358C497.945,197.507,439.052,243.78,413.677,259.051z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M192.356,246.237l-12.7,8.367c4.336,6.583,8.996,12.564,13.851,17.776l11.128-10.366
			C200.358,257.423,196.227,252.114,192.356,246.237z"/>
        </g>
      </g>
      <g>
        <g>
          <path d="M159.716,161.922l-14.826,3.382c7.292,31.965,17.027,58.799,28.933,79.756l13.222-7.512
			C175.873,217.883,166.678,192.439,159.716,161.922z"/>
        </g>
      </g>
      <g>
        <g>
          <polygon points="443.666,333.509 443.655,318.302 430.818,318.31 430.809,305.473 415.602,305.483 415.611,318.321 
			402.774,318.33 402.784,333.537 415.621,333.528 415.63,346.364 430.837,346.354 430.828,333.517 		"/>
        </g>
      </g>
      <g>
        <g>
          <polygon points="112.785,412.475 112.769,397.268 101.997,397.279 101.986,386.506 86.779,386.522 86.79,397.294 76.016,397.305 
			76.033,412.512 86.805,412.501 86.816,423.275 102.023,423.259 102.012,412.486 		"/>
        </g>
      </g>
      <g>
        <g>
          <rect x="48.845" y="288.161" width="14.345" height="15.207"/>
        </g>
      </g>
      <g>
        <g>
          <rect x="141.039" y="333.153" width="14.345" height="15.207"/>
        </g>
      </g>
      <g>
        <g>
          <rect x="372.254" y="378.905" width="14.345" height="15.207"/>
        </g>
      </g>
    </svg>

  );
};