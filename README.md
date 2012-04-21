## The summary

Base is a lightweight framework for creating consistent, highly readable, chainable and inheritable object prototypes in Javascript. This git repo is for an NPM module for use with Node. It can be used in the browser so long as you manually satisfy the [Underscore](http://documentcloud.github.com/underscore/) dependency. You're already using Underscore anyway though, right, so no problem, yeah? 

Shiny!

## The detail

So, here's some examples and stuff.

### Installing

	npm install base-framework

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

### addInstanceMethods

	var Foo = base.createChild();

	Foo.addInstanceMethods({
		computeSecretOfEverything : function(){
			this.secret = 42;
			return this;
		},
		getSecret : function(){
			return this.secret;
		}
	});

	Bar = Foo();

	Bar.computeSecretOfEverything();
	Bar.getSecret() === 42 // TRUE

When your instance methods return `this` instead of a value, you can chain the methods, jQuery style, instead.

	Bar.computeSecretOfEverything().getSecret();

### addStaticMethods

Static methods are only available on the object created with `base.createChild()`, not an instance.

	var Foo = base.createChild();

	Foo.addStaticMethods({
		secretOfLifeUniverseAndEverything : function(){
			return 42;
		}
	});

	Foo.secretOfLifeTheUniverseAndEverything() === 42 // TRUE

### createChild

Any object created with `base.createChild()` also has the `createChild` method, which means you can create a whole bunch of instance and static methods on one child of base, then inherit (and override) those later on.

	var Horse = base.createChild()
		.AddInstanceMethods({
			name : function(){
				return "Horse"
			},
			legs : function(){
				return 4;
			},
			goFaster : function(){
				this.speed++;
			}
		});

	var Unicorn = Horse.createChild()
		.AddInstanceMethods({
			name : function(){
				return "Unicorn";
			},
			kill : function(){
				// extra functionality available to unicorns
			}
		});

	var uni = Unicorn();
	var bill = Horse();

	uni.legs() === 4 // TRUE
	uni.name() === 'Unicorn' // TRUE
	uni.goFaster() // exists

	bill.kill() // doesn't exist

### Test

	make test

