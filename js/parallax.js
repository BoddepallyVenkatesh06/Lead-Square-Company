"use strict";

var avia = window.avia || {};


avia.parallax = function ()
{
	//singelton
	if(avia.parallax.instance){ return avia.parallax.instance; }

	avia.parallax.instance = this;
	this.MediaQueryOptions = {

		'av-mini-':		'(max-width: 479px)',
		'av-small-':	'(min-width: 480px) and (max-width: 767px)',
		'av-medium-':	'(min-width: 768px) and (max-width: 989px)'
	};

	//all parallax elements
	this.elements = [];

	//run the event binding and therefore initialize parallax movement.
	this.bindEvents();
	return this;
};

avia.parallax.instance 	= false;
avia.parallax.prototype = {

	//blueprint for a single parallax element
	element: function( node , _self )
	{
		this.dom			= node;
		this.config			= node.dataset;
		this.scrollspeed	= parseFloat( this.config.parallax_speed || this.config.aviaParallaxRatio || 0 );
		this.translate		= {x: 0, y: 0, z: 0 };
		this.prev			= {top:0, left:0};
		this.rect			= {}; //positioning data of the element
		this.css			= (styles) => Object.assign(this.dom.style, styles);
		this.inViewport		= () =>
		{
			this.rect 			= this.dom.getBoundingClientRect();
			this.translate 		= this.getTranslateValues();

			return (
				this.rect.bottom - this.translate.y >= 0 && this.rect.right >= 0 &&
				this.rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
				this.rect.left <= (window.innerWidth || document.documentElement.clientWidth)
			);
		};
		this.update = ( force = false ) =>
		{
			if(! this.scrollspeed ) return;

			_self.do( function( el )
			{
				if( ! el.inViewport() && ! force ) return;

				var style 		= {};
				var newLeft   	= 0;
				var offsetTop	= window.scrollY + el.rect.top - el.translate.y;
				var newTop 		= (window.scrollY * -1 )  * el.scrollspeed;

				if (offsetTop > window.innerHeight )
				{
					//scroll calc for elements that start out of vieport
					//We do this so elements that start out of window do not get re-positioned without a scroll
					newTop = parseFloat( (el.rect.top - window.innerHeight - el.translate.y) * el.scrollspeed );
				}

				console.log(window.innerHeight + el.rect.height);
				if(Math.abs(newTop) > window.innerHeight + el.rect.height) return;

				if(newTop != el.translate.y)
				{
					style.transform = "translate3d( "+ newLeft +"px," + newTop + "px, 0px )";
					el.css( style );
				}
			}, this);
		};

		//https://zellwk.com/blog/css-translate-values-in-javascript/
		this.getTranslateValues = () =>
		{
			const matrix = window.getComputedStyle(this.dom).transform;

			if (matrix === 'none' || typeof matrix === 'undefined') return { x: 0, y: 0, z: 0 }

			const matrixType 	= matrix.includes('3d') ? '3d' : '2d';
			const matrixValues 	= matrix.match(/matrix.*\((.+)\)/)[1].split(', ');

			if (matrixType === '2d') { return { x: matrixValues[4], y: matrixValues[5], z: 0 } }
			if (matrixType === '3d') { return { x: matrixValues[12], y: matrixValues[13], z: matrixValues[14] }}
		};

		//force update el and set visible
		this.update();
		_self.showElement( () => this.dom.classList.add('active-parallax') );

		return this;
	},
	//end element blueprint

	//bind events
	bindEvents: function()
	{
		this.addListener( window , ['scroll'], this.updateElements );
		this.addListener( window , ['resize','orientationchange','load','av-height-change'], this.updateElements  );
		this.addListener( document.body , ['av_resize_finished'], this.updateElements, true);
	},

	addListener: function( target, events, func, args = false)
	{
		for (var i  = 0, ev; ev = events[i]; i++)
		{
			target.addEventListener(ev, func.bind( this , args ),  { passive: true }  );
		}
	},

	//reveal image without jitter
	showElement: function( func )
	{
		if (document.readyState === 'complete') { func() } else { window.addEventListener( "load" , func ) }
  	},

	//add new parallax elements
	addElements: function( selector )
	{
		for (var i  = 0, item; item = document.querySelectorAll( selector )[i]; i++)
		{
			this.elements.push( new this.element( item , this ) );
		}
	},

	//iterate over all elements and run their update script on scroll
	updateElements: function(force, e)
	{
		for (var i  = 0, element; element = this.elements[i]; i++)
		{
			element.update(force);
		}
	},

	//generic wrapper for everything that access or manipulates the DOM
	//https://firefox-source-docs.mozilla.org/performance/bestpractices.html
	do: function( callback , args , delay = 0)
	{
		requestAnimationFrame(() => { setTimeout(() => callback.call(this, args) , delay); });
	},
};



(function($){

	//add ?new-parllax to the url to test. remove in production
	if(!window.location.search.includes('new-parallax')) { return; }

	var parallax = new avia.parallax();

	parallax.addElements('.av-parallax-object');


})(jQuery);
