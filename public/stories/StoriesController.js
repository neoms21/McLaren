app.controller("StoriesController", function (StoriesService, $state) {
    var sc = this;
    sc.stories = [];

    StoriesService.getStories().then(function (data) {
        sc.stories = data;
    });

    sc.gotoStory = function (story) {
        $state.go('story',{id: story === undefined ? '0' : story.id});
    };

    sc.delete = function (id) {
        StoriesService.deleteStory(id).then(function (res) {
            sc.stories = _.filter(sc.stories, function (s) {
                return s.id !== id;
            });
        });
    };
});
