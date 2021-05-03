/**
 * Full page
 */

	'use strict';
	
	/**
	 * Full scroll main function
	 */
	var fullScroll = function (params) {
		/**
		 * Main div
		 * @type {Object}
		 */
		var main = document.getElementById(params.mainElement);
		
		/**
		 * Sections divclass
		 * @type {Array}
		 */
		var sections = main.getElementsByClassName('section');
		
		/**
		 * Full page scroll configurations
		 * @type {Object}
		 */
		var defaults = {
			container : main,
			sections : sections,
			animateTime : params.animateTime || 0.7,
			animateFunction : params.animateFunction || 'ease',
			maxPosition: sections.length - 1,
			currentPosition: 0,
			displayDots: typeof params.displayDots != 'undefined' ? params.displayDots : true,
			dotsPosition: params.dotsPosition || 'left'
		};

		this.defaults = defaults;
		/**
		 * Init build
		 */
		this.init();
	};

	/**
	 * Init plugin
	 */
	fullScroll.prototype.init = function () {
		this.buildPublicFunctions()
			.buildSections()
			.buildDots()
			.addEvents();

		var anchor = location.hash.replace('#', '').split('/')[0];
		location.hash = 0;
		this.changeCurrentPosition(anchor);
		this.registerIeTags();
	};

	/**
	 * Build sections
	 * @return {Object} this(fullScroll)
	 */
	fullScroll.prototype.buildSections = function () {
		var sections = this.defaults.sections;
		for (var i = 0; i < sections.length; i++) {
			sections[i].setAttribute('data-index', i);
		}
		return this;
	};

	/**
	 * Build dots navigation
	 * @return {Object} this (fullScroll)
	 */
	fullScroll.prototype.buildDots = function () {		
		this.ul = document.createElement('ul');
		
		this.ul.className = this.updateClass(1, 'dots', this.ul.className);
		this.ul.className = this.updateClass(1, this.defaults.dotsPosition == 'right' ? 'dots-right' : 'dots-left', this.ul.className);

		var _self = this;
		var sections = this.defaults.sections;		

		for (var i = 0; i < sections.length; i++) {
			var li = document.createElement('li');
			var a = document.createElement('a');
		
			a.setAttribute('href', '#' + i);			
			li.appendChild(a);
			_self.ul.appendChild(li);
		}

		this.ul.childNodes[0].firstChild.className = this.updateClass(1, 'active', this.ul.childNodes[0].firstChild.className);

		if (this.defaults.displayDots) {
			document.body.appendChild(this.ul);
		}

		return this;
	};

	/**
	 * Add Events
	 * @return {Object} this(fullScroll)
	 */
	fullScroll.prototype.addEvents = function () {
		
		if (document.addEventListener) {
			document.addEventListener('mousewheel', this.mouseWheelAndKey, false);
			document.addEventListener('wheel', this.mouseWheelAndKey, false);
			document.addEventListener('keyup', this.mouseWheelAndKey, false);
			document.addEventListener('touchstart', this.touchStart, false);
			document.addEventListener('touchend', this.touchEnd, false);
			window.addEventListener("hashchange", this.hashChange, false);

			/**
			 * Enable scroll if decive don't have touch support
			 */
			if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				if(!('ontouchstart' in window)){
					document.body.style = "overflow: scroll;";
					document.documentElement.style = "overflow: scroll;";
				}
			}			

		} else {
			document.attachEvent('onmousewheel', this.mouseWheelAndKey, false);
			document.attachEvent('onkeyup', this.mouseWheelAndKey, false);
		}
		
		return this;
	};	

	/**
	 * Build public functions
	 * @return {[type]} [description]
	 */
	fullScroll.prototype.buildPublicFunctions = function () {
		var mTouchStart = 0;
		var mTouchEnd = 0;
		var _self = this;

		this.mouseWheelAndKey = function (event) {
			if (event.deltaY > 0 || event.keyCode == 40) {	
				_self.defaults.currentPosition ++;
				_self.changeCurrentPosition(_self.defaults.currentPosition);				
			} else if (event.deltaY < 0 || event.keyCode == 38) {
				_self.defaults.currentPosition --;
				_self.changeCurrentPosition(_self.defaults.currentPosition);	
			}
			_self.removeEvents();
		};

		this.touchStart = function (event) {
			mTouchStart = parseInt(event.changedTouches[0].clientY);
			mTouchEnd = 0;
		};

		this.touchEnd = function (event) {
			mTouchEnd = parseInt(event.changedTouches[0].clientY);
			if (mTouchEnd - mTouchStart > 10 || mTouchStart - mTouchEnd > 10) {
				if (mTouchEnd > mTouchStart) {
					_self.defaults.currentPosition --;
				} else {
					_self.defaults.currentPosition ++;					
				}
				_self.changeCurrentPosition(_self.defaults.currentPosition);
			}			
		};

		this.hashChange = function (event) {
			if (location) {
				var anchor = location.hash.replace('#', '').split('/')[0];
				if (anchor !== "") {
					if (anchor < 0) {
						_self.changeCurrentPosition(0);
					} else if (anchor > _self.defaults.maxPosition) {
						_self.changeCurrentPosition(_self.defaults.maxPosition);
					} else {
						_self.defaults.currentPosition = anchor;
						_self.animateScroll();
						_self.presentation(anchor);
					}
					
					// if (anchor == 0) {
					// 	console.log(`got section ${location.hash}`)
					// } else if (anchor == 1) {
					// 	console.log(`got section ${location.hash}`)
					// } else if (anchor == 2) {
					// 	console.log(`got section ${location.hash}`)
					// } else if (anchor == 3) {
					// 	console.log(`got section ${location.hash}`)
					// }
				}				
			}
		};

		this.removeEvents = function () {
			if (document.addEventListener) {
			document.removeEventListener('mousewheel', this.mouseWheelAndKey, false);
			document.removeEventListener('wheel', this.mouseWheelAndKey, false);
			document.removeEventListener('keyup', this.mouseWheelAndKey, false);
			document.removeEventListener('touchstart', this.touchStart, false);
			document.removeEventListener('touchend', this.touchEnd, false);

			} else {
				document.detachEvent('onmousewheel', this.mouseWheelAndKey, false);
				document.detachEvent('onkeyup', this.mouseWheelAndKey, false);
			}

			setTimeout(function(){
				_self.addEvents();
			}, 1000);
		};

		this.animateScroll = function () {
			var animateTime = this.defaults.animateTime;
			var animateFunction = this.defaults.animateFunction;
			var position = this.defaults.currentPosition * 100;

			this.defaults.container.style.webkitTransform = 'translateY(-' + position + '%)';
			this.defaults.container.style.mozTransform = 'translateY(-' + position + '%)';
			this.defaults.container.style.msTransform = 'translateY(-' + position + '%)';
			this.defaults.container.style.transform = 'translateY(-' + position + '%)';
			this.defaults.container.style.webkitTransition = 'all ' + animateTime + 's ' + animateFunction;
			this.defaults.container.style.mozTransition = 'all ' + animateTime + 's ' + animateFunction;
			this.defaults.container.style.msTransition = 'all ' + animateTime + 's ' + animateFunction;
			this.defaults.container.style.transition = 'all ' + animateTime + 's ' + animateFunction;

			for (var i = 0; i < this.ul.childNodes.length; i++) {
					this.ul.childNodes[i].firstChild.className = this.updateClass(2, 'active', this.ul.childNodes[i].firstChild.className);
					if (i == this.defaults.currentPosition) {
					this.ul.childNodes[i].firstChild.className = this.updateClass(1, 'active', this.ul.childNodes[i].firstChild.className);
				}
			}
		};

		this.changeCurrentPosition = function (position) {
			if (position !== "") {
				if (position < 0) {
					position = 0;
				} else if (position > _self.defaults.maxPosition) {
					position = _self.defaults.maxPosition;
				}
				_self.defaults.currentPosition = position;
				location.hash = _self.defaults.currentPosition;
			}
		};

		this.registerIeTags = function () {
			document.createElement('section'); 
		};

		this.updateClass = function (type, newClass, currentClass) {
			if (type == 1) {
				return currentClass += ' ' + newClass;
			} else if (type == 2) {
				return currentClass.replace(newClass, '');
			}
		};

		this.presentation = function (position) {
			const rect = document.querySelectorAll('.rect');
			const bgImg = document.querySelectorAll('.bg-img');
			const img = document.querySelectorAll('.img');
			const wrapper = document.querySelectorAll('.wrapper');
			const bgWord = document.querySelectorAll('.bg-word');
			const bounding = document.querySelectorAll('.bounding');
			const pt = gsap.timeline({
				defaults: {
					duration: 1, 
					ease: Power1.easeOut
				} 
			}).delay(0.5);

			if (position == 0) {
				pt.fromTo(rect[0], {
					clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
				}, {
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
				})
				
				.fromTo(bgImg[0], {
					transformOrigin: 'right',
					scale: 0.8,
					clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
				}, {
					scale: 1,
					clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)"
				}, '-=1')

				.fromTo(wrapper[0].children, {
					xPercent: -100,
				}, {
					xPercent: 0,
					stagger: 0.1
				}, '-=0.4')

				.fromTo(bgWord[0], {
					xPercent: -250
				}, {
					xPercent: 0
				}, '-=0.8')

				// .fromTo(wrapper[0].children[2], {
				// 	clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
				// }, {
				// 	clipPath: "polygon(0% 0%, 110% 0%, 110% 110%, 0% 110%)",
				// 	duration: 0.3
				// }, '-=0.1')
				.fromTo(wrapper[0].children[2].children, {
					yPercent: 200
				}, {
					yPercent: 0,
					duration: 0.5
				}, '-=0.2')

			} else if (position == 1) {
				pt.fromTo(img[0], {
					transformOrigin: 'right',
					scale: 0.8,
					clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
				}, {
					scale: 1,
					clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
					duration: 0.7
				})

				.fromTo(rect[1], {
					clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
				}, {
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
				}, '-=0.2')

				.fromTo(wrapper[1].children[1].children, {
					xPercent: -150
				}, {
					xPercent: 0,
					stagger: 0.1
				}, '-=0.5')

			} else if (position == 2) {
				pt.fromTo(img[1], {
					transformOrigin: 'right',
					scale: 0.8,
					clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
				}, {
					scale: 1,
					clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
					duration: 0.7
				})

				.fromTo(rect[2], {
					clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
				}, {
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
				}, '-=0.2')

				.fromTo(wrapper[2].children[2].children, {
					xPercent: -150
				}, {
					xPercent: 0,
					stagger: 0.1
				}, '-=0.5')

			} else if (position == 3) {
				pt.fromTo(bounding[2].children[1].children[0], {
					transformOrigin: 'right',
					scale: 0.8,
					clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
				}, {
					scale: 1,
					clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
					duration: 0.7
				})
				
				.fromTo(bounding[1].children, {
					xPercent: -110
				}, {
					xPercent: 0
				}, '-=1')
				
				.fromTo(bounding[2].children[0], {
					xPercent: -110
				}, {
					xPercent: 0
				}, '-=0.5')
				.fromTo(bounding[3].children, {
					xPercent: -150
				}, {
					xPercent: 0,
					stagger: 0.1
				}, '-=1')

				.fromTo(rect[3], {
					clipPath: "polygon(100% 0%, 185% 85%, 185% 0%)"
				}, {
					clipPath: "polygon(15% 0%, 100% 85%, 100% 0%)"
				}, '-=0.7')
				.fromTo(rect[4], {
					clipPath: "polygon(-85% 15%, 0% 100%, -85% 100%)"
				}, {
					clipPath: "polygon(0% 15%, 85% 100%, 0% 100%)"
				}, '-=1')

				.fromTo(bgWord[1], {
					xPercent: -250
				}, {
					xPercent: 0
				}, '-=0.7')

			}
		}

		return this;
	};
	window.fullScroll = fullScroll;
