"use strict";

describe("Story Controller", function () {
    var $scope, controller, stateParams, StoriesService, mockStoriesService, $q, deferred, vm, defEdit;

    // load the app module
    beforeEach(module("app"));

    beforeEach(function () {
        mockStoriesService = {
            getStories: function () {

            },
            getStory: function () {

            },
            addStory: function () {

            },
            editStory: function () {

            },
            deleteStory: function () {

            }
        };

        module('app', function ($provide) {
            $provide.value('StoriesService', mockStoriesService);
        });
    });

    describe("when add story is invoked", function () {

        // module loading and injector must exist separately,
        // so creation of the $scope and controller exist in
        // a separate beforeEach statement than loading the module
        beforeEach(inject(function ($rootScope, $controller, _$q_, _StoriesService_, $state) {
            StoriesService = _StoriesService_;
            $q = _$q_;
            // // create a new $scope for each test
            $scope = $rootScope.$new();
            deferred = $q.defer();

            spyOn($state, 'go').and.callFake(function (state, params) {
                // This replaces the 'go' functionality for the duration of your test
            });
            stateParams = {id: '0'};
            // // Use a Jasmine Spy to return the deferred promise
            spyOn(StoriesService, 'addStory').and.returnValue(deferred.promise);

            // use the new $scope in creating the controller
            controller = $controller("StoryController as sc", {
                $scope: $scope,
                StoriesService: StoriesService,
                $stateParams: stateParams
            });
            vm = $scope.sc;
        }));

        it("should exist and display add new story if id passed in is 0", function () {
            vm.$stateParams = stateParams;
            expect(vm).toBeDefined();
            expect(vm.headerText).toBe('Add new story');
        });

        it("should call addStory method from service with story passed in when saved", function () {

            vm.story = {feature: 'feature', justification: 'just', priority: 1, persona: 'po'};
            vm.save();
            deferred.resolve('1');
            $scope.$digest();
            expect(StoriesService.addStory).toHaveBeenCalledWith(vm.story);
            expect(vm.story.id).toBe('1');
        });
    });

    describe("when edit story is invoked", function () {

        // module loading and injector must exist separately,
        // so creation of the $scope and controller exist in
        // a separate beforeEach statement than loading the module
        beforeEach(inject(function ($rootScope, $controller, _$q_, _StoriesService_, $state) {
            StoriesService = _StoriesService_;
            $q = _$q_;
            // // create a new $scope for each test
            $scope = $rootScope.$new();
            deferred = $q.defer();
            defEdit = $q.defer();

            spyOn($state, 'go').and.callFake(function (state, params) {
                // This replaces the 'go' functionality for the duration of your test
            });
            stateParams = {id: '1'};
            // // Use a Jasmine Spy to return the deferred promise
            spyOn(StoriesService, 'getStory').and.returnValue(deferred.promise);
            spyOn(StoriesService, 'editStory').and.returnValue(defEdit.promise);
            spyOn(StoriesService, 'deleteStory').and.returnValue(deferred.promise);

            // use the new $scope in creating the controller
            controller = $controller("StoryController as sc", {
                $scope: $scope,
                StoriesService: StoriesService,
                $stateParams: stateParams
            });
            vm = $scope.sc;
        }));

        it("should exist and display add new story if service has no selected story", function () {
            deferred.resolve({id: '1', feature: 'existing story'});
            $scope.$digest();
            vm.$stateParams = stateParams;
            expect(vm).toBeDefined();
            expect(vm.headerText).toBe('existing story');
        });

        it("should call editStory method from service with story passed in when saved", function () {

            vm.story = {id: '1', feature: 'feature', justification: 'just', priority: 1, persona: 'po'};
            vm.save();
            defEdit.resolve('1');
            $scope.$digest();
            expect(StoriesService.editStory).toHaveBeenCalledWith(vm.story);
            expect(vm.story.id).toBe('1');
        });
        
        it("should delete the story and navigate to stories list", function () {

            vm.story = {id: '1', feature: 'feature', justification: 'just', priority: 1, persona: 'po'};
            vm.delete();
            defEdit.resolve();
            $scope.$digest();
            expect(StoriesService.deleteStory).toHaveBeenCalledWith(vm.story.id);
        });
    });

});