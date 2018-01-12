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

MyUtils = {

    leadingZeroes: function(num, minLength) {
        var numStr = num.toString();
        while (numStr.length < minLength) {
            numStr = '0'+numStr;
        }
        return numStr;
    },

    getSQLDate: function() {
        var dt = new Date();
        var mOfY = this.leadingZeroes(dt.getMonth() + 1, 2);
        var dOfM = this.leadingZeroes(dt.getDate(), 2);
        var hours = this.leadingZeroes(dt.getHours(), 2);
        var minutes = this.leadingZeroes(dt.getMinutes(), 2);
        var seconds = this.leadingZeroes(dt.getSeconds(), 2);
        var milliseconds = this.leadingZeroes(dt.getMilliseconds(), 3);
        var dtStr = dt.getFullYear() +'-'+ mOfY +'-'+ dOfM +' '+ hours +':'+ minutes +':'+ seconds +'.'+ milliseconds;
        return dtStr;
    },
    
    getUserName: function() {
        var guest = 'guest';
        if (!'user' in Meteor || !Meteor.user()) return guest;
        
        var muser = Meteor.user();
        if ('services' in muser && 'github' in muser.services && 'username' in muser.services.github && muser.services.github.username) {
            return muser.services.github.username;
        }
        
        if ('username' in muser && muser.username) {
            return muser.username;
        }

        return guest;
    },
    
    convertImage: function(img, maxW, maxH) {
        var imgData = document.getElementById('imageData');

        if (img.src.search(/collaboriso\.png$/) > -1) {
            imgData.value = "";
            return;
        }
        
        var iw = img.width;
        var ih = img.height;
        var scale = Math.min((maxW / iw), (maxH / ih));
        var iwScaled = iw * scale;
        var ihScaled = ih * scale;
        
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = iwScaled;
        canvas.height = ihScaled;
        
        ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
        
        imgData.value = canvas.toDataURL();
    }
}; 
