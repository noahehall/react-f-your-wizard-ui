import React from 'react';
import { createStep } from 'react-f-your-wizard-ui';

/**
 * Default steps to demo Wizard Component
 * @constructor
 */
export default [
    createStep({
      Comp: (
        <div id='step-one'>
          <h1> Step One </h1>
          <div style={{ textAlign: 'center'}}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/I4qM33A2OH8" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
          </div>
        </div>
      ),
      css: (`
        #step-one {
          background-color: black;
          color: white;
          height: 400px;
        }
      `),
      afterNavigation: () => alert('This callback is run 100ms after navigation is complete, perfect for syncing with a backend or showing instructions'),
      beforeNextNavigation: () => alert('before forward navigation, you have the opportunity to validate, inject, and destroy!'),
      beforePrevNavigation: () => alert('before backward navigation you inject logic to control the user flow and experience'),
      beforeFinalNavigation: () => alert('this is your last chance to to control the user flow before navigation continues to the next (forward or backward) step'),
      cancelNextNavigation: () => window.confirm('Click OK to cancel navigation, maybe you want the user behave in a certain way before they can navigate from this step?'),

    }),
    createStep({
      Comp: (
        <div id='step-two'>
          Alittle magic for step two!
          How about primer.ai! ? #mind-blooown
        <br />
          <iframe width='98%' height='800px' src="https://primer.ai"></iframe>
        </div>

      ),
      beforeNextNavigation: () => alert('The previous click demonsrates navigation to any step via index  (we used 0 to return to the beginning)'),
      gotoStep: () => 0,
    }),
]
