angular.module('richangular.filters').filter 'escapeHtml', ['richangular.config', (config) ->
  (input) ->
    input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
]