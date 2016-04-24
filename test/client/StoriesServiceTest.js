"use strict";

describe("Stories Service Tests", function () {
    var $scope, controller, constantService, StoriesService, mockMlProxy, $q, deferred, vm, defDelete;

    // load the app module
    beforeEach(module("app"));

    beforeEach(function () {
        mockMlProxy = {
            name: 'sdas',
            sendRequest: function () {

            }
        };

        module('app', function ($provide) {
            $provide.value('mlProxy', mockMlProxy);
        });
    });

    // module loading and injector must exist separately,
    // so creation of the $scope and controller exist in
    // a separate beforeEach statement than loading the module
    beforeEach(inject(function ($rootScope, _$q_, _StoriesService_, _constantsService_) {

        deferred = _$q_.defer();
        spyOn(mockMlProxy, 'sendRequest').and.returnValue(deferred.promise);
        $scope = $rootScope.$new();
        StoriesService = _StoriesService_;

    }));


    it("should contain priorities and personas", function () {

        expect(StoriesService.priorities).toEqual([
            {text: '1', value: 1},
            {text: '2', value: 2},
            {text: '3', value: 3},
            {text: '4', value: 4}
        ]);
        expect(StoriesService.personas).toEqual([
            {text: "Product Owner", value: "Product Owner"},
            {text: "Tester", value: "Tester"},
            {text: "Developer", value: "Developer"},
            {text: "Designer", value: "Deisgner"},
            {text: "Deployment", value: "Deployment"}
        ]);

    });


    it("should modify the url from constants service to include id for getting a story", function () {
        StoriesService.getStory('100');
        deferred.resolve();
        $scope.$digest();

        expect(mockMlProxy.sendRequest).toHaveBeenCalledWith({name: 'stories/100', verb: 'GET'});
        StoriesService.getStory('200');
        deferred.resolve();
        $scope.$digest();

        expect(mockMlProxy.sendRequest).toHaveBeenCalledWith({name: 'stories/200', verb: 'GET'});
    });

    it("should modify the url from constants service to include id for editing a story", function () {
        StoriesService.editStory({id: '100'});
        deferred.resolve();
        $scope.$digest();
        expect(mockMlProxy.sendRequest).toHaveBeenCalledWith({name: 'stories/100', verb: 'PATCH'}, {id: '100'});
        StoriesService.editStory({id: '200'});
        deferred.resolve();
        $scope.$digest();
        expect(mockMlProxy.sendRequest).toHaveBeenCalledWith({name: 'stories/200', verb: 'PATCH'}, {id: '200'});
    });

    it("should modify the url from constants service to include id for deleting a story", function () {
        StoriesService.deleteStory('100');
        deferred.resolve();
        $scope.$digest();
        expect(mockMlProxy.sendRequest).toHaveBeenCalledWith({name: 'stories/100', verb: 'DELETE'});
        StoriesService.deleteStory('200');
        deferred.resolve();
        $scope.$digest();
        expect(mockMlProxy.sendRequest).toHaveBeenCalledWith({name: 'stories/200', verb: 'DELETE'});

    });
});