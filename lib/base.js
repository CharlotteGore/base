(function(){

if(typeof require!=='undefined'){

    var _ = require('underscore');

}else{

    if(typeof _ ==='undefined'){

        throw "Underscore not detected";

    }

}

var base = function () { };

_.extend(base, {
    addStaticMethods: function addStaticMethods(methods) {
        _.extend(this, methods);
        return this;
    },

    addInstanceMethods: function addInstanceMethods(methods) {
        _.extend(this.prototype, methods);
        return this;
    },

    addAsyncInstanceMethods: function addInstanceMethods(methods) {

        var prototype = this.prototype,
            wrappers = {};

        _.each(methods, function(method, name){

            debugger;

           wrappers[name] = (function(method){

                return function(){

                    var args, self = this;;

                    args = Array.prototype.slice.call(arguments, 0);

                    setTimeout(function(){

                        method.apply(self, args);

                    }, 0);

                };

           }(method));

        });

        _.extend(this.prototype, wrappers);
        return this;
    },

    createChild: function createChild() {
        var child, method;
        child = function base(args) {
            var _this = this;
            if (this instanceof arguments.callee) {
                this.init.apply(this, args.callee ? args : arguments);
                if(this._postInit){
                    this._postInit();    
                }
                return this;
            } else {
                return new arguments.callee(arguments);
            }
        };
        _.extend(child, this);
        _.each(this.prototype, function(method, name){
            child.prototype[name] = method;
        });
        return child;
    }
});

_.extend(base, {
    addStaticProperties: base.addStaticMethods,
    addInstanceProperties: base.addInstanceMethods
});

base.addInstanceMethods({
    init: function (config) {
        return this;
    }
});

if (typeof exports !== 'undefined') {
if (typeof module !== 'undefined' && module.exports) {
  exports = module.exports = base;
}
    exports.base = base;
} else {
    window['base'] = base;
}

    // Current version.
    base.VERSION = '1.0.0';

}());

