	var base = require('../lib/base.js'), 
	should = require('should');

	describe('Base.JS', function(){

		describe('Creating children', function(){

			it('must be able to create a child', function(){

				var Child = base.createChild();

				should.exist(Child.createChild);
				should.exist(Child.addInstanceMethods);
				should.exist(Child.addStaticMethods);

			});

			it('must be invokable and the constructor, init, should run', function(){

				var Child = base.createChild();

				Child.addInstanceMethods({

					init : function(){

						this.hasRunInit = true;

					}

				});

				var instanceOfChild = Child();

				should.exist(instanceOfChild.hasRunInit);
				instanceOfChild.hasRunInit.should.be.ok;

			});

			it('should be able to have user definable static methods', function(){

				var Child = base.createChild();

				Child.addStaticMethods({

					returnTrue : function(){

						return true;

					}

				});

				Child.returnTrue().should.be.ok;

			});

			it('should have static methods that are static', function(){

				var Child = base.createChild();

				Child.addStaticMethods({

					returnTrue : function(){

						return true;

					}

				});

				var instance = Child();

				should.not.exist(instance.returnTrue);

			});


			it('should have instance methods that are instance methods', function(){

				var Child = base.createChild();

				Child.addInstanceMethods({

					returnTrue : function(){

						return true;

					}

				});

				should.not.exist(Child.returnTrue);

			});

			it('should be able to inherit prototypes', function(){

				var Child = base.createChild();

				Child.addInstanceMethods({

					returnTrue : function(){

						return true;

					}

				});

				var Decendent = Child.createChild();

				var instanceOfDecendent = Decendent();

				instanceOfDecendent.returnTrue().should.be.ok;

			});

			it('should be able to inherit prototypes', function(){

				var Child = base.createChild();

				Child.addInstanceMethods({

					returnTrue : function(){

						return true;

					}

				});

				var Decendent = Child.createChild();

				var instanceOfDecendent = Decendent();

				instanceOfDecendent.returnTrue().should.be.ok;

			});

		});

	});
