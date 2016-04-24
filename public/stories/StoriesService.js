app.service("StoriesService", function (constantsService, mlProxy) {

    this.priorities = [
        {text: '1', value: 1},
        {text: '2', value: 2},
        {text: '3', value: 3},
        {text: '4', value: 4}
    ];
    this.personas = [
        {text: "Product Owner", value: "Product Owner"},
        {text: "Tester", value: "Tester"},
        {text: "Developer", value: "Developer"},
        {text: "Designer", value: "Deisgner"},
        {text: "Deployment", value: "Deployment"}
    ];

    this.getStories = function () {
        return mlProxy.sendRequest(constantsService.Requests.GetStories);
    };

    this.getStory = function (id) {
        var req = getClone(constantsService.Requests.GetStory);
        req.name = String.format(req.name, id);
        return mlProxy.sendRequest(req);
    };

    this.addStory = function (story) {
        return mlProxy.sendRequest(constantsService.Requests.CreateStory, story);
    };

    this.editStory = function (story) {
        var req = getClone(constantsService.Requests.UpdateStory);
        req.name = String.format(req.name, story.id);
        return mlProxy.sendRequest(req, story);
    };

    this.deleteStory = function (id) {
        var req = getClone(constantsService.Requests.DeleteStory);
        req.name = String.format(req.name, id);
        return mlProxy.sendRequest(req);
    };
});