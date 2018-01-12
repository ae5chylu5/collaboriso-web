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

import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
    if (!ISOs.find().count()) {
        var dtStr = MyUtils.getSQLDate();

        ISOs.insert(
            {
                bootType: 0,
                strictHash: 1,
                title: "Dr Web",
                image: "/drweb.png",
                hash: "352067f40c6d2803a53ca347334add5db745c48a",
                category: "Anti-Virus",
                bootOptions: "linux {{ISOFOLDER}}/casper/vmlinuz live-media-path={{ISOFOLDER}}/casper root=UUID={{UUID}} maybe-ubiquity debian-installer/language=en boot=casper showmounts ignore_uuid noprompt quiet splash --\ninitrd {{ISOFOLDER}}/casper/initrd.lz",
                created: dtStr,
                modified: dtStr,
                status: 1,
                rating: 0,
                uid: 'admin',
                uname: 'admin'
            }
        );

        dtStr = MyUtils.getSQLDate();

        ISOs.insert(
            {
                bootType: 0,
                strictHash: 1,
                title: "Eset",
                image: "/eset.png",
                hash: "330c4cba749900a5902d355a1d87bfc18e98da88",
                category: "Anti-Virus",
                bootOptions: "linux {{ISOFOLDER}}/casper/vmlinuz live-media-path={{ISOFOLDER}}/casper root=UUID={{UUID}} maybe-ubiquity debian-installer/language=en boot=casper showmounts ignore_uuid noprompt quiet splash --\ninitrd {{ISOFOLDER}}/casper/initrd.lz",
                created: dtStr,
                modified: dtStr,
                status: 1,
                rating: 0,
                uid: 'admin',
                uname: 'admin'
            }
        );
    }
});

/*Meteor.methods({
  getRatingsData( filter ) {
    check( filter, Object );

    let group = {
      _id: {
        iid: '$iid'
      },
      rating: {
        $avg: '$rating'
      }
    };

    return VOTES.aggregate(
      { $match: filter },
      { $group: group }
    );
  }
});*/
