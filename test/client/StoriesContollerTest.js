"use strict";

describe("Stories Controller Tests", function () {
    var $scope, controller, StoriesService, mockStoriesService, $q, deferred, vm, defDelete;

    // load the app module
    beforeEach(module("app"));

    beforeEach(function () {
        mockStoriesService = {
            getStories: function () {

            },
            deleteStory: function () {

            }
        };

        module('app', function ($provide) {
            $provide.value('StoriesService', mockStoriesService);
        });
    });

    // module loading and injector must exist separately,
    // so creation of the $scope and controller exist in
    // a separate beforeEach statement than loading the module
    beforeEach(inject(function ($rootScope, $controller, _$q_, _StoriesService_, $state) {
        StoriesService = _StoriesService_;
        $q = _$q_;
        // // create a new $scope for each test
        $scope = $rootScope.$new();
        deferred = $q.defer();
        defDelete = $q.defer();

        spyOn($state, 'go').and.callFake(function (state, params) {
            // This replaces the 'go' functionality for the duration of your test
        });

        // Use a Jasmine Spy to return the deferred promise
        spyOn(StoriesService, 'getStories').and.returnValue(deferred.promise);
        spyOn(StoriesService, 'deleteStory').and.returnValue(defDelete.promise);

        // use the new $scope in creating the controller
        controller = $controller("StoriesController as sc", {
            $scope: $scope,
            StoriesService: StoriesService
        });
        vm = $scope.sc;
    }));

    it("should exist and display stories", function () {
        deferred.resolve([{id: '1'}, {id: '2'}]);
        $scope.$digest();

        expect(vm).toBeDefined();
        expect(vm.stories.length).toBe(2);
    });

    it("should navigate to add Story state when add is clicked", inject(function ($state) {
        vm.gotoStory();
        expect($state.go).toHaveBeenCalledWith('story', {id: '0'});
    }));

    it("should navigate to story with id in url", inject(function ($state) {
        vm.gotoStory({id: '1'});
        expect($state.go).toHaveBeenCalledWith('story', {id: '1'});
    }));

    it("should remove the story from list once successfully deleted", inject(function () {
        vm.stories = [
            {id: '1', feature: 'abc'},
            {id: '2', feature: 'abc'},
            {id: '3', feature: 'abc'},
            {id: '4', feature: 'abc'}
        ];
        vm.delete('2');
        defDelete.resolve();
        $scope.$digest();
        expect(vm.stories.length).toBe(3);

    }));
});