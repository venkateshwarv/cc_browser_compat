import { ResultComponent } from './resultComponent';

export class ErrorMessage extends ResultComponent {
  constructor( message: string, showInfo: boolean ) {
    super( message, showInfo, [ 'error' ] );
  }
}