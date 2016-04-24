app.controller("TasksController", function (TasksService, StoriesService, $state) {
    var tc = this;

    var stories = [];

    StoriesService.getStories().then(function (result) {
        stories = result;
        getTasks();
    });

    tc.gotoTask = function (story) {
        $state.go('task',{id: story === undefined ? '0' : story.id});
    };

    tc.delete = function (id) {
        TasksService.deleteTask(id).then(function (res) {
            tc.tasks = _.filter(tc.tasks, function (s) {
                return s.id !== id;
            });
        });
    };

    function getTasks() {
        TasksService.getTasks().then(function (tasks) {
            tc.tasks = tasks;
            _.each(tc.tasks, function (t) {

                var story = _.find(stories, function (s) {
                    return s.id === t.story_id;
                });

                t.story = story === undefined ? 'Story Deleted' : story.feature;
            });
        });
    }
});