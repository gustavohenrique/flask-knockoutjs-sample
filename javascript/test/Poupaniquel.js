describe('Poupaniquel', function() {

    var transactions,
        categories,
        payees,
        configuration;

    beforeEach(function () {
        transactions = {
            "fields": [{
                "category": {"id": 1, "name": "Books"},
                "payee": {"id": 1, "name": "Amazon"},
                "amount": "-15.8",
                "transaction_date": "2012-08-07",
                "description": "Clean code",
                "id": 1
            }, {
                "category": {"id": 2, "name": "Internet"},
                "payee": {"id": 3, "name": "eBay"},
                "amount": "-22.2",
                "transaction_date": "2012-08-12",
                "description": "vim tips and tricks",
                "id": 2
            }],
            "total": 2
        };

        categories = {
            "fields": [
                {"id": 1, "name": "Books"},
                {"id": 2, "name": "Internet"},
                {"id": 3, "name": "Clothes"}
            ],
            "total": 3
        };

        payees = {
            "fields": [
                {"id": 1, "name": "Amazon"},
                {"id": 4, "name": "dealextreme"},
                {"id": 5, "name": "Mercado Libre"},
                {"id": 3, "name": "eBay"}
            ],
            "total": 4
        };

        configuration = {
            grid: {
                services: {
                    load: '/app/transactions/',
                    remove: '/app/transaction/delete/$id',
                    save: '/app/transaction/save'
                },

                root: 'fields',

                elementId: '#jqxgrid',
                autoheight: true,
                theme: '',
                width: '100%',
                columnsresize: true,
                editable: true,

                sortable: true,
                showsortcolumnbackground: true,

                pageable: true,
                pagesizeoptions: ['1', '2', '3'],

                filterable: false,
                autoshowfiltericon: true,
                showfiltercolumnbackground: false,
                filtering: {

                },

                editmode: 'selectedcell',
                columns: [
                    { text: '', datafield: 'id', columntype: 'numberinput', hidden: true, editable: false },
                    { text: 'Date', datafield: 'transaction_date', columntype: 'datetimeinput', width: 110, cellsalign: 'left', cellsformat: 'yyyy-MM-dd' },
                    { text: 'Description', datafield: 'description', columntype: 'textbox' },
                    { text: 'Amount', datafield: 'amount', width: 65, cellsalign: 'right', cellsformat: 'd2', columntype: 'numberinput' },
                    { text: 'Category', columntype: 'dropdownlist', datafield: 'category', width: 177, cellsrenderer: poupaniquel.utils.dropdown.cellsrenderer, initeditor: poupaniquel.utils.dropdown.initeditor },
                    { text: 'Payee', columntype: 'dropdownlist', datafield: 'payee', width: 177, cellsrenderer: poupaniquel.utils.dropdown.cellsrenderer, initeditor: poupaniquel.utils.dropdown.initeditor }
                ]
            },
            dropdown: [{
                datafield: 'category',
                url: '/app/categories/',
                root: 'fields'
            }, {
                datafield: 'payee',
                url: '/app/payees/',
                root: 'fields'
            }]
        };
    });

    it('run custom function if response status code is not 200', function() {
        $('<span id="errorMsg"></span>').appendTo('body');
        var fakeGetAjax = jasmine.createSpy('Get ajax').andCallFake(function(url) {
            return {status: 401, statusText: 'UNAUTHORIZED'};
        });
        poupaniquel.getAjax = fakeGetAjax;

        configuration.error = function(response) {
            $('#errorMsg').text(response.statusText);
        };
        poupaniquel.configure(configuration);
        expect(fakeGetAjax).toHaveBeenCalled();

        expect($('#errorMsg')).toHaveText('UNAUTHORIZED');
    });

    it('convert json object to knockoutjs', function() {
        var index = 0,
            koObject = poupaniquel.utils.ko.mapping(categories, configuration);

        expect(koObject[index].id()).toEqual(categories.fields[index].id);
        expect(koObject[index].name()).toEqual(categories.fields[index].name);
    });

    it('create an editable grid integrated with knockoutjs', function() {
        $('<div id="jqxgrid"></div>').appendTo('body');

        var fakeGetAjax = jasmine.createSpy('Get ajax').andCallFake(function(url) {
            var data = {};
            data = ('/app/transactions/' === url) ? transactions : data;
            data = ('/app/categories/' === url) ? categories : data;
            data = ('/app/payees/' === url) ? payees : data;
            return data;
        });
        poupaniquel.getAjax = fakeGetAjax;

        poupaniquel.configure(configuration);

        expect(fakeGetAjax).toHaveBeenCalled();

        var index = 0,
            items = poupaniquel.model.items;
        expect(items.length).toEqual(2);
        expect(items[index].category()).toEqual(transactions.fields[index].category);
        expect(items[index].payee()).toEqual(transactions.fields[index].payee);
        expect(items[index].amount()).toEqual(transactions.fields[index].amount);
        expect(items[index].transaction_date()).toEqual(transactions.fields[index].transaction_date);
        expect(items[index].description()).toEqual(transactions.fields[index].description);
        expect(items[index].id()).toEqual(transactions.fields[index].id);

        var category = poupaniquel.model.category;
        expect(category.length).toEqual(3);
        expect(category[index].id).toEqual(categories.fields[index].id);
        expect(category[index].name).toEqual(categories.fields[index].name);
        expect(category[index].name).toEqual(categories.fields[index].name);
        var chosencategory = poupaniquel.model.chosencategory;
        expect(typeof(chosencategory)).toEqual("function");

        var payee = poupaniquel.model.payee;
        expect(payee.length).toEqual(4);
        expect(payee[index].id).toEqual(payees.fields[index].id);
        expect(payee[index].name).toEqual(payees.fields[index].name);
        expect(payee[index].name).toEqual(payees.fields[index].name);
        var chosenpayee = poupaniquel.model.chosenpayee;
        expect(typeof(chosenpayee)).toEqual("function");

        expect($('.jqx-grid-column-header').find('a:contains("Date")').length).toEqual(1);
        expect($('.jqx-grid-column-header').find('a:contains("Description")').length).toEqual(1);
        expect($('.jqx-grid-column-header').find('a:contains("Amount")').length).toEqual(1);
        expect($('.jqx-grid-column-header').find('a:contains("Category")').length).toEqual(1);
        expect($('.jqx-grid-column-header').find('a:contains("Payee")').length).toEqual(1);

        expect($('#row0jqxgrid > div > span')[0]).toHaveText("1");
        expect($('#row0jqxgrid > div > span')[1]).toHaveText("2012-08-07");
        expect($('#row0jqxgrid > div > span')[2]).toHaveText("Clean code");
        expect($('#row0jqxgrid > div > span')[3]).toHaveText("-15.8");
        expect($('#row0jqxgrid > div > span')[4]).toHaveText("Books");
        //expect($('#row0jqxgrid > div > span')[5]).toHaveText("Amazon");

        expect($('#row1jqxgrid > div > span')[0]).toHaveText("2");
        expect($('#row1jqxgrid > div > span')[1]).toHaveText("2012-08-12");
        expect($('#row1jqxgrid > div > span')[2]).toHaveText("vim tips and tricks");
        expect($('#row1jqxgrid > div > span')[3]).toHaveText("-22.2");
        expect($('#row1jqxgrid > div > span')[4]).toHaveText("Internet");
        //expect($('#row1jqxgrid > div > span')[5]).toHaveText("eBay");
    });

    it('add new item', function() {
        var data = poupaniquel.utils.ko.mapping(transactions, configuration),
            model = new GridModel(data, configuration);
        expect(model.items.length).toEqual(2);

        model.addItem();
        expect(model.items.length).toEqual(3);

        var latest = model.items[2];
        expect(latest.id()).toEqual(0);
        expect(latest.description()).toEqual("");
        expect(latest.category()).toEqual({id: 0, name: ""});
        expect(latest.transaction_date().getYear()).toEqual(new Date().getYear());
        expect(latest.isModified).toEqual(false);

        latest.description('set isModified to true when there is an attribute value changed');
        expect(latest.isModified).toEqual(true);
    });

    it('remove item', function() {
        var data = poupaniquel.utils.ko.mapping(transactions, configuration),
            model = new GridModel(data, configuration);
        expect(model.items.length).toEqual(2);

        model.getSelectedRowIndex = function() { return 1; };
        model.removeItem();
        expect(model.items.length).toEqual(1);

        var latest = model.items[0];
        expect(latest.id()).toEqual(1);
        expect(latest.description()).toEqual("Clean code");
        expect(latest.category()).toEqual({id: 1, name: "Books"});
        expect(latest.payee()).toEqual({id: 1, name: "Amazon"});
        expect(latest.transaction_date()).toEqual("2012-08-07");
        expect(latest.isModified).toEqual(false);

        model.getSelectedRowIndex = function() { return 0; };
        model.removeItem();
        expect(model.items.length).toEqual(1);
        latest = model.items[0];
        expect(latest.id()).toEqual(0);
        expect(latest.description()).toEqual("");
        expect(latest.category()).toEqual({id: 0, name: ""});
        expect(latest.transaction_date().getYear()).toEqual(new Date().getYear());
        expect(latest.isModified).toEqual(false);
    });

    it('update only modified items', function() {
        var data = poupaniquel.utils.ko.mapping(transactions, configuration),
            model = new GridModel(data, configuration),
            latest = model.items[1];

        expect(latest.isModified).toEqual(false);

        latest.description('changing description');
        expect(latest.isModified).toEqual(true);

        var modifiedItems = model.updateItem();
        expect(modifiedItems.length).toEqual(1);
        expect(modifiedItems[0].description()).toEqual('changing description');        
    });

    it('configuration should has a dateFormat', function() {
        var model = new GridModel(null, configuration);
        expect(model.configuration.dateFormat).toEqual('YYYY-MM-DD');

        configuration.dateFormat = 'DD/MM/YYYY';

        model = new GridModel(null, configuration);
        expect(model.configuration.dateFormat).toEqual('DD/MM/YYYY');
    });

    it('grid configuration should has a ordering', function() {
        var model = new GridModel(null, configuration);
        expect(model.configuration.grid.ordering).toEqual('asc');

        configuration.grid.ordering = 'desc';

        model = new GridModel(null, configuration);
        expect(model.configuration.grid.ordering).toEqual('desc');
    });

    it('adding extra methods to model', function() {
        var model = new GridModel(null, configuration);
        expect(model.quack).toEqual(undefined);

        configuration.methods = [{
            name: 'quack',
            source: function() { }
        }];

        model = new GridModel(null, configuration);
        expect(typeof(model.quack)).toEqual('function');
    });


});
