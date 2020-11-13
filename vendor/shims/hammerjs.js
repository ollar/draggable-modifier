(function() {
  function vendorModule() {
    'use strict';

    return {
      default: self['Hammer'],
      __esModule: true,
    };
  }

  define('hammerjs', [], vendorModule);
})();
