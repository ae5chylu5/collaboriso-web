# collaboriso-web
Meteor web app for managing iso repo

# INSTALL
meteor create --bare collaboriso-web
git clone https://github.com/ae5chylu5/collaboriso-web.git
meteor add [nameOfPackage]

# REQUIRED PACKAGES
accounts-github                  1.3.0*
accounts-password                1.4.0*
accounts-ui                      1.1.9*
autopublish                      1.0.7
barbatus:stars-rating            1.1.1
blaze-html-templates             1.1.2
ecmascript                       0.8.2*
es5-shim                         4.6.15
github-config-ui                 1.0.0
iron:router                      1.1.2
meteor-base                      1.1.0*
meteorhacks:aggregate            1.3.0
mobile-experience                1.0.4*
mongo                            1.2.1*
reactive-var                     1.0.11
session                          1.1.7
shell-server                     0.2.4*
standard-minifier-css            1.3.4*
standard-minifier-js             2.1.1*
themeteorchef:jquery-validation  1.14.0
tracker                          1.1.3
twbs:bootstrap                   3.3.6

# TODO
Finish rating feature by adding client side aggregate function.
Implement comments feature on iso pages.
Implement ethereum token factory to distribute token to contributors.
