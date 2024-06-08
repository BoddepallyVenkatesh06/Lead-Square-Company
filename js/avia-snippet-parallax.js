/*
 * Parallax Support
 * @since 5.0			added
 */
(function($)
{
	"use strict";

	$.avia_utilities = $.avia_utilities || {};

    $( function()
    {
		//activate parallax scrolling for background images (sections) and objects.
    	if( $.fn.avia_parallax )
		{
			$( '.av-parallax,.av-parallax-object' ).avia_parallax();
		}
	});

	/**
	 * Object Parallax scrolling feature
	 *
	 *		- horizontal or vertical parallax for objects like images with responsive support
	 *		- background image parallax (up to 5.0 handled by $.AviaParallaxElement) - was used for sections
	 *
	 * @since 5.0
	 * @param {} options
	 * @param {} element
	 */
	var AviaObjectParallaxElement = function( options, element )
	{
		//	do not use in old browsers that do not support this CSS
		if( ! ( this.transform || this.transform3d ) )
		{
			return;
		}

		this.options = $.extend( {}, options );
		this.win = $( window );
		this.body = $( 'body' );
		this.isMobile = $.avia_utilities.isMobile,		//	not defined in constructor
		this.winHeight = this.win.height();
		this.winWidth = this.win.width();
		this.el = $( element ).addClass( 'active-parallax' );
		this.objectType = this.el.hasClass( 'av-parallax-object' ) ? 'object' : 'background-image';
		this.elInner = this.el;							//	container to use for parallax calculation - may be smaller than element e.g. due to position rules
		this.elBackgroundParent = this.el.parent();		//	parent container when 'background-image' parallax
		this.elParallax = this.el.data( 'parallax' ) || {};
		this.direction = '';
		this.speed = 0.5;
		this.elProperty = {};
		this.ticking = false,
		this.isTransformed = false;						//	needed for responsive to reset transform when no parallax !!!

		//	set the browser transition string
		if( $.avia_utilities.supported.transition === undefined )
		{
			$.avia_utilities.supported.transition = $.avia_utilities.supports( 'transition' );
		}

		this._init( options );
	};

	AviaObjectParallaxElement.prototype =
	{
		mediaQueries: {
				'av-mini-':		'(max-width: 479px)',
				'av-small-':	'(min-width: 480px) and (max-width: 767px)',
				'av-medium-':	'(min-width: 768px) and (max-width: 989px)',
				'av-desktop-':	'(min-width: 990px)'
		   },

		transform:			document.documentElement.className.indexOf( 'avia_transform' ) !== -1,
		transform3d:		document.documentElement.className.indexOf( 'avia_transform3d' ) !== -1,
		mobileNoAnimation:	$( 'body' ).hasClass( 'avia-mobile-no-animations' ),
		defaultSpeed:		0.5,
		defaultDirections:	[ 'bottom_top', 'left_right', 'right_left', 'no_parallax' ],
		transformCSSProps:	[ 'transform', '-webkit-transform', '-moz-transform', '-ms-transform', '-o-transform' ],
		matrixDef:			[ 1, 0, 0, 1, 0, 0 ],
		matrix3dDef:		[ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],

		_init: function()
		{
			var _self = this;

			//	select inner container if necessary for positioning
			if( typeof this.el.data( 'parallax-selector') != 'undefined' && this.el.data( 'parallax-selector') !== '' )
			{
				this.elInner = this.el.find( this.el.data( 'parallax-selector' ) );
				if( this.elInner.length == 0 )
				{
					this.elInner = this.el;
				}
			}

			if( 'background-image' == this.objectType )
			{
				//	shortcut and exit
				if( this.isMobile && this.mobileNoAnimation )
				{
					return;
				}

				//	by default we slow down
				this.elParallax.parallax = 'bottom_top';
				this.elParallax.parallax_speed = parseFloat( this.el.data( 'avia-parallax-ratio' ) ) || 0.5;
			}

			//fetch window constants
			setTimeout( function()
			{
				_self._fetchProperties();
			}, 30 );

			this.win.on( 'debouncedresize av-height-change', _self._fetchProperties.bind( _self ) );
			this.body.on( 'av_resize_finished', _self._fetchProperties.bind( _self ) );

			//activate the scrolling
			setTimeout( function()
			{
				_self.win.on( 'scroll', _self._onScroll.bind( _self ) );
			}, 100 );
		},

		_setParallaxProps: function()
		{
			if( 'background-image' == this.objectType )
			{
				this.direction = this.elParallax.parallax;
				this.speed = this.elParallax.parallax_speed;
				return;
			}

			var all_direction = this.elParallax.parallax || '',
				all_speed = this.elParallax.parallax_speed || '',
				resp_direction = '',
				resp_speed = '',
				media = 'all';

			if( this.defaultDirections.indexOf( all_direction ) < 0 )
			{
				all_direction = 'no_parallax';
			}

			if( typeof window.matchMedia == 'function' )
			{
				$.each( this.mediaQueries, function( key, query )
				{
					var mql = window.matchMedia( query );
					if( mql.matches )
					{
						media = key;
						return false;
					}
				});
			}

			if( 'all' == media )
			{
				this.direction = all_direction;
				this.speed = '' == all_speed ? this.defaultSpeed : parseFloat( all_speed ) / 100.0;
				return;
			}

			resp_direction = this.elParallax[ media + 'parallax' ] || '';
			resp_speed = this.elParallax[ media + 'parallax_speed' ] || '';

			if( 'inherit' == resp_direction )
			{
				resp_direction = all_direction;
				resp_speed = all_speed;
			}

			if( this.defaultDirections.indexOf( resp_direction ) < 0 )
			{
				resp_direction = 'no_parallax';
			}

			this.direction = resp_direction;
			this.speed = '' == resp_speed ? this.defaultSpeed : parseFloat( resp_speed ) / 100.0;
		},

		_getTranslateObject: function( element )
		{
			//	https://zellwk.com/blog/css-translate-values-in-javascript/
			//	This function might not work properly if stacked transform operations are used - this is a limitation
			var translate = {
						type:	'',
						matrix: [],
						x:		0,
						y:		0,
						z:		0
					};

			$.each( this.transformCSSProps, function( i, prop )
			{
				var found = element.css( prop );

				if( 'string' != typeof found || 'none' == found )
				{
					return;
				}

				if( found.indexOf( 'matrix' ) >= 0 )
				{
					var matrixValues = found.match( /matrix.*\((.+)\)/)[1].split( ', ' );

					if( found.indexOf( 'matrix3d' ) >= 0 )
					{
						translate.type = '3d';
						translate.matrix = matrixValues;

						//	3d have 16 values
						translate.x = matrixValues[12];
						translate.y = matrixValues[13];
						translate.z = matrixValues[14];
					}
					else
					{
						translate.type = '2d';
						translate.matrix = matrixValues;

						//	2d have 6 values
						translate.x = matrixValues[4];
						translate.y = matrixValues[5];
					}

					return false;
				}
				else
				{
					translate.type = '';

					// translateX
					var matchX = found.match( /translateX\((-?\d+\.?\d*px)\)/ );
					if( matchX )
					{
						translate.x = parseInt( matchX[1], 10 );
					}

					// translateY
					var matchY = found.match( /translateY\((-?\d+\.?\d*px)\)/ );
					if( matchY )
					{
						translate.y = parseInt( matchY[1], 10 );
					}
				}
			});

			return translate;
		},

		_getTranslateMatrix: function( translateObj, changes )
		{
			//	matrix( a, b, c, d, tx, ty )
			//	matrix3d( a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, tx, ty, 0, 1 )
			var matrix = '';

			$.each( changes, function( key, value )
			{
				translateObj[key] = value;
			});

			if( this.transform3d )
			{
				var matrix3d = this.matrix3dDef.slice( 0 );

				switch( translateObj.type )
				{
					case '2d':
						//	2d have 6 values
						matrix3d[0] = translateObj.matrix[0];
						matrix3d[1] = translateObj.matrix[1];
						matrix3d[4] = translateObj.matrix[2];
						matrix3d[5] = translateObj.matrix[3];
						matrix3d[12] = translateObj.x;
						matrix3d[13] = translateObj.y;
						break;
					case '3d':
						//	3d have 16 values
						matrix3d = translateObj.matrix.slice( 0 );
						matrix3d[12] = translateObj.x;
						matrix3d[13] = translateObj.y;
						matrix3d[14] = translateObj.z;
						break;
					default:
						matrix3d[12] = translateObj.x;
						matrix3d[13] = translateObj.y;
						break;
				}

				matrix = 'matrix3d(' + matrix3d.join( ', ' ) + ')';
			}
			else if( this.transform )
			{
				var matrix2d = this.matrixDef.slice( 0 );

				switch( translateObj.type )
				{
					case '2d':
						//	2d have 6 values
						matrix2d = translateObj.matrix.slice( 0 );
						matrix2d[4] = translateObj.x;
						matrix2d[5] = translateObj.y;
						break;
					case '3d':		//	fallback only
						//	3d have 16 values
						matrix2d[0] = translateObj.matrix[0];
						matrix2d[1] = translateObj.matrix[1];
						matrix2d[2] = translateObj.matrix[4];
						matrix2d[3] = translateObj.matrix[5];
						matrix2d[4] = translateObj.x;
						matrix2d[5] = translateObj.y;
						break;
					default:
						matrix2d[4] = translateObj.x;
						matrix2d[5] = translateObj.y;
						break;
				}

				matrix = 'matrix(' + matrix2d.join( ', ' ) + ')';
			}

			return matrix;
		},

		_fetchProperties: function()
		{
			this._setParallaxProps();

			//	unset any added transform styles to get real CSS position before apply parallax transforms again
			this.el.css( $.avia_utilities.supported.transition + 'transform', '' );

			//	cache values that only change on resize of viewport
			this.winHeight = this.win.height();
			this.winWidth = this.win.width();

			if( 'background-image' == this.objectType )
			{
				//	special case where we have a div with background image
				this.elProperty.top = this.elBackgroundParent.offset().top;
				this.elProperty.height = this.elBackgroundParent.outerHeight();

				//	set the height of the element based on the windows height, offset ratio and parent height
				this.el.height( Math.ceil( ( this.winHeight * Math.abs( this.speed ) ) + this.elProperty.height ) );
			}
			else
			{
				this.elProperty.top = this.elInner.offset().top;
				this.elProperty.left = this.elInner.offset().left;
				this.elProperty.height = this.elInner.outerHeight();
				this.elProperty.width = this.elInner.outerWidth();
				this.elProperty.bottom = this.elProperty.top + this.elProperty.height;
				this.elProperty.right = this.elProperty.left + this.elProperty.width;

				this.elProperty.distanceLeft = this.elProperty.right;
				this.elProperty.distanceRight = this.winWidth - this.elProperty.left;
			}

			//	Save original position of element relative to container
			this.elProperty.translateObj = this._getTranslateObject( this.el );

			//re-position the element
			this._parallaxScroll();
		},

		_onScroll: function( e )
		{
			var _self = this;

			if( ! _self.ticking )
			{
				_self.ticking = true;
				window.requestAnimationFrame( _self._parallaxRequest.bind( _self ) );
			}
		},

		_inViewport: function( elTop, elRight, elBottom, elLeft, winTop, winBottom, winLeft, winRight )
		{
			//	add a few pixel to be on safe side
			return ! ( elTop > winBottom + 10 || elBottom < winTop - 10 || elLeft > winRight + 10 || elRight < winLeft - 10 );
		},

		_parallaxRequest: function( e )
		{
			//	https://stackoverflow.com/questions/47184298/why-is-it-recommend-to-nest-settimeout-in-requestanimationframe-when-scheduling
			var _self = this;
			setTimeout( _self._parallaxScroll.bind( _self ), 0 );
		},

		_parallaxScroll: function( e )
		{
			//	shortcut
			if( ( 'no_parallax' == this.direction || '' == this.direction ) && ! this.isTransformed )
			{
				this.ticking = false;
				return;
			}

			var winTop = this.win.scrollTop(),
				winLeft = this.win.scrollLeft(),
				winRight = winLeft + this.winWidth,
				winBottom = winTop + this.winHeight,
				scrollPos = 0,
				matrix = '';

			//	special case where we have a div with background image - 'bottom_top'
			if( 'background-image' == this.objectType )
			{
				//	shift element when it moves into viewport
				if( this.elProperty.top < winBottom && winTop <= this.elProperty.top + this.elProperty.height )
				{
					scrollPos = Math.ceil( ( winBottom - this.elProperty.top ) * this.speed );
					matrix = this._getTranslateMatrix( this.elProperty.translateObj, { y: scrollPos } );

					this.el.css( $.avia_utilities.supported.transition + 'transform', matrix );
				}

				this.ticking = false;
				return;
			}

			//	reset and shortcut
			if( ( 'no_parallax' == this.direction || '' == this.direction ) )
			{
				matrix = this._getTranslateMatrix( this.elProperty.translateObj, { x: 0, y: 0  } );
				this.el.css( $.avia_utilities.supported.transition + 'transform', matrix );

				this.ticking = false;
				this.isTransformed = false;
				return;
			}

			//	Get current coordinates for element
			var scroll_px_toTop = Math.ceil( this.elProperty.top - winTop ),
				scroll_px_el = Math.ceil( winBottom - this.elProperty.top ),
				scrolled_pc_toTop = 0,
				reduceDistanceX = 0,
				transform = { x: 0, y: 0 };

			//	if element is initially in viewport on unscrolled screen we leave it and reduce distance to move
			if( this.elProperty.top < this.winHeight )
			{
				reduceDistanceX = Math.ceil( this.winHeight - this.elProperty.top );
			}

			//	Calculate transform value
			if( this.elProperty.top > winBottom )
			{
				// element below viewport
				scrolled_pc_toTop = 0;
				scroll_px_el = 0;
			}
			else
			{
				//	container is inside viewport or above ( scroll_px_toTop is negative)
				scrolled_pc_toTop = 1 - ( scroll_px_toTop + reduceDistanceX ) / this.winHeight;
			}

			switch( this.direction )
			{
				case 'bottom_top':
					scrollPos = Math.ceil( ( scroll_px_el - reduceDistanceX ) * this.speed );
					transform.y = -scrollPos;
					matrix = this._getTranslateMatrix( this.elProperty.translateObj, { y: -scrollPos } );
					break;
				case 'left_right':
					scrollPos = Math.ceil( this.elProperty.distanceRight * scrolled_pc_toTop * this.speed );
					transform.x = scrollPos;
					matrix = this._getTranslateMatrix( this.elProperty.translateObj, { x: scrollPos } );
					break;
				case 'right_left':
					scrollPos = Math.ceil( this.elProperty.distanceLeft * scrolled_pc_toTop * this.speed );
					transform.x = -scrollPos;
					matrix = this._getTranslateMatrix( this.elProperty.translateObj, { x: -scrollPos } );
					break;
				default:
					break;
			}

			var elInViewport = this._inViewport( this.elProperty.top, this.elProperty.right, this.elProperty.bottom, this.elProperty.left, winTop, winBottom, winLeft, winRight ),
				transformedInViewport = this._inViewport( this.elProperty.top + transform.y, this.elProperty.right + transform.x, this.elProperty.bottom + transform.y, this.elProperty.left + transform.x, winTop, winBottom, winLeft, winRight );

			if( elInViewport || transformedInViewport )
			{
				this.el.css( $.avia_utilities.supported.transition + 'transform', matrix );
			}

			this.ticking = false;
			this.isTransformed = true;
		}
	};

	/**
	 * Wrapper to avoid double initialization of object
	 *
	 * @param {} options
	 */
	$.fn.avia_parallax = function( options )
	{

//		if( window.location.search.includes('new-parallax') ) //for testing 2 versions in 2 browser windows
//		{
//			return this;
//		}

		return this.each( function()
		{
			var obj = $( this );
			var self = obj.data( 'aviaParallax' );

			if( ! self )
			{
				self = obj.data( 'aviaParallax', new AviaObjectParallaxElement( options, this ) );
			}
		});
	};

})( jQuery );
