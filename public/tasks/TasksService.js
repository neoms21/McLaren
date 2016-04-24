app.service("TasksService", function (constantsService, mlProxy) {

    this.statuses = [
        {text:'To Do', value:'To Do'},
        {text:'In Progress', value:'In Progress'},
        {text:'Removed', value:'Removed'},
        {text:'Done', value:'Done'}
    ];
    this.priorities = [
        {text:'1', value:1},
        {text:'2', value:2},
        {text:'3', value:3},
        {text:'4', value:4}
    ];
    
    this.getTasks = function () {
        return mlProxy.sendRequest(constantsService.Requests.GetTasks);
    };

    this.getTask = function (id) {
        constantsService.Requests.GetTask.name = String.format(constantsService.Requests.GetTask.name, id);
        return mlProxy.sendRequest(constantsService.Requests.GetTask);
    };

    this.addTask = function (Task) {
        return mlProxy.sendRequest(constantsService.Requests.CreateTask, Task);
    };

    this.editTask = function (Task) {
        constantsService.Requests.UpdateTask.name = String.format(constantsService.Requests.UpdateTask.name, Task.id);
        return mlProxy.sendRequest(constantsService.Requests.UpdateTask, Task);
    };

    this.deleteTask = function (id) {
        constantsService.Requests.DeleteTask.name = String.format(constantsService.Requests.DeleteTask.name, id);
        return mlProxy.sendRequest(constantsService.Requests.DeleteTask);
    };
});