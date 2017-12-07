/**
 * Loop over each tile, and if the tag specified (1st param) is present, execute yesTagFn (2nd param)
 * if the tag is not present, execute noTagFn (3rd param). In both callbacks, **this** reffers to the tile currently being
 * checked
 *
 * @param {string} filterBy --> The tag to look for
 * @param {function} [yesTagFn=function() {}] --> The function to run if a tile has the desired tag.
 * @param {function} [noTagFn=function() {}] --> The function to run if a tile does NOT have the desired tag.
 * @param {string} OPTIONAL: A css class to ignore, and to add after the tile has been processed.
 * @returns {boolean} --> returns true if the front end tags are enabled, otherwise returns false and logs an error.
 */
exports.doIfTag = function(
	filterBy,
	yesTagFn = function() {},
	noTagFn = function() {},
	not = ''
) {
	if ($('body').hasClass('include_fe_item_tags')) {
		$('.tile')
			.not(not)
			.each(function(i, el) {
				//Get the tags for this tile.
				var allTagsString = el.dataset.tags;

				//assume it doesn't have the tag we want
				var hasTag = false;

				//If there is any tags to even check...
				if (allTagsString) {
					//split the tags into an array
					var allTagsArray = allTagsString.split(',');

					//loop over the array
					allTagsArray.forEach(function(tag) {
						//if the tag matches what we're looking for, change hasTag to true
						if (tag.toLowerCase() === filterBy.toLowerCase()) {
							hasTag = true;
						}
					});
				}
				//Do this if the tile has the tag
				if (hasTag) {
					yesTagFn.call(this);
					//Do this if the tile doesn't...
					$(this).addClass(not);
					return true;
				} else {
					noTagFn.call(this);
					$(this).addClass(not);
					return true;
				}
			});
	} else {
		console.error('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
		console.error(
			'  Onbrander: You called doIfTag, but front end tags are NOT enabled !'
		);
		console.error('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
		return false;
	}
};

/**
 * Take the hub share window, rip it out, and make our own. On page change, replace our new share window with the appropriate one
 * for that page. Applies event listeners for load and page change, simply call near the begining of your code.
 *
 * @returns {function} --> The function that updates on page change.
 */
exports.fixShareWidgetImproved = function() {
	$('head').append(`<style id="shareWidgetFix">
	.relativeDiv {
		position: relative;
		float: right;
		}
		
		.relativeDiv.relativeDiv--search {
		float: left;
		}
		
		.relativeDiv--share:hover .share-hub {
		display: block;
		}
		
		.share-hub,
		.share-item {
		margin: auto;
		}
		
		.search-drop-down {
		position: absolute;
		}
		
		@media all and (min-width: 860px) {
		.share-hub,
		.share-item {
		right: auto;
		position: absolute;
		left: -450% !important;
		top: 51px !important;
		}
		.search-drop-down {
		right: 0;
		position: absolute;
		left: -4% !important;
		top: 55px !important;
		}
		}
		
		@media all and (max-width: 860px) {
		.share-hub,
		.share-item {
		right: auto;
		position: absolute;
		left: -576% !important;
		top: 45px !important;
		}
		}
		
		@media all and (max-width: 720px) {
		.share-hub,
		.share-item {
		right: auto;
		position: absolute;
		left: -465% !important;
		top: 45px !important;
		}
		}
	</style>`);
	//rip out share window, put inside of relative div (in the same place)
	//create div to house elements
	$('.right-side-btns').prepend(
		'<div class="relativeDiv relativeDiv--share"><div class="insertFlag--share"></div></div>'
	);
	//rip share-main and place after the flag div
	$('#share-main-hub')
		.clone()
		.insertAfter('.insertFlag--share');
	$('.share-toggle').insertAfter('.insertFlag--share');

	//do the same to search box
	$('.right-side-btns').prepend(
		'<div class="relativeDiv relativeDiv--search"><div class="insertFlag--search"></div></div>'
	);
	$('.search-drop-down').insertAfter('.insertFlag--search');
	$('.search-container').insertAfter('.insertFlag--search');
	//This function will update the share widget for different pages
	const $shareMain = $('#share-main-hub');
	var update = function() {
		if ($('.meta-inner .share-container').length) {
			$('.right-side-btns .share-hub').remove();
			$('.right-side-btns .share-container').remove();
			$('.meta-inner .share-container').insertAfter('.insertFlag--share');
		} else if (
			$('.share-item.type-collection').length &&
			!$('body').hasClass('hub-page')
		) {
			$('.right-side-btns .share-hub').remove();
			$('.right-side-btns .share-container').remove();
			$('#hubs-container .page-aligner>.share-container').insertAfter(
				'.insertFlag--share'
			);
		} else {
			$('.right-side-btns .share-hub').remove();
			$('.right-side-btns .share-container').remove();
			if ($('#share-main-hub').length) {
				$('#share-main-hub')
					.clone()
					.insertAfter('.insertFlag--share');
			} else {
				$shareMain.clone().insertAfter('.insertFlag--share');
			}
		}
	};
	// Make sure social still opens in popup
	const links = document.querySelectorAll('#share-main-hub li a');
	links.forEach(link =>
		link.addEventListener('click', function(e) {
			e.preventDefault();
			window.open(
				this.href,
				'windowName',
				'width=540, height=433, left=24, top=24, scrollbars, resizable'
			);
		})
	);
	Hubs.Events.on('load', update);
	Hubs.Events.on('pageChange', update);
	return update;
};

/**
 * This function is to be called on scroll, and will keep the block CTAs within the bounds of the article they are
 * supposed to be blocking (preventing them from overlapping the injected header and footer).
 */
exports.blockCtaFix = function() {
	var $blockCta = $('.block-cta:not(.embed-cta)');

	if ($blockCta.length && !$('.level-three .block-cta').length) {
		var $main = $('.main');
		var ctaHalfHeight = $blockCta.height() / 2;
		var top = $main.offset().top;
		var bottom = $main.offset().top + $main.height();
		var bottomFromBottom = $(document).height() - bottom;
		var middleScreen = $(window).scrollTop() + $(window).height() / 2;

		var middleScreenTop = middleScreen - ctaHalfHeight;
		var middleScreenBottom = middleScreen + ctaHalfHeight;
		// console.log(middleScreenTop)
		if (middleScreenTop < top) {
			$blockCta.css({
				position: 'absolute',
				top: top,
				bottom: '',
				transform: 'translate(-50%, -50%)',
				margin: 0
			});
		} else if (middleScreenBottom > bottom) {
			$blockCta.css({
				position: 'absolute',
				top: bottom - $blockCta.height() - ctaHalfHeight,
				transform: 'translate(-50%, -50%)',
				margin: 0
			});
		} else {
			$blockCta.css({
				position: 'fixed',
				top: '50vh',
				bottom: '',
				transform: 'translate(-50%, -50%)',
				margin: 0
			});
		}
	}
};

/**
 * When called on scroll, thi function will fade out the next-item-flyout before it can overlap with the
 * injected-footer
 */
exports.fadeOutItem = () => {
	if ($('body').hasClass('single-page')) {
		let footerHeight = $('footer').height();
		let pageHeight = document.body.scrollHeight - $(window).height();
		let sweetSpot = pageHeight - (footerHeight + $(window).height());
		if ($(window).scrollTop() > sweetSpot) {
			$('.item-next-prev').fadeOut('fast');
		} else {
			$('.item-next-prev').fadeIn('fast');
		}
	}
};

/**
 * Simply adds the css required to have tile descriptions slide up on hover
 */
exports.descriptionSlideUp = function() {
	$('head').append(`<style id="descriptionsSlideUp">
	/*-- Tile Description Pop-up Hover --*/
	#collection-items .tile .description {
		-webkit-transition: all 0.4s ease-out;
		transition: all 0.4s ease-out;
	}
	#collection-items .tile .description .long-h3 {
		display: block !important;
	}
	
	#collection-items .tile:hover .description {
		height: 100%;
		-webkit-transition: all 0.3s ease-out;
		transition: all 0.3s ease-out;
	}
	
	#collection-items .tile .share-single {
		display: none;
	}
	</style>`);
};

exports.devMode = function(devOptions) {
	console.log(' ');
	console.log(' ');
	console.warn(
		'-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='
	);
	console.warn(
		"   Hey Onbrander, Just letting you know that we're in dev mode!"
	);
	console.warn('   You have access to the following functions:', exports);
	console.warn('   More info available here: http://cihost.uberflip.com/docs/');
	console.warn(
		'-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='
	);
	console.log(' ');
	console.log(' ');

	/**
	 *  Utility Functions
	 */
	const _internalLink = function(e) {
		e.preventDefault();
		Hubs.changePage(e.target.href);
	};

	/**
	 *
	 * @param {string} url - the url to replace with a relative path
	 */
	const _relativeLinks = function(url) {
		//We need relative links for local dev, so we regex for the url as the href
		var matchThis = new RegExp(
			'^((http[s]?|ftp):/)?/?([^:/s]+)?(' + url + ')',
			'gi'
		);
		$('a')
			.not('.onBrand--LocalDevLink')
			.each(function(index, el) {
				var testThis = $(this).attr('href');
				if (matchThis.test(testThis) || (testThis && testThis.charAt(0) === '/')) {
					var newHref = testThis.replace(matchThis, '');
					if (!(newHref[0] === '/')) {
						newHref = '/' + newHref + '?onbrand';
					} else {
						newHref = newHref + '?onbrand';
					}
					$(this).attr('href', newHref);
					$(this).attr('target', '');
					//add event listener to do internal page change instead of full reload
					$(this).on('click', _internalLink);
					$(this).addClass('onBrand--LocalDevLink');
				}
			});
	};
	/**
	 *  Local Development Events
	 */

	if (!production) {
		//run right away to catch any early clickers out there...
		_relativeLinks(devOptions.shortHubUrl);
		Hubs.Config.hubBaseUrl = 'http://localhost:3000/';

		//run on load to catch any links added via scripts or anything
		Hubs.Events.on('load', function() {
			_relativeLinks(devOptions.shortHubUrl);
			Hubs.Config.hubBaseUrl = 'http://localhost:3000/';
		});
		//run on page change to get links on different pages
		Hubs.Events.on('pageChange', function() {
			_relativeLinks(devOptions.shortHubUrl);
			Hubs.Config.hubBaseUrl = 'http://localhost:3000/';
		});
		//get all the links on extra tiles added in
		Hubs.Events.on('itemsLoaded', function() {
			_relativeLinks(devOptions.shortHubUrl);
		});
		$(window).on('search', function() {
			setTimeout(function() {
				_relativeLinks(devOptions.shortHubUrl);
			}, 500);
		});
	}
};

/**
 * Recursivley remove all the standard classes from our topnav clone,
 * add some handly classes in the prcoess. Called as the callback to
 * a jQuery .each(). EX $(parent).children().each(removeClasses)
 *
 * @param {index} i
 * @param {element} el
 */
exports.removeClasses = function removeClasses(i, el) {
	$(el)
		.attr('class', '')
		.children()
		.each(removeClasses);
};

/**
 *
 * @param {Regular Expression} What tag you're looking for
 * @param {function} OPTIONAL: A function to execute if the tile has the tag, THIS = the tile inside the function.
 * @param {function} OPTIONAL: A function to execute if the tile DOES NOT have the tag, THIS = the tile inside the function.
 * @param {string} OPTIONAL: A css class to ignore, and to add after the tile has been processed.
 */
exports.doIfTagRegex = function doIfTagRegex(
	filterBy,
	yesTagFn = function() {},
	noTagFn = function() {},
	not = ''
) {
	if (!(filterBy instanceof RegExp)) {
		console.error(
			`${
				filterBy
			} is not a valid regular expression! Please use new RegExp() to generate one!`
		);
		return false;
	} else if ($('body').hasClass('include_fe_item_tags')) {
		$('.tile')
			.not(not)
			.each(function(i, el) {
				//Get the tags for this tile.
				var allTagsString = el.dataset.tags;

				//assume it doesn't have the tag we want
				var hasTag = false;
				var theTag;
				//If there is any tags to even check...
				if (allTagsString) {
					//split the tags into an array
					var allTagsArray = allTagsString.split(',');

					//loop over the array
					allTagsArray.forEach(function(tag) {
						//if the tag matches what we're looking for, change hasTag to true
						if (filterBy.test(tag)) {
							hasTag = true;
							theTag = tag;
						}
					});
				}
				//Do this if the tile has the tag
				if (hasTag) {
					yesTagFn.call(this, theTag);
					//Do this if the tile doesn't...
					$(this).addClass(not);
					return true;
				} else {
					noTagFn.call(this);
					$(this).addClass(not);
					return true;
				}
			});
	} else {
		console.error('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
		console.error(
			'  Onbrander: You called doIfTag, but front end tags are NOT enabled !'
		);
		console.error('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
		return false;
	}
};
