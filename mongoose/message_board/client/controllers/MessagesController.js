app.controller("MessagesController", function ($scope, messageFactory) {
        
    function setMessages(data){
        $scope.messages = data;
        $scope.message = {};
        $scope.comment = {};
    }

    $scope.message = {};
    $scope.messages = [];
    $scope.comment = {};

    $scope.index = function(){
        messageFactory.index(setMessages);
    }
    
    $scope.index();
    
    $scope.createMessage = function(){
        messageFactory.createMessage($scope.message, setMessages);
    }
    //fix createComment (Pass in message ID)
    $scope.createComment = function(messageId){
        messageFactory.createComment($scope.comment, messageId, setMessages);
    }

});