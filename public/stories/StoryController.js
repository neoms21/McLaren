app.controller("StoryController", function (StoriesService, $stateParams, $state) {
    var sc = this;
    sc.story = undefined;
    sc.personas = StoriesService.personas;
    sc.priorities = StoriesService.priorities;
    //  sc.isValid = true;
    if ($stateParams.id === '0') {

        sc.headerText = 'Add new story';
    } else {
        StoriesService.getStory($stateParams.id).then(function (story) {
            sc.story = story;
            sc.headerText = sc.story.feature;
        });
    }

    sc.save = function () {
        if (sc.story.id === undefined)
            StoriesService.addStory(sc.story).then(function (id) {
                sc.story.id = id;
                $state.go('stories');
            });
        else
            StoriesService.editStory(sc.story).then(function (id) {
                $state.go('stories');
            });
    };

    sc.delete = function () {
        StoriesService.deleteStory(sc.story.id).then(function (res) {
            $state.go('stories');
        });
    };

});