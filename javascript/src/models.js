var GridModel = function (items, configuration) {
    var $this = this;
    //$this.items = ko.observableArray(items);
    $this.items = items;
    $this.configuration = configuration;
    if (! configuration.hasOwnProperty('dateFormat')) {
        $this.configuration.dateFormat = 'YYYY-MM-DD';
    }

    if (! $this.configuration.grid.hasOwnProperty('ordering')) {
        $this.configuration.grid.ordering = 'asc';
    }

    if (configuration.hasOwnProperty('methods')) {
        var methods = configuration.methods;
        for (var i = 0; i < methods.length; i++) {
            method = methods[i];
            $this[method.name] = method.source;
        }
    }

    this.addItem = function() {
        var item = {},
            columns = $this.configuration.grid.columns;

        var update = function(newValue) {
            if (newValue) {
                this.isModified = true;
            }
        };

        for (var i = 0; i < columns.length; i++) {
            var column = columns[i].datafield,
                columntype = columns[i].columntype,
                defaultvalue = '';

            switch (columntype) {
                case 'dropdownlist': defaultvalue = {id: 0, name: ''}; break;
                case 'numberinput': defaultvalue = 0; break;
                case 'number': defaultvalue = 0; break;
                case 'datetimeinput': defaultvalue = new Date(); break;
                case 'date': defaultvalue = (moment) ? moment().format($this.configuration.dateFormat) : new Date(); break;
            }

            item[column] = ko.observable(defaultvalue);
            item.isModified = false;
            item[column].subscribe(update, item);
        }

        if ($this.configuration.grid.ordering === 'asc') {
            $this.items.push(item);
        } else {
            $this.items.unshift(item);
        }
        refreshGrid();
    };

    this.removeItem = function() {
        var selectedrowindex = $this.getSelectedRowIndex();

        if (selectedrowindex >= 0) {
            var item = $this.items[selectedrowindex];
            if (item) {
                var deletedItem = $this.items.splice(selectedrowindex, 1)[0];
                refreshGrid();

                var url = $this.configuration.grid.services.remove,
                    vector = url.split('$'),
                    attribute = vector[vector.length - 1];

                if (deletedItem.hasOwnProperty(attribute) && deletedItem[attribute]().length > 0) {
                    delete deletedItem.isModified;
                    url = url.replace('$'+attribute, deletedItem[attribute]());
                    poupaniquel.getAjax(url);
                }
            }

            if ($this.items.length === 0) {
                $this.addItem();
            }
        }
    };

    this.updateItem = function() {
        var modifiedItems = getItemsByAttribute('isModified', $this.items);

        if (modifiedItems.length > 0) {

            var ajaxConf = {
                async: true,
                url: configuration.grid.services.save,
                contentType: 'application/json',
                type: 'POST',
                dataType: 'json',
                data: ko.toJSON(modifiedItems)
            };

            if (configuration.grid.hasOwnProperty('success')) {
                ajaxConf.success = configuration.grid.success;
            }

            if (configuration.grid.hasOwnProperty('error')) {
                ajaxConf.error = configuration.grid.error;
            }

            $.ajax(ajaxConf);
        }

        return modifiedItems;
    };

    this.refreshItems = function() {
        var maindata = poupaniquel.getAjax(configuration.grid.services.load);
        var dataKo = poupaniquel.utils.ko.mapping(maindata, configuration);
        poupaniquel.model = new GridModel(dataKo, configuration);
        refreshGrid();
    };

    this.filter = function() {
        var root = $this.configuration.grid.root,
            data = {
            "fields": [{
                "category": {"id": 2, "name": "Internet"},
                "payee": {"id": 4, "name": "dealextreme"},
                "amount": "-200",
                "transaction_date": "2011-10-11",
                "description": "Another thing",
                "id": 2
            }],
            "total": 1
        };

        $this.items.splice(0, $this.items.length);
        for (var i = 0; i < data[root].length; i++) {
            var jsonObject = data[root][i];
            var model = poupaniquel.utils.ko.fromJson(jsonObject);
            $this.items.push(model);
        }
        refreshGrid();
        $('#myModal').modal('hide');
    };

    this.getSelectedRowIndex = function() {
        var elementId = $this.configuration.grid.elementId;
        return $(elementId).jqxGrid('getselectedrowindex');
    };

    var getItemsByAttribute = function(field, items) {
        var result = [];

        for (var i = 0; i < items.length; i += 1) {
            var item = items[i];
            if (field in item && item[field] === true) {
                var clone = cloneObject(item);
                delete clone.isModified;
                item.isModified = false;
                result.push(clone);
            }
        }
        // return model clone without isModified attribute
        return result;
    };

    var cloneObject = function(oldObject) {
        return jQuery.extend(true, {}, oldObject);
    };

    var refreshGrid = function() {
        var elementId = $this.configuration.grid.elementId;
        $(elementId).jqxGrid('updatebounddata');
    };
};
