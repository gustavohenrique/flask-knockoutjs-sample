var poupaniquel = {};
var $ = $ || {};

poupaniquel.getAjax = function(url) {
    var response;
    $.ajax({
        async: false,
        url: url,
        contentType: 'application/json',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            response = result;
        },
        error: function(result) {
            response = result;
        }
    });

    var result = function() {
        return response;
    };
    return result();
};

var createGrid = function(model, configuration) {
    var gridConfig = configuration.grid;
    gridConfig.source = {
        localdata: model.items,
        datatype: 'local'
    };
    $(gridConfig.elementId).jqxGrid(gridConfig);

    $(gridConfig.elementId).bind('rowselect', function (event) {
        $('.btndelete').removeClass('disabled');
    });
};

poupaniquel.configure = function(configuration) {
    var $this = this;
    $this.configuration = configuration;

    var maindata = $this.getAjax(configuration.grid.services.load);

    var dataKo = $this.utils.ko.mapping(maindata, configuration);
    var model = new GridModel(dataKo, configuration);

    // create a top level attr using datafield name as key
    if (configuration.hasOwnProperty('dropdown')) {
        for (var i = 0; i < configuration.dropdown.length; i++) {
            var dt = configuration.dropdown[i],
                datafield = dt.datafield,
                root = dt.root;

            try {
                model[datafield] = $this.getAjax(dt.url)[root];
                model['chosen'+datafield] = ko.observable();
            } catch (err) {}
        }
    }

    $this.model = model;
    ko.applyBindings(model);

    createGrid(model, configuration);

    if (model.items.length === 0) {
        model.addItem();
    }
};
