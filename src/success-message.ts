import { ResultComponent } from './resultComponent';

export class SuccessMessage extends ResultComponent {
  constructor( message: string ) {
    super( message, false, [ 'success' ] );
  }
}