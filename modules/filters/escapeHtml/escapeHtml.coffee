angular.module('richfaces.filters').filter 'escapeHtml', ['richfaces.config', (config) ->
  (input) ->
    input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
]