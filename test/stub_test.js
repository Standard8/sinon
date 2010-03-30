TestCase("StubFunctionTest", {
  "test should return function": function () {
    assertFunction(sinon.stub.create());
  },

  "test should have returns method": function () {
    var stub = sinon.stub.create();

    assertFunction(stub.returns);
  },

  "test should return specified value": function () {
    var stub = sinon.stub.create();
    var object = {};
    stub.returns(object);

    assertSame(object, stub());
  },

  "test returns should return stub": function () {
    var stub = sinon.stub.create();

    assertSame(stub, stub.returns(""));
  },

  "test should return undefined": function () {
    var stub = sinon.stub.create();

    assertUndefined(stub());
  },

  "test should throw specified exception": function () {
    var stub = sinon.stub.create();
    var error = new Error();
    stub.throws(error);

    try {
      stub();
      fail("Expected stub to throw");
    } catch (e) {
      assertSame(error, e);
    }
  },

  "test throws should return stub": function () {
    var stub = sinon.stub.create();

    assertSame(stub, stub.throws({}));
  },

  "test throws should set type of exception to throw": function () {
    var stub = sinon.stub.create();
    var exceptionType = "TypeError";
    stub.throws(exceptionType);

    assertException(function () {
      stub();
    }, exceptionType);
  },

  "test throws should specify exception message": function () {
    var stub = sinon.stub.create();
    var message = "Oh no!";
    stub.throws("Error", message);

    try {
      stub();
      fail("Expected stub to throw");
    } catch (e) {
      assertEquals(message, e.message);
    }
  },

  "test stub should be spy": function () {
    var stub = sinon.stub.create();

    assertFunction(stub.called);
    assertFunction(stub.calledWith);
    assertFunction(stub.calledWith);
    assertFunction(stub.calledOn);
  }
});

TestCase("StubObjectMethodTest", {
  setUp: function () {
    this.method = function () {};
    this.object = { method: this.method };
    this.wrapMethod = sinon.wrapMethod;
  },

  tearDown: function () {
    sinon.wrapMethod = this.wrapMethod;
  },

  "test should be function": function () {
    assertFunction(sinon.stub);
  },

  "test should return function from wrapMethod": function () {
    var wrapper = function () {};
    var args;

    sinon.wrapMethod = function () {
      args = arguments;
      return wrapper;
    };

    var result = sinon.stub(this.object, "method");

    assertSame(this.object, args[0]);
    assertSame("method", args[1]);
    assertSame(wrapper, result);
  },

  "test should use provided function as stub": function () {
    var called = false;
    var customStub = function () { called = true; };
    var stub = sinon.stub(this.object, "method", customStub);

    assertFunction(stub.restore);
    stub();
    assert(called);
  },

  "test should throw if third argument is provided but not function": function () {
    var object = this.object;

    assertException(function () {
      sinon.stub(object, "method", {});
    }, "TypeError");
  },

  "test stubbed method should be proper stub": function () {
    var stub = sinon.stub(this.object, "method");

    assertFunction(stub.returns);
    assertFunction(stub.throws);
  },

  "test custom stubbed method should not be proper stub": function () {
    var stub = sinon.stub(this.object, "method", function () {});

    assertUndefined(stub.returns);
    assertUndefined(stub.throws);
  },

  "test custom stubbed method should be spy": function () {
    var stub = sinon.stub(this.object, "method", function () {});

    assertFunction(stub.called);
    assertFunction(stub.calledWith);
    assertFunction(stub.calledWithExactly);
    assertFunction(stub.calledOn);
  }
});
