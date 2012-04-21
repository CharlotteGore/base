## The summary

Base is a lightweight framework for creating consistent, highly readable, chainable and inheritable object prototypes in Javascript. This git repo is for an NPM module for use with Node. It can be used in the browser so long as you manually satisfy the [Underscore](http://documentcloud.github.com/underscore/) dependency. You're already using Underscore though, anyway, right?

## The detail

### Example

	// Require base...
	var base = require('base');
 
	// create a base child. Add the default 'init' constructor which is
	// executed automatically when the object is invoked, and another 
	// instance method.

	var MyFactory = base.createChild()
		.AddInstanceMethods({
			init : function( args ){
				this.args = args;
				return this;
			},
			spewArgs : function(){
				console.log(this.args);
			}
		});

	var myInstance = MyFactory({ hello : 'world'}).spewArgs() // outputs {hello : 'world'} to the console

Objects created with `base.createChild()` have a number of static methods which are used to build your factory.

### addStaticMethods

	var Foo = base.createChild();

	Foo.addStaticMethods({
		secretOfLifeUniverseAndEverything : function(){
			return 42;
		}
	});

	Foo.secretOfLifeTheUniverseAndEverything() === 42 // TRUE


