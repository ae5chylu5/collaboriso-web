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

Router.route('/:repo/update:', function() {
    var redirectUrl = 'http://' + this.request.headers['host'] + '/' + this.params.repo + '/update:null';

    this.response.writeHead(302, {
        'Location': redirectUrl
    });

    this.response.end();
}, {where: 'server'});

Router.route('/:repo/update::timestamp', function() {
    var status;
    switch (this.params.repo) {
        case 'stable':
            status = 1;
            break;
        case 'unverified':
            status = 0;
            break;
        case 'trash':
            status = -1;
            break;
        default:
            status = 1;
    }
    
    var validTstamp = (this.params.timestamp.search(/\d{4}\-\d{2}\-\d{2} \d{2}\:\d{2}\:\d{2}\.\d{3}/) > -1);
    
    var findObj = {};
    findObj.status = status;
    if (validTstamp) {
        findObj.created = {};
        findObj.created.$gt = this.params.timestamp;
    }
    
    var jsonObj = {};
    jsonObj.isos = [];

    var isoObj;
    ISOs.find(findObj).forEach(function(entry) {
        isoObj = {};
        isoObj.bootType = entry.bootType;
        isoObj.strictHash = entry.strictHash;
        isoObj.title = entry.title;
        isoObj.hash = entry.hash;
        isoObj.category = entry.category;
        isoObj.bootOptions = entry.bootOptions;
        isoObj.created = entry.created;
        isoObj.modified = entry.modified;
        jsonObj.isos.push(isoObj);
    });
    
    var jsonStr = JSON.stringify(jsonObj);
    
    var headers = {'Content-type': 'application/json'};
    this.response.writeHead(200, headers);
    this.response.end(jsonStr);
}, {where: 'server'});
