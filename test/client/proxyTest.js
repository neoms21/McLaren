"use strict";

describe("ml proxy test", function () {
    var mlProxy, httpBackend, constantsService;

    beforeEach(module("app"));

    beforeEach(inject(function (_mlProxy_,_constantsService_, $httpBackend) {
        mlProxy = _mlProxy_;
        constantsService = _constantsService_;
        httpBackend = $httpBackend;
    }));

    it("should get list of stories", function () {
        httpBackend.whenGET("http://localhost:3000/v1/stories").respond([{feature: "S1"}, {feature: "S2"}]);

        mlProxy.sendRequest(constantsService.Requests.GetStories).then(function (countries) {
            expect(countries.length).toEqual(2);
        });
        httpBackend.flush();
    });

    it("should get save the story and return id", function () {
        httpBackend.whenPOST("http://localhost:3000/v1/stories").respond('s1');

        mlProxy.sendRequest(constantsService.Requests.CreateStory).then(function (result) {
            expect(result).toEqual('s1');
        });
        httpBackend.flush();
    });

});