app.factory("messageFactory", function ($http) {
    
    var factory = {};
    factory.messages = [];
    
    // index: Retrieve all messages and comments
    factory.index = function(callback){
        console.log("Index works");
        $http.get('/api').then(function(response){
            console.log(response);
            factory.messages = response.data.messages
            callback(factory.messages);
        });
    };
    // create: add 
    factory.createMessage = function(message, callback){
        console.log("createMessage");
        $http.post('/api/message',message).then(function(response){
            console.log(response);
            factory.index(callback);
        });
    };

    factory.createComment = function(comment, messageId, callback){
        $http.post('/api/comment/' + messageId, comment).then(function (response){
            factory.index(callback);
        });
    }
    return factory;
});