/*!
 * jQuery JavaScript Library v2.1.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android < 4.0, iOS < 6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	// Support: Windows Web Apps (WWA)
	// `name` and `type` need .setAttribute for WWA
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE9-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') in IE9, see #12537
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {
				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {
				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);

/*
 AngularJS v1.3.4
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(U,V,u){'use strict';function z(b){return function(){var a=arguments[0],c;c="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.3.4/"+(b?b+"/":"")+a;for(a=1;a<arguments.length;a++){c=c+(1==a?"?":"&")+"p"+(a-1)+"=";var d=encodeURIComponent,e;e=arguments[a];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;c+=d(e)}return Error(c)}}function Ra(b){if(null==b||Sa(b))return!1;var a=b.length;return b.nodeType===
na&&a?!0:I(b)||D(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function r(b,a,c){var d,e;if(b)if(F(b))for(d in b)"prototype"==d||"length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d)||a.call(c,b[d],d,b);else if(D(b)||Ra(b)){var f="object"!==typeof b;d=0;for(e=b.length;d<e;d++)(f||d in b)&&a.call(c,b[d],d,b)}else if(b.forEach&&b.forEach!==r)b.forEach(a,c,b);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d,b);return b}function Bd(b,a,c){for(var d=Object.keys(b).sort(),e=0;e<d.length;e++)a.call(c,
b[d[e]],d[e]);return d}function kc(b){return function(a,c){b(c,a)}}function Cd(){return++kb}function lc(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function C(b){for(var a=b.$$hashKey,c=1,d=arguments.length;c<d;c++){var e=arguments[c];if(e)for(var f=Object.keys(e),g=0,h=f.length;g<h;g++){var k=f[g];b[k]=e[k]}}lc(b,a);return b}function $(b){return parseInt(b,10)}function x(){}function oa(b){return b}function ca(b){return function(){return b}}function G(b){return"undefined"===typeof b}function y(b){return"undefined"!==
typeof b}function K(b){return null!==b&&"object"===typeof b}function I(b){return"string"===typeof b}function X(b){return"number"===typeof b}function fa(b){return"[object Date]"===Ja.call(b)}function F(b){return"function"===typeof b}function lb(b){return"[object RegExp]"===Ja.call(b)}function Sa(b){return b&&b.window===b}function Ta(b){return b&&b.$evalAsync&&b.$watch}function Ua(b){return"boolean"===typeof b}function mc(b){return!(!b||!(b.nodeName||b.prop&&b.attr&&b.find))}function Dd(b){var a={};
b=b.split(",");var c;for(c=0;c<b.length;c++)a[b[c]]=!0;return a}function ta(b){return R(b.nodeName||b[0]&&b[0].nodeName)}function Va(b,a){var c=b.indexOf(a);0<=c&&b.splice(c,1);return a}function Ca(b,a,c,d){if(Sa(b)||Ta(b))throw Wa("cpws");if(a){if(b===a)throw Wa("cpi");c=c||[];d=d||[];if(K(b)){var e=c.indexOf(b);if(-1!==e)return d[e];c.push(b);d.push(a)}if(D(b))for(var f=a.length=0;f<b.length;f++)e=Ca(b[f],null,c,d),K(b[f])&&(c.push(b[f]),d.push(e)),a.push(e);else{var g=a.$$hashKey;D(a)?a.length=
0:r(a,function(b,c){delete a[c]});for(f in b)b.hasOwnProperty(f)&&(e=Ca(b[f],null,c,d),K(b[f])&&(c.push(b[f]),d.push(e)),a[f]=e);lc(a,g)}}else if(a=b)D(b)?a=Ca(b,[],c,d):fa(b)?a=new Date(b.getTime()):lb(b)?(a=new RegExp(b.source,b.toString().match(/[^\/]*$/)[0]),a.lastIndex=b.lastIndex):K(b)&&(e=Object.create(Object.getPrototypeOf(b)),a=Ca(b,e,c,d));return a}function ua(b,a){if(D(b)){a=a||[];for(var c=0,d=b.length;c<d;c++)a[c]=b[c]}else if(K(b))for(c in a=a||{},b)if("$"!==c.charAt(0)||"$"!==c.charAt(1))a[c]=
b[c];return a||b}function pa(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(D(b)){if(!D(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!pa(b[d],a[d]))return!1;return!0}}else{if(fa(b))return fa(a)?pa(b.getTime(),a.getTime()):!1;if(lb(b)&&lb(a))return b.toString()==a.toString();if(Ta(b)||Ta(a)||Sa(b)||Sa(a)||D(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!F(b[d])){if(!pa(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&
"$"!==d.charAt(0)&&a[d]!==u&&!F(a[d]))return!1;return!0}return!1}function Xa(b,a,c){return b.concat(Ya.call(a,c))}function nc(b,a){var c=2<arguments.length?Ya.call(arguments,2):[];return!F(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,Xa(c,arguments,0)):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Ed(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)&&"$"===b.charAt(1)?c=u:Sa(a)?c="$WINDOW":a&&V===a?c="$DOCUMENT":Ta(a)&&
(c="$SCOPE");return c}function Za(b,a){return"undefined"===typeof b?u:JSON.stringify(b,Ed,a?"  ":null)}function oc(b){return I(b)?JSON.parse(b):b}function va(b){b=A(b).clone();try{b.empty()}catch(a){}var c=A("<div>").append(b).html();try{return b[0].nodeType===mb?R(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+R(b)})}catch(d){return R(c)}}function pc(b){try{return decodeURIComponent(b)}catch(a){}}function qc(b){var a={},c,d;r((b||"").split("&"),function(b){b&&(c=b.replace(/\+/g,
"%20").split("="),d=pc(c[0]),y(d)&&(b=y(c[1])?pc(c[1]):!0,Jb.call(a,d)?D(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Kb(b){var a=[];r(b,function(b,d){D(b)?r(b,function(b){a.push(Da(d,!0)+(!0===b?"":"="+Da(b,!0)))}):a.push(Da(d,!0)+(!0===b?"":"="+Da(b,!0)))});return a.length?a.join("&"):""}function nb(b){return Da(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function Da(b,a){return encodeURIComponent(b).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,
"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,a?"%20":"+")}function Fd(b,a){var c,d,e=ob.length;b=A(b);for(d=0;d<e;++d)if(c=ob[d]+a,I(c=b.attr(c)))return c;return null}function Gd(b,a){var c,d,e={};r(ob,function(a){a+="app";!c&&b.hasAttribute&&b.hasAttribute(a)&&(c=b,d=b.getAttribute(a))});r(ob,function(a){a+="app";var e;!c&&(e=b.querySelector("["+a.replace(":","\\:")+"]"))&&(c=e,d=e.getAttribute(a))});c&&(e.strictDi=null!==Fd(c,"strict-di"),a(c,d?[d]:[],e))}function rc(b,a,c){K(c)||
(c={});c=C({strictDi:!1},c);var d=function(){b=A(b);if(b.injector()){var d=b[0]===V?"document":va(b);throw Wa("btstrpd",d.replace(/</,"&lt;").replace(/>/,"&gt;"));}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);c.debugInfoEnabled&&a.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);a.unshift("ng");d=Lb(a,c.strictDi);d.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return d},e=
/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;U&&e.test(U.name)&&(c.debugInfoEnabled=!0,U.name=U.name.replace(e,""));if(U&&!f.test(U.name))return d();U.name=U.name.replace(f,"");ha.resumeBootstrap=function(b){r(b,function(b){a.push(b)});d()}}function Hd(){U.name="NG_ENABLE_DEBUG_INFO!"+U.name;U.location.reload()}function Id(b){return ha.element(b).injector().get("$$testability")}function Mb(b,a){a=a||"_";return b.replace(Jd,function(b,d){return(d?a:"")+b.toLowerCase()})}function Kd(){var b;sc||
((qa=U.jQuery)&&qa.fn.on?(A=qa,C(qa.fn,{scope:Ka.scope,isolateScope:Ka.isolateScope,controller:Ka.controller,injector:Ka.injector,inheritedData:Ka.inheritedData}),b=qa.cleanData,qa.cleanData=function(a){var c;if(Nb)Nb=!1;else for(var d=0,e;null!=(e=a[d]);d++)(c=qa._data(e,"events"))&&c.$destroy&&qa(e).triggerHandler("$destroy");b(a)}):A=S,ha.element=A,sc=!0)}function Ob(b,a,c){if(!b)throw Wa("areq",a||"?",c||"required");return b}function pb(b,a,c){c&&D(b)&&(b=b[b.length-1]);Ob(F(b),a,"not a function, got "+
(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function La(b,a){if("hasOwnProperty"===b)throw Wa("badname",a);}function tc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&F(b)?nc(e,b):b}function qb(b){var a=b[0];b=b[b.length-1];var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return A(c)}function ia(){return Object.create(null)}function Ld(b){function a(a,b,c){return a[b]||(a[b]=c())}var c=z("$injector"),
d=z("ng");b=a(b,"angular",Object);b.$$minErr=b.$$minErr||z;return a(b,"module",function(){var b={};return function(f,g,h){if("hasOwnProperty"===f)throw d("badname","module");g&&b.hasOwnProperty(f)&&(b[f]=null);return a(b,f,function(){function a(c,d,e,f){f||(f=b);return function(){f[e||"push"]([c,d,arguments]);return t}}if(!g)throw c("nomod",f);var b=[],d=[],e=[],s=a("$injector","invoke","push",d),t={_invokeQueue:b,_configBlocks:d,_runBlocks:e,requires:g,name:f,provider:a("$provide","provider"),factory:a("$provide",
"factory"),service:a("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),animation:a("$animateProvider","register"),filter:a("$filterProvider","register"),controller:a("$controllerProvider","register"),directive:a("$compileProvider","directive"),config:s,run:function(a){e.push(a);return this}};h&&s(h);return t})}})}function Md(b){C(b,{bootstrap:rc,copy:Ca,extend:C,equals:pa,element:A,forEach:r,injector:Lb,noop:x,bind:nc,toJson:Za,fromJson:oc,identity:oa,isUndefined:G,
isDefined:y,isString:I,isFunction:F,isObject:K,isNumber:X,isElement:mc,isArray:D,version:Nd,isDate:fa,lowercase:R,uppercase:rb,callbacks:{counter:0},getTestability:Id,$$minErr:z,$$csp:$a,reloadWithDebugInfo:Hd});ab=Ld(U);try{ab("ngLocale")}catch(a){ab("ngLocale",[]).provider("$locale",Od)}ab("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:Pd});a.provider("$compile",uc).directive({a:Qd,input:vc,textarea:vc,form:Rd,script:Sd,select:Td,style:Ud,option:Vd,ngBind:Wd,ngBindHtml:Xd,ngBindTemplate:Yd,
ngClass:Zd,ngClassEven:$d,ngClassOdd:ae,ngCloak:be,ngController:ce,ngForm:de,ngHide:ee,ngIf:fe,ngInclude:ge,ngInit:he,ngNonBindable:ie,ngPluralize:je,ngRepeat:ke,ngShow:le,ngStyle:me,ngSwitch:ne,ngSwitchWhen:oe,ngSwitchDefault:pe,ngOptions:qe,ngTransclude:re,ngModel:se,ngList:te,ngChange:ue,pattern:wc,ngPattern:wc,required:xc,ngRequired:xc,minlength:yc,ngMinlength:yc,maxlength:zc,ngMaxlength:zc,ngValue:ve,ngModelOptions:we}).directive({ngInclude:xe}).directive(sb).directive(Ac);a.provider({$anchorScroll:ye,
$animate:ze,$browser:Ae,$cacheFactory:Be,$controller:Ce,$document:De,$exceptionHandler:Ee,$filter:Bc,$interpolate:Fe,$interval:Ge,$http:He,$httpBackend:Ie,$location:Je,$log:Ke,$parse:Le,$rootScope:Me,$q:Ne,$$q:Oe,$sce:Pe,$sceDelegate:Qe,$sniffer:Re,$templateCache:Se,$templateRequest:Te,$$testability:Ue,$timeout:Ve,$window:We,$$rAF:Xe,$$asyncCallback:Ye})}])}function bb(b){return b.replace(Ze,function(a,b,d,e){return e?d.toUpperCase():d}).replace($e,"Moz$1")}function Cc(b){b=b.nodeType;return b===
na||!b||9===b}function Dc(b,a){var c,d,e=a.createDocumentFragment(),f=[];if(Pb.test(b)){c=c||e.appendChild(a.createElement("div"));d=(af.exec(b)||["",""])[1].toLowerCase();d=ja[d]||ja._default;c.innerHTML=d[1]+b.replace(bf,"<$1></$2>")+d[2];for(d=d[0];d--;)c=c.lastChild;f=Xa(f,c.childNodes);c=e.firstChild;c.textContent=""}else f.push(a.createTextNode(b));e.textContent="";e.innerHTML="";r(f,function(a){e.appendChild(a)});return e}function S(b){if(b instanceof S)return b;var a;I(b)&&(b=P(b),a=!0);if(!(this instanceof
S)){if(a&&"<"!=b.charAt(0))throw Qb("nosel");return new S(b)}if(a){a=V;var c;b=(c=cf.exec(b))?[a.createElement(c[1])]:(c=Dc(b,a))?c.childNodes:[]}Ec(this,b)}function Rb(b){return b.cloneNode(!0)}function tb(b,a){a||ub(b);if(b.querySelectorAll)for(var c=b.querySelectorAll("*"),d=0,e=c.length;d<e;d++)ub(c[d])}function Fc(b,a,c,d){if(y(d))throw Qb("offargs");var e=(d=vb(b))&&d.events,f=d&&d.handle;if(f)if(a)r(a.split(" "),function(a){if(y(c)){var d=e[a];Va(d||[],c);if(d&&0<d.length)return}b.removeEventListener(a,
f,!1);delete e[a]});else for(a in e)"$destroy"!==a&&b.removeEventListener(a,f,!1),delete e[a]}function ub(b,a){var c=b.ng339,d=c&&wb[c];d&&(a?delete d.data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),Fc(b)),delete wb[c],b.ng339=u))}function vb(b,a){var c=b.ng339,c=c&&wb[c];a&&!c&&(b.ng339=c=++df,c=wb[c]={events:{},data:{},handle:u});return c}function Sb(b,a,c){if(Cc(b)){var d=y(c),e=!d&&a&&!K(a),f=!a;b=(b=vb(b,!e))&&b.data;if(d)b[a]=c;else{if(f)return b;if(e)return b&&b[a];C(b,a)}}}
function Tb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function Ub(b,a){a&&b.setAttribute&&r(a.split(" "),function(a){b.setAttribute("class",P((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+P(a)+" "," ")))})}function Vb(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");r(a.split(" "),function(a){a=P(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",
P(c))}}function Ec(b,a){if(a)if(a.nodeType)b[b.length++]=a;else{var c=a.length;if("number"===typeof c&&a.window!==a){if(c)for(var d=0;d<c;d++)b[b.length++]=a[d]}else b[b.length++]=a}}function Gc(b,a){return xb(b,"$"+(a||"ngController")+"Controller")}function xb(b,a,c){9==b.nodeType&&(b=b.documentElement);for(a=D(a)?a:[a];b;){for(var d=0,e=a.length;d<e;d++)if((c=A.data(b,a[d]))!==u)return c;b=b.parentNode||11===b.nodeType&&b.host}}function Hc(b){for(tb(b,!0);b.firstChild;)b.removeChild(b.firstChild)}
function Ic(b,a){a||tb(b);var c=b.parentNode;c&&c.removeChild(b)}function ef(b,a){a=a||U;if("complete"===a.document.readyState)a.setTimeout(b);else A(a).on("load",b)}function Jc(b,a){var c=yb[a.toLowerCase()];return c&&Kc[ta(b)]&&c}function ff(b,a){var c=b.nodeName;return("INPUT"===c||"TEXTAREA"===c)&&Lc[a]}function gf(b,a){var c=function(c,e){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=a[e||c.type],g=f?f.length:0;if(g){if(G(c.immediatePropagationStopped)){var h=c.stopImmediatePropagation;
c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};1<g&&(f=ua(f));for(var k=0;k<g;k++)c.isImmediatePropagationStopped()||f[k].call(b,c)}};c.elem=b;return c}function Ma(b,a){var c=b&&b.$$hashKey;if(c)return"function"===typeof c&&(c=b.$$hashKey()),c;c=typeof b;return c="function"==c||"object"==c&&null!==b?b.$$hashKey=c+":"+(a||Cd)():c+":"+b}function cb(b,
a){if(a){var c=0;this.nextUid=function(){return++c}}r(b,this.put,this)}function hf(b){return(b=b.toString().replace(Mc,"").match(Nc))?"function("+(b[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function Wb(b,a,c){var d;if("function"===typeof b){if(!(d=b.$inject)){d=[];if(b.length){if(a)throw I(c)&&c||(c=b.name||hf(b)),Ea("strictdi",c);a=b.toString().replace(Mc,"");a=a.match(Nc);r(a[1].split(jf),function(a){a.replace(kf,function(a,b,c){d.push(c)})})}b.$inject=d}}else D(b)?(a=b.length-1,pb(b[a],"fn"),
d=b.slice(0,a)):pb(b,"fn",!0);return d}function Lb(b,a){function c(a){return function(b,c){if(K(b))r(b,kc(a));else return a(b,c)}}function d(a,b){La(a,"service");if(F(b)||D(b))b=s.instantiate(b);if(!b.$get)throw Ea("pget",a);return p[a+"Provider"]=b}function e(a,b){return function(){var c=q.invoke(b,this,u,a);if(G(c))throw Ea("undef",a);return c}}function f(a,b,c){return d(a,{$get:!1!==c?e(a,b):b})}function g(a){var b=[],c;r(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],
f=s.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.put(a,!0);try{I(a)?(c=ab(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):F(a)?b.push(s.invoke(a)):D(a)?b.push(s.invoke(a)):pb(a,"module")}catch(e){throw D(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ea("modulerr",a,e.stack||e.message||e);}}});return b}function h(b,c){function d(a){if(b.hasOwnProperty(a)){if(b[a]===k)throw Ea("cdep",a+" <- "+l.join(" <- "));
return b[a]}try{return l.unshift(a),b[a]=k,b[a]=c(a)}catch(e){throw b[a]===k&&delete b[a],e;}finally{l.shift()}}function e(b,c,f,g){"string"===typeof f&&(g=f,f=null);var k=[];g=Wb(b,a,g);var h,l,q;l=0;for(h=g.length;l<h;l++){q=g[l];if("string"!==typeof q)throw Ea("itkn",q);k.push(f&&f.hasOwnProperty(q)?f[q]:d(q))}D(b)&&(b=b[h]);return b.apply(c,k)}return{invoke:e,instantiate:function(a,b,c){var d=Object.create((D(a)?a[a.length-1]:a).prototype);a=e(a,d,b,c);return K(a)||F(a)?a:d},get:d,annotate:Wb,
has:function(a){return p.hasOwnProperty(a+"Provider")||b.hasOwnProperty(a)}}}a=!0===a;var k={},l=[],m=new cb([],!0),p={$provide:{provider:c(d),factory:c(f),service:c(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:c(function(a,b){return f(a,ca(b),!1)}),constant:c(function(a,b){La(a,"constant");p[a]=b;t[a]=b}),decorator:function(a,b){var c=s.get(a+"Provider"),d=c.$get;c.$get=function(){var a=q.invoke(d,c);return q.invoke(b,null,{$delegate:a})}}}},s=p.$injector=
h(p,function(){throw Ea("unpr",l.join(" <- "));}),t={},q=t.$injector=h(t,function(a){var b=s.get(a+"Provider");return q.invoke(b.$get,b,u,a)});r(g(b),function(a){q.invoke(a||x)});return q}function ye(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===ta(a))return b=a,!0});return b}function f(b){if(b){b.scrollIntoView();var c;c=g.yOffset;F(c)?c=c():mc(c)?(c=c[0],
c="fixed"!==a.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):X(c)||(c=0);c&&(b=b.getBoundingClientRect().top,a.scrollBy(0,b-c))}else a.scrollTo(0,0)}function g(){var a=c.hash(),b;a?(b=h.getElementById(a))?f(b):(b=e(h.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var h=a.document;b&&d.$watch(function(){return c.hash()},function(a,b){a===b&&""===a||ef(function(){d.$evalAsync(g)})});return g}]}function Ye(){this.$get=["$$rAF","$timeout",function(b,a){return b.supported?function(a){return b(a)}:
function(b){return a(b,0,!1)}}]}function lf(b,a,c,d){function e(a){try{a.apply(null,Ya.call(arguments,1))}finally{if(v--,0===v)for(;w.length;)try{w.pop()()}catch(b){c.error(b)}}}function f(a,b){(function ya(){r(O,function(a){a()});E=b(ya,a)})()}function g(){h();k()}function h(){H=b.history.state;H=G(H)?null:H;pa(H,Q)&&(H=Q);Q=H}function k(){if(B!==m.url()||M!==H)B=m.url(),M=H,r(W,function(a){a(m.url(),H)})}function l(a){try{return decodeURIComponent(a)}catch(b){return a}}var m=this,p=a[0],s=b.location,
t=b.history,q=b.setTimeout,N=b.clearTimeout,n={};m.isMock=!1;var v=0,w=[];m.$$completeOutstandingRequest=e;m.$$incOutstandingRequestCount=function(){v++};m.notifyWhenNoOutstandingRequests=function(a){r(O,function(a){a()});0===v?a():w.push(a)};var O=[],E;m.addPollFn=function(a){G(E)&&f(100,q);O.push(a);return a};var H,M,B=s.href,ea=a.find("base"),L=null;h();M=H;m.url=function(a,c,e){G(e)&&(e=null);s!==b.location&&(s=b.location);t!==b.history&&(t=b.history);if(a){var f=M===e;if(B===a&&(!d.history||
f))return m;var g=B&&Fa(B)===Fa(a);B=a;M=e;!d.history||g&&f?(g||(L=a),c?s.replace(a):s.href=a):(t[c?"replaceState":"pushState"](e,"",a),h(),M=H);return m}return L||s.href.replace(/%27/g,"'")};m.state=function(){return H};var W=[],ba=!1,Q=null;m.onUrlChange=function(a){if(!ba){if(d.history)A(b).on("popstate",g);A(b).on("hashchange",g);ba=!0}W.push(a);return a};m.$$checkUrlChange=k;m.baseHref=function(){var a=ea.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var aa={},y="",da=m.baseHref();
m.cookies=function(a,b){var d,e,f,g;if(a)b===u?p.cookie=encodeURIComponent(a)+"=;path="+da+";expires=Thu, 01 Jan 1970 00:00:00 GMT":I(b)&&(d=(p.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+";path="+da).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(p.cookie!==y)for(y=p.cookie,d=y.split("; "),aa={},f=0;f<d.length;f++)e=d[f],g=e.indexOf("="),0<g&&(a=l(e.substring(0,g)),aa[a]===u&&(aa[a]=l(e.substring(g+1))));
return aa}};m.defer=function(a,b){var c;v++;c=q(function(){delete n[c];e(a)},b||0);n[c]=!0;return c};m.defer.cancel=function(a){return n[a]?(delete n[a],N(a),e(x),!0):!1}}function Ae(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new lf(b,d,a,c)}]}function Be(){this.$get=function(){function b(b,d){function e(a){a!=p&&(s?s==a&&(s=a.n):s=a,f(a.n,a.p),f(a,p),p=a,p.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw z("$cacheFactory")("iid",b);var g=0,
h=C({},d,{id:b}),k={},l=d&&d.capacity||Number.MAX_VALUE,m={},p=null,s=null;return a[b]={put:function(a,b){if(l<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}if(!G(b))return a in k||g++,k[a]=b,g>l&&this.remove(s.key),b},get:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return k[a]},remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b==p&&(p=b.p);b==s&&(s=b.n);f(b.n,b.p);delete m[a]}delete k[a];g--},removeAll:function(){k={};g=0;m={};p=s=null},destroy:function(){m=
h=k=null;delete a[b]},info:function(){return C({},h,{size:g})}}}var a={};b.info=function(){var b={};r(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function Se(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function uc(b,a){function c(a,b){var c=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,d={};r(a,function(a,e){var f=a.match(c);if(!f)throw ka("iscp",b,e,a);d[e]={mode:f[1][0],collection:"*"===f[2],optional:"?"===f[3],attrName:f[4]||e}});return d}var d=
{},e=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,f=/(([\w\-]+)(?:\:([^;]+))?;?)/,g=Dd("ngSrc,ngSrcset,src,srcset"),h=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,k=/^(on[a-z]+|formaction)$/;this.directive=function p(a,e){La(a,"directive");I(a)?(Ob(e,"directiveFactory"),d.hasOwnProperty(a)||(d[a]=[],b.factory(a+"Directive",["$injector","$exceptionHandler",function(b,e){var f=[];r(d[a],function(d,g){try{var h=b.invoke(d);F(h)?h={compile:ca(h)}:!h.compile&&h.link&&(h.compile=ca(h.link));h.priority=h.priority||0;h.index=
g;h.name=h.name||a;h.require=h.require||h.controller&&h.name;h.restrict=h.restrict||"EA";K(h.scope)&&(h.$$isolateBindings=c(h.scope,h.name));f.push(h)}catch(k){e(k)}});return f}])),d[a].push(e)):r(a,kc(p));return this};this.aHrefSanitizationWhitelist=function(b){return y(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};var l=!0;this.debugInfoEnabled=
function(a){return y(a)?(l=a,this):l};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,c,q,N,n,v,w,O,E,H){function M(a,b){try{a.addClass(b)}catch(c){}}function B(a,b,c,d,e){a instanceof A||(a=A(a));r(a,function(b,c){b.nodeType==mb&&b.nodeValue.match(/\S+/)&&(a[c]=A(b).wrap("<span></span>").parent()[0])});var f=ea(a,b,a,c,d,e);B.$$addScopeClass(a);var g=null;return function(b,
c,d){Ob(b,"scope");d=d||{};var e=d.parentBoundTranscludeFn,h=d.transcludeControllers;d=d.futureParentElement;e&&e.$$boundTransclude&&(e=e.$$boundTransclude);g||(g=(d=d&&d[0])?"foreignobject"!==ta(d)&&d.toString().match(/SVG/)?"svg":"html":"html");d="html"!==g?A(U(g,A("<div>").append(a).html())):c?Ka.clone.call(a):a;if(h)for(var k in h)d.data("$"+k+"Controller",h[k].instance);B.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,e);return d}}function ea(a,b,c,d,e,f){function g(a,c,d,e){var f,k,l,q,s,n,w;if(p)for(w=
Array(c.length),q=0;q<h.length;q+=3)f=h[q],w[f]=c[f];else w=c;q=0;for(s=h.length;q<s;)k=w[h[q++]],c=h[q++],f=h[q++],c?(c.scope?(l=a.$new(),B.$$addScopeInfo(A(k),l)):l=a,n=c.transcludeOnThisElement?L(a,c.transclude,e,c.elementTranscludeOnThisElement):!c.templateOnThisElement&&e?e:!e&&b?L(a,b):null,c(f,l,k,d,n)):f&&f(a,k.childNodes,u,e)}for(var h=[],k,l,q,s,p,n=0;n<a.length;n++){k=new X;l=W(a[n],[],k,0===n?d:u,e);(f=l.length?aa(l,a[n],k,b,c,null,[],[],f):null)&&f.scope&&B.$$addScopeClass(k.$$element);
k=f&&f.terminal||!(q=a[n].childNodes)||!q.length?null:ea(q,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||k)h.push(n,f,k),s=!0,p=p||f;f=null}return s?g:null}function L(a,b,c,d){return function(d,e,f,g,h){d||(d=a.$new(!1,h),d.$$transcluded=!0);return b(d,e,{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})}}function W(b,c,g,h,k){var l=g.$attr,q;switch(b.nodeType){case na:da(c,wa(ta(b)),"E",h,k);for(var s,n,w,N=b.attributes,t=0,O=N&&N.length;t<
O;t++){var H=!1,v=!1;s=N[t];q=s.name;s=P(s.value);n=wa(q);if(w=za.test(n))q=Mb(n.substr(6),"-");var M=n.replace(/(Start|End)$/,""),E;a:{var B=M;if(d.hasOwnProperty(B)){E=void 0;for(var B=a.get(B+"Directive"),W=0,r=B.length;W<r;W++)if(E=B[W],E.multiElement){E=!0;break a}}E=!1}E&&n===M+"Start"&&(H=q,v=q.substr(0,q.length-5)+"end",q=q.substr(0,q.length-6));n=wa(q.toLowerCase());l[n]=q;if(w||!g.hasOwnProperty(n))g[n]=s,Jc(b,n)&&(g[n]=!0);S(b,c,s,n,w);da(c,n,"A",h,k,H,v)}b=b.className;if(I(b)&&""!==b)for(;q=
f.exec(b);)n=wa(q[2]),da(c,n,"C",h,k)&&(g[n]=P(q[3])),b=b.substr(q.index+q[0].length);break;case mb:T(c,b.nodeValue);break;case 8:try{if(q=e.exec(b.nodeValue))n=wa(q[1]),da(c,n,"M",h,k)&&(g[n]=P(q[2]))}catch(Q){}}c.sort(z);return c}function ba(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ka("uterdir",b,c);a.nodeType==na&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return A(d)}function Q(a,b,c){return function(d,
e,f,g,h){e=ba(e[0],b,c);return a(d,e,f,g,h)}}function aa(a,d,e,f,g,k,l,q,p){function w(a,b,c,d){if(a){c&&(a=Q(a,c,d));a.require=J.require;a.directiveName=ga;if(L===J||J.$$isolateScope)a=Y(a,{isolateScope:!0});l.push(a)}if(b){c&&(b=Q(b,c,d));b.require=J.require;b.directiveName=ga;if(L===J||J.$$isolateScope)b=Y(b,{isolateScope:!0});q.push(b)}}function O(a,b,c,d){var e,f="data",g=!1,k=c,l;if(I(b)){l=b.match(h);b=b.substring(l[0].length);l[3]&&(l[1]?l[3]=null:l[1]=l[3]);"^"===l[1]?f="inheritedData":"^^"===
l[1]&&(f="inheritedData",k=c.parent());"?"===l[2]&&(g=!0);e=null;d&&"data"===f&&(e=d[b])&&(e=e.instance);e=e||k[f]("$"+b+"Controller");if(!e&&!g)throw ka("ctreq",b,a);return e||null}D(b)&&(e=[],r(b,function(b){e.push(O(a,b,c,d))}));return e}function H(a,c,f,g,h){function k(a,b,c){var d;Ta(a)||(c=b,b=a,a=u);C&&(d=M);c||(c=C?W.parent():W);return h(a,b,d,c,Xb)}var p,w,t,v,M,db,W,Q;d===f?(Q=e,W=e.$$element):(W=A(f),Q=new X(W,e));L&&(v=c.$new(!0));h&&(db=k,db.$$boundTransclude=h);E&&(ea={},M={},r(E,function(a){var b=
{$scope:a===L||a.$$isolateScope?v:c,$element:W,$attrs:Q,$transclude:db};t=a.controller;"@"==t&&(t=Q[a.name]);b=n(t,b,!0,a.controllerAs);M[a.name]=b;C||W.data("$"+a.name+"Controller",b.instance);ea[a.name]=b}));if(L){B.$$addScopeInfo(W,v,!0,!(aa&&(aa===L||aa===L.$$originalDirective)));B.$$addScopeClass(W,!0);g=ea&&ea[L.name];var ba=v;g&&g.identifier&&!0===L.bindToController&&(ba=g.instance);r(v.$$isolateBindings=L.$$isolateBindings,function(a,d){var e=a.attrName,f=a.optional,g,h,k,l;switch(a.mode){case "@":Q.$observe(e,
function(a){ba[d]=a});Q.$$observers[e].$$scope=c;Q[e]&&(ba[d]=b(Q[e])(c));break;case "=":if(f&&!Q[e])break;h=N(Q[e]);l=h.literal?pa:function(a,b){return a===b||a!==a&&b!==b};k=h.assign||function(){g=ba[d]=h(c);throw ka("nonassign",Q[e],L.name);};g=ba[d]=h(c);f=function(a){l(a,ba[d])||(l(a,g)?k(c,a=ba[d]):ba[d]=a);return g=a};f.$stateful=!0;f=a.collection?c.$watchCollection(Q[e],f):c.$watch(N(Q[e],f),null,h.literal);v.$on("$destroy",f);break;case "&":h=N(Q[e]),ba[d]=function(a){return h(c,a)}}})}ea&&
(r(ea,function(a){a()}),ea=null);g=0;for(p=l.length;g<p;g++)w=l[g],Z(w,w.isolateScope?v:c,W,Q,w.require&&O(w.directiveName,w.require,W,M),db);var Xb=c;L&&(L.template||null===L.templateUrl)&&(Xb=v);a&&a(Xb,f.childNodes,u,h);for(g=q.length-1;0<=g;g--)w=q[g],Z(w,w.isolateScope?v:c,W,Q,w.require&&O(w.directiveName,w.require,W,M),db)}p=p||{};for(var v=-Number.MAX_VALUE,M,E=p.controllerDirectives,ea,L=p.newIsolateScopeDirective,aa=p.templateDirective,da=p.nonTlbTranscludeDirective,x=!1,Na=!1,C=p.hasElementTranscludeDirective,
T=e.$$element=A(d),J,ga,z,Ga=f,R,S=0,za=a.length;S<za;S++){J=a[S];var zb=J.$$start,$=J.$$end;zb&&(T=ba(d,zb,$));z=u;if(v>J.priority)break;if(z=J.scope)J.templateUrl||(K(z)?(ya("new/isolated scope",L||M,J,T),L=J):ya("new/isolated scope",L,J,T)),M=M||J;ga=J.name;!J.templateUrl&&J.controller&&(z=J.controller,E=E||{},ya("'"+ga+"' controller",E[ga],J,T),E[ga]=J);if(z=J.transclude)x=!0,J.$$tlb||(ya("transclusion",da,J,T),da=J),"element"==z?(C=!0,v=J.priority,z=T,T=e.$$element=A(V.createComment(" "+ga+": "+
e[ga]+" ")),d=T[0],Ab(g,Ya.call(z,0),d),Ga=B(z,f,v,k&&k.name,{nonTlbTranscludeDirective:da})):(z=A(Rb(d)).contents(),T.empty(),Ga=B(z,f));if(J.template)if(Na=!0,ya("template",aa,J,T),aa=J,z=F(J.template)?J.template(T,e):J.template,z=Pc(z),J.replace){k=J;z=Pb.test(z)?Qc(U(J.templateNamespace,P(z))):[];d=z[0];if(1!=z.length||d.nodeType!==na)throw ka("tplrt",ga,"");Ab(g,T,d);za={$attr:{}};z=W(d,[],za);var mf=a.splice(S+1,a.length-(S+1));L&&y(z);a=a.concat(z).concat(mf);Oc(e,za);za=a.length}else T.html(z);
if(J.templateUrl)Na=!0,ya("template",aa,J,T),aa=J,J.replace&&(k=J),H=G(a.splice(S,a.length-S),T,e,g,x&&Ga,l,q,{controllerDirectives:E,newIsolateScopeDirective:L,templateDirective:aa,nonTlbTranscludeDirective:da}),za=a.length;else if(J.compile)try{R=J.compile(T,e,Ga),F(R)?w(null,R,zb,$):R&&w(R.pre,R.post,zb,$)}catch(ca){c(ca,va(T))}J.terminal&&(H.terminal=!0,v=Math.max(v,J.priority))}H.scope=M&&!0===M.scope;H.transcludeOnThisElement=x;H.elementTranscludeOnThisElement=C;H.templateOnThisElement=Na;H.transclude=
Ga;p.hasElementTranscludeDirective=C;return H}function y(a){for(var b=0,c=a.length;b<c;b++){var d=b,e;e=C(Object.create(a[b]),{$$isolateScope:!0});a[d]=e}}function da(b,e,f,g,h,k,l){if(e===h)return null;h=null;if(d.hasOwnProperty(e)){var q;e=a.get(e+"Directive");for(var s=0,n=e.length;s<n;s++)try{if(q=e[s],(g===u||g>q.priority)&&-1!=q.restrict.indexOf(f)){if(k){var w={$$start:k,$$end:l};q=C(Object.create(q),w)}b.push(q);h=q}}catch(N){c(N)}}return h}function Oc(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;
r(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});r(b,function(b,f){"class"==f?(M(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function G(a,b,c,d,e,f,g,h){var k=[],l,s,p=b[0],n=a.shift(),w=C({},n,{templateUrl:null,transclude:null,replace:null,$$originalDirective:n}),N=F(n.templateUrl)?n.templateUrl(b,
c):n.templateUrl,t=n.templateNamespace;b.empty();q(O.getTrustedResourceUrl(N)).then(function(q){var v,O;q=Pc(q);if(n.replace){q=Pb.test(q)?Qc(U(t,P(q))):[];v=q[0];if(1!=q.length||v.nodeType!==na)throw ka("tplrt",n.name,N);q={$attr:{}};Ab(d,b,v);var H=W(v,[],q);K(n.scope)&&y(H);a=H.concat(a);Oc(c,q)}else v=p,b.html(q);a.unshift(w);l=aa(a,v,c,e,b,n,f,g,h);r(d,function(a,c){a==v&&(d[c]=b[0])});for(s=ea(b[0].childNodes,e);k.length;){q=k.shift();O=k.shift();var E=k.shift(),B=k.shift(),H=b[0];if(!q.$$destroyed){if(O!==
p){var Q=O.className;h.hasElementTranscludeDirective&&n.replace||(H=Rb(v));Ab(E,A(O),H);M(A(H),Q)}O=l.transcludeOnThisElement?L(q,l.transclude,B):B;l(s,q,H,d,O)}}k=null});return function(a,b,c,d,e){a=e;b.$$destroyed||(k?k.push(b,c,d,a):(l.transcludeOnThisElement&&(a=L(b,l.transclude,e)),l(s,b,c,d,a)))}}function z(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function ya(a,b,c,d){if(b)throw ka("multidir",b.name,c.name,a,va(d));}function T(a,c){var d=
b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&B.$$addBindingClass(a);return function(a,c){var e=c.parent();b||B.$$addBindingClass(e);B.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function U(a,b){a=R(a||"html");switch(a){case "svg":case "math":var c=V.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function Ga(a,b){if("srcdoc"==b)return O.HTML;var c=ta(a);if("xlinkHref"==
b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return O.RESOURCE_URL}function S(a,c,d,e,f){var h=b(d,!0);if(h){if("multiple"===e&&"select"===ta(a))throw ka("selmulti",va(a));c.push({priority:100,compile:function(){return{pre:function(c,d,l){d=l.$$observers||(l.$$observers={});if(k.test(e))throw ka("nodomevents");l[e]&&(h=b(l[e],!0,Ga(a,e),g[e]||f))&&(l[e]=h(c),(d[e]||(d[e]=[])).$$inter=!0,(l.$$observers&&l.$$observers[e].$$scope||c).$watch(h,function(a,b){"class"===e&&a!=b?l.$updateClass(a,
b):l.$set(e,a)}))}}}})}}function Ab(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=V.createDocumentFragment();a.appendChild(d);A(c).data(A(d).data());qa?(Nb=!0,qa.cleanData([d])):delete A.cache[d[A.expando]];d=1;for(e=b.length;d<e;d++)f=b[d],A(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function Y(a,
b){return C(function(){return a.apply(null,arguments)},a,b)}function Z(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,va(d))}}var X=function(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr={};this.$$element=a};X.prototype={$normalize:wa,$addClass:function(a){a&&0<a.length&&E.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&E.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=Rc(a,b);c&&c.length&&E.addClass(this.$$element,
c);(c=Rc(b,a))&&c.length&&E.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=this.$$element[0],g=Jc(f,a),h=ff(f,a),f=a;g?(this.$$element.prop(a,b),e=g):h&&(this[h]=b,f=h);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=Mb(a,"-"));g=ta(this.$$element);if("a"===g&&"href"===a||"img"===g&&"src"===a)this[a]=b=H(b,"src"===a);else if("img"===g&&"srcset"===a){for(var g="",h=P(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(h)?k:/(,)/,h=h.split(k),k=Math.floor(h.length/2),
l=0;l<k;l++)var q=2*l,g=g+H(P(h[q]),!0),g=g+(" "+P(h[q+1]));h=P(h[2*l]).split(/\s/);g+=H(P(h[0]),!0);2===h.length&&(g+=" "+P(h[1]));this[a]=b=g}!1!==d&&(null===b||b===u?this.$$element.removeAttr(e):this.$$element.attr(e,b));(a=this.$$observers)&&r(a[f],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=ia()),e=d[a]||(d[a]=[]);e.push(b);v.$evalAsync(function(){!e.$$inter&&c.hasOwnProperty(a)&&b(c[a])});return function(){Va(e,b)}}};var Na=b.startSymbol(),
ga=b.endSymbol(),Pc="{{"==Na||"}}"==ga?oa:function(a){return a.replace(/\{\{/g,Na).replace(/}}/g,ga)},za=/^ngAttr[A-Z]/;B.$$addBindingInfo=l?function(a,b){var c=a.data("$binding")||[];D(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:x;B.$$addBindingClass=l?function(a){M(a,"ng-binding")}:x;B.$$addScopeInfo=l?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:x;B.$$addScopeClass=l?function(a,b){M(a,b?"ng-isolate-scope":"ng-scope")}:x;return B}]}function wa(b){return bb(b.replace(nf,
""))}function Rc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),f=0;a:for(;f<d.length;f++){for(var g=d[f],h=0;h<e.length;h++)if(g==e[h])continue a;c+=(0<c.length?" ":"")+g}return c}function Qc(b){b=A(b);var a=b.length;if(1>=a)return b;for(;a--;)8===b[a].nodeType&&of.call(b,a,1);return b}function Ce(){var b={},a=!1,c=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,c){La(a,"controller");K(a)?C(b,a):b[a]=c};this.allowGlobals=function(){a=!0};this.$get=["$injector","$window",function(d,e){function f(a,
b,c,d){if(!a||!K(a.$scope))throw z("$controller")("noscp",d,b);a.$scope[b]=c}return function(g,h,k,l){var m,p,s;k=!0===k;l&&I(l)&&(s=l);I(g)&&(l=g.match(c),p=l[1],s=s||l[3],g=b.hasOwnProperty(p)?b[p]:tc(h.$scope,p,!0)||(a?tc(e,p,!0):u),pb(g,p,!0));if(k)return k=(D(g)?g[g.length-1]:g).prototype,m=Object.create(k),s&&f(h,s,m,p||g.name),C(function(){d.invoke(g,m,h,p);return m},{instance:m,identifier:s});m=d.instantiate(g,h,p);s&&f(h,s,m,p||g.name);return m}}]}function De(){this.$get=["$window",function(b){return A(b.document)}]}
function Ee(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function Yb(b,a){if(I(b)){b=b.replace(pf,"");var c=a("Content-Type");if(c&&0===c.indexOf(Sc)&&b.trim()||qf.test(b)&&rf.test(b))b=oc(b)}return b}function Tc(b){var a=ia(),c,d,e;if(!b)return a;r(b.split("\n"),function(b){e=b.indexOf(":");c=R(P(b.substr(0,e)));d=P(b.substr(e+1));c&&(a[c]=a[c]?a[c]+", "+d:d)});return a}function Uc(b){var a=K(b)?b:u;return function(c){a||(a=Tc(b));return c?(c=a[R(c)],void 0===
c&&(c=null),c):a}}function Vc(b,a,c){if(F(c))return c(b,a);r(c,function(c){b=c(b,a)});return b}function He(){var b=this.defaults={transformResponse:[Yb],transformRequest:[function(a){return K(a)&&"[object File]"!==Ja.call(a)&&"[object Blob]"!==Ja.call(a)?Za(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ua(Zb),put:ua(Zb),patch:ua(Zb)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},a=!1;this.useApplyAsync=function(b){return y(b)?(a=!!b,this):a};var c=this.interceptors=
[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(d,e,f,g,h,k){function l(a){function c(a){var b=C({},a);b.data=a.data?Vc(a.data,a.headers,d.transformResponse):a.data;a=a.status;return 200<=a&&300>a?b:h.reject(b)}var d={method:"get",transformRequest:b.transformRequest,transformResponse:b.transformResponse},e=function(a){var c=b.headers,d=C({},a.headers),e,f,c=C({},c.common,c[R(a.method)]);a:for(e in c){a=R(e);for(f in d)if(R(f)===a)continue a;d[e]=c[e]}(function(a){var b;
r(a,function(c,d){F(c)&&(b=c(),null!=b?a[d]=b:delete a[d])})})(d);return d}(a);if(!ha.isObject(a))throw z("$http")("badreq",a);C(d,a);d.headers=e;d.method=rb(d.method);var f=[function(a){e=a.headers;var d=Vc(a.data,Uc(e),a.transformRequest);G(d)&&r(e,function(a,b){"content-type"===R(b)&&delete e[b]});G(a.withCredentials)&&!G(b.withCredentials)&&(a.withCredentials=b.withCredentials);return m(a,d,e).then(c,c)},u],g=h.when(d);for(r(t,function(a){(a.request||a.requestError)&&f.unshift(a.request,a.requestError);
(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=f.shift();var k=f.shift(),g=g.then(a,k)}g.success=function(a){g.then(function(b){a(b.data,b.status,b.headers,d)});return g};g.error=function(a){g.then(null,function(b){a(b.data,b.status,b.headers,d)});return g};return g}function m(c,f,k){function m(b,c,d,e){function f(){w(c,b,d,e)}M&&(200<=b&&300>b?M.put(r,[b,c,Tc(d),e]):M.remove(r));a?g.$applyAsync(f):(f(),g.$$phase||g.$apply())}function w(a,b,d,e){b=Math.max(b,0);(200<=
b&&300>b?E.resolve:E.reject)({data:a,status:b,headers:Uc(d),config:c,statusText:e})}function t(){var a=l.pendingRequests.indexOf(c);-1!==a&&l.pendingRequests.splice(a,1)}var E=h.defer(),H=E.promise,M,B,r=p(c.url,c.params);l.pendingRequests.push(c);H.then(t,t);!c.cache&&!b.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(M=K(c.cache)?c.cache:K(b.cache)?b.cache:s);if(M)if(B=M.get(r),y(B)){if(B&&F(B.then))return B.then(t,t),B;D(B)?w(B[1],B[0],ua(B[2]),B[3]):w(B,200,{},"OK")}else M.put(r,H);
G(B)&&((B=Wc(c.url)?e.cookies()[c.xsrfCookieName||b.xsrfCookieName]:u)&&(k[c.xsrfHeaderName||b.xsrfHeaderName]=B),d(c.method,r,f,m,k,c.timeout,c.withCredentials,c.responseType));return H}function p(a,b){if(!b)return a;var c=[];Bd(b,function(a,b){null===a||G(a)||(D(a)||(a=[a]),r(a,function(a){K(a)&&(a=fa(a)?a.toISOString():Za(a));c.push(Da(b)+"="+Da(a))}))});0<c.length&&(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));return a}var s=f("$http"),t=[];r(c,function(a){t.unshift(I(a)?k.get(a):k.invoke(a))});
l.pendingRequests=[];(function(a){r(arguments,function(a){l[a]=function(b,c){return l(C(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){r(arguments,function(a){l[a]=function(b,c,d){return l(C(d||{},{method:a,url:b,data:c}))}})})("post","put","patch");l.defaults=b;return l}]}function sf(){return new U.XMLHttpRequest}function Ie(){this.$get=["$browser","$window","$document",function(b,a,c){return tf(b,sf,b.defer,a.angular.callbacks,c[0])}]}function tf(b,a,c,d,e){function f(a,
b,c){var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",m,!1);f.removeEventListener("error",m,!1);e.body.removeChild(f);f=null;var g=-1,t="unknown";a&&("load"!==a.type||d[b].called||(a={type:"error"}),t=a.type,g="error"===a.type?404:200);c&&c(g,t)};f.addEventListener("load",m,!1);f.addEventListener("error",m,!1);e.body.appendChild(f);return m}return function(e,h,k,l,m,p,s,t){function q(){v&&v();w&&w.abort()}function N(a,d,
e,f,g){E&&c.cancel(E);v=w=null;a(d,e,f,g);b.$$completeOutstandingRequest(x)}b.$$incOutstandingRequestCount();h=h||b.url();if("jsonp"==R(e)){var n="_"+(d.counter++).toString(36);d[n]=function(a){d[n].data=a;d[n].called=!0};var v=f(h.replace("JSON_CALLBACK","angular.callbacks."+n),n,function(a,b){N(l,a,d[n].data,"",b);d[n]=x})}else{var w=a();w.open(e,h,!0);r(m,function(a,b){y(a)&&w.setRequestHeader(b,a)});w.onload=function(){var a=w.statusText||"",b="response"in w?w.response:w.responseText,c=1223===
w.status?204:w.status;0===c&&(c=b?200:"file"==Aa(h).protocol?404:0);N(l,c,b,w.getAllResponseHeaders(),a)};e=function(){N(l,-1,null,null,"")};w.onerror=e;w.onabort=e;s&&(w.withCredentials=!0);if(t)try{w.responseType=t}catch(O){if("json"!==t)throw O;}w.send(k||null)}if(0<p)var E=c(q,p);else p&&F(p.then)&&p.then(q)}}function Fe(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,
d,e){function f(a){return"\\\\\\"+a}function g(f,g,t,q){function N(c){return c.replace(l,b).replace(m,a)}function n(a){try{var b=a;a=t?e.getTrusted(t,b):e.valueOf(b);var c;if(q&&!y(a))c=a;else if(null==a)c="";else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=Za(a)}c=a}return c}catch(g){c=$b("interr",f,g.toString()),d(c)}}q=!!q;for(var v,w,O=0,E=[],H=[],M=f.length,B=[],r=[];O<M;)if(-1!=(v=f.indexOf(b,O))&&-1!=(w=f.indexOf(a,v+h)))O!==v&&B.push(N(f.substring(O,v))),O=f.substring(v+
h,w),E.push(O),H.push(c(O,n)),O=w+k,r.push(B.length),B.push("");else{O!==M&&B.push(N(f.substring(O)));break}if(t&&1<B.length)throw $b("noconcat",f);if(!g||E.length){var L=function(a){for(var b=0,c=E.length;b<c;b++){if(q&&G(a[b]))return;B[r[b]]=a[b]}return B.join("")};return C(function(a){var b=0,c=E.length,e=Array(c);try{for(;b<c;b++)e[b]=H[b](a);return L(e)}catch(g){a=$b("interr",f,g.toString()),d(a)}},{exp:f,expressions:E,$$watchDelegate:function(a,b,c){var d;return a.$watchGroup(H,function(c,e){var f=
L(c);F(b)&&b.call(this,f,c!==e?d:f,a);d=f},c)}})}}var h=b.length,k=a.length,l=new RegExp(b.replace(/./g,f),"g"),m=new RegExp(a.replace(/./g,f),"g");g.startSymbol=function(){return b};g.endSymbol=function(){return a};return g}]}function Ge(){this.$get=["$rootScope","$window","$q","$$q",function(b,a,c,d){function e(e,h,k,l){var m=a.setInterval,p=a.clearInterval,s=0,t=y(l)&&!l,q=(t?d:c).defer(),N=q.promise;k=y(k)?k:0;N.then(null,null,e);N.$$intervalId=m(function(){q.notify(s++);0<k&&s>=k&&(q.resolve(s),
p(N.$$intervalId),delete f[N.$$intervalId]);t||b.$apply()},h);f[N.$$intervalId]=q;return N}var f={};e.cancel=function(b){return b&&b.$$intervalId in f?(f[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),delete f[b.$$intervalId],!0):!1};return e}]}function Od(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",
posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",
mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function ac(b){b=b.split("/");for(var a=b.length;a--;)b[a]=nb(b[a]);return b.join("/")}function Xc(b,a){var c=Aa(b);a.$$protocol=c.protocol;a.$$host=c.hostname;a.$$port=$(c.port)||uf[c.protocol]||null}function Yc(b,a){var c="/"!==b.charAt(0);c&&(b="/"+b);var d=Aa(b);a.$$path=decodeURIComponent(c&&"/"===d.pathname.charAt(0)?d.pathname.substring(1):d.pathname);a.$$search=
qc(d.search);a.$$hash=decodeURIComponent(d.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function xa(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Fa(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function bc(b){return b.substr(0,Fa(b).lastIndexOf("/")+1)}function cc(b,a){this.$$html5=!0;a=a||"";var c=bc(b);Xc(b,this);this.$$parse=function(a){var b=xa(c,a);if(!I(b))throw eb("ipthprfx",a,c);Yc(b,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=
function(){var a=Kb(this.$$search),b=this.$$hash?"#"+nb(this.$$hash):"";this.$$url=ac(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;(f=xa(b,d))!==u?(g=f,g=(f=xa(a,f))!==u?c+(xa("/",f)||f):b+g):(f=xa(c,d))!==u?g=c+f:c==d+"/"&&(g=c);g&&this.$$parse(g);return!!g}}function dc(b,a){var c=bc(b);Xc(b,this);this.$$parse=function(d){var e=xa(b,d)||xa(c,d),e="#"==e.charAt(0)?xa(a,e):this.$$html5?e:
"";if(!I(e))throw eb("ihshprfx",d,a);Yc(e,this);d=this.$$path;var f=/^\/[A-Z]:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));f.exec(e)||(d=(e=f.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var c=Kb(this.$$search),e=this.$$hash?"#"+nb(this.$$hash):"";this.$$url=ac(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$parseLinkUrl=function(a,c){return Fa(b)==Fa(a)?(this.$$parse(a),!0):!1}}function Zc(b,a){this.$$html5=!0;dc.apply(this,arguments);
var c=bc(b);this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;b==Fa(d)?f=d:(g=xa(c,d))?f=b+a+g:c===d+"/"&&(f=c);f&&this.$$parse(f);return!!f};this.$$compose=function(){var c=Kb(this.$$search),e=this.$$hash?"#"+nb(this.$$hash):"";this.$$url=ac(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+a+this.$$url}}function Bb(b){return function(){return this[b]}}function $c(b,a){return function(c){if(G(c))return this[b];this[b]=a(c);this.$$compose();return this}}function Je(){var b=
"",a={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(a){return y(a)?(b=a,this):b};this.html5Mode=function(b){return Ua(b)?(a.enabled=b,this):K(b)?(Ua(b.enabled)&&(a.enabled=b.enabled),Ua(b.requireBase)&&(a.requireBase=b.requireBase),Ua(b.rewriteLinks)&&(a.rewriteLinks=b.rewriteLinks),this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(c,d,e,f){function g(a,b,c){var e=k.url(),f=k.$$state;try{d.url(a,b,c),k.$$state=d.state()}catch(g){throw k.url(e),k.$$state=
f,g;}}function h(a,b){c.$broadcast("$locationChangeSuccess",k.absUrl(),a,k.$$state,b)}var k,l;l=d.baseHref();var m=d.url(),p;if(a.enabled){if(!l&&a.requireBase)throw eb("nobase");p=m.substring(0,m.indexOf("/",m.indexOf("//")+2))+(l||"/");l=e.history?cc:Zc}else p=Fa(m),l=dc;k=new l(p,"#"+b);k.$$parseLinkUrl(m,m);k.$$state=d.state();var s=/^\s*(javascript|mailto):/i;f.on("click",function(b){if(a.rewriteLinks&&!b.ctrlKey&&!b.metaKey&&2!=b.which){for(var e=A(b.target);"a"!==ta(e[0]);)if(e[0]===f[0]||
!(e=e.parent())[0])return;var g=e.prop("href"),h=e.attr("href")||e.attr("xlink:href");K(g)&&"[object SVGAnimatedString]"===g.toString()&&(g=Aa(g.animVal).href);s.test(g)||!g||e.attr("target")||b.isDefaultPrevented()||!k.$$parseLinkUrl(g,h)||(b.preventDefault(),k.absUrl()!=d.url()&&(c.$apply(),U.angular["ff-684208-preventDefault"]=!0))}});k.absUrl()!=m&&d.url(k.absUrl(),!0);var t=!0;d.onUrlChange(function(a,b){c.$evalAsync(function(){var d=k.absUrl(),e=k.$$state,f;k.$$parse(a);k.$$state=b;f=c.$broadcast("$locationChangeStart",
a,d,b,e).defaultPrevented;k.absUrl()===a&&(f?(k.$$parse(d),k.$$state=e,g(d,!1,e)):(t=!1,h(d,e)))});c.$$phase||c.$digest()});c.$watch(function(){var a=d.url(),b=d.state(),f=k.$$replace,l=a!==k.absUrl()||k.$$html5&&e.history&&b!==k.$$state;if(t||l)t=!1,c.$evalAsync(function(){var d=k.absUrl(),e=c.$broadcast("$locationChangeStart",d,a,k.$$state,b).defaultPrevented;k.absUrl()===d&&(e?(k.$$parse(a),k.$$state=b):(l&&g(d,f,b===k.$$state?null:k.$$state),h(a,b)))});k.$$replace=!1});return k}]}function Ke(){var b=
!0,a=this;this.debugEnabled=function(a){return y(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||x;a=!1;try{a=!!e.apply}catch(k){}return a?function(){var a=[];r(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),
info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function ra(b,a){if("__defineGetter__"===b||"__defineSetter__"===b||"__lookupGetter__"===b||"__lookupSetter__"===b||"__proto__"===b)throw la("isecfld",a);return b}function sa(b,a){if(b){if(b.constructor===b)throw la("isecfn",a);if(b.window===b)throw la("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw la("isecdom",a);if(b===Object)throw la("isecobj",
a);}return b}function ec(b){return b.constant}function Oa(b,a,c,d){sa(b,d);a=a.split(".");for(var e,f=0;1<a.length;f++){e=ra(a.shift(),d);var g=sa(b[e],d);g||(g={},b[e]=g);b=g}e=ra(a.shift(),d);sa(b[e],d);return b[e]=c}function Pa(b){return"constructor"==b}function ad(b,a,c,d,e,f,g){ra(b,f);ra(a,f);ra(c,f);ra(d,f);ra(e,f);var h=function(a){return sa(a,f)},k=g||Pa(b)?h:oa,l=g||Pa(a)?h:oa,m=g||Pa(c)?h:oa,p=g||Pa(d)?h:oa,s=g||Pa(e)?h:oa;return function(f,g){var h=g&&g.hasOwnProperty(b)?g:f;if(null==
h)return h;h=k(h[b]);if(!a)return h;if(null==h)return u;h=l(h[a]);if(!c)return h;if(null==h)return u;h=m(h[c]);if(!d)return h;if(null==h)return u;h=p(h[d]);return e?null==h?u:h=s(h[e]):h}}function vf(b,a){return function(c,d){return b(c,d,sa,a)}}function bd(b,a,c){var d=a.expensiveChecks,e=d?wf:xf,f=e[b];if(f)return f;var g=b.split("."),h=g.length;if(a.csp)f=6>h?ad(g[0],g[1],g[2],g[3],g[4],c,d):function(a,b){var e=0,f;do f=ad(g[e++],g[e++],g[e++],g[e++],g[e++],c,d)(a,b),b=u,a=f;while(e<h);return f};
else{var k="";d&&(k+="s = eso(s, fe);\nl = eso(l, fe);\n");var l=d;r(g,function(a,b){ra(a,c);var e=(b?"s":'((l&&l.hasOwnProperty("'+a+'"))?l:s)')+"."+a;if(d||Pa(a))e="eso("+e+", fe)",l=!0;k+="if(s == null) return undefined;\ns="+e+";\n"});k+="return s;";a=new Function("s","l","eso","fe",k);a.toString=ca(k);l&&(a=vf(a,c));f=a}f.sharedGetter=!0;f.assign=function(a,c){return Oa(a,b,c,b)};return e[b]=f}function fc(b){return F(b.valueOf)?b.valueOf():yf.call(b)}function Le(){var b=ia(),a=ia();this.$get=
["$filter","$sniffer",function(c,d){function e(a){var b=a;a.sharedGetter&&(b=function(b,c){return a(b,c)},b.literal=a.literal,b.constant=a.constant,b.assign=a.assign);return b}function f(a,b){for(var c=0,d=a.length;c<d;c++){var e=a[c];e.constant||(e.inputs?f(e.inputs,b):-1===b.indexOf(e)&&b.push(e))}return b}function g(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=fc(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function h(a,b,c,d){var e=d.$$inputs||(d.$$inputs=f(d.inputs,[])),h;if(1===
e.length){var k=g,e=e[0];return a.$watch(function(a){var b=e(a);g(b,k)||(h=d(a),k=b&&fc(b));return h},b,c)}for(var l=[],s=0,m=e.length;s<m;s++)l[s]=g;return a.$watch(function(a){for(var b=!1,c=0,f=e.length;c<f;c++){var k=e[c](a);if(b||(b=!g(k,l[c])))l[c]=k&&fc(k)}b&&(h=d(a));return h},b,c)}function k(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;F(b)&&b.apply(this,arguments);y(a)&&d.$$postDigest(function(){y(f)&&e()})},c)}function l(a,b,c,d){function e(a){var b=!0;
r(a,function(a){y(a)||(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,c,d){g=a;F(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function m(a,b,c,d){var e;return e=a.$watch(function(a){return d(a)},function(a,c,d){F(b)&&b.apply(this,arguments);e()},c)}function p(a,b){if(!b)return a;var c=a.$$watchDelegate,c=c!==l&&c!==k?function(c,d){var e=a(c,d);return b(e,c,d)}:function(c,d){var e=a(c,d),f=b(e,c,d);return y(e)?f:e};a.$$watchDelegate&&a.$$watchDelegate!==
h?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=h,c.inputs=[a]);return c}var s={csp:d.csp,expensiveChecks:!1},t={csp:d.csp,expensiveChecks:!0};return function(d,f,g){var v,w,O;switch(typeof d){case "string":O=d=d.trim();var E=g?a:b;v=E[O];v||(":"===d.charAt(0)&&":"===d.charAt(1)&&(w=!0,d=d.substring(2)),g=g?t:s,v=new gc(g),v=(new fb(v,c,g)).parse(d),v.constant?v.$$watchDelegate=m:w?(v=e(v),v.$$watchDelegate=v.literal?l:k):v.inputs&&(v.$$watchDelegate=h),E[O]=v);return p(v,f);
case "function":return p(d,f);default:return p(x,f)}}}]}function Ne(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return cd(function(a){b.$evalAsync(a)},a)}]}function Oe(){this.$get=["$browser","$exceptionHandler",function(b,a){return cd(function(a){b.defer(a)},a)}]}function cd(b,a){function c(a,b,c){function d(b){return function(c){e||(e=!0,b.call(a,c))}}var e=!1;return[d(b),d(c)]}function d(){this.$$state={status:0}}function e(a,b){return function(c){b.call(a,c)}}function f(c){!c.processScheduled&&
c.pending&&(c.processScheduled=!0,b(function(){var b,d,e;e=c.pending;c.processScheduled=!1;c.pending=u;for(var f=0,g=e.length;f<g;++f){d=e[f][0];b=e[f][c.status];try{F(b)?d.resolve(b(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),a(h)}}}))}function g(){this.promise=new d;this.resolve=e(this,this.resolve);this.reject=e(this,this.reject);this.notify=e(this,this.notify)}var h=z("$q",TypeError);d.prototype={then:function(a,b,c){var d=new g;this.$$state.pending=this.$$state.pending||
[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&f(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return l(b,!0,a)},function(b){return l(b,!1,a)},b)}};g.prototype={resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(h("qcycle",a)):this.$$resolve(a))},$$resolve:function(b){var d,e;e=c(this,this.$$resolve,this.$$reject);try{if(K(b)||F(b))d=b&&b.then;F(d)?(this.promise.$$state.status=
-1,d.call(b,e[0],e[1],this.notify)):(this.promise.$$state.value=b,this.promise.$$state.status=1,f(this.promise.$$state))}catch(g){e[1](g),a(g)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;f(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&d&&d.length&&b(function(){for(var b,e,f=0,g=d.length;f<g;f++){e=d[f][0];b=d[f][3];try{e.notify(F(b)?
b(c):c)}catch(h){a(h)}}})}};var k=function(a,b){var c=new g;b?c.resolve(a):c.reject(a);return c.promise},l=function(a,b,c){var d=null;try{F(c)&&(d=c())}catch(e){return k(e,!1)}return d&&F(d.then)?d.then(function(){return k(a,b)},function(a){return k(a,!1)}):k(a,b)},m=function(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,c,d)},p=function t(a){if(!F(a))throw h("norslvr",a);if(!(this instanceof t))return new t(a);var b=new g;a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};
p.defer=function(){return new g};p.reject=function(a){var b=new g;b.reject(a);return b.promise};p.when=m;p.all=function(a){var b=new g,c=0,d=D(a)?[]:{};r(a,function(a,e){c++;m(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};return p}function Xe(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame,d=b.cancelAnimationFrame||
b.webkitCancelAnimationFrame||b.mozCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,f=e?function(a){var b=c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};f.supported=e;return f}]}function Me(){var b=10,a=z("$rootScope"),c=null,d=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(e,f,g,h){function k(){this.$id=++kb;this.$$phase=this.$parent=this.$$watchers=
this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings=null}function l(b){if(q.$$phase)throw a("inprog",q.$$phase);q.$$phase=b}function m(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function p(){}function s(){for(;v.length;)try{v.shift()()}catch(a){f(a)}d=null}function t(){null===d&&(d=h.defer(function(){q.$apply(s)}))}
k.prototype={constructor:k,$new:function(a,b){function c(){d.$$destroyed=!0}var d;b=b||this;a?(d=new k,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=function(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$id=++kb;this.$$ChildScope=null},this.$$ChildScope.prototype=this),d=new this.$$ChildScope);d.$parent=b;d.$$prevSibling=b.$$childTail;b.$$childHead?(b.$$childTail.$$nextSibling=d,b.$$childTail=d):b.$$childHead=
b.$$childTail=d;(a||b!=this)&&d.$on("$destroy",c);return d},$watch:function(a,b,d){var e=g(a);if(e.$$watchDelegate)return e.$$watchDelegate(this,b,d,e);var f=this.$$watchers,h={fn:b,last:p,get:e,exp:a,eq:!!d};c=null;F(b)||(h.fn=x);f||(f=this.$$watchers=[]);f.unshift(h);return function(){Va(f,h);c=null}},$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=
!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});r(a,function(a,b){var k=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(k)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!G(e)){if(K(e))if(Ra(e))for(f!==p&&(f=p,n=f.length=0,l++),a=e.length,n!==a&&(l++,f.length=n=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==s&&(f=s={},n=0,l++);a=0;for(b in e)e.hasOwnProperty(b)&&
(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(n++,f[b]=g,l++));if(n>a)for(b in l++,f)e.hasOwnProperty(b)||(n--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$stateful=!0;var d=this,e,f,h,k=1<b.length,l=0,m=g(a,c),p=[],s={},q=!0,n=0;return this.$watch(m,function(){q?(q=!1,b(e,e,d)):b(e,h,d);if(k)if(K(e))if(Ra(e)){h=Array(e.length);for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)Jb.call(e,a)&&(h[a]=e[a]);else h=e})},$digest:function(){var e,g,k,m,t,v,r=b,L,u=[],y,Q;l("$digest");
h.$$checkUrlChange();this===q&&null!==d&&(h.defer.cancel(d),s());c=null;do{v=!1;for(L=this;N.length;){try{Q=N.shift(),Q.scope.$eval(Q.expression)}catch(z){f(z)}c=null}a:do{if(m=L.$$watchers)for(t=m.length;t--;)try{if(e=m[t])if((g=e.get(L))!==(k=e.last)&&!(e.eq?pa(g,k):"number"===typeof g&&"number"===typeof k&&isNaN(g)&&isNaN(k)))v=!0,c=e,e.last=e.eq?Ca(g,null):g,e.fn(g,k===p?g:k,L),5>r&&(y=4-r,u[y]||(u[y]=[]),u[y].push({msg:F(e.exp)?"fn: "+(e.exp.name||e.exp.toString()):e.exp,newVal:g,oldVal:k}));
else if(e===c){v=!1;break a}}catch(A){f(A)}if(!(m=L.$$childHead||L!==this&&L.$$nextSibling))for(;L!==this&&!(m=L.$$nextSibling);)L=L.$parent}while(L=m);if((v||N.length)&&!r--)throw q.$$phase=null,a("infdig",b,u);}while(v||N.length);for(q.$$phase=null;n.length;)try{n.shift()()}catch(da){f(da)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;if(this!==q){for(var b in this.$$listenerCount)m(this,this.$$listenerCount[b],b);a.$$childHead==this&&
(a.$$childHead=this.$$nextSibling);a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=x;this.$on=this.$watch=this.$watchGroup=function(){return x};this.$$listeners={};this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=this.$$watchers=
null}}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a){q.$$phase||N.length||h.defer(function(){N.length&&q.$digest()});N.push({scope:this,expression:a})},$$postDigest:function(a){n.push(a)},$apply:function(a){try{return l("$apply"),this.$eval(a)}catch(b){f(b)}finally{q.$$phase=null;try{q.$digest()}catch(c){throw f(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&v.push(b);t()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);
var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,m(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,g=!1,h={name:a,targetScope:e,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=Xa([h],arguments,1),l,m;do{d=e.$$listeners[a]||c;h.currentScope=e;l=0;for(m=d.length;l<m;l++)if(d[l])try{d[l].apply(null,k)}catch(p){f(p)}else d.splice(l,
1),l--,m--;if(g)return h.currentScope=null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var g=Xa([e],arguments,1),h,k;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,g)}catch(l){f(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&
c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var q=new k,N=q.$$asyncQueue=[],n=q.$$postDigestQueue=[],v=q.$$applyAsyncQueue=[];return q}]}function Pd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(a){return y(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,f;f=Aa(c).href;
return""===f||f.match(e)?c:"unsafe:"+f}}}function zf(b){if("self"===b)return b;if(I(b)){if(-1<b.indexOf("***"))throw Ba("iwcard",b);b=dd(b).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+b+"$")}if(lb(b))return new RegExp("^"+b.source+"$");throw Ba("imatcher");}function ed(b){var a=[];y(b)&&r(b,function(b){a.push(zf(b))});return a}function Qe(){this.SCE_CONTEXTS=ma;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=ed(a));return b};this.resourceUrlBlacklist=
function(b){arguments.length&&(a=ed(b));return a};this.$get=["$injector",function(c){function d(a,b){return"self"===a?Wc(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw Ba("unsafe");};c.has("$sanitize")&&(f=c.get("$sanitize"));var g=e(),h={};h[ma.HTML]=
e(g);h[ma.CSS]=e(g);h[ma.URL]=e(g);h[ma.JS]=e(g);h[ma.RESOURCE_URL]=e(h[ma.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Ba("icontext",a,b);if(null===b||b===u||""===b)return b;if("string"!==typeof b)throw Ba("itype",a);return new c(b)},getTrusted:function(c,e){if(null===e||e===u||""===e)return e;var g=h.hasOwnProperty(c)?h[c]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(c===ma.RESOURCE_URL){var g=Aa(e.toString()),p,s,t=!1;p=0;for(s=b.length;p<s;p++)if(d(b[p],
g)){t=!0;break}if(t)for(p=0,s=a.length;p<s;p++)if(d(a[p],g)){t=!1;break}if(t)return e;throw Ba("insecurl",e.toString());}if(c===ma.HTML)return f(e);throw Ba("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function Pe(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sceDelegate",function(a,c){if(b&&8>Ha)throw Ba("iequirks");var d=ua(ma);d.isEnabled=function(){return b};d.trustAs=c.trustAs;d.getTrusted=c.getTrusted;d.valueOf=
c.valueOf;b||(d.trustAs=d.getTrusted=function(a,b){return b},d.valueOf=oa);d.parseAs=function(b,c){var e=a(c);return e.literal&&e.constant?e:a(c,function(a){return d.getTrusted(b,a)})};var e=d.parseAs,f=d.getTrusted,g=d.trustAs;r(ma,function(a,b){var c=R(b);d[bb("parse_as_"+c)]=function(b){return e(a,b)};d[bb("get_trusted_"+c)]=function(b){return f(a,b)};d[bb("trust_as_"+c)]=function(b){return g(a,b)}});return d}]}function Re(){this.$get=["$window","$document",function(b,a){var c={},d=$((/android (\d+)/.exec(R((b.navigator||
{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),f=a[0]||{},g,h=/^(Moz|webkit|ms)(?=[A-Z])/,k=f.body&&f.body.style,l=!1,m=!1;if(k){for(var p in k)if(l=h.exec(p)){g=l[0];g=g.substr(0,1).toUpperCase()+g.substr(1);break}g||(g="WebkitOpacity"in k&&"webkit");l=!!("transition"in k||g+"Transition"in k);m=!!("animation"in k||g+"Animation"in k);!d||l&&m||(l=I(f.body.style.webkitTransition),m=I(f.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hasEvent:function(a){if("input"==
a&&9==Ha)return!1;if(G(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:$a(),vendorPrefix:g,transitions:l,animations:m,android:d}}]}function Te(){this.$get=["$templateCache","$http","$q",function(b,a,c){function d(e,f){d.totalPendingRequests++;var g=a.defaults&&a.defaults.transformResponse;if(D(g))for(var h=g,g=[],k=0;k<h.length;++k){var l=h[k];l!==Yb&&g.push(l)}else g===Yb&&(g=null);return a.get(e,{cache:b,transformResponse:g}).then(function(a){a=a.data;d.totalPendingRequests--;
b.put(e,a);return a},function(){d.totalPendingRequests--;if(!f)throw ka("tpload",e);return c.reject()})}d.totalPendingRequests=0;return d}]}function Ue(){this.$get=["$rootScope","$browser","$location",function(b,a,c){return{findBindings:function(a,b,c){a=a.getElementsByClassName("ng-binding");var g=[];r(a,function(a){var d=ha.element(a).data("$binding");d&&r(d,function(d){c?(new RegExp("(^|\\s)"+dd(b)+"(\\s|\\||$)")).test(d)&&g.push(a):-1!=d.indexOf(b)&&g.push(a)})});return g},findModels:function(a,
b,c){for(var g=["ng-","data-ng-","ng\\:"],h=0;h<g.length;++h){var k=a.querySelectorAll("["+g[h]+"model"+(c?"=":"*=")+'"'+b+'"]');if(k.length)return k}},getLocation:function(){return c.url()},setLocation:function(a){a!==c.url()&&(c.url(a),b.$digest())},whenStable:function(b){a.notifyWhenNoOutstandingRequests(b)}}}]}function Ve(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(b,a,c,d,e){function f(f,k,l){var m=y(l)&&!l,p=(m?d:c).defer(),s=p.promise;k=a.defer(function(){try{p.resolve(f())}catch(a){p.reject(a),
e(a)}finally{delete g[s.$$timeoutId]}m||b.$apply()},k);s.$$timeoutId=k;g[k]=p;return s}var g={};f.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return f}]}function Aa(b){Ha&&(Y.setAttribute("href",b),b=Y.href);Y.setAttribute("href",b);return{href:Y.href,protocol:Y.protocol?Y.protocol.replace(/:$/,""):"",host:Y.host,search:Y.search?Y.search.replace(/^\?/,""):"",hash:Y.hash?Y.hash.replace(/^#/,""):"",hostname:Y.hostname,
port:Y.port,pathname:"/"===Y.pathname.charAt(0)?Y.pathname:"/"+Y.pathname}}function Wc(b){b=I(b)?Aa(b):b;return b.protocol===fd.protocol&&b.host===fd.host}function We(){this.$get=ca(U)}function Bc(b){function a(c,d){if(K(c)){var e={};r(c,function(b,c){e[c]=a(c,b)});return e}return b.factory(c+"Filter",d)}this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];a("currency",gd);a("date",hd);a("filter",Af);a("json",Bf);a("limitTo",Cf);a("lowercase",Df);a("number",
id);a("orderBy",jd);a("uppercase",Ef)}function Af(){return function(b,a,c){if(!D(b))return b;var d=typeof c,e=[];e.check=function(a,b){for(var c=0;c<e.length;c++)if(!e[c](a,b))return!1;return!0};"function"!==d&&(c="boolean"===d&&c?function(a,b){return ha.equals(a,b)}:function(a,b){if(a&&b&&"object"===typeof a&&"object"===typeof b){for(var d in a)if("$"!==d.charAt(0)&&Jb.call(a,d)&&c(a[d],b[d]))return!0;return!1}b=(""+b).toLowerCase();return-1<(""+a).toLowerCase().indexOf(b)});var f=function(a,b){if("string"===
typeof b&&"!"===b.charAt(0))return!f(a,b.substr(1));switch(typeof a){case "boolean":case "number":case "string":return c(a,b);case "object":switch(typeof b){case "object":return c(a,b);default:for(var d in a)if("$"!==d.charAt(0)&&f(a[d],b))return!0}return!1;case "array":for(d=0;d<a.length;d++)if(f(a[d],b))return!0;return!1;default:return!1}};switch(typeof a){case "boolean":case "number":case "string":a={$:a};case "object":for(var g in a)(function(b){"undefined"!==typeof a[b]&&e.push(function(c){return f("$"==
b?c:c&&c[b],a[b])})})(g);break;case "function":e.push(a);break;default:return b}d=[];for(g=0;g<b.length;g++){var h=b[g];e.check(h,g)&&d.push(h)}return d}}function gd(b){var a=b.NUMBER_FORMATS;return function(b,d,e){G(d)&&(d=a.CURRENCY_SYM);G(e)&&(e=a.PATTERNS[1].maxFrac);return null==b?b:kd(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,e).replace(/\u00A4/g,d)}}function id(b){var a=b.NUMBER_FORMATS;return function(b,d){return null==b?b:kd(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function kd(b,a,c,
d,e){if(!isFinite(b)||K(b))return"";var f=0>b;b=Math.abs(b);var g=b+"",h="",k=[],l=!1;if(-1!==g.indexOf("e")){var m=g.match(/([\d\.]+)e(-?)(\d+)/);m&&"-"==m[2]&&m[3]>e+1?(g="0",b=0):(h=g,l=!0)}if(l)0<e&&-1<b&&1>b&&(h=b.toFixed(e));else{g=(g.split(ld)[1]||"").length;G(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);0===b&&(f=!1);b=(""+b).split(ld);g=b[0];b=b[1]||"";var m=0,p=a.lgSize,s=a.gSize;if(g.length>=p+s)for(m=g.length-p,l=0;l<m;l++)0===
(m-l)%s&&0!==l&&(h+=c),h+=g.charAt(l);for(l=m;l<g.length;l++)0===(g.length-l)%p&&0!==l&&(h+=c),h+=g.charAt(l);for(;b.length<e;)b+="0";e&&"0"!==e&&(h+=d+b.substr(0,e))}k.push(f?a.negPre:a.posPre,h,f?a.negSuf:a.posSuf);return k.join("")}function Cb(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function Z(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Cb(e,a,d)}}function Db(b,a){return function(c,
d){var e=c["get"+b](),f=rb(a?"SHORT"+b:b);return d[f][e]}}function md(b){var a=(new Date(b,0,1)).getDay();return new Date(b,0,(4>=a?5:12)-a)}function nd(b){return function(a){var c=md(a.getFullYear());a=+new Date(a.getFullYear(),a.getMonth(),a.getDate()+(4-a.getDay()))-+c;a=1+Math.round(a/6048E5);return Cb(a,b)}}function hd(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,k=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=$(b[9]+b[10]),g=$(b[9]+b[11]));
h.call(a,$(b[1]),$(b[2])-1,$(b[3]));f=$(b[4]||0)-f;g=$(b[5]||0)-g;h=$(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));k.call(a,f,g,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e,f){var g="",h=[],k,l;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;I(c)&&(c=Ff.test(c)?$(c):a(c));X(c)&&(c=new Date(c));if(!fa(c))return c;for(;e;)(l=Gf.exec(e))?(h=Xa(h,l,1),e=h.pop()):(h.push(e),e=null);f&&"UTC"===f&&(c=
new Date(c.getTime()),c.setMinutes(c.getMinutes()+c.getTimezoneOffset()));r(h,function(a){k=Hf[a];g+=k?k(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Bf(){return function(b){return Za(b,!0)}}function Cf(){return function(b,a){X(b)&&(b=b.toString());if(!D(b)&&!I(b))return b;a=Infinity===Math.abs(Number(a))?Number(a):$(a);if(I(b))return a?0<=a?b.slice(0,a):b.slice(a,b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=
b.length+a,e=b.length);for(;d<e;d++)c.push(b[d]);return c}}function jd(b){return function(a,c,d){function e(a,b){return b?function(b,c){return a(c,b)}:a}function f(a,b){var c=typeof a,d=typeof b;return c==d?(fa(a)&&fa(b)&&(a=a.valueOf(),b=b.valueOf()),"string"==c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:a<b?-1:1):c<d?-1:1}if(!Ra(a))return a;c=D(c)?c:[c];0===c.length&&(c=["+"]);c=c.map(function(a){var c=!1,d=a||oa;if(I(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);
if(""===a)return e(function(a,b){return f(a,b)},c);d=b(a);if(d.constant){var l=d();return e(function(a,b){return f(a[l],b[l])},c)}}return e(function(a,b){return f(d(a),d(b))},c)});return Ya.call(a).sort(e(function(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function Ia(b){F(b)&&(b={link:b});b.restrict=b.restrict||"AC";return ca(b)}function od(b,a,c,d,e){var f=this,g=[],h=f.$$parentForm=b.parent().controller("form")||Eb;f.$error={};f.$$success={};f.$pending=u;
f.$name=e(a.name||a.ngForm||"")(c);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;h.$addControl(f);f.$rollbackViewValue=function(){r(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){r(g,function(a){a.$commitViewValue()})};f.$addControl=function(a){La(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a)};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];
r(f.$pending,function(b,c){f.$setValidity(c,null,a)});r(f.$error,function(b,c){f.$setValidity(c,null,a)});Va(g,a)};pd({ctrl:this,$element:b,set:function(a,b,c){var d=a[b];d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(Va(d,c),0===d.length&&delete a[b])},parentForm:h,$animate:d});f.$setDirty=function(){d.removeClass(b,Qa);d.addClass(b,Fb);f.$dirty=!0;f.$pristine=!1;h.$setDirty()};f.$setPristine=function(){d.setClass(b,Qa,Fb+" ng-submitted");f.$dirty=!1;f.$pristine=!0;
f.$submitted=!1;r(g,function(a){a.$setPristine()})};f.$setUntouched=function(){r(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){d.addClass(b,"ng-submitted");f.$submitted=!0;h.$setSubmitted()}}function hc(b){b.$formatters.push(function(a){return b.$isEmpty(a)?a:a.toString()})}function gb(b,a,c,d,e,f){var g=a[0].placeholder,h={},k=R(a[0].type);if(!e.android){var l=!1;a.on("compositionstart",function(a){l=!0});a.on("compositionend",function(){l=!1;m()})}var m=function(b){if(!l){var e=
a.val(),f=b&&b.type;Ha&&"input"===(b||h).type&&a[0].placeholder!==g?g=a[0].placeholder:("password"===k||c.ngTrim&&"false"===c.ngTrim||(e=P(e)),(d.$viewValue!==e||""===e&&d.$$hasNativeValidators)&&d.$setViewValue(e,f))}};if(e.hasEvent("input"))a.on("input",m);else{var p,s=function(a){p||(p=f.defer(function(){m(a);p=null}))};a.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||s(a)});if(e.hasEvent("paste"))a.on("paste cut",s)}a.on("change",m);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?
"":d.$viewValue)}}function Gb(b,a){return function(c,d){var e,f;if(fa(c))return c;if(I(c)){'"'==c.charAt(0)&&'"'==c.charAt(c.length-1)&&(c=c.substring(1,c.length-1));if(If.test(c))return new Date(c);b.lastIndex=0;if(e=b.exec(c))return e.shift(),f=d?{yyyy:d.getFullYear(),MM:d.getMonth()+1,dd:d.getDate(),HH:d.getHours(),mm:d.getMinutes(),ss:d.getSeconds(),sss:d.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},r(e,function(b,c){c<a.length&&(f[a[c]]=+b)}),new Date(f.yyyy,f.MM-1,f.dd,
f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function hb(b,a,c,d){return function(e,f,g,h,k,l,m){function p(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function s(a){return y(a)?fa(a)?a:c(a):u}qd(e,f,g,h);gb(e,f,g,h,k,l);var t=h&&h.$options&&h.$options.timezone,q;h.$$parserName=b;h.$parsers.push(function(b){return h.$isEmpty(b)?null:a.test(b)?(b=c(b,q),"UTC"===t&&b.setMinutes(b.getMinutes()-b.getTimezoneOffset()),b):u});h.$formatters.push(function(a){if(a&&!fa(a))throw Hb("datefmt",a);if(p(a)){if((q=
a)&&"UTC"===t){var b=6E4*q.getTimezoneOffset();q=new Date(q.getTime()+b)}return m("date")(a,d,t)}q=null;return""});if(y(g.min)||g.ngMin){var r;h.$validators.min=function(a){return!p(a)||G(r)||c(a)>=r};g.$observe("min",function(a){r=s(a);h.$validate()})}if(y(g.max)||g.ngMax){var n;h.$validators.max=function(a){return!p(a)||G(n)||c(a)<=n};g.$observe("max",function(a){n=s(a);h.$validate()})}}}function qd(b,a,c,d){(d.$$hasNativeValidators=K(a[0].validity))&&d.$parsers.push(function(b){var c=a.prop("validity")||
{};return c.badInput&&!c.typeMismatch?u:b})}function rd(b,a,c,d,e){if(y(d)){b=b(d);if(!b.constant)throw z("ngModel")("constexpr",c,d);return b(a)}return e}function pd(b){function a(a,b){b&&!f[a]?(l.addClass(e,a),f[a]=!0):!b&&f[a]&&(l.removeClass(e,a),f[a]=!1)}function c(b,c){b=b?"-"+Mb(b,"-"):"";a(ib+b,!0===c);a(sd+b,!1===c)}var d=b.ctrl,e=b.$element,f={},g=b.set,h=b.unset,k=b.parentForm,l=b.$animate;f[sd]=!(f[ib]=e.hasClass(ib));d.$setValidity=function(b,e,f){e===u?(d.$pending||(d.$pending={}),g(d.$pending,
b,f)):(d.$pending&&h(d.$pending,b,f),td(d.$pending)&&(d.$pending=u));Ua(e)?e?(h(d.$error,b,f),g(d.$$success,b,f)):(g(d.$error,b,f),h(d.$$success,b,f)):(h(d.$error,b,f),h(d.$$success,b,f));d.$pending?(a(ud,!0),d.$valid=d.$invalid=u,c("",null)):(a(ud,!1),d.$valid=td(d.$error),d.$invalid=!d.$valid,c("",d.$valid));e=d.$pending&&d.$pending[b]?u:d.$error[b]?!1:d.$$success[b]?!0:null;c(b,e);k.$setValidity(b,e,d)}}function td(b){if(b)for(var a in b)return!1;return!0}function ic(b,a){b="ngClass"+b;return["$animate",
function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){if(!D(a)){if(I(a))return a.split(" ");if(K(a)){var b=[];r(a,function(a,c){a&&(b=b.concat(c.split(" ")))});return b}}return a}return{restrict:"AC",link:function(f,g,h){function k(a,b){var c=g.data("$classCounts")||{},d=[];r(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function l(b){if(!0===
a||f.$index%2===a){var l=e(b||[]);if(!m){var t=k(l,1);h.$addClass(t)}else if(!pa(b,m)){var q=e(m),t=d(l,q),l=d(q,l),t=k(t,1),l=k(l,-1);t&&t.length&&c.addClass(g,t);l&&l.length&&c.removeClass(g,l)}}m=ua(b)}var m;f.$watch(h[b],l,!0);h.$observe("class",function(a){l(f.$eval(h[b]))});"ngClass"!==b&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var l=e(f.$eval(h[b]));g===a?(g=k(l,1),h.$addClass(g)):(g=k(l,-1),h.$removeClass(g))}})}}}]}var Jf=/^\/(.+)\/([a-z]*)$/,R=function(b){return I(b)?b.toLowerCase():
b},Jb=Object.prototype.hasOwnProperty,rb=function(b){return I(b)?b.toUpperCase():b},Ha,A,qa,Ya=[].slice,of=[].splice,Kf=[].push,Ja=Object.prototype.toString,Wa=z("ng"),ha=U.angular||(U.angular={}),ab,kb=0;Ha=V.documentMode;x.$inject=[];oa.$inject=[];var D=Array.isArray,P=function(b){return I(b)?b.trim():b},dd=function(b){return b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},$a=function(){if(y($a.isActive_))return $a.isActive_;var b=!(!V.querySelector("[ng-csp]")&&!V.querySelector("[data-ng-csp]"));
if(!b)try{new Function("")}catch(a){b=!0}return $a.isActive_=b},ob=["ng-","data-ng-","ng:","x-ng-"],Jd=/[A-Z]/g,sc=!1,Nb,na=1,mb=3,Nd={full:"1.3.4",major:1,minor:3,dot:4,codeName:"highfalutin-petroglyph"};S.expando="ng339";var wb=S.cache={},df=1;S._data=function(b){return this.cache[b[this.expando]]||{}};var Ze=/([\:\-\_]+(.))/g,$e=/^moz([A-Z])/,Lf={mouseleave:"mouseout",mouseenter:"mouseover"},Qb=z("jqLite"),cf=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Pb=/<|&#?\w+;/,af=/<([\w:]+)/,bf=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
ja={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ja.optgroup=ja.option;ja.tbody=ja.tfoot=ja.colgroup=ja.caption=ja.thead;ja.th=ja.td;var Ka=S.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===V.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),S(U).on("load",a))},
toString:function(){var b=[];r(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?A(this[b]):A(this[this.length+b])},length:0,push:Kf,sort:[].sort,splice:[].splice},yb={};r("multiple selected checked disabled readOnly required open".split(" "),function(b){yb[R(b)]=b});var Kc={};r("input select option textarea button form details".split(" "),function(b){Kc[b]=!0});var Lc={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};
r({data:Sb,removeData:ub},function(b,a){S[a]=b});r({data:Sb,inheritedData:xb,scope:function(b){return A.data(b,"$scope")||xb(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return A.data(b,"$isolateScope")||A.data(b,"$isolateScopeNoTemplate")},controller:Gc,injector:function(b){return xb(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Tb,css:function(b,a,c){a=bb(a);if(y(c))b.style[a]=c;else return b.style[a]},attr:function(b,a,c){var d=R(a);if(yb[d])if(y(c))c?
(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||x).specified?d:u;else if(y(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?u:b},prop:function(b,a,c){if(y(c))b[a]=c;else return b[a]},text:function(){function b(a,b){if(G(b)){var d=a.nodeType;return d===na||d===mb?a.textContent:""}a.textContent=b}b.$dv="";return b}(),val:function(b,a){if(G(a)){if(b.multiple&&"select"===ta(b)){var c=[];r(b.options,function(a){a.selected&&
c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(G(a))return b.innerHTML;tb(b,!0);b.innerHTML=a},empty:Hc},function(b,a){S.prototype[a]=function(a,d){var e,f,g=this.length;if(b!==Hc&&(2==b.length&&b!==Tb&&b!==Gc?a:d)===u){if(K(a)){for(e=0;e<g;e++)if(b===Sb)b(this[e],a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;g=e===u?Math.min(g,1):g;for(f=0;f<g;f++){var h=b(this[f],a,d);e=e?e+h:h}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});
r({removeData:ub,on:function a(c,d,e,f){if(y(f))throw Qb("onargs");if(Cc(c)){var g=vb(c,!0);f=g.events;var h=g.handle;h||(h=g.handle=gf(c,f));for(var g=0<=d.indexOf(" ")?d.split(" "):[d],k=g.length;k--;){d=g[k];var l=f[d];l||(f[d]=[],"mouseenter"===d||"mouseleave"===d?a(c,Lf[d],function(a){var c=a.relatedTarget;c&&(c===this||this.contains(c))||h(a,d)}):"$destroy"!==d&&c.addEventListener(d,h,!1),l=f[d]);l.push(e)}}},off:Fc,one:function(a,c,d){a=A(a);a.on(c,function f(){a.off(c,d);a.off(c,f)});a.on(c,
d)},replaceWith:function(a,c){var d,e=a.parentNode;tb(a);r(new S(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];r(a.childNodes,function(a){a.nodeType===na&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){var d=a.nodeType;if(d===na||11===d){c=new S(c);for(var d=0,e=c.length;d<e;d++)a.appendChild(c[d])}},prepend:function(a,c){if(a.nodeType===na){var d=a.firstChild;r(new S(c),function(c){a.insertBefore(c,
d)})}},wrap:function(a,c){c=A(c).eq(0).clone()[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:Ic,detach:function(a){Ic(a,!0)},after:function(a,c){var d=a,e=a.parentNode;c=new S(c);for(var f=0,g=c.length;f<g;f++){var h=c[f];e.insertBefore(h,d.nextSibling);d=h}},addClass:Vb,removeClass:Ub,toggleClass:function(a,c,d){c&&r(c.split(" "),function(c){var f=d;G(f)&&(f=!Tb(a,c));(f?Vb:Ub)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},
find:function(a,c){return a.getElementsByTagName?a.getElementsByTagName(c):[]},clone:Rb,triggerHandler:function(a,c,d){var e,f,g=c.type||c,h=vb(a);if(h=(h=h&&h.events)&&h[g])e={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:x,type:g,target:a},c.type&&(e=C(e,
c)),c=ua(h),f=d?[e].concat(d):[e],r(c,function(c){e.isImmediatePropagationStopped()||c.apply(a,f)})}},function(a,c){S.prototype[c]=function(c,e,f){for(var g,h=0,k=this.length;h<k;h++)G(g)?(g=a(this[h],c,e,f),y(g)&&(g=A(g))):Ec(g,a(this[h],c,e,f));return y(g)?g:this};S.prototype.bind=S.prototype.on;S.prototype.unbind=S.prototype.off});cb.prototype={put:function(a,c){this[Ma(a,this.nextUid)]=c},get:function(a){return this[Ma(a,this.nextUid)]},remove:function(a){var c=this[a=Ma(a,this.nextUid)];delete this[a];
return c}};var Nc=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,jf=/,/,kf=/^\s*(_?)(\S+?)\1\s*$/,Mc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ea=z("$injector");Lb.$$annotate=Wb;var Mf=z("$animate"),ze=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Mf("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null);return this.$$classNameFilter};
this.$get=["$$q","$$asyncCallback","$rootScope",function(a,d,e){function f(d){var f,g=a.defer();g.promise.$$cancelFn=function(){f&&f()};e.$$postDigest(function(){f=d(function(){g.resolve()})});return g.promise}function g(a,c){var d=[],e=[],f=ia();r((a.attr("class")||"").split(/\s+/),function(a){f[a]=!0});r(c,function(a,c){var g=f[c];!1===a&&g?e.push(c):!0!==a||g||d.push(c)});return 0<d.length+e.length&&[d.length?d:null,e.length?e:null]}function h(a,c,d){for(var e=0,f=c.length;e<f;++e)a[c[e]]=d}function k(){m||
(m=a.defer(),d(function(){m.resolve();m=null}));return m.promise}function l(a,c){if(ha.isObject(c)){var d=C(c.from||{},c.to||{});a.css(d)}}var m;return{animate:function(a,c,d){l(a,{from:c,to:d});return k()},enter:function(a,c,d,e){l(a,e);d?d.after(a):c.prepend(a);return k()},leave:function(a,c){a.remove();return k()},move:function(a,c,d,e){return this.enter(a,c,d,e)},addClass:function(a,c,d){return this.setClass(a,c,[],d)},$$addClassImmediately:function(a,c,d){a=A(a);c=I(c)?c:D(c)?c.join(" "):"";
r(a,function(a){Vb(a,c)});l(a,d);return k()},removeClass:function(a,c,d){return this.setClass(a,[],c,d)},$$removeClassImmediately:function(a,c,d){a=A(a);c=I(c)?c:D(c)?c.join(" "):"";r(a,function(a){Ub(a,c)});l(a,d);return k()},setClass:function(a,c,d,e){var k=this,l=!1;a=A(a);var m=a.data("$$animateClasses");m?e&&m.options&&(m.options=ha.extend(m.options||{},e)):(m={classes:{},options:e},l=!0);e=m.classes;c=D(c)?c:c.split(" ");d=D(d)?d:d.split(" ");h(e,c,!0);h(e,d,!1);l&&(m.promise=f(function(c){var d=
a.data("$$animateClasses");a.removeData("$$animateClasses");if(d){var e=g(a,d.classes);e&&k.$$setClassImmediately(a,e[0],e[1],d.options)}c()}),a.data("$$animateClasses",m));return m.promise},$$setClassImmediately:function(a,c,d,e){c&&this.$$addClassImmediately(a,c);d&&this.$$removeClassImmediately(a,d);l(a,e);return k()},enabled:x,cancel:x}}]}],ka=z("$compile");uc.$inject=["$provide","$$sanitizeUriProvider"];var nf=/^((?:x|data)[\:\-_])/i,Sc="application/json",Zb={"Content-Type":Sc+";charset=utf-8"},
qf=/^\s*(\[|\{[^\{])/,rf=/[\}\]]\s*$/,pf=/^\)\]\}',?\n/,$b=z("$interpolate"),Nf=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,uf={http:80,https:443,ftp:21},eb=z("$location"),Of={$$html5:!1,$$replace:!1,absUrl:Bb("$$absUrl"),url:function(a){if(G(a))return this.$$url;var c=Nf.exec(a);(c[1]||""===a)&&this.path(decodeURIComponent(c[1]));(c[2]||c[1]||""===a)&&this.search(c[3]||"");this.hash(c[5]||"");return this},protocol:Bb("$$protocol"),host:Bb("$$host"),port:Bb("$$port"),path:$c("$$path",function(a){a=null!==a?
a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(I(a)||X(a))a=a.toString(),this.$$search=qc(a);else if(K(a))a=Ca(a,{}),r(a,function(c,e){null==c&&delete a[e]}),this.$$search=a;else throw eb("isrcharg");break;default:G(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:$c("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};
r([Zc,dc,cc],function(a){a.prototype=Object.create(Of);a.prototype.state=function(c){if(!arguments.length)return this.$$state;if(a!==cc||!this.$$html5)throw eb("nostate");this.$$state=G(c)?null:c;return this}});var la=z("$parse"),Pf=Function.prototype.call,Qf=Function.prototype.apply,Rf=Function.prototype.bind,Ib=ia();r({"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:function(){}},function(a,c){a.constant=a.literal=a.sharedGetter=!0;Ib[c]=a});Ib["this"]=
function(a){return a};Ib["this"].sharedGetter=!0;var jb=C(ia(),{"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return y(d)?y(e)?d+e:d:y(e)?e:u},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(y(d)?d:0)-(y(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,
c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"!":function(a,c,d){return!d(a,c)},"=":!0,"|":!0}),Sf={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},gc=function(a){this.options=a};gc.prototype={constructor:gc,lex:function(a){this.text=a;this.index=0;for(this.tokens=
[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(a))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var c=a+this.peek(),d=c+this.peek(2),e=jb[c],f=jb[d];jb[a]||e||f?(a=f?d:e?c:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=
a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,c){return-1!==c.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===
a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=y(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw la("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=R(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||
e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:c,text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=this.index;this.index<this.text.length;){var c=this.text.charAt(this.index);if(!this.isIdent(c)&&!this.isNumber(c))break;this.index++}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,f=!1;this.index<this.text.length;){var g=
this.text.charAt(this.index),e=e+g;if(f)"u"===g?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d+=Sf[g]||g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,constant:!0,value:d});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var fb=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};fb.ZERO=C(function(){return 0},
{sharedGetter:!0,constant:!0});fb.prototype={constructor:fb,parse:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.statements();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);a.literal=!!a.literal;a.constant=!!a.constant;return a},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.peek().identifier?a=this.identifier():this.peek().constant?a=
this.constant():this.throwError("not a primary expression",this.peek());for(var c,d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw la("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw la("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,
e){return this.peekAhead(0,a,c,d,e)},peekAhead:function(a,c,d,e,f){if(this.tokens.length>a){a=this.tokens[a];var g=a.text;if(g===c||g===d||g===e||g===f||!(c||d||e||f))return a}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.tokens.shift(),a):!1},consume:function(a){if(0===this.tokens.length)throw la("ueoe",this.text);var c=this.expect(a);c||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return c},unaryFn:function(a,c){var d=jb[a];return C(function(a,f){return d(a,
f,c)},{constant:c.constant,inputs:[c]})},binaryFn:function(a,c,d,e){var f=jb[c];return C(function(c,e){return f(c,e,a,d)},{constant:a.constant&&d.constant,inputs:!e&&[a,d]})},identifier:function(){for(var a=this.consume().text;this.peek(".")&&this.peekAhead(1).identifier&&!this.peekAhead(2,"(");)a+=this.consume().text+this.consume().text;return Ib[a]||bd(a,this.options,this.text)},constant:function(){var a=this.consume().value;return C(function(){return a},{constant:!0,literal:!0})},statements:function(){for(var a=
[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,f=0,g=a.length;f<g;f++)e=a[f](c,d);return e}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},filter:function(a){var c=this.$filter(this.consume().text),d,e;if(this.peek(":"))for(d=[],e=[];this.expect(":");)d.push(this.expression());var f=[a].concat(d||[]);return C(function(f,h){var k=a(f,h);if(e){e[0]=
k;for(k=d.length;k--;)e[k+1]=d[k](f,h);return c.apply(u,e)}return c(k)},{constant:!c.$stateful&&f.every(ec),inputs:!c.$stateful&&f})},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),C(function(d,f){return a.assign(d,c(d,f),f)},{inputs:[a,c]})):a},ternary:function(){var a=this.logicalOR(),c;if(this.expect("?")&&
(c=this.assignment(),this.consume(":"))){var d=this.assignment();return C(function(e,f){return a(e,f)?c(e,f):d(e,f)},{constant:a.constant&&c.constant&&d.constant})}return a},logicalOR:function(){for(var a=this.logicalAND(),c;c=this.expect("||");)a=this.binaryFn(a,c.text,this.logicalAND(),!0);return a},logicalAND:function(){var a=this.equality(),c;if(c=this.expect("&&"))a=this.binaryFn(a,c.text,this.logicalAND(),!0);return a},equality:function(){var a=this.relational(),c;if(c=this.expect("==","!=",
"===","!=="))a=this.binaryFn(a,c.text,this.equality());return a},relational:function(){var a=this.additive(),c;if(c=this.expect("<",">","<=",">="))a=this.binaryFn(a,c.text,this.relational());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.text,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.text,this.unary());return a},unary:function(){var a;return this.expect("+")?
this.primary():(a=this.expect("-"))?this.binaryFn(fb.ZERO,a.text,this.unary()):(a=this.expect("!"))?this.unaryFn(a.text,this.unary()):this.primary()},fieldAccess:function(a){var c=this.text,d=this.consume().text,e=bd(d,this.options,c);return C(function(c,d,h){return e(h||a(c,d))},{assign:function(e,g,h){(h=a(e,h))||a.assign(e,h={});return Oa(h,d,g,c)}})},objectIndex:function(a){var c=this.text,d=this.expression();this.consume("]");return C(function(e,f){var g=a(e,f),h=d(e,f);ra(h,c);return g?sa(g[h],
c):u},{assign:function(e,f,g){var h=ra(d(e,g),c);(g=sa(a(e,g),c))||a.assign(e,g={});return g[h]=f}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());while(this.expect(","))}this.consume(")");var e=this.text,f=d.length?[]:null;return function(g,h){var k=c?c(g,h):g,l=a(g,h,k)||x;if(f)for(var m=d.length;m--;)f[m]=sa(d[m](g,h),e);sa(k,e);if(l){if(l.constructor===l)throw la("isecfn",e);if(l===Pf||l===Qf||l===Rf)throw la("isecff",e);}k=l.apply?l.apply(k,
f):l(f[0],f[1],f[2],f[3],f[4]);return sa(k,e)}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))}this.consume("]");return C(function(c,d){for(var e=[],f=0,g=a.length;f<g;f++)e.push(a[f](c,d));return e},{literal:!0,constant:a.every(ec),inputs:a})},object:function(){var a=[],c=[];if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.consume();d.constant?a.push(d.value):d.identifier?a.push(d.text):
this.throwError("invalid key",d);this.consume(":");c.push(this.expression())}while(this.expect(","))}this.consume("}");return C(function(d,f){for(var g={},h=0,k=c.length;h<k;h++)g[a[h]]=c[h](d,f);return g},{literal:!0,constant:c.every(ec),inputs:c})}};var xf=ia(),wf=ia(),yf=Object.prototype.valueOf,Ba=z("$sce"),ma={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},ka=z("$compile"),Y=V.createElement("a"),fd=Aa(U.location.href);Bc.$inject=["$provide"];gd.$inject=["$locale"];id.$inject=
["$locale"];var ld=".",Hf={yyyy:Z("FullYear",4),yy:Z("FullYear",2,0,!0),y:Z("FullYear",1),MMMM:Db("Month"),MMM:Db("Month",!0),MM:Z("Month",2,1),M:Z("Month",1,1),dd:Z("Date",2),d:Z("Date",1),HH:Z("Hours",2),H:Z("Hours",1),hh:Z("Hours",2,-12),h:Z("Hours",1,-12),mm:Z("Minutes",2),m:Z("Minutes",1),ss:Z("Seconds",2),s:Z("Seconds",1),sss:Z("Milliseconds",3),EEEE:Db("Day"),EEE:Db("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=
a?"+":"")+(Cb(Math[0<a?"floor":"ceil"](a/60),2)+Cb(Math.abs(a%60),2))},ww:nd(2),w:nd(1)},Gf=/((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/,Ff=/^\-?\d+$/;hd.$inject=["$locale"];var Df=ca(R),Ef=ca(rb);jd.$inject=["$parse"];var Qd=ca({restrict:"E",compile:function(a,c){if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){var f="[object SVGAnimatedString]"===Ja.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(f)||a.preventDefault()})}}}),sb=
{};r(yb,function(a,c){if("multiple"!=a){var d=wa("ng-"+c);sb[d]=function(){return{restrict:"A",priority:100,link:function(a,f,g){a.$watch(g[d],function(a){g.$set(c,!!a)})}}}}});r(Lc,function(a,c){sb[c]=function(){return{priority:100,link:function(a,e,f){if("ngPattern"===c&&"/"==f.ngPattern.charAt(0)&&(e=f.ngPattern.match(Jf))){f.$set("ngPattern",new RegExp(e[1],e[2]));return}a.$watch(f[c],function(a){f.$set(c,a)})}}}});r(["src","srcset","href"],function(a){var c=wa("ng-"+a);sb[c]=function(){return{priority:99,
link:function(d,e,f){var g=a,h=a;"href"===a&&"[object SVGAnimatedString]"===Ja.call(e.prop("href"))&&(h="xlinkHref",f.$attr[h]="xlink:href",g=null);f.$observe(c,function(c){c?(f.$set(h,c),Ha&&g&&e.prop(g,f[h])):"href"===a&&f.$set(h,null)})}}}});var Eb={$addControl:x,$$renameControl:function(a,c){a.$name=c},$removeControl:x,$setValidity:x,$setDirty:x,$setPristine:x,$setSubmitted:x};od.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var vd=function(a){return["$timeout",function(c){return{name:"form",
restrict:a?"EAC":"E",controller:od,compile:function(a){a.addClass(Qa).addClass(ib);return{pre:function(a,d,g,h){if(!("action"in g)){var k=function(c){a.$apply(function(){h.$commitViewValue();h.$setSubmitted()});c.preventDefault()};d[0].addEventListener("submit",k,!1);d.on("$destroy",function(){c(function(){d[0].removeEventListener("submit",k,!1)},0,!1)})}var l=h.$$parentForm,m=h.$name;m&&(Oa(a,m,h,m),g.$observe(g.name?"name":"ngForm",function(c){m!==c&&(Oa(a,m,u,m),m=c,Oa(a,m,h,m),l.$$renameControl(h,
m))}));d.on("$destroy",function(){l.$removeControl(h);m&&Oa(a,m,u,m);C(h,Eb)})}}}}}]},Rd=vd(),de=vd(!0),If=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,Tf=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,Uf=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,Vf=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,wd=/^(\d{4})-(\d{2})-(\d{2})$/,xd=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
jc=/^(\d{4})-W(\d\d)$/,yd=/^(\d{4})-(\d\d)$/,zd=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Wf=/(\s+|^)default(\s+|$)/,Hb=new z("ngModel"),Ad={text:function(a,c,d,e,f,g){gb(a,c,d,e,f,g);hc(e)},date:hb("date",wd,Gb(wd,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":hb("datetimelocal",xd,Gb(xd,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:hb("time",zd,Gb(zd,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:hb("week",jc,function(a,c){if(fa(a))return a;if(I(a)){jc.lastIndex=0;var d=
jc.exec(a);if(d){var e=+d[1],f=+d[2],g=d=0,h=0,k=0,l=md(e),f=7*(f-1);c&&(d=c.getHours(),g=c.getMinutes(),h=c.getSeconds(),k=c.getMilliseconds());return new Date(e,0,l.getDate()+f,d,g,h,k)}}return NaN},"yyyy-Www"),month:hb("month",yd,Gb(yd,["yyyy","MM"]),"yyyy-MM"),number:function(a,c,d,e,f,g){qd(a,c,d,e);gb(a,c,d,e,f,g);e.$$parserName="number";e.$parsers.push(function(a){return e.$isEmpty(a)?null:Vf.test(a)?parseFloat(a):u});e.$formatters.push(function(a){if(!e.$isEmpty(a)){if(!X(a))throw Hb("numfmt",
a);a=a.toString()}return a});if(d.min||d.ngMin){var h;e.$validators.min=function(a){return e.$isEmpty(a)||G(h)||a>=h};d.$observe("min",function(a){y(a)&&!X(a)&&(a=parseFloat(a,10));h=X(a)&&!isNaN(a)?a:u;e.$validate()})}if(d.max||d.ngMax){var k;e.$validators.max=function(a){return e.$isEmpty(a)||G(k)||a<=k};d.$observe("max",function(a){y(a)&&!X(a)&&(a=parseFloat(a,10));k=X(a)&&!isNaN(a)?a:u;e.$validate()})}},url:function(a,c,d,e,f,g){gb(a,c,d,e,f,g);hc(e);e.$$parserName="url";e.$validators.url=function(a,
c){var d=a||c;return e.$isEmpty(d)||Tf.test(d)}},email:function(a,c,d,e,f,g){gb(a,c,d,e,f,g);hc(e);e.$$parserName="email";e.$validators.email=function(a,c){var d=a||c;return e.$isEmpty(d)||Uf.test(d)}},radio:function(a,c,d,e){G(d.name)&&c.attr("name",++kb);c.on("click",function(a){c[0].checked&&e.$setViewValue(d.value,a&&a.type)});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e,f,g,h,k){var l=rd(k,a,"ngTrueValue",d.ngTrueValue,!0),
m=rd(k,a,"ngFalseValue",d.ngFalseValue,!1);c.on("click",function(a){e.$setViewValue(c[0].checked,a&&a.type)});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return!1===a};e.$formatters.push(function(a){return pa(a,l)});e.$parsers.push(function(a){return a?l:m})},hidden:x,button:x,submit:x,reset:x,file:x},vc=["$browser","$sniffer","$filter","$parse",function(a,c,d,e){return{restrict:"E",require:["?ngModel"],link:{pre:function(f,g,h,k){k[0]&&(Ad[R(h.type)]||Ad.text)(f,g,h,k[0],
c,a,d,e)}}}}],ib="ng-valid",sd="ng-invalid",Qa="ng-pristine",Fb="ng-dirty",ud="ng-pending",Xf=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,c,d,e,f,g,h,k,l,m){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=u;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=
!1;this.$error={};this.$$success={};this.$pending=u;this.$name=m(d.name||"",!1)(a);var p=f(d.ngModel),s=p.assign,t=p,q=s,N=null,n=this;this.$$setOptions=function(a){if((n.$options=a)&&a.getterSetter){var c=f(d.ngModel+"()"),g=f(d.ngModel+"($$$p)");t=function(a){var d=p(a);F(d)&&(d=c(a));return d};q=function(a,c){F(p(a))?g(a,{$$$p:n.$modelValue}):s(a,n.$modelValue)}}else if(!p.assign)throw Hb("nonassign",d.ngModel,va(e));};this.$render=x;this.$isEmpty=function(a){return G(a)||""===a||null===a||a!==
a};var v=e.inheritedData("$formController")||Eb,w=0;pd({ctrl:this,$element:e,set:function(a,c){a[c]=!0},unset:function(a,c){delete a[c]},parentForm:v,$animate:g});this.$setPristine=function(){n.$dirty=!1;n.$pristine=!0;g.removeClass(e,Fb);g.addClass(e,Qa)};this.$setDirty=function(){n.$dirty=!0;n.$pristine=!1;g.removeClass(e,Qa);g.addClass(e,Fb);v.$setDirty()};this.$setUntouched=function(){n.$touched=!1;n.$untouched=!0;g.setClass(e,"ng-untouched","ng-touched")};this.$setTouched=function(){n.$touched=
!0;n.$untouched=!1;g.setClass(e,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){h.cancel(N);n.$viewValue=n.$$lastCommittedViewValue;n.$render()};this.$validate=function(){if(!X(n.$modelValue)||!isNaN(n.$modelValue)){var a=n.$$rawModelValue,c=n.$valid,d=n.$modelValue,e=n.$options&&n.$options.allowInvalid;n.$$runValidators(n.$error[n.$$parserName||"parse"]?!1:u,a,n.$$lastCommittedViewValue,function(f){e||c===f||(n.$modelValue=f?a:u,n.$modelValue!==d&&n.$$writeModelToScope())})}};this.$$runValidators=
function(a,c,d,e){function f(){var a=!0;r(n.$validators,function(e,f){var g=e(c,d);a=a&&g;h(f,g)});return a?!0:(r(n.$asyncValidators,function(a,c){h(c,null)}),!1)}function g(){var a=[],e=!0;r(n.$asyncValidators,function(f,g){var k=f(c,d);if(!k||!F(k.then))throw Hb("$asyncValidators",k);h(g,u);a.push(k.then(function(){h(g,!0)},function(a){e=!1;h(g,!1)}))});a.length?l.all(a).then(function(){k(e)},x):k(!0)}function h(a,c){m===w&&n.$setValidity(a,c)}function k(a){m===w&&e(a)}w++;var m=w;(function(a){var c=
n.$$parserName||"parse";if(a===u)h(c,null);else if(h(c,a),!a)return r(n.$validators,function(a,c){h(c,null)}),r(n.$asyncValidators,function(a,c){h(c,null)}),!1;return!0})(a)?f()?g():k(!1):k(!1)};this.$commitViewValue=function(){var a=n.$viewValue;h.cancel(N);if(n.$$lastCommittedViewValue!==a||""===a&&n.$$hasNativeValidators)n.$$lastCommittedViewValue=a,n.$pristine&&this.$setDirty(),this.$$parseAndValidate()};this.$$parseAndValidate=function(){var c=n.$$lastCommittedViewValue,d=c,e=G(d)?u:!0;if(e)for(var f=
0;f<n.$parsers.length;f++)if(d=n.$parsers[f](d),G(d)){e=!1;break}X(n.$modelValue)&&isNaN(n.$modelValue)&&(n.$modelValue=t(a));var g=n.$modelValue,h=n.$options&&n.$options.allowInvalid;n.$$rawModelValue=d;h&&(n.$modelValue=d,n.$modelValue!==g&&n.$$writeModelToScope());n.$$runValidators(e,d,c,function(a){h||(n.$modelValue=a?d:u,n.$modelValue!==g&&n.$$writeModelToScope())})};this.$$writeModelToScope=function(){q(a,n.$modelValue);r(n.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}})};this.$setViewValue=
function(a,c){n.$viewValue=a;n.$options&&!n.$options.updateOnDefault||n.$$debounceViewValueCommit(c)};this.$$debounceViewValueCommit=function(c){var d=0,e=n.$options;e&&y(e.debounce)&&(e=e.debounce,X(e)?d=e:X(e[c])?d=e[c]:X(e["default"])&&(d=e["default"]));h.cancel(N);d?N=h(function(){n.$commitViewValue()},d):k.$$phase?n.$commitViewValue():a.$apply(function(){n.$commitViewValue()})};a.$watch(function(){var c=t(a);if(c!==n.$modelValue){n.$modelValue=n.$$rawModelValue=c;for(var d=n.$formatters,e=d.length,
f=c;e--;)f=d[e](f);n.$viewValue!==f&&(n.$viewValue=n.$$lastCommittedViewValue=f,n.$render(),n.$$runValidators(u,c,f,x))}return c})}],se=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:Xf,priority:1,compile:function(c){c.addClass(Qa).addClass("ng-untouched").addClass(ib);return{pre:function(a,c,f,g){var h=g[0],k=g[1]||Eb;h.$$setOptions(g[2]&&g[2].$options);k.$addControl(h);f.$observe("name",function(a){h.$name!==a&&k.$$renameControl(h,a)});a.$on("$destroy",
function(){k.$removeControl(h)})},post:function(c,e,f,g){var h=g[0];if(h.$options&&h.$options.updateOn)e.on(h.$options.updateOn,function(a){h.$$debounceViewValueCommit(a&&a.type)});e.on("blur",function(e){h.$touched||(a.$$phase?c.$evalAsync(h.$setTouched):c.$apply(h.$setTouched))})}}}}}],ue=ca({restrict:"A",require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),xc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){e&&(d.required=
!0,e.$validators.required=function(a,c){return!d.required||!e.$isEmpty(c)},d.$observe("required",function(){e.$validate()}))}}},wc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f,g=d.ngPattern||d.pattern;d.$observe("pattern",function(a){I(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw z("ngPattern")("noregexp",g,a,va(c));f=a||u;e.$validate()});e.$validators.pattern=function(a){return e.$isEmpty(a)||G(f)||f.test(a)}}}}},zc=function(){return{restrict:"A",
require:"?ngModel",link:function(a,c,d,e){if(e){var f=-1;d.$observe("maxlength",function(a){a=$(a);f=isNaN(a)?-1:a;e.$validate()});e.$validators.maxlength=function(a,c){return 0>f||e.$isEmpty(a)||c.length<=f}}}}},yc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("minlength",function(a){f=$(a)||0;e.$validate()});e.$validators.minlength=function(a,c){return e.$isEmpty(c)||c.length>=f}}}}},te=function(){return{restrict:"A",priority:100,require:"ngModel",
link:function(a,c,d,e){var f=c.attr(d.$attr.ngList)||", ",g="false"!==d.ngTrim,h=g?P(f):f;e.$parsers.push(function(a){if(!G(a)){var c=[];a&&r(a.split(h),function(a){a&&c.push(g?P(a):a)});return c}});e.$formatters.push(function(a){return D(a)?a.join(f):u});e.$isEmpty=function(a){return!a||!a.length}}}},Yf=/^(true|false|\d+)$/,ve=function(){return{restrict:"A",priority:100,compile:function(a,c){return Yf.test(c.ngValue)?function(a,c,f){f.$set("value",a.$eval(f.ngValue))}:function(a,c,f){a.$watch(f.ngValue,
function(a){f.$set("value",a)})}}}},we=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,c){var d=this;this.$options=a.$eval(c.ngModelOptions);this.$options.updateOn!==u?(this.$options.updateOnDefault=!1,this.$options.updateOn=P(this.$options.updateOn.replace(Wf,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=!0}]}},Wd=["$compile",function(a){return{restrict:"AC",compile:function(c){a.$$addBindingClass(c);return function(c,e,f){a.$$addBindingInfo(e,
f.ngBind);e=e[0];c.$watch(f.ngBind,function(a){e.textContent=a===u?"":a})}}}}],Yd=["$interpolate","$compile",function(a,c){return{compile:function(d){c.$$addBindingClass(d);return function(d,f,g){d=a(f.attr(g.$attr.ngBindTemplate));c.$$addBindingInfo(f,d.expressions);f=f[0];g.$observe("ngBindTemplate",function(a){f.textContent=a===u?"":a})}}}}],Xd=["$sce","$parse","$compile",function(a,c,d){return{restrict:"A",compile:function(e,f){var g=c(f.ngBindHtml),h=c(f.ngBindHtml,function(a){return(a||"").toString()});
d.$$addBindingClass(e);return function(c,e,f){d.$$addBindingInfo(e,f.ngBindHtml);c.$watch(h,function(){e.html(a.getTrustedHtml(g(c))||"")})}}}}],Zd=ic("",!0),ae=ic("Odd",0),$d=ic("Even",1),be=Ia({compile:function(a,c){c.$set("ngCloak",u);a.removeClass("ng-cloak")}}),ce=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],Ac={},Zf={blur:!0,focus:!0};r("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),
function(a){var c=wa("ng-"+a);Ac[c]=["$parse","$rootScope",function(d,e){return{restrict:"A",compile:function(f,g){var h=d(g[c],null,!0);return function(c,d){d.on(a,function(d){var f=function(){h(c,{$event:d})};Zf[a]&&e.$$phase?c.$evalAsync(f):c.$apply(f)})}}}}]});var fe=["$animate",function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var h,k,l;c.$watch(e.ngIf,function(c){c?k||g(function(c,f){k=f;c[c.length++]=V.createComment(" end ngIf: "+
e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)}):(l&&(l.remove(),l=null),k&&(k.$destroy(),k=null),h&&(l=qb(h.clone),a.leave(l).then(function(){l=null}),h=null))})}}}],ge=["$templateRequest","$anchorScroll","$animate","$sce",function(a,c,d,e){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:ha.noop,compile:function(f,g){var h=g.ngInclude||g.src,k=g.onload||"",l=g.autoscroll;return function(f,g,s,r,q){var u=0,n,v,w,O=function(){v&&(v.remove(),v=null);n&&(n.$destroy(),
n=null);w&&(d.leave(w).then(function(){v=null}),v=w,w=null)};f.$watch(e.parseAsResourceUrl(h),function(e){var h=function(){!y(l)||l&&!f.$eval(l)||c()},s=++u;e?(a(e,!0).then(function(a){if(s===u){var c=f.$new();r.template=a;a=q(c,function(a){O();d.enter(a,null,g).then(h)});n=c;w=a;n.$emit("$includeContentLoaded",e);f.$eval(k)}},function(){s===u&&(O(),f.$emit("$includeContentError",e))}),f.$emit("$includeContentRequested",e)):(O(),r.template=null)})}}}}],xe=["$compile",function(a){return{restrict:"ECA",
priority:-400,require:"ngInclude",link:function(c,d,e,f){/SVG/.test(d[0].toString())?(d.empty(),a(Dc(f.template,V).childNodes)(c,function(a){d.append(a)},{futureParentElement:d})):(d.html(f.template),a(d.contents())(c))}}}],he=Ia({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),ie=Ia({terminal:!0,priority:1E3}),je=["$locale","$interpolate",function(a,c){var d=/{}/g,e=/^when(Minus)?(.+)$/;return{restrict:"EA",link:function(f,g,h){function k(a){g.text(a||"")}var l=
h.count,m=h.$attr.when&&g.attr(h.$attr.when),p=h.offset||0,s=f.$eval(m)||{},t={},m=c.startSymbol(),q=c.endSymbol(),u=m+l+"-"+p+q,n=ha.noop,v;r(h,function(a,c){var d=e.exec(c);d&&(d=(d[1]?"-":"")+R(d[2]),s[d]=g.attr(h.$attr[c]))});r(s,function(a,e){t[e]=c(a.replace(d,u))});f.$watch(l,function(c){c=parseFloat(c);var d=isNaN(c);d||c in s||(c=a.pluralCat(c-p));c===v||d&&isNaN(v)||(n(),n=f.$watch(t[c],k),v=c)})}}}],ke=["$parse","$animate",function(a,c){var d=z("ngRepeat"),e=function(a,c,d,e,l,m,p){a[d]=
e;l&&(a[l]=m);a.$index=c;a.$first=0===c;a.$last=c===p-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(c&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(f,g){var h=g.ngRepeat,k=V.createComment(" end ngRepeat: "+h+" "),l=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!l)throw d("iexp",h);var m=l[1],p=l[2],s=l[3],t=l[4],l=m.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
if(!l)throw d("iidexp",m);var q=l[3]||l[1],y=l[2];if(s&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(s)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent)$/.test(s)))throw d("badident",s);var n,v,w,z,E={$id:Ma};t?n=a(t):(w=function(a,c){return Ma(c)},z=function(a){return a});return function(a,f,g,l,m){n&&(v=function(c,d,e){y&&(E[y]=c);E[q]=d;E.$index=e;return n(a,E)});var t=ia();a.$watchCollection(p,function(g){var l,n,p=f[0],B,E=ia(),C,x,G,T,D,F,I;s&&(a[s]=g);if(Ra(g))D=g,n=v||
w;else{n=v||z;D=[];for(I in g)g.hasOwnProperty(I)&&"$"!=I.charAt(0)&&D.push(I);D.sort()}C=D.length;I=Array(C);for(l=0;l<C;l++)if(x=g===D?l:D[l],G=g[x],T=n(x,G,l),t[T])F=t[T],delete t[T],E[T]=F,I[l]=F;else{if(E[T])throw r(I,function(a){a&&a.scope&&(t[a.id]=a)}),d("dupes",h,T,G);I[l]={id:T,scope:u,clone:u};E[T]=!0}for(B in t){F=t[B];T=qb(F.clone);c.leave(T);if(T[0].parentNode)for(l=0,n=T.length;l<n;l++)T[l].$$NG_REMOVED=!0;F.scope.$destroy()}for(l=0;l<C;l++)if(x=g===D?l:D[l],G=g[x],F=I[l],F.scope){B=
p;do B=B.nextSibling;while(B&&B.$$NG_REMOVED);F.clone[0]!=B&&c.move(qb(F.clone),null,A(p));p=F.clone[F.clone.length-1];e(F.scope,l,q,G,y,x,C)}else m(function(a,d){F.scope=d;var f=k.cloneNode(!1);a[a.length++]=f;c.enter(a,null,A(p));p=f;F.clone=a;E[F.id]=F;e(F.scope,l,q,G,y,x,C)});t=E})}}}}],le=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngShow,function(c){a[c?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],ee=["$animate",
function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngHide,function(c){a[c?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],me=Ia(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&r(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),ne=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,f){var g=[],h=[],k=[],l=[],m=function(a,c){return function(){a.splice(c,
1)}};c.$watch(e.ngSwitch||e.on,function(c){var d,e;d=0;for(e=k.length;d<e;++d)a.cancel(k[d]);d=k.length=0;for(e=l.length;d<e;++d){var q=qb(h[d].clone);l[d].$destroy();(k[d]=a.leave(q)).then(m(k,d))}h.length=0;l.length=0;(g=f.cases["!"+c]||f.cases["?"])&&r(g,function(c){c.transclude(function(d,e){l.push(e);var f=c.element;d[d.length++]=V.createComment(" end ngSwitchWhen: ");h.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],oe=Ia({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,
link:function(a,c,d,e,f){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),pe=Ia({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:f,element:c})}}),re=Ia({restrict:"EAC",link:function(a,c,d,e,f){if(!f)throw z("ngTransclude")("orphan",va(c));f(function(a){c.empty();c.append(a)})}}),Sd=["$templateCache",function(a){return{restrict:"E",
terminal:!0,compile:function(c,d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],$f=z("ngOptions"),qe=ca({restrict:"A",terminal:!0}),Td=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,e={$setViewValue:x};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,
c,d){var k=this,l={},m=e,p;k.databound=d.ngModel;k.init=function(a,c,d){m=a;p=d};k.addOption=function(c,d){La(c,'"option value"');l[c]=!0;m.$viewValue==c&&(a.val(c),p.parent()&&p.remove());d&&d[0].hasAttribute("selected")&&(d[0].selected=!0)};k.removeOption=function(a){this.hasOption(a)&&(delete l[a],m.$viewValue==a&&this.renderUnknownOption(a))};k.renderUnknownOption=function(c){c="? "+Ma(c)+" ?";p.val(c);a.prepend(p);a.val(c);p.prop("selected",!0)};k.hasOption=function(a){return l.hasOwnProperty(a)};
c.$on("$destroy",function(){k.renderUnknownOption=x})}],link:function(e,g,h,k){function l(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(E.parent()&&E.remove(),c.val(a),""===a&&n.prop("selected",!0)):G(a)&&n?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){E.parent()&&E.remove();d.$setViewValue(c.val())})})}function m(a,c,d){var e;d.$render=function(){var a=new cb(d.$viewValue);r(c.find("option"),function(c){c.selected=y(a.get(c.value))})};a.$watch(function(){pa(e,
d.$viewValue)||(e=ua(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=[];r(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function p(e,f,g){function h(a,c,d){U[x]=d;G&&(U[G]=c);return a(e,U)}function k(a){var c;if(t)if(K&&D(a)){c=new cb([]);for(var d=0;d<a.length;d++)c.put(h(K,null,a[d]),!0)}else c=new cb(a);else K&&(a=h(K,null,a));return function(d,e){var f;f=K?K:C?C:H;return t?y(c.remove(h(f,d,e))):a===h(f,d,e)}}function l(){v||(e.$$postDigest(n),
v=!0)}function m(a,c,d){a[c]=a[c]||0;a[c]+=d?1:-1}function n(){v=!1;var a={"":[]},c=[""],d,l,p,q,u;p=g.$viewValue;q=M(e)||[];var C=G?Object.keys(q).sort():q,x,A,H,D,Q={};u=k(p);var P=!1,V,X;S={};for(D=0;H=C.length,D<H;D++){x=D;if(G&&(x=C[D],"$"===x.charAt(0)))continue;A=q[x];d=h(I,x,A)||"";(l=a[d])||(l=a[d]=[],c.push(d));d=u(x,A);P=P||d;A=h(E,x,A);A=y(A)?A:"";X=K?K(e,U):G?C[D]:D;K&&(S[X]=x);l.push({id:X,label:A,selected:d})}t||(z||null===p?a[""].unshift({id:"",label:"",selected:!P}):P||a[""].unshift({id:"?",
label:"",selected:!0}));x=0;for(C=c.length;x<C;x++){d=c[x];l=a[d];R.length<=x?(p={element:F.clone().attr("label",d),label:l.label},q=[p],R.push(q),f.append(p.element)):(q=R[x],p=q[0],p.label!=d&&p.element.attr("label",p.label=d));P=null;D=0;for(H=l.length;D<H;D++)d=l[D],(u=q[D+1])?(P=u.element,u.label!==d.label&&(m(Q,u.label,!1),m(Q,d.label,!0),P.text(u.label=d.label),P.prop("label",u.label)),u.id!==d.id&&P.val(u.id=d.id),P[0].selected!==d.selected&&(P.prop("selected",u.selected=d.selected),Ha&&P.prop("selected",
u.selected))):(""===d.id&&z?V=z:(V=w.clone()).val(d.id).prop("selected",d.selected).attr("selected",d.selected).prop("label",d.label).text(d.label),q.push(u={element:V,label:d.label,id:d.id,selected:d.selected}),m(Q,d.label,!0),P?P.after(V):p.element.append(V),P=V);for(D++;q.length>D;)d=q.pop(),m(Q,d.label,!1),d.element.remove();r(Q,function(a,c){0<a?s.addOption(c):0>a&&s.removeOption(c)})}for(;R.length>x;)R.pop()[0].element.remove()}var p;if(!(p=q.match(d)))throw $f("iexp",q,va(f));var E=c(p[2]||
p[1]),x=p[4]||p[6],A=/ as /.test(p[0])&&p[1],C=A?c(A):null,G=p[5],I=c(p[3]||""),H=c(p[2]?p[1]:x),M=c(p[7]),K=p[8]?c(p[8]):null,S={},R=[[{element:f,label:""}]],U={};z&&(a(z)(e),z.removeClass("ng-scope"),z.remove());f.empty();f.on("change",function(){e.$apply(function(){var a=M(e)||[],c;if(t)c=[],r(f.val(),function(d){d=K?S[d]:d;c.push("?"===d?u:""===d?null:h(C?C:H,d,a[d]))});else{var d=K?S[f.val()]:f.val();c="?"===d?u:""===d?null:h(C?C:H,d,a[d])}g.$setViewValue(c);n()})});g.$render=n;e.$watchCollection(M,
l);e.$watchCollection(function(){var a=M(e),c;if(a&&D(a)){c=Array(a.length);for(var d=0,f=a.length;d<f;d++)c[d]=h(E,d,a[d])}else if(a)for(d in c={},a)a.hasOwnProperty(d)&&(c[d]=h(E,d,a[d]));return c},l);t&&e.$watchCollection(function(){return g.$modelValue},l)}if(k[1]){var s=k[0];k=k[1];var t=h.multiple,q=h.ngOptions,z=!1,n,v=!1,w=A(V.createElement("option")),F=A(V.createElement("optgroup")),E=w.clone();h=0;for(var x=g.children(),C=x.length;h<C;h++)if(""===x[h].value){n=z=x.eq(h);break}s.init(k,z,
E);t&&(k.$isEmpty=function(a){return!a||0===a.length});q?p(e,g,k):t?m(e,g,k):l(e,g,k,s)}}}}],Vd=["$interpolate",function(a){var c={addOption:x,removeOption:x};return{restrict:"E",priority:100,compile:function(d,e){if(G(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var l=d.parent(),m=l.data("$selectController")||l.parent().data("$selectController");m&&m.databound||(m=c);f?a.$watch(f,function(a,c){e.$set("value",a);c!==a&&m.removeOption(c);m.addOption(a,d)}):m.addOption(e.value,
d);d.on("$destroy",function(){m.removeOption(e.value)})}}}}],Ud=ca({restrict:"E",terminal:!1});U.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):(Kd(),Md(ha),A(V).ready(function(){Gd(V,rc)}))})(window,document);!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>');
//# sourceMappingURL=angular.min.js.map

/*
 AngularJS v1.3.4
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,d,C){'use strict';function v(r,h,g){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,c,b,f,y){function z(){k&&(g.cancel(k),k=null);l&&(l.$destroy(),l=null);m&&(k=g.leave(m),k.then(function(){k=null}),m=null)}function x(){var b=r.current&&r.current.locals;if(d.isDefined(b&&b.$template)){var b=a.$new(),f=r.current;m=y(b,function(b){g.enter(b,null,m||c).then(function(){!d.isDefined(t)||t&&!a.$eval(t)||h()});z()});l=f.scope=b;l.$emit("$viewContentLoaded");
l.$eval(w)}else z()}var l,m,k,t=b.autoscroll,w=b.onload||"";a.$on("$routeChangeSuccess",x);x()}}}function A(d,h,g){return{restrict:"ECA",priority:-400,link:function(a,c){var b=g.current,f=b.locals;c.html(f.$template);var y=d(c.contents());b.controller&&(f.$scope=a,f=h(b.controller,f),b.controllerAs&&(a[b.controllerAs]=f),c.data("$ngControllerController",f),c.children().data("$ngControllerController",f));y(a)}}}p=d.module("ngRoute",["ng"]).provider("$route",function(){function r(a,c){return d.extend(Object.create(a),
c)}function h(a,d){var b=d.caseInsensitiveMatch,f={originalPath:a,regexp:a},g=f.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,d,b,c){a="?"===c?c:null;c="*"===c?c:null;g.push({name:b,optional:!!a});d=d||"";return""+(a?"":d)+"(?:"+(a?d:"")+(c&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");f.regexp=new RegExp("^"+a+"$",b?"i":"");return f}var g={};this.when=function(a,c){var b=d.copy(c);d.isUndefined(b.reloadOnSearch)&&(b.reloadOnSearch=!0);
d.isUndefined(b.caseInsensitiveMatch)&&(b.caseInsensitiveMatch=this.caseInsensitiveMatch);g[a]=d.extend(b,a&&h(a,b));if(a){var f="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";g[f]=d.extend({redirectTo:a},h(f,b))}return this};this.caseInsensitiveMatch=!1;this.otherwise=function(a){"string"===typeof a&&(a={redirectTo:a});this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(a,c,b,f,h,p,x){function l(b){var e=s.current;
(v=(n=k())&&e&&n.$$route===e.$$route&&d.equals(n.pathParams,e.pathParams)&&!n.reloadOnSearch&&!w)||!e&&!n||a.$broadcast("$routeChangeStart",n,e).defaultPrevented&&b&&b.preventDefault()}function m(){var u=s.current,e=n;if(v)u.params=e.params,d.copy(u.params,b),a.$broadcast("$routeUpdate",u);else if(e||u)w=!1,(s.current=e)&&e.redirectTo&&(d.isString(e.redirectTo)?c.path(t(e.redirectTo,e.params)).search(e.params).replace():c.url(e.redirectTo(e.pathParams,c.path(),c.search())).replace()),f.when(e).then(function(){if(e){var a=
d.extend({},e.resolve),b,c;d.forEach(a,function(b,e){a[e]=d.isString(b)?h.get(b):h.invoke(b,null,null,e)});d.isDefined(b=e.template)?d.isFunction(b)&&(b=b(e.params)):d.isDefined(c=e.templateUrl)&&(d.isFunction(c)&&(c=c(e.params)),c=x.getTrustedResourceUrl(c),d.isDefined(c)&&(e.loadedTemplateUrl=c,b=p(c)));d.isDefined(b)&&(a.$template=b);return f.all(a)}}).then(function(c){e==s.current&&(e&&(e.locals=c,d.copy(e.params,b)),a.$broadcast("$routeChangeSuccess",e,u))},function(b){e==s.current&&a.$broadcast("$routeChangeError",
e,u,b)})}function k(){var a,b;d.forEach(g,function(f,g){var q;if(q=!b){var h=c.path();q=f.keys;var l={};if(f.regexp)if(h=f.regexp.exec(h)){for(var k=1,m=h.length;k<m;++k){var n=q[k-1],p=h[k];n&&p&&(l[n.name]=p)}q=l}else q=null;else q=null;q=a=q}q&&(b=r(f,{params:d.extend({},c.search(),a),pathParams:a}),b.$$route=f)});return b||g[null]&&r(g[null],{params:{},pathParams:{}})}function t(a,b){var c=[];d.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var f=a.match(/(\w+)(?:[?*])?(.*)/),
g=f[1];c.push(b[g]);c.push(f[2]||"");delete b[g]}});return c.join("")}var w=!1,n,v,s={routes:g,reload:function(){w=!0;a.$evalAsync(function(){l();m()})},updateParams:function(a){if(this.current&&this.current.$$route){var b={},f=this;d.forEach(Object.keys(a),function(c){f.current.pathParams[c]||(b[c]=a[c])});a=d.extend({},this.current.params,a);c.path(t(this.current.$$route.originalPath,a));c.search(d.extend({},c.search(),b))}else throw B("norout");}};a.$on("$locationChangeStart",l);a.$on("$locationChangeSuccess",
m);return s}]});var B=d.$$minErr("ngRoute");p.provider("$routeParams",function(){this.$get=function(){return{}}});p.directive("ngView",v);p.directive("ngView",A);v.$inject=["$route","$anchorScroll","$animate"];A.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map

/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./dist/lodash.js`
 */
;(function(){function n(n,t,e){e=(e||0)-1;for(var r=n?n.length:0;++e<r;)if(n[e]===t)return e;return-1}function t(t,e){var r=typeof e;if(t=t.l,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:m+e;return t=(t=t[r])&&t[u],"object"==r?t&&-1<n(t,e)?0:-1:t?0:-1}function e(n){var t=this.l,e=typeof n;if("boolean"==e||null==n)t[n]=true;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:m+n,t=t[e]||(t[e]={});"object"==e?(t[r]||(t[r]=[])).push(n):t[r]=true
}}function r(n){return n.charCodeAt(0)}function u(n,t){for(var e=n.m,r=t.m,u=-1,o=e.length;++u<o;){var i=e[u],a=r[u];if(i!==a){if(i>a||typeof i=="undefined")return 1;if(i<a||typeof a=="undefined")return-1}}return n.n-t.n}function o(n){var t=-1,r=n.length,u=n[0],o=n[r/2|0],i=n[r-1];if(u&&typeof u=="object"&&o&&typeof o=="object"&&i&&typeof i=="object")return false;for(u=f(),u["false"]=u["null"]=u["true"]=u.undefined=false,o=f(),o.k=n,o.l=u,o.push=e;++t<r;)o.push(n[t]);return o}function i(n){return"\\"+U[n]
}function a(){return h.pop()||[]}function f(){return g.pop()||{k:null,l:null,m:null,"false":false,n:0,"null":false,number:null,object:null,push:null,string:null,"true":false,undefined:false,o:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var t=n.l;t&&c(t),n.k=n.l=n.m=n.object=n.number=n.string=n.o=null,g.length<_&&g.push(n)}function p(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var u=Array(0>e?0:e);++r<e;)u[r]=n[t+r];return u}function s(e){function h(n,t,e){if(!n||!V[typeof n])return n;
t=t&&typeof e=="undefined"?t:tt(t,e,3);for(var r=-1,u=V[typeof n]&&Fe(n),o=u?u.length:0;++r<o&&(e=u[r],false!==t(n[e],e,n)););return n}function g(n,t,e){var r;if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:tt(t,e,3);for(r in n)if(false===t(n[r],r,n))break;return n}function _(n,t,e){var r,u=n,o=u;if(!u)return o;for(var i=arguments,a=0,f=typeof e=="number"?2:i.length;++a<f;)if((u=i[a])&&V[typeof u])for(var l=-1,c=V[typeof u]&&Fe(u),p=c?c.length:0;++l<p;)r=c[l],"undefined"==typeof o[r]&&(o[r]=u[r]);
return o}function U(n,t,e){var r,u=n,o=u;if(!u)return o;var i=arguments,a=0,f=typeof e=="number"?2:i.length;if(3<f&&"function"==typeof i[f-2])var l=tt(i[--f-1],i[f--],2);else 2<f&&"function"==typeof i[f-1]&&(l=i[--f]);for(;++a<f;)if((u=i[a])&&V[typeof u])for(var c=-1,p=V[typeof u]&&Fe(u),s=p?p.length:0;++c<s;)r=p[c],o[r]=l?l(o[r],u[r]):u[r];return o}function H(n){var t,e=[];if(!n||!V[typeof n])return e;for(t in n)me.call(n,t)&&e.push(t);return e}function J(n){return n&&typeof n=="object"&&!Te(n)&&me.call(n,"__wrapped__")?n:new Q(n)
}function Q(n,t){this.__chain__=!!t,this.__wrapped__=n}function X(n){function t(){if(r){var n=p(r);be.apply(n,arguments)}if(this instanceof t){var o=nt(e.prototype),n=e.apply(o,n||arguments);return wt(n)?n:o}return e.apply(u,n||arguments)}var e=n[0],r=n[2],u=n[4];return $e(t,n),t}function Z(n,t,e,r,u){if(e){var o=e(n);if(typeof o!="undefined")return o}if(!wt(n))return n;var i=ce.call(n);if(!K[i])return n;var f=Ae[i];switch(i){case T:case F:return new f(+n);case W:case P:return new f(n);case z:return o=f(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o
}if(i=Te(n),t){var c=!r;r||(r=a()),u||(u=a());for(var s=r.length;s--;)if(r[s]==n)return u[s];o=i?f(n.length):{}}else o=i?p(n):U({},n);return i&&(me.call(n,"index")&&(o.index=n.index),me.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(i?St:h)(n,function(n,i){o[i]=Z(n,t,e,r,u)}),c&&(l(r),l(u)),o):o}function nt(n){return wt(n)?ke(n):{}}function tt(n,t,e){if(typeof n!="function")return Ut;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(De.funcNames&&(r=!n.name),r=r||!De.funcDecomp,!r)){var u=ge.call(n);
De.funcNames||(r=!O.test(u)),r||(r=E.test(u),$e(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return Mt(n,t)}function et(n){function t(){var n=f?i:this;if(u){var h=p(u);be.apply(h,arguments)}return(o||c)&&(h||(h=p(arguments)),o&&be.apply(h,o),c&&h.length<a)?(r|=16,et([e,s?r:-4&r,h,null,i,a])):(h||(h=arguments),l&&(e=n[v]),this instanceof t?(n=nt(e.prototype),h=e.apply(n,h),wt(h)?h:n):e.apply(n,h))
}var e=n[0],r=n[1],u=n[2],o=n[3],i=n[4],a=n[5],f=1&r,l=2&r,c=4&r,s=8&r,v=e;return $e(t,n),t}function rt(e,r){var u=-1,i=st(),a=e?e.length:0,f=a>=b&&i===n,l=[];if(f){var p=o(r);p?(i=t,r=p):f=false}for(;++u<a;)p=e[u],0>i(r,p)&&l.push(p);return f&&c(r),l}function ut(n,t,e,r){r=(r||0)-1;for(var u=n?n.length:0,o=[];++r<u;){var i=n[r];if(i&&typeof i=="object"&&typeof i.length=="number"&&(Te(i)||yt(i))){t||(i=ut(i,t,e));var a=-1,f=i.length,l=o.length;for(o.length+=f;++a<f;)o[l++]=i[a]}else e||o.push(i)}return o
}function ot(n,t,e,r,u,o){if(e){var i=e(n,t);if(typeof i!="undefined")return!!i}if(n===t)return 0!==n||1/n==1/t;if(n===n&&!(n&&V[typeof n]||t&&V[typeof t]))return false;if(null==n||null==t)return n===t;var f=ce.call(n),c=ce.call(t);if(f==D&&(f=q),c==D&&(c=q),f!=c)return false;switch(f){case T:case F:return+n==+t;case W:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case z:case P:return n==oe(t)}if(c=f==$,!c){var p=me.call(n,"__wrapped__"),s=me.call(t,"__wrapped__");if(p||s)return ot(p?n.__wrapped__:n,s?t.__wrapped__:t,e,r,u,o);
if(f!=q)return false;if(f=n.constructor,p=t.constructor,f!=p&&!(dt(f)&&f instanceof f&&dt(p)&&p instanceof p)&&"constructor"in n&&"constructor"in t)return false}for(f=!u,u||(u=a()),o||(o=a()),p=u.length;p--;)if(u[p]==n)return o[p]==t;var v=0,i=true;if(u.push(n),o.push(t),c){if(p=n.length,v=t.length,(i=v==p)||r)for(;v--;)if(c=p,s=t[v],r)for(;c--&&!(i=ot(n[c],s,e,r,u,o)););else if(!(i=ot(n[v],s,e,r,u,o)))break}else g(t,function(t,a,f){return me.call(f,a)?(v++,i=me.call(n,a)&&ot(n[a],t,e,r,u,o)):void 0}),i&&!r&&g(n,function(n,t,e){return me.call(e,t)?i=-1<--v:void 0
});return u.pop(),o.pop(),f&&(l(u),l(o)),i}function it(n,t,e,r,u){(Te(t)?St:h)(t,function(t,o){var i,a,f=t,l=n[o];if(t&&((a=Te(t))||Pe(t))){for(f=r.length;f--;)if(i=r[f]==t){l=u[f];break}if(!i){var c;e&&(f=e(l,t),c=typeof f!="undefined")&&(l=f),c||(l=a?Te(l)?l:[]:Pe(l)?l:{}),r.push(t),u.push(l),c||it(l,t,e,r,u)}}else e&&(f=e(l,t),typeof f=="undefined"&&(f=t)),typeof f!="undefined"&&(l=f);n[o]=l})}function at(n,t){return n+he(Re()*(t-n+1))}function ft(e,r,u){var i=-1,f=st(),p=e?e.length:0,s=[],v=!r&&p>=b&&f===n,h=u||v?a():s;
for(v&&(h=o(h),f=t);++i<p;){var g=e[i],y=u?u(g,i,e):g;(r?!i||h[h.length-1]!==y:0>f(h,y))&&((u||v)&&h.push(y),s.push(g))}return v?(l(h.k),c(h)):u&&l(h),s}function lt(n){return function(t,e,r){var u={};e=J.createCallback(e,r,3),r=-1;var o=t?t.length:0;if(typeof o=="number")for(;++r<o;){var i=t[r];n(u,i,e(i,r,t),t)}else h(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function ct(n,t,e,r,u,o){var i=1&t,a=4&t,f=16&t,l=32&t;if(!(2&t||dt(n)))throw new ie;f&&!e.length&&(t&=-17,f=e=false),l&&!r.length&&(t&=-33,l=r=false);
var c=n&&n.__bindData__;return c&&true!==c?(c=p(c),c[2]&&(c[2]=p(c[2])),c[3]&&(c[3]=p(c[3])),!i||1&c[1]||(c[4]=u),!i&&1&c[1]&&(t|=8),!a||4&c[1]||(c[5]=o),f&&be.apply(c[2]||(c[2]=[]),e),l&&we.apply(c[3]||(c[3]=[]),r),c[1]|=t,ct.apply(null,c)):(1==t||17===t?X:et)([n,t,e,r,u,o])}function pt(n){return Be[n]}function st(){var t=(t=J.indexOf)===Wt?n:t;return t}function vt(n){return typeof n=="function"&&pe.test(n)}function ht(n){var t,e;return n&&ce.call(n)==q&&(t=n.constructor,!dt(t)||t instanceof t)?(g(n,function(n,t){e=t
}),typeof e=="undefined"||me.call(n,e)):false}function gt(n){return We[n]}function yt(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==D||false}function mt(n,t,e){var r=Fe(n),u=r.length;for(t=tt(t,e,3);u--&&(e=r[u],false!==t(n[e],e,n)););return n}function bt(n){var t=[];return g(n,function(n,e){dt(n)&&t.push(e)}),t.sort()}function _t(n){for(var t=-1,e=Fe(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function dt(n){return typeof n=="function"}function wt(n){return!(!n||!V[typeof n])
}function jt(n){return typeof n=="number"||n&&typeof n=="object"&&ce.call(n)==W||false}function kt(n){return typeof n=="string"||n&&typeof n=="object"&&ce.call(n)==P||false}function xt(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;)u[t]=n[e[t]];return u}function Ct(n,t,e){var r=-1,u=st(),o=n?n.length:0,i=false;return e=(0>e?Ie(0,o+e):e)||0,Te(n)?i=-1<u(n,t,e):typeof o=="number"?i=-1<(kt(n)?n.indexOf(t,e):u(n,t,e)):h(n,function(n){return++r<e?void 0:!(i=n===t)}),i}function Ot(n,t,e){var r=true;t=J.createCallback(t,e,3),e=-1;
var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&(r=!!t(n[e],e,n)););else h(n,function(n,e,u){return r=!!t(n,e,u)});return r}function Nt(n,t,e){var r=[];t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u;){var o=n[e];t(o,e,n)&&r.push(o)}else h(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function It(n,t,e){t=J.createCallback(t,e,3),e=-1;var r=n?n.length:0;if(typeof r!="number"){var u;return h(n,function(n,e,r){return t(n,e,r)?(u=n,false):void 0}),u}for(;++e<r;){var o=n[e];
if(t(o,e,n))return o}}function St(n,t,e){var r=-1,u=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof u=="number")for(;++r<u&&false!==t(n[r],r,n););else h(n,t);return n}function Et(n,t,e){var r=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof r=="number")for(;r--&&false!==t(n[r],r,n););else{var u=Fe(n),r=u.length;h(n,function(n,e,o){return e=u?u[--r]:--r,t(o[e],e,o)})}return n}function Rt(n,t,e){var r=-1,u=n?n.length:0;if(t=J.createCallback(t,e,3),typeof u=="number")for(var o=Xt(u);++r<u;)o[r]=t(n[r],r,n);
else o=[],h(n,function(n,e,u){o[++r]=t(n,e,u)});return o}function At(n,t,e){var u=-1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a>o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e>u&&(u=e,o=n)});return o}function Dt(n,t,e,r){if(!n)return e;var u=3>arguments.length;t=J.createCallback(t,r,4);var o=-1,i=n.length;if(typeof i=="number")for(u&&(e=n[++o]);++o<i;)e=t(e,n[o],o,n);else h(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)
});return e}function $t(n,t,e,r){var u=3>arguments.length;return t=J.createCallback(t,r,4),Et(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)}),e}function Tt(n){var t=-1,e=n?n.length:0,r=Xt(typeof e=="number"?e:0);return St(n,function(n){var e=at(0,++t);r[t]=r[e],r[e]=n}),r}function Ft(n,t,e){var r;t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&!(r=t(n[e],e,n)););else h(n,function(n,e,u){return!(r=t(n,e,u))});return!!r}function Bt(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=-1;
for(t=J.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[0]:v;return p(n,0,Se(Ie(0,r),u))}function Wt(t,e,r){if(typeof r=="number"){var u=t?t.length:0;r=0>r?Ie(0,u+r):r||0}else if(r)return r=zt(t,e),t[r]===e?r:-1;return n(t,e,r)}function qt(n,t,e){if(typeof t!="number"&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=J.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:Ie(0,t);return p(n,r)}function zt(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?J.createCallback(e,r,1):Ut,t=e(t);u<o;)r=u+o>>>1,e(n[r])<t?u=r+1:o=r;
return u}function Pt(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(e=J.createCallback(e,r,3)),ft(n,t,e)}function Kt(){for(var n=1<arguments.length?arguments:arguments[0],t=-1,e=n?At(Ve(n,"length")):0,r=Xt(0>e?0:e);++t<e;)r[t]=Ve(n,t);return r}function Lt(n,t){var e=-1,r=n?n.length:0,u={};for(t||!r||Te(n[0])||(t=[]);++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Mt(n,t){return 2<arguments.length?ct(n,17,p(arguments,2),null,t):ct(n,1,null,null,t)
}function Vt(n,t,e){function r(){c&&ve(c),i=c=p=v,(g||h!==t)&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null))}function u(){var e=t-(Ue()-f);0<e?c=_e(u,e):(i&&ve(i),e=p,i=c=p=v,e&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null)))}var o,i,a,f,l,c,p,s=0,h=false,g=true;if(!dt(n))throw new ie;if(t=Ie(0,t)||0,true===e)var y=true,g=false;else wt(e)&&(y=e.leading,h="maxWait"in e&&(Ie(t,e.maxWait)||0),g="trailing"in e?e.trailing:g);return function(){if(o=arguments,f=Ue(),l=this,p=g&&(c||!y),false===h)var e=y&&!c;else{i||y||(s=f);var v=h-(f-s),m=0>=v;
m?(i&&(i=ve(i)),s=f,a=n.apply(l,o)):i||(i=_e(r,v))}return m&&c?c=ve(c):c||t===h||(c=_e(u,t)),e&&(m=true,a=n.apply(l,o)),!m||c||i||(o=l=null),a}}function Ut(n){return n}function Gt(n,t,e){var r=true,u=t&&bt(t);t&&(e||u.length)||(null==e&&(e=t),o=Q,t=n,n=J,u=bt(t)),false===e?r=false:wt(e)&&"chain"in e&&(r=e.chain);var o=n,i=dt(o);St(u,function(e){var u=n[e]=t[e];i&&(o.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,i=[e];if(be.apply(i,arguments),i=u.apply(n,i),r||t){if(e===i&&wt(i))return this;
i=new o(i),i.__chain__=t}return i})})}function Ht(){}function Jt(n){return function(t){return t[n]}}function Qt(){return this.__wrapped__}e=e?Y.defaults(G.Object(),e,Y.pick(G,A)):G;var Xt=e.Array,Yt=e.Boolean,Zt=e.Date,ne=e.Function,te=e.Math,ee=e.Number,re=e.Object,ue=e.RegExp,oe=e.String,ie=e.TypeError,ae=[],fe=re.prototype,le=e._,ce=fe.toString,pe=ue("^"+oe(ce).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),se=te.ceil,ve=e.clearTimeout,he=te.floor,ge=ne.prototype.toString,ye=vt(ye=re.getPrototypeOf)&&ye,me=fe.hasOwnProperty,be=ae.push,_e=e.setTimeout,de=ae.splice,we=ae.unshift,je=function(){try{var n={},t=vt(t=re.defineProperty)&&t,e=t(n,n,n)&&t
}catch(r){}return e}(),ke=vt(ke=re.create)&&ke,xe=vt(xe=Xt.isArray)&&xe,Ce=e.isFinite,Oe=e.isNaN,Ne=vt(Ne=re.keys)&&Ne,Ie=te.max,Se=te.min,Ee=e.parseInt,Re=te.random,Ae={};Ae[$]=Xt,Ae[T]=Yt,Ae[F]=Zt,Ae[B]=ne,Ae[q]=re,Ae[W]=ee,Ae[z]=ue,Ae[P]=oe,Q.prototype=J.prototype;var De=J.support={};De.funcDecomp=!vt(e.a)&&E.test(s),De.funcNames=typeof ne.name=="string",J.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,variable:"",imports:{_:J}},ke||(nt=function(){function n(){}return function(t){if(wt(t)){n.prototype=t;
var r=new n;n.prototype=null}return r||e.Object()}}());var $e=je?function(n,t){M.value=t,je(n,"__bindData__",M)}:Ht,Te=xe||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==$||false},Fe=Ne?function(n){return wt(n)?Ne(n):[]}:H,Be={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},We=_t(Be),qe=ue("("+Fe(We).join("|")+")","g"),ze=ue("["+Fe(Be).join("")+"]","g"),Pe=ye?function(n){if(!n||ce.call(n)!=q)return false;var t=n.valueOf,e=vt(t)&&(e=ye(t))&&ye(e);return e?n==e||ye(n)==e:ht(n)
}:ht,Ke=lt(function(n,t,e){me.call(n,e)?n[e]++:n[e]=1}),Le=lt(function(n,t,e){(me.call(n,e)?n[e]:n[e]=[]).push(t)}),Me=lt(function(n,t,e){n[e]=t}),Ve=Rt,Ue=vt(Ue=Zt.now)&&Ue||function(){return(new Zt).getTime()},Ge=8==Ee(d+"08")?Ee:function(n,t){return Ee(kt(n)?n.replace(I,""):n,t||0)};return J.after=function(n,t){if(!dt(t))throw new ie;return function(){return 1>--n?t.apply(this,arguments):void 0}},J.assign=U,J.at=function(n){for(var t=arguments,e=-1,r=ut(t,true,false,1),t=t[2]&&t[2][t[1]]===n?1:r.length,u=Xt(t);++e<t;)u[e]=n[r[e]];
return u},J.bind=Mt,J.bindAll=function(n){for(var t=1<arguments.length?ut(arguments,true,false,1):bt(n),e=-1,r=t.length;++e<r;){var u=t[e];n[u]=ct(n[u],1,null,null,n)}return n},J.bindKey=function(n,t){return 2<arguments.length?ct(t,19,p(arguments,2),null,n):ct(t,3,null,null,n)},J.chain=function(n){return n=new Q(n),n.__chain__=true,n},J.compact=function(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r},J.compose=function(){for(var n=arguments,t=n.length;t--;)if(!dt(n[t]))throw new ie;
return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}},J.constant=function(n){return function(){return n}},J.countBy=Ke,J.create=function(n,t){var e=nt(n);return t?U(e,t):e},J.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return tt(n,t,e);if("object"!=r)return Jt(n);var u=Fe(n),o=u[0],i=n[o];return 1!=u.length||i!==i||wt(i)?function(t){for(var e=u.length,r=false;e--&&(r=ot(t[u[e]],n[u[e]],null,true)););return r}:function(n){return n=n[o],i===n&&(0!==i||1/i==1/n)
}},J.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,ct(n,4,null,null,null,t)},J.debounce=Vt,J.defaults=_,J.defer=function(n){if(!dt(n))throw new ie;var t=p(arguments,1);return _e(function(){n.apply(v,t)},1)},J.delay=function(n,t){if(!dt(n))throw new ie;var e=p(arguments,2);return _e(function(){n.apply(v,e)},t)},J.difference=function(n){return rt(n,ut(arguments,true,true,1))},J.filter=Nt,J.flatten=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(n=Rt(n,e,r)),ut(n,t)
},J.forEach=St,J.forEachRight=Et,J.forIn=g,J.forInRight=function(n,t,e){var r=[];g(n,function(n,t){r.push(t,n)});var u=r.length;for(t=tt(t,e,3);u--&&false!==t(r[u--],r[u],n););return n},J.forOwn=h,J.forOwnRight=mt,J.functions=bt,J.groupBy=Le,J.indexBy=Me,J.initial=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return p(n,0,Se(Ie(0,u-r),u))},J.intersection=function(){for(var e=[],r=-1,u=arguments.length,i=a(),f=st(),p=f===n,s=a();++r<u;){var v=arguments[r];
(Te(v)||yt(v))&&(e.push(v),i.push(p&&v.length>=b&&o(r?e[r]:s)))}var p=e[0],h=-1,g=p?p.length:0,y=[];n:for(;++h<g;){var m=i[0],v=p[h];if(0>(m?t(m,v):f(s,v))){for(r=u,(m||s).push(v);--r;)if(m=i[r],0>(m?t(m,v):f(e[r],v)))continue n;y.push(v)}}for(;u--;)(m=i[u])&&c(m);return l(i),l(s),y},J.invert=_t,J.invoke=function(n,t){var e=p(arguments,2),r=-1,u=typeof t=="function",o=n?n.length:0,i=Xt(typeof o=="number"?o:0);return St(n,function(n){i[++r]=(u?t:n[t]).apply(n,e)}),i},J.keys=Fe,J.map=Rt,J.mapValues=function(n,t,e){var r={};
return t=J.createCallback(t,e,3),h(n,function(n,e,u){r[e]=t(n,e,u)}),r},J.max=At,J.memoize=function(n,t){function e(){var r=e.cache,u=t?t.apply(this,arguments):m+arguments[0];return me.call(r,u)?r[u]:r[u]=n.apply(this,arguments)}if(!dt(n))throw new ie;return e.cache={},e},J.merge=function(n){var t=arguments,e=2;if(!wt(n))return n;if("number"!=typeof t[2]&&(e=t.length),3<e&&"function"==typeof t[e-2])var r=tt(t[--e-1],t[e--],2);else 2<e&&"function"==typeof t[e-1]&&(r=t[--e]);for(var t=p(arguments,1,e),u=-1,o=a(),i=a();++u<e;)it(n,t[u],r,o,i);
return l(o),l(i),n},J.min=function(n,t,e){var u=1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a<o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e<u&&(u=e,o=n)});return o},J.omit=function(n,t,e){var r={};if(typeof t!="function"){var u=[];g(n,function(n,t){u.push(t)});for(var u=rt(u,ut(arguments,true,false,1)),o=-1,i=u.length;++o<i;){var a=u[o];r[a]=n[a]}}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)||(r[e]=n)
});return r},J.once=function(n){var t,e;if(!dt(n))throw new ie;return function(){return t?e:(t=true,e=n.apply(this,arguments),n=null,e)}},J.pairs=function(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u},J.partial=function(n){return ct(n,16,p(arguments,1))},J.partialRight=function(n){return ct(n,32,null,p(arguments,1))},J.pick=function(n,t,e){var r={};if(typeof t!="function")for(var u=-1,o=ut(arguments,true,false,1),i=wt(n)?o.length:0;++u<i;){var a=o[u];a in n&&(r[a]=n[a])
}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)&&(r[e]=n)});return r},J.pluck=Ve,J.property=Jt,J.pull=function(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,i=t[e];++o<u;)n[o]===i&&(de.call(n,o--,1),u--);return n},J.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);var r=-1;t=Ie(0,se((t-n)/(e||1)));for(var u=Xt(t);++r<t;)u[r]=n,n+=e;return u},J.reject=function(n,t,e){return t=J.createCallback(t,e,3),Nt(n,function(n,e,r){return!t(n,e,r)
})},J.remove=function(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=J.createCallback(t,e,3);++r<u;)e=n[r],t(e,r,n)&&(o.push(e),de.call(n,r--,1),u--);return o},J.rest=qt,J.shuffle=Tt,J.sortBy=function(n,t,e){var r=-1,o=Te(t),i=n?n.length:0,p=Xt(typeof i=="number"?i:0);for(o||(t=J.createCallback(t,e,3)),St(n,function(n,e,u){var i=p[++r]=f();o?i.m=Rt(t,function(t){return n[t]}):(i.m=a())[0]=t(n,e,u),i.n=r,i.o=n}),i=p.length,p.sort(u);i--;)n=p[i],p[i]=n.o,o||l(n.m),c(n);return p},J.tap=function(n,t){return t(n),n
},J.throttle=function(n,t,e){var r=true,u=true;if(!dt(n))throw new ie;return false===e?r=false:wt(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),L.leading=r,L.maxWait=t,L.trailing=u,Vt(n,t,L)},J.times=function(n,t,e){n=-1<(n=+n)?n:0;var r=-1,u=Xt(n);for(t=tt(t,e,1);++r<n;)u[r]=t(r);return u},J.toArray=function(n){return n&&typeof n.length=="number"?p(n):xt(n)},J.transform=function(n,t,e,r){var u=Te(n);if(null==e)if(u)e=[];else{var o=n&&n.constructor;e=nt(o&&o.prototype)}return t&&(t=J.createCallback(t,r,4),(u?St:h)(n,function(n,r,u){return t(e,n,r,u)
})),e},J.union=function(){return ft(ut(arguments,true,true))},J.uniq=Pt,J.values=xt,J.where=Nt,J.without=function(n){return rt(n,p(arguments,1))},J.wrap=function(n,t){return ct(t,16,[n])},J.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if(Te(e)||yt(e))var r=r?ft(rt(r,e).concat(rt(e,r))):e}return r||[]},J.zip=Kt,J.zipObject=Lt,J.collect=Rt,J.drop=qt,J.each=St,J.eachRight=Et,J.extend=U,J.methods=bt,J.object=Lt,J.select=Nt,J.tail=qt,J.unique=Pt,J.unzip=Kt,Gt(J),J.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),Z(n,t,typeof e=="function"&&tt(e,r,1))
},J.cloneDeep=function(n,t,e){return Z(n,true,typeof t=="function"&&tt(t,e,1))},J.contains=Ct,J.escape=function(n){return null==n?"":oe(n).replace(ze,pt)},J.every=Ot,J.find=It,J.findIndex=function(n,t,e){var r=-1,u=n?n.length:0;for(t=J.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1},J.findKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),h(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.findLast=function(n,t,e){var r;return t=J.createCallback(t,e,3),Et(n,function(n,e,u){return t(n,e,u)?(r=n,false):void 0
}),r},J.findLastIndex=function(n,t,e){var r=n?n.length:0;for(t=J.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1},J.findLastKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),mt(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.has=function(n,t){return n?me.call(n,t):false},J.identity=Ut,J.indexOf=Wt,J.isArguments=yt,J.isArray=Te,J.isBoolean=function(n){return true===n||false===n||n&&typeof n=="object"&&ce.call(n)==T||false},J.isDate=function(n){return n&&typeof n=="object"&&ce.call(n)==F||false
},J.isElement=function(n){return n&&1===n.nodeType||false},J.isEmpty=function(n){var t=true;if(!n)return t;var e=ce.call(n),r=n.length;return e==$||e==P||e==D||e==q&&typeof r=="number"&&dt(n.splice)?!r:(h(n,function(){return t=false}),t)},J.isEqual=function(n,t,e,r){return ot(n,t,typeof e=="function"&&tt(e,r,2))},J.isFinite=function(n){return Ce(n)&&!Oe(parseFloat(n))},J.isFunction=dt,J.isNaN=function(n){return jt(n)&&n!=+n},J.isNull=function(n){return null===n},J.isNumber=jt,J.isObject=wt,J.isPlainObject=Pe,J.isRegExp=function(n){return n&&typeof n=="object"&&ce.call(n)==z||false
},J.isString=kt,J.isUndefined=function(n){return typeof n=="undefined"},J.lastIndexOf=function(n,t,e){var r=n?n.length:0;for(typeof e=="number"&&(r=(0>e?Ie(0,r+e):Se(e,r-1))+1);r--;)if(n[r]===t)return r;return-1},J.mixin=Gt,J.noConflict=function(){return e._=le,this},J.noop=Ht,J.now=Ue,J.parseInt=Ge,J.random=function(n,t,e){var r=null==n,u=null==t;return null==e&&(typeof n=="boolean"&&u?(e=n,n=1):u||typeof t!="boolean"||(e=t,u=true)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,e||n%1||t%1?(e=Re(),Se(n+e*(t-n+parseFloat("1e-"+((e+"").length-1))),t)):at(n,t)
},J.reduce=Dt,J.reduceRight=$t,J.result=function(n,t){if(n){var e=n[t];return dt(e)?n[t]():e}},J.runInContext=s,J.size=function(n){var t=n?n.length:0;return typeof t=="number"?t:Fe(n).length},J.some=Ft,J.sortedIndex=zt,J.template=function(n,t,e){var r=J.templateSettings;n=oe(n||""),e=_({},e,r);var u,o=_({},e.imports,r.imports),r=Fe(o),o=xt(o),a=0,f=e.interpolate||S,l="__p+='",f=ue((e.escape||S).source+"|"+f.source+"|"+(f===N?x:S).source+"|"+(e.evaluate||S).source+"|$","g");n.replace(f,function(t,e,r,o,f,c){return r||(r=o),l+=n.slice(a,c).replace(R,i),e&&(l+="'+__e("+e+")+'"),f&&(u=true,l+="';"+f+";\n__p+='"),r&&(l+="'+((__t=("+r+"))==null?'':__t)+'"),a=c+t.length,t
}),l+="';",f=e=e.variable,f||(e="obj",l="with("+e+"){"+l+"}"),l=(u?l.replace(w,""):l).replace(j,"$1").replace(k,"$1;"),l="function("+e+"){"+(f?"":e+"||("+e+"={});")+"var __t,__p='',__e=_.escape"+(u?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}";try{var c=ne(r,"return "+l).apply(v,o)}catch(p){throw p.source=l,p}return t?c(t):(c.source=l,c)},J.unescape=function(n){return null==n?"":oe(n).replace(qe,gt)},J.uniqueId=function(n){var t=++y;return oe(null==n?"":n)+t
},J.all=Ot,J.any=Ft,J.detect=It,J.findWhere=It,J.foldl=Dt,J.foldr=$t,J.include=Ct,J.inject=Dt,Gt(function(){var n={};return h(J,function(t,e){J.prototype[e]||(n[e]=t)}),n}(),false),J.first=Bt,J.last=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:v;return p(n,Ie(0,u-r))},J.sample=function(n,t,e){return n&&typeof n.length!="number"&&(n=xt(n)),null==t||e?n?n[at(0,n.length-1)]:v:(n=Tt(n),n.length=Se(Ie(0,t),n.length),n)
},J.take=Bt,J.head=Bt,h(J,function(n,t){var e="sample"!==t;J.prototype[t]||(J.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&typeof t=="function")?new Q(o,u):o})}),J.VERSION="2.4.1",J.prototype.chain=function(){return this.__chain__=true,this},J.prototype.toString=function(){return oe(this.__wrapped__)},J.prototype.value=Qt,J.prototype.valueOf=Qt,St(["join","pop","shift"],function(n){var t=ae[n];J.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);
return n?new Q(e,n):e}}),St(["push","reverse","sort","unshift"],function(n){var t=ae[n];J.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),St(["concat","slice","splice"],function(n){var t=ae[n];J.prototype[n]=function(){return new Q(t.apply(this.__wrapped__,arguments),this.__chain__)}}),J}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p\+='';/g,j=/\b(__p\+=)''\+/g,k=/(__e\(.*?\)|\b__t\))\+'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,I=RegExp("^["+d+"]*0+(?=.$)"),S=/($^)/,E=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,A="Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),D="[object Arguments]",$="[object Array]",T="[object Boolean]",F="[object Date]",B="[object Function]",W="[object Number]",q="[object Object]",z="[object RegExp]",P="[object String]",K={};
K[B]=false,K[D]=K[$]=K[T]=K[F]=K[W]=K[q]=K[z]=K[P]=true;var L={leading:false,maxWait:0,trailing:false},M={configurable:false,enumerable:false,value:null,writable:false},V={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},U={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},G=V[typeof window]&&window||this,H=V[typeof exports]&&exports&&!exports.nodeType&&exports,J=V[typeof module]&&module&&!module.nodeType&&module,Q=J&&J.exports===H&&H,X=V[typeof global]&&global;!X||X.global!==X&&X.window!==X||(G=X);
var Y=s();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(G._=Y, define(function(){return Y})):H&&J?Q?(J.exports=Y)._=Y:H._=Y:G._=Y}).call(this);
/*! angular-google-maps 2.0.11 2014-11-26
 *  AngularJS directives for Google Maps
 *  git: https://github.com/angular-ui/angular-google-maps.git
 */
!function(a,b,c){"use strict";(function(){b.module("uiGmapgoogle-maps.providers",[]),b.module("uiGmapgoogle-maps.wrapped",[]),b.module("uiGmapgoogle-maps.extensions",["uiGmapgoogle-maps.wrapped","uiGmapgoogle-maps.providers"]),b.module("uiGmapgoogle-maps.directives.api.utils",["uiGmapgoogle-maps.extensions"]),b.module("uiGmapgoogle-maps.directives.api.managers",[]),b.module("uiGmapgoogle-maps.directives.api.options",["uiGmapgoogle-maps.directives.api.utils"]),b.module("uiGmapgoogle-maps.directives.api.options.builders",[]),b.module("uiGmapgoogle-maps.directives.api.models.child",["uiGmapgoogle-maps.directives.api.utils","uiGmapgoogle-maps.directives.api.options","uiGmapgoogle-maps.directives.api.options.builders"]),b.module("uiGmapgoogle-maps.directives.api.models.parent",["uiGmapgoogle-maps.directives.api.managers","uiGmapgoogle-maps.directives.api.models.child","uiGmapgoogle-maps.providers"]),b.module("uiGmapgoogle-maps.directives.api",["uiGmapgoogle-maps.directives.api.models.parent"]),b.module("uiGmapgoogle-maps",["uiGmapgoogle-maps.directives.api","uiGmapgoogle-maps.providers"]).factory("uiGmapdebounce",["$timeout",function(a){return function(b){var c;return c=0,function(){var d,e,f;return f=this,d=arguments,c++,e=function(a){return function(){return a===c?b.apply(f,d):void 0}}(c),a(e,0,!0)}}}])}).call(this),function(){b.module("uiGmapgoogle-maps.providers").factory("uiGmapMapScriptLoader",["$q","uiGmapuuid",function(c,d){var e,f;return f=void 0,e=function(a){return a.china?"http://maps.google.cn/maps/api/js?":"https://maps.googleapis.com/maps/api/js?"},{load:function(g){var h,i,j,k;return h=c.defer(),b.isDefined(a.google)&&b.isDefined(a.google.maps)?(h.resolve(a.google.maps),h.promise):(j=g.callback="onGoogleMapsReady"+Math.round(1e3*Math.random()),a[j]=function(){a[j]=null,h.resolve(a.google.maps)},i=_.map(g,function(a,b){return b+"="+a}),f&&document.getElementById(f).remove(),i=i.join("&"),k=document.createElement("script"),f="ui_gmap_map_load_"+d.generate(),k.id=f,k.type="text/javascript",k.src=e(g)+i,document.body.appendChild(k),h.promise)}}}]).provider("uiGmapGoogleMapApi",function(){return this.options={china:!1,v:"3.17",libraries:"",language:"en",sensor:"false"},this.configure=function(a){b.extend(this.options,a)},this.$get=["uiGmapMapScriptLoader",function(a){return function(b){return b.load(a.options)}}(this)],this})}.call(this),function(){b.module("uiGmapgoogle-maps.extensions").service("uiGmapExtendGWin",function(){return{init:_.once(function(){return google||("undefined"!=typeof google&&null!==google?google.maps:void 0)||null!=google.maps.InfoWindow?(google.maps.InfoWindow.prototype._open=google.maps.InfoWindow.prototype.open,google.maps.InfoWindow.prototype._close=google.maps.InfoWindow.prototype.close,google.maps.InfoWindow.prototype._isOpen=!1,google.maps.InfoWindow.prototype.open=function(a,b,c){null==c&&(this._isOpen=!0,this._open(a,b,!0))},google.maps.InfoWindow.prototype.close=function(a){null==a&&(this._isOpen=!1,this._close(!0))},google.maps.InfoWindow.prototype.isOpen=function(a){return null==a&&(a=void 0),null==a?this._isOpen:this._isOpen=a},a.InfoBox&&(a.InfoBox.prototype._open=a.InfoBox.prototype.open,a.InfoBox.prototype._close=a.InfoBox.prototype.close,a.InfoBox.prototype._isOpen=!1,a.InfoBox.prototype.open=function(a,b){this._isOpen=!0,this._open(a,b)},a.InfoBox.prototype.close=function(){this._isOpen=!1,this._close()},a.InfoBox.prototype.isOpen=function(a){return null==a&&(a=void 0),null==a?this._isOpen:this._isOpen=a}),a.MarkerLabel_?(a.MarkerLabel_.prototype.setContent=function(){var a;a=this.marker_.get("labelContent"),a&&!_.isEqual(this.oldContent,a)&&("undefined"==typeof(null!=a?a.nodeType:void 0)?(this.labelDiv_.innerHTML=a,this.eventDiv_.innerHTML=this.labelDiv_.innerHTML,this.oldContent=a):(this.labelDiv_.innerHTML="",this.labelDiv_.appendChild(a),a=a.cloneNode(!0),this.eventDiv_.appendChild(a),this.oldContent=a))},a.MarkerLabel_.prototype.onRemove=function(){null!=this.labelDiv_.parentNode&&this.labelDiv_.parentNode.removeChild(this.labelDiv_),null!=this.eventDiv_.parentNode&&this.eventDiv_.parentNode.removeChild(this.eventDiv_),this.listeners_&&this.listeners_.length&&this.listeners_.forEach(function(a){return google.maps.event.removeListener(a)})}):void 0):void 0})}})}.call(this),function(){b.module("uiGmapgoogle-maps.extensions").service("uiGmapLodash",function(){return this.intersectionObjects=function(a,b,c){var d;return null==c&&(c=void 0),d=_.map(a,function(){return function(a){return _.find(b,function(b){return null!=c?c(a,b):_.isEqual(a,b)})}}(this)),_.filter(d,function(a){return null!=a})},this.containsObject=_.includeObject=function(a,b,c){return null==c&&(c=void 0),null===a?!1:_.any(a,function(){return function(a){return null!=c?c(a,b):_.isEqual(a,b)}}(this))},this.differenceObjects=function(a,b,c){return null==c&&(c=void 0),_.filter(a,function(a){return function(d){return!a.containsObject(b,d,c)}}(this))},this.withoutObjects=this.differenceObjects,this.indexOfObject=function(a,b,c,d){var e,f;if(null==a)return-1;if(e=0,f=a.length,d){if("number"!=typeof d)return e=_.sortedIndex(a,b),a[e]===b?e:-1;e=0>d?Math.max(0,f+d):d}for(;f>e;){if(null!=c){if(c(a[e],b))return e}else if(_.isEqual(a[e],b))return e;e++}return-1},this["extends"]=function(a){return _.reduce(a,function(a,b){return _.extend(a,b)},{})},this.isNullOrUndefined=function(a){return _.isNull(a||_.isUndefined(a))},this})}.call(this),function(){b.module("uiGmapgoogle-maps.extensions").factory("uiGmapString",function(){return function(a){return this.contains=function(b,c){return-1!==a.indexOf(b,c)},this}})}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmap_sync",[function(){return{fakePromise:function(){var a;return a=void 0,{then:function(b){return a=b},resolve:function(){return a.apply(void 0,arguments)}}}}}]).service("uiGmap_async",["$timeout","uiGmapPromise","uiGmapLogger",function(a,b,c){var d,e,f,g,h,i,j,k;return d=20,g={value:null},j=function(a,b,c){var d;try{return a.apply(b,c)}catch(e){return d=e,g.value=d,g}},h=function(a,b,d,e){var f,h;return h=j(a,b,e),h===g?(f="error within chunking iterator: "+g.value,c.error(f),d.reject(f)):void 0},k=function(a,b){return a.existingPieces=a.existingPieces?a.existingPieces.then(function(){return b()}):b()},e=function(b,c,d,f,g,i,j){var k,l;for(k=c&&c<b.length?c:b.length,l=j;k--&&l<(b?b.length:l+1);)h(f,void 0,i,[b[l],l]),++l;if(b){if(!(l<b.length))return i.resolve();if(j=l,c)return null!=g&&_.isFunction(g)&&h(g,void 0,i,[]),a(function(){return e(b,c,d,f,g,i,j)},d,!1)}},f=function(a,f,g,h,i,j){var k,l,m;return null==h&&(h=d),null==i&&(i=0),null==j&&(j=1),m=void 0,l=b.defer(),m=l.promise,j?void 0===a||(null!=a?a.length:void 0)<=0?(l.resolve(),m):(e(a,h,j,f,g,l,i),m):(k="pause (delay) must be set from _async!",c.error(k),l.reject(k),m)},i=function(a,c,d,e,g,h){var i;return i=[],null!=a&&(null!=a?a.length:void 0)>0?f(a,function(a){return i.push(c(a))},d,e,g,h).then(function(){return i}):b.resolve(i)},{each:f,map:i,waitOrGo:k,defaultChunkSize:d}}])}.call(this),function(){var a=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapBaseObject",function(){var b,c;return c=["extended","included"],b=function(){function b(){}return b.extend=function(b){var d,e,f;for(d in b)e=b[d],a.call(c,d)<0&&(this[d]=e);return null!=(f=b.extended)&&f.apply(this),this},b.include=function(b){var d,e,f;for(d in b)e=b[d],a.call(c,d)<0&&(this.prototype[d]=e);return null!=(f=b.included)&&f.apply(this),this},b}()})}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapChildEvents",function(){return{onChildCreation:function(){}}})}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapCtrlHandle",["$q",function(a){var b;return b={handle:function(c){return c.$on("$destroy",function(){return b.handle(c)}),c.deferred=a.defer(),{getScope:function(){return c}}},mapPromise:function(a,b){var c;return c=b.getScope(),c.deferred.promise.then(function(b){return a.map=b}),c.deferred.promise}}}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapEventsHelper",["uiGmapLogger",function(){return{setEvents:function(a,c,d,e){return b.isDefined(c.events)&&null!=c.events&&b.isObject(c.events)?_.compact(_.map(c.events,function(f,g){var h;return e&&(h=_(e).contains(g)),c.events.hasOwnProperty(g)&&b.isFunction(c.events[g])&&!h?google.maps.event.addListener(a,g,function(){return c.$evalAsync||(c.$evalAsync=function(){}),c.$evalAsync(f.apply(c,[a,g,d,arguments]))}):void 0})):void 0},removeEvents:function(a){return a?a.forEach(function(a){return a?google.maps.event.removeListener(a):void 0}):void 0}}}])}.call(this),function(){var a={}.hasOwnProperty,c=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapFitHelper",["uiGmapBaseObject","uiGmapLogger","uiGmap_async",function(a,b,d){var e;return e=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return c(b,a),b.prototype.fit=function(a,b){var c,e;return b&&a&&a.length>0?(c=new google.maps.LatLngBounds,e=!1,d.each(a,function(){return function(a){return a?(e||(e=!0),c.extend(a.getPosition())):void 0}}(this)).then(function(){return e?b.fitBounds(c):void 0})):void 0},b}(a)}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapGmapUtil",["uiGmapLogger","$compile",function(a,c){var d,e,f,g;return e=function(a){return Array.isArray(a)&&2===a.length?a[1]:b.isDefined(a.type)&&"Point"===a.type?a.coordinates[1]:a.latitude},f=function(a){return Array.isArray(a)&&2===a.length?a[0]:b.isDefined(a.type)&&"Point"===a.type?a.coordinates[0]:a.longitude},d=function(a){return a?Array.isArray(a)&&2===a.length?new google.maps.LatLng(a[1],a[0]):b.isDefined(a.type)&&"Point"===a.type?new google.maps.LatLng(a.coordinates[1],a.coordinates[0]):new google.maps.LatLng(a.latitude,a.longitude):void 0},g=function(a){if(b.isUndefined(a))return!1;if(_.isArray(a)){if(2===a.length)return!0}else if(null!=a&&(null!=a?a.type:void 0)&&"Point"===a.type&&_.isArray(a.coordinates)&&2===a.coordinates.length)return!0;return a&&b.isDefined((null!=a?a.latitude:void 0)&&b.isDefined(null!=a?a.longitude:void 0))?!0:!1},{setCoordsFromEvent:function(a,c){return a?(Array.isArray(a)&&2===a.length?(a[1]=c.lat(),a[0]=c.lng()):b.isDefined(a.type)&&"Point"===a.type?(a.coordinates[1]=c.lat(),a.coordinates[0]=c.lng()):(a.latitude=c.lat(),a.longitude=c.lng()),a):void 0},getLabelPositionPoint:function(a){var b,c;return void 0===a?void 0:(a=/^([-\d\.]+)\s([-\d\.]+)$/.exec(a),b=parseFloat(a[1]),c=parseFloat(a[2]),null!=b&&null!=c?new google.maps.Point(b,c):void 0)},createWindowOptions:function(e,f,g,h){var i;return null!=g&&null!=h&&null!=c?(i=b.extend({},h,{content:this.buildContent(f,h,g),position:null!=h.position?h.position:b.isObject(e)?e.getPosition():d(f.coords)}),null!=e&&null==(null!=i?i.pixelOffset:void 0)&&(null==i.boxClass||(i.pixelOffset={height:0,width:-2})),i):h?h:(a.error("infoWindow defaults not defined"),g?void 0:a.error("infoWindow content not defined"))},buildContent:function(a,b,d){var e,f;return null!=b.content?f=b.content:null!=c?(d=d.replace(/^\s+|\s+$/g,""),e=""===d?"":c(d)(a),e.length>0&&(f=e[0])):f=d,f},defaultDelay:50,isTrue:function(a){return b.isDefined(a)&&null!==a&&a===!0||"1"===a||"y"===a||"true"===a},isFalse:function(a){return-1!==["false","FALSE",0,"n","N","no","NO"].indexOf(a)},getCoords:d,validateCoords:g,equalCoords:function(a,b){return e(a)===e(b)&&f(a)===f(b)},validatePath:function(a){var c,d,e,f;if(d=0,b.isUndefined(a.type)){if(!Array.isArray(a)||a.length<2)return!1;for(;d<a.length;){if(!(b.isDefined(a[d].latitude)&&b.isDefined(a[d].longitude)||"function"==typeof a[d].lat&&"function"==typeof a[d].lng))return!1;d++}return!0}if(b.isUndefined(a.coordinates))return!1;if("Polygon"===a.type){if(a.coordinates[0].length<4)return!1;c=a.coordinates[0]}else if("MultiPolygon"===a.type){if(f={max:0,index:0},_.forEach(a.coordinates,function(a,b){return a[0].length>this.max?(this.max=a[0].length,this.index=b):void 0},f),e=a.coordinates[f.index],c=e[0],c.length<4)return!1}else{if("LineString"!==a.type)return!1;if(a.coordinates.length<2)return!1;c=a.coordinates}for(;d<c.length;){if(2!==c[d].length)return!1;d++}return!0},convertPathPoints:function(a){var c,d,e,f,g;if(d=0,f=new google.maps.MVCArray,b.isUndefined(a.type))for(;d<a.length;)b.isDefined(a[d].latitude)&&b.isDefined(a[d].longitude)?e=new google.maps.LatLng(a[d].latitude,a[d].longitude):"function"==typeof a[d].lat&&"function"==typeof a[d].lng&&(e=a[d]),f.push(e),d++;else for("Polygon"===a.type?c=a.coordinates[0]:"MultiPolygon"===a.type?(g={max:0,index:0},_.forEach(a.coordinates,function(a,b){return a[0].length>this.max?(this.max=a[0].length,this.index=b):void 0},g),c=a.coordinates[g.index][0]):"LineString"===a.type&&(c=a.coordinates);d<c.length;)f.push(new google.maps.LatLng(c[d][1],c[d][0])),d++;return f},extendMapBounds:function(a,b){var c,d;for(c=new google.maps.LatLngBounds,d=0;d<b.length;)c.extend(b.getAt(d)),d++;return a.fitBounds(c)},getPath:function(a,b){var c;return c=a,_.each(b.split("."),function(a){return c?c=c[a]:void 0}),c},validateBoundPoints:function(a){return b.isUndefined(a.sw.latitude)||b.isUndefined(a.sw.longitude)||b.isUndefined(a.ne.latitude)||b.isUndefined(a.ne.longitude)?!1:!0},convertBoundPoints:function(a){var b;return b=new google.maps.LatLngBounds(new google.maps.LatLng(a.sw.latitude,a.sw.longitude),new google.maps.LatLng(a.ne.latitude,a.ne.longitude))},fitMapBounds:function(a,b){return a.fitBounds(b)}}}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapIsReady",["$q","$timeout",function(a,b){var c,d,e;return c=0,e=[],d=function(){return a.all(e)},{spawn:function(){var b;return b=a.defer(),e.push(b.promise),c+=1,{instance:c,deferred:b}},promises:d,instances:function(){return c},promise:function(e){var f,g;return null==e&&(e=1),f=a.defer(),g=function(){return b(function(){return c!==e?g():f.resolve(d())})},g(),f.promise},reset:function(){return c=0,e.length=0}}}])}.call(this),function(){var a={}.hasOwnProperty,c=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapLinked",["uiGmapBaseObject",function(a){var b;return b=function(a){function b(a,b,c,d){this.scope=a,this.element=b,this.attrs=c,this.ctrls=d}return c(b,a),b}(a)}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapLogger",["$log",function(a){var b,c,d,e;return this.doLog=!0,b={log:1,info:2,debug:3,warn:4,error:5,none:6},e=function(a,b,c){return a>=b?c():void 0},c=function(b,c){return null!=a?a[b](c):console[b](c)},d={},["log","info","debug","warn","error"].forEach(function(a){return function(f){return d[f]=function(d){return a.doLog?e(b[f],a.currentLevel,function(){return c(f,d)}):void 0}}}(this)),this.LEVELS=b,this.currentLevel=b.error,this.log=d.log,this.info=d.info,this.debug=d.debug,this.warn=d.warn,this.error=d.error,this}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapModelKey",["uiGmapBaseObject","uiGmapGmapUtil","uiGmapPromise","$q","$timeout",function(b,c,e,f,g){var h;return h=function(b){function h(b){this.scope=b,this.setChildScope=a(this.setChildScope,this),this.destroyPromise=a(this.destroyPromise,this),this.cleanOnResolve=a(this.cleanOnResolve,this),this.updateInProgress=a(this.updateInProgress,this),this.getChanges=a(this.getChanges,this),this.getProp=a(this.getProp,this),this.setIdKey=a(this.setIdKey,this),this.modelKeyComparison=a(this.modelKeyComparison,this),h.__super__.constructor.call(this),this.defaultIdKey="id",this.idKey=void 0}return d(h,b),h.prototype.evalModelHandle=function(a,b){return void 0===a||void 0===b?void 0:"self"===b?a:c.getPath(a,b)},h.prototype.modelKeyComparison=function(a,b){var d;if(d=null!=this.scope.coords?this.scope:this.parentScope,null==d)throw"No scope or parentScope set!";return c.equalCoords(this.evalModelHandle(a,d.coords),this.evalModelHandle(b,d.coords))},h.prototype.setIdKey=function(a){return this.idKey=null!=a.idKey?a.idKey:this.defaultIdKey},h.prototype.setVal=function(a,b,c){var d;return d=this.modelOrKey(a,b),d=c,a},h.prototype.modelOrKey=function(a,b){return null!=b?"self"!==b?a[b]:a:void 0},h.prototype.getProp=function(a,b){return this.modelOrKey(b,a)},h.prototype.getChanges=function(a,b,c){var d,e,f;c&&(b=_.pick(b,c),a=_.pick(a,c)),e={},f={},d={};for(f in a)b&&b[f]===a[f]||(_.isArray(a[f])?e[f]=a[f]:_.isObject(a[f])?(d=this.getChanges(a[f],b[f]),_.isEmpty(d)||(e[f]=d)):e[f]=a[f]);return e},h.prototype.updateInProgress=function(){var a,b;return b=new Date,a=b-this.lastUpdate,250>=a?!0:this.inProgress?!0:(this.inProgress=!0,this.lastUpdate=b,!1)},h.prototype.cleanOnResolve=function(a){return a["catch"](function(a){return function(){return a.existingPieces=void 0,a.inProgress=!1,e.resolve()}}(this)).then(function(a){return function(){return a.existingPieces=void 0,a.inProgress=!1}}(this))},h.prototype.destroyPromise=function(){var a,b,c;return this.isClearing=!0,b=f.defer(),c=b.promise,a=function(c){return function(){return c.inProgress?g(a,500):b.resolve()}}(this),a(),c},h.prototype.scopeOrModelVal=function(a,b,c,d){var e,f,g,h;return null==d&&(d=!1),e=function(a,b,c){return null==c&&(c=!1),c?{isScope:a,value:b}:b},h=b[a],_.isFunction(h)?e(!0,h(),d):_.isObject(h)?e(!0,h,d):(f=h,g=f?"self"===f?c:c[f]:c[a],_.isFunction(g)?e(!1,g(),d):e(!1,g,d))},h.prototype.setChildScope=function(a,b,c){return _.each(a,function(a){return function(d){var e,f;return e=a.scopeOrModelVal(d,b,c,!0),e.isScope||(f=e.value,f===b[d])?void 0:b[d]=f}}(this)),b.model=c},h}(b)}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapModelsWatcher",["uiGmapLogger","uiGmap_async",function(a,b){return{figureOutState:function(c,d,e,f,g){var h,i,j,k;return h=[],i={},j=[],k=[],b.each(d.models,function(b){var d;return null==b[c]?a.error(" id missing for model #{m.toString()},\ncan not use do comparison/insertion"):(i[b[c]]={},null==e.get(b[c])?h.push(b):(d=e.get(b[c]),f(b,d.model)?void 0:k.push({model:b,child:d})))}).then(function(){return function(){return b.each(e.values(),function(b){var d;return null==b?void a.error("child undefined in ModelsWatcher."):null==b.model?void a.error("child.model undefined in ModelsWatcher."):(d=b.model[c],null==i[d]?j.push(b):void 0)})}}(this)).then(function(){return function(){return g({adds:h,removals:j,updates:k})}}(this))}}}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapPromise",["$q",function(a){return{defer:function(){return a.defer()},resolve:function(){var b;return b=a.defer(),b.resolve.apply(void 0,arguments),b.promise}}}])}.call(this),function(){var c,d=function(a,b){return function(){return a.apply(b,arguments)}};c=["get","put","remove","values","keys","length","push","didValueStateChange","didKeyStateChange","slice","removeAll","allVals","allKeys","stateChanged"],a.PropMap=function(){function a(){this.removeAll=d(this.removeAll,this),this.slice=d(this.slice,this),this.push=d(this.push,this),this.keys=d(this.keys,this),this.values=d(this.values,this),this.remove=d(this.remove,this),this.put=d(this.put,this),this.stateChanged=d(this.stateChanged,this),this.get=d(this.get,this),this.length=0,this.dict={},this.didValsStateChange=!1,this.didKeysStateChange=!1,this.allVals=[],this.allKeys=[]}return a.prototype.get=function(a){return this.dict[a]},a.prototype.stateChanged=function(){return this.didValsStateChange=!0,this.didKeysStateChange=!0},a.prototype.put=function(a,b){return null==this.get(a)&&this.length++,this.stateChanged(),this.dict[a]=b},a.prototype.remove=function(a,b){var c;return null==b&&(b=!1),b&&!this.get(a)?void 0:(c=this.dict[a],delete this.dict[a],this.length--,this.stateChanged(),c)},a.prototype.valuesOrKeys=function(a){var b,c;return null==a&&(a="Keys"),this["did"+a+"StateChange"]?(c=[],b=[],_.each(this.dict,function(a,d){return c.push(a),b.push(d)}),this.didKeysStateChange=!1,this.didValsStateChange=!1,this.allVals=c,this.allKeys=b,this["all"+a]):this["all"+a]},a.prototype.values=function(){return this.valuesOrKeys("Vals")},a.prototype.keys=function(){return this.valuesOrKeys()},a.prototype.push=function(a,b){return null==b&&(b="key"),this.put(a[b],a)},a.prototype.slice=function(){return this.keys().map(function(a){return function(b){return a.remove(b)}}(this))},a.prototype.removeAll=function(){return this.slice()},a.prototype.each=function(a){return _.each(this.dict,function(b){return a(b)})},a.prototype.map=function(a){return _.map(this.dict,function(b){return a(b)})},a}(),b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapPropMap",function(){return a.PropMap})}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapPropertyAction",["uiGmapLogger",function(){var a;return a=function(a){return this.setIfChange=function(b,c){var d;return d=this.exp,_.isEqual(c,b)?void 0:a(d,b)},this.sic=this.setIfChange,this}}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api.managers").factory("uiGmapClustererMarkerManager",["uiGmapLogger","uiGmapFitHelper","uiGmapPropMap",function(c,e,f){var g;return g=function(e){function g(b,d,e,h){var i;this.opt_events=h,this.checkSync=a(this.checkSync,this),this.getGMarkers=a(this.getGMarkers,this),this.fit=a(this.fit,this),this.destroy=a(this.destroy,this),this.clear=a(this.clear,this),this.draw=a(this.draw,this),this.removeMany=a(this.removeMany,this),this.remove=a(this.remove,this),this.addMany=a(this.addMany,this),this.update=a(this.update,this),this.add=a(this.add,this),g.__super__.constructor.call(this),this.type=g.type,i=this,this.opt_options=e,this.clusterer=null!=e&&void 0===d?new NgMapMarkerClusterer(b,void 0,e):null!=e&&null!=d?new NgMapMarkerClusterer(b,d,e):new NgMapMarkerClusterer(b),this.propMapGMarkers=new f,this.attachEvents(this.opt_events,"opt_events"),this.clusterer.setIgnoreHidden(!0),this.noDrawOnSingleAddRemoves=!0,c.info(this)}return d(g,e),g.type="ClustererMarkerManager",g.prototype.checkKey=function(a){var b;return null==a.key?(b="gMarker.key undefined and it is REQUIRED!!",Logger.error(b)):void 0},g.prototype.add=function(a){return this.checkKey(a),this.clusterer.addMarker(a,this.noDrawOnSingleAddRemoves),this.propMapGMarkers.put(a.key,a),this.checkSync()},g.prototype.update=function(a){return this.remove(a),this.add(a)},g.prototype.addMany=function(a){return a.forEach(function(a){return function(b){return a.add(b)}}(this))},g.prototype.remove=function(a){var b;return this.checkKey(a),b=this.propMapGMarkers.get(a.key),b&&(this.clusterer.removeMarker(a,this.noDrawOnSingleAddRemoves),this.propMapGMarkers.remove(a.key)),this.checkSync()},g.prototype.removeMany=function(a){return a.forEach(function(a){return function(b){return a.remove(b)}}(this))},g.prototype.draw=function(){return this.clusterer.repaint()},g.prototype.clear=function(){return this.removeMany(this.getGMarkers()),this.clusterer.repaint()},g.prototype.attachEvents=function(a,d){var e,f,g;if(b.isDefined(a)&&null!=a&&b.isObject(a)){g=[];for(f in a)e=a[f],a.hasOwnProperty(f)&&b.isFunction(a[f])?(c.info(""+d+": Attaching event: "+f+" to clusterer"),g.push(google.maps.event.addListener(this.clusterer,f,a[f]))):g.push(void 0);return g}},g.prototype.clearEvents=function(a){var d,e,f;if(b.isDefined(a)&&null!=a&&b.isObject(a)){f=[];for(e in a)d=a[e],a.hasOwnProperty(e)&&b.isFunction(a[e])?(c.info(""+optionsName+": Clearing event: "+e+" to clusterer"),f.push(google.maps.event.clearListeners(this.clusterer,e))):f.push(void 0);return f}},g.prototype.destroy=function(){return this.clearEvents(this.opt_events),this.clearEvents(this.opt_internal_events),this.clear()},g.prototype.fit=function(){return g.__super__.fit.call(this,this.getGMarkers(),this.clusterer.getMap())},g.prototype.getGMarkers=function(){return this.clusterer.getMarkers().values()},g.prototype.checkSync=function(){},g}(e)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api.managers").factory("uiGmapMarkerManager",["uiGmapLogger","uiGmapFitHelper","uiGmapPropMap",function(b,c,e){var f;return f=function(f){function g(c){this.getGMarkers=a(this.getGMarkers,this),this.fit=a(this.fit,this),this.handleOptDraw=a(this.handleOptDraw,this),this.clear=a(this.clear,this),this.draw=a(this.draw,this),this.removeMany=a(this.removeMany,this),this.remove=a(this.remove,this),this.addMany=a(this.addMany,this),this.update=a(this.update,this),this.add=a(this.add,this),g.__super__.constructor.call(this),this.type=g.type,this.gMap=c,this.gMarkers=new e,this.$log=b,this.$log.info(this)}return d(g,f),g.include(c),g.type="MarkerManager",g.prototype.add=function(a,c){var d,e;if(null==c&&(c=!0),null==a.key)throw e="gMarker.key undefined and it is REQUIRED!!",b.error(e),e;return d=this.gMarkers.get(a.key),d?void 0:(this.handleOptDraw(a,c,!0),this.gMarkers.put(a.key,a))},g.prototype.update=function(a,b){return null==b&&(b=!0),this.remove(a,b),this.add(a,b)},g.prototype.addMany=function(a){return a.forEach(function(a){return function(b){return a.add(b)}}(this))},g.prototype.remove=function(a,b){return null==b&&(b=!0),this.handleOptDraw(a,b,!1),this.gMarkers.get(a.key)?this.gMarkers.remove(a.key):void 0},g.prototype.removeMany=function(a){return a.forEach(function(a){return function(b){return a.remove(b)}}(this))},g.prototype.draw=function(){var a;return a=[],this.gMarkers.each(function(b){return function(c){return c.isDrawn?void 0:c.doAdd?(c.setMap(b.gMap),c.isDrawn=!0):a.push(c)}}(this)),a.forEach(function(a){return function(b){return b.isDrawn=!1,a.remove(b,!0)}}(this))},g.prototype.clear=function(){return this.gMarkers.each(function(a){return a.setMap(null)}),delete this.gMarkers,this.gMarkers=new e},g.prototype.handleOptDraw=function(a,b,c){return b===!0?(a.setMap(c?this.gMap:null),a.isDrawn=!0):(a.isDrawn=!1,a.doAdd=c)},g.prototype.fit=function(){return g.__super__.fit.call(this,this.getGMarkers(),this.gMap)},g.prototype.getGMarkers=function(){return this.gMarkers.values()},g}(c)}])}.call(this),function(){b.module("uiGmapgoogle-maps").factory("uiGmapadd-events",["$timeout",function(a){var c,d;return c=function(b,c,d){return google.maps.event.addListener(b,c,function(){return d.apply(this,arguments),a(function(){},!0)})},d=function(a,d,e){var f;return e?c(a,d,e):(f=[],b.forEach(d,function(b,d){return f.push(c(a,d,b))}),function(){return b.forEach(f,function(a){return google.maps.event.removeListener(a)}),f=null})}}])}.call(this),function(){b.module("uiGmapgoogle-maps").factory("uiGmaparray-sync",["uiGmapadd-events",function(a){return function(c,d,e,f){var g,h,i,j,k,l,m,n,o;return j=!1,n=d.$eval(e),d["static"]||(k={set_at:function(a){var b;if(!j&&(b=c.getAt(a)))return b.lng&&b.lat?(n[a].latitude=b.lat(),n[a].longitude=b.lng()):n[a]=b},insert_at:function(a){var b;if(!j&&(b=c.getAt(a)))return b.lng&&b.lat?n.splice(a,0,{latitude:b.lat(),longitude:b.lng()}):n.splice(a,0,b)},remove_at:function(a){return j?void 0:n.splice(a,1)}},"Polygon"===n.type?g=n.coordinates[0]:"LineString"===n.type&&(g=n.coordinates),h={set_at:function(a){var b;if(!j&&(b=c.getAt(a),b&&b.lng&&b.lat))return g[a][1]=b.lat(),g[a][0]=b.lng()},insert_at:function(a){var b;if(!j&&(b=c.getAt(a),b&&b.lng&&b.lat))return g.splice(a,0,[b.lng(),b.lat()])},remove_at:function(a){return j?void 0:g.splice(a,1)}},m=a(c,b.isUndefined(n.type)?k:h)),l=function(a){var b,d,e,g,h,i,k,l;if(j=!0,i=c,b=!1,a){for(d=0,k=i.getLength(),g=a.length,e=Math.min(k,g),h=void 0;e>d;)l=i.getAt(d),h=a[d],"function"==typeof h.equals?h.equals(l)||(i.setAt(d,h),b=!0):(l.lat()!==h.latitude||l.lng()!==h.longitude)&&(i.setAt(d,new google.maps.LatLng(h.latitude,h.longitude)),b=!0),d++;for(;g>d;)h=a[d],i.push("function"==typeof h.lat&&"function"==typeof h.lng?h:new google.maps.LatLng(h.latitude,h.longitude)),b=!0,d++;for(;k>d;)i.pop(),b=!0,d++}return j=!1,b?f(i):void 0},i=function(a){var b,d,e,g,h,i,k,l,m;if(j=!0,k=c,d=!1,a){for("Polygon"===n.type?b=a.coordinates[0]:"LineString"===n.type&&(b=a.coordinates),e=0,l=k.getLength(),h=b.length,g=Math.min(l,h),i=void 0;g>e;)m=k.getAt(e),i=b[e],(m.lat()!==i[1]||m.lng()!==i[0])&&(k.setAt(e,new google.maps.LatLng(i[1],i[0])),d=!0),e++;for(;h>e;)i=b[e],k.push(new google.maps.LatLng(i[1],i[0])),d=!0,e++;for(;l>e;)k.pop(),d=!0,e++}return j=!1,d?f(k):void 0},d["static"]||(o=b.isUndefined(n.type)?d.$watchCollection(e,l):d.$watch(e,i,!0)),function(){return m&&(m(),m=null),o?(o(),o=null):void 0}}}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapChromeFixes",[function(){return{maybeRepaint:function(a){var b;return a?(b=a.style.display,a.style.display="none",_.defer(function(){return a.style.display=b})):void 0}}}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api.options.builders").service("uiGmapCommonOptionsBuilder",["uiGmapBaseObject","uiGmapLogger","uiGmapModelKey",function(c,e,f){var g;return g=function(c){function f(){return this.watchProps=a(this.watchProps,this),this.buildOpts=a(this.buildOpts,this),f.__super__.constructor.apply(this,arguments)}return d(f,c),f.prototype.props=["clickable","draggable","editable","visible",{prop:"stroke",isColl:!0}],f.prototype.buildOpts=function(a,c){var d,f,g,h;return null==a&&(a={}),null==c&&(c={}),this.scope?this.map?(d=_(this.scope).chain().keys().contains("model").value(),f=d?this.scope.model:this.scope,h=this.scopeOrModelVal("stroke",this.scope,f),g=b.extend(a,this.DEFAULTS,{map:this.map,strokeColor:null!=h?h.color:void 0,strokeOpacity:null!=h?h.opacity:void 0,strokeWeight:null!=h?h.weight:void 0}),b.forEach(b.extend(c,{clickable:!0,draggable:!1,editable:!1,"static":!1,fit:!1,visible:!0,zIndex:0}),function(a){return function(c,d){var e;return e=a.scopeOrModelVal(d,a.scope,f),g[d]=b.isUndefined(e)?c:f[d]}}(this)),g["static"]&&(g.editable=!1),g):void e.error("this.map not defined in CommonOptionsBuilder can not buildOpts"):void e.error("this.scope not defined in CommonOptionsBuilder can not buildOpts")},f.prototype.watchProps=function(a){return null==a&&(a=this.props),a.forEach(function(a){return function(b){return null!=a.attrs[b]||null!=a.attrs[null!=b?b.prop:void 0]?(null!=b?b.isColl:void 0)?a.scope.$watchCollection(b.prop,a.setMyOptions):a.scope.$watch(b,a.setMyOptions):void 0}}(this))},f}(f)}])}.call(this),function(){var a={}.hasOwnProperty,c=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};b.module("uiGmapgoogle-maps.directives.api.options.builders").factory("uiGmapPolylineOptionsBuilder",["uiGmapCommonOptionsBuilder",function(a){var b;
return b=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return c(b,a),b.prototype.buildOpts=function(a){return b.__super__.buildOpts.call(this,{path:a},{geodesic:!1})},b}(a)}]).factory("uiGmapShapeOptionsBuilder",["uiGmapCommonOptionsBuilder",function(a){var d;return d=function(a){function d(){return d.__super__.constructor.apply(this,arguments)}return c(d,a),d.prototype.buildOpts=function(a,c){var e,f;return a=b.extend(a,{fillColor:null!=(e=this.scope.fill)?e.color:void 0,fillOpacity:null!=(f=this.scope.fill)?f.opacity:void 0}),d.__super__.buildOpts.call(this,a,c)},d}(a)}]).factory("uiGmapPolygonOptionsBuilder",["uiGmapShapeOptionsBuilder",function(a){var b;return b=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return c(b,a),b.prototype.buildOpts=function(a){return b.__super__.buildOpts.call(this,{path:a},{geodesic:!1})},b}(a)}]).factory("uiGmapRectangleOptionsBuilder",["uiGmapShapeOptionsBuilder",function(a){var b;return b=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return c(b,a),b.prototype.buildOpts=function(a){return b.__super__.buildOpts.call(this,{bounds:a})},b}(a)}]).factory("uiGmapCircleOptionsBuilder",["uiGmapShapeOptionsBuilder",function(a){var b;return b=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return c(b,a),b.prototype.buildOpts=function(a,c){return b.__super__.buildOpts.call(this,{center:a,radius:c})},b}(a)}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api.options").service("uiGmapMarkerOptions",["uiGmapLogger","uiGmapGmapUtil",function(a,c){return _.extend(c,{createOptions:function(a,d,e,f){var g;return null==e&&(e={}),g=b.extend({},e,{position:null!=e.position?e.position:c.getCoords(a),visible:null!=e.visible?e.visible:c.validateCoords(a)}),(null!=e.icon||null!=d)&&(g=b.extend(g,{icon:null!=e.icon?e.icon:d})),null!=f&&(g.map=f),g},isLabel:function(a){return null!=a.labelContent||null!=a.labelAnchor||null!=a.labelClass||null!=a.labelStyle||null!=a.labelVisible?!0:!1}})}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api.models.child").factory("uiGmapDrawFreeHandChildModel",["uiGmapLogger","$q",function(a,b){var c,d;return c=function(a,b,c){var d,e;return this.polys=b,e=new google.maps.Polyline({map:a,clickable:!1}),d=google.maps.event.addListener(a,"mousemove",function(a){return e.getPath().push(a.latLng)}),void google.maps.event.addListenerOnce(a,"mouseup",function(){var f;return google.maps.event.removeListener(d),f=e.getPath(),e.setMap(null),b.push(new google.maps.Polygon({map:a,path:f})),e=null,google.maps.event.clearListeners(a.getDiv(),"mousedown"),c()})},d=function(d,e){var f,g;return this.map=d,e||(e={draggable:!0,zoomControl:!0,scrollwheel:!0,disableDoubleClickZoom:!0}),g=function(a){return function(){var b;return null!=(b=a.deferred)&&b.resolve(),_.defer(function(){return a.map.setOptions(_.extend(a.oldOptions,e))})}}(this),f=function(b){return function(){return a.info("disabling map move"),b.oldOptions=d.getOptions(),b.oldOptions.center=d.getCenter(),b.map.setOptions({draggable:!1,zoomControl:!1,scrollwheel:!1,disableDoubleClickZoom:!1})}}(this),this.engage=function(d){return function(e){return d.polys=e,d.deferred=b.defer(),f(),a.info("DrawFreeHandChildModel is engaged (drawing)."),google.maps.event.addDomListener(d.map.getDiv(),"mousedown",function(){return c(d.map,d.polys,g)}),d.deferred.promise}}(this),this}}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api.models.child").factory("uiGmapMarkerChildModel",["uiGmapModelKey","uiGmapGmapUtil","uiGmapLogger","uiGmapEventsHelper","uiGmapPropertyAction","uiGmapMarkerOptions","uiGmapIMarker","uiGmapMarkerManager","uiGmapPromise",function(b,c,e,f,g,h,i,j,k){var l,m;return m=["coords","icon","options","fit"],l=function(b){function l(b,c,d,f,h,i,j,n,o,p){var q;this.model=c,this.keys=d,this.gMap=f,this.defaults=h,this.doClick=i,this.gMarkerManager=j,this.doDrawSelf=null!=n?n:!0,this.trackModel=null!=o?o:!0,this.needRedraw=null!=p?p:!1,this.internalEvents=a(this.internalEvents,this),this.setLabelOptions=a(this.setLabelOptions,this),this.setOptions=a(this.setOptions,this),this.setIcon=a(this.setIcon,this),this.setCoords=a(this.setCoords,this),this.isNotValid=a(this.isNotValid,this),this.maybeSetScopeValue=a(this.maybeSetScopeValue,this),this.createMarker=a(this.createMarker,this),this.setMyScope=a(this.setMyScope,this),this.updateModel=a(this.updateModel,this),this.handleModelChanges=a(this.handleModelChanges,this),this.destroy=a(this.destroy,this),this.deferred=k.defer(),_.each(this.keys,function(a){return function(b,c){return a[c+"Key"]=_.isFunction(a.keys[c])?a.keys[c]():a.keys[c]}}(this)),this.idKey=this.idKeyKey||"id",null!=this.model[this.idKey]&&(this.id=this.model[this.idKey]),l.__super__.constructor.call(this,b),this.scope.getGMarker=function(a){return function(){return a.gMarker}}(this),this.firstTime=!0,this.trackModel?(this.scope.model=this.model,this.scope.$watch("model",function(a){return function(b,c){return b!==c?a.handleModelChanges(b,c):void 0}}(this),!0)):(q=new g(function(a){return function(c){return a.firstTime?void 0:a.setMyScope(c,b)}}(this),!1),_.each(this.keys,function(a,c){return b.$watch(c,q.sic,!0)})),this.scope.$on("$destroy",function(a){return function(){return m(a)}}(this)),this.setMyScope("all",this.model,void 0,!0),this.createMarker(this.model),e.info(this)}var m;return d(l,b),l.include(c),l.include(f),l.include(h),m=function(a){return null!=(null!=a?a.gMarker:void 0)&&(a.removeEvents(a.externalListeners),a.removeEvents(a.internalListeners),null!=a?a.gMarker:void 0)?(a.removeFromManager&&a.gMarkerManager.remove(a.gMarker),a.gMarker.setMap(null),a.gMarker=null):void 0},l.prototype.destroy=function(a){return null==a&&(a=!0),this.removeFromManager=a,this.scope.$destroy()},l.prototype.handleModelChanges=function(a,b){var c,d,e;return c=this.getChanges(a,b,i.keys),this.firstTime?void 0:(d=0,e=_.keys(c).length,_.each(c,function(c){return function(f,g){var h;return d+=1,h=e===d,c.setMyScope(g,a,b,!1,!0,h),c.needRedraw=!0}}(this)))},l.prototype.updateModel=function(a){return this.handleModelChanges(a,this.model)},l.prototype.renderGMarker=function(a,b){if(null==a&&(a=!0),null!=this.getProp(this.coordsKey,this.model)){if(!this.validateCoords(this.getProp(this.coordsKey,this.model)))return void e.debug("MarkerChild does not have coords yet. They may be defined later.");if(null!=b&&b(),a&&this.gMarker)return this.gMarkerManager.add(this.gMarker)}else if(a&&this.gMarker)return this.gMarkerManager.remove(this.gMarker)},l.prototype.setMyScope=function(a,b,c,d,e){var f;switch(null==c&&(c=void 0),null==d&&(d=!1),null==e&&(e=!0),null==b?b=this.model:this.model=b,this.gMarker||(this.setOptions(this.scope,e),f=!0),a){case"all":return _.each(this.keys,function(a){return function(f,g){return a.setMyScope(g,b,c,d,e)}}(this));case"icon":return this.maybeSetScopeValue("icon",b,c,this.iconKey,this.evalModelHandle,d,this.setIcon,e);case"coords":return this.maybeSetScopeValue("coords",b,c,this.coordsKey,this.evalModelHandle,d,this.setCoords,e);case"options":if(!f)return this.createMarker(b,c,d,e)}},l.prototype.createMarker=function(a,b,c,d){return null==b&&(b=void 0),null==c&&(c=!1),null==d&&(d=!0),this.maybeSetScopeValue("options",a,b,this.optionsKey,this.evalModelHandle,c,this.setOptions,d),this.firstTime=!1},l.prototype.maybeSetScopeValue=function(a,b,c,d,e,f,g,h){var i,j,k;return null==g&&(g=void 0),null==h&&(h=!0),void 0===c?(k=e(b,d),k!==this.scope[a]&&(this.scope[a]=k),void(null!=g&&g(this.scope,h))):(j=e(c,d),i=e(b,d),i!==j&&(this.scope[a]=i,!f&&(null!=g&&g(this.scope,h),this.doDrawSelf&&h))?this.gMarkerManager.draw():void 0)},l.prototype.isNotValid=function(a,b){var c,d;return null==b&&(b=!0),d=b?void 0===this.gMarker:!1,c=this.trackModel?!1:a.$id!==this.scope.$id,c||d},l.prototype.setCoords=function(a,b){return null==b&&(b=!0),this.isNotValid(a)||null==this.gMarker?void 0:this.renderGMarker(b,function(a){return function(){return a.gMarker.setPosition(a.getCoords(a.getProp(a.coordsKey,a.model))),a.gMarker.setVisible(a.validateCoords(a.getProp(a.coordsKey,a.model)))}}(this))},l.prototype.setIcon=function(a,b){return null==b&&(b=!0),this.isNotValid(a)||null==this.gMarker?void 0:this.renderGMarker(b,function(a){return function(){return a.gMarker.setIcon(a.getProp(a.iconKey,a.model)),a.gMarker.setPosition(a.getCoords(a.getProp(a.coordsKey,a.model))),a.gMarker.setVisible(a.validateCoords(a.getProp(a.coordsKey,a.model)))}}(this))},l.prototype.setOptions=function(a,b){var c;return null==b&&(b=!0),this.isNotValid(a,!1)?void 0:(this.renderGMarker(b,function(a){return function(){var b,c,d;return b=a.getProp(a.coordsKey,a.model),c=a.getProp(a.iconKey,a.model),d=a.getProp(a.optionsKey,a.model),a.opts=a.createOptions(b,c,d),null!=a.gMarker&&a.isLabel(a.gMarker===a.isLabel(a.opts))?a.gMarker.setOptions(a.opts):a.firstTime||null!=a.gMarker&&(a.gMarkerManager.remove(a.gMarker),a.gMarker=null),a.gMarker||(a.gMarker=a.isLabel(a.opts)?new MarkerWithLabel(a.setLabelOptions(a.opts)):new google.maps.Marker(a.opts),_.extend(a.gMarker,{model:a.model})),a.externalListeners&&a.removeEvents(a.externalListeners),a.internalListeners&&a.removeEvents(a.internalListeners),a.externalListeners=a.setEvents(a.gMarker,a.scope,a.model,["dragend"]),a.internalListeners=a.setEvents(a.gMarker,{events:a.internalEvents(),$evalAsync:function(){}},a.model),null!=a.id?a.gMarker.key=a.id:void 0}}(this)),this.gMarker&&(this.gMarker.getMap()||this.gMarkerManager.type!==j.type)?this.deferred.resolve(this.gMarker):(this.gMarker||this.deferred.reject("gMarker is null"),(null!=(c=this.gMarker)?c.getMap():0)&&this.gMarkerManager.type===j.type||(e.warn("gMarker has no map yet"),this.deferred.resolve(this.gMarker))),this.model[this.fitKey]?this.gMarkerManager.fit():void 0)},l.prototype.setLabelOptions=function(a){return a.labelAnchor=this.getLabelPositionPoint(a.labelAnchor),a},l.prototype.internalEvents=function(){return{dragend:function(a){return function(b,c,d,e){var f,g,h;return g=a.trackModel?a.scope.model:a.model,h=a.setCoordsFromEvent(a.modelOrKey(g,a.coordsKey),a.gMarker.getPosition()),g=a.setVal(d,a.coordsKey,h),f=a.scope.events,null!=(null!=f?f.dragend:void 0)&&f.dragend(b,c,g,e),a.scope.$apply()}}(this),click:function(a){return function(b,c,d,e){var f;return f=_.isFunction(a.clickKey)?a.clickKey:a.getProp(a.clickKey,a.model),a.doClick&&null!=f?a.scope.$evalAsync(f(b,c,a.model,e)):void 0}}(this)}},l}(b)}])}.call(this),function(){var a={}.hasOwnProperty,c=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolygonChildModel",["uiGmapPolygonOptionsBuilder","uiGmapLogger","$timeout","uiGmaparray-sync","uiGmapGmapUtil","uiGmapEventsHelper",function(a,d,e,f,g,h){var i;return i=function(a){function e(a,c,e,g,i){var j,k,l;return this.scope=a,this.attrs=c,this.map=e,this.defaults=g,this.model=i,this.listeners=void 0,b.isUndefined(a.path)||null===a.path||!this.validatePath(a.path)?void d.error("polygon: no valid path attribute found"):(k=this.convertPathPoints(a.path),l=new google.maps.Polygon(this.buildOpts(k)),a.fit&&this.extendMapBounds(this.map,k),!a["static"]&&b.isDefined(a.editable)&&a.$watch("editable",function(a,b){return a!==b?l.setEditable(a):void 0}),b.isDefined(a.draggable)&&a.$watch("draggable",function(a,b){return a!==b?l.setDraggable(a):void 0}),b.isDefined(a.visible)&&a.$watch("visible",function(a,b){return a!==b?l.setVisible(a):void 0}),b.isDefined(a.geodesic)&&a.$watch("geodesic",function(a){return function(b,c){return b!==c?l.setOptions(a.buildOpts(l.getPath())):void 0}}(this)),b.isDefined(a.stroke)&&b.isDefined(a.stroke.opacity)&&a.$watch("stroke.opacity",function(a){return function(){return l.setOptions(a.buildOpts(l.getPath()))}}(this)),b.isDefined(a.stroke)&&b.isDefined(a.stroke.weight)&&a.$watch("stroke.weight",function(a){return function(b,c){return b!==c?l.setOptions(a.buildOpts(l.getPath())):void 0}}(this)),b.isDefined(a.stroke)&&b.isDefined(a.stroke.color)&&a.$watch("stroke.color",function(a){return function(b,c){return b!==c?l.setOptions(a.buildOpts(l.getPath())):void 0}}(this)),b.isDefined(a.fill)&&b.isDefined(a.fill.color)&&a.$watch("fill.color",function(a){return function(b,c){return b!==c?l.setOptions(a.buildOpts(l.getPath())):void 0}}(this)),b.isDefined(a.fill)&&b.isDefined(a.fill.opacity)&&a.$watch("fill.opacity",function(a){return function(b,c){return b!==c?l.setOptions(a.buildOpts(l.getPath())):void 0}}(this)),b.isDefined(a.zIndex)&&a.$watch("zIndex",function(a){return function(b,c){return b!==c?l.setOptions(a.buildOpts(l.getPath())):void 0}}(this)),b.isDefined(a.events)&&null!==a.events&&b.isObject(a.events)&&(this.listeners=h.setEvents(l,a,a)),j=f(l.getPath(),a,"path",function(b){return function(c){return a.fit?b.extendMapBounds(b.map,c):void 0}}(this)),void a.$on("$destroy",function(a){return function(){return l.setMap(null),a.removeEvents(a.listeners),j?(j(),j=null):void 0}}(this)))}return c(e,a),e.include(g),e.include(h),e}(a)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolylineChildModel",["uiGmapPolylineOptionsBuilder","uiGmapLogger","$timeout","uiGmaparray-sync","uiGmapGmapUtil","uiGmapEventsHelper",function(c,e,f,g,h,i){var j;return j=function(c){function f(c,d,f,h,i){var j;this.scope=c,this.attrs=d,this.map=f,this.defaults=h,this.model=i,this.clean=a(this.clean,this),j=function(a){return function(){var b;return b=a.convertPathPoints(a.scope.path),null!=a.polyline&&a.clean(),b.length>0&&(a.polyline=new google.maps.Polyline(a.buildOpts(b))),a.polyline?(a.scope.fit&&a.extendMapBounds(f,b),g(a.polyline.getPath(),a.scope,"path",function(b){return a.scope.fit?a.extendMapBounds(f,b):void 0}),a.listeners=a.model?a.setEvents(a.polyline,a.scope,a.model):a.setEvents(a.polyline,a.scope,a.scope)):void 0}}(this),j(),c.$watch("path",function(a){return function(b,c){return _.isEqual(b,c)&&a.polyline?void 0:j()}}(this)),!c["static"]&&b.isDefined(c.editable)&&c.$watch("editable",function(a){return function(b,c){var d;return b!==c&&null!=(d=a.polyline)?d.setEditable(b):void 0}}(this)),b.isDefined(c.draggable)&&c.$watch("draggable",function(a){return function(b,c){var d;return b!==c&&null!=(d=a.polyline)?d.setDraggable(b):void 0}}(this)),b.isDefined(c.visible)&&c.$watch("visible",function(a){return function(b,c){var d;return b!==c&&null!=(d=a.polyline)?d.setVisible(b):void 0}}(this)),b.isDefined(c.geodesic)&&c.$watch("geodesic",function(a){return function(b,c){var d;return b!==c&&null!=(d=a.polyline)?d.setOptions(a.buildOpts(a.polyline.getPath())):void 0}}(this)),b.isDefined(c.stroke)&&b.isDefined(c.stroke.weight)&&c.$watch("stroke.weight",function(a){return function(b,c){var d;return b!==c&&null!=(d=a.polyline)?d.setOptions(a.buildOpts(a.polyline.getPath())):void 0}}(this)),b.isDefined(c.stroke)&&b.isDefined(c.stroke.color)&&c.$watch("stroke.color",function(a){return function(b,c){var d;return b!==c&&null!=(d=a.polyline)?d.setOptions(a.buildOpts(a.polyline.getPath())):void 0}}(this)),b.isDefined(c.stroke)&&b.isDefined(c.stroke.opacity)&&c.$watch("stroke.opacity",function(a){return function(b,c){var d;return b!==c&&null!=(d=a.polyline)?d.setOptions(a.buildOpts(a.polyline.getPath())):void 0}}(this)),b.isDefined(c.icons)&&c.$watch("icons",function(a){return function(b,c){var d;return b!==c&&null!=(d=a.polyline)?d.setOptions(a.buildOpts(a.polyline.getPath())):void 0}}(this)),c.$on("$destroy",function(a){return function(){return a.clean(),a.scope=null}}(this)),e.info(this)}return d(f,c),f.include(h),f.include(i),f.prototype.clean=function(){var a,b;return this.removeEvents(this.listeners),null!=(b=this.polyline)&&b.setMap(null),this.polyline=null,a?(a(),a=null):void 0},f.prototype.destroy=function(){return this.scope.$destroy()},f}(c)}])}.call(this),function(){var c=function(a,b){return function(){return a.apply(b,arguments)}},d={}.hasOwnProperty,e=function(a,b){function c(){this.constructor=a}for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api.models.child").factory("uiGmapWindowChildModel",["uiGmapBaseObject","uiGmapGmapUtil","uiGmapLogger","$compile","$http","$templateCache","uiGmapChromeFixes","uiGmapEventsHelper",function(d,f,g,h,i,j,k,l){var m;return m=function(d){function m(a,b,d,e,f,h,i,j,k){this.model=a,this.scope=b,this.opts=d,this.isIconVisibleOnClick=e,this.mapCtrl=f,this.markerScope=h,this.element=i,this.needToManualDestroy=null!=j?j:!1,this.markerIsVisibleAfterWindowClose=null!=k?k:!0,this.destroy=c(this.destroy,this),this.remove=c(this.remove,this),this.getLatestPosition=c(this.getLatestPosition,this),this.hideWindow=c(this.hideWindow,this),this.showWindow=c(this.showWindow,this),this.handleClick=c(this.handleClick,this),this.watchOptions=c(this.watchOptions,this),this.watchCoords=c(this.watchCoords,this),this.createGWin=c(this.createGWin,this),this.watchElement=c(this.watchElement,this),this.watchAndDoShow=c(this.watchAndDoShow,this),this.doShow=c(this.doShow,this),this.getGmarker=function(){var a,b;return null!=(null!=(a=this.markerScope)?a.getGMarker:void 0)&&null!=(b=this.markerScope)?b.getGMarker():void 0},this.listeners=[],this.createGWin(),null!=this.getGmarker()&&this.getGmarker().setClickable(!0),this.watchElement(),this.watchOptions(),this.watchCoords(),this.watchAndDoShow(),this.scope.$on("$destroy",function(a){return function(){return a.destroy()}}(this)),g.info(this)}return e(m,d),m.include(f),m.include(l),m.prototype.doShow=function(){return this.scope.show?this.showWindow():this.hideWindow()},m.prototype.watchAndDoShow=function(){return null!=this.model.show&&(this.scope.show=this.model.show),this.scope.$watch("show",this.doShow,!0),this.doShow()},m.prototype.watchElement=function(){return this.scope.$watch(function(a){return function(){var b;if(a.element||a.html)return a.html!==a.element.html()&&a.gWin?(null!=(b=a.opts)&&(b.content=void 0),a.remove(),a.createGWin()):void 0}}(this))},m.prototype.createGWin=function(){var b,c,d,e;return null==this.gWin&&(b={},null!=this.opts&&(this.scope.coords&&(this.opts.position=this.getCoords(this.scope.coords)),b=this.opts),this.element&&(this.html=_.isObject(this.element)?this.element.html():this.element),c=this.scope.options?this.scope.options:b,this.opts=this.createWindowOptions(this.getGmarker(),this.markerScope||this.scope,this.html,c)),null==this.opts||this.gWin?void 0:(this.gWin=this.opts.boxClass&&a.InfoBox&&"function"==typeof a.InfoBox?new a.InfoBox(this.opts):new google.maps.InfoWindow(this.opts),this.handleClick(null!=(d=this.scope)&&null!=(e=d.options)?e.forceClick:void 0),this.doShow(),this.listeners.push(google.maps.event.addListener(this.gWin,"closeclick",function(a){return function(){return a.getGmarker()&&(a.getGmarker().setAnimation(a.oldMarkerAnimation),a.markerIsVisibleAfterWindowClose&&_.delay(function(){return a.getGmarker().setVisible(!1),a.getGmarker().setVisible(a.markerIsVisibleAfterWindowClose)},250)),a.gWin.isOpen(!1),a.model.show=!1,null!=a.scope.closeClick?a.scope.$apply(a.scope.closeClick()):a.scope.$apply()}}(this))))},m.prototype.watchCoords=function(){var a;return a=null!=this.markerScope?this.markerScope:this.scope,a.$watch("coords",function(a){return function(b,c){var d;if(b!==c){if(null==b)a.hideWindow();else if(!a.validateCoords(b))return void g.error("WindowChildMarker cannot render marker as scope.coords as no position on marker: "+JSON.stringify(a.model));if(d=a.getCoords(b),a.gWin.setPosition(d),a.opts)return a.opts.position=d}}}(this),!0)},m.prototype.watchOptions=function(){return this.scope.$watch("options",function(a){return function(b,c){if(b!==c&&(a.opts=b,null!=a.gWin)){if(a.gWin.setOptions(a.opts),null!=a.opts.visible&&a.opts.visible)return a.showWindow();if(null!=a.opts.visible)return a.hideWindow()}}}(this),!0)},m.prototype.handleClick=function(a){var b,c;if(null!=this.gWin)return b=function(a){return function(){var b,c,d;return null==a.gWin&&a.createGWin(),(b=null!=a.scope.coords?null!=(c=a.gWin)?c.getPosition():void 0:null!=(d=a.getGmarker())?d.getPosition():void 0)?(null!=a.gWin&&(a.gWin.setPosition(b),a.opts&&(a.opts.position=b),a.showWindow()),null!=a.getGmarker()?(a.initialMarkerVisibility=a.getGmarker().getVisible(),a.oldMarkerAnimation=a.getGmarker().getAnimation(),a.getGmarker().setVisible(a.isIconVisibleOnClick)):void 0):void 0}}(this),a&&b(),c=this.getGmarker(),c?this.listeners=this.listeners.concat(this.setEvents(c,{events:{click:b}},this.model)):void 0},m.prototype.showWindow=function(){var a,c,d;return null!=this.gWin?(c=function(a){return function(){return _.defer(function(){return a.gWin.isOpen()?void 0:(a.gWin.open(a.mapCtrl,a.getGmarker()?a.getGmarker():void 0),a.model.show=a.gWin.isOpen(),_.defer(function(){return k.maybeRepaint(a.gWin.content)}))})}}(this),this.scope.templateUrl?i.get(this.scope.templateUrl,{cache:j}).then(function(a){return function(d){var e,f;return f=a.scope.$new(),b.isDefined(a.scope.templateParameter)&&(f.parameter=a.scope.templateParameter),e=h(d.data)(f),a.gWin.setContent(e[0]),c()}}(this)):this.scope.template?(d=this.scope.$new(),b.isDefined(this.scope.templateParameter)&&(d.parameter=this.scope.templateParameter),a=h(this.scope.template)(d),this.gWin.setContent(a[0]),c()):c()):void 0},m.prototype.hideWindow=function(){return null!=this.gWin&&this.gWin.isOpen()?this.gWin.close():void 0},m.prototype.getLatestPosition=function(a){return null==this.gWin||null==this.getGmarker()||a?a?this.gWin.setPosition(a):void 0:this.gWin.setPosition(this.getGmarker().getPosition())},m.prototype.remove=function(){return this.hideWindow(),this.removeEvents(this.listeners),this.listeners.length=0,delete this.gWin,delete this.opts},m.prototype.destroy=function(a){var b;return null==a&&(a=!1),this.remove(),null==this.scope||(null!=(b=this.scope)?b.$$destroyed:void 0)||!this.needToManualDestroy&&!a?void 0:this.scope.$destroy()},m}(d)}])}.call(this),function(){var a={}.hasOwnProperty,c=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapCircleParentModel",["uiGmapLogger","$timeout","uiGmapGmapUtil","uiGmapEventsHelper","uiGmapCircleOptionsBuilder",function(a,d,e,f,g){var h;return h=function(d){function g(c,d,f,g,h){var i,j;this.scope=c,this.attrs=f,this.map=g,this.DEFAULTS=h,i=new google.maps.Circle(this.buildOpts(e.getCoords(c.center),c.radius)),this.setMyOptions=function(a){return function(b,d){return _.isEqual(b,d)?void 0:i.setOptions(a.buildOpts(e.getCoords(c.center),c.radius))}}(this),this.props=this.props.concat([{prop:"center",isColl:!0},{prop:"fill",isColl:!0},"radius"]),this.watchProps(),j=this.setEvents(i,c,c),google.maps.event.addListener(i,"radius_changed",function(){return c.$evalAsync(function(){return c.radius=i.getRadius()})}),google.maps.event.addListener(i,"center_changed",function(){return c.$evalAsync(function(){return b.isDefined(c.center.type)?(c.center.coordinates[1]=i.getCenter().lat(),c.center.coordinates[0]=i.getCenter().lng()):(c.center.latitude=i.getCenter().lat(),c.center.longitude=i.getCenter().lng())})}),c.$on("$destroy",function(a){return function(){return a.removeEvents(j),i.setMap(null)}}(this)),a.info(this)}return c(g,d),g.include(e),g.include(f),g}(g)}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapDrawingManagerParentModel",["uiGmapLogger","$timeout",function(){var a;return a=function(){function a(a,b,c,d){var e;this.scope=a,this.attrs=c,this.map=d,e=new google.maps.drawing.DrawingManager(this.scope.options),e.setMap(this.map),null!=this.scope.control&&(this.scope.control.getDrawingManager=function(){return e}),!this.scope["static"]&&this.scope.options&&this.scope.$watch("options",function(a){return null!=e?e.setOptions(a):void 0},!0),a.$on("$destroy",function(){return e.setMap(null),e=null})}return a}()}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapIMarkerParentModel",["uiGmapModelKey","uiGmapLogger",function(c,e){var f;return f=function(c){function f(c,d,g,h){if(this.scope=c,this.element=d,this.attrs=g,this.map=h,this.onDestroy=a(this.onDestroy,this),this.onWatch=a(this.onWatch,this),this.watch=a(this.watch,this),this.validateScope=a(this.validateScope,this),f.__super__.constructor.call(this,this.scope),this.$log=e,!this.validateScope(c))throw new String("Unable to construct IMarkerParentModel due to invalid scope");this.doClick=b.isDefined(g.click),null!=c.options&&(this.DEFAULTS=c.options),this.watch("coords",this.scope),this.watch("icon",this.scope),this.watch("options",this.scope),c.$on("$destroy",function(a){return function(){return a.onDestroy(c)}}(this))}return d(f,c),f.prototype.DEFAULTS={},f.prototype.validateScope=function(a){var b;return null==a?(this.$log.error(this.constructor.name+": invalid scope used"),!1):(b=null!=a.coords,b?b:(this.$log.error(this.constructor.name+": no valid coords attribute found"),!1))},f.prototype.watch=function(a,b,c){return null==c&&(c=!0),b.$watch(a,function(c){return function(d,e){return _.isEqual(d,e)?void 0:c.onWatch(a,b,d,e)}}(this),c)},f.prototype.onWatch=function(){},f.prototype.onDestroy=function(){throw new String("OnDestroy Not Implemented!!")},f}(c)}])}.call(this),function(){var a={}.hasOwnProperty,c=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapIWindowParentModel",["uiGmapModelKey","uiGmapGmapUtil","uiGmapLogger",function(a,b,d){var e;return e=function(a){function e(a,b,c,f,g,h,i,j){e.__super__.constructor.call(this,a),this.$log=d,this.$timeout=g,this.$compile=h,this.$http=i,this.$templateCache=j,this.DEFAULTS={},null!=a.options&&(this.DEFAULTS=a.options)}return c(e,a),e.include(b),e}(a)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapLayerParentModel",["uiGmapBaseObject","uiGmapLogger","$timeout",function(c,e){var f;return f=function(c){function f(c,d,f,g,h,i){return this.scope=c,this.element=d,this.attrs=f,this.gMap=g,this.onLayerCreated=null!=h?h:void 0,this.$log=null!=i?i:e,this.createGoogleLayer=a(this.createGoogleLayer,this),null==this.attrs.type?void this.$log.info("type attribute for the layer directive is mandatory. Layer creation aborted!!"):(this.createGoogleLayer(),this.doShow=!0,b.isDefined(this.attrs.show)&&(this.doShow=this.scope.show),this.doShow&&null!=this.gMap&&this.layer.setMap(this.gMap),this.scope.$watch("show",function(a){return function(b,c){return b!==c?(a.doShow=b,a.layer.setMap(b?a.gMap:null)):void 0}}(this),!0),this.scope.$watch("options",function(a){return function(b,c){return b!==c?(a.layer.setMap(null),a.layer=null,a.createGoogleLayer()):void 0}}(this),!0),void this.scope.$on("$destroy",function(a){return function(){return a.layer.setMap(null)}}(this)))}return d(f,c),f.prototype.createGoogleLayer=function(){var a;return this.layer=null==this.attrs.options?void 0===this.attrs.namespace?new google.maps[this.attrs.type]:new google.maps[this.attrs.namespace][this.attrs.type]:void 0===this.attrs.namespace?new google.maps[this.attrs.type](this.scope.options):new google.maps[this.attrs.namespace][this.attrs.type](this.scope.options),null!=this.layer&&null!=this.onLayerCreated&&"function"==typeof(a=this.onLayerCreated(this.scope,this.layer))?a(this.layer):void 0},f}(c)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapMapTypeParentModel",["uiGmapBaseObject","uiGmapLogger",function(c,e){var f;return f=function(c){function f(c,d,f,g,h){return this.scope=c,this.element=d,this.attrs=f,this.gMap=g,this.$log=null!=h?h:e,this.hideOverlay=a(this.hideOverlay,this),this.showOverlay=a(this.showOverlay,this),this.refreshMapType=a(this.refreshMapType,this),this.createMapType=a(this.createMapType,this),null==this.attrs.options?void this.$log.info("options attribute for the map-type directive is mandatory. Map type creation aborted!!"):(this.id=this.gMap.overlayMapTypesCount=this.gMap.overlayMapTypesCount+1||0,this.doShow=!0,this.createMapType(),b.isDefined(this.attrs.show)&&(this.doShow=this.scope.show),this.doShow&&null!=this.gMap&&this.showOverlay(),this.scope.$watch("show",function(a){return function(b,c){return b!==c?(a.doShow=b,b?a.showOverlay():a.hideOverlay()):void 0}}(this),!0),this.scope.$watch("options",function(a){return function(b,c){return _.isEqual(b,c)?void 0:a.refreshMapType()}}(this),!0),b.isDefined(this.attrs.refresh)&&this.scope.$watch("refresh",function(a){return function(b,c){return _.isEqual(b,c)?void 0:a.refreshMapType()}}(this),!0),void this.scope.$on("$destroy",function(a){return function(){return a.hideOverlay(),a.mapType=null}}(this)))}return d(f,c),f.prototype.createMapType=function(){if(null!=this.scope.options.getTile)this.mapType=this.scope.options;else{if(null==this.scope.options.getTileUrl)return void this.$log.info("options should provide either getTile or getTileUrl methods. Map type creation aborted!!");this.mapType=new google.maps.ImageMapType(this.scope.options)}return this.attrs.id&&this.scope.id&&(this.gMap.mapTypes.set(this.scope.id,this.mapType),b.isDefined(this.attrs.show)||(this.doShow=!1)),this.mapType.layerId=this.id},f.prototype.refreshMapType=function(){return this.hideOverlay(),this.mapType=null,this.createMapType(),this.doShow&&null!=this.gMap?this.showOverlay():void 0},f.prototype.showOverlay=function(){return this.gMap.overlayMapTypes.push(this.mapType)},f.prototype.hideOverlay=function(){var a;return a=!1,this.gMap.overlayMapTypes.forEach(function(b){return function(c,d){a||c.layerId!==b.id||(a=!0,b.gMap.overlayMapTypes.removeAt(d))}}(this))},f}(c)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapMarkersParentModel",["uiGmapIMarkerParentModel","uiGmapModelsWatcher","uiGmapPropMap","uiGmapMarkerChildModel","uiGmap_async","uiGmapClustererMarkerManager","uiGmapMarkerManager","$timeout","uiGmapIMarker","uiGmapPromise","uiGmapGmapUtil",function(c,e,f,g,h,i,j,k,l,m,n){var o;
return o=function(c){function k(b,c,d,e){this.onDestroy=a(this.onDestroy,this),this.newChildMarker=a(this.newChildMarker,this),this.updateChild=a(this.updateChild,this),this.pieceMeal=a(this.pieceMeal,this),this.reBuildMarkers=a(this.reBuildMarkers,this),this.createMarkersFromScratch=a(this.createMarkersFromScratch,this),this.validateScope=a(this.validateScope,this),this.onWatch=a(this.onWatch,this);var g;k.__super__.constructor.call(this,b,c,d,e),g=this,this.scope.markerModels=new f,this.$log.info(this),this.doRebuildAll=null!=this.scope.doRebuildAll?this.scope.doRebuildAll:!1,this.setIdKey(b),this.scope.$watch("doRebuildAll",function(a){return function(b,c){return b!==c?a.doRebuildAll=b:void 0}}(this)),(null==b.models||0===b.models.length)&&(this.modelsRendered=!1),this.scope.$watch("models",function(a){return function(c,d){if(!_.isEqual(c,d)||!a.modelsRendered){if(0===c.length&&0===d.length)return;return a.modelsRendered=!0,a.onWatch("models",b,c,d)}}}(this),!this.isTrue(d.modelsbyref)),this.watch("doCluster",b),this.watch("clusterOptions",b),this.watch("clusterEvents",b),this.watch("fit",b),this.watch("idKey",b),this.gMarkerManager=void 0,this.createMarkersFromScratch(b)}return d(k,c),k.include(n),k.include(e),k.prototype.onWatch=function(a,b,c,d){return"idKey"===a&&c!==d&&(this.idKey=c),this.doRebuildAll?this.reBuildMarkers(b):this.pieceMeal(b)},k.prototype.validateScope=function(a){var c;return c=b.isUndefined(a.models)||void 0===a.models,c&&this.$log.error(this.constructor.name+": no valid models attribute found"),k.__super__.validateScope.call(this,a)||c},k.prototype.createMarkersFromScratch=function(a){return a.doCluster?(a.clusterEvents&&(this.clusterInternalOptions=_.once(function(b){return function(){var c,d,e,f;return c=b,b.origClusterEvents?void 0:(b.origClusterEvents={click:null!=(d=a.clusterEvents)?d.click:void 0,mouseout:null!=(e=a.clusterEvents)?e.mouseout:void 0,mouseover:null!=(f=a.clusterEvents)?f.mouseover:void 0},_.extend(a.clusterEvents,{click:function(a){return c.maybeExecMappedEvent(a,"click")},mouseout:function(a){return c.maybeExecMappedEvent(a,"mouseout")},mouseover:function(a){return c.maybeExecMappedEvent(a,"mouseover")}}))}}(this))()),a.clusterOptions||a.clusterEvents?void 0===this.gMarkerManager?this.gMarkerManager=new i(this.map,void 0,a.clusterOptions,this.clusterInternalOptions):this.gMarkerManager.opt_options!==a.clusterOptions&&(this.gMarkerManager=new i(this.map,void 0,a.clusterOptions,this.clusterInternalOptions)):this.gMarkerManager=new i(this.map)):this.gMarkerManager=new j(this.map),this.cleanOnResolve(h.waitOrGo(this,function(b){return function(){return h.each(a.models,function(c){return b.newChildMarker(c,a)},!1).then(function(){return b.gMarkerManager.draw(),a.fit?b.gMarkerManager.fit():void 0})}}(this)))},k.prototype.reBuildMarkers=function(a){var b;if(a.doRebuild||void 0===a.doRebuild)return(null!=(b=this.scope.markerModels)?b.length:void 0)?this.onDestroy(a).then(function(b){return function(){return b.createMarkersFromScratch(a)}}(this)):this.createMarkersFromScratch(a)},k.prototype.pieceMeal=function(a){var b;if(!a.$$destroyed&&!this.isClearing&&!this.updateInProgress())return b=h.defaultChunkSize,null!=this.scope.models&&this.scope.models.length>0&&this.scope.markerModels.length>0?this.figureOutState(this.idKey,a,this.scope.markerModels,this.modelKeyComparison,function(c){return function(d){var e;return e=d,c.cleanOnResolve(h.waitOrGo(c,function(){return h.each(e.removals,function(a){return null!=a?(null!=a.destroy&&a.destroy(),c.scope.markerModels.remove(a.id)):void 0},b).then(function(){return h.each(e.adds,function(b){return c.newChildMarker(b,a)},b)}).then(function(){return h.each(e.updates,function(a){return c.updateChild(a.child,a.model)},b)}).then(function(){return(e.adds.length>0||e.removals.length>0||e.updates.length>0)&&(c.gMarkerManager.draw(),a.markerModels=c.scope.markerModels,a.fit)?c.gMarkerManager.fit():void 0})}))}}(this)):(this.inProgress=!1,this.reBuildMarkers(a))},k.prototype.updateChild=function(a,b){return null==b[this.idKey]?void this.$log.error("Marker model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key."):a.updateModel(b)},k.prototype.newChildMarker=function(a,b){var c,d,e,f;return null==a[this.idKey]?void this.$log.error("Marker model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key."):(this.$log.info("child",c,"markers",this.scope.markerModels),d=b.$new(!0),d.events=b.events,f={},_.each(l.scopeKeys,function(a,c){return f[c]=b[c]}),c=new g(d,a,f,this.map,this.DEFAULTS,this.doClick,this.gMarkerManager,e=!1),this.scope.markerModels.put(a[this.idKey],c),c)},k.prototype.onDestroy=function(){return this.destroyPromise().then(function(a){return function(){return a.cleanOnResolve(h.waitOrGo(a,function(){return a.scope.markerModels.each(function(a){return null!=a?a.destroy(!1):void 0}),delete a.scope.markerModels,null!=a.gMarkerManager&&a.gMarkerManager.clear(),a.scope.markerModels=new f,m.resolve().then(function(){return a.isClearing=!1})}))}}(this))},k.prototype.maybeExecMappedEvent=function(a,b){var c,d;return _.isFunction(null!=(d=this.scope.clusterEvents)?d[b]:void 0)&&(c=this.mapClusterToMarkerModels(a),this.origClusterEvents[b])?this.origClusterEvents[b](c.cluster,c.mapped):void 0},k.prototype.mapClusterToMarkerModels=function(a){var b;return b=a.getMarkers().map(function(a){return function(b){return a.scope.markerModels.get(b.key).model}}(this)),{cluster:a,mapped:b}},k}(c)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapPolygonsParentModel",["$timeout","uiGmapLogger","uiGmapModelKey","uiGmapModelsWatcher","uiGmapPropMap","uiGmapPolygonChildModel","uiGmap_async","uiGmapPromise",function(c,e,f,g,h,i,j,k){var l;return l=function(c){function f(b,c,d,g,i){var j;this.scope=b,this.element=c,this.attrs=d,this.gMap=g,this.defaults=i,this.modelKeyComparison=a(this.modelKeyComparison,this),this.createChild=a(this.createChild,this),this.pieceMeal=a(this.pieceMeal,this),this.createAllNew=a(this.createAllNew,this),this.watchIdKey=a(this.watchIdKey,this),this.createChildScopes=a(this.createChildScopes,this),this.watchOurScope=a(this.watchOurScope,this),this.watchDestroy=a(this.watchDestroy,this),this.onDestroy=a(this.onDestroy,this),this.rebuildAll=a(this.rebuildAll,this),this.doINeedToWipe=a(this.doINeedToWipe,this),this.watchModels=a(this.watchModels,this),this.watch=a(this.watch,this),f.__super__.constructor.call(this,b),j=this,this.$log=e,this.plurals=new h,this.scopePropNames=["path","stroke","clickable","draggable","editable","geodesic","icons","visible"],_.each(this.scopePropNames,function(a){return function(b){return a[b+"Key"]=void 0}}(this)),this.models=void 0,this.firstTime=!0,this.$log.info(this),this.watchOurScope(b),this.createChildScopes()}return d(f,c),f.include(g),f.prototype.watch=function(a,b,c){return a.$watch(b,function(a){return function(d,e){return d!==e?(a[c]="function"==typeof d?d():d,a.cleanOnResolve(j.waitOrGo(a,function(){return j.each(a.plurals.values(),function(d){return d.scope[b]="self"===a[c]?d:d[a[c]]})}))):void 0}}(this))},f.prototype.watchModels=function(a){return a.$watch("models",function(b){return function(c,d){return _.isEqual(c,d)?void 0:b.doINeedToWipe(c)?b.rebuildAll(a,!0,!0):b.createChildScopes(!1)}}(this),!0)},f.prototype.doINeedToWipe=function(a){var b;return b=null!=a?0===a.length:!0,this.plurals.length>0&&b},f.prototype.rebuildAll=function(a,b,c){return this.onDestroy(c).then(function(a){return function(){return b?a.createChildScopes():void 0}}(this))},f.prototype.onDestroy=function(a){return this.destroyPromise().then(function(b){return function(){return b.cleanOnResolve(j.waitOrGo(b,function(){return b.plurals.each(function(a){return a.destroy()}),k.resolve()})).then(function(){return a&&delete b.plurals,b.plurals=new h,b.isClearing=!1})}}(this))},f.prototype.watchDestroy=function(a){return a.$on("$destroy",function(b){return function(){return b.rebuildAll(a,!1,!0)}}(this))},f.prototype.watchOurScope=function(a){return _.each(this.scopePropNames,function(b){return function(c){var d;return d=c+"Key",b[d]="function"==typeof a[c]?a[c]():a[c],b.watch(a,c,d)}}(this))},f.prototype.createChildScopes=function(a){return null==a&&(a=!0),b.isUndefined(this.scope.models)?void this.$log.error("No models to create Polygons from! I Need direct models!"):null!=this.gMap&&null!=this.scope.models?(this.watchIdKey(this.scope),a?this.createAllNew(this.scope,!1):this.pieceMeal(this.scope,!1)):void 0},f.prototype.watchIdKey=function(a){return this.setIdKey(a),a.$watch("idKey",function(b){return function(c,d){return c!==d&&null==c?(b.idKey=c,b.rebuildAll(a,!0,!0)):void 0}}(this))},f.prototype.createAllNew=function(a,b){return null==b&&(b=!1),this.models=a.models,this.firstTime&&(this.watchModels(a),this.watchDestroy(a)),this.cleanOnResolve(j.waitOrGo(this,function(b){return function(){return j.each(a.models,function(a){return b.createChild(a,b.gMap)})}}(this))).then(function(a){return function(){return a.firstTime=!1}}(this))},f.prototype.pieceMeal=function(a,b){return null==b&&(b=!0),a.$$destroyed||this.isClearing||this.updateInProgress()&&this.plurals.length>0?void 0:(this.models=a.models,null!=a&&null!=a.models&&a.models.length>0&&this.plurals.length>0?this.figureOutState(this.idKey,a,this.plurals,this.modelKeyComparison,function(a){return function(b){var c;return c=b,a.cleanOnResolve(j.waitOrGo(a,function(){return j.each(c.removals,function(b){var c;return c=a.plurals.get(b),null!=c?(c.destroy(),a.plurals.remove(b)):void 0},!1).then(function(){return j.each(c.adds,function(b){return a.createChild(b,a.gMap)},!1)})}))}}(this)):(this.inProgress=!1,this.rebuildAll(this.scope,!0,!0)))},f.prototype.createChild=function(a,b){var c,d;return d=this.scope.$new(!1),this.setChildScope(this.scopePropNames,d,a),d.$watch("model",function(a){return function(b,c){return b!==c?a.setChildScope(d,b):void 0}}(this),!0),d["static"]=this.scope["static"],c=new i(d,this.attrs,b,this.defaults,a),null==a[this.idKey]?void this.$log.error("Polygon model has no id to assign a child to.\nThis is required for performance. Please assign id,\nor redirect id to a different key."):(this.plurals.put(a[this.idKey],c),c)},f.prototype.modelKeyComparison=function(a,b){return _.isEqual(this.evalModelHandle(a,this.scope.path),this.evalModelHandle(b,this.scope.path))},f}(f)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapPolylinesParentModel",["$timeout","uiGmapLogger","uiGmapModelKey","uiGmapModelsWatcher","uiGmapPropMap","uiGmapPolylineChildModel","uiGmap_async","uiGmapPromise",function(c,e,f,g,h,i,j,k){var l;return l=function(c){function f(b,c,d,g,i){var j;this.scope=b,this.element=c,this.attrs=d,this.gMap=g,this.defaults=i,this.modelKeyComparison=a(this.modelKeyComparison,this),this.setChildScope=a(this.setChildScope,this),this.createChild=a(this.createChild,this),this.pieceMeal=a(this.pieceMeal,this),this.createAllNew=a(this.createAllNew,this),this.watchIdKey=a(this.watchIdKey,this),this.createChildScopes=a(this.createChildScopes,this),this.watchOurScope=a(this.watchOurScope,this),this.watchDestroy=a(this.watchDestroy,this),this.onDestroy=a(this.onDestroy,this),this.rebuildAll=a(this.rebuildAll,this),this.doINeedToWipe=a(this.doINeedToWipe,this),this.watchModels=a(this.watchModels,this),this.watch=a(this.watch,this),f.__super__.constructor.call(this,b),j=this,this.$log=e,this.plurals=new h,this.scopePropNames=["path","stroke","clickable","draggable","editable","geodesic","icons","visible"],_.each(this.scopePropNames,function(a){return function(b){return a[b+"Key"]=void 0}}(this)),this.models=void 0,this.firstTime=!0,this.$log.info(this),this.watchOurScope(b),this.createChildScopes()}return d(f,c),f.include(g),f.prototype.watch=function(a,b,c){return a.$watch(b,function(a){return function(d,e){return d!==e?(a[c]="function"==typeof d?d():d,a.cleanOnResolve(j.waitOrGo(a,function(){return j.each(a.plurals.values(),function(d){return d.scope[b]="self"===a[c]?d:d[a[c]]})}))):void 0}}(this))},f.prototype.watchModels=function(a){return a.$watch("models",function(b){return function(c,d){return _.isEqual(c,d)?void 0:b.doINeedToWipe(c)?b.rebuildAll(a,!0,!0):b.createChildScopes(!1)}}(this),!0)},f.prototype.doINeedToWipe=function(a){var b;return b=null!=a?0===a.length:!0,this.plurals.length>0&&b},f.prototype.rebuildAll=function(a,b,c){return this.onDestroy(c).then(function(a){return function(){return b?a.createChildScopes():void 0}}(this))},f.prototype.onDestroy=function(a){return this.destroyPromise().then(function(b){return function(){return b.cleanOnResolve(j.waitOrGo(b,function(){return b.plurals.each(function(a){return a.destroy()}),k.resolve()})).then(function(){return a&&delete b.plurals,b.plurals=new h,b.isClearing=!1})}}(this))},f.prototype.watchDestroy=function(a){return a.$on("$destroy",function(b){return function(){return b.rebuildAll(a,!1,!0)}}(this))},f.prototype.watchOurScope=function(a){return _.each(this.scopePropNames,function(b){return function(c){var d;return d=c+"Key",b[d]="function"==typeof a[c]?a[c]():a[c],b.watch(a,c,d)}}(this))},f.prototype.createChildScopes=function(a){return null==a&&(a=!0),b.isUndefined(this.scope.models)?void this.$log.error("No models to create polylines from! I Need direct models!"):null!=this.gMap&&null!=this.scope.models?(this.watchIdKey(this.scope),a?this.createAllNew(this.scope,!1):this.pieceMeal(this.scope,!1)):void 0},f.prototype.watchIdKey=function(a){return this.setIdKey(a),a.$watch("idKey",function(b){return function(c,d){return c!==d&&null==c?(b.idKey=c,b.rebuildAll(a,!0,!0)):void 0}}(this))},f.prototype.createAllNew=function(a,b){return null==b&&(b=!1),this.models=a.models,this.firstTime&&(this.watchModels(a),this.watchDestroy(a)),this.cleanOnResolve(j.waitOrGo(this,function(b){return function(){return j.each(a.models,function(a){return b.createChild(a,b.gMap)})}}(this))).then(function(a){return function(){return a.firstTime=!1}}(this))},f.prototype.pieceMeal=function(a,b){return null==b&&(b=!0),a.$$destroyed||this.isClearing||this.updateInProgress()&&this.plurals.length>0?void 0:(this.models=a.models,null!=a&&null!=a.models&&a.models.length>0&&this.plurals.length>0?this.figureOutState(this.idKey,a,this.plurals,this.modelKeyComparison,function(a){return function(b){var c;return c=b,a.cleanOnResolve(j.waitOrGo(a,function(){return j.each(c.removals,function(b){var c;return c=a.plurals.get(b),null!=c?(c.destroy(),a.plurals.remove(b)):void 0}).then(function(){return j.each(c.adds,function(b){return a.createChild(b,a.gMap)})})}))}}(this)):(this.inProgress=!1,this.rebuildAll(this.scope,!0,!0)))},f.prototype.createChild=function(a,b){var c,d;return d=this.scope.$new(!1),this.setChildScope(d,a),d.$watch("model",function(a){return function(b,c){return b!==c?a.setChildScope(d,b):void 0}}(this),!0),d["static"]=this.scope["static"],c=new i(d,this.attrs,b,this.defaults,a),null==a[this.idKey]?void this.$log.error("Polyline model has no id to assign a child to.\nThis is required for performance. Please assign id,\nor redirect id to a different key."):(this.plurals.put(a[this.idKey],c),c)},f.prototype.setChildScope=function(a,b){return _.each(this.scopePropNames,function(c){return function(d){var e,f;return e=d+"Key",f="self"===c[e]?b:b[c[e]],f!==a[d]?a[d]=f:void 0}}(this)),a.model=b},f.prototype.modelKeyComparison=function(a,b){return _.isEqual(this.evalModelHandle(a,this.scope.path),this.evalModelHandle(b,this.scope.path))},f}(f)}])}.call(this),function(){var a={}.hasOwnProperty,c=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapRectangleParentModel",["uiGmapLogger","uiGmapGmapUtil","uiGmapEventsHelper","uiGmapRectangleOptionsBuilder",function(a,b,d,e){var f;return f=function(e){function f(b,c,d,e,f){var g,h,i,j,k,l,m,n,o,p,q;this.scope=b,this.attrs=d,this.map=e,this.DEFAULTS=f,g=void 0,j=!1,n=[],m=void 0,k=function(a){return function(){return a.isTrue(d.fit)?a.fitMapBounds(a.map,g):void 0}}(this),i=function(c){return function(){var d,e;return null!=b.bounds&&null!=(null!=(d=b.bounds)?d.sw:void 0)&&null!=(null!=(e=b.bounds)?e.ne:void 0)&&c.validateBoundPoints(b.bounds)?(g=c.convertBoundPoints(b.bounds),a.info("new new bounds created: "+o)):null!=b.bounds.getNorthEast&&null!=b.bounds.getSouthWest?g=b.bounds:"undefined"!=typeof bound&&null!==bound?a.error("Invalid bounds for newValue: "+JSON.stringify(b.bounds)):void 0}}(this),i(),o=new google.maps.Rectangle(this.buildOpts(g)),a.info("rectangle created: "+o),p=!1,q=function(){return function(){var a,c,d;return a=o.getBounds(),c=a.getNorthEast(),d=a.getSouthWest(),p?void 0:b.$evalAsync(function(b){return null!=b.bounds&&null!=b.bounds.sw&&null!=b.bounds.ne&&(b.bounds.ne={latitude:c.lat(),longitude:c.lng()},b.bounds.sw={latitude:d.lat(),longitude:d.lng()}),null!=b.bounds.getNorthEast&&null!=b.bounds.getSouthWest?b.bounds=a:void 0})}}(this),l=function(a){return function(){return k(),a.removeEvents(n),n.push(google.maps.event.addListener(o,"dragstart",function(){return j=!0})),n.push(google.maps.event.addListener(o,"dragend",function(){return j=!1,q()})),n.push(google.maps.event.addListener(o,"bounds_changed",function(){return j?void 0:q()}))}}(this),h=function(a){return function(){return a.removeEvents(n),null!=m&&a.removeEvents(m),o.setMap(null)}}(this),null!=g&&l(),b.$watch("bounds",function(a,b){var c;if(!(_.isEqual(a,b)&&null!=g||j))return p=!0,null==a?void h():(null==g?c=!0:k(),i(),o.setBounds(g),p=!1,c&&null!=g?l():void 0)},!0),this.setMyOptions=function(a){return function(b,c){return _.isEqual(b,c)||null==g||null==b?void 0:o.setOptions(a.buildOpts(g))}}(this),this.props.push("bounds"),this.watchProps(this.props),null!=d.events&&(m=this.setEvents(o,b,b),b.$watch("events",function(a){return function(c,d){return _.isEqual(c,d)?void 0:(null!=m&&a.removeEvents(m),m=a.setEvents(o,b,b))}}(this))),b.$on("$destroy",function(){return function(){return h()}}(this)),a.info(this)}return c(f,e),f.include(b),f.include(d),f}(e)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapSearchBoxParentModel",["uiGmapBaseObject","uiGmapLogger","uiGmapEventsHelper","$timeout","$http","$templateCache",function(c,e,f){var g;return g=function(c){function g(c,d,f,g,h,i,j){var k;return this.scope=c,this.element=d,this.attrs=f,this.gMap=g,this.ctrlPosition=h,this.template=i,this.$log=null!=j?j:e,this.getBounds=a(this.getBounds,this),this.setBounds=a(this.setBounds,this),this.createSearchBox=a(this.createSearchBox,this),this.addToParentDiv=a(this.addToParentDiv,this),this.addAsMapControl=a(this.addAsMapControl,this),this.init=a(this.init,this),null==this.attrs.template?void this.$log.error("template attribute for the search-box directive is mandatory. Places Search Box creation aborted!!"):(k=b.element("<div></div>"),k.append(this.template),this.input=k.find("input")[0],void this.init())}return d(g,c),g.include(f),g.prototype.init=function(){return this.createSearchBox(),null!=this.attrs.parentdiv?this.addToParentDiv():this.addAsMapControl(),this.listener=google.maps.event.addListener(this.searchBox,"places_changed",function(a){return function(){return a.places=a.searchBox.getPlaces()}}(this)),this.listeners=this.setEvents(this.searchBox,this.scope,this.scope),this.$log.info(this),this.scope.$watch("options",function(a){return function(c){return b.isObject(c)&&null!=c.bounds?a.setBounds(c.bounds):void 0}}(this),!0),this.scope.$on("$destroy",function(a){return function(){return a.searchBox=null}}(this))},g.prototype.addAsMapControl=function(){return this.gMap.controls[google.maps.ControlPosition[this.ctrlPosition]].push(this.input)},g.prototype.addToParentDiv=function(){return this.parentDiv=b.element(document.getElementById(this.scope.parentdiv)),this.parentDiv.append(this.input)},g.prototype.createSearchBox=function(){return this.searchBox=new google.maps.places.SearchBox(this.input,this.scope.options)},g.prototype.setBounds=function(a){if(b.isUndefined(a.isEmpty))this.$log.error("Error: SearchBoxParentModel setBounds. Bounds not an instance of LatLngBounds.");else if(a.isEmpty()===!1&&null!=this.searchBox)return this.searchBox.setBounds(a)},g.prototype.getBounds=function(){return this.searchBox.getBounds()},g}(c)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapWindowsParentModel",["uiGmapIWindowParentModel","uiGmapModelsWatcher","uiGmapPropMap","uiGmapWindowChildModel","uiGmapLinked","uiGmap_async","uiGmapLogger","$timeout","$compile","$http","$templateCache","$interpolate","uiGmapPromise",function(c,e,f,g,h,i,j,k,l,m,n,o,p){var q;return q=function(c){function j(b,c,d,e,g,i){var o;this.gMap=g,this.markersScope=i,this.interpolateContent=a(this.interpolateContent,this),this.setChildScope=a(this.setChildScope,this),this.createWindow=a(this.createWindow,this),this.setContentKeys=a(this.setContentKeys,this),this.pieceMealWindows=a(this.pieceMealWindows,this),this.createAllNewWindows=a(this.createAllNewWindows,this),this.watchIdKey=a(this.watchIdKey,this),this.createChildScopesWindows=a(this.createChildScopesWindows,this),this.watchOurScope=a(this.watchOurScope,this),this.watchDestroy=a(this.watchDestroy,this),this.onDestroy=a(this.onDestroy,this),this.rebuildAll=a(this.rebuildAll,this),this.doINeedToWipe=a(this.doINeedToWipe,this),this.watchModels=a(this.watchModels,this),this.go=a(this.go,this),j.__super__.constructor.call(this,b,c,d,e,k,l,m,n),o=this,this.windows=new f,this.scopePropNames=["coords","template","templateUrl","templateParameter","isIconVisibleOnClick","closeClick","options","show"],_.each(this.scopePropNames,function(a){return function(b){return a[b+"Key"]=void 0}}(this)),this.linked=new h(b,c,d,e),this.models=void 0,this.contentKeys=void 0,this.isIconVisibleOnClick=void 0,this.firstTime=!0,this.firstWatchModels=!0,this.$log.info(o),this.parentScope=void 0,this.go(b)}return d(j,c),j.include(e),j.prototype.go=function(a){return this.watchOurScope(a),this.doRebuildAll=null!=this.scope.doRebuildAll?this.scope.doRebuildAll:!1,a.$watch("doRebuildAll",function(a){return function(b,c){return b!==c?a.doRebuildAll=b:void 0}}(this)),this.createChildScopesWindows()},j.prototype.watchModels=function(a){return a.$watch("models",function(b){return function(c,d){var e;return!_.isEqual(c,d)||b.firstWatchModels?(b.firstWatchModels=!1,b.doRebuildAll||b.doINeedToWipe(c)?b.rebuildAll(a,!0,!0):(e=0===b.windows.length,null!=b.existingPieces?b.existingPieces.then(function(){return b.createChildScopesWindows(e)}):b.createChildScopesWindows(e))):void 0}}(this),!0)},j.prototype.doINeedToWipe=function(a){var b;return b=null!=a?0===a.length:!0,this.windows.length>0&&b},j.prototype.rebuildAll=function(a,b,c){return this.onDestroy(c).then(function(a){return function(){return b?a.createChildScopesWindows():void 0}}(this))},j.prototype.onDestroy=function(a){return this.destroyPromise().then(function(b){return function(){return b.cleanOnResolve(i.waitOrGo(b,function(){return b.windows.each(function(a){return a.destroy()}),p.resolve()})).then(function(){return a&&delete b.windows,b.windows=new f,b.isClearing=!1})}}(this))},j.prototype.watchDestroy=function(a){return a.$on("$destroy",function(b){return function(){return b.firstWatchModels=!0,b.firstTime=!0,b.rebuildAll(a,!1,!0)}}(this))},j.prototype.watchOurScope=function(a){return _.each(this.scopePropNames,function(b){return function(c){var d;return d=c+"Key",b[d]="function"==typeof a[c]?a[c]():a[c]}}(this))},j.prototype.createChildScopesWindows=function(a){var c,d,e;return null==a&&(a=!0),this.isIconVisibleOnClick=!0,b.isDefined(this.linked.attrs.isiconvisibleonclick)&&(this.isIconVisibleOnClick=this.linked.scope.isIconVisibleOnClick),c=b.isUndefined(this.linked.scope.models),!c||void 0!==this.markersScope&&void 0!==(null!=(d=this.markersScope)?d.markerModels:void 0)&&void 0!==(null!=(e=this.markersScope)?e.models:void 0)?null!=this.gMap?null!=this.linked.scope.models?(this.watchIdKey(this.linked.scope),a?this.createAllNewWindows(this.linked.scope,!1):this.pieceMealWindows(this.linked.scope,!1)):(this.parentScope=this.markersScope,this.watchIdKey(this.parentScope),a?this.createAllNewWindows(this.markersScope,!0,"markerModels",!1):this.pieceMealWindows(this.markersScope,!0,"markerModels",!1)):void 0:void this.$log.error("No models to create windows from! Need direct models or models derrived from markers!")},j.prototype.watchIdKey=function(a){return this.setIdKey(a),a.$watch("idKey",function(b){return function(c,d){return c!==d&&null==c?(b.idKey=c,b.rebuildAll(a,!0,!0)):void 0}}(this))},j.prototype.createAllNewWindows=function(a,b,c,d){return null==c&&(c="models"),null==d&&(d=!1),this.models=a.models,this.firstTime&&(this.watchModels(a),this.watchDestroy(a)),this.setContentKeys(a.models),this.cleanOnResolve(i.waitOrGo(this,function(d){return function(){return i.each(a.models,function(e){var f,g;return f=b&&null!=(g=a[c][[e[d.idKey]]])?g.gMarker:void 0,d.createWindow(e,f,d.gMap)})}}(this))).then(function(a){return function(){return a.firstTime=!1}}(this))},j.prototype.pieceMealWindows=function(a,b,c,d){var e;return null==c&&(c="models"),null==d&&(d=!0),a.$$destroyed||this.isClearing||this.updateInProgress()?void 0:(e=i.defaultChunkSize,this.models=a.models,null!=a&&null!=a.models&&a.models.length>0&&this.windows.length>0?this.figureOutState(this.idKey,a,this.windows,this.modelKeyComparison,function(b){return function(d){var e;return e=d,b.cleanOnResolve(i.waitOrGo(b,function(){return i.each(e.removals,function(a){return null!=a&&(b.windows.remove(a.id),null!=a.destroy)?a.destroy(!0):void 0},!1).then(function(){return i.each(e.adds,function(d){var e,f;if(e=null!=(f=a[c].get(d[b.idKey]))?f.gMarker:void 0,!e)throw"Gmarker undefined";return b.createWindow(d,e,b.gMap)},!1)})}))}}(this)):this.rebuildAll(this.scope,!0,!0))},j.prototype.setContentKeys=function(a){return a.length>0?this.contentKeys=Object.keys(a[0]):void 0},j.prototype.createWindow=function(a,b,c){var d,e,f,h,i,j;return e=this.linked.scope.$new(!1),this.setChildScope(e,a),e.$watch("model",function(a){return function(b,c){return b!==c?a.setChildScope(e,b):void 0}}(this),!0),f={html:function(b){return function(){return b.interpolateContent(b.linked.element.html(),a)}}(this)},this.DEFAULTS=this.markersScope?a[this.optionsKey]||{}:this.DEFAULTS,h=this.createWindowOptions(b,e,f.html(),this.DEFAULTS),d=new g(a,e,h,this.isIconVisibleOnClick,c,null!=(i=this.markersScope)&&null!=(j=i.markerModels.get(a[this.idKey]))?j.scope:void 0,f,!1,!0),null==a[this.idKey]?void this.$log.error("Window model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key."):(this.windows.put(a[this.idKey],d),d)},j.prototype.setChildScope=function(a,b){return _.each(this.scopePropNames,function(c){return function(d){var e,f;return e=d+"Key",f="self"===c[e]?b:b[c[e]],f!==a[d]?a[d]=f:void 0}}(this)),a.model=b},j.prototype.interpolateContent=function(a,b){var c,d,e,f,g,h;if(void 0!==this.contentKeys&&0!==this.contentKeys.length){for(c=o(a),d={},h=this.contentKeys,f=0,g=h.length;g>f;f++)e=h[f],d[e]=b[e];return c(d)}},j}(c)}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapCircle",["uiGmapICircle","uiGmapCircleParentModel",function(a,b){return _.extend(a,{link:function(a,c,d,e){return e.getScope().deferred.promise.then(function(){return function(e){return new b(a,c,d,e)}}(this))}})}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapControl",["uiGmapIControl","$http","$templateCache","$compile","$controller","uiGmapGoogleMapApi",function(c,e,f,g,h,i){var j;return j=function(j){function k(){this.link=a(this.link,this),k.__super__.constructor.call(this)}return d(k,j),k.prototype.link=function(a,d,j,k){return i.then(function(d){return function(i){var j,l;return b.isUndefined(a.template)?void d.$log.error("mapControl: could not find a valid template property"):(j=b.isDefined(a.index&&!isNaN(parseInt(a.index)))?parseInt(a.index):void 0,l=b.isDefined(a.position)?a.position.toUpperCase().replace(/-/g,"_"):"TOP_CENTER",i.ControlPosition[l]?c.mapPromise(a,k).then(function(c){var i,k;return i=void 0,k=b.element("<div></div>"),e.get(a.template,{cache:f}).success(function(c){var d,e;return e=a.$new(),k.append(c),j&&(k[0].index=j),b.isDefined(a.controller)&&(d=h(a.controller,{$scope:e}),k.children().data("$ngControllerController",d)),i=g(k.children())(e)}).error(function(){return d.$log.error("mapControl: template could not be found")}).then(function(){return c.controls[google.maps.ControlPosition[l]].push(i[0])})}):void d.$log.error("mapControl: invalid position property"))}}(this))},k}(c)}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api").service("uiGmapDragZoom",["uiGmapCtrlHandle","uiGmapPropertyAction",function(a,b){return{restrict:"EMA",transclude:!0,template:'<div class="angular-google-map-dragzoom" ng-transclude style="display: none"></div>',require:"^uiGmapGoogleMap",scope:{keyboardkey:"=",options:"=",spec:"="},controller:["$scope","$element",function(b,c){return b.ctrlType="uiGmapDragZoom",_.extend(this,a.handle(b,c))}],link:function(c,d,e,f){return a.mapPromise(c,f).then(function(a){var d,e,f;return d=function(b){return a.enableKeyDragZoom(b),c.spec?c.spec.enableKeyDragZoom(b):void 0},e=new b(function(a,b){return b?d({key:b}):d()}),f=new b(function(a,b){return b?d(b):void 0}),c.$watch("keyboardkey",e.sic),e.sic(c.keyboardkey),c.$watch("options",f.sic),f.sic(c.options)})}}}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapDrawingManager",["uiGmapIDrawingManager","uiGmapDrawingManagerParentModel",function(a,b){return _.extend(a,{link:function(a,c,d,e){return e.getScope().deferred.promise.then(function(e){return new b(a,c,d,e)})}})}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapApiFreeDrawPolygons",["uiGmapLogger","uiGmapBaseObject","uiGmapCtrlHandle","uiGmapDrawFreeHandChildModel","uiGmapLodash",function(b,c,e,f,g){var h;return h=function(c){function h(){return this.link=a(this.link,this),h.__super__.constructor.apply(this,arguments)
}return d(h,c),h.include(e),h.prototype.restrict="EMA",h.prototype.replace=!0,h.prototype.require="^uiGmapGoogleMap",h.prototype.scope={polygons:"=",draw:"=",revertmapoptions:"="},h.prototype.link=function(a,c,d,e){return this.mapPromise(a,e).then(function(){return function(c){var d,e;return a.polygons?_.isArray(a.polygons)?(d=new f(c,a.revertmapoptions),e=void 0,a.draw=function(){return"function"==typeof e&&e(),d.engage(a.polygons).then(function(){var b;return b=!0,e=a.$watch("polygons",function(a,c){var d;return b?void(b=!1):(d=g.differenceObjects(c,a),d.forEach(function(a){return a.setMap(null)}))})})}):b.error("Free Draw Polygons must be of type Array!"):b.error("No polygons to bind to!")}}(this))},h}(c)}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api").service("uiGmapICircle",[function(){var a;return a={},{restrict:"EA",replace:!0,require:"^uiGmapGoogleMap",scope:{center:"=center",radius:"=radius",stroke:"=stroke",fill:"=fill",clickable:"=",draggable:"=",editable:"=",geodesic:"=",icons:"=icons",visible:"=",events:"="}}}])}.call(this),function(){var a={}.hasOwnProperty,c=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIControl",["uiGmapBaseObject","uiGmapLogger","uiGmapCtrlHandle",function(a,b,d){var e;return e=function(a){function e(){this.restrict="EA",this.replace=!0,this.require="^uiGmapGoogleMap",this.scope={template:"@template",position:"@position",controller:"@controller",index:"@index"},this.$log=b}return c(e,a),e.extend(d),e.prototype.link=function(){throw new Exception("Not implemented!!")},e}(a)}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api").service("uiGmapIDrawingManager",[function(){return{restrict:"EA",replace:!0,require:"^uiGmapGoogleMap",scope:{"static":"@",control:"=",options:"="}}}])}.call(this),function(){var a={}.hasOwnProperty,c=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIMarker",["uiGmapLogger","uiGmapBaseObject","uiGmapCtrlHandle",function(a,b,d){var e;return e=function(b){function e(){this.$log=a,this.restrict="EMA",this.require="^uiGmapGoogleMap",this.priority=-1,this.transclude=!0,this.replace=!0,this.scope=e.scopeKeys}return c(e,b),e.scopeKeys={coords:"=coords",icon:"=icon",click:"&click",options:"=options",events:"=events",fit:"=fit",idKey:"=idkey",control:"=control"},e.keys=_.keys(e.scopeKeys),e.extend(d),e}(b)}])}.call(this),function(){var a={}.hasOwnProperty,c=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIPolygon",["uiGmapGmapUtil","uiGmapBaseObject","uiGmapLogger","uiGmapCtrlHandle",function(a,b,d,e){var f;return f=function(b){function f(){}return c(f,b),f.include(a),f.extend(e),f.prototype.restrict="EMA",f.prototype.replace=!0,f.prototype.require="^uiGmapGoogleMap",f.prototype.scope={path:"=path",stroke:"=stroke",clickable:"=",draggable:"=",editable:"=",geodesic:"=",fill:"=",icons:"=icons",visible:"=","static":"=",events:"=",zIndex:"=zindex",fit:"=",control:"=control"},f.prototype.DEFAULTS={},f.prototype.$log=d,f}(b)}])}.call(this),function(){var a={}.hasOwnProperty,c=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIPolyline",["uiGmapGmapUtil","uiGmapBaseObject","uiGmapLogger","uiGmapCtrlHandle",function(a,b,d,e){var f;return f=function(b){function f(){}return c(f,b),f.include(a),f.extend(e),f.prototype.restrict="EMA",f.prototype.replace=!0,f.prototype.require="^uiGmapGoogleMap",f.prototype.scope={path:"=",stroke:"=",clickable:"=",draggable:"=",editable:"=",geodesic:"=",icons:"=",visible:"=","static":"=",fit:"=",events:"="},f.prototype.DEFAULTS={},f.prototype.$log=d,f}(b)}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api").service("uiGmapIRectangle",[function(){var a;return a={},{restrict:"EMA",require:"^uiGmapGoogleMap",replace:!0,scope:{bounds:"=",stroke:"=",clickable:"=",draggable:"=",editable:"=",fill:"=",visible:"=",events:"="}}}])}.call(this),function(){var a={}.hasOwnProperty,c=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIWindow",["uiGmapBaseObject","uiGmapChildEvents","uiGmapLogger","uiGmapCtrlHandle",function(a,b,d,e){var f;return f=function(a){function f(){this.restrict="EMA",this.template=void 0,this.transclude=!0,this.priority=-100,this.require="^uiGmapGoogleMap",this.replace=!0,this.scope={coords:"=coords",template:"=template",templateUrl:"=templateurl",templateParameter:"=templateparameter",isIconVisibleOnClick:"=isiconvisibleonclick",closeClick:"&closeclick",options:"=options",control:"=control",show:"=show"},this.$log=d}return c(f,a),f.include(b),f.extend(e),f}(a)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},d={}.hasOwnProperty,e=function(a,b){function c(){this.constructor=a}for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMap",["$timeout","$q","uiGmapLogger","uiGmapGmapUtil","uiGmapBaseObject","uiGmapCtrlHandle","uiGmapIsReady","uiGmapuuid","uiGmapExtendGWin","uiGmapExtendMarkerClusterer","uiGmapGoogleMapsUtilV3","uiGmapGoogleMapApi",function(d,f,g,h,i,j,k,l,m,n,o,p){var q,r,s;return q=void 0,s=[o,m,n],r=function(f){function i(){this.link=a(this.link,this);var b,c;b=function(a){var b,c;return c=void 0,a.$on("$destroy",function(){return k.reset()}),b=j.handle(a),a.ctrlType="Map",a.deferred.promise.then(function(){return s.forEach(function(a){return a.init()})}),b.getMap=function(){return a.map},c=_.extend(this,b)},this.controller=["$scope",b],c=this}return e(i,f),i.include(h),i.prototype.restrict="EMA",i.prototype.transclude=!0,i.prototype.replace=!1,i.prototype.template='<div class="angular-google-map"><div class="angular-google-map-container"></div><div ng-transclude style="display: none"></div></div>',i.prototype.scope={center:"=",zoom:"=",dragging:"=",control:"=",options:"=",events:"=",eventOpts:"=",styles:"=",bounds:"=",update:"="},i.prototype.link=function(a,e,f){var h;return a.idleAndZoomChanged=!1,null==a.center?void(h=a.$watch("center",function(b){return function(){return a.center?(h(),b.link(a,e,f)):void 0}}(this))):p.then(function(h){return function(i){var j,m,n,o,p,r,s,t,u,v,w;if(q={mapTypeId:i.MapTypeId.ROADMAP},u=k.spawn(),s=function(){return u.deferred.resolve({instance:u.instance,map:w})},!h.validateCoords(a.center))return void g.error("angular-google-maps: could not find a valid center property");if(!b.isDefined(a.zoom))return void g.error("angular-google-maps: map zoom property not set");if(m=b.element(e),m.addClass("angular-google-map"),r={options:{}},f.options&&(r.options=a.options),f.styles&&(r.styles=a.styles),f.type&&(v=f.type.toUpperCase(),google.maps.MapTypeId.hasOwnProperty(v)?r.mapTypeId=google.maps.MapTypeId[f.type.toUpperCase()]:g.error("angular-google-maps: invalid map type '"+f.type+"'")),p=b.extend({},q,r,{center:h.getCoords(a.center),zoom:a.zoom,bounds:a.bounds}),w=new google.maps.Map(m.find("div")[1],p),w.uiGmap_id=l.generate(),j=!1,google.maps.event.addListenerOnce(w,"idle",function(){return a.deferred.resolve(w),s()}),google.maps.event.addListener(w,"dragstart",function(){var b;return(null!=(b=a.update)?b.lazy:void 0)?void 0:(j=!0,a.$evalAsync(function(a){return null!=a.dragging?a.dragging=j:void 0}))}),google.maps.event.addListener(w,"dragend",function(){var b;return(null!=(b=a.update)?b.lazy:void 0)?void 0:(j=!1,a.$evalAsync(function(a){return null!=a.dragging?a.dragging=j:void 0}))}),google.maps.event.addListener(w,"drag",function(){var c,e,f,g,h;return(null!=(e=a.update)?e.lazy:void 0)?void 0:(c=w.center,d(function(){var d;return d=a,b.isDefined(d.center.type)?(d.center.coordinates[1]=c.lat(),d.center.coordinates[0]=c.lng()):(d.center.latitude=c.lat(),d.center.longitude=c.lng())},null!=(f=a.eventOpts)&&null!=(g=f.debounce)&&null!=(h=g.debounce)?h.dragMs:void 0))}),google.maps.event.addListener(w,"zoom_changed",function(){var b,c,e;return(null!=(b=a.update)?b.lazy:void 0)||a.zoom===w.zoom?void 0:d(function(){return a.zoom=w.zoom},null!=(c=a.eventOpts)&&null!=(e=c.debounce)?e.zoomMs:void 0)}),t=!1,google.maps.event.addListener(w,"center_changed",function(){var c,e,f,g;if(!(null!=(e=a.update)?e.lazy:void 0)){if(c=w.center,t)return;return d(function(){var d;if(d=a,!w.dragging)if(b.isDefined(d.center.type)){if(d.center.coordinates[1]!==c.lat()&&(d.center.coordinates[1]=c.lat()),d.center.coordinates[0]!==c.lng())return d.center.coordinates[0]=c.lng()}else if(d.center.latitude!==c.lat()&&(d.center.latitude=c.lat()),d.center.longitude!==c.lng())return d.center.longitude=c.lng()},null!=(f=a.eventOpts)&&null!=(g=f.debounce)?g.centerMs:void 0)}}),google.maps.event.addListener(w,"idle",function(){var d,e,f;return d=w.getBounds(),e=d.getNorthEast(),f=d.getSouthWest(),a.$evalAsync(function(d){var g,h;return(null!=(h=d.update)?h.lazy:void 0)&&(g=w.center,b.isDefined(d.center.type)?(d.center.coordinates[1]!==g.lat()&&(d.center.coordinates[1]=g.lat()),d.center.coordinates[0]!==g.lng()&&(d.center.coordinates[0]=g.lng())):(d.center.latitude!==g.lat()&&(d.center.latitude=g.lat()),d.center.longitude!==g.lng()&&(d.center.longitude=g.lng()))),null!==d.bounds&&d.bounds!==c&&void 0!==d.bounds&&(d.bounds.northeast={latitude:e.lat(),longitude:e.lng()},d.bounds.southwest={latitude:f.lat(),longitude:f.lng()}),d.zoom=w.zoom,a.idleAndZoomChanged=!a.idleAndZoomChanged})}),b.isDefined(a.events)&&null!==a.events&&b.isObject(a.events)){o=function(b){return function(){return a.events[b].apply(a,[w,b,arguments])}};for(n in a.events)a.events.hasOwnProperty(n)&&b.isFunction(a.events[n])&&google.maps.event.addListener(w,n,o(n))}return w.getOptions=function(){return p},a.map=w,null!=f.control&&null!=a.control&&(a.control.refresh=function(a){var b;if(null!=w)return google.maps.event.trigger(w,"resize"),null!=(null!=a?a.latitude:void 0)&&null!=(null!=a?a.latitude:void 0)?(b=h.getCoords(a),h.isTrue(f.pan)?w.panTo(b):w.setCenter(b)):void 0},a.control.getGMap=function(){return w},a.control.getMapOptions=function(){return p}),a.$watch("center",function(b){var c;return c=h.getCoords(b),c.lat()!==w.center.lat()||c.lng()!==w.center.lng()?(t=!0,j||(h.validateCoords(b)||g.error("Invalid center for newValue: "+JSON.stringify(b)),h.isTrue(f.pan)&&a.zoom===w.zoom?w.panTo(c):w.setCenter(c)),t=!1):void 0},!0),a.$watch("zoom",function(a,b){return _.isEqual(a,b)?void 0:d(function(){return w.setZoom(a)},0,!1)}),a.$watch("bounds",function(a,b){var c,d,e;if(a!==b)return null==a.northeast.latitude||null==a.northeast.longitude||null==a.southwest.latitude||null==a.southwest.longitude?void g.error("Invalid map bounds for new value: "+JSON.stringify(a)):(d=new google.maps.LatLng(a.northeast.latitude,a.northeast.longitude),e=new google.maps.LatLng(a.southwest.latitude,a.southwest.longitude),c=new google.maps.LatLngBounds(e,d),w.fitBounds(c))}),["options","styles"].forEach(function(b){return a.$watch(b,function(a,b){var c;return c=this.exp,_.isEqual(a,b)?void 0:(r.options=a,null!=w?w.setOptions(r):void 0)})},!0)}}(this))},i}(i)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMarker",["uiGmapIMarker","uiGmapMarkerChildModel","uiGmapMarkerManager",function(b,c,e){var f;return f=function(f){function g(){this.link=a(this.link,this),g.__super__.constructor.call(this),this.template='<span class="angular-google-map-marker" ng-transclude></span>',this.$log.info(this)}return d(g,f),g.prototype.controller=["$scope","$element",function(a,c){return a.ctrlType="Marker",_.extend(this,b.handle(a,c))}],g.prototype.link=function(a,d,f,g){return this.mapPromise=b.mapPromise(a,g),this.mapPromise.then(function(d){return function(f){var g,h,i,j,k;return d.gMarkerManager||(d.gMarkerManager=new e(f)),i=_.object(b.keys,b.keys),j=new c(a,a,i,f,{},g=!0,d.gMarkerManager,h=!1,k=!1),j.deferred.promise.then(function(b){return a.deferred.resolve(b)}),null!=a.control?a.control.getGMarkers=d.gMarkerManager.getGMarkers:void 0}}(this)),a.$on("$destroy",function(a){return function(){var b;return null!=(b=a.gMarkerManager)&&b.clear(),a.gMarkerManager=null}}(this))},g}(b)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMarkers",["uiGmapIMarker","uiGmapMarkersParentModel","uiGmap_sync",function(b,c){var e;return e=function(e){function f(b){this.link=a(this.link,this),f.__super__.constructor.call(this,b),this.template='<span class="angular-google-map-markers" ng-transclude></span>',this.scope=_.extend(this.scope||{},{idKey:"=idkey",doRebuildAll:"=dorebuildall",models:"=models",doCluster:"=docluster",clusterOptions:"=clusteroptions",clusterEvents:"=clusterevents",modelsByRef:"=modelsbyref"}),this.$log.info(this)}return d(f,e),f.prototype.controller=["$scope","$element",function(a,c){return a.ctrlType="Markers",_.extend(this,b.handle(a,c))}],f.prototype.link=function(a,d,e,f){var g,h;return g=void 0,h=function(){return function(){return null!=a.control&&(a.control.getGMarkers=function(){var a;return null!=(a=g.gMarkerManager)?a.getGMarkers():void 0},a.control.getChildMarkers=function(){return g.markerModels}),a.deferred.resolve()}}(this),b.mapPromise(a,f).then(function(){return function(b){var i;return i=f.getScope(),i.$watch("idleAndZoomChanged",function(){return _.defer(g.gMarkerManager.draw)}),g=new c(a,d,e,b),g.existingPieces.then(function(){return h()})}}(this))},f}(b)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolygon",["uiGmapIPolygon","$timeout","uiGmaparray-sync","uiGmapPolygonChildModel",function(b,c,e,f){var g;return g=function(c){function e(){return this.link=a(this.link,this),e.__super__.constructor.apply(this,arguments)}return d(e,c),e.prototype.link=function(a,c,d,e){var g,h;return g=[],h=b.mapPromise(a,e),null!=a.control&&(a.control.getInstance=this,a.control.polygons=g,a.control.promise=h),h.then(function(b){return function(c){return g.push(new f(a,d,c,b.DEFAULTS))}}(this))},e}(b)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolygons",["uiGmapIPolygon","$timeout","uiGmaparray-sync","uiGmapPolygonsParentModel",function(c,e,f,g){var h;return h=function(c){function e(){this.link=a(this.link,this),e.__super__.constructor.call(this),this.scope.idKey="=idkey",this.scope.models="=models",this.$log.info(this)}return d(e,c),e.prototype.link=function(a,c,d,e){return b.isUndefined(a.path)||null===a.path?void this.$log.error("polygons: no valid path attribute found"):a.models?e.getScope().deferred.promise.then(function(b){return function(e){return new g(a,c,d,e,b.DEFAULTS)}}(this)):void this.$log.error("polygons: no models found to create from")},e}(c)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolyline",["uiGmapIPolyline","$timeout","uiGmaparray-sync","uiGmapPolylineChildModel",function(c,e,f,g){var h;return h=function(e){function f(){return this.link=a(this.link,this),f.__super__.constructor.apply(this,arguments)}return d(f,e),f.prototype.link=function(a,d,e,f){return b.isUndefined(a.path)||null===a.path||!this.validatePath(a.path)?void this.$log.error("polyline: no valid path attribute found"):c.mapPromise(a,f).then(function(b){return function(c){return new g(a,e,c,b.DEFAULTS)}}(this))},f}(c)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolylines",["uiGmapIPolyline","$timeout","uiGmaparray-sync","uiGmapPolylinesParentModel",function(c,e,f,g){var h;return h=function(c){function e(){this.link=a(this.link,this),e.__super__.constructor.call(this),this.scope.idKey="=idkey",this.scope.models="=models",this.$log.info(this)}return d(e,c),e.prototype.link=function(a,c,d,e){return b.isUndefined(a.path)||null===a.path?void this.$log.error("polylines: no valid path attribute found"):a.models?e.getScope().deferred.promise.then(function(b){return function(e){return new g(a,c,d,e,b.DEFAULTS)}}(this)):void this.$log.error("polylines: no models found to create from")},e}(c)}])}.call(this),function(){b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapRectangle",["uiGmapLogger","uiGmapGmapUtil","uiGmapIRectangle","uiGmapRectangleParentModel",function(a,b,c,d){return _.extend(c,{link:function(a,b,c,e){return e.getScope().deferred.promise.then(function(){return function(e){return new d(a,b,c,e)}}(this))}})}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapWindow",["uiGmapIWindow","uiGmapGmapUtil","uiGmapWindowChildModel","uiGmapLodash",function(c,e,f,g){var h;return h=function(h){function i(){this.link=a(this.link,this),i.__super__.constructor.call(this),this.require=["^uiGmapGoogleMap","^?uiGmapMarker"],this.template='<span class="angular-google-maps-window" ng-transclude></span>',this.$log.info(this),this.childWindows=[]}return d(i,h),i.include(e),i.prototype.link=function(a,d,e,f){var g,h;return g=f.length>1&&null!=f[1]?f[1]:void 0,h=null!=g?g.getScope():void 0,this.mapPromise=c.mapPromise(a,f[0]),this.mapPromise.then(function(c){return function(f){var i;return i=!0,b.isDefined(e.isiconvisibleonclick)&&(i=a.isIconVisibleOnClick),g?h.deferred.promise.then(function(){return c.init(a,d,i,f,h)}):void c.init(a,d,i,f)}}(this))},i.prototype.init=function(a,b,c,d,e){var h,i,j,k,l;return i=null!=a.options?a.options:{},k=null!=a&&this.validateCoords(a.coords),null!=(null!=e?e.getGMarker:void 0)&&(j=e.getGMarker()),l=k?this.createWindowOptions(j,a,b.html(),i):i,null!=d&&(h=new f({},a,l,c,d,e,b),this.childWindows.push(h),a.$on("$destroy",function(a){return function(){return a.childWindows=g.withoutObjects(a.childWindows,[h],function(a,b){return a.scope.$id===b.scope.$id}),a.childWindows.length=0}}(this))),null!=a.control&&(a.control.getGWindows=function(a){return function(){return a.childWindows.map(function(a){return a.gWin})}}(this),a.control.getChildWindows=function(a){return function(){return a.childWindows}}(this),a.control.showWindow=function(a){return function(){return a.childWindows.map(function(a){return a.showWindow()})}}(this),a.control.hideWindow=function(a){return function(){return a.childWindows.map(function(a){return a.hideWindow()})}}(this)),null!=this.onChildCreation&&null!=h?this.onChildCreation(h):void 0},i}(c)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapWindows",["uiGmapIWindow","uiGmapWindowsParentModel","uiGmapPromise",function(b,c,e){var f;return f=function(b){function f(){this.init=a(this.init,this),this.link=a(this.link,this),f.__super__.constructor.call(this),this.require=["^uiGmapGoogleMap","^?uiGmapMarkers"],this.template='<span class="angular-google-maps-windows" ng-transclude></span>',this.scope.idKey="=idkey",this.scope.doRebuildAll="=dorebuildall",this.scope.models="=models",this.$log.debug(this)}return d(f,b),f.prototype.link=function(a,b,c,d){var f,g,h;return f=d[0].getScope(),g=d.length>1&&null!=d[1]?d[1]:void 0,h=null!=g?g.getScope():void 0,f.deferred.promise.then(function(f){return function(g){var i,j;return i=(null!=h&&null!=(j=h.deferred)?j.promise:void 0)||e.resolve(),i.then(function(){var e,i;return e=null!=(i=f.parentModel)?i.existingPieces:void 0,e?e.then(function(){return f.init(a,b,c,d,g,h)}):f.init(a,b,c,d,g,h)})}}(this))},f.prototype.init=function(a,b,d,e,f,g){var h;return h=new c(a,b,d,e,f,g),null!=a.control?(a.control.getGWindows=function(){return function(){return h.windows.map(function(a){return a.gWin})}}(this),a.control.getChildWindows=function(){return function(){return h.windows}}(this)):void 0},f}(b)}])}.call(this),function(){b.module("uiGmapgoogle-maps").directive("uiGmapGoogleMap",["uiGmapMap",function(a){return new a}])}.call(this),function(){b.module("uiGmapgoogle-maps").directive("uiGmapMarker",["$timeout","uiGmapMarker",function(a,b){return new b(a)}])}.call(this),function(){b.module("uiGmapgoogle-maps").directive("uiGmapMarkers",["$timeout","uiGmapMarkers",function(a,b){return new b(a)}])}.call(this),function(){b.module("uiGmapgoogle-maps").directive("uiGmapPolygon",["uiGmapPolygon",function(a){return new a}])}.call(this),function(){b.module("uiGmapgoogle-maps").directive("uiGmapCircle",["uiGmapCircle",function(a){return a}])}.call(this),function(){b.module("uiGmapgoogle-maps").directive("uiGmapPolyline",["uiGmapPolyline",function(a){return new a}])}.call(this),function(){b.module("uiGmapgoogle-maps").directive("uiGmapPolylines",["uiGmapPolylines",function(a){return new a}])}.call(this),function(){b.module("uiGmapgoogle-maps").directive("uiGmapRectangle",["uiGmapLogger","uiGmapRectangle",function(a,b){return b}])}.call(this),function(){b.module("uiGmapgoogle-maps").directive("uiGmapWindow",["$timeout","$compile","$http","$templateCache","uiGmapWindow",function(a,b,c,d,e){return new e(a,b,c,d)}])}.call(this),function(){b.module("uiGmapgoogle-maps").directive("uiGmapWindows",["$timeout","$compile","$http","$templateCache","$interpolate","uiGmapWindows",function(a,b,c,d,e,f){return new f(a,b,c,d,e)}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};b.module("uiGmapgoogle-maps").directive("uiGmapLayer",["$timeout","uiGmapLogger","uiGmapLayerParentModel",function(b,c,d){var e;return new(e=function(){function b(){this.link=a(this.link,this),this.$log=c,this.restrict="EMA",this.require="^uiGmapGoogleMap",this.priority=-1,this.transclude=!0,this.template="<span class='angular-google-map-layer' ng-transclude></span>",this.replace=!0,this.scope={show:"=show",type:"=type",namespace:"=namespace",options:"=options",onCreated:"&oncreated"}}return b.prototype.link=function(a,b,c,e){return e.getScope().deferred.promise.then(function(){return function(e){return null!=a.onCreated?new d(a,b,c,e,a.onCreated):new d(a,b,c,e)}}(this))},b}())}])}.call(this),function(){b.module("uiGmapgoogle-maps").directive("uiGmapMapControl",["uiGmapControl",function(a){return new a}])}.call(this),function(){b.module("uiGmapgoogle-maps").directive("uiGmapDragZoom",["uiGmapDragZoom",function(a){return a}])}.call(this),function(){b.module("uiGmapgoogle-maps").directive("uiGmapDrawingManager",["uiGmapDrawingManager",function(a){return a}])}.call(this),function(){b.module("uiGmapgoogle-maps").directive("uiGmapFreeDrawPolygons",["uiGmapApiFreeDrawPolygons",function(a){return new a}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};b.module("uiGmapgoogle-maps").directive("uiGmapMapType",["$timeout","uiGmapLogger","uiGmapMapTypeParentModel",function(b,c,d){var e;return new(e=function(){function b(){this.link=a(this.link,this),this.$log=c,this.restrict="EMA",this.require="^uiGmapGoogleMap",this.priority=-1,this.transclude=!0,this.template='<span class="angular-google-map-layer" ng-transclude></span>',this.replace=!0,this.scope={show:"=show",options:"=options",refresh:"=refresh",id:"@"}}return b.prototype.link=function(a,b,c,e){return e.getScope().deferred.promise.then(function(){return function(e){return new d(a,b,c,e)}}(this))},b}())}])}.call(this),function(){b.module("uiGmapgoogle-maps").directive("uiGmapPolygons",["uiGmapPolygons",function(a){return new a}])}.call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};b.module("uiGmapgoogle-maps").directive("uiGmapSearchBox",["uiGmapGoogleMapApi","uiGmapLogger","uiGmapSearchBoxParentModel","$http","$templateCache","$compile",function(c,d,e,f,g,h){var i;return new(i=function(){function i(){this.link=a(this.link,this),this.$log=d,this.restrict="EMA",this.require="^uiGmapGoogleMap",this.priority=-1,this.transclude=!0,this.template="<span class='angular-google-map-search' ng-transclude></span>",this.replace=!0,this.scope={template:"=template",position:"=position",options:"=options",events:"=events",parentdiv:"=parentdiv"}}return i.prototype.link=function(a,d,i,j){return c.then(function(c){return function(k){return f.get(a.template,{cache:g}).success(function(f){return j.getScope().deferred.promise.then(function(g){var j;return j=b.isDefined(a.position)?a.position.toUpperCase().replace(/-/g,"_"):"TOP_LEFT",k.ControlPosition[j]?new e(a,d,i,g,j,h(f)(a)):void c.$log.error("searchBox: invalid position property")})})}}(this))},i}())}])}.call(this),b.module("uiGmapgoogle-maps.wrapped").service("uiGmapuuid",function(){function a(){}return a.generate=function(){var b=a._gri,c=a._ha;return c(b(32),8)+"-"+c(b(16),4)+"-"+c(16384|b(12),4)+"-"+c(32768|b(14),4)+"-"+c(b(48),12)},a._gri=function(a){return 0>a?0/0:30>=a?0|Math.random()*(1<<a):53>=a?(0|1073741824*Math.random())+1073741824*(0|Math.random()*(1<<a-30)):0/0},a._ha=function(a,b){for(var c=a.toString(16),d=b-c.length,e="0";d>0;d>>>=1,e+=e)1&d&&(c=e+c);return c},a}),b.module("uiGmapgoogle-maps.wrapped").service("uiGmapGoogleMapsUtilV3",function(){return{init:_.once(function(){function b(a){a=a||{},google.maps.OverlayView.apply(this,arguments),this.content_=a.content||"",this.disableAutoPan_=a.disableAutoPan||!1,this.maxWidth_=a.maxWidth||0,this.pixelOffset_=a.pixelOffset||new google.maps.Size(0,0),this.position_=a.position||new google.maps.LatLng(0,0),this.zIndex_=a.zIndex||null,this.boxClass_=a.boxClass||"infoBox",this.boxStyle_=a.boxStyle||{},this.closeBoxMargin_=a.closeBoxMargin||"2px",this.closeBoxURL_=a.closeBoxURL||"http://www.google.com/intl/en_us/mapfiles/close.gif",""===a.closeBoxURL&&(this.closeBoxURL_=""),this.infoBoxClearance_=a.infoBoxClearance||new google.maps.Size(1,1),"undefined"==typeof a.visible&&(a.visible="undefined"==typeof a.isHidden?!0:!a.isHidden),this.isHidden_=!a.visible,this.alignBottom_=a.alignBottom||!1,this.pane_=a.pane||"floatPane",this.enableEventPropagation_=a.enableEventPropagation||!1,this.div_=null,this.closeListener_=null,this.moveListener_=null,this.contextListener_=null,this.eventListeners_=null,this.fixedWidthSet_=null}function d(a,b){a.getMarkerClusterer().extend(d,google.maps.OverlayView),this.cluster_=a,this.className_=a.getMarkerClusterer().getClusterClass(),this.styles_=b,this.center_=null,this.div_=null,this.sums_=null,this.visible_=!1,this.setMap(a.getMap())}function e(a){this.markerClusterer_=a,this.map_=a.getMap(),this.gridSize_=a.getGridSize(),this.minClusterSize_=a.getMinimumClusterSize(),this.averageCenter_=a.getAverageCenter(),this.markers_=[],this.center_=null,this.bounds_=null,this.clusterIcon_=new d(this,a.getStyles())}function f(a,b,d){this.extend(f,google.maps.OverlayView),b=b||[],d=d||{},this.markers_=[],this.clusters_=[],this.listeners_=[],this.activeMap_=null,this.ready_=!1,this.gridSize_=d.gridSize||60,this.minClusterSize_=d.minimumClusterSize||2,this.maxZoom_=d.maxZoom||null,this.styles_=d.styles||[],this.title_=d.title||"",this.zoomOnClick_=!0,d.zoomOnClick!==c&&(this.zoomOnClick_=d.zoomOnClick),this.averageCenter_=!1,d.averageCenter!==c&&(this.averageCenter_=d.averageCenter),this.ignoreHidden_=!1,d.ignoreHidden!==c&&(this.ignoreHidden_=d.ignoreHidden),this.enableRetinaIcons_=!1,d.enableRetinaIcons!==c&&(this.enableRetinaIcons_=d.enableRetinaIcons),this.imagePath_=d.imagePath||f.IMAGE_PATH,this.imageExtension_=d.imageExtension||f.IMAGE_EXTENSION,this.imageSizes_=d.imageSizes||f.IMAGE_SIZES,this.calculator_=d.calculator||f.CALCULATOR,this.batchSize_=d.batchSize||f.BATCH_SIZE,this.batchSizeIE_=d.batchSizeIE||f.BATCH_SIZE_IE,this.clusterClass_=d.clusterClass||"cluster",-1!==navigator.userAgent.toLowerCase().indexOf("msie")&&(this.batchSize_=this.batchSizeIE_),this.setupStyles_(),this.addMarkers(b,!0),this.setMap(a)}function g(a,b){function c(){}c.prototype=b.prototype,a.superClass_=b.prototype,a.prototype=new c,a.prototype.constructor=a}function h(a,b){this.marker_=a,this.handCursorURL_=a.handCursorURL,this.labelDiv_=document.createElement("div"),this.labelDiv_.style.cssText="position: absolute; overflow: hidden;",this.eventDiv_=document.createElement("div"),this.eventDiv_.style.cssText=this.labelDiv_.style.cssText,this.eventDiv_.setAttribute("onselectstart","return false;"),this.eventDiv_.setAttribute("ondragstart","return false;"),this.crossDiv_=h.getSharedCross(b)}function i(a){a=a||{},a.labelContent=a.labelContent||"",a.labelAnchor=a.labelAnchor||new google.maps.Point(0,0),a.labelClass=a.labelClass||"markerLabels",a.labelStyle=a.labelStyle||{},a.labelInBackground=a.labelInBackground||!1,"undefined"==typeof a.labelVisible&&(a.labelVisible=!0),"undefined"==typeof a.raiseOnDrag&&(a.raiseOnDrag=!0),"undefined"==typeof a.clickable&&(a.clickable=!0),"undefined"==typeof a.draggable&&(a.draggable=!1),"undefined"==typeof a.optimized&&(a.optimized=!1),a.crossImage=a.crossImage||"http"+("https:"===document.location.protocol?"s":"")+"://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png",a.handCursor=a.handCursor||"http"+("https:"===document.location.protocol?"s":"")+"://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur",a.optimized=!1,this.label=new h(this,a.crossImage,a.handCursor),google.maps.Marker.apply(this,arguments)}b.prototype=new google.maps.OverlayView,b.prototype.createInfoBoxDiv_=function(){var a,b,c,d=this,e=function(a){a.cancelBubble=!0,a.stopPropagation&&a.stopPropagation()},f=function(a){a.returnValue=!1,a.preventDefault&&a.preventDefault(),d.enableEventPropagation_||e(a)};if(!this.div_){if(this.div_=document.createElement("div"),this.setBoxStyle_(),"undefined"==typeof this.content_.nodeType?this.div_.innerHTML=this.getCloseBoxImg_()+this.content_:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(this.content_)),this.getPanes()[this.pane_].appendChild(this.div_),this.addClickHandler_(),this.div_.style.width?this.fixedWidthSet_=!0:0!==this.maxWidth_&&this.div_.offsetWidth>this.maxWidth_?(this.div_.style.width=this.maxWidth_,this.div_.style.overflow="auto",this.fixedWidthSet_=!0):(c=this.getBoxWidths_(),this.div_.style.width=this.div_.offsetWidth-c.left-c.right+"px",this.fixedWidthSet_=!1),this.panBox_(this.disableAutoPan_),!this.enableEventPropagation_){for(this.eventListeners_=[],b=["mousedown","mouseover","mouseout","mouseup","click","dblclick","touchstart","touchend","touchmove"],a=0;a<b.length;a++)this.eventListeners_.push(google.maps.event.addDomListener(this.div_,b[a],e));
this.eventListeners_.push(google.maps.event.addDomListener(this.div_,"mouseover",function(){this.style.cursor="default"}))}this.contextListener_=google.maps.event.addDomListener(this.div_,"contextmenu",f),google.maps.event.trigger(this,"domready")}},b.prototype.getCloseBoxImg_=function(){var a="";return""!==this.closeBoxURL_&&(a="<img",a+=" src='"+this.closeBoxURL_+"'",a+=" align=right",a+=" style='",a+=" position: relative;",a+=" cursor: pointer;",a+=" margin: "+this.closeBoxMargin_+";",a+="'>"),a},b.prototype.addClickHandler_=function(){var a;""!==this.closeBoxURL_?(a=this.div_.firstChild,this.closeListener_=google.maps.event.addDomListener(a,"click",this.getCloseClickHandler_())):this.closeListener_=null},b.prototype.getCloseClickHandler_=function(){var a=this;return function(b){b.cancelBubble=!0,b.stopPropagation&&b.stopPropagation(),google.maps.event.trigger(a,"closeclick"),a.close()}},b.prototype.panBox_=function(a){var b,c,d=0,e=0;if(!a&&(b=this.getMap(),b instanceof google.maps.Map)){b.getBounds().contains(this.position_)||b.setCenter(this.position_),c=b.getBounds();var f=b.getDiv(),g=f.offsetWidth,h=f.offsetHeight,i=this.pixelOffset_.width,j=this.pixelOffset_.height,k=this.div_.offsetWidth,l=this.div_.offsetHeight,m=this.infoBoxClearance_.width,n=this.infoBoxClearance_.height,o=this.getProjection().fromLatLngToContainerPixel(this.position_);if(o.x<-i+m?d=o.x+i-m:o.x+k+i+m>g&&(d=o.x+k+i+m-g),this.alignBottom_?o.y<-j+n+l?e=o.y+j-n-l:o.y+j+n>h&&(e=o.y+j+n-h):o.y<-j+n?e=o.y+j-n:o.y+l+j+n>h&&(e=o.y+l+j+n-h),0!==d||0!==e){{b.getCenter()}b.panBy(d,e)}}},b.prototype.setBoxStyle_=function(){var a,b;if(this.div_){this.div_.className=this.boxClass_,this.div_.style.cssText="",b=this.boxStyle_;for(a in b)b.hasOwnProperty(a)&&(this.div_.style[a]=b[a]);"undefined"!=typeof this.div_.style.opacity&&""!==this.div_.style.opacity&&(this.div_.style.filter="alpha(opacity="+100*this.div_.style.opacity+")"),this.div_.style.position="absolute",this.div_.style.visibility="hidden",null!==this.zIndex_&&(this.div_.style.zIndex=this.zIndex_)}},b.prototype.getBoxWidths_=function(){var a,b={top:0,bottom:0,left:0,right:0},c=this.div_;return document.defaultView&&document.defaultView.getComputedStyle?(a=c.ownerDocument.defaultView.getComputedStyle(c,""),a&&(b.top=parseInt(a.borderTopWidth,10)||0,b.bottom=parseInt(a.borderBottomWidth,10)||0,b.left=parseInt(a.borderLeftWidth,10)||0,b.right=parseInt(a.borderRightWidth,10)||0)):document.documentElement.currentStyle&&c.currentStyle&&(b.top=parseInt(c.currentStyle.borderTopWidth,10)||0,b.bottom=parseInt(c.currentStyle.borderBottomWidth,10)||0,b.left=parseInt(c.currentStyle.borderLeftWidth,10)||0,b.right=parseInt(c.currentStyle.borderRightWidth,10)||0),b},b.prototype.onRemove=function(){this.div_&&(this.div_.parentNode.removeChild(this.div_),this.div_=null)},b.prototype.draw=function(){this.createInfoBoxDiv_();var a=this.getProjection().fromLatLngToDivPixel(this.position_);this.div_.style.left=a.x+this.pixelOffset_.width+"px",this.alignBottom_?this.div_.style.bottom=-(a.y+this.pixelOffset_.height)+"px":this.div_.style.top=a.y+this.pixelOffset_.height+"px",this.div_.style.visibility=this.isHidden_?"hidden":"visible"},b.prototype.setOptions=function(a){"undefined"!=typeof a.boxClass&&(this.boxClass_=a.boxClass,this.setBoxStyle_()),"undefined"!=typeof a.boxStyle&&(this.boxStyle_=a.boxStyle,this.setBoxStyle_()),"undefined"!=typeof a.content&&this.setContent(a.content),"undefined"!=typeof a.disableAutoPan&&(this.disableAutoPan_=a.disableAutoPan),"undefined"!=typeof a.maxWidth&&(this.maxWidth_=a.maxWidth),"undefined"!=typeof a.pixelOffset&&(this.pixelOffset_=a.pixelOffset),"undefined"!=typeof a.alignBottom&&(this.alignBottom_=a.alignBottom),"undefined"!=typeof a.position&&this.setPosition(a.position),"undefined"!=typeof a.zIndex&&this.setZIndex(a.zIndex),"undefined"!=typeof a.closeBoxMargin&&(this.closeBoxMargin_=a.closeBoxMargin),"undefined"!=typeof a.closeBoxURL&&(this.closeBoxURL_=a.closeBoxURL),"undefined"!=typeof a.infoBoxClearance&&(this.infoBoxClearance_=a.infoBoxClearance),"undefined"!=typeof a.isHidden&&(this.isHidden_=a.isHidden),"undefined"!=typeof a.visible&&(this.isHidden_=!a.visible),"undefined"!=typeof a.enableEventPropagation&&(this.enableEventPropagation_=a.enableEventPropagation),this.div_&&this.draw()},b.prototype.setContent=function(a){this.content_=a,this.div_&&(this.closeListener_&&(google.maps.event.removeListener(this.closeListener_),this.closeListener_=null),this.fixedWidthSet_||(this.div_.style.width=""),"undefined"==typeof a.nodeType?this.div_.innerHTML=this.getCloseBoxImg_()+a:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(a)),this.fixedWidthSet_||(this.div_.style.width=this.div_.offsetWidth+"px","undefined"==typeof a.nodeType?this.div_.innerHTML=this.getCloseBoxImg_()+a:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(a))),this.addClickHandler_()),google.maps.event.trigger(this,"content_changed")},b.prototype.setPosition=function(a){this.position_=a,this.div_&&this.draw(),google.maps.event.trigger(this,"position_changed")},b.prototype.setZIndex=function(a){this.zIndex_=a,this.div_&&(this.div_.style.zIndex=a),google.maps.event.trigger(this,"zindex_changed")},b.prototype.setVisible=function(a){this.isHidden_=!a,this.div_&&(this.div_.style.visibility=this.isHidden_?"hidden":"visible")},b.prototype.getContent=function(){return this.content_},b.prototype.getPosition=function(){return this.position_},b.prototype.getZIndex=function(){return this.zIndex_},b.prototype.getVisible=function(){var a;return a="undefined"==typeof this.getMap()||null===this.getMap()?!1:!this.isHidden_},b.prototype.show=function(){this.isHidden_=!1,this.div_&&(this.div_.style.visibility="visible")},b.prototype.hide=function(){this.isHidden_=!0,this.div_&&(this.div_.style.visibility="hidden")},b.prototype.open=function(a,b){var c=this;b&&(this.position_=b.getPosition(),this.moveListener_=google.maps.event.addListener(b,"position_changed",function(){c.setPosition(this.getPosition())})),this.setMap(a),this.div_&&this.panBox_()},b.prototype.close=function(){var a;if(this.closeListener_&&(google.maps.event.removeListener(this.closeListener_),this.closeListener_=null),this.eventListeners_){for(a=0;a<this.eventListeners_.length;a++)google.maps.event.removeListener(this.eventListeners_[a]);this.eventListeners_=null}this.moveListener_&&(google.maps.event.removeListener(this.moveListener_),this.moveListener_=null),this.contextListener_&&(google.maps.event.removeListener(this.contextListener_),this.contextListener_=null),this.setMap(null)},function(){function b(a,b){var c=this,d=new google.maps.OverlayView;d.onAdd=function(){c.init_(a,b)},d.draw=function(){},d.onRemove=function(){},d.setMap(a),this.prjov_=d}var c=function(a){var b;switch(a){case"thin":b="2px";break;case"medium":b="4px";break;case"thick":b="6px";break;default:b=a}return b},d=function(a){var b,d={};if(document.defaultView&&document.defaultView.getComputedStyle){if(b=a.ownerDocument.defaultView.getComputedStyle(a,""))return d.top=parseInt(b.borderTopWidth,10)||0,d.bottom=parseInt(b.borderBottomWidth,10)||0,d.left=parseInt(b.borderLeftWidth,10)||0,d.right=parseInt(b.borderRightWidth,10)||0,d}else if(document.documentElement.currentStyle&&a.currentStyle)return d.top=parseInt(c(a.currentStyle.borderTopWidth),10)||0,d.bottom=parseInt(c(a.currentStyle.borderBottomWidth),10)||0,d.left=parseInt(c(a.currentStyle.borderLeftWidth),10)||0,d.right=parseInt(c(a.currentStyle.borderRightWidth),10)||0,d;return d.top=parseInt(a.style["border-top-width"],10)||0,d.bottom=parseInt(a.style["border-bottom-width"],10)||0,d.left=parseInt(a.style["border-left-width"],10)||0,d.right=parseInt(a.style["border-right-width"],10)||0,d},e={x:0,y:0},f=function(){e.x="undefined"!=typeof document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft,e.y="undefined"!=typeof document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop};f();var g=function(b){var c=0,d=0;return b=b||a.event,"undefined"!=typeof b.pageX?(c=b.pageX,d=b.pageY):"undefined"!=typeof b.clientX&&(c=b.clientX+e.x,d=b.clientY+e.y),{left:c,top:d}},h=function(b){for(var c=b.offsetLeft,d=b.offsetTop,e=b.offsetParent;null!==e;){e!==document.body&&e!==document.documentElement&&(c-=e.scrollLeft,d-=e.scrollTop);var f=e,g=f.offsetLeft,h=f.offsetTop;if(!g&&!h&&a.getComputedStyle){var i=document.defaultView.getComputedStyle(f,null).MozTransform||document.defaultView.getComputedStyle(f,null).WebkitTransform;if(i&&"string"==typeof i){var j=i.split(",");g+=parseInt(j[4],10)||0,h+=parseInt(j[5],10)||0}}c+=g,d+=h,e=e.offsetParent}return{left:c,top:d}},i=function(a,b){if(a&&b)for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a},j=function(a,b){"undefined"!=typeof b&&(a.style.opacity=b),"undefined"!=typeof a.style.opacity&&""!==a.style.opacity&&(a.style.filter="alpha(opacity="+100*a.style.opacity+")")};b.prototype.init_=function(b,c){var e,g=this;for(this.map_=b,c=c||{},this.key_=c.key||"shift",this.key_=this.key_.toLowerCase(),this.borderWidths_=d(this.map_.getDiv()),this.veilDiv_=[],e=0;4>e;e++)this.veilDiv_[e]=document.createElement("div"),this.veilDiv_[e].onselectstart=function(){return!1},i(this.veilDiv_[e].style,{backgroundColor:"gray",opacity:.25,cursor:"crosshair"}),i(this.veilDiv_[e].style,c.paneStyle),i(this.veilDiv_[e].style,c.veilStyle),i(this.veilDiv_[e].style,{position:"absolute",overflow:"hidden",display:"none"}),"shift"===this.key_&&(this.veilDiv_[e].style.MozUserSelect="none"),j(this.veilDiv_[e]),"transparent"===this.veilDiv_[e].style.backgroundColor&&(this.veilDiv_[e].style.backgroundColor="white",j(this.veilDiv_[e],0)),this.map_.getDiv().appendChild(this.veilDiv_[e]);this.noZoom_=c.noZoom||!1,this.visualEnabled_=c.visualEnabled||!1,this.visualClass_=c.visualClass||"",this.visualPosition_=c.visualPosition||google.maps.ControlPosition.LEFT_TOP,this.visualPositionOffset_=c.visualPositionOffset||new google.maps.Size(35,0),this.visualPositionIndex_=c.visualPositionIndex||null,this.visualSprite_=c.visualSprite||"http"+("https:"===document.location.protocol?"s":"")+"://maps.gstatic.com/mapfiles/ftr/controls/dragzoom_btn.png",this.visualSize_=c.visualSize||new google.maps.Size(20,20),this.visualTips_=c.visualTips||{},this.visualTips_.off=this.visualTips_.off||"Turn on drag zoom mode",this.visualTips_.on=this.visualTips_.on||"Turn off drag zoom mode",this.boxDiv_=document.createElement("div"),i(this.boxDiv_.style,{border:"4px solid #736AFF"}),i(this.boxDiv_.style,c.boxStyle),i(this.boxDiv_.style,{position:"absolute",display:"none"}),j(this.boxDiv_),this.map_.getDiv().appendChild(this.boxDiv_),this.boxBorderWidths_=d(this.boxDiv_),this.listeners_=[google.maps.event.addDomListener(document,"keydown",function(a){g.onKeyDown_(a)}),google.maps.event.addDomListener(document,"keyup",function(a){g.onKeyUp_(a)}),google.maps.event.addDomListener(this.veilDiv_[0],"mousedown",function(a){g.onMouseDown_(a)}),google.maps.event.addDomListener(this.veilDiv_[1],"mousedown",function(a){g.onMouseDown_(a)}),google.maps.event.addDomListener(this.veilDiv_[2],"mousedown",function(a){g.onMouseDown_(a)}),google.maps.event.addDomListener(this.veilDiv_[3],"mousedown",function(a){g.onMouseDown_(a)}),google.maps.event.addDomListener(document,"mousedown",function(a){g.onMouseDownDocument_(a)}),google.maps.event.addDomListener(document,"mousemove",function(a){g.onMouseMove_(a)}),google.maps.event.addDomListener(document,"mouseup",function(a){g.onMouseUp_(a)}),google.maps.event.addDomListener(a,"scroll",f)],this.hotKeyDown_=!1,this.mouseDown_=!1,this.dragging_=!1,this.startPt_=null,this.endPt_=null,this.mapWidth_=null,this.mapHeight_=null,this.mousePosn_=null,this.mapPosn_=null,this.visualEnabled_&&(this.buttonDiv_=this.initControl_(this.visualPositionOffset_),null!==this.visualPositionIndex_&&(this.buttonDiv_.index=this.visualPositionIndex_),this.map_.controls[this.visualPosition_].push(this.buttonDiv_),this.controlIndex_=this.map_.controls[this.visualPosition_].length-1)},b.prototype.initControl_=function(a){var b,c,d=this;return b=document.createElement("div"),b.className=this.visualClass_,b.style.position="relative",b.style.overflow="hidden",b.style.height=this.visualSize_.height+"px",b.style.width=this.visualSize_.width+"px",b.title=this.visualTips_.off,c=document.createElement("img"),c.src=this.visualSprite_,c.style.position="absolute",c.style.left=-(2*this.visualSize_.width)+"px",c.style.top="0px",b.appendChild(c),b.onclick=function(a){d.hotKeyDown_=!d.hotKeyDown_,d.hotKeyDown_?(d.buttonDiv_.firstChild.style.left=-(0*d.visualSize_.width)+"px",d.buttonDiv_.title=d.visualTips_.on,d.activatedByControl_=!0,google.maps.event.trigger(d,"activate")):(d.buttonDiv_.firstChild.style.left=-(2*d.visualSize_.width)+"px",d.buttonDiv_.title=d.visualTips_.off,google.maps.event.trigger(d,"deactivate")),d.onMouseMove_(a)},b.onmouseover=function(){d.buttonDiv_.firstChild.style.left=-(1*d.visualSize_.width)+"px"},b.onmouseout=function(){d.hotKeyDown_?(d.buttonDiv_.firstChild.style.left=-(0*d.visualSize_.width)+"px",d.buttonDiv_.title=d.visualTips_.on):(d.buttonDiv_.firstChild.style.left=-(2*d.visualSize_.width)+"px",d.buttonDiv_.title=d.visualTips_.off)},b.ondragstart=function(){return!1},i(b.style,{cursor:"pointer",marginTop:a.height+"px",marginLeft:a.width+"px"}),b},b.prototype.isHotKeyDown_=function(b){var c;if(b=b||a.event,c=b.shiftKey&&"shift"===this.key_||b.altKey&&"alt"===this.key_||b.ctrlKey&&"ctrl"===this.key_,!c)switch(b.keyCode){case 16:"shift"===this.key_&&(c=!0);break;case 17:"ctrl"===this.key_&&(c=!0);break;case 18:"alt"===this.key_&&(c=!0)}return c},b.prototype.isMouseOnMap_=function(){var a=this.mousePosn_;if(a){var b=this.mapPosn_,c=this.map_.getDiv();return a.left>b.left&&a.left<b.left+c.offsetWidth&&a.top>b.top&&a.top<b.top+c.offsetHeight}return!1},b.prototype.setVeilVisibility_=function(){var a;if(this.map_&&this.hotKeyDown_&&this.isMouseOnMap_()){var b=this.map_.getDiv();if(this.mapWidth_=b.offsetWidth-(this.borderWidths_.left+this.borderWidths_.right),this.mapHeight_=b.offsetHeight-(this.borderWidths_.top+this.borderWidths_.bottom),this.activatedByControl_){var c=parseInt(this.buttonDiv_.style.left,10)+this.visualPositionOffset_.width,d=parseInt(this.buttonDiv_.style.top,10)+this.visualPositionOffset_.height,e=this.visualSize_.width,f=this.visualSize_.height;for(this.veilDiv_[0].style.top="0px",this.veilDiv_[0].style.left="0px",this.veilDiv_[0].style.width=c+"px",this.veilDiv_[0].style.height=this.mapHeight_+"px",this.veilDiv_[1].style.top="0px",this.veilDiv_[1].style.left=c+e+"px",this.veilDiv_[1].style.width=this.mapWidth_-(c+e)+"px",this.veilDiv_[1].style.height=this.mapHeight_+"px",this.veilDiv_[2].style.top="0px",this.veilDiv_[2].style.left=c+"px",this.veilDiv_[2].style.width=e+"px",this.veilDiv_[2].style.height=d+"px",this.veilDiv_[3].style.top=d+f+"px",this.veilDiv_[3].style.left=c+"px",this.veilDiv_[3].style.width=e+"px",this.veilDiv_[3].style.height=this.mapHeight_-(d+f)+"px",a=0;a<this.veilDiv_.length;a++)this.veilDiv_[a].style.display="block"}else{for(this.veilDiv_[0].style.left="0px",this.veilDiv_[0].style.top="0px",this.veilDiv_[0].style.width=this.mapWidth_+"px",this.veilDiv_[0].style.height=this.mapHeight_+"px",a=1;a<this.veilDiv_.length;a++)this.veilDiv_[a].style.width="0px",this.veilDiv_[a].style.height="0px";for(a=0;a<this.veilDiv_.length;a++)this.veilDiv_[a].style.display="block"}}else for(a=0;a<this.veilDiv_.length;a++)this.veilDiv_[a].style.display="none"},b.prototype.onKeyDown_=function(a){this.map_&&!this.hotKeyDown_&&this.isHotKeyDown_(a)&&(this.mapPosn_=h(this.map_.getDiv()),this.hotKeyDown_=!0,this.activatedByControl_=!1,this.setVeilVisibility_(),google.maps.event.trigger(this,"activate"))},b.prototype.getMousePoint_=function(a){var b=g(a),c=new google.maps.Point;return c.x=b.left-this.mapPosn_.left-this.borderWidths_.left,c.y=b.top-this.mapPosn_.top-this.borderWidths_.top,c.x=Math.min(c.x,this.mapWidth_),c.y=Math.min(c.y,this.mapHeight_),c.x=Math.max(c.x,0),c.y=Math.max(c.y,0),c},b.prototype.onMouseDown_=function(a){if(this.map_&&this.hotKeyDown_){this.mapPosn_=h(this.map_.getDiv()),this.dragging_=!0,this.startPt_=this.endPt_=this.getMousePoint_(a),this.boxDiv_.style.width=this.boxDiv_.style.height="0px";var b=this.prjov_.getProjection(),c=b.fromContainerPixelToLatLng(this.startPt_);google.maps.event.trigger(this,"dragstart",c)}},b.prototype.onMouseDownDocument_=function(){this.mouseDown_=!0},b.prototype.onMouseMove_=function(a){if(this.mousePosn_=g(a),this.dragging_){this.endPt_=this.getMousePoint_(a);var b=Math.min(this.startPt_.x,this.endPt_.x),c=Math.min(this.startPt_.y,this.endPt_.y),d=Math.abs(this.startPt_.x-this.endPt_.x),e=Math.abs(this.startPt_.y-this.endPt_.y),f=Math.max(0,d-(this.boxBorderWidths_.left+this.boxBorderWidths_.right)),i=Math.max(0,e-(this.boxBorderWidths_.top+this.boxBorderWidths_.bottom));this.veilDiv_[0].style.top="0px",this.veilDiv_[0].style.left="0px",this.veilDiv_[0].style.width=b+"px",this.veilDiv_[0].style.height=this.mapHeight_+"px",this.veilDiv_[1].style.top="0px",this.veilDiv_[1].style.left=b+d+"px",this.veilDiv_[1].style.width=this.mapWidth_-(b+d)+"px",this.veilDiv_[1].style.height=this.mapHeight_+"px",this.veilDiv_[2].style.top="0px",this.veilDiv_[2].style.left=b+"px",this.veilDiv_[2].style.width=d+"px",this.veilDiv_[2].style.height=c+"px",this.veilDiv_[3].style.top=c+e+"px",this.veilDiv_[3].style.left=b+"px",this.veilDiv_[3].style.width=d+"px",this.veilDiv_[3].style.height=this.mapHeight_-(c+e)+"px",this.boxDiv_.style.top=c+"px",this.boxDiv_.style.left=b+"px",this.boxDiv_.style.width=f+"px",this.boxDiv_.style.height=i+"px",this.boxDiv_.style.display="block",google.maps.event.trigger(this,"drag",new google.maps.Point(b,c+e),new google.maps.Point(b+d,c),this.prjov_.getProjection())}else this.mouseDown_||(this.mapPosn_=h(this.map_.getDiv()),this.setVeilVisibility_())},b.prototype.onMouseUp_=function(a){var b,c=this;if(this.mouseDown_=!1,this.dragging_){if(this.getMousePoint_(a).x===this.startPt_.x&&this.getMousePoint_(a).y===this.startPt_.y)return void this.onKeyUp_(a);var d=Math.min(this.startPt_.x,this.endPt_.x),e=Math.min(this.startPt_.y,this.endPt_.y),f=Math.abs(this.startPt_.x-this.endPt_.x),g=Math.abs(this.startPt_.y-this.endPt_.y),h=!0;h&&(d+=this.borderWidths_.left,e+=this.borderWidths_.top);var i=this.prjov_.getProjection(),j=i.fromContainerPixelToLatLng(new google.maps.Point(d,e+g)),k=i.fromContainerPixelToLatLng(new google.maps.Point(d+f,e)),l=new google.maps.LatLngBounds(j,k);if(this.noZoom_)this.boxDiv_.style.display="none";else{b=this.map_.getZoom(),this.map_.fitBounds(l),this.map_.getZoom()<b&&this.map_.setZoom(b);var m=i.fromLatLngToContainerPixel(j),n=i.fromLatLngToContainerPixel(k);h&&(m.x-=this.borderWidths_.left,m.y-=this.borderWidths_.top,n.x-=this.borderWidths_.left,n.y-=this.borderWidths_.top),this.boxDiv_.style.left=m.x+"px",this.boxDiv_.style.top=n.y+"px",this.boxDiv_.style.width=Math.abs(n.x-m.x)-(this.boxBorderWidths_.left+this.boxBorderWidths_.right)+"px",this.boxDiv_.style.height=Math.abs(n.y-m.y)-(this.boxBorderWidths_.top+this.boxBorderWidths_.bottom)+"px",setTimeout(function(){c.boxDiv_.style.display="none"},1e3)}this.dragging_=!1,this.onMouseMove_(a),google.maps.event.trigger(this,"dragend",l),this.isHotKeyDown_(a)||this.onKeyUp_(a)}},b.prototype.onKeyUp_=function(){var a,b,c,d,e,f,g,h,i=null;if(this.map_&&this.hotKeyDown_){for(this.hotKeyDown_=!1,this.dragging_&&(this.boxDiv_.style.display="none",this.dragging_=!1,b=Math.min(this.startPt_.x,this.endPt_.x),c=Math.min(this.startPt_.y,this.endPt_.y),d=Math.abs(this.startPt_.x-this.endPt_.x),e=Math.abs(this.startPt_.y-this.endPt_.y),f=this.prjov_.getProjection(),g=f.fromContainerPixelToLatLng(new google.maps.Point(b,c+e)),h=f.fromContainerPixelToLatLng(new google.maps.Point(b+d,c)),i=new google.maps.LatLngBounds(g,h)),a=0;a<this.veilDiv_.length;a++)this.veilDiv_[a].style.display="none";this.visualEnabled_&&(this.buttonDiv_.firstChild.style.left=-(2*this.visualSize_.width)+"px",this.buttonDiv_.title=this.visualTips_.off,this.buttonDiv_.style.display=""),google.maps.event.trigger(this,"deactivate",i)}},google.maps.Map.prototype.enableKeyDragZoom=function(a){this.dragZoom_=new b(this,a)},google.maps.Map.prototype.disableKeyDragZoom=function(){var a,b=this.dragZoom_;if(b){for(a=0;a<b.listeners_.length;++a)google.maps.event.removeListener(b.listeners_[a]);for(this.getDiv().removeChild(b.boxDiv_),a=0;a<b.veilDiv_.length;a++)this.getDiv().removeChild(b.veilDiv_[a]);b.visualEnabled_&&this.controls[b.visualPosition_].removeAt(b.controlIndex_),b.prjov_.setMap(null),this.dragZoom_=null}},google.maps.Map.prototype.keyDragZoomEnabled=function(){return null!==this.dragZoom_},google.maps.Map.prototype.getDragZoomObject=function(){return this.dragZoom_}}(),d.prototype.onAdd=function(){var a,b,c=this;this.div_=document.createElement("div"),this.div_.className=this.className_,this.visible_&&this.show(),this.getPanes().overlayMouseTarget.appendChild(this.div_),this.boundsChangedListener_=google.maps.event.addListener(this.getMap(),"bounds_changed",function(){b=a}),google.maps.event.addDomListener(this.div_,"mousedown",function(){a=!0,b=!1}),google.maps.event.addDomListener(this.div_,"click",function(d){if(a=!1,!b){var e,f,g=c.cluster_.getMarkerClusterer();google.maps.event.trigger(g,"click",c.cluster_),google.maps.event.trigger(g,"clusterclick",c.cluster_),g.getZoomOnClick()&&(f=g.getMaxZoom(),e=c.cluster_.getBounds(),g.getMap().fitBounds(e),setTimeout(function(){g.getMap().fitBounds(e),null!==f&&g.getMap().getZoom()>f&&g.getMap().setZoom(f+1)},100)),d.cancelBubble=!0,d.stopPropagation&&d.stopPropagation()}}),google.maps.event.addDomListener(this.div_,"mouseover",function(){var a=c.cluster_.getMarkerClusterer();google.maps.event.trigger(a,"mouseover",c.cluster_)}),google.maps.event.addDomListener(this.div_,"mouseout",function(){var a=c.cluster_.getMarkerClusterer();google.maps.event.trigger(a,"mouseout",c.cluster_)})},d.prototype.onRemove=function(){this.div_&&this.div_.parentNode&&(this.hide(),google.maps.event.removeListener(this.boundsChangedListener_),google.maps.event.clearInstanceListeners(this.div_),this.div_.parentNode.removeChild(this.div_),this.div_=null)},d.prototype.draw=function(){if(this.visible_){var a=this.getPosFromLatLng_(this.center_);this.div_.style.top=a.y+"px",this.div_.style.left=a.x+"px"}},d.prototype.hide=function(){this.div_&&(this.div_.style.display="none"),this.visible_=!1},d.prototype.show=function(){if(this.div_){var a="",b=this.backgroundPosition_.split(" "),c=parseInt(b[0].trim(),10),d=parseInt(b[1].trim(),10),e=this.getPosFromLatLng_(this.center_);this.div_.style.cssText=this.createCss(e),a="<img src='"+this.url_+"' style='position: absolute; top: "+d+"px; left: "+c+"px; ",this.cluster_.getMarkerClusterer().enableRetinaIcons_||(a+="clip: rect("+-1*d+"px, "+(-1*c+this.width_)+"px, "+(-1*d+this.height_)+"px, "+-1*c+"px);"),a+="'>",this.div_.innerHTML=a+"<div style='position: absolute;top: "+this.anchorText_[0]+"px;left: "+this.anchorText_[1]+"px;color: "+this.textColor_+";font-size: "+this.textSize_+"px;font-family: "+this.fontFamily_+";font-weight: "+this.fontWeight_+";font-style: "+this.fontStyle_+";text-decoration: "+this.textDecoration_+";text-align: center;width: "+this.width_+"px;line-height:"+this.height_+"px;'>"+this.sums_.text+"</div>",this.div_.title="undefined"==typeof this.sums_.title||""===this.sums_.title?this.cluster_.getMarkerClusterer().getTitle():this.sums_.title,this.div_.style.display=""}this.visible_=!0},d.prototype.useStyle=function(a){this.sums_=a;var b=Math.max(0,a.index-1);b=Math.min(this.styles_.length-1,b);var c=this.styles_[b];this.url_=c.url,this.height_=c.height,this.width_=c.width,this.anchorText_=c.anchorText||[0,0],this.anchorIcon_=c.anchorIcon||[parseInt(this.height_/2,10),parseInt(this.width_/2,10)],this.textColor_=c.textColor||"black",this.textSize_=c.textSize||11,this.textDecoration_=c.textDecoration||"none",this.fontWeight_=c.fontWeight||"bold",this.fontStyle_=c.fontStyle||"normal",this.fontFamily_=c.fontFamily||"Arial,sans-serif",this.backgroundPosition_=c.backgroundPosition||"0 0"},d.prototype.setCenter=function(a){this.center_=a},d.prototype.createCss=function(a){var b=[];return b.push("cursor: pointer;"),b.push("position: absolute; top: "+a.y+"px; left: "+a.x+"px;"),b.push("width: "+this.width_+"px; height: "+this.height_+"px;"),b.join("")},d.prototype.getPosFromLatLng_=function(a){var b=this.getProjection().fromLatLngToDivPixel(a);return b.x-=this.anchorIcon_[1],b.y-=this.anchorIcon_[0],b.x=parseInt(b.x,10),b.y=parseInt(b.y,10),b},e.prototype.getSize=function(){return this.markers_.length},e.prototype.getMarkers=function(){return this.markers_},e.prototype.getCenter=function(){return this.center_},e.prototype.getMap=function(){return this.map_},e.prototype.getMarkerClusterer=function(){return this.markerClusterer_},e.prototype.getBounds=function(){var a,b=new google.maps.LatLngBounds(this.center_,this.center_),c=this.getMarkers();for(a=0;a<c.length;a++)b.extend(c[a].getPosition());return b},e.prototype.remove=function(){this.clusterIcon_.setMap(null),this.markers_=[],delete this.markers_},e.prototype.addMarker=function(a){var b,c,d;if(this.isMarkerAlreadyAdded_(a))return!1;if(this.center_){if(this.averageCenter_){var e=this.markers_.length+1,f=(this.center_.lat()*(e-1)+a.getPosition().lat())/e,g=(this.center_.lng()*(e-1)+a.getPosition().lng())/e;this.center_=new google.maps.LatLng(f,g),this.calculateBounds_()}}else this.center_=a.getPosition(),this.calculateBounds_();if(a.isAdded=!0,this.markers_.push(a),c=this.markers_.length,d=this.markerClusterer_.getMaxZoom(),null!==d&&this.map_.getZoom()>d)a.getMap()!==this.map_&&a.setMap(this.map_);else if(c<this.minClusterSize_)a.getMap()!==this.map_&&a.setMap(this.map_);else if(c===this.minClusterSize_)for(b=0;c>b;b++)this.markers_[b].setMap(null);else a.setMap(null);return this.updateIcon_(),!0},e.prototype.isMarkerInClusterBounds=function(a){return this.bounds_.contains(a.getPosition())},e.prototype.calculateBounds_=function(){var a=new google.maps.LatLngBounds(this.center_,this.center_);this.bounds_=this.markerClusterer_.getExtendedBounds(a)},e.prototype.updateIcon_=function(){var a=this.markers_.length,b=this.markerClusterer_.getMaxZoom();if(null!==b&&this.map_.getZoom()>b)return void this.clusterIcon_.hide();if(a<this.minClusterSize_)return void this.clusterIcon_.hide();var c=this.markerClusterer_.getStyles().length,d=this.markerClusterer_.getCalculator()(this.markers_,c);this.clusterIcon_.setCenter(this.center_),this.clusterIcon_.useStyle(d),this.clusterIcon_.show()},e.prototype.isMarkerAlreadyAdded_=function(a){var b;if(this.markers_.indexOf)return-1!==this.markers_.indexOf(a);for(b=0;b<this.markers_.length;b++)if(a===this.markers_[b])return!0;return!1},f.prototype.onAdd=function(){var a=this;this.activeMap_=this.getMap(),this.ready_=!0,this.repaint(),this.listeners_=[google.maps.event.addListener(this.getMap(),"zoom_changed",function(){a.resetViewport_(!1),(this.getZoom()===(this.get("minZoom")||0)||this.getZoom()===this.get("maxZoom"))&&google.maps.event.trigger(this,"idle")}),google.maps.event.addListener(this.getMap(),"idle",function(){a.redraw_()})]},f.prototype.onRemove=function(){var a;for(a=0;a<this.markers_.length;a++)this.markers_[a].getMap()!==this.activeMap_&&this.markers_[a].setMap(this.activeMap_);for(a=0;a<this.clusters_.length;a++)this.clusters_[a].remove();for(this.clusters_=[],a=0;a<this.listeners_.length;a++)google.maps.event.removeListener(this.listeners_[a]);this.listeners_=[],this.activeMap_=null,this.ready_=!1},f.prototype.draw=function(){},f.prototype.setupStyles_=function(){var a,b;if(!(this.styles_.length>0))for(a=0;a<this.imageSizes_.length;a++)b=this.imageSizes_[a],this.styles_.push({url:this.imagePath_+(a+1)+"."+this.imageExtension_,height:b,width:b})},f.prototype.fitMapToMarkers=function(){var a,b=this.getMarkers(),c=new google.maps.LatLngBounds;for(a=0;a<b.length;a++)c.extend(b[a].getPosition());this.getMap().fitBounds(c)},f.prototype.getGridSize=function(){return this.gridSize_},f.prototype.setGridSize=function(a){this.gridSize_=a},f.prototype.getMinimumClusterSize=function(){return this.minClusterSize_},f.prototype.setMinimumClusterSize=function(a){this.minClusterSize_=a},f.prototype.getMaxZoom=function(){return this.maxZoom_},f.prototype.setMaxZoom=function(a){this.maxZoom_=a},f.prototype.getStyles=function(){return this.styles_},f.prototype.setStyles=function(a){this.styles_=a},f.prototype.getTitle=function(){return this.title_},f.prototype.setTitle=function(a){this.title_=a},f.prototype.getZoomOnClick=function(){return this.zoomOnClick_},f.prototype.setZoomOnClick=function(a){this.zoomOnClick_=a},f.prototype.getAverageCenter=function(){return this.averageCenter_},f.prototype.setAverageCenter=function(a){this.averageCenter_=a},f.prototype.getIgnoreHidden=function(){return this.ignoreHidden_},f.prototype.setIgnoreHidden=function(a){this.ignoreHidden_=a},f.prototype.getEnableRetinaIcons=function(){return this.enableRetinaIcons_},f.prototype.setEnableRetinaIcons=function(a){this.enableRetinaIcons_=a},f.prototype.getImageExtension=function(){return this.imageExtension_},f.prototype.setImageExtension=function(a){this.imageExtension_=a},f.prototype.getImagePath=function(){return this.imagePath_},f.prototype.setImagePath=function(a){this.imagePath_=a},f.prototype.getImageSizes=function(){return this.imageSizes_},f.prototype.setImageSizes=function(a){this.imageSizes_=a},f.prototype.getCalculator=function(){return this.calculator_},f.prototype.setCalculator=function(a){this.calculator_=a},f.prototype.getBatchSizeIE=function(){return this.batchSizeIE_},f.prototype.setBatchSizeIE=function(a){this.batchSizeIE_=a},f.prototype.getClusterClass=function(){return this.clusterClass_},f.prototype.setClusterClass=function(a){this.clusterClass_=a},f.prototype.getMarkers=function(){return this.markers_},f.prototype.getTotalMarkers=function(){return this.markers_.length},f.prototype.getClusters=function(){return this.clusters_},f.prototype.getTotalClusters=function(){return this.clusters_.length},f.prototype.addMarker=function(a,b){this.pushMarkerTo_(a),b||this.redraw_()},f.prototype.addMarkers=function(a,b){var c;for(c in a)a.hasOwnProperty(c)&&this.pushMarkerTo_(a[c]);b||this.redraw_()},f.prototype.pushMarkerTo_=function(a){if(a.getDraggable()){var b=this;google.maps.event.addListener(a,"dragend",function(){b.ready_&&(this.isAdded=!1,b.repaint())})}a.isAdded=!1,this.markers_.push(a)},f.prototype.removeMarker=function(a,b){var c=this.removeMarker_(a);return!b&&c&&this.repaint(),c},f.prototype.removeMarkers=function(a,b){var c,d,e=!1;for(c=0;c<a.length;c++)d=this.removeMarker_(a[c]),e=e||d;return!b&&e&&this.repaint(),e},f.prototype.removeMarker_=function(a){var b,c=-1;if(this.markers_.indexOf)c=this.markers_.indexOf(a);else for(b=0;b<this.markers_.length;b++)if(a===this.markers_[b]){c=b;break}return-1===c?!1:(a.setMap(null),this.markers_.splice(c,1),!0)},f.prototype.clearMarkers=function(){this.resetViewport_(!0),this.markers_=[]},f.prototype.repaint=function(){var a=this.clusters_.slice();this.clusters_=[],this.resetViewport_(!1),this.redraw_(),setTimeout(function(){var b;for(b=0;b<a.length;b++)a[b].remove()},0)},f.prototype.getExtendedBounds=function(a){var b=this.getProjection(),c=new google.maps.LatLng(a.getNorthEast().lat(),a.getNorthEast().lng()),d=new google.maps.LatLng(a.getSouthWest().lat(),a.getSouthWest().lng()),e=b.fromLatLngToDivPixel(c);e.x+=this.gridSize_,e.y-=this.gridSize_;var f=b.fromLatLngToDivPixel(d);f.x-=this.gridSize_,f.y+=this.gridSize_;var g=b.fromDivPixelToLatLng(e),h=b.fromDivPixelToLatLng(f);return a.extend(g),a.extend(h),a},f.prototype.redraw_=function(){this.createClusters_(0)},f.prototype.resetViewport_=function(a){var b,c;for(b=0;b<this.clusters_.length;b++)this.clusters_[b].remove();for(this.clusters_=[],b=0;b<this.markers_.length;b++)c=this.markers_[b],c.isAdded=!1,a&&c.setMap(null)
},f.prototype.distanceBetweenPoints_=function(a,b){var c=6371,d=(b.lat()-a.lat())*Math.PI/180,e=(b.lng()-a.lng())*Math.PI/180,f=Math.sin(d/2)*Math.sin(d/2)+Math.cos(a.lat()*Math.PI/180)*Math.cos(b.lat()*Math.PI/180)*Math.sin(e/2)*Math.sin(e/2),g=2*Math.atan2(Math.sqrt(f),Math.sqrt(1-f)),h=c*g;return h},f.prototype.isMarkerInBounds_=function(a,b){return b.contains(a.getPosition())},f.prototype.addToClosestCluster_=function(a){var b,c,d,f,g=4e4,h=null;for(b=0;b<this.clusters_.length;b++)d=this.clusters_[b],f=d.getCenter(),f&&(c=this.distanceBetweenPoints_(f,a.getPosition()),g>c&&(g=c,h=d));h&&h.isMarkerInClusterBounds(a)?h.addMarker(a):(d=new e(this),d.addMarker(a),this.clusters_.push(d))},f.prototype.createClusters_=function(a){var b,c,d,e=this;if(this.ready_){0===a&&(google.maps.event.trigger(this,"clusteringbegin",this),"undefined"!=typeof this.timerRefStatic&&(clearTimeout(this.timerRefStatic),delete this.timerRefStatic)),d=this.getMap().getZoom()>3?new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(),this.getMap().getBounds().getNorthEast()):new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472,-178.48388434375),new google.maps.LatLng(-85.08136444384544,178.00048865625));var f=this.getExtendedBounds(d),g=Math.min(a+this.batchSize_,this.markers_.length);for(b=a;g>b;b++)c=this.markers_[b],!c.isAdded&&this.isMarkerInBounds_(c,f)&&(!this.ignoreHidden_||this.ignoreHidden_&&c.getVisible())&&this.addToClosestCluster_(c);g<this.markers_.length?this.timerRefStatic=setTimeout(function(){e.createClusters_(g)},0):(delete this.timerRefStatic,google.maps.event.trigger(this,"clusteringend",this))}},f.prototype.extend=function(a,b){return function(a){var b;for(b in a.prototype)this.prototype[b]=a.prototype[b];return this}.apply(a,[b])},f.CALCULATOR=function(a,b){for(var c=0,d="",e=a.length.toString(),f=e;0!==f;)f=parseInt(f/10,10),c++;return c=Math.min(c,b),{text:e,index:c,title:d}},f.BATCH_SIZE=2e3,f.BATCH_SIZE_IE=500,f.IMAGE_PATH="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclustererplus/images/m",f.IMAGE_EXTENSION="png",f.IMAGE_SIZES=[53,56,66,78,90],g(h,google.maps.OverlayView),h.getSharedCross=function(a){var b;return"undefined"==typeof h.getSharedCross.crossDiv&&(b=document.createElement("img"),b.style.cssText="position: absolute; z-index: 1000002; display: none;",b.style.marginLeft="-8px",b.style.marginTop="-9px",b.src=a,h.getSharedCross.crossDiv=b),h.getSharedCross.crossDiv},h.prototype.onAdd=function(){var a,b,c,d,e,f,g,i=this,j=!1,k=!1,l=20,m="url("+this.handCursorURL_+")",n=function(a){a.preventDefault&&a.preventDefault(),a.cancelBubble=!0,a.stopPropagation&&a.stopPropagation()},o=function(){i.marker_.setAnimation(null)};this.getPanes().overlayImage.appendChild(this.labelDiv_),this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_),"undefined"==typeof h.getSharedCross.processed&&(this.getPanes().overlayImage.appendChild(this.crossDiv_),h.getSharedCross.processed=!0),this.listeners_=[google.maps.event.addDomListener(this.eventDiv_,"mouseover",function(a){(i.marker_.getDraggable()||i.marker_.getClickable())&&(this.style.cursor="pointer",google.maps.event.trigger(i.marker_,"mouseover",a))}),google.maps.event.addDomListener(this.eventDiv_,"mouseout",function(a){!i.marker_.getDraggable()&&!i.marker_.getClickable()||k||(this.style.cursor=i.marker_.getCursor(),google.maps.event.trigger(i.marker_,"mouseout",a))}),google.maps.event.addDomListener(this.eventDiv_,"mousedown",function(a){k=!1,i.marker_.getDraggable()&&(j=!0,this.style.cursor=m),(i.marker_.getDraggable()||i.marker_.getClickable())&&(google.maps.event.trigger(i.marker_,"mousedown",a),n(a))}),google.maps.event.addDomListener(document,"mouseup",function(b){var c;if(j&&(j=!1,i.eventDiv_.style.cursor="pointer",google.maps.event.trigger(i.marker_,"mouseup",b)),k){if(e){c=i.getProjection().fromLatLngToDivPixel(i.marker_.getPosition()),c.y+=l,i.marker_.setPosition(i.getProjection().fromDivPixelToLatLng(c));try{i.marker_.setAnimation(google.maps.Animation.BOUNCE),setTimeout(o,1406)}catch(f){}}i.crossDiv_.style.display="none",i.marker_.setZIndex(a),d=!0,k=!1,b.latLng=i.marker_.getPosition(),google.maps.event.trigger(i.marker_,"dragend",b)}}),google.maps.event.addListener(i.marker_.getMap(),"mousemove",function(d){var h;j&&(k?(d.latLng=new google.maps.LatLng(d.latLng.lat()-b,d.latLng.lng()-c),h=i.getProjection().fromLatLngToDivPixel(d.latLng),e&&(i.crossDiv_.style.left=h.x+"px",i.crossDiv_.style.top=h.y+"px",i.crossDiv_.style.display="",h.y-=l),i.marker_.setPosition(i.getProjection().fromDivPixelToLatLng(h)),e&&(i.eventDiv_.style.top=h.y+l+"px"),google.maps.event.trigger(i.marker_,"drag",d)):(b=d.latLng.lat()-i.marker_.getPosition().lat(),c=d.latLng.lng()-i.marker_.getPosition().lng(),a=i.marker_.getZIndex(),f=i.marker_.getPosition(),g=i.marker_.getMap().getCenter(),e=i.marker_.get("raiseOnDrag"),k=!0,i.marker_.setZIndex(1e6),d.latLng=i.marker_.getPosition(),google.maps.event.trigger(i.marker_,"dragstart",d)))}),google.maps.event.addDomListener(document,"keydown",function(a){k&&27===a.keyCode&&(e=!1,i.marker_.setPosition(f),i.marker_.getMap().setCenter(g),google.maps.event.trigger(document,"mouseup",a))}),google.maps.event.addDomListener(this.eventDiv_,"click",function(a){(i.marker_.getDraggable()||i.marker_.getClickable())&&(d?d=!1:(google.maps.event.trigger(i.marker_,"click",a),n(a)))}),google.maps.event.addDomListener(this.eventDiv_,"dblclick",function(a){(i.marker_.getDraggable()||i.marker_.getClickable())&&(google.maps.event.trigger(i.marker_,"dblclick",a),n(a))}),google.maps.event.addListener(this.marker_,"dragstart",function(){k||(e=this.get("raiseOnDrag"))}),google.maps.event.addListener(this.marker_,"drag",function(){k||e&&(i.setPosition(l),i.labelDiv_.style.zIndex=1e6+(this.get("labelInBackground")?-1:1))}),google.maps.event.addListener(this.marker_,"dragend",function(){k||e&&i.setPosition(0)}),google.maps.event.addListener(this.marker_,"position_changed",function(){i.setPosition()}),google.maps.event.addListener(this.marker_,"zindex_changed",function(){i.setZIndex()}),google.maps.event.addListener(this.marker_,"visible_changed",function(){i.setVisible()}),google.maps.event.addListener(this.marker_,"labelvisible_changed",function(){i.setVisible()}),google.maps.event.addListener(this.marker_,"title_changed",function(){i.setTitle()}),google.maps.event.addListener(this.marker_,"labelcontent_changed",function(){i.setContent()}),google.maps.event.addListener(this.marker_,"labelanchor_changed",function(){i.setAnchor()}),google.maps.event.addListener(this.marker_,"labelclass_changed",function(){i.setStyles()}),google.maps.event.addListener(this.marker_,"labelstyle_changed",function(){i.setStyles()})]},h.prototype.onRemove=function(){var a;for(this.labelDiv_.parentNode.removeChild(this.labelDiv_),this.eventDiv_.parentNode.removeChild(this.eventDiv_),a=0;a<this.listeners_.length;a++)google.maps.event.removeListener(this.listeners_[a])},h.prototype.draw=function(){this.setContent(),this.setTitle(),this.setStyles()},h.prototype.setContent=function(){var a=this.marker_.get("labelContent");"undefined"==typeof a.nodeType?(this.labelDiv_.innerHTML=a,this.eventDiv_.innerHTML=this.labelDiv_.innerHTML):(this.labelDiv_.innerHTML="",this.labelDiv_.appendChild(a),a=a.cloneNode(!0),this.eventDiv_.appendChild(a))},h.prototype.setTitle=function(){this.eventDiv_.title=this.marker_.getTitle()||""},h.prototype.setStyles=function(){var a,b;this.labelDiv_.className=this.marker_.get("labelClass"),this.eventDiv_.className=this.labelDiv_.className,this.labelDiv_.style.cssText="",this.eventDiv_.style.cssText="",b=this.marker_.get("labelStyle");for(a in b)b.hasOwnProperty(a)&&(this.labelDiv_.style[a]=b[a],this.eventDiv_.style[a]=b[a]);this.setMandatoryStyles()},h.prototype.setMandatoryStyles=function(){this.labelDiv_.style.position="absolute",this.labelDiv_.style.overflow="hidden","undefined"!=typeof this.labelDiv_.style.opacity&&""!==this.labelDiv_.style.opacity&&(this.labelDiv_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(opacity='+100*this.labelDiv_.style.opacity+')"',this.labelDiv_.style.filter="alpha(opacity="+100*this.labelDiv_.style.opacity+")"),this.eventDiv_.style.position=this.labelDiv_.style.position,this.eventDiv_.style.overflow=this.labelDiv_.style.overflow,this.eventDiv_.style.opacity=.01,this.eventDiv_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(opacity=1)"',this.eventDiv_.style.filter="alpha(opacity=1)",this.setAnchor(),this.setPosition(),this.setVisible()},h.prototype.setAnchor=function(){var a=this.marker_.get("labelAnchor");this.labelDiv_.style.marginLeft=-a.x+"px",this.labelDiv_.style.marginTop=-a.y+"px",this.eventDiv_.style.marginLeft=-a.x+"px",this.eventDiv_.style.marginTop=-a.y+"px"},h.prototype.setPosition=function(a){var b=this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());"undefined"==typeof a&&(a=0),this.labelDiv_.style.left=Math.round(b.x)+"px",this.labelDiv_.style.top=Math.round(b.y-a)+"px",this.eventDiv_.style.left=this.labelDiv_.style.left,this.eventDiv_.style.top=this.labelDiv_.style.top,this.setZIndex()},h.prototype.setZIndex=function(){var a=this.marker_.get("labelInBackground")?-1:1;"undefined"==typeof this.marker_.getZIndex()?(this.labelDiv_.style.zIndex=parseInt(this.labelDiv_.style.top,10)+a,this.eventDiv_.style.zIndex=this.labelDiv_.style.zIndex):(this.labelDiv_.style.zIndex=this.marker_.getZIndex()+a,this.eventDiv_.style.zIndex=this.labelDiv_.style.zIndex)},h.prototype.setVisible=function(){this.labelDiv_.style.display=this.marker_.get("labelVisible")&&this.marker_.getVisible()?"block":"none",this.eventDiv_.style.display=this.labelDiv_.style.display},g(i,google.maps.Marker),i.prototype.setMap=function(a){google.maps.Marker.prototype.setMap.apply(this,arguments),this.label.setMap(a)},a.InfoBox=b,a.Cluster=e,a.ClusterIcon=d,a.MarkerClusterer=f,a.MarkerLabel_=h,a.MarkerWithLabel=i})}}),b.module("uiGmapgoogle-maps.extensions").service("uiGmapExtendMarkerClusterer",["uiGmapLodash",function(b){return{init:_.once(function(){(function(){var c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};a.NgMapCluster=function(c){function e(b){e.__super__.constructor.call(this,b),this.markers_=new a.PropMap}return d(e,c),e.prototype.addMarker=function(a){var b,c;if(this.isMarkerAlreadyAdded_(a)){var d=this.markers_.get(a.key);if(d.getPosition().lat()==a.getPosition().lat()&&d.getPosition().lon()==a.getPosition().lon())return!1}if(this.center_){if(this.averageCenter_){var e=this.markers_.length+1,f=(this.center_.lat()*(e-1)+a.getPosition().lat())/e,g=(this.center_.lng()*(e-1)+a.getPosition().lng())/e;this.center_=new google.maps.LatLng(f,g),this.calculateBounds_()}}else this.center_=a.getPosition(),this.calculateBounds_();return a.isAdded=!0,this.markers_.push(a),b=this.markers_.length,c=this.markerClusterer_.getMaxZoom(),null!==c&&this.map_.getZoom()>c?a.getMap()!==this.map_&&a.setMap(this.map_):b<this.minClusterSize_?a.getMap()!==this.map_&&a.setMap(this.map_):b===this.minClusterSize_?this.markers_.each(function(a){a.setMap(null)}):a.setMap(null),!0},e.prototype.isMarkerAlreadyAdded_=function(a){return b.isNullOrUndefined(this.markers_.get(a.key))},e.prototype.getBounds=function(){var a=new google.maps.LatLngBounds(this.center_,this.center_);return this.getMarkers().each(function(b){a.extend(b.getPosition())}),a},e.prototype.remove=function(){this.clusterIcon_.setMap(null),this.markers_=new PropMap,delete this.markers_},e}(Cluster),a.NgMapMarkerClusterer=function(b){function c(b,d,e){c.__super__.constructor.call(this,b,d,e),this.markers_=new a.PropMap}return d(c,b),c.prototype.clearMarkers=function(){this.resetViewport_(!0),this.markers_=new PropMap},c.prototype.removeMarker_=function(a){return this.markers_.get(a.key)?(a.setMap(null),this.markers_.remove(a.key),!0):!1},c.prototype.createClusters_=function(a){var b,c,d,e=this;if(this.ready_){0===a&&(google.maps.event.trigger(this,"clusteringbegin",this),"undefined"!=typeof this.timerRefStatic&&(clearTimeout(this.timerRefStatic),delete this.timerRefStatic)),d=this.getMap().getZoom()>3?new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(),this.getMap().getBounds().getNorthEast()):new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472,-178.48388434375),new google.maps.LatLng(-85.08136444384544,178.00048865625));var f=this.getExtendedBounds(d),g=Math.min(a+this.batchSize_,this.markers_.length),h=this.markers_.values();for(b=a;g>b;b++)c=h[b],!c.isAdded&&this.isMarkerInBounds_(c,f)&&(!this.ignoreHidden_||this.ignoreHidden_&&c.getVisible())&&this.addToClosestCluster_(c);if(g<this.markers_.length)this.timerRefStatic=setTimeout(function(){e.createClusters_(g)},0);else{for(b=0;b<this.clusters_.length;b++)this.clusters_[b].updateIcon_();delete this.timerRefStatic,google.maps.event.trigger(this,"clusteringend",this)}}},c.prototype.addToClosestCluster_=function(a){var b,c,d,e,f=4e4,g=null;for(b=0;b<this.clusters_.length;b++)d=this.clusters_[b],e=d.getCenter(),e&&(c=this.distanceBetweenPoints_(e,a.getPosition()),f>c&&(f=c,g=d));g&&g.isMarkerInClusterBounds(a)?g.addMarker(a):(d=new NgMapCluster(this),d.addMarker(a),this.clusters_.push(d))},c.prototype.redraw_=function(){this.createClusters_(0)},c.prototype.resetViewport_=function(a){var b;for(b=0;b<this.clusters_.length;b++)this.clusters_[b].remove();this.clusters_=[],this.markers_.each(function(b){b.isAdded=!1,a&&b.setMap(null)})},c.prototype.extend=function(a,b){return function(a){var b;for(b in a.prototype)"constructor"!==b&&(this.prototype[b]=a.prototype[b]);return this}.apply(a,[b])},c.prototype.onAdd=function(){var a=this;this.activeMap_=this.getMap(),this.ready_=!0,this.repaint(),this.listeners_=[google.maps.event.addListener(this.getMap(),"zoom_changed",function(){a.resetViewport_(!1),(this.getZoom()===(this.get("minZoom")||0)||this.getZoom()===this.get("maxZoom"))&&google.maps.event.trigger(this,"idle")})]},c}(MarkerClusterer)}).call(this)})}}])}(window,angular);