/**
 * blah lets do this later?
 * @param  {[type]} [afterNavigation=null]          [description]
 * @param  {[type]} [beforeFinalNavigation=null]    [description]
 * @param  {[type]} [beforeNextNavigation=null]     [description]
 * @param  {[type]} [beforePrevsNavigation=null] [description]
 * @param  {[type]} [Comp=null]                     [description]
 * @param  {[type]} [css=null]                      [description]
 * @param  {[type]} [onError=null]                  [description]
 * @param  {[type]} }                               [description]
 * @return {[type]}                                 [description]
 */
export default function createStep ({
  afterNavigation = null,
  beforeFinalNavigation = null,
  beforeNextNavigation = null,
  beforePrevNavigation = null,
  cancelNextNavigation = null,
  cancelPrevNavigation = null,
  Comp = null,
  css = null,
  gotoStep = null,
  totalSteps = 100,
  id = String(Math.random() * totalSteps),
  onError = null
}) {
  return {
    afterNavigation,
    beforeFinalNavigation,
    beforeNextNavigation,
    beforePrevNavigation,
    cancelNextNavigation,
    cancelPrevNavigation,
    onError,
    css,
    Comp,
    gotoStep,
    id
  }
}
