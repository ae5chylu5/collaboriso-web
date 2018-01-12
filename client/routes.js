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

Router.configure({layoutTemplate: 'isosLayout'});

Router.route('/', function () {
  this.redirect('/stable');
});

Router.route('/stable', function () {
  this.layout('isosLayout');
  this.render('navbar', {to:"navbar", data: 'stable'});
  this.render('add_iso_form', {to:"create"});
  this.render('isos', {to:"main", data: function() {
      return ISOs.find({status:1}, {sort:{created:-1}, limit:Session.get("isoLimit")});
  }});
});

Router.route('/unverified', function () {
  this.layout('isosLayout');
  this.render('navbar', {to:"navbar", data: 'unverified'});
  this.render('add_iso_form', {to:"create"});
  this.render('isos', {to:"main", data: function() {
      return ISOs.find({status:0}, {sort:{created:-1}, limit:Session.get("isoLimit")});
  }});
});

Router.route('/trash', function () {
  this.layout('isosLayout');
  this.render('navbar', {to:"navbar", data: 'trash'});
  this.render('add_iso_form', {to:"create"});
  this.render('isos', {to:"main", data: function() {
      return ISOs.find({status:-1}, {sort:{created:-1}, limit:Session.get("isoLimit")});
  }});
});

Router.route('/:prepo/:pfilter::pfilteropt/:psort::psortopt', function () {
    this.layout('filterLayout');

    var pfilteropt = this.params.pfilteropt.replace(/[^a-zA-Z0-9_\- ]/g, '');

    var psortopt;
    switch (this.params.psortopt) {
        case 'dsc':
            psortopt = -1;
            break;
        case 'asc':
            psortopt = 1;
            break;
        default:
            psortopt = -1;
    }
    
    var repoName;
    var prepo = {};
    switch (this.params.prepo) {
        case 'stable':
            prepo.status = 1;
            repoName = 'stable';
            break;
        case 'unverified':
            prepo.status = 0;
            repoName = 'unverified';
            break;
        case 'trash':
            prepo.status = -1;
            repoName = 'trash';
            break;
        default:
            prepo.status = 1;
            repoName = 'stable';
    }
    
    switch (this.params.pfilter) {
        case 'group':
            prepo.category = pfilteropt;
            break;
        case 'user':
            prepo.uid = pfilteropt;
            break;
        default:
            prepo.category = 'Anti-Virus';
    }
    
    var psort = {};
    switch (this.params.psort) {
        case 'date':
            psort.created = psortopt;
            break;
        case 'rating':
            psort.rating = psortopt;
            break;
        default:
            psort.created = -1;
    }

    this.render('navbar', {to:"navbar", data: repoName});
    this.render('add_iso_form', {to:"create"});
    this.render('filterbar', {to:"filterbar", data: function() {
        return this.params;
    }});
    this.render('isos', {to:"main", data: function() {
        return ISOs.find(prepo, {sort:psort, limit:Session.get("isoLimit")});
    }});
});

Router.route('/iso/:_id', function () {
  this.layout('isoLayout');
  this.render('navbar', {to:"navbar", data: 'iso'});
  this.render('add_iso_form', {to:"create"});
  this.render('confirm_delete', {to:"confirm"});
  this.render('iso', {to:"main", data: function() {
      return ISOs.findOne({_id:this.params._id});
  }});
  this.render('comments', {to:"comments"});
});

Router.route('/about', function () {
  this.layout('htmlLayout');
  this.render('navbar', {to:"navbar", data: 'about'});
  this.render('add_iso_form', {to:"create"});
  this.render('about', {to:"main"});
});
