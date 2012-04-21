## The summary

Base is a lightweight framework for creating consistent, highly readable, chainable and inheritable object prototypes in Javascript. This git repo is for an NPM module for use with Node. It can be used in the browser so long as you manually satisfy the [Underscore](http://documentcloud.github.com/underscore/) dependency. You're already using Underscore anyway though, right, so no problem, yeah? 

Shiny!

Base doesn't pretend Javascript is a traditional class based OO language. There are no faked private, public methods and properties, etc.

What it does have is a constructor that is always run, by default, when an instance of a base child is involved.

This constructor is `init()`. By adding your own instance method called `init` to your base child, you can override the default constructor behaviour and do smoething more interesting. 

I've been using Base for over a year for developing client side JS apps. This is an attempt to move it into the node space.

## The detail

So, here's some examples and stuff.

### Installing

	// in your project directory..

	npm install base-framework
	cd node_modules/base-framework
	npm update

### Example

	// Require base...
	var base = require('base');
 
	// create a base child. Add the default 'init' constructor which is
	// executed automatically when the object is invoked, and another 
	// instance method.

	var MyFactory = base.createChild();


	MyFactory.addInstanceMethods({

			// arguments passed to MyFactory() are forwarded to init..
			init : function( args ){
				this.args = args;

				// return our instance of MyFactory, which will have the 
				// 'spewArgs' method as well
				return this;
			},
			spewArgs : function(){
				console.log(this.args);
			}
		});

	// create an instance of MyFactory with 'Hello world' as the args, executing init automatically
	var myInstance = MyFactory('Hello world');

	// myInstance.args is now 'Hello world'
	myInstance.spewArgs() // outputs 'Hello world' to the console

	var myOtherInstance = MyFactory('Goodbye, cruel world');
	myOtherInstance.spewArgs() // outputs 'Goodbye, cruel world' to the console

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

Mocha and should are required to run the tests

	make test

