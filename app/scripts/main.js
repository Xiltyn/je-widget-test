(function () {
  let jQuery;
  let google;

  if ( window.google === undefined ) {
    const script_tag = document.createElement( 'script' );
    script_tag.setAttribute( "type", "text/javascript" );
    script_tag.setAttribute( "src",
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA4WORQSUHJm14zZiaN67sgCk6g62JeQ6c&libraries=places,visualization" );
    if ( script_tag.readyState ) {
      script_tag.onreadystatechange = function () { // For old versions of IE
        if ( this.readyState === 'complete' || this.readyState === 'loaded' ) {
          console.log( script_tag.readyState );
        }
      };
    }
    else { // Other browsers
      script_tag.onload = mapsLoadHandler;
    }
    (document.getElementsByTagName( "head" )[ 0 ] || document.documentElement).appendChild( script_tag );
  }

  if ( window.jQuery === undefined || window.jQuery.fn.jquery !== '2.1.1' ) {
    const script_tag = document.createElement( 'script' );
    script_tag.setAttribute( "type", "text/javascript" );
    script_tag.setAttribute( "src",
      "http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js" );
    if ( script_tag.readyState ) {
      script_tag.onreadystatechange = function () { // For old versions of IE
        if ( this.readyState === 'complete' || this.readyState === 'loaded' ) {
          scriptLoadHandler();
        }
      };
    }
    else { // Other browsers
      script_tag.onload = scriptLoadHandler;
    }
    (document.getElementsByTagName( "head" )[ 0 ] || document.documentElement).appendChild( script_tag );
  }
  else {
    jQuery = window.jQuery;
    main(); //our main JS functionality
  }

  function scriptLoadHandler() {
    jQuery = window.jQuery.noConflict( true );

    main(); //our main JS functionality
  }

  function mapsLoadHandler() {
    google = window.google;

    console.log(google.maps)
  }

  function main() {
    jQuery( document ).ready( function ( $ ) {

      function getSyncScriptParams() {
        const scriptName = document.getElementById( 'widget-sdk' );

        console.log(scriptName)

        return {
          lang : scriptName.getAttribute('data-lang'),
          location : scriptName.getAttribute('data-location')
        };
      }

      //setup consts
      const baseURL = './../';

      const css_link = $( "<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: baseURL + "styles/main.css"
      } );

      const $container = $( '#widget' );

      //inject CSS required for widget
      css_link.appendTo( 'head' );

      const lang = getSyncScriptParams().lang;
      const place = getSyncScriptParams().location;

      $container.append( "<div class='widget-wrapper'> Here we'll have our widget for " + place + " in " + lang + "</div>" );


    } )
  }


})();
