/**
 * @package ImpressPages
 *
 */


var IpWidget_KbForm = function () {
    this.data = null;
    this.modal = null;
    this.container = null;
    this.addButton = null;
    this.confirmButton = null;
    this.$widgetOverlay = null;
    this.fBuilder = null;

    this.init = function ($widgetObject, data) {
        var context = this;
        this.data = data;
        this.widgetObject = $widgetObject;


        this.$widgetOverlay = $('<div></div>');
        this.widgetObject.prepend(this.$widgetOverlay);
        this.$widgetOverlay.on('click', $.proxy(openPopup, this));

        $(document).on('ipWidgetResized', function () {
            $.proxy(fixOverlay, context)();
        });
        $(window).on('resize', function () {
            $.proxy(fixOverlay, context)();
        });
        $.proxy(fixOverlay, context)();

    };

    var fixOverlay = function () {
        this.$widgetOverlay
            .css('position', 'absolute')
            .css('z-index', 1000) // should be higher enough but lower than widget controls
            .width(this.widgetObject.width())
            .height(this.widgetObject.height());
    };

    var openPopup = function () {
        var context = this;
        this.modal = $('#ipWidgetFormPopup2');
        this.addButton = this.modal.find(".ipsFieldAdd");
        this.container = this.modal.find('.ipWidget_ipForm_container');
        this.confirmButton = this.modal.find('.ipsConfirm');
        this.modal.modal();

        this.confirmButton.on('click', $.proxy(save, this));

        this.modal.on('shown.bs.modal', function () {
            context.modal.find('#ipWidgetKFormPopup-fields .ipWidget_ipForm_container').remove();
            context.modal.find('#ipWidgetKFormPopup-fields').append('<div class="ipWidget_ipForm_container"></div>');

            var def = JSON.stringify(context.data.fields);

            context.fBuilder = context.modal.find('#ipWidgetKFormPopup-fields .ipWidget_ipForm_container').formBuilder({
                formData: def,
                messages: ipFormMessages
            });

        });

        ipInitForms();
    };

    var save = function (e) {
        var data = {};
        data.fields = JSON.parse(this.modal.find('#ipWidgetKFormPopup-fields .ipWidget_ipForm_container').data('formBuilder').formData);
        data.success = this.modal.find('textarea[name=success]').val();
        data.sendTo = this.modal.find('select[name=sendTo]').val();
        data.emails = this.modal.find('input[name=emails]').val();
        data.buttonText = this.modal.find('input[name=buttonText]').val();

        console.log(data.fields)

        this.widgetObject.save(data, 1);
        this.modal.modal('hide');
    };
};



