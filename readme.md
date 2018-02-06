# The Onbrand Utility Function Library

## 1. What is this, and what is it for?
This package is a collection of usefull reusable functions for building [Uberflip](https://www.uberflip.com/) hubs. It allows for quick, stable, bug free implementation of various features, and works in combination with the [Onbrand framework](https://www.npmjs.com/package/onbrand-project-generator) to provide high-quality custom builds for clients. 

The supporting documentation for the functions contained in this library can be found here: http://cihost.uberflip.com/docs/

## 2. How do I use it?
This library depends on jQuery. At the time of writing this, jQuery is included in all Uberflip Hubs, and so this module should be usable without importing jQuery separately. 

Typically, this library would be automatically included when generating a new onbrand project. The library is to be installed via npm `npm install onbrandutilityfunctions`, then refferenced in your scripts via import. Here is a simple example:

    import onbrandutilityfunctions from 'onbrandutilityfunctions';
    onbrandutilityfunctions.doIfTag('someTag', someFunc);

These functions should be run through babel.js to ensure maximum compatibility. 

## 3. Some Examples:

I want to execute code on every tile that has the tag `blog`

    Hubs.Events.on('load', function(){
        onbrandutilityfunctions.doIfTag('blog', function(){
	    	$(this).find('a.view').text('I changed the label!');
	    })
    })


I want to fade out the next item flyout before it overlaps the footer I have added to the page:

    Hubs.Events.on('scroll', function(){
        onbrandutilityfunctions.fadeOutItem();
    })
