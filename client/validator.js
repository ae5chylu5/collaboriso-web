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

gValidator = null;

$.validator.addMethod( 'hashUnique', ( hash ) => {
  let exists = ISOs.findOne( { "hash": hash }, { fields: { "title": 1 } } );
  return (!Session.get("modalType") && exists) ? false : true;
});

$.validator.addMethod( 'titleUnique', ( title ) => {
  let exists = ISOs.findOne( { "title": title }, { fields: { "title": 1 } } );
  return (!Session.get("modalType") && exists) ? false : true;
});

$.validator.addMethod( 'sha1Valid', ( hash ) => {
  return (hash.search(/[^a-zA-Z0-9]/g) < 0);
});

$.validator.addMethod( 'catValid', ( category ) => {
  return (category.search(/[^a-zA-Z0-9_\- ]/g) < 0);
});

$.validator.addMethod( 'imageValid', ( image ) => {
  return (!Session.get("modalType") && image.search(/\.(gif|jpe?g|png)$/g) < 0) ? false : true;
});

Template.add_iso_form.onRendered( function() {
  gValidator = $( "#form_add_iso" ).validate({
    rules: {
      title: {
        required: true,
        minlength: 2,
        maxlength: 64,
        titleUnique: true
      },
      image: {
        imageValid: true
      },
      category: {
        required: true,
        minlength: 2,
        maxlength: 32,
        catValid: true
      },
      hash: {
        required: true,
        minlength: 40,
        maxlength: 40,
        hashUnique: true,
        sha1Valid: true
      },
      strictHash: {
        required: true
      },
      bootOptions: {
        required: true,
        minlength: 1,
        maxlength: 1024
      }
    },
    messages: {
      title: {
        required: "Please enter a title",
        minlength: "Please enter a longer title",
        maxlength: "The title must be less than 64 characters",
        titleUnique: "The title already exists. Be more descriptive."
      },
      image: {
        required: "Please select an image",
        imageValid: "The image must be gif, jpg or png"
      },
      category: {
        required: "Please select or enter a category",
        minlength: "Please enter a longer category name",
        maxlength: "The category must be less than 32 characters",
        catValid: "Only [a-zA-Z0-9 \-_] are allowed"
      },
      hash: {
        required: "Please enter the sha1 hash",
        minlength: "A valid sha1 hash must be 40 characters",
        maxlength: "A valid sha1 hash must be 40 characters",
        hashUnique: "The hash already exists. Hooray for spare time!",
        sha1Valid: "Only alphanumeric characters are allowed"
      },
      strictHash: {
        required: "Check or no check. That is the question."
      },
      bootOptions: {
        required: "Please enter the boot options",
        minlength: "Please enter the boot options",
        maxlength: "1024 is the limit, bub!"
      }
    }
  });
});
