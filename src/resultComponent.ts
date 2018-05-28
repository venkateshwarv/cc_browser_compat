export class ResultComponent {
  private fallbackInfo = 'Your browser will fallback to WebSurvey-Compatibility mode. It is hosted at https://cx.getcloudcherry.com/fb/login.';

  constructor( private message: string, private showInfo: boolean, private classList: Array<string> ) {
  }

  buildResult() {
    let outerDiv = document.createElement( 'div' );

    outerDiv.classList.add( ...this.classList );

    let messageTitle = document.createElement( 'div' );

    messageTitle.classList.add( 'message-title' );
    messageTitle.innerHTML = this.message;
    outerDiv.appendChild( messageTitle );
    if ( this.showInfo ) {
      let info = document.createElement( 'div' );
      info.classList.add( 'message-info' );
      info.innerHTML = this.fallbackInfo;
      outerDiv.appendChild( info );
    }

    return outerDiv;
  }
}