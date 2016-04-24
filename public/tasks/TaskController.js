app.controller("TaskController", function (TasksService, StoriesService, $stateParams, $state) {
    var tc = this;
    tc.task = undefined;
    tc.selectedStoryId;
    tc.statuses = TasksService.statuses;
    tc.priorities = TasksService.priorities;

    StoriesService.getStories().then(function (stories) {
        tc.stories = stories;
        setTaskPage();

    })

    function setTaskPage() {
        if ($stateParams.id === '0') {
            tc.headerText = 'Add new Task';
        } else {
            TasksService.getTask($stateParams.id).then(function (task) {
                tc.task = task;
                var story = _.find(tc.stories, function (s) {
                    return s.id === task.story_id;
                })
                if(story !== undefined)
                    tc.selectedStoryId = story.id;
                tc.headerText = tc.task.description;
            });
        }
    }

    tc.save = function () {

        tc.task.story_id = tc.selectedStoryId;
        if (tc.task.id === undefined)
            TasksService.addTask(tc.task).then(function (id) {
                tc.task.id = id;
                $state.go('tasks');
            });
        else
            TasksService.editTask(tc.task).then(function (id) {
                $state.go('tasks');
            });
    };

    tc.delete = function () {
        TasksService.deleteTask(tc.task.id).then(function (res) {
            $state.go('tasks');
        });
    };

});