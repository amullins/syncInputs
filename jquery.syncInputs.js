;(function($) {
    'use strict';

    $.fn.syncInputs = function(options) {
        options = $.extend({}, $.fn.syncInputs.defaults, options);

        return this.each(function() {
            var $syncThese = options.what, $this = $(this);
            if ($.isFunction(options.what)) $syncThese = $(options.what.apply(this));
            else if ($.type(options.what) === 'string' || $.isArray(options.what)) $syncThese = $(options.what);

            $this.on(options.events, function(e) {
                options.sync.apply(this, [e, $syncThese]);
            });
        });
    };

    $.fn.syncInputs.defaults = {
        // this function performs the syncing every time the specified event occurs for the element
        sync : function(e, $syncThese) {
            var $this = $(this), tag = this.tagName.toLowerCase();
            if (tag === 'input') {
                switch ($this.attr('type')) {
                    case 'checkbox' :
                    case 'radio' :
                        $syncThese.prop('checked', $this.is(':checked'));
                    break;
                    default :
                        $syncThese.val($this.val());
                }
            }
        },

        // by default, look for a data-sync-inputs attribute (syncInputs data) that contains
        // a CSS selector for selecting the inputs that should be synced
        what : function() {
            return $(this).data('syncInputs') || '';
        },

        // be careful which events you use, here.
        // using events that aren't supported for the input will break things
        events : 'change'
    };

})(jQuery);