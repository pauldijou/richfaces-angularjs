angular.module('richfaces.config', []).value('richfaces.config', {})
angular.module 'richfaces.services',['richfaces.config']
angular.module 'richfaces.directives',['richfaces.config', 'richfaces.services']
angular.module 'richfaces.filters',['richfaces.config', 'richfaces.services']
angular.module 'richfaces',['richfaces.config', 'richfaces.directives', 'richfaces.filters', 'richfaces.services']
