### onbrandutilityfunctions

`0.1.6`

*   [doIfTag](#doiftag)
*   [fixShareWidgetImproved](#fixsharewidgetimproved)
*   [blockCtaFix](#blockctafix)
*   [fadeOutItem](#fadeoutitem)
*   [descriptionSlideUp](#descriptionslideup)
*   [removeClasses](#removeclasses)
*   [doIfTagRegex](#doiftagregex)
*   [_internalLink](#_internallink)
*   [_relativeLinks](#_relativelinks)
*   [on](#on)

[Need help reading this?](http://documentation.js.org/reading-documentation.html)

### doIfTag

Loop over each tile, and if the tag specified (1st param) is present, execute yesTagFn (2nd param) if the tag is not present, execute noTagFn (3rd param). In both callbacks, **this** reffers to the tile currently being checked

doIfTag(filterBy: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), yesTagFn: [function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function), noTagFn: [function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function), not: any, OPTIONAL: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

Parameters

filterBy `([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))` --\> The tag to look for

yesTagFn ``([function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) = `function(){}`)`` --\> The function to run if a tile has the desired tag.

noTagFn ``([function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) = `function(){}`)`` --\> The function to run if a tile does NOT have the desired tag.

not ``(any = `''`)``

OPTIONAL `([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))` : A css class to ignore, and to add after the tile has been processed.

Returns

`[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)`: --\> returns true if the front end tags are enabled, otherwise returns false and logs an error.

### fixShareWidgetImproved

Take the hub share window, rip it out, and make our own. On page change, replace our new share window with the appropriate one for that page. Applies event listeners for load and page change, simply call near the begining of your code.

fixShareWidgetImproved(): [function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)

Returns

`[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)`: --\> The function that updates on page change.

### blockCtaFix

This function is to be called on scroll, and will keep the block CTAs within the bounds of the article they are supposed to be blocking (preventing them from overlapping the injected header and footer).

blockCtaFix()

### fadeOutItem

When called on scroll, this function will fade out the next-item-flyout before it can overlap with the injected-footer

fadeOutItem()

### descriptionSlideUp

Simply adds the css required to have tile descriptions slide up on hover

descriptionSlideUp()

### removeClasses

Recursivley remove all the standard classes from our topnav clone, add some handly classes in the prcoess. Called as the callback to a jQuery .each(). EX $(parent).children().each(removeClasses)

removeClasses(i: index, el: [element](https://developer.mozilla.org/en-US/docs/Web/API/Element))

Parameters

i `(index)`

el `([element](https://developer.mozilla.org/en-US/docs/Web/API/Element))`

### doIfTagRegex

doIfTagRegex(filterBy: any, yesTagFn: any, noTagFn: any, not: any, OPTIONAL: [function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function), OPTIONAL: [function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function), OPTIONAL: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))

Parameters

filterBy `(any)`

yesTagFn ``(any = `function(){}`)``

noTagFn ``(any = `function(){}`)``

not ``(any = `''`)``

OPTIONAL `([function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function))` : A function to execute if the tile has the tag, THIS = the tile inside the function.

OPTIONAL `([function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function))` : A function to execute if the tile DOES NOT have the tag, THIS = the tile inside the function.

OPTIONAL `([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))` : A css class to ignore, and to add after the tile has been processed.

### _internalLink

Utility Functions

_internalLink

Parameters

e `(any)`

### _relativeLinks

_relativeLinks

Parameters

url `([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))` the url to replace with a relative path

### on

Local Development Events

on