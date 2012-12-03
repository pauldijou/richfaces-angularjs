angular.module('richfaces.services').service 'html',[() ->
  {
    escape: (string) ->
      string.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
  }
]