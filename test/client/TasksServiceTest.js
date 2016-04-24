"use strict";

describe("Tasks Service Tests", function () {
    var $scope, controller, constantService, TasksService, mockMlProxy, $q, deferred, vm, defDelete;

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
    beforeEach(inject(function ($rootScope, _$q_, _TasksService_, _constantsService_) {

        deferred = _$q_.defer();
        spyOn(mockMlProxy, 'sendRequest').and.returnValue(deferred.promise);
        $scope = $rootScope.$new();
        TasksService = _TasksService_;

    }));


    it("should contain priorities and personas", function () {

        expect(TasksService.priorities).toEqual([
            {text: '1', value: 1},
            {text: '2', value: 2},
            {text: '3', value: 3},
            {text: '4', value: 4}
        ]);
        expect(TasksService.statuses).toEqual([
            {text:'To Do', value:'To Do'},
            {text:'In Progress', value:'In Progress'},
            {text:'Removed', value:'Removed'},
            {text:'Done', value:'Done'}
        ]);

    });


    it("should modify the url from constants service to include id for getting a task", function () {
        TasksService.getTask('100');
        deferred.resolve();
        $scope.$digest();
        expect(mockMlProxy.sendRequest).toHaveBeenCalledWith({name: 'tasks/100', verb: 'GET'});
    });

    it("should modify the url from constants service to include id for editing a task", function () {
        TasksService.editTask({id: '100'});
        deferred.resolve();
        $scope.$digest();
        expect(mockMlProxy.sendRequest).toHaveBeenCalledWith({name: 'tasks/100', verb: 'PATCH'}, {id: '100'});
    });

    it("should modify the url from constants service to include id for deleting a task", function () {
        TasksService.deleteTask('100');
        deferred.resolve();
        $scope.$digest();
        expect(mockMlProxy.sendRequest).toHaveBeenCalledWith({name: 'tasks/100', verb: 'DELETE'});
    });
});