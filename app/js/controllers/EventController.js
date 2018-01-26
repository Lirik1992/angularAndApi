'use strict';

eventsApp.controller('EventController', 
function EventController($scope) {
    $scope.boolValue = false;
    $scope.sortorder = 'name';

    $scope.event = {
        name: 'Lirikus',
        author: 'Lirik',
        job: 'MERA',
        time: new Date(),
        location: {
            address: 'Osharskaya 15/27',
            city: 'N.Novgorod',
            state: 'Nizhegorodskaya oblast'
        },
        imageUrl: '/img/angularjs-logo.png',
        sessions: [
            {
                name: 'Directives Masterclass',
                creatorName: 'Bob',
                duration: 1,
                level: 'Advanced',
                abstract: 'Learn ins and outs of directives',
                upVoteCount: 0
            },
            {
                name: 'Scopes for fun and profit',
                creatorName: 'John Doe',
                duration: 2,
                level: 'Introductory',
                abstract: 'Closer look at scopes',
                upVoteCount: 0
            },
            {
                name: 'Well behave Controllers',
                creatorName: 'Jane Doe',
                duration: 4,
                level: 'Intermediate',
                abstract: 'How to craft controllers that win the respect of everybody',
                upVoteCount: 0
            }
        ]
    }
    $scope.upVoteSession = function(session) {
        session.upVoteCount++;
    }
    $scope.downVoteSession = function(session) {
        session.upVoteCount--;
    }
})