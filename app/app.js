"use strict";
console.log("App.js is connected!");

/*
An Angular application designed to allow users the ability to create a 
field journal of drink experiences. 

The app will attach to firebase to store all of the user's information.
The user's information will include:
	
		Field Journal,
		Recipes Information,
		Personal Information,
		Ratings and Reviews for specific Locations
*/

var app = angular.module("MyPretentiousCup", ['ui.router'])

.service('fbRef', function(FBCreds) {
	return firebase.initializeApp(FBCreds);
})

.config(function($stateProvider, $urlRouterProvider) {

				console.log("I am within the config");

				$urlRouterProvider.otherwise('/landing');

				// HOME STATES AND NESTED VIEWS ========================================

				$stateProvider

					.state('landing', {
						url: '/landing',
						templateUrl: '../partials/Landing.html',
						controller: "LandingCtrl"			      		           
			  	})
					.state('landing.login', {
            url: '^/login',
            templateUrl: '../partials/Login.html',
            controller: "LoginCtrl"
					})
					.state('landing.register', {
						url: '^/register',
            templateUrl: '../partials/Register.html',
            controller: "RegisterCtrl"
					})
					.state('home', {			
						url: '/home',
						views: {
							"": { 
								templateUrl: 'partials/Home.html',
								controller: "HomeCtrl"
							},
              "main@home": { 
              	templateUrl: 'partials/Main.html',
              	controller: "MainCtrl"              	
              },
              "fieldJournal@home": {
              	url: '/fieldJournal',
              	templateUrl: 'partials/FieldJournal.html',
              	controller: "FieldJournalCtrl"
              },
              "fieldjournal.newFieldJournal@home": {
              	url: '/new',
              	templateUrl: 'partials/NewFieldJournal.html',
              	controller: 'NewFieldJournalCtrl'
              },
              "recipes@home": {
              	templateUrl: 'partials/Recipes.html',
              	controller: "RecipesCtrl"
              },
              "drinkingBuddies@home": {
              	template: 'partials/DrinkingBuddies.html',
              	controller: "DrinkingBuddiesCtrl"
              },
              "globeView@home": {
              	template: 'partials/GlobeView.html',
              	controller: "GlobeViewCtrl"
              }
            }						
					})      		   		       
	        .state('sample', {
	        	url: '/sampleView',
	        	templateUrl: '../partials/Sample.html',
	        	controller: "SampleCtrl"		        				        
	        })		        
	        .state('notARoute', {
	        	url: '*path',
	        	template: function($location, $scope) {
	        		alert("I'm sorry, but the route you have chosen is not available. We're sending you back to your most rpevious page to try again!");		      
	        		$window.history.back();
	        	}
	        });

	
})

.run((fbRef) => {
	console.log("You are connected");
	fbRef.database().ref('users').once('value').then(
			(snapshot) => console.log(snapshot.val())
		);
});
















