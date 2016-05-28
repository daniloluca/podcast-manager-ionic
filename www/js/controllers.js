angular.module('starter.controllers', [])

.controller('PodcastsCtrl', function($scope, $ionicPopup, $state, Podcasts) {
  $scope.search = function(){
    $scope.data = {};
    $ionicPopup.show({
      template: '<input type="Text" ng-model="data.term">',
      title: 'Search',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Search</b>',
          type: 'button-positive',
          onTap: function(e) {3
            $state.go('tab.podcasts-search', {term: $scope.data.term})
          }
        },
      ]
    });
  };

  $scope.podcasts = Podcasts.allPodcasts();
})

.controller('SearchCtrl', function($scope, $stateParams, Podcasts){
  Podcasts.searchPodcast($stateParams.term).then(function(response){
    $scope.podcasts = response.data;
  }); 
})

.controller('PodcastEpisodesCtrl', function($scope, $stateParams, $http, Podcasts) {
  $scope.podcastId = $stateParams.podcastId;

  Podcasts.getEpisodes($stateParams.podcastId).then(function(response){
    $scope.episodes = response.data;
  });
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
