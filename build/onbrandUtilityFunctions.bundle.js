!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("onbrandUtilityFunctions",[],n):"object"==typeof exports?exports.onbrandUtilityFunctions=n():e.onbrandUtilityFunctions=n()}(window,function(){return function(e){var n={};function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=1)}([function(e,n,t){"use strict";e.exports=function e(n){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.options=Object.assign({},{forPage:"hub-page",forPages:!1,imageUrl:"#"},n),console.log("This is a work in progress, currently it cannot be used.")}},function(e,n,t){"use strict";function o(e){var n,t,o=$("#injected-header"),i=$(".top-nav");return n="fixed"===o.css("position")?o.outerHeight(!0):0===o.height()?$("#injected-header>*").outerHeight(!0):0,t="fixed"===i.css("position")?i.outerHeight(!0):0,e||n+t}n.Banner=t(0),n.doIfTag=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";if(!$("body").hasClass("include_fe_item_tags"))return console.error("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"),console.error("  Onbrander: You called doIfTag, but front end tags are NOT enabled !"),console.error("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"),!1;$(".tile").not(o).each(function(i,r){var a=r.dataset.tags,s=!1;return a&&a.split(",").forEach(function(n){n.toLowerCase()===e.toLowerCase()&&(s=!0)}),s?(n.call(this),$(this).addClass(o),!0):(t.call(this),$(this).addClass(o),!0)})},n.fixShareWidgetImproved=function(){$("head").append('\n  <style id="shareWidgetFix">\n    .relativeDiv {\n      position: relative;\n      float: right;\n    }\n\n    .relativeDiv.relativeDiv--search {\n      float: left;\n    }\n\n    .relativeDiv--share:hover .share-hub {\n      display: block;\n    }\n\n    .share-hub,\n    .share-item {\n      margin: auto;\n    }\n\n    .search-drop-down {\n      position: absolute;\n    }\n\n    @media all and (min-width: 860px) {\n      .share-hub,\n      .share-item {\n        right: auto;\n        position: absolute;\n        left: -450% !important;\n        top: 51px !important;\n      }\n      .search-drop-down {\n        right: 0;\n        position: absolute;\n        left: -4% !important;\n        top: 55px !important;\n      }\n    }\n\n    @media all and (max-width: 860px) {\n      .share-hub,\n      .share-item {\n        right: auto;\n        position: absolute;\n        left: -576% !important;\n        top: 45px !important;\n      }\n    }\n\n    @media all and (max-width: 720px) {\n      .share-hub,\n      .share-item {\n        right: auto;\n        position: absolute;\n        left: -465% !important;\n        top: 45px !important;\n      }\n    }\n  </style>'),$(".right-side-btns").prepend('<div class="relativeDiv relativeDiv--share"><div class="insertFlag--share"></div></div>'),$("#share-main-hub").clone().insertAfter(".insertFlag--share"),$(".share-toggle").insertAfter(".insertFlag--share"),$(".right-side-btns").prepend('<div class="relativeDiv relativeDiv--search"><div class="insertFlag--search"></div></div>'),$(".search-drop-down").insertAfter(".insertFlag--search"),$(".search-container").insertAfter(".insertFlag--search");var e=$("#share-main-hub"),n=function(){$(".meta-inner .share-container").length?($(".right-side-btns .share-hub").remove(),$(".right-side-btns .share-container").remove(),$(".meta-inner .share-container").insertAfter(".insertFlag--share").find("a.hooked").removeClass("hooked"),Hubs.App.prototype.overrideLinks()):$(".share-item.type-collection").length&&!$("body").hasClass("hub-page")?($(".right-side-btns .share-hub").remove(),$(".right-side-btns .share-container").remove(),$("#hubs-container .page-aligner>.share-container").insertAfter(".insertFlag--share").find("a.hooked").removeClass("hooked"),Hubs.App.prototype.overrideLinks()):($(".right-side-btns .share-hub").remove(),$(".right-side-btns .share-container").remove(),$("#share-main-hub").length?($("#share-main-hub").clone().insertAfter(".insertFlag--share").find("a.hooked").removeClass("hooked"),Hubs.App.prototype.overrideLinks()):(e.clone().insertAfter(".insertFlag--share").find("a.hooked").removeClass("hooked"),Hubs.App.prototype.overrideLinks()))};return document.querySelectorAll("#share-main-hub li a").forEach(function(e){return e.addEventListener("click",function(e){e.preventDefault(),window.open(this.href,"windowName","width=540, height=433, left=24, top=24, scrollbars, resizable")})}),Hubs.Events.on("load",n),Hubs.Events.on("pageChange",n),n},n.blockCtaFix=function(){var e=$(".block-cta:not(.embed-cta)");if(e.length&&!$(".level-three .block-cta").length){var n=$(".main"),t=e.height()/2,o=n.offset().top,i=n.offset().top+n.height(),r=$(window).scrollTop()+$(window).height()/2,a=r+t;r-t<o?e.css({position:"absolute",top:o,bottom:"",transform:"translate(-50%, -50%)",margin:0}):a>i?e.css({position:"absolute",top:i-e.height()-t,transform:"translate(-50%, -50%)",margin:0}):e.css({position:"fixed",top:"50vh",bottom:"",transform:"translate(-50%, -50%)",margin:0})}},n.fadeOutItem=function(){if($("body").hasClass("single-page")){var e=$("footer").height(),n=document.body.scrollHeight-$(window).height()-(e+$(window).height());$(window).scrollTop()>n?$(".item-next-prev").fadeOut("fast"):$(".item-next-prev").fadeIn("fast")}},n.descriptionSlideUp=function(){$("head").append('<style id="descriptionsSlideUp">\n  /*-- Tile Description Pop-up Hover --*/\n  #collection-items .tile .description {\n    -webkit-transition: all 0.4s ease-out;\n    transition: all 0.4s ease-out;\n  }\n  #collection-items .tile .description .long-h3 {\n    display: block !important;\n  }\n  \n  #collection-items .tile:hover .description {\n    height: 100%;\n    -webkit-transition: all 0.3s ease-out;\n    transition: all 0.3s ease-out;\n  }\n  \n  #collection-items .tile .share-single {\n    display: none;\n  }\n  </style>')},n.devMode=function(e){console.log(" "),console.log(" "),console.warn("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="),console.warn("   Hey Onbrander, Just letting you know that we're in dev mode!"),console.warn("   You have access to the following functions:",n),console.warn("   More info available here: http://cihost.uberflip.com/docs/"),console.warn("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="),console.log(" "),console.log(" ");var t=function(e){e.preventDefault(),Hubs.changePage(e.target.href)},o=function(e){var n=new RegExp("^((http[s]?|ftp):/)?/?([^:/s]+)?("+e+")","gi");$("a").not(".onBrand--LocalDevLink").each(function(){var e=$(this).attr("href");if(n.test(e)||e&&"/"===e.charAt(0)){var o=e.replace(n,"");"/"!==o[0]?o="/"+o+"?onbrand":o+="?onbrand",$(this).attr("href",o),$(this).attr("target",""),$(this).on("click",t),$(this).addClass("onBrand--LocalDevLink")}})};production||(o(e.shortHubUrl),Hubs.Config.hubBaseUrl="http://localhost:3000/",Hubs.Events.on("load",function(){o(e.shortHubUrl),Hubs.Config.hubBaseUrl="http://localhost:3000/"}),Hubs.Events.on("pageChange",function(){o(e.shortHubUrl),Hubs.Config.hubBaseUrl="http://localhost:3000/"}),Hubs.Events.on("itemsLoaded",function(){o(e.shortHubUrl)}),$(window).on("search",function(){setTimeout(function(){o(e.shortHubUrl)},500)}))},n.removeClasses=function e(n,t){$(t).attr("class","").children().each(e)},n.doIfTagRegex=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";return e instanceof RegExp?$("body").hasClass("include_fe_item_tags")?void $(".tile").not(o).each(function(i,r){var a=r.dataset.tags,s=!1,l=void 0;return a&&a.split(",").forEach(function(n){e.test(n)&&(s=!0,l=n)}),s?(n.call(this,l),$(this).addClass(o),!0):(t.call(this),$(this).addClass(o),!0)}):(console.error("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"),console.error("  Onbrander: You called doIfTag, but front end tags are NOT enabled !"),console.error("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"),!1):(console.error(e+" is not a valid regular expression! Please use new RegExp() to generate one!"),!1)},n.noQueryStringSafeguard=function(){!/localhost:3000/gi.test(window.location.host)||/\?onbrand/gi.test(window.location.href)||/&onbrand/gi.test(window.location.href)||console.error("It looks like you are in dev mode, but you're missing the onbrand query string.")},n.getStreamClass=function(){var e=void 0;return $("body").attr("class").split(" ").forEach(function(n){/stream-/gi.test(n)&&(e=n)}),e||!1},n.helpfulClasses=function(){var e=["sales-stream","marketing-stream"];function n(){e.forEach(function(e){return $("body").removeClass(e)});var n=$("#page-type-identifier").attr("data-item-type"),t=$("#hubs-container > div:eq(0)").attr("data-collection-type");n&&($("body").addClass(n),e.includes(n)||e.push(n)),$("body").hasClass("webpackBuild")||$("body").addClass("webpackBuild"),"targeted"===t?$("body").addClass("sales-stream"):"custom"===t&&$("body").addClass("marketing-stream")}Hubs.Events.on("load",n).on("pageChange",n)},n.recoEnginePositioning=function(e){var n=function(e){try{var n=$(".reco-panel"),t=$(e).offset().top+$(e).height()-$(window).scrollTop(),o=t>0?t:0;n.css("top",o)}catch(n){console.warn("recoEnginePositioning() has failed - the error thrown was:"),console.error(n),console.warn("The target used was:"+e)}}.bind($(".reco-panel"),e);Hubs.Events.on("scroll",n),Hubs.Events.on("load",n),Hubs.Events.on("pageChange",n),Hubs.Events.on("resize",n)},n.sideCtaFix=function(e){var n=o(e);if($(window).width()>1351&&$(".entry-wrapper").length){var t=$(window).scrollTop(),i=$(".cta-item-container .cta");if(i.length>0){var r=i.height(),a=$(".level-three").eq(0).offset().top,s=$(".level-three").eq(0).offset().top+$(".level-three").height();i.css("top",a-t),t+n>a&&i.css("top",n),t+n+r>s&&i.css("top",s-r-t)}}},n.addThisFix=function(e){var n=o(e);if($(window).width()>980){var t=$(window).scrollTop(),i=$(".addthis_toolbox");if(i.length>0){var r=i.height(),a=$(".level-three").eq(0).offset().top,s=$(".level-three").eq(0).offset().top+$(".level-three").height();i.css("top",a-t),t+n>a&&i.css("top",n),t+n+r>s&&i.css("top",s-r-t)}}},n.removeTouchForLaptops=function(){/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)||$("html").removeClass("touch")},n.overrideHubFuctions=function(){Hubs.Search.prototype.updateOverlaySize=function(){}},n.legacyEvents=function(){var e=Hubs.Config.serverUrl;jQuery.each(e,function(n,t){-1===t.indexOf("/hubsFront/")&&delete e[n]}),window.ufEvents||(window.ufEvents=[],jQuery.each(e,function(e,n){var t=n,o=t.replace("/hubsFront/ajax_","").replace("hubsFront/","").replace("/","");jQuery(document).on("ajaxSuccess",function(e,n,i){if(i.url.indexOf(t)>=0){var r=new Event(o);$(this).trigger(r),console.log("%c Event Dispatched: ","background: #0058ce; color: #FFF;padding:5px;",o)}}),window.ufEvents.push(o)}),jQuery(document).on("ajaxSuccess",function(e,n,t){if("GET"===t.type&&-1===t.url.indexOf("/hubsFront/")&&t.url.indexOf(((i=Hubs.Config.hubBaseUrl).indexOf("://")>-1?i.split("/")[2]:i.split("/")[0]).split(":")[0])>-1){var o=new Event("pageChange");jQuery(this).trigger(o),console.log("%c Event Dispatched: ","background: #0058ce; color: #FFF;padding:5px;","pageChange:",window.location.href)}var i}),window.ufEvents.push("pageChange"),console.log("%cUF Events Available:","background: #ce0058; color: #FFF;padding:5px;line-height:3;font-weight:bold;",window.ufEvents.toString()))},n.legacyEmbedTileFix=function(){!function(){if(-1!==window.location.href.indexOf("?embedtile")||-1!==window.location.href.indexOf("embed_cta"))throw $(".tile.single").css({position:"fixed",top:0,left:0,zIndex:2147483647,opacity:1,transform:"none","animation-name":"initial",visibility:"visible","animation-duration":0}),new Error("Embed Tile Fix triggered")}()}}])});
//# sourceMappingURL=onbrandUtilityFunctions.bundle.js.map