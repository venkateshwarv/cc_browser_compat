export class BrowserChecker {
  private UA: string;
  constructor( userAgent: string ) {
    this.UA = userAgent
  }

  getBrowserWithVersion( ua: string ) {
    // var ua = navigator.userAgent;
    var match, browserString;
    // match edge first - Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136
    match = ua.match( /(edge.*?)$/i );
    if ( match && match[ 1 ] ) {
      browserString = match[ 1 ];
    } else {
      // match chrome
      match = ua.match( /(chrome.*?)\s/i );
      if ( match && match[ 1 ] ) {
        browserString = match[ 1 ];
      } else if ( ua.match( /Apple/i ) ) {
        match = ua.match( /((Version|Crios).*?)\s/i );
        if ( match && match[ 1 ] ) {
          browserString = match[ 1 ];
        }
      } else if ( ua.match( /firefox/i ) ) {
        match = ua.match( /(firefox.*)\s*/i )
        browserString = match[ 1 ];
      } else if ( ua.match( /windows/i ) ) {
        // ie 11 = 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0)'
        match = ua.match( /(rv.*?)\)*\s/ );
        if ( match && match[ 1 ] ) {
          browserString = match[ 1 ];
        } else {
          // "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; LCTE; Zoom 3.6.0; wbx 1.0.0)"
          match = ua.match( /(msie \d+)/i );
          if ( match && match[ 1 ] )
            browserString = match[ 1 ].replace( ' ', '/' );
        }
      }
    }
    return browserString;
  }

  isBrowserNotSupported() {
    let ua = this.UA;
    var browserwithVersion = this.getBrowserWithVersion( ua );
    if ( !browserwithVersion )
      return;
    if ( browserwithVersion.match( 'rv' ) ) {
      var match = browserwithVersion.match( /:(.*)/ );
      var ieVersion: string | number = match[ 1 ] && match[ 1 ].split( '.' )[ 0 ];
      if ( ieVersion ) {
        ieVersion = parseInt( ieVersion );
      }
      if ( ieVersion && ieVersion < 11 ) {
        return true;
      }
    } else {
      var browser = browserwithVersion.split( '/' );
      if ( browser.length < 2 ) {
        return false;
      }
      var browserName = browser[ 0 ];
      var version: string | number = browser[ 1 ].split( '.' )[ 0 ];
      if ( version ) {
        version = parseInt( version );
      }
      // console.log(browserwithVersion, browserName, version, typeof version);
      if ( browserName === 'Chrome' && version < 54 ) {
        return true;
      } else if ( browserName === 'Firefox' && version < 50 ) {
        return true;
      } else if ( browserName === 'Version' && version < 9 ) {
        return true;
      } else if ( browserName === 'Edge' && version < 13 ) {
        return true;
      } else if ( browserName === 'MSIE' ) {
        return true;
      }
    }
  }
}