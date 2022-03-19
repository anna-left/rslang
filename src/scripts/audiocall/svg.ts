const answerIndicatorSVG = `
<svg display="none">
  <symbol viewBox="0 0 22 22" id = "answerIndicator"> 
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="Correct" transform="translate(-241.000000, -337.000000)">
        <g id="Group-2" transform="translate(241.000000, 319.000000)">
          <g id="Group" transform="translate(0.000000, 18.000000)">
            <circle id="Oval-220" fill="#73FDB6" cx="11" cy="11" r="11" />
            <path d="M5,10 L10,15 L18,7" id="Path-57" stroke="#9565A6" stroke-width="3" />
          </g>
        </g>
      </g>
    </g>
  </symbol>
</svg>
`;

const insertAnswerIndicatorSVG = `<svg class="answer__indicator">
  <use href="#answerIndicator"></use>
</svg>`;

const speakerSVG = `
<svg display="none">
  <symbol viewBox="-36 -31 124 110" id="speaker">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="Question" transform="translate(-574.000000, -176.000000)">
        <g id="audio" transform="translate(540.000000, 140.000000)">
          <g id="Group-3" transform="translate(34.000000, 36.000000)">
            <path
              d="M2.99109042,12 C1.34177063,12 0,13.3391568 0,14.9910904 L0,33.0089096 C0,34.6582294 1.33915679,36 2.99109042,36 L12,36 L25,48 L25,0 L12,12 L2.99109042,12 Z"
              id="Combined-Shape" stroke="#FFFFFF" stroke-width="2" />
            <rect id="Rectangle-70" fill="#FFFFFF" x="10" y="18" width="2" height="12" />
            <path d="M31,36 L31,36 C37.627417,36 43,30.627417 43,24 C43,17.372583 37.627417,12 31,12" id="Oval-11"
              stroke="#FFFFFF" stroke-width="2" />
            <path d="M31,46 L31,46 C43.1502645,46 53,36.1502645 53,24 C53,11.8497355 43.1502645,2 31,2"
              id="Oval-11-Copy" stroke="#FFFFFF" stroke-width="2" />
          </g>
        </g>
      </g>
    </g>
  </symbol>
</svg>
`;

const insertSpeakerSVG = `<svg class="speaker">
  <use href="#speaker"></use>
</svg>`;

const nextSVG = `
<svg display="none">
  <symbol viewBox="0 0 42 20" id="next">
  <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
        <g id="Incorrect" transform="translate(-579.000000, -494.000000)">
            <path d="M579,503 L579,505 L616.602063,505 L609.292893,512.292893 L610.707107,513.707107 L620.414214,504 L610.707107,494.292893 L609.292893,495.707107 L616.602063,503 L579,503 Z" id="Combined-Shape"/>
        </g>
    </g></symbol>
</svg>
`;

const insertNextSVG = `<svg class="next">
  <use href="#next"></use>
</svg>`;

export { answerIndicatorSVG, insertAnswerIndicatorSVG, speakerSVG, insertSpeakerSVG, nextSVG, insertNextSVG };
