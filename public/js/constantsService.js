
app.service('constantsService', function () {
  "use strict";
  var requests = {
    GetStories: {name: 'stories', verb:'GET'},
    GetStory: {name: 'stories/{0}', verb:'GET'},
    CreateStory: {name: 'stories', verb:'POST'},
    UpdateStory: {name: 'stories/{0}', verb:'PATCH'},
    DeleteStory: {name: 'stories/{0}', verb:'DELETE'},
    GetTasks: {name: 'tasks', verb:'GET'},
    GetTask: {name: 'tasks/{0}', verb:'GET'},
    CreateTask: {name: 'tasks', verb:'POST'},
    UpdateTask: {name: 'tasks/{0}', verb:'PATCH'},
    DeleteTask: {name: 'tasks/{0}', verb:'DELETE'},
  };

  return {
    Requests: requests,
  };
});
