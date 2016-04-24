app.factory("mlProxy", function(config, $q, $http){

    var sendRequest = function (request, data) {
        var defer = $q.defer();
        var req = {
            method: request.verb,
            url: config.baseUrl + request.name,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: data
        };

        $http(req).then(function(res){
            defer.resolve(res.data);
        }, function(res){
            defer.reject(res);
        });

        return defer.promise;
    };

    return {
        sendRequest : sendRequest
    };

});