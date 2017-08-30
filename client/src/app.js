import angular from 'angular'
import "@uirouter/angularjs"
angular.module('olympics', ['ui.router'])

.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/sports')
  $stateProvider
  .state('sports',{
    url:'/sports',
    templateUrl:'sports/sport-nav.html',
    resolve: {
      sportsService :function ($http){
         return  $http.get('/sports');
      }
    },
    controller: function(sportsService){
           
           this.sports = sportsService.data ;
  },
     controllerAs:'sportsCtrl'
  })

  .state('sports.medals',{
    url:'/:sportName',
    templateUrl:'sports/sports-medal.html',
    resolve : {
      medalsService: function($http,$stateParams){
       return   $http.get(`/sports/${$stateParams.sportName}`);
      }
    },
    controller: function(medalsService){
       this.medals = medalsService.data;
    },
    controllerAs:'medalCtrl'

  })

   .state('sports.new', {
     url : '/:sportName/medal/new',
     templateUrl:'sports/new-medal.html',
     controller: function($stateParams, $state, $http){
       this.sportName = $stateParams.sportName;
       this.saveMedal = function(medal){
              $http({method:'POST', url:`/sports/${$stateParams.sportName}/medals`,
                data:{medal}
            
            }).then(function(){
                $state.go('sports.medals', {sportName:$stateParams.sportName});

            })
            
             
       };
     },
      controllerAs:'newMedalCtrl'
   })

})

