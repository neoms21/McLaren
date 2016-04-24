"use strict";

describe("Tasks Controller Tests", function () {
    var $scope, controller, mockStoriesService, mockTasksService, $q, deferred, vm, defTasks;

    // load the app module
    beforeEach(module("app"));

    beforeEach(function () {
        mockStoriesService = {
            getStories: function () {

            }
        };
        mockTasksService = {
            getTasks: function () {

            },
            deleteTask:function () {
                
            }
        };

        module('app', function ($provide) {
            $provide.value('StoriesService', mockStoriesService);
            $provide.value('TasksService', mockTasksService);
        });
    });

    // module loading and injector must exist separately,
    // so creation of the $scope and controller exist in
    // a separate beforeEach statement than loading the module
    beforeEach(inject(function ($rootScope, $controller, _$q_, _StoriesService_, $state, _TasksService_) {
        mockStoriesService = _StoriesService_;
        mockTasksService = _TasksService_;
        $q = _$q_;
        // // create a new $scope for each test
        $scope = $rootScope.$new();
        deferred = $q.defer();
        defTasks = $q.defer();

        spyOn($state, 'go').and.callFake(function (state, params) {
            // This replaces the 'go' functionality for the duration of your test
        });

        // Use a Jasmine Spy to return the deferred promise
        spyOn(mockStoriesService, 'getStories').and.returnValue(deferred.promise);
        spyOn(mockTasksService, 'getTasks').and.returnValue(defTasks.promise);
        spyOn(mockTasksService, 'deleteTask').and.returnValue(defTasks.promise);

        // use the new $scope in creating the controller
        controller = $controller("TasksController as tc", {
            $scope: $scope,
            StoriesService: mockStoriesService,
            TasksService: mockTasksService
        });
        vm = $scope.tc;
    }));

    it("should exist and display tasks", function () {
        deferred.resolve([{id: 's1', feature: 'story 1'}, {id: 's2', feature: 'story 2'},]);
        defTasks.resolve([{id: '1', story_id: 's1'}, {id: '2', story_id: 's2'}, {id: '3', story_id: 's3'}]);
        $scope.$digest();

        expect(vm).toBeDefined();
        expect(vm.tasks.length).toBe(3);
        expect(vm.tasks[0].story).toEqual('story 1');
        expect(vm.tasks[1].story).toEqual('story 2');
        expect(vm.tasks[2].story).toEqual('Story Deleted');
    });

    it("should navigate to add Story state when add is clicked", inject(function ($state) {
        vm.gotoTask();
        expect($state.go).toHaveBeenCalledWith('task', {id: '0'});
    }));

    it("should navigate to story with id in url", inject(function ($state) {
        vm.gotoTask({id: '1'});
        expect($state.go).toHaveBeenCalledWith('task', {id: '1'});
    }));

    it("should remove the story from list once successfully deleted", inject(function ($state) {
        vm.tasks = [
            {id: '1', feature: 'abc'},
            {id: '2', feature: 'abc'},
            {id: '3', feature: 'abc'},
            {id: '4', feature: 'abc'}
        ];
        vm.delete('2');
        defTasks.resolve();
        $scope.$digest();
        expect(vm.tasks.length).toBe(3);

    }));
});