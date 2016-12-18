angular.module( 'sketcher', [
        'angular-p5'
    ] )
    .factory( 'Sketcher', [ 'p5', function( p5 ) {
        return function( p ) {
            var isDrawing,
                currentPath = [],
                img, canv, drawing = [], undo_btn, saveWBg_btn, saveNoBg_btn;

            p.preload = function() { // preload() runs once
                img = p.loadImage( 'temp.jpg' );
            }

            p.setup = function() {
                var w = img.width;
                var h = img.height;
                canv = p.createCanvas( w, h );

                // buttons
                undo_btn = p.createButton( 'Undo' );
                saveWBg_btn = p.createButton( 'Download Everything' );
                saveNoBg_btn = p.createButton( 'Download Sketch Only' );

                undo_btn.mousePressed( undo );
                saveWBg_btn.mousePressed( downloadSketch.bind( null, true ) );
                saveNoBg_btn.mousePressed( downloadSketch.bind( null, false ) );

                p.background( img );
                canv.mousePressed( setDrawing.bind( null, true ) );
                canv.mouseReleased( setDrawing.bind( null, false ) );
            };

            p.draw = function() {
                p.background( img );
                if ( isDrawing )
                    currentPath.push( {
                        x: p.mouseX,
                        y: p.mouseY
                    } );
                for ( var i = 0; i < drawing.length; i++ ) {
                    p.noFill();
                    p.stroke( 200, 0, 0 );
                    p.strokeWeight( 4 );
                    p.beginShape();
                    for ( var j = 0; j < drawing[ i ].length; j++ ) {
                        p.vertex( drawing[ i ][ j ].x, drawing[ i ][ j ].y );
                    }
                    p.endShape();
                }
            };

            function setDrawing( bool ) {
                if ( bool ) {
                    currentPath = [];
                    drawing.push( currentPath );
                }
                isDrawing = bool;
            }

            function undo() {
                drawing.pop();
            }

            function downloadSketch( withBackground ) {
                !withBackground && p.clear();
                for ( var i = 0; i < drawing.length; i++ ) {
                    p.noFill();
                    p.stroke( 200, 0, 0 );
                    p.strokeWeight( 4 );
                    p.beginShape();
                    for ( var j = 0; j < drawing[ i ].length; j++ ) {
                        p.vertex( drawing[ i ][ j ].x, drawing[ i ][ j ].y );
                    }
                    p.endShape();
                }
                p.saveCanvas( canv, 'myCanvas', 'png' );
            }
        }
    } ] )

