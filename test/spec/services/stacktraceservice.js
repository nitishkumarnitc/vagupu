'use strict';

describe('Service: stacktraceService', function () {

  // load the service's module
  beforeEach(module('vagupuApp'));

  // instantiate service
  var stacktraceService;
  beforeEach(inject(function (_stacktraceService_) {
    stacktraceService = _stacktraceService_;
  }));

  it('should do something', function () {
    expect(!!stacktraceService).toBe(true);
  });

});
