var app = angular.module('app',['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('stories', {
            url: '/',
            templateUrl: '../stories/stories.html',
            controller: 'StoriesController',
            controllerAs: 'sc'
        })
        .state('story', {
            url: '/story/:id',
            templateUrl: '../stories/story.html',
            controller: 'StoryController',
            controllerAs: 'sc'
        })
        .state('tasks', {
            url: '/tasks',
            templateUrl: '../tasks/tasks.html',
            controller: 'TasksController',
            controllerAs: 'tc'
        })
        .state('task', {
            url: '/task/:id',
            templateUrl: '../tasks/task.html',
            controller: 'TaskController',
            controllerAs: 'tc'
        });

    $urlRouterProvider.otherwise('/');
});