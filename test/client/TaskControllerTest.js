"use strict";

describe("Task Controller", function () {
    var $scope, controller, stateParams, mockStoriesService, mockTasksService, $q, defStories, deferred, vm, defEdit;

    // load the app module
    beforeEach(module("app"));

    beforeEach(function () {
        mockStoriesService = {
            getStories: function () {

            }
        };
        mockTasksService = {
            getTask: function () {

            },
            addTask: function () {

            },
            editTask: function () {

            },
            deleteTask: function () {

            }
        };

        module('app', function ($provide) {
            $provide.value('StoriesService', mockStoriesService);
            $provide.value('TasksService', mockTasksService);
        });
    });

    describe("when add Task is invoked", function () {

        // module loading and injector must exist separately,
        // so creation of the $scope and controller exist in
        // a separate beforeEach statement than loading the module
        beforeEach(inject(function ($rootScope, $controller, _$q_, _StoriesService_, _TasksService_, $state) {
            mockStoriesService = _StoriesService_;
            mockTasksService = _TasksService_;
            $q = _$q_;
            // // create a new $scope for each test
            $scope = $rootScope.$new();
            defStories = $q.defer();
            deferred = $q.defer();

            spyOn($state, 'go').and.callFake(function (state, params) {
                // This replaces the 'go' functionality for the duration of your test
            });
            stateParams = {id: '0'};
            // // Use a Jasmine Spy to return the deferred promise
            spyOn(mockStoriesService, 'getStories').and.returnValue(defStories.promise);
            spyOn(mockTasksService, 'addTask').and.returnValue(deferred.promise);

            // use the new $scope in creating the controller
            controller = $controller("TaskController as tc", {
                $scope: $scope,
                mockStoriesService: mockStoriesService,
                TasksService: mockTasksService,
                $stateParams: stateParams
            });
            vm = $scope.tc;
        }));

        it("should exist and display add new Task if id passed in is 0", function () {
            vm.$stateParams = stateParams;
            defStories.resolve([{'id':'1',feature:'1'}]);
            $scope.$digest();
            expect(vm).toBeDefined();
            expect(vm.headerText).toBe('Add new Task');

        });

        it("should call addTask method from service with Task passed in when saved", function () {

            vm.selectedStoryId = 's1';
            vm.task = {description:'as', priority: 1, status:'ip', story_id:'s1'};
            vm.save();
            deferred.resolve('1');
            $scope.$digest();
            expect(vm.task.story_id).toEqual('s1');
            expect(mockTasksService.addTask).toHaveBeenCalledWith(vm.task);
            expect(vm.task.id).toBe('1');
        });
    });

    describe("when edit Task is invoked", function () {

        // module loading and injector must exist separately,
        // so creation of the $scope and controller exist in
        // a separate beforeEach statement than loading the module
        beforeEach(inject(function ($rootScope, $controller, _$q_, _StoriesService_, $state, _TasksService_) {
            mockStoriesService = _StoriesService_;
            mockTasksService = _TasksService_;
            $q = _$q_;
            // // create a new $scope for each test
            $scope = $rootScope.$new();
            defStories = $q.defer();
            deferred = $q.defer();
            defEdit = $q.defer();

            spyOn($state, 'go').and.callFake(function (state, params) {
                // This replaces the 'go' functionality for the duration of your test
            });
            stateParams = {id: '1'};
            // // Use a Jasmine Spy to return the deferred promise
            spyOn(mockStoriesService, 'getStories').and.returnValue(defStories.promise);
            spyOn(mockTasksService, 'getTask').and.returnValue(deferred.promise);
            spyOn(mockTasksService, 'editTask').and.returnValue(defEdit.promise);
            spyOn(mockTasksService, 'deleteTask').and.returnValue(deferred.promise);

            // use the new $scope in creating the controller
            controller = $controller("TaskController as tc", {
                $scope: $scope,
                StoriesService: mockStoriesService,
                TasksService: mockTasksService,
                $stateParams: stateParams
            });
            vm = $scope.tc;
        }));

        it("should exist and display existing task and select the story", function () {
            vm.$stateParams = stateParams;

            defStories.resolve([{id: 's1', feature: 'abc'}, {id: 's2', feature: 'abc'}]);
            var task = {id: '1', description: 'existing Task', story_id: 's1'};
            deferred.resolve(task);
            $scope.$digest();


            expect(vm.stories.length).toBe(2);
            expect(vm.selectedStoryId).toEqual('s1');
            expect(vm).toBeDefined();
            expect(vm.task).toEqual(task)
            expect(vm.headerText).toBe('existing Task');
        });

        it("should call editTask method from service with Task passed in when saved", function () {
            vm.selectedStory = {id: 's1'};//,{id:'s2'}];
            vm.task = {id: '1', feature: 'feature', justification: 'just', priority: 1, persona: 'po', story_id: 's1'};

            vm.save();
            defEdit.resolve('1');
            $scope.$digest();
            expect(mockTasksService.editTask).toHaveBeenCalledWith(vm.task);
            expect(vm.task.id).toBe('1');
        });

        it("should delete the Task and navigate to stories list", function () {

            vm.task = {id: '1', feature: 'feature', justification: 'just', priority: 1, persona: 'po'};
            vm.delete();
            defEdit.resolve();
            $scope.$digest();
            expect(mockTasksService.deleteTask).toHaveBeenCalledWith(vm.task.id);
        });
    });

});