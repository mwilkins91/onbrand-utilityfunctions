'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recoEnginePositioning = recoEnginePositioning;
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
exports.doIfTag = function (filterBy) {
  var yesTagFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var noTagFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var not = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  if ($('body').hasClass('include_fe_item_tags')) {
    $('.tile').not(not).each(function (i, el) {
      // Get the tags for this tile.
      var allTagsString = el.dataset.tags;

      // assume it doesn't have the tag we want
      var hasTag = false;

      // If there is any tags to even check...
      if (allTagsString) {
        // split the tags into an array
        var allTagsArray = allTagsString.split(',');

        // loop over the array
        allTagsArray.forEach(function (tag) {
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
  $('head').append('\n  <style id="shareWidgetFix">\n    .relativeDiv {\n      position: relative;\n      float: right;\n    }\n\n    .relativeDiv.relativeDiv--search {\n      float: left;\n    }\n\n    .relativeDiv--share:hover .share-hub {\n      display: block;\n    }\n\n    .share-hub,\n    .share-item {\n      margin: auto;\n    }\n\n    .search-drop-down {\n      position: absolute;\n    }\n\n    @media all and (min-width: 860px) {\n      .share-hub,\n      .share-item {\n        right: auto;\n        position: absolute;\n        left: -450% !important;\n        top: 51px !important;\n      }\n      .search-drop-down {\n        right: 0;\n        position: absolute;\n        left: -4% !important;\n        top: 55px !important;\n      }\n    }\n\n    @media all and (max-width: 860px) {\n      .share-hub,\n      .share-item {\n        right: auto;\n        position: absolute;\n        left: -576% !important;\n        top: 45px !important;\n      }\n    }\n\n    @media all and (max-width: 720px) {\n      .share-hub,\n      .share-item {\n        right: auto;\n        position: absolute;\n        left: -465% !important;\n        top: 45px !important;\n      }\n    }\n  </style>');
  // rip out share window, put inside of relative div (in the same place)
  // create div to house elements
  $('.right-side-btns').prepend('<div class="relativeDiv relativeDiv--share"><div class="insertFlag--share"></div></div>');
  // rip share-main and place after the flag div
  $('#share-main-hub').clone().insertAfter('.insertFlag--share');
  $('.share-toggle').insertAfter('.insertFlag--share');

  // do the same to search box
  $('.right-side-btns').prepend('<div class="relativeDiv relativeDiv--search"><div class="insertFlag--search"></div></div>');
  $('.search-drop-down').insertAfter('.insertFlag--search');
  $('.search-container').insertAfter('.insertFlag--search');
  // This function will update the share widget for different pages
  var $shareMain = $('#share-main-hub');
  var update = function update() {
    if ($('.meta-inner .share-container').length) {
      $('.right-side-btns .share-hub').remove();
      $('.right-side-btns .share-container').remove();
      $('.meta-inner .share-container').insertAfter('.insertFlag--share');
    } else if ($('.share-item.type-collection').length && !$('body').hasClass('hub-page')) {
      $('.right-side-btns .share-hub').remove();
      $('.right-side-btns .share-container').remove();
      $('#hubs-container .page-aligner>.share-container').insertAfter('.insertFlag--share');
    } else {
      $('.right-side-btns .share-hub').remove();
      $('.right-side-btns .share-container').remove();
      if ($('#share-main-hub').length) {
        $('#share-main-hub').clone().insertAfter('.insertFlag--share');
      } else {
        $shareMain.clone().insertAfter('.insertFlag--share');
      }
    }
  };
  // Make sure social still opens in popup
  var links = document.querySelectorAll('#share-main-hub li a');
  links.forEach(function (link) {
    return link.addEventListener('click', function (e) {
      e.preventDefault();
      window.open(this.href, 'windowName', 'width=540, height=433, left=24, top=24, scrollbars, resizable');
    });
  });
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
  var $blockCta = $('.block-cta:not(.embed-cta)');

  if ($blockCta.length && !$('.level-three .block-cta').length) {
    var $main = $('.main');
    var ctaHalfHeight = $blockCta.height() / 2;

    var _$main$offset = $main.offset(),
        top = _$main$offset.top;

    var bottom = $main.offset().top + $main.height();
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
 * When called on scroll, this function will fade out
 * the next-item-flyout before it can overlap with the injected-footer
 */
exports.fadeOutItem = function () {
  if ($('body').hasClass('single-page')) {
    var footerHeight = $('footer').height();
    var pageHeight = document.body.scrollHeight - $(window).height();
    var sweetSpot = pageHeight - (footerHeight + $(window).height());
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
  $('head').append('<style id="descriptionsSlideUp">\n  /*-- Tile Description Pop-up Hover --*/\n  #collection-items .tile .description {\n    -webkit-transition: all 0.4s ease-out;\n    transition: all 0.4s ease-out;\n  }\n  #collection-items .tile .description .long-h3 {\n    display: block !important;\n  }\n  \n  #collection-items .tile:hover .description {\n    height: 100%;\n    -webkit-transition: all 0.3s ease-out;\n    transition: all 0.3s ease-out;\n  }\n  \n  #collection-items .tile .share-single {\n    display: none;\n  }\n  </style>');
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
  var internalLink = function internalLink(e) {
    e.preventDefault();
    Hubs.changePage(e.target.href);
  };

  /**
   *
   * @param {string} url - the url to replace with a relative path
   */
  var relativeLinks = function relativeLinks(url) {
    // We need relative links for local dev, so we regex for the url as the href
    var matchThis = new RegExp('^((http[s]?|ftp):/)?/?([^:/s]+)?(' + url + ')', 'gi');
    $('a').not('.onBrand--LocalDevLink').each(function () {
      var testThis = $(this).attr('href');
      if (matchThis.test(testThis) || testThis && testThis.charAt(0) === '/') {
        var newHref = testThis.replace(matchThis, '');
        if (!(newHref[0] === '/')) {
          newHref = '/' + newHref + '?onbrand';
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
    Hubs.Events.on('load', function () {
      relativeLinks(devOptions.shortHubUrl);
      Hubs.Config.hubBaseUrl = 'http://localhost:3000/';
    });
    // run on page change to get links on different pages
    Hubs.Events.on('pageChange', function () {
      relativeLinks(devOptions.shortHubUrl);
      Hubs.Config.hubBaseUrl = 'http://localhost:3000/';
    });
    // get all the links on extra tiles added in
    Hubs.Events.on('itemsLoaded', function () {
      relativeLinks(devOptions.shortHubUrl);
    });
    $(window).on('search', function () {
      setTimeout(function () {
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
  $(el).attr('class', '').children().each(removeClasses);
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
exports.doIfTagRegex = function doIfTagRegex(filterBy) {
  var yesTagFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var noTagFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var not = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  if (!(filterBy instanceof RegExp)) {
    console.error(filterBy + ' is not a valid regular expression! Please use new RegExp() to generate one!');
    return false;
  } else if ($('body').hasClass('include_fe_item_tags')) {
    $('.tile').not(not).each(function (i, el) {
      // Get the tags for this tile.
      var allTagsString = el.dataset.tags;

      // assume it doesn't have the tag we want
      var hasTag = false;
      var theTag = void 0;
      // If there is any tags to even check...
      if (allTagsString) {
        // split the tags into an array
        var allTagsArray = allTagsString.split(',');

        // loop over the array
        allTagsArray.forEach(function (tag) {
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

exports.noQueryStringSafeguard = function () {
  if (/localhost:3000/gi.test(window.location.host) && !(/\?onbrand/gi.test(window.location.href) || /&onbrand/gi.test(window.location.href))) {
    console.error('It looks like you are in dev mode, but you\'re missing the onbrand query string.');
  }
};

/**
 * Returns the stream class for that page.
 *
 * @returns {String} 'stream-xxxxx' or false, if the page has no stream.
 */
exports.getStreamClass = function () {
  var classes = $('body').attr('class');
  var classArray = classes.split(' ');
  var streamClass = void 0;
  classArray.forEach(function (currentClass) {
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
  var typeArray = [];

  /**
   * Removes all known type classes from the body, then adds whichever
   * is relevent to that page. Checks to see if that class is known, and if
   * not, adds it to the array.
   */
  function detectAndAddClass() {
    typeArray.forEach(function (type) {
      return $('body').removeClass(type);
    });

    var $class = $('#page-type-identifier').attr('data-item-type');
    if ($class) {
      $('body').addClass($class);
      if (!typeArray.includes($class)) {
        typeArray.push($class);
      }
    }

    if (!$('body').hasClass('webpackBuild')) {
      $('body').addClass('webpackBuild');
    }
  }

  // Event listeners
  Hubs.Events.on('load', detectAndAddClass);
  Hubs.Events.on('pageChange', detectAndAddClass);
};

/**
 * Locks the reco engine panel to the bottom of the provided target,
 * but moves it to the top of the screen when the target is out of view.
 *
 * @param {Selector} target
 */
function recoEnginePositioning(targetSel) {
  var reposition = function (target) {
    try {
      var $reco = $('.reco-panel');
      var bottomOfTarget = $(target).offset().top + $(target).height();
      var calculatedPosition = bottomOfTarget - $(window).scrollTop();
      var desiredPosition = calculatedPosition > 0 ? calculatedPosition : 0;
      $reco.css('top', desiredPosition);
    } catch (err) {
      console.warn('recoEnginePositioning() has failed - the error thrown was:');
      console.error(err);
      console.warn('The target used was:' + target);
    }
  }.bind($('.reco-panel'), targetSel);

  Hubs.Events.on('scroll', reposition);
  Hubs.Events.on('load', reposition);
  Hubs.Events.on('pageChange', reposition);
  Hubs.Events.on('resize', reposition);
}

//# sourceMappingURL=index.js.map