(function($){
    $(document).on('ipInitForms', function() {
        "use strict";

        $('.ipsModuleFormAdmin .date-field').datepicker(dateUiConfig); //initializing forms if we are in admin interface
        $('.ipsModuleFormPublic .date-field').datepicker(dateUiConfig); //initializing forms in public interface
        //initializing forms in public interface

    });
})(jQuery);