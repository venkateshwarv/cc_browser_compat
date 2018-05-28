import { BrowserChecker } from './browsercheck';
import { SuccessMessage } from './success-message';
import { ErrorMessage } from './error-message';
import { validate, setUpEvents } from './utils';
import { ResultComponent } from './resultComponent';
import { UNSUPPORTED, SUPPORTED } from './copy';
import './styles/style.scss';

function init() {
  let userAgent = window.navigator.userAgent;
  let isAuto = true;
  validate( userAgent, isAuto );
  return;
};

init();

setUpEvents();




