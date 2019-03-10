/*
	sys244.js
*/
(function( global ){
	'use strict';

	if( !('Sys244' in global) )
	{
		// URLのパラメーター部分をkey:valueの連想配列にして返す
		function getURLParameter( target_key=null ){
			var arg, pair, i, values;
			arg = new Object; // 連想配列に取り込む
			pair = location.search.substring( 1 ).split( '&' );
			// location.search.substring(1)は、URLから最初の1文字 (?記号) を除いた文字列を取得する

			for( i = 0; pair[i]; i++ ){
				values = pair[i].split( '=' );
				if( target_key && target_key === values[0] ){
					return values[1];
				}
				arg[values[0]] = values[1];
			}

			if( key_value ){
				return null;
			}
			return arg;
		}

		global.Sys244 = {
			getURLParameter: getURLParameter,
		};

		// private variables
		let	bLButtonHolding_	= false,
			bResizeing_			= false,
			listResizeListener_	= [];

		// mouse down
		function mousedown( event ){
			if( !bLButtonHolding_ && event.button === 0 ){ // 左ボタン
				bLButtonHolding_ = true;
			}
		}
		global.addEventListener( 'mousedown', mousedown, false );

		// mouse up
		function mouseup( event ){
			if( bLButtonHolding_ && event.button === 0 ){
				bLButtonHolding_ = false;
			}
		}
		global.addEventListener( 'mouseup', mouseup, false );

	}
}( this ));

/*
	要素を表示する
*/
function display_switch( id )
{
	elm = document.getElementById( id );
	style = elm.currentStyle || document.defaultView.getComputedStyle(elm, '');
	if ( style.display == "none" ) {
		elm.style.display = "block";
	}
	else {
		elm.style.display = "none";
	}
}

/*
	フォームからファイルを受け取る
*/
// Check for the various File API support.
function testFileAPI()
{
	if ( !(window.File && window.FileReader && window.FileList && window.Blob) ) {
		alert('The File APIs art not fully supported in this browser.');
		return false;
	}
	return true;
}

function recive_file( id, reciver )
{
	var elm = document.getElementById( id );
	elm.addEventListener( "change", function( evt ) {
		var file = evt.target.files;
		var reader = new FileReader();
		reader.readAsText( file[0] );
		reader.onload = function( ev ) {
			reciver = reader.result;
		}
	}, false );
}
