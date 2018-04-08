exports.Banner = require('./modules/banner');

/**
 * Loop over each tile, and if the tag specified (1st param) is
 * present, execute yesTagFn (2nd param) if the tag is not present,
 * execute noTagFn (3rd param). In both callbacks,
 * **this** reffers to the tile currently being checked
 *
 * @param {string} filterBy --> The tag to look for
 * @param {function} [yesTagFn=function() {}] --> The function to run if a tile has the desired tag.
 * @param {function} [noTagFn=function() {}] --> The function to run if a tile
 *   does NOT have the desired tag.
 * @param {string} OPTIONAL: A css class to ignore, and to add after the tile has been processed.
 * @returns {boolean} --> returns true if the front end tags are enabled, otherwise returns false and logs an error.
 */
exports.doIfTag = function (
  filterBy,
  yesTagFn = function () {},
  noTagFn = function () {},
  not = ''
) {
  if ($('body').hasClass('include_fe_item_tags')) {
    $('.tile')
      .not(not)
      .each(function (i, el) {
        // Get the tags for this tile.
        const allTagsString = el.dataset.tags;

        // assume it doesn't have the tag we want
        let hasTag = false;

        // If there is any tags to even check...
        if (allTagsString) {
          // split the tags into an array
          const allTagsArray = allTagsString.split(',');

          // loop over the array
          allTagsArray.forEach((tag) => {
            // if the tag matches what we're looking for, change hasTag to true
            if (tag.toLowerCase() === filterBy.toLowerCase()) {
              hasTag = true;
            }
          });
        }
        // Do this if the tile has the tag
        if (hasTag) {
          yesTagFn.call(this);
          // Do this if the tile doesn't...
          $(this).addClass(not);
          return true;
        }
        noTagFn.call(this);
        $(this).addClass(not);
        return true;
      });
  } else {
    console.error('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
    console.error('  Onbrander: You called doIfTag, but front end tags are NOT enabled !');
    console.error('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
    return false;
  }
};

/**
 * Take the hub share window, rip it out, and make our own.
 * On page change, replace our new share window with the appropriate one
 * for that page. Applies event listeners for load and page change,
 * simply call near the begining of your code.
 *
 * @returns {function} --> The function that updates on page change.
 */
exports.fixShareWidgetImproved = function () {
  $('head').append(`
  <style id="shareWidgetFix">
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
  // rip out share window, put inside of relative div (in the same place)
  // create div to house elements
  $('.right-side-btns').prepend('<div class="relativeDiv relativeDiv--share"><div class="insertFlag--share"></div></div>');
  // rip share-main and place after the flag div
  $('#share-main-hub')
    .clone()
    .insertAfter('.insertFlag--share');
  $('.share-toggle').insertAfter('.insertFlag--share');

  // do the same to search box
  $('.right-side-btns').prepend('<div class="relativeDiv relativeDiv--search"><div class="insertFlag--search"></div></div>');
  $('.search-drop-down').insertAfter('.insertFlag--search');
  $('.search-container').insertAfter('.insertFlag--search');
  // This function will update the share widget for different pages
  const $shareMain = $('#share-main-hub');
  const update = function () {
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
      $('#hubs-container .page-aligner>.share-container').insertAfter('.insertFlag--share');
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
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.open(
        this.href,
        'windowName',
        'width=540, height=433, left=24, top=24, scrollbars, resizable'
      );
    }));
  Hubs.Events.on('load', update);
  Hubs.Events.on('pageChange', update);
  return update;
};

/**
 * This function is to be called on scroll, and will keep the block CTAs
 * within the bounds of the article they are supposed to be blocking
 * (preventing them from overlapping the injected header and footer).
 */
exports.blockCtaFix = function () {
  const $blockCta = $('.block-cta:not(.embed-cta)');

  if ($blockCta.length && !$('.level-three .block-cta').length) {
    const $main = $('.main');
    const ctaHalfHeight = $blockCta.height() / 2;
    const { top } = $main.offset();
    const bottom = $main.offset().top + $main.height();
    const middleScreen = $(window).scrollTop() + ($(window).height() / 2);

    const middleScreenTop = middleScreen - ctaHalfHeight;
    const middleScreenBottom = middleScreen + ctaHalfHeight;
    // console.log(middleScreenTop)
    if (middleScreenTop < top) {
      $blockCta.css({
        position: 'absolute',
        top,
        bottom: '',
        transform: 'translate(-50%, -50%)',
        margin: 0,
      });
    } else if (middleScreenBottom > bottom) {
      $blockCta.css({
        position: 'absolute',
        top: bottom - $blockCta.height() - ctaHalfHeight,
        transform: 'translate(-50%, -50%)',
        margin: 0,
      });
    } else {
      $blockCta.css({
        position: 'fixed',
        top: '50vh',
        bottom: '',
        transform: 'translate(-50%, -50%)',
        margin: 0,
      });
    }
  }
};

/**
 * When called on scroll, this function will fade out
 * the next-item-flyout before it can overlap with the injected-footer
 */
exports.fadeOutItem = () => {
  if ($('body').hasClass('single-page')) {
    const footerHeight = $('footer').height();
    const pageHeight = document.body.scrollHeight - $(window).height();
    const sweetSpot = pageHeight - (footerHeight + $(window).height());
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
exports.descriptionSlideUp = function () {
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

exports.devMode = function (devOptions) {
  console.log(' ');
  console.log(' ');
  console.warn('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
  console.warn('   Hey Onbrander, Just letting you know that we\'re in dev mode!');
  console.warn('   You have access to the following functions:', exports);
  console.warn('   More info available here: http://cihost.uberflip.com/docs/');
  console.warn('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
  console.log(' ');
  console.log(' ');

  /**
   *  Utility Functions
   */
  const internalLink = function (e) {
    e.preventDefault();
    Hubs.changePage(e.target.href);
  };

  /**
   *
   * @param {string} url - the url to replace with a relative path
   */
  const relativeLinks = function (url) {
    // We need relative links for local dev, so we regex for the url as the href
    const matchThis = new RegExp(
      `^((http[s]?|ftp):/)?/?([^:/s]+)?(${url})`,
      'gi'
    );
    $('a')
      .not('.onBrand--LocalDevLink')
      .each(function () {
        const testThis = $(this).attr('href');
        if (
          matchThis.test(testThis) ||
          (testThis && testThis.charAt(0) === '/')
        ) {
          let newHref = testThis.replace(matchThis, '');
          if (!(newHref[0] === '/')) {
            newHref = `/${newHref}?onbrand`;
          } else {
            newHref += '?onbrand';
          }
          $(this).attr('href', newHref);
          $(this).attr('target', '');
          // add event listener to do internal page change instead of full reload
          $(this).on('click', internalLink);
          $(this).addClass('onBrand--LocalDevLink');
        }
      });
  };
  /**
   *  Local Development Events
   */

  if (!production) {
    // run right away to catch any early clickers out there...
    relativeLinks(devOptions.shortHubUrl);
    Hubs.Config.hubBaseUrl = 'http://localhost:3000/';

    // run on load to catch any links added via scripts or anything
    Hubs.Events.on('load', () => {
      relativeLinks(devOptions.shortHubUrl);
      Hubs.Config.hubBaseUrl = 'http://localhost:3000/';
    });
    // run on page change to get links on different pages
    Hubs.Events.on('pageChange', () => {
      relativeLinks(devOptions.shortHubUrl);
      Hubs.Config.hubBaseUrl = 'http://localhost:3000/';
    });
    // get all the links on extra tiles added in
    Hubs.Events.on('itemsLoaded', () => {
      relativeLinks(devOptions.shortHubUrl);
    });
    $(window).on('search', () => {
      setTimeout(() => {
        relativeLinks(devOptions.shortHubUrl);
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
 * @param {function} OPTIONAL: A function to execute if the tile has
 *   the tag, THIS = the tile inside the function.
 * @param {function} OPTIONAL: A function to execute if the tile
 *   DOES NOT have the tag, THIS = the tile inside the function.
 * @param {string} OPTIONAL: A css class to ignore, and to add after the tile has been processed.
 */
exports.doIfTagRegex = function doIfTagRegex(
  filterBy,
  yesTagFn = function () {},
  noTagFn = function () {},
  not = ''
) {
  if (!(filterBy instanceof RegExp)) {
    console.error(`${filterBy} is not a valid regular expression! Please use new RegExp() to generate one!`);
    return false;
  } else if ($('body').hasClass('include_fe_item_tags')) {
    $('.tile')
      .not(not)
      .each(function (i, el) {
        // Get the tags for this tile.
        const allTagsString = el.dataset.tags;

        // assume it doesn't have the tag we want
        let hasTag = false;
        let theTag;
        // If there is any tags to even check...
        if (allTagsString) {
          // split the tags into an array
          const allTagsArray = allTagsString.split(',');

          // loop over the array
          allTagsArray.forEach((tag) => {
            // if the tag matches what we're looking for, change hasTag to true
            if (filterBy.test(tag)) {
              hasTag = true;
              theTag = tag;
            }
          });
        }
        // Do this if the tile has the tag
        if (hasTag) {
          yesTagFn.call(this, theTag);
          // Do this if the tile doesn't...
          $(this).addClass(not);
          return true;
        }
        noTagFn.call(this);
        $(this).addClass(not);
        return true;
      });
  } else {
    console.error('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
    console.error('  Onbrander: You called doIfTag, but front end tags are NOT enabled !');
    console.error('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
    return false;
  }
};

/**
 * Logs an error to the console (does not THROW an error)
 * when we're in dev mode but there is no query string
 */
exports.noQueryStringSafeguard = function () {
  if (
    /localhost:3000/gi.test(window.location.host) &&
    !(
      /\?onbrand/gi.test(window.location.href) ||
      /&onbrand/gi.test(window.location.href)
    )
  ) {
    console.error('It looks like you are in dev mode, but you\'re missing the onbrand query string.');
  }
};

/**
 * Returns the stream class for that page.
 *
 * @returns {String} 'stream-xxxxx' or false, if the page has no stream.
 */
exports.getStreamClass = function () {
  const classes = $('body').attr('class');
  const classArray = classes.split(' ');
  let streamClass;
  classArray.forEach((currentClass) => {
    if (/stream-/gi.test(currentClass)) streamClass = currentClass;
  });
  return streamClass || false;
};

/**
 * Adds helpful body classes based on content type to make styling easier.
 */
exports.helpfulClasses = function () {
  /* An array to keep track of what content types are used
   * (ensures we are dynamic, no hardcoded types)
   */
  const typeArray = ['sales-stream', 'marketing-stream'];

  /**
   * Removes all known type classes from the body, then adds whichever
   * is relevent to that page. Checks to see if that class is known, and if
   * not, adds it to the array.
   */
  function detectAndAddClass() {
    typeArray.forEach(type => $('body').removeClass(type));

    const $class = $('#page-type-identifier').attr('data-item-type');
    const $pageIdentifier = $('#hubs-container > div:eq(0)').attr('data-collection-type');

    if ($class) {
      $('body').addClass($class);
      if (!typeArray.includes($class)) {
        typeArray.push($class);
      }
    }

    if (!$('body').hasClass('webpackBuild')) {
      $('body').addClass('webpackBuild');
    }


    if ($pageIdentifier === 'targeted') {
      $('body').addClass('sales-stream');
    } else if ($pageIdentifier === 'custom') {
      $('body').addClass('marketing-stream');
    }
  }

  // Event listeners
  Hubs.Events
    .on('load', detectAndAddClass)
    .on('pageChange', detectAndAddClass);
};

/**
 * Locks the reco engine panel to the bottom of the provided target,
 * but moves it to the top of the screen when the target is out of view.
 *
 * @param {Selector} target
 */
exports.recoEnginePositioning = function (targetSel) {
  const reposition = function (target) {
    try {
      const $reco = $('.reco-panel');
      const bottomOfTarget = $(target).offset().top + $(target).height();
      const calculatedPosition = bottomOfTarget - $(window).scrollTop();
      const desiredPosition = calculatedPosition > 0 ? calculatedPosition : 0;
      $reco.css('top', desiredPosition);
    } catch (err) {
      console.warn('recoEnginePositioning() has failed - the error thrown was:');
      console.error(err);
      console.warn(`The target used was:${target}`);
    }
  }.bind($('.reco-panel'), targetSel);

  Hubs.Events.on('scroll', reposition);
  Hubs.Events.on('load', reposition);
  Hubs.Events.on('pageChange', reposition);
  Hubs.Events.on('resize', reposition);
};

/**
 * Attempts to guess what buffer is needed for cta/addthis fix to
 * look correct. TODO: refactor to return immediately if override is provided
 * @param {Number} buffer
 */
function getTopNavBuffer(buffer) {
  const $injectedHeader = $('#injected-header');
  const $topNav = $('.top-nav');
  let topNavBuffer;
  let injectedHeaderHeight;
  let topNavHeight;

  // we need to add a buffer for any fixed or absolute content:

  // Check if the injected header is position fixed, if it is grab its height
  if ($injectedHeader.css('position') === 'fixed') {
    injectedHeaderHeight = $injectedHeader.outerHeight(true);
  } else if ($injectedHeader.height() === 0) {
  // If the injected header is not fixed, check if it has fixed children, and if so get their heigh
    injectedHeaderHeight = $('#injected-header>*').outerHeight(true);
  } else {
    // if the injected header is relative/static then no buffer is needed!
    injectedHeaderHeight = 0;
  }


  // If the top nav is fixed, grab its heigh to add to our buffer
  if ($topNav.css('position') === 'fixed') {
    topNavHeight = $topNav.outerHeight(true);
  } else {
    // otherwise, no buffer needed
    topNavHeight = 0;
  }

  // if the user didn't provide an override buffer, lets use ours
  if (!buffer) {
    topNavBuffer = injectedHeaderHeight + topNavHeight;
  } else {
    // if they did, use theirs
    topNavBuffer = buffer;
  }

  return topNavBuffer;
}

/**
 * This will keep side ctas within the bounds of an article
 *
 * @param {Number} buffer
 */
exports.sideCtaFix = function (buffer) {
  // This will do its best to guess the buffer, if its off override with parameter
  const topNavBuffer = getTopNavBuffer(buffer);


  if ($(window).width() > 1351 && $('.entry-wrapper').length) {
    const scrollTop = $(window).scrollTop();
    const cta = $('.cta-item-container .cta');
    if (cta.length > 0) {
      const ctaHeight = cta.height();
      const topLimit = $('.level-three').eq(0).offset().top;
      const bottomLimit = $('.level-three').eq(0).offset().top + $('.level-three').height();
      // initial position
      cta.css('top', topLimit - scrollTop);

      // if cta hits the top of the article
      if (scrollTop + topNavBuffer > topLimit) {
        cta.css('top', topNavBuffer);
      }

      // if it hits the bottom
      if (scrollTop + topNavBuffer + ctaHeight > bottomLimit) {
        cta.css('top', bottomLimit - ctaHeight - scrollTop);
      }
    }
  }
};

/**
 * This will keep addthis within the bounds of an article
 *
 * @param {Number} buffer
 */
exports.addThisFix = function (buffer) {
  // This will do its best to guess the buffer, if its off override with parameter
  const topNavBuffer = getTopNavBuffer(buffer);

  if ($(window).width() > 980) {
    const scrollTop = $(window).scrollTop();
    const cta = $('.addthis_toolbox');
    if (cta.length > 0) {
      const ctaHeight = cta.height();
      const topLimit = $('.level-three').eq(0).offset().top;
      const bottomLimit = $('.level-three').eq(0).offset().top + $('.level-three').height();
      // initial position
      cta.css('top', topLimit - scrollTop);

      // if cta hits the top of the article
      if (scrollTop + topNavBuffer > topLimit) {
        cta.css('top', topNavBuffer);
      }

      // if it hits the bottom
      if (scrollTop + topNavBuffer + ctaHeight > bottomLimit) {
        cta.css('top', bottomLimit - ctaHeight - scrollTop);
      }
    }
  }
};


/**
 *  Remove .touch on touchscreen laptops
 */
exports.removeTouchForLaptops = function () {
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  if (!isMobileDevice) $('html').removeClass('touch');
};

/**
 * Legacy: Michael Imperial Function... purpose unknown.
 */
exports.overrideHubFuctions = function () {
  Hubs.Search.prototype.updateOverlaySize = function () {};
};


/**
 * Legacy: Old Michael Imperial utility function, for use with legacy events
 * @param {String} url
 */
function extractDomain(url) {
  let domain;
  // find & remove protocol (http, ftp, etc.) and get domain
  if (url.indexOf('://') > -1) {
    domain = url.split('/')[2];
  } else {
    domain = url.split('/')[0];
  }
  // find & remove port number
  domain = domain.split(':')[0];
  return domain;
}

/**
 * Legacy: Old Michael Imperial event system
 */
exports.legacyEvents = function () {
// Build Object of Ajax Names/URL Endpoints
  const ufAjaxEndpoints = Hubs.Config.serverUrl;
  jQuery.each(ufAjaxEndpoints, (key, value) => {
    if (value.indexOf('/hubsFront/') === -1) {
      delete ufAjaxEndpoints[key];
    }
  });
  // If Uf-Events doesnt' exist already create
  if (!window.ufEvents) {
    window.ufEvents = [];
    // Create event for every UF end-point
    jQuery.each(ufAjaxEndpoints, (key, value) => {
      const eventUrl = value;
      const eventName = eventUrl.replace('/hubsFront/ajax_', '').replace('hubsFront/', '').replace('/', '');
      jQuery(document).on('ajaxSuccess', function (event, xhr, settings) {
        if (settings.url.indexOf(eventUrl) >= 0) {
          const ufEvent = new Event(eventName);
          $(this).trigger(ufEvent);
          console.log('%c Event Dispatched: ', 'background: #0058ce; color: #FFF;padding:5px;', eventName);
        }
      });
      window.ufEvents.push(eventName);
    });
    // Create onPageChange event
    jQuery(document).on('ajaxSuccess', function (event, xhr, settings) {
      if (settings.type === 'GET' && settings.url.indexOf('/hubsFront/') === -1 && settings.url.indexOf(extractDomain(Hubs.Config.hubBaseUrl)) > -1) {
        const ufEvent = new Event('pageChange');
        jQuery(this).trigger(ufEvent);
        console.log('%c Event Dispatched: ', 'background: #0058ce; color: #FFF;padding:5px;', 'pageChange:', window.location.href);
      }
    });

    // Console Log: List all UF Events
    window.ufEvents.push('pageChange');
    console.log('%cUF Events Available:', 'background: #ce0058; color: #FFF;padding:5px;line-height:3;font-weight:bold;', window.ufEvents.toString());
  }
};

/**
 * Legacy: Old Michael Imperial embed fix
 *
 *
 */
exports.legacyTileFix = function () {
  /**
 *  fix embed tile errors and kill process
 */

  (function () {
    if (window.location.href.indexOf('?embedtile') !== -1 || window.location.href.indexOf('embed_cta') !== -1) {
      $('.tile.single').css({
        position: 'fixed', top: 0, left: 0, zIndex: 2147483647, opacity: 1, transform: 'none', 'animation-name': 'initial', visibility: 'visible', 'animation-duration': 0,
      });
      throw new Error('Embed Tile Fix triggered');
    }
  }());
};
