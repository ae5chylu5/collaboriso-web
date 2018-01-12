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


Template.navbar.events({
    'click .js-show-mod-add-iso': function(event) {
        Session.set("modalType", 0);
        var isofrm = document.getElementById('form_add_iso');
        isofrm.reset();
        gValidator.resetForm();
        isofrm.strictHash.checked = true;
        var hash = document.getElementById('form_hash');
        hash.removeAttribute('readonly');
        var img = document.getElementById('imagePreview');
        img.src = "/collaboriso.png";
        $("#modal_edit").css("display", "none");
        $("#modal_create").css("display", "inline");
        $("#mod_add_iso").modal('show');
    }
});

Template.iso.events({
    'click .js-del-iso': function(event) {
        Session.set("activeID", this._id);
        $("#confirm_delete").modal('show');
    },
    'click .js-edit-iso': function(event) {
        Session.set("modalType", 1);
        var iso = ISOs.findOne({_id:this._id});
        var isofrm = document.getElementById('form_add_iso');
        var img = document.getElementById('imagePreview');
        isofrm.title.value = iso.title;
        img.src = iso.image;
        isofrm.category.value = iso.category;
        isofrm.hash.value = iso.hash;
        isofrm._id.value = this._id;
        isofrm.strictHash.checked = iso.strictHash;
        isofrm.bootOptions.value = iso.bootOptions;
        var hash = document.getElementById('form_hash');
        hash.setAttribute('readonly','true');
        gValidator.resetForm();
        $("#modal_edit").css("display", "inline");
        $("#modal_create").css("display", "none");
        $("#mod_add_iso").modal('show');
    }
});

Template.isos.events({
    'click .js-rate-iso': function(event) {
        var rating = $(event.currentTarget).data("userrating");
        var iso_id = this.id;
        var urate = VOTES.findOne( { "uid": Meteor.user()._id, "iid": iso_id }, { fields: { "_id": 1 } } );
        
        if (urate) {
            VOTES.update( { "_id": urate._id }, { $set: { "rating": rating } } );
        } else {
            VOTES.insert({
                iid: iso_id,
                uid: Meteor.user()._id,
                rating: rating
            });
        }
    }
});

Template.confirm_delete.events({
    'click .js-del-iso-confirm': function(event) {
        var iso_id = Session.get("activeID");
        $("#"+iso_id).hide('slow', function() {
            ISOs.update({_id:iso_id}, {$set: {status:-1}});
        });
        $("#confirm_delete").modal('hide');
        return false;
    }
});

Template.add_iso_form.events({
    'submit .js-add-iso': function(event) {
        if (!Meteor.user()) {
            console.log("security event detected");
            return false;
        }

        // make sure user has provided an image
        var img = document.getElementById('imagePreview');
        var imgData = document.getElementById('imageData');
        if (img.src.search(/collaboriso\.png$/) > -1 || !imgData.value) {
            console.log("the collaboriso logo cannot be used for new ISOs");
            return false;
        }
        
        var strictHash = (event.target.strictHash.checked) ? 1 : 0;
        var dtStr = MyUtils.getSQLDate();
        var hash = event.target.hash.value.toLowerCase();
        var iso = ISOs.findOne( { "hash": hash }, { fields: { "uid": 1 } } );
        
        if (iso) {
            if (iso.uid != Meteor.user()._id) {
                console.log("security event detected");
                return false;
            }
            
            ISOs.update({_id:event.target._id.value}, {$set: {
                title: event.target.title.value,
                image: imgData.value,
                category: event.target.category.value,
                strictHash: strictHash,
                bootOptions: event.target.bootOptions.value,
                modified:dtStr
            }});
        } else {
            ISOs.insert({
                bootType: 0,
                strictHash: strictHash,
                title: event.target.title.value,
                image: imgData.value,
                hash: hash,
                category: event.target.category.value,
                bootOptions: event.target.bootOptions.value,
                created: dtStr,
                modified:dtStr,
                status: 0,
                rating: 0,
                uid: Meteor.user()._id,
                uname: MyUtils.getUserName()
            });
        }

        $("#mod_add_iso").modal('hide');
        return false;
    },
    'change .js-is-image-valid': function(event) {
        var path = event.target.value;
        var img = document.getElementById('imagePreview');
        
        if (path.search(/\.(gif|jpe?g|png)$/g) > -1) {
            if ('files' in event.target && event.target.files.length > 0 && event.target.files[0]) {
                var reader = new FileReader();
                reader.addEventListener("load", function () {
                    img.src = reader.result;
                }, false);
                reader.readAsDataURL(event.target.files[0]);
            }
        } else {
            img.src = "/collaboriso.png";
        }  
    },
    'click .js-sub-add-iso': function(event) {
        $("#form_add_iso").submit();
    }
});
