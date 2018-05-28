import { BrowserChecker } from './browsercheck';
import { SuccessMessage } from './success-message';
import { ErrorMessage } from './error-message';
import { UNSUPPORTED, SUPPORTED, NOINPUT, AUTO, MANUAL } from './copy';

export function setUpEvents() {
  let button = document.querySelector( 'button.check' );
  let checkBrowser = () => {
    manualValidation();
  };
  if ( button ) {
    button.addEventListener( 'click', checkBrowser );
  }
}
export function manualValidation() {
  let input = document.querySelector( 'textarea.input' )
  let userAgent: string = ( <any>input ).value;
  validate( userAgent );
}

export function validate( userAgent: string, isAuto = false ) {
  let resultContainer = document.querySelector( '.result' );
  let resultComponent = buildResult( userAgent, isAuto );
  resultContainer.innerHTML = '';
  resultContainer.appendChild( resultComponent.buildResult() );
}

export function buildResult( userAgent: string, isAuto: boolean ) {
  if ( !userAgent ) {
    return new ErrorMessage( NOINPUT, false );
  } else {
    let browserCheck = new BrowserChecker( userAgent );
    if ( browserCheck.isBrowserNotSupported() ) {
      let showInfo = true;
      return new ErrorMessage( `${ isAuto ? AUTO : MANUAL }${ UNSUPPORTED }`, showInfo );
    } else {
      return new SuccessMessage( `${ isAuto ? AUTO : MANUAL }${ SUPPORTED }` );
    }
  }
}