poupaniquel.utils = {
    dropdown: {
        cellsrenderer: function(row, column, value) {
            if (value !== "") {
                return value.hasOwnProperty('name') ? '<span style="margin: 4px; float: left;">' + value.name + '</span>' : value;
            }
            return value;
        },

        initeditor: function(row, cellvalue, editor) {
            var self = poupaniquel,
                index = 0,
                data = self.model[this.datafield];
                // this.datafield eh o attr data de quem chama a funcao, no caso o que esta em columns

            if (cellvalue !== undefined && cellvalue !== "" && data.length > 0) {
                var dropdownlistdata = self.configuration.dropdown,
                    root = '';

                for (var i = 0; i < dropdownlistdata.length; i++) {
                    var config = dropdownlistdata[i];
                    if (this.datafield === config.datafield) {
                        root = 'root' in config ? config.root : '';

                        for (var x = 0; x < data.length; x++) {
                            if (data[x].id === cellvalue.id) {
                                index = x;
                                i = dropdownlistdata.length;
                                break;
                            }
                        }
                    }
                }
                editor.jqxDropDownList({
                    valueMember: 'id',
                    displayMember: 'name',
                    source: data,
                    selectedIndex: index,
                    dropDownHeight: 150,
                    openDelay: 0,
                    closeDelay: 0,
                    animationType: 'none',
                    autoDropDownHeight: false
                });
            }
        }
    },

    ko: {
        fromJson: function(jsonObject) {
            var koObject = { isModified: false },
                update = function(newValue) {
                    if (newValue) {
                        this.isModified = true;
                    }
                };

            for (var key in jsonObject) {
                koObject[key] = ko.observable(jsonObject[key]);
                // when object is changed, update isModified
                koObject[key].subscribe(update, koObject);
            }

            return koObject;
        },

        mapping: function(maindata, configuration) {
            var error = configuration.error || function(maindata) {
                alert(maindata.statusText);
            };
            
            if (maindata.hasOwnProperty('status') && maindata.status !== 200) {
                error(maindata);
                return [];
            }
            else {
                var ts = [],
                    root = configuration.grid.root;
                try {
                    for (var i = 0; i < maindata[root].length; i++) {
                        var obj = maindata[root][i],
                            t = this.fromJson(obj);

                        ts.push(t);
                    }
                } catch(e) {}
                return ts;
            }
        }
    }
};
