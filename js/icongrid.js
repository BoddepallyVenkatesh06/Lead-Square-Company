(function($)
{
	"use strict";

	// -------------------------------------------------------------------------------------------
	// Icongrid shortcode javascript
	// -------------------------------------------------------------------------------------------

	$.fn.avia_sc_icongrid = function(options)
	{
		return this.each( function()
		{
			var icongrid_container = $( this ),
				icongrid = icongrid_container.find( '.avia-icongrid' ),
				icongrid_cards = icongrid.find( '.av-icon-cell-item' ),
				icongrid_id = '#' + icongrid.attr( 'id' ),
				min_height = icongrid_container.data( 'min-height' ),
				methods = {};

			icongrid_cards.on( 'touchend', function( e )
			{
				var current = $(this),
					container = current.closest( '.avia-icongrid' );

				if( current.hasClass( 'avia-hover' ) )
				{
					container.find( '.av-icon-cell-item' ).removeClass( 'avia-hover' );
				}
				else
				{
					container.find( '.av-icon-cell-item' ).removeClass( 'avia-hover' );
					current.addClass( 'avia-hover' );
				}

				var links = current.find( 'a' );

				if( links.length > 0 )
				{
					links.off( 'touchend.aviaIconGridLink' ).on( 'touchend.aviaIconGridLink', function( e )
					{
						e.preventDefault();

						var link = $( this ),
							container = link.closest( '.av-icon-cell-item' );

						if( ! container.hasClass( 'avia-hover' ) )
						{
							return;
						}

						e.stopImmediatePropagation();

						link.css( 'opacity', 0.5 );

						window.location.href = link.attr( 'href' );
					});
				}

				e.preventDefault();
				e.stopImmediatePropagation();
			});

			if( icongrid.hasClass( 'avia_flip_force_close' ) )
			{
				$( 'body' ).on( 'touchend', function( e )
				{
					var flipboxes = $( '.avia-icongrid.avia_flip_force_close' );
					flipboxes.each( function()
					{
						var flipbox = $( this );

						flipbox.find( '.av-icon-cell-item' ).removeClass( 'avia-hover' );
					});
				});
			}

			methods =
			{
				buildIconGrid: function ()
				{
					this.setMinHeight( $( icongrid_id + ' li article' ) );
				},

				setMinHeight: function (els)
				{
					if( els.length < 2 )
					{
						return;
					}

					var elsHeights = new Array(),
						front = [],
						back = [];

					els.css( 'min-height', '0' ).each( function (i)
					{
						var current = $(this);

						if( icongrid.hasClass( 'avia-icongrid-flipbox' ) )
						{
							front = current.find( '.avia-icongrid-front .avia-icongrid-inner' );
							back = current.find( '.avia-icongrid-flipback .avia-icongrid-inner' );
						}
						else
						{
							front = current.find( '.avia-icongrid-front .avia-icongrid-inner' );
							back = current.find( '.avia-icongrid-content' );

							//	needed for reverse columns
							elsHeights.push( current.outerHeight( true ) );
						}

						if( front.length )
						{
							elsHeights.push( front.outerHeight( true ) );
						}

						if( back.length )
						{
							elsHeights.push( back.outerHeight( true ) );
						}
					});

					if( 'undefined' != typeof( min_height ) )
					{
						var i = parseInt( min_height );
						if( ! isNaN( i ) )
						{
							elsHeights.push( i );
						}
					}

					var largest = Math.max.apply( null, elsHeights );
					els.css( 'min-height', largest );

					if( icongrid.hasClass( 'avia-icongrid-tooltip' ) )
					{
						var elWidth = els.first().outerWidth( true );
						if( largest > elWidth )
						{
							els.css( 'min-height', elWidth );
						}
					}
				}
			};

			methods.buildIconGrid();

			$(window).on( 'debouncedresize', function()
			{
				methods.buildIconGrid();
			});
		});
	};

}(jQuery));
