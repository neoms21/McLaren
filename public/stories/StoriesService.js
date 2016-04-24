app.service("StoriesService", function (constantsService, mlProxy) {

    this.priorities = [
        {text:'1', value:1},
        {text:'2', value:2},
        {text:'3', value:3},
        {text:'4', value:4}
    ];
    this.personas = [
        {text:"Product Owner", value:"Product Owner"},
        {text:"Tester", value:"Tester"},
        {text:"Developer", value:"Developer"},
        {text:"Designer", value:"Deisgner"},
        {text:"Deployment", value:"Deployment"}
        ];

    this.getStories = function () {
        return mlProxy.sendRequest(constantsService.Requests.GetStories);
    };

    this.getStory = function (id) {
        constantsService.Requests.GetStory.name = String.format(constantsService.Requests.GetStory.name, id);
        return mlProxy.sendRequest(constantsService.Requests.GetStory);
    };

    this.addStory = function (story) {
        return mlProxy.sendRequest(constantsService.Requests.CreateStory, story);
    };

    this.editStory = function (story) {
        constantsService.Requests.UpdateStory.name = String.format(constantsService.Requests.UpdateStory.name, story.id);
        return mlProxy.sendRequest(constantsService.Requests.UpdateStory, story);
    };

    this.deleteStory = function (id) {
        constantsService.Requests.DeleteStory.name = String.format(constantsService.Requests.DeleteStory.name, id);
        return mlProxy.sendRequest(constantsService.Requests.DeleteStory);
    };
});