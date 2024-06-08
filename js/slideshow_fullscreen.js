// -------------------------------------------------------------------------------------------
// Fullscreen Slideshow
//
// extends avia slideshow script with a more sophisticated preloader and fixed size for slider
// -------------------------------------------------------------------------------------------

(function($)
{
    "use strict";

	$.AviaFullscreenSlider = function(options, slider)
	{
		this.$slider  	= $( slider );
		this.$inner	  	= this.$slider.find('.avia-slideshow-inner');
		this.$innerLi	= this.$inner.find('>li');
		this.$caption 	= this.$inner.find('.avia-slide-wrap .caption_container');
		this.$win	  	= $( window );
		this.isMobile 	= $.avia_utilities.isMobile;
		this.isTouchDevice	= $.avia_utilities.isTouchDevice;
		this.mobile_no_animation = $( 'body' ).hasClass( 'avia-mobile-no-animations' );
		this.options	= {};
		this.property 	= {};
		this.scrollPos	= "0";
		this.transform3d = document.documentElement.className.indexOf('avia_transform3d') !== -1 ? true : false;
		this.ticking = false;

		if( $.avia_utilities.supported.transition === undefined )
		{
			$.avia_utilities.supported.transition = $.avia_utilities.supports('transition');
		}

		this._init( options );
	};

	$.AviaFullscreenSlider.defaults =
	{
		//height of the slider in percent
		height: 100,

		//subtract elements from the height
		subtract: '#wpadminbar, #header, #main>.title_container',

		// @since 5.0   only parallax works - fixed not (chrome and firefox) due to translate
		image_attachment: 'scroll',

		// enabled parallax flag
		parallax_enabled: true
	};

  	$.AviaFullscreenSlider.prototype =
    {
    	_init: function( options )
    	{
    		var _self = this,
				slideshow_options = this.$slider.data( 'slideshow-options' );

    		//set the default options
    		this.options = $.extend( true, {}, $.AviaFullscreenSlider.defaults, options );

			//	since 5.0 we render data attributes in a json string
			if( 'object' == typeof slideshow_options )
			{
				this.options.height = 'undefined' != typeof slideshow_options.slide_height ? slideshow_options.slide_height : this.options.height;
				this.options.image_attachment = 'undefined' != typeof slideshow_options.image_attachment ? slideshow_options.image_attachment : this.options.image_attachment;
			}
			else
			{
				if( this.$slider.data('slide_height') )
				{
					this.options.height = this.$slider.data('slide_height');
				}

				if( this.$slider.data('image_attachment') )
				{
					this.options.image_attachment = this.$slider.data('image_attachment');
				}
			}

			//if background attachment is set to fixed or scroll disable the parallax effect
			this.options.parallax_enabled = this.options.image_attachment == '' ? true : false;

			//elements that get subtracted from the image height
			this.$subtract = $( this.options.subtract );


			// set the slideshow size
			this._setSize();

			// set resizing script on window resize
			this.$win.on( 'debouncedresize',  this._setSize.bind( this ) );

			//parallax scroll if element if leaving viewport
			setTimeout( function()
			{
				if( _self.options.parallax_enabled )
    			{
					//	disable parallax scrolling on mobile
					if( ! _self.isMobile || ( _self.isMobile && ! this.mobile_no_animation ) )
					{
						_self.$win.on( 'scroll', _self._on_scroll.bind( _self ) );
					}
    			}
			}, 100 );

			//activate the defaule slider
			this.$slider.aviaSlider( {bg_slider:true} );
		},

    	_on_scroll: function(e)
    	{
	    	var _self = this;

	    	if( !_self.ticking )
			{
				_self.ticking = true;
				window.requestAnimationFrame( _self._parallaxRequest.bind( _self ) );
		    }
    	},

    	_fetch_properties: function(slide_height)
		{
			this.property.offset 	= this.$slider.offset().top;
			this.property.wh 		= this.$win.height();
			this.property.height 	= slide_height || this.$slider.outerHeight();

			//re-position the slider
			this._parallax_scroll();
		},

    	_setSize: function( )
    	{
    		if( ! $.fn.avia_browser_height )
    		{
				var viewport		= this.$win.height(),
					slide_height	= Math.ceil( ( viewport / 100 ) * this.options.height );

				if( this.$subtract.length && this.options.height == 100 )
				{
					this.$subtract.each( function()
					{
						slide_height -= this.offsetHeight - 0.5;
					});
				}
				else
				{
					slide_height -= 1;
				}

				this.$slider.height( slide_height ).removeClass('av-default-height-applied');
				this.$inner.css( 'padding', 0 );
    		}

    		this._fetch_properties( slide_height );
    	},

		_parallaxRequest: function( e )
		{
			//	https://stackoverflow.com/questions/47184298/why-is-it-recommend-to-nest-settimeout-in-requestanimationframe-when-scheduling
			var _self = this;
			setTimeout( _self._parallax_scroll.bind( _self ), 0 );
		},

    	_parallax_scroll: function(e)
    	{
			if( ! this.options.parallax_enabled )
			{
				return;
			}

			//disable parallax scrolling on mobile
			if( this.isMobile && this.mobile_no_animation )
			{
				return;
			}

    		var winTop 		= this.$win.scrollTop(),
    			winBottom	=  winTop + this.property.wh,
    			scrollPos 	= '0',
    			prop 		= {};

    		if(this.property.offset < winTop && winTop <= this.property.offset + this.property.height)
    		{
    			scrollPos = Math.round( ( winTop - this.property.offset ) * 0.3 );
    		}

    		if( this.scrollPos != scrollPos )
    		{
    			//slide background parallax
    			this.scrollPos = scrollPos;

    			if( this.transform3d )
    			{
    				prop[$.avia_utilities.supported.transition + "transform"] = "translate3d(0px," + scrollPos + "px,0px)";
    			}
    			else
    			{
    				prop[$.avia_utilities.supported.transition + "transform"] = "translate(0px," + scrollPos + "px)";
    			}

    			this.$inner.css(prop);

    			//slider caption parallax

				// prop2[$.avia_utilities.supported.transition+"transform"] = "translate(0px,-"+ ( scrollPos * 1) +"px)";
				/*
	    		prop2['opacity'] = Math.ceil((this.$slider.height() - (scrollPos * 2)) / 100)/ 10;
	    		prop2['opacity'] = prop2['opacity'] < 0 ? 0 : prop2['opacity'];
	    		this.$caption.css(prop2);
				*/
    		}

    		this.ticking = false;
    	}
    };

	$.fn.aviaFullscreenSlider = function( options )
	{
		return this.each(function()
		{
			var active = $.data( this, 'aviaFullscreenSlider' );

			if( ! active )
			{
				//make sure that the function doesnt get aplied a second time
				$.data( this, 'aviaFullscreenSlider', 1 );

				//create the preparations for fullscreen slider (this is slideshow and not section avia-fullscreen-slider !!)
				new $.AviaFullscreenSlider( options, this );
			}
		});
	};

})(jQuery);
