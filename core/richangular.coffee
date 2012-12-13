angular.module('richangular.config', []).value('richangular.config', {})
angular.module 'richangular.services',['richangular.config']
angular.module 'richangular.directives',['richangular.config', 'richangular.services']
angular.module 'richangular.filters',['richangular.config', 'richangular.services']
angular.module 'richangular',['richangular.config', 'richangular.directives', 'richangular.filters', 'richangular.services']
