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

ISOs = new Mongo.Collection("ISOs");

ISOs.allow({
    insert: function(uid, obj) {
        return (Meteor.user() && obj.uid == uid);
    },
    remove: function(uid, obj) {
        return (Meteor.user() && obj.uid == uid);
    },
    update: function(uid, obj) {
        return (Meteor.user() && obj.uid == uid);
    }
});

VOTES = new Mongo.Collection("VOTES");

VOTES.allow({
    insert: function(uid, obj) {
        return (Meteor.user() && obj.uid == uid);
    },
    update: function(uid, obj) {
        return (Meteor.user() && obj.uid == uid);
    }
});
