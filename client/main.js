/********************************************************************

Name: Collaboriso Web
Homepage: http://github.com/ae5chylu5/collaboriso-web
Author: ae5chylu5
Description: Meteor app for managing iso repo

Copyright (C) 2017 ae5chylu5

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

********************************************************************/

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Session.set("isoLimit", 6);

Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL",
    requestPermissions: {
        github: ['email']
    }
});

lastScrollTop = 0;
$(window).scroll(function(event) {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > lastScrollTop) {
            Session.set("isoLimit", Session.get("isoLimit") + 6);
        }
        lastScrollTop = scrollTop;
    }
});

Template.navbar.helpers({
    isActive: function(btn) {
        return (this == btn);
    },
    getUserName: function() {
        return MyUtils.getUserName();
    },
    isGitHub: function() {
        try {
            return (Meteor.user().services.github.username) ? true : false;
        } catch(e) {
            return false;
        }
    },
    isLoggedIn: function() {
        return (Meteor.user());
    }
});

Template.filterbar.helpers({
    isSortedDate: function(param) {
        return (param == 'date');
    },
    isSortedDsc: function(param) {
        return (param == 'dsc');
    }
});

Template.iso.helpers({
    isUser: function(iso_uid) {
        // we don't allow editing trash items (status == -1)
        return (this.status != -1 && Meteor.user() && iso_uid && Meteor.user()._id == iso_uid);
    },
    getRepoName: function(status) {
        switch (status) {
            case 1: return 'stable';
            case 0: return 'unverified';
            case -1: return 'trash';
        }
    },
    getSortType: function() {
        return (Router.current().params.psort == "rating") ? "rating" : "date";
    },
    getSortOpt: function() {
        return (Router.current().params.psortopt == "asc") ? "asc" : "dsc";
    }
});

Template.isos.helpers({
    isos: function() {
        return this;
    },
    getRating: function() {
        var id = this._id;
        //var avg = VOTES.aggregate([{ $match: { "iid": this._id }}, { $group: { _id: null, avgRating: { $avg: "$rating" }}} ]);
        //var test = VOTES.aggregate([{ $group: { _id: "$iid", avgRating: { $avg: "$rating" }} }]);
        var rawVOTES = VOTES.rawDatabase();
        //var aggregateQuery = Meteor.wrapAsync(rawVOTES.aggregate, rawVOTES);
        //var pipeline = [{ $group: { _id: "$iid", avgRating: { $avg: "$rating" }} }];
        //var result = aggregateQuery(pipeline);
        //console.log(result);
        return 5;
    },
    getRepoName: function(status) {
        switch (status) {
            case 1: return 'stable';
            case 0: return 'unverified';
            case -1: return 'trash';
        }
    },
    getSortType: function() {
        return (Router.current().params.psort == "rating") ? "rating" : "date";
    },
    getSortOpt: function() {
        return (Router.current().params.psortopt == "asc") ? "asc" : "dsc";
    }
});
