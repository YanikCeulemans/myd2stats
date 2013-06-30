'use strict';

angular.module('kdaApp')
    .controller('MainCtrl', function($scope, $http) {
        $scope.dota2Model = {};

        $http.get("data/heroes.json").success(function(data) {
            $scope.dota2Model.heroList = data.heroes;
        });

        $scope.calculate = function() {
            $http.get('/matchhistory', {
                params: {
                    key: 'F18F48C2D6FD792A7D9FDB9CC3385B83',
                    player_name: $scope.dota2Model.queryPlayer,
                    hero_id: $scope.dota2Model.queryHero.id
                }
            }).success(function(data) {
                    $scope.dota2Model.matchHistory = data.result;
                }).error(function (error){
                    console.log(error);
                });
        }

        $scope.getMatch = function(id){
            $http.get('/matchdetails', {
                params: {
                    key: 'F18F48C2D6FD792A7D9FDB9CC3385B83',
                    match_id: id
                }
            }).success(function(data){
                console.log(data);
                $scope.dota2Model.matchDetails = data;
            }).error(function(error){
                console.log(error);
            });
        }
    });
