/*
jQWidgets v2.3.1 (2012-July-23)
Copyright (c) 2011-2012 jQWidgets.
License: http://jqwidgets.com/license/
*/

(function (b) {
    b.jqx.jqxWidget("jqxGrid", "", {});
    b.extend(b.jqx._jqxGrid.prototype, {
        defineInstance: function () {
            this.disabled = false;
            this.width = 600;
            this.height = 400;
            this.pagerheight = 28;
            this.groupsheaderheight = 34;
            this.pagesize = 10;
            this.pagesizeoptions = ["5", "10", "20"];
            this.rowsheight = 25;
            this.columnsheight = 25;
            this.groupindentwidth = 30;
            this.rowdetails = false;
            this.enablerowdetailsindent = true;
            this.enablemousewheel = true;
            this.initrowdetails = null;
            this.editable = false;
            this.editmode = "selectedcell";
            this.pageable = false;
            this.groupable = false;
            this.sortable = false;
            this.filterable = false;
            this.autoshowfiltericon = true;
            this.showfiltercolumnbackground = true;
            this.showpinnedcolumnbackground = true;
            this.showsortcolumnbackground = true;
            this.altrows = false;
            this.altstart = 1;
            this.altstep = 1;
            this.showrowdetailscolumn = true;
            this.showtoolbar = false;
            this.toolbarheight = 34;
            this.showstatusbar = false;
            this.statusbarheight = 34;
            this.groups = [];
            this.groupsrenderer = null;
            this.groupcolumnrenderer = null;
            this.groupsexpandedbydefault = false;
            this.pagerrenderer = null;
            this.touchmode = "auto";
            this.columns = [];
            this.selectedrowindex = -1;
            this.selectedrowindexes = new Array();
            this.selectedcells = new Array();
            this.selectedcell = null;
            this.tableZIndex = 799;
            this.headerZIndex = 499;
            this.source = {
                beforeprocessing: null,
                beforesend: null,
                loaderror: null,
                localdata: null,
                data: null,
                datatype: "array",
                datafields: [],
                url: "",
                root: "",
                record: "",
                id: "",
                totalrecords: 0,
                recordstartindex: 0,
                recordendindex: 0,
                loadallrecords: true,
                sortcolumn: null,
                sortdirection: null,
                sort: null,
                filter: null,
                sortcomparer: null
            };
            this.dataview = null;
            this.updatedelay = 0;
            this.autoheight = false;
            this.showheader = true;
            this.showgroupsheader = true;
            this.closeablegroups = true;
            this.scrollbarsize = 15;
            this.virtualmode = false;
            this.sort = null;
            this.columnsmenu = true;
            this.columnsresize = false;
            this.columnsmenuwidth = 15;
            this.popupwidth = "auto";
            this.sorttogglestates = 2;
            this.rendergridrows = null;
            this.enableanimations = true;
            this.enabletooltips = false;
            this.selectionmode = "singlerow";
            this.enablehover = true;
            this.loadingerrormessage = "The data is still loading. When the data binding is completed, the Grid raises the 'bindingcomplete' event. Call this function in the 'bindingcomplete' event handler.";
            this.verticalscrollbarstep = 5;
            this.verticalscrollbarlargestep = 400;
            this.horizontalscrollbarstep = 5;
            this.horizontalscrollbarlargestep = 50;
            this.keyboardnavigation = true;
            this.touchModeStyle = "auto";
            this.autoshowloadelement = true;
            this._updating = false;
            this._pagescache = new Array();
            this._pageviews = new Array();
            this._cellscache = new Array();
            this._rowdetailscache = new Array();
            this._rowdetailselementscache = new Array();
            this._requiresupdate = false;
            this._hasOpenedMenu = false;
            this.events = ["initialized", "rowclick", "rowselect", "rowunselect", "groupexpand", "groupcollapse", "sort", "columnclick", "cellclick", "pagechanged", "pagesizechanged", "bindingcomplete", "groupschanged", "filter", "columnresized", "cellselect", "cellunselect", "cellbeginedit", "cellendedit", "cellvaluechanged", "rowexpand", "rowcollapse", "rowdoubleclick", "celldoubleclick"]
        },
        createInstance: function (d) {
            var k = b("<div tabIndex=0 style='overflow: hidden; -webkit-appearance: none; outline: none; width:100%; height: 100%; align:left; border: 0px; padding: 0px; margin: 0px; left: 0px; top: 0px; valign:top; position: relative;'><div id='wrapper" + this.element.id + "' tabIndex=1 style='overflow: hidden; -webkit-appearance: none; border: none; background: transparent; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; align:left; left: 0px; top: 0px; valign:top; position: relative;'><div id='toolbar' style='visibility: hidden; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='groupsheader' style='visibility: hidden; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='content" + this.element.id + "' tabIndex=2 style='overflow: hidden; -webkit-appearance: none; border: none; background: transparent; outline: none; border: none; padding: 0px; margin-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'/><div id='verticalScrollBar" + this.element.id + "' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/><div id='horizontalScrollBar" + this.element.id + "' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/><div id='bottomRight' style='align:left; valign:top; left: 0px; top: 0px; border: none; position: absolute;'/><div id='statusbar' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/><div id='pager' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/></div></div>");
            this._fieldsmapping();
            this.element.innerText = "";
            this.element.innerHTML = "";
            this.host.append(k);
            this.host.addClass(this.toTP("jqx-grid"));
            this.host.addClass(this.toTP("jqx-reset"));
            this.host.addClass(this.toTP("jqx-rc-all"));
            this.host.addClass(this.toTP("jqx-widget"));
            this.host.addClass(this.toTP("jqx-widget-content"));
            this.wrapper = this.host.find("#wrapper" + this.element.id);
            this.content = this.host.find("#content" + this.element.id);
            this.content.addClass(this.toTP("jqx-reset"));
            var h = this.host.find("#verticalScrollBar" + this.element.id);
            var g = this.host.find("#horizontalScrollBar" + this.element.id);
            this.bottomRight = this.host.find("#bottomRight").addClass(this.toTP("jqx-grid-bottomright"));
            if (!h.jqxScrollBar) {
                alert("jqxscrollbar is not loaded.");
                return
            }
            this.editors = new Array();
            this.vScrollBar = h.jqxScrollBar({
                vertical: true,
                touchMode: this.touchmode,
                step: this.verticalscrollbarstep,
                largestep: this.verticalscrollbarlargestep,
                theme: this.theme,
                _triggervaluechanged: false
            });
            this.hScrollBar = g.jqxScrollBar({
                vertical: false,
                touchMode: this.touchmode,
                step: this.horizontalscrollbarstep,
                largestep: this.horizontalscrollbarlargestep,
                theme: this.theme,
                triggervaluechanged: false
            });
            this.pager = this.host.find("#pager");
            this.toolbar = this.host.find("#toolbar");
            this.toolbar[0].id = "toolbar" + this.element.id;
            this.toolbar.addClass(this.toTP("jqx-grid-toolbar"));
            this.toolbar.addClass(this.toTP("jqx-widget-header"));
            this.statusbar = this.host.find("#statusbar");
            this.statusbar[0].id = "statusbar" + this.element.id;
            this.statusbar.addClass(this.toTP("jqx-grid-statusbar"));
            this.statusbar.addClass(this.toTP("jqx-widget-header"));
            this.pager.addClass(this.toTP("jqx-grid-pager"));
            this.pager.addClass(this.toTP("jqx-widget-header"));
            this.groupsheader = this.host.find("#groupsheader");
            this.groupsheader.addClass(this.toTP("jqx-grid-groups-header"));
            this.groupsheader.addClass(this.toTP("jqx-widget-header"));
            this.vScrollBar.css("visibility", "hidden");
            this.hScrollBar.css("visibility", "hidden");
            this.vScrollInstance = b.data(this.vScrollBar[0], "jqxScrollBar").instance;
            this.hScrollInstance = b.data(this.hScrollBar[0], "jqxScrollBar").instance;
            this.gridtable = null;
            this.dataloadelement = b('<div style="position: absolute;"></div>');
            this.dataloadelement.addClass(this.toTP("jqx-grid-load"));
            this.dataloadelement.width(this.width);
            this.dataloadelement.height(this.height);
            this.host.prepend(this.dataloadelement);
            this.isNestedGrid = this.host.parent() ? this.host.parent().css("z-index") == 2000 : false;
            if (this.localizestrings) {
                this.localizestrings()
            }
            this.databind(this.source);
            if (this.showtoolbar) {
                this.toolbar.css("visibility", "visible")
            }
            if (this.showstatusbar) {
                this.statusbar.css("visibility", "visible")
            }
            if (this.pageable && this._initpager) {
                this._initpager()
            }
            this._arrange();
            this.tableheight = null;
            var f = this;
            var e = function () {
                if (f.content) {
                    f.content[0].scrollTop = 0;
                    f.content[0].scrollLeft = 0
                }
                if (f.gridcontent) {
                    f.gridcontent[0].scrollLeft = 0;
                    f.gridcontent[0].scrollTop = 0
                }
            };
            this.content.bind("mousedown", function () {
                e()
            });
            this.content.bind("scroll", function (l) {
                e();
                return false
            });
            this.host.addClass("jqx-disableselect");
            this.content.addClass("jqx-disableselect");
            this.addHandler(this.host, "loadContent", function (l) {
                if (f.gridmenu && f.gridmenu.width() < 120) {
                    f._initmenu();
                    f.prerenderrequired = true;
                    f._rendercolumnheaders()
                }
                return false
            });
            if ((this.width != null && this.width.toString().indexOf("%") != -1) || (this.height != null && this.height.toString().indexOf("%") != -1)) {
                b(window).bind("resize." + this.element.id, function () {
                    var n = b(window).width();
                    var l = b(window).height();
                    if (n != f._windowWidth || l != f._windowHeight) {
                        f._updatesize()
                    }
                    f._windowWidth = n;
                    f._windowHeight = l
                });
                setInterval(function () {
                    var n = f.host.width();
                    var l = f.host.height();
                    if (f._lastWidth != n || f._lastHeight != l) {
                        f._updatesize()
                    }
                    f._lastWidth = n;
                    f._lastHeight = l
                }, 250)
            }
        },
        hiddenParent: function () {
            var e = this;
            if (e.host.css("display") != "block") {
                return true
            }
            var d = false;
            b.each(e.host.parents(), function () {
                if (b(this).css("display") != "block") {
                    d = true;
                    return false
                }
            });
            return d
        },
        _updatesize: function (k, h) {
            if (this._loading) {
                return
            }
            var f = this;
            if (this.hiddenParent()) {
                return
            }
            var g = f.host.width();
            var e = f.host.height();
            if (!f._oldWidth) {
                f._oldWidth = g
            }
            if (!f._oldHeight) {
                f._oldHeight = e
            }
            if (f._resizeTimer) {
                clearTimeout(f._resizeTimer)
            }
            var d = b.browser.msie ? 10 : 1;
            f._resizeTimer = setTimeout(function () {
                if (g != f._oldWidth || k == true) {
                    f._arrange();
                    f._updatecolumnwidths();
                    f._updatecellwidths();
                    f._renderrows(f.virtualsizeinfo)
                }
                if (e != f._oldHeight || h == true) {
                    var n = f.groupable && f.groups.length > 0;
                    var l = f.vScrollBar.css("visibility") != "visible";
                    if (!n) {
                        f._arrange();
                        f.virtualsizeinfo = f._calculatevirtualheight();
                        if (parseInt(e) >= parseInt(f._oldHeight)) {
                            f.prerenderrequired = true
                        }
                        f._renderrows(f.virtualsizeinfo)
                    } else {
                        if (value >= oldvalue) {
                            f._render(true, false, false)
                        } else {
                            f.rendergridcontent(true, false)
                        }
                    }
                    if (l && f.vScrollBar.css("visibility") == "visible") {
                        f._arrange();
                        f._updatecolumnwidths();
                        f._updatecellwidths()
                    }
                }
                f._oldWidth = g;
                f._oldHeight = e
            }, d)
        },
        _fieldsmapping: function () {
            if (this.showToolbar) {
                this._mapField("showtoolbar", this.showToolbar)
            }
            if (this.toolbarHeight) {
                this._mapField("toolbarheight", this.toolbarHeight)
            }
            if (this.pagerHeight) {
                this._mapField("pagerHeight", this.pagerHeight)
            }
            if (this.groupsHeaderHeight) {
                this._mapField("groupsHeaderHeight", this.groupsHeaderHeight)
            }
            if (this.pageSize) {
                this._mapField("pageSize", this.pageSize)
            }
            if (this.pagerHeight) {
                this._mapField("pagerHeight", this.pagerHeight)
            }
            if (this.pageSizeOptions) {
                this._mapField("pageSizeOptions", this.pageSizeOptions)
            }
            if (this.rowsHeight) {
                this._mapField("rowsHeight", this.rowsHeight)
            }
            if (this.columnsHeight) {
                this._mapField("columnsHeight", this.columnsHeight)
            }
            if (this.groupIndentWidth) {
                this._mapField("groupIndentWidth", this.groupIndentWidth)
            }
            if (this.rowDetails) {
                this._mapField("rowDetails", this.rowDetails)
            }
            if (this.enableRowDetailsIndent) {
                this._mapField("enableRowDetailsIndent", this.enableRowDetailsIndent)
            }
            if (this.enableMouseWheel) {
                this._mapField("enableMouseWheel", this.enableMouseWheel)
            }
            if (this.initRowDetails) {
                this._mapField("initRowDetails", this.initRowDetails)
            }
            if (this.editMode) {
                this._mapField("editMode", this.editMode)
            }
            if (this.autoShowFilterIcon) {
                this._mapField("autoShowFilterIcon", this.autoShowFilterIcon)
            }
            if (this.showFilterColumnBackground) {
                this._mapField("showFilterColumnBackground", this.showFilterColumnBackground)
            }
            if (this.showPinnedColumnBackground) {
                this._mapField("showPinnedColumnBackground", this.showPinnedColumnBackground)
            }
            if (this.showSortColumnBackground) {
                this._mapField("showSortColumnBackground", this.showSortColumnBackground)
            }
            if (this.altRows) {
                this._mapField("altRows", this.altRows)
            }
            if (this.altStart) {
                this._mapField("altStart", this.altStart)
            }
            if (this.altStep) {
                this._mapField("altStep", this.altStep)
            }
            if (this.showRowDetailsColumn) {
                this._mapField("showRowDetailsColumn", this.showRowDetailsColumn)
            }
            if (this.groupsRenderer) {
                this._mapField("groupsRenderer", this.groupsRenderer)
            }
            if (this.groupColumnRenderer) {
                this._mapField("groupColumnRenderer", this.groupColumnRenderer)
            }
            if (this.groupsExpandedByDefault) {
                this._mapField("groupsExpandedByDefault", this.groupsExpandedByDefault)
            }
            if (this.pagerRenderer) {
                this._mapField("pagerRenderer", this.pagerRenderer)
            }
            if (this.updateDelay) {
                this._mapField("updateDelay", this.updateDelay)
            }
            if (this.autoHeight) {
                this._mapField("autoHeight", this.autoHeight)
            }
            if (this.showHeader) {
                this._mapField("showHeader", this.showHeader)
            }
            if (this.showGroupsHeader) {
                this._mapField("showGroupsHeader", this.showGroupsHeader)
            }
            if (this.closeableGroups) {
                this._mapField("closeableGroups", this.closeableGroups)
            }
            if (this.scrollbarSize) {
                this._mapField("scrollbarSize", this.scrollbarSize)
            }
            if (this.virtualMode) {
                this._mapField("virtualMode", this.virtualMode)
            }
            if (this.columnsMenu) {
                this._mapField("columnsMenu", this.columnsMenu)
            }
            if (this.columnsResize) {
                this._mapField("columnsResize", this.columnsResize)
            }
            if (this.columnsMenuWidth) {
                this._mapField("columnsMenuWidth", this.columnsMenuWidth)
            }
            if (this.sortToggleStates) {
                this._mapField("sortToggleStates", this.sortToggleStates)
            }
            if (this.renderGridRows) {
                this._mapField("renderGridRows", this.renderGridRows)
            }
            if (this.enableAnimations) {
                this._mapField("enableAnimations", this.enableAnimations)
            }
            if (this.enableTooltips) {
                this._mapField("enableTooltips", this.enableTooltips)
            }
            if (this.selectionMode) {
                this._mapField("selectionMode", this.selectionMode)
            }
            if (this.enableHover) {
                this._mapField("enableHover", this.enableHover)
            }
            if (this.loadingErrorMessage) {
                this._mapField("loadingErrorMessage", this.loadingErrorMessage)
            }
            if (this.verticalScrollBarStep) {
                this._mapField("verticalScrollBarStep", this.verticalScrollBarStep)
            }
            if (this.verticalScrollBarLargeStep) {
                this._mapField("verticalScrollBarLargeStep", this.verticalScrollBarLargeStep)
            }
            if (this.horizontalScrollBarStep) {
                this._mapField("horizontalScrollBarStep", this.horizontalScrollBarStep)
            }
            if (this.horizontalScrollbarLargeStep) {
                this._mapField("horizontalScrollbarLargeStep", this.horizontalScrollbarLargeStep)
            }
            if (this.keyboardNavigation) {
                this._mapField("keyboardNavigation", this.keyboardNavigation)
            }
        },
        _mapField: function (d, e) {
            if (d == null) {
                return false
            }
            this[d.toLowerCase()] = e
        },
        getTouches: function (d) {
            if (d.originalEvent) {
                if (d.originalEvent.touches && d.originalEvent.touches.length) {
                    return d.originalEvent.touches
                } else {
                    if (d.originalEvent.changedTouches && d.originalEvent.changedTouches.length) {
                        return d.originalEvent.changedTouches
                    }
                }
            }
            if (!d.touches) {
                d.touches = new Array();
                d.touches[0] = d.originalEvent
            }
            return d.touches
        },
        _updateTouchScrolling: function () {
            var d = this;
            if (d.isTouchDevice()) {
                d.enablehover = false;
                if (d.gridcontent) {
                    d.gridcontent.unbind("touchstart.touchScroll");
                    d.gridcontent.unbind("touchmove.touchScroll");
                    d.gridcontent.unbind("touchend.touchScroll");
                    d.gridcontent.unbind("touchcancel.touchScroll");
                    b.jqx.mobile.touchScroll(d.gridcontent[0], d.vScrollInstance.max, function (g, f) {
                        if (d.vScrollBar.css("visibility") == "visible") {
                            var e = d.vScrollInstance.value;
                            d.vScrollInstance.setPosition(e + f)
                        }
                        if (d.hScrollBar.css("visibility") == "visible") {
                            var e = d.hScrollInstance.value;
                            d.hScrollInstance.setPosition(e + g)
                        }
                        d._lastScroll = new Date()
                    })
                }
            }
        },
        isTouchDevice: function () {
            if (this.touchDevice != undefined) {
                return this.touchDevice
            }
            var d = b.jqx.mobile.isTouchDevice();
            this.touchDevice = d;
            if (this.touchmode == true) {
                d = true;
                b.jqx.mobile.setMobileSimulator(this.element);
                this.touchDevice = d
            } else {
                if (this.touchmode == false) {
                    d = false
                }
            }
            if (d && this.touchModeStyle != false) {
                this.scrollbarsize = 10;
                this.host.addClass(this.toThemeProperty("jqx-touch"));
                this.host.find("jqx-widget-content").addClass(this.toThemeProperty("jqx-touch"));
                this.host.find("jqx-widget-header").addClass(this.toThemeProperty("jqx-touch"))
            }
            return d
        },
        toTP: function (d) {
            return this.toThemeProperty(d)
        },
        localizestrings: function (d) {
            this._cellscache = new Array();
            if (b.jqx.dataFormat) {
                b.jqx.dataFormat.cleardatescache()
            }
            if (this._loading) {
                alert(this.loadingerrormessage);
                return false
            }
            if (d != null) {
                if (d.pagergotopagestring) {
                    this.gridlocalization.pagergotopagestring = d.pagergotopagestring
                }
                if (d.pagershowrowsstring) {
                    this.gridlocalization.pagershowrowsstring = d.pagershowrowsstring
                }
                if (d.pagerrangestring) {
                    this.gridlocalization.pagerrangestring = d.pagerrangestring
                }
                if (d.pagernextbuttonstring) {
                    this.gridlocalization.pagernextbuttonstring = d.pagernextbuttonstring
                }
                if (d.pagerpreviousbuttonstring) {
                    this.gridlocalization.pagerpreviousbuttonstring = d.pagerpreviousbuttonstring
                }
                if (d.groupsheaderstring) {
                    this.gridlocalization.groupsheaderstring = d.groupsheaderstring
                }
                if (d.sortascendingstring) {
                    this.gridlocalization.sortascendingstring = d.sortascendingstring
                }
                if (d.sortdescendingstring) {
                    this.gridlocalization.sortdescendingstring = d.sortdescendingstring
                }
                if (d.sortremovestring) {
                    this.gridlocalization.sortremovestring = d.sortremovestring
                }
                if (d.groupbystring) {
                    this.gridlocalization.groupbystring = d.groupbystring
                }
                if (d.groupremovestring) {
                    this.gridlocalization.groupremovestring = d.groupremovestring
                }
                if (d.firstDay) {
                    this.gridlocalization.firstDay = d.firstDay
                }
                if (d.days) {
                    this.gridlocalization.days = d.days
                }
                if (d.months) {
                    this.gridlocalization.months = d.months
                }
                if (d.AM) {
                    this.gridlocalization.AM = d.AM
                }
                if (d.PM) {
                    this.gridlocalization.PM = d.PM
                }
                if (d.patterns) {
                    this.gridlocalization.patterns = d.patterns
                }
                if (d.percentsymbol) {
                    this.gridlocalization.percentsymbol = d.percentsymbol
                }
                if (d.currencysymbol) {
                    this.gridlocalization.currencysymbol = d.currencysymbol
                }
                if (d.currencysymbolposition) {
                    this.gridlocalization.currencysymbolposition = d.currencysymbolposition
                }
                if (d.decimalseparator) {
                    this.gridlocalization.decimalseparator = d.decimalseparator
                }
                if (d.thousandsseparator) {
                    this.gridlocalization.thousandsseparator = d.thousandsseparator
                }
                if (d.filterclearstring) {
                    this.gridlocalization.filterclearstring = d.filterclearstring
                }
                if (d.filterstring) {
                    this.gridlocalization.filterstring = d.filterstring
                }
                if (d.filtershowrowstring) {
                    this.gridlocalization.filtershowrowstring = d.filtershowrowstring
                }
                if (d.filterorconditionstring) {
                    this.gridlocalization.filterorconditionstring = d.filterorconditionstring
                }
                if (d.filterandconditionstring) {
                    this.gridlocalization.filterandconditionstring = d.filterandconditionstring
                }
                if (d.filterstringcomparisonoperators) {
                    this.gridlocalization.filterstringcomparisonoperators = d.filterstringcomparisonoperators
                }
                if (d.filternumericcomparisonoperators) {
                    this.gridlocalization.filternumericcomparisonoperators = d.filternumericcomparisonoperators
                }
                if (d.filterdatecomparisonoperators) {
                    this.gridlocalization.filterdatecomparisonoperators = d.filterdatecomparisonoperators
                }
                if (d.filterbooleancomparisonoperators) {
                    this.gridlocalization.filterbooleancomparisonoperators = d.filterbooleancomparisonoperators
                }
                if (this._initpager) {
                    this._initpager()
                }
                if (this._initgroupsheader) {
                    this._initgroupsheader()
                }
                if (this._initmenu) {
                    this._initmenu()
                }
                if (d.validationstring) {
                    this.gridlocalization.validationstring = d.validationstring
                }
                this._renderrows(this.virtualsizeinfo)
            } else {
                this.gridlocalization = {
                    "/": "/",
                    ":": ":",
                    firstDay: 0,
                    days: {
                        names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
                    },
                    months: {
                        names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                        namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
                    },
                    AM: ["AM", "am", "AM"],
                    PM: ["PM", "pm", "PM"],
                    eras: [{
                        name: "A.D.",
                        start: null,
                        offset: 0
                    }],
                    twoDigitYearMax: 2029,
                    patterns: {
                        d: "M/d/yyyy",
                        D: "dddd, MMMM dd, yyyy",
                        t: "h:mm tt",
                        T: "h:mm:ss tt",
                        f: "dddd, MMMM dd, yyyy h:mm tt",
                        F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                        M: "MMMM dd",
                        Y: "yyyy MMMM",
                        S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss"
                    },
                    percentsymbol: "%",
                    currencysymbol: "$",
                    currencysymbolposition: "before",
                    decimalseparator: ".",
                    thousandsseparator: ",",
                    pagergotopagestring: "Go to page:",
                    pagershowrowsstring: "Show rows:",
                    pagerrangestring: " of ",
                    pagerpreviousbuttonstring: "previous",
                    pagernextbuttonstring: "next",
                    groupsheaderstring: "Drag a column and drop it here to group by that column",
                    sortascendingstring: "Sort Ascending",
                    sortdescendingstring: "Sort Descending",
                    sortremovestring: "Remove Sort",
                    groupbystring: "Group By this column",
                    groupremovestring: "Remove from groups",
                    filterclearstring: "Clear",
                    filterstring: "Filter",
                    filtershowrowstring: "Show rows where:",
                    filterorconditionstring: "Or",
                    filterandconditionstring: "And",
                    filterstringcomparisonoperators: ["empty", "not empty", "contains", "contains(match case)", "does not contain", "does not contain(match case)", "starts with", "starts with(match case)", "ends with", "ends with(match case)", "equal", "equal(match case)", "null", "not null"],
                    filternumericcomparisonoperators: ["equal", "not equal", "less than", "less than or equal", "greater than", "greater than or equal", "null", "not null"],
                    filterdatecomparisonoperators: ["equal", "not equal", "less than", "less than or equal", "greater than", "greater than or equal", "null", "not null"],
                    filterbooleancomparisonoperators: ["equal", "not equal"],
                    validationstring: "Entered value is not valid"
                }
            }
        },
        _initmenu: function () {
            var t = this;
            if (this.host.jqxMenu) {
                if (this.gridmenu) {
                    if (this.filterable) {
                        if (this._destroyfilterpanel) {
                            this._destroyfilterpanel()
                        }
                    }
                    this.gridmenu.jqxMenu("destroy");
                    this.gridmenu.remove()
                }
                this.menuitemsarray = new Array();
                this.gridmenu = b('<div id="gridmenu' + this.element.id + '" style="z-index: 9999999999999;"></div>');
                this.host.append(this.gridmenu);
                var y = b("<ul></ul>");
                var h = '<div class="jqx-grid-sortasc-icon"></div>';
                var v = b("<li>" + h + this.gridlocalization.sortascendingstring + "</li>");
                var B = '<div class="jqx-grid-sortdesc-icon"></div>';
                var z = b("<li>" + B + this.gridlocalization.sortdescendingstring + "</li>");
                var p = '<div class="jqx-grid-sortremove-icon"></div>';
                var l = b("<li>" + p + this.gridlocalization.sortremovestring + "</li>");
                var k = '<div class="jqx-grid-groupby-icon"></div>';
                var s = b("<li>" + k + this.gridlocalization.groupbystring + "</li>");
                var f = b("<li>" + k + this.gridlocalization.groupremovestring + "</li>");
                var d = b('<li type="separator"></li>');
                var w = b('<li class="filter" style="height: 170px;" ignoretheme="true"><div class="filter"></div></li>');
                var o = this.gridlocalization.sortascendingstring.length;
                var u = this.gridlocalization.sortascendingstring;
                if (this.gridlocalization.sortdescendingstring.length > o) {
                    o = this.gridlocalization.sortdescendingstring.length;
                    u = this.gridlocalization.sortdescendingstring
                }
                if (this.gridlocalization.sortremovestring.length > o) {
                    o = this.gridlocalization.sortremovestring.length;
                    u = this.gridlocalization.sortremovestring
                }
                if (this.groupable && this._initgroupsheader) {
                    if (this.gridlocalization.groupbystring.length > o) {
                        o = this.gridlocalization.groupbystring.length;
                        u = this.gridlocalization.groupbystring
                    }
                    if (this.gridlocalization.groupremovestring.length > o) {
                        o = this.gridlocalization.groupremovestring.length;
                        u = this.gridlocalization.groupremovestring
                    }
                }
                var A = 200;
                u = b.trim(u).replace(/\&nbsp\;/ig, "").replace(/\&#160\;/ig, "");
                var g = b("<span>" + u + "</span>");
                g.addClass(this.toThemeProperty("jqx-menu-item"));
                this.host.append(g);
                A = g.outerWidth() + 60;
                g.remove();
                var e = 0;
                if (this.sortable && this._togglesort) {
                    y.append(v);
                    this.menuitemsarray[0] = v[0];
                    y.append(z);
                    this.menuitemsarray[1] = z[0];
                    y.append(l);
                    this.menuitemsarray[2] = l[0];
                    e = 3
                }
                if (this.groupable && this._initgroupsheader) {
                    y.append(s);
                    this.menuitemsarray[3] = s[0];
                    y.append(f);
                    this.menuitemsarray[4] = f[0];
                    e += 2
                }
                var n = e * 27 + 3;
                var r = true;
                if (this.filterable) {
                    if (this._initfilterpanel) {
                        this.menuitemsarray[5] = w[0];
                        this.menuitemsarray[6] = w[0];
                        y.append(d);
                        y.append(w);
                        n += 176;
                        var q = b(w).find("div:first");
                        A += 20;
                        this._initfilterpanel(this, q, "", A);
                        r = false;
                        this.removeHandler(b(document), "click.menu" + t.element.id, t._closemenuafterclick, t);
                        this.addHandler(b(document), "click.menu" + t.element.id, t._closemenuafterclick, t)
                    } else {
                        alert("jqxgrid.filter.js is not loaded.")
                    }
                }
                this.gridmenu.append(y);
                if (b.browser.msie && b.browser.version < 8 && this.filterable) {
                    b("#listBoxfilter1" + this.element.id).css("z-index", 4990);
                    b("#listBoxfilter2" + this.element.id).css("z-index", 4990);
                    b("#listBoxfilter3" + this.element.id).css("z-index", 4990);
                    b("#gridmenu" + this.element.id).css("z-index", 5000);
                    b("#gridmenu" + this.element.id).bind("initialized", function () {
                        b("#menuWrappergridmenu" + t.element.id).css("z-index", 4980)
                    })
                }
                if (this.menuitemsarray[0] == undefined) {
                    n = 65
                }
                this.addHandler(this.gridmenu, "keydown", function (G) {
                    if (G.keyCode == 27) {
                        t.gridmenu.jqxMenu("close")
                    } else {
                        if (G.keyCode == 13 && t.filterable) {
                            if (t._buildfilter) {
                                var F = b(b.find("#filter1" + t.element.id)).jqxDropDownList("container").css("display") == "block";
                                var E = b(b.find("#filter2" + t.element.id)).jqxDropDownList("container").css("display") == "block";
                                var C = b(b.find("#filter3" + t.element.id)).jqxDropDownList("container").css("display") == "block";
                                var H = b(b.find("#filterclearbutton" + t.element.id)).hasClass("jqx-fill-state-focus");
                                if (H) {
                                    var D = b.data(document.body, "contextmenu" + t.element.id).column;
                                    t._clearfilter(t, t.element, D);
                                    t.gridmenu.jqxMenu("close")
                                } else {
                                    if (!F && !E && !C) {
                                        var D = b.data(document.body, "contextmenu" + t.element.id).column;
                                        t.gridmenu.jqxMenu("close");
                                        t._buildfilter(t, w, D)
                                    }
                                }
                            }
                        }
                    }
                });
                if (this.popupwidth != "auto") {
                    A = this.popupwidth
                }
                this.gridmenu.jqxMenu({
                    width: A,
                    height: n,
                    autoCloseOnClick: r,
                    autoOpenPopup: false,
                    mode: "popup",
                    theme: this.theme,
                    animationShowDuration: 0,
                    animationHideDuration: 0,
                    animationShowDelay: 0
                });
                if (this.filterable) {
                    this.gridmenu.jqxMenu("_setItemProperty", w[0].id, "closeOnClick", false)
                }
                this._handlemenueevents()
            } else {
                this.columnsmenu = false
            }
        },
        _arrangemenu: function () {
            var k = this.gridlocalization.sortascendingstring.length;
            var d = this.gridlocalization.sortascendingstring;
            if (this.gridlocalization.sortdescendingstring.length > k) {
                k = this.gridlocalization.sortdescendingstring.length;
                d = this.gridlocalization.sortdescendingstring
            }
            if (this.gridlocalization.sortremovestring.length > k) {
                k = this.gridlocalization.sortremovestring.length;
                d = this.gridlocalization.sortremovestring
            }
            if (this.groupable && this._initgroupsheader) {
                if (this.gridlocalization.groupbystring.length > k) {
                    k = this.gridlocalization.groupbystring.length;
                    d = this.gridlocalization.groupbystring
                }
                if (this.gridlocalization.groupremovestring.length > k) {
                    k = this.gridlocalization.groupremovestring.length;
                    d = this.gridlocalization.groupremovestring
                }
            }
            var e = 200;
            d = b.trim(d).replace(/\&nbsp\;/ig, "").replace(/\&#160\;/ig, "");
            var f = b("<span>" + d + "</span>");
            f.addClass(this.toThemeProperty("jqx-menu-item"));
            this.host.append(f);
            e = f.outerWidth() + 60;
            f.remove();
            var g = 0;
            if (this.sortable && this._togglesort) {
                g = 3
            }
            if (this.groupable && this._initgroupsheader) {
                g += 2
            }
            var h = g * 27 + 3;
            if (this.filterable) {
                if (this._initfilterpanel) {
                    h += 176;
                    e += 20
                }
            }
            if (this.menuitemsarray[0] == undefined) {
                h = 65
            }
            if (this.popupwidth != "auto") {
                e = this.popupwidth
            }
            this.gridmenu.jqxMenu({
                width: e,
                height: h
            })
        },
        _closemenuafterclick: function (g) {
            var f = g != null ? g.data : this;
            var h = false;
            if (g.target.className.indexOf("filter") != -1) {
                return
            }
            if (g.target.className.indexOf("jqx-grid-cell") != -1) {
                f.gridmenu.jqxMenu("close");
                return
            }
            var e = f.host.offset();
            var d = g.pageX;
            var k = g.pageY;
            b.each(b(g.target).parents(), function () {
                if (this.id != null && this.id.indexOf("filter") != -1) {
                    h = true;
                    return false
                }
                if (this.className.indexOf("filter") != -1) {
                    h = true;
                    return false
                }
                if (this.className.indexOf("jqx-grid-cell") != -1) {
                    f.gridmenu.jqxMenu("close");
                    return false
                }
                if (this.className.indexOf("jqx-grid-column") != -1) {
                    f.gridmenu.jqxMenu("close");
                    return false
                }
            });
            if (h) {
                return
            }
            f.gridmenu.jqxMenu("close")
        },
        _handlemenueevents: function () {
            var d = this;
            this.removeHandler(this.gridmenu, "closed");
            this.addHandler(this.gridmenu, "closed", function (e) {
                d._closemenu()
            });
            this.removeHandler(this.gridmenu, "itemclick");
            this.addHandler(this.gridmenu, "itemclick", function (g) {
                var f = g.args;
                for (i = 0; i < d.menuitemsarray.length; i++) {
                    var h = d.menuitemsarray[i];
                    if (f == h) {
                        if (b(f).attr("ignoretheme") != undefined) {
                            return
                        }
                        var k = b.data(document.body, "contextmenu" + d.element.id);
                        var e = k.column;
                        if (d.filterable) {
                            d.gridmenu.jqxMenu("close")
                        }
                        if (k != null) {
                            switch (i) {
                            case 0:
                                d.sortby(e.datafield, "ascending", null);
                                break;
                            case 1:
                                d.sortby(e.datafield, "descending", null);
                                break;
                            case 2:
                                d.sortby(e.datafield, null, null);
                                break;
                            case 3:
                                d.addgroup(e.datafield);
                                break;
                            case 4:
                                d.removegroup(e.datafield);
                                break;
                            case 5:
                                var l = b(d.menuitemsarray[6]);
                                b(l).css("display", "block");
                                break;
                            case 7:
                                break
                            }
                        }
                        break
                    }
                }
            })
        },
        getdatainformation: function () {
            var d = this.dataview.totalrecords;
            if (this.summaryrows) {
                d += this.summaryrows.length
            }
            return {
                rowscount: d,
                sortinformation: this.getsortinformation(),
                paginginformation: this.getpaginginformation()
            }
        },
        getsortinformation: function () {
            return {
                sortcolumn: this.sortcolumn,
                sortdirection: this.sortdirection
            }
        },
        getpaginginformation: function () {
            return {
                pagenum: this.dataview.pagenum,
                pagesize: this.pagesize,
                pagescount: Math.ceil(this.dataview.totalrecords / this.pagesize)
            }
        },
        _updaterowsproperties: function () {
            this._updatehiddenrows();
            this._updaterowheights();
            this._updaterowdetails()
        },
        _updatehiddenrows: function () {
            var e = this;
            this.hiddens = new Array();
            var d = this.hiddenboundrows;
            b.each(d, function (g) {
                if (this.index != undefined) {
                    var f = this.index;
                    var h = e.getrowvisibleindex(g);
                    e.hiddens[h] = this.hidden
                }
            })
        },
        _updaterowheights: function () {
            var e = this;
            this.heights = new Array();
            var d = this.heightboundrows;
            b.each(d, function (g) {
                if (this.index != undefined) {
                    var f = this.index;
                    var h = e.getrowvisibleindex(g);
                    e.heights[h] = this.height
                }
            })
        },
        _updaterowdetails: function () {
            var d = this;
            this.details = new Array();
            var e = this.detailboundrows;
            b.each(e, function (g) {
                if (this.index != undefined) {
                    var f = this.index;
                    var h = d.getrowvisibleindex(g);
                    d.details[h] = this.details
                }
            })
        },
        _getmenuitembyindex: function (d) {
            if (d == undefined) {
                return null
            }
            return this.menuitemsarray[d]
        },
        _closemenu: function () {
            if (this._hasOpenedMenu) {
                if (this.gridmenu != null) {
                    this.gridmenu.jqxMenu("close")
                }
                var g = b.data(document.body, "contextmenu" + this.element.id);
                var e = 16;
                if (g != null) {
                    if (this.enableanimations) {
                        b(g.columnsmenu).animate({
                            "margin-left": 0
                        }, "fast", function () {
                            b(g.columnsmenu).css("display", "none")
                        });
                        g.column.iconscontainer.animate({
                            "margin-left": -32
                        }, "fast")
                    } else {
                        b(g.columnsmenu).css("display", "none");
                        g.column.iconscontainer.css("margin-left", -32)
                    }
                    b.data(document.body, "contextmenu" + this.element.id, null)
                }
                this._hasOpenedMenu = false;
                var k = this._getmenuitembyindex(5);
                if (k) {
                    var h = b(k).find("#filter1" + this.element.id);
                    var d = b(k).find("#filter2" + this.element.id);
                    var f = b(k).find("#filter3" + this.element.id);
                    h.jqxDropDownList("hideListBox");
                    d.jqxDropDownList("hideListBox");
                    f.jqxDropDownList("hideListBox")
                }
            }
        },
        scrolloffset: function (e, d) {
            if (e == null || d == null || e == undefined || d == undefined) {
                return
            }
            this.vScrollBar.jqxScrollBar("setPosition", e);
            this.hScrollBar.jqxScrollBar("setPosition", d)
        },
        scrollleft: function (d) {
            if (d == null || d == undefined) {
                return
            }
            this.hScrollBar.jqxScrollBar("setPosition", d)
        },
        scrolltop: function (d) {
            if (d == null || d == undefined) {
                return
            }
            this.vScrollBar.jqxScrollBar("setPosition", d)
        },
        beginupdate: function () {
            this._updating = true;
            this._datachanged = false
        },
        endupdate: function () {
            this.resumeupdate()
        },
        resumeupdate: function () {
            this._updating = false;
            if (this._datachanged == true) {
                var d = this.vScrollInstance.value;
                this.render(true, true, false);
                this._datachanged = false;
                if (d != 0 && d < this.vScrollInstance.max) {
                    this.scrolltop(d)
                }
            } else {
                this.rendergridcontent(true);
                this._renderrows(this.virtualsizeinfo)
            }
        },
        updating: function () {
            return this._updating
        },
        showloadelement: function () {
            if (this.renderloadelement) {
                this.dataloadelement.html(this.renderloadelement())
            }
            b(this.dataloadelement).css("visibility", "visible");
            b(this.dataloadelement).css("display", "block")
        },
        hideloadelement: function () {
            b(this.dataloadelement).css("visibility", "hidden");
            b(this.dataloadelement).css("display", "none")
        },
        databind: function (e) {
            if (this.host.css("display") == "block") {
                if (this.autoshowloadelement) {
                    b(this.dataloadelement).css("visibility", "visible");
                    b(this.dataloadelement).css("display", "block");
                    this.dataloadelement.width(this.host.width());
                    this.dataloadelement.height(this.host.height())
                }
            }
            if (!this._initgroupsheader && this.groups.length > 0) {
                this.groups = new Array()
            }
            var d = this;
            if (e == null) {
                e = new Array()
            }
            if (!e.recordstartindex) {
                e.recordstartindex = 0
            }
            if (!e.recordendindex) {
                e.recordendindex = 0
            }
            if (e.loadallrecords == undefined || e.loadallrecords == null) {
                e.loadallrecords = true
            }
            if (e.sortcomparer == undefined || e.sortcomparer == null) {
                e.sortcomparer = null
            }
            if (e.filter == undefined || e.filter == null) {
                e.filter = null
            }
            if (e.sort == undefined || e.sort == null) {
                e.sort = null
            }
            if (e.data == undefined || e.data == null) {
                e.data = null
            }
            this.dataview = this.dataview || new b.jqx.dataview();
            if (b.jqx.dataview.sort) {
                b.extend(this.dataview, new b.jqx.dataview.sort())
            }
            if (b.jqx.dataview.grouping) {
                b.extend(this.dataview, new b.jqx.dataview.grouping())
            }
            this.dataview.suspendupdate();
            this.dataview.pageable = this.pageable;
            this.dataview.groupable = this.groupable;
            this.dataview.groups = this.groups;
            this.dataview.virtualmode = this.virtualmode;
            this.dataview.grid = this;
            this._loading = true;
            this.dataview.update = function () {
                d._loading = false;
                if (d.dataview.isupdating()) {
                    d.dataview.resumeupdate(false)
                }
                if (d.pageable && d.pagerrenderer) {
                    if (d._initpager) {
                        d._initpager()
                    } else {
                        alert("jqxgrid.pager.js is not loaded.")
                    }
                }
                if (d.source.sortcolumn && d.sortby) {
                    d.render();
                    d.sortby(d.source.sortcolumn, d.source.sortdirection, d.source.sortcomparer);
                    d.source.sortcolumn = null
                } else {
                    var g = d.source.datatype;
                    if (g != "local" || g != "array") {
                        var h = d.virtualsizeinfo == null || (d.virtualsizeinfo != null && d.virtualsizeinfo.virtualheight == 0);
                        if (!d.virtualmode || d.pageable || h) {
                            d._render(true, true, true, d.menuitemsarray && !d.virtualmode)
                        } else {
                            if (d.virtualmode && d.dataview.totalrecords == 0 && d.dataview.filters.length > 0) {
                                d._render(true, true, true, d.menuitemsarray && !d.virtualmode)
                            } else {
                                d._pagescache = new Array();
                                d._renderrows(d.virtualsizeinfo)
                            }
                        }
                    }
                }
                if (d.autoshowloadelement) {
                    b(d.dataloadelement).css("visibility", "hidden");
                    b(d.dataloadelement).css("display", "none")
                }
                if (d.pageable) {
                    if (d.pagerrightbutton) {
                        d.pagerrightbutton.jqxButton({
                            disabled: false
                        });
                        d.pagerleftbutton.jqxButton({
                            disabled: false
                        });
                        d.pagershowrowscombo.jqxDropDownList({
                            disabled: false
                        })
                    }
                }
                d._raiseEvent(11);
                if (!d.initializedcall) {
                    d._raiseEvent(0);
                    d.initializedcall = true;
                    if (d.ready) {
                        d.ready()
                    }
                    if ((d.width != null && d.width.toString().indexOf("%") != -1) || (d.height != null && d.height.toString().indexOf("%") != -1)) {
                        d._updatesize(true)
                    }
                    if (d.host.css("visibility") == "hidden") {
                        var f = b.browser.msie && b.browser.version < 8;
                        if (d.vScrollBar.css("visibility") == "visible") {
                            d.vScrollBar.css("visibility", "inherit")
                        }
                        if (d.hScrollBar.css("visibility") == "visible") {
                            d.hScrollBar.css("visibility", "inherit")
                        }
                        d._intervalTimer = setInterval(function () {
                            if (d.host.css("visibility") == "visible") {
                                d._updatesize(true);
                                clearInterval(d._intervalTimer)
                            }
                        }, 100)
                    }
                } else {
                    d._updateTouchScrolling()
                }
            };
            this.dataview.databind(e);
            if (this.dataview.isupdating()) {
                this.dataview.resumeupdate(false)
            }
            this._initializeRows()
        },
        scrollto: function (e, d) {
            if (undefined != e) {
                this.hScrollInstance.setPosition(e)
            }
            if (undefined != d) {
                this.vScrollInstance.setPosition(d)
            }
        },
        ensurerowvisible: function (g) {
            var e = this._getpagesize();
            var f = Math.floor(g / e);
            if (!this._pageviews[f] && !this.pageable) {
                this._updatepageviews()
            }
            var o = false;
            if (this.pageable && this.gotopage && !this.virtualmode) {
                if (this.dataview.pagenum != f) {
                    this.gotopage(f);
                    o = true
                }
            }
            var l = this.vScrollInstance.value;
            var n = this._gettableheight() - this.rowsheight;
            var d = e * (g / e - f);
            d = Math.round(d);
            if (this._pageviews[f]) {
                var k = this._pageviews[f].top;
                var h = k + d * this.rowsheight;
                if (this.rowdetails) {
                    for (i = e * f; i < g; i++) {
                        if (this.details[i].rowdetailshidden == false) {
                            h += this.details[i].rowdetailsheight
                        }
                    }
                }
                if (h < l) {
                    this.scrolltop(h);
                    o = true
                } else {
                    if (h > l + n + 2) {
                        this.scrolltop(h - n);
                        o = true
                    }
                }
            } else {
                if (this.pageable) {
                    var h = d * this.rowsheight;
                    if (this.rowdetails) {
                        for (i = e * f; i < e * f + d; i++) {
                            if (this.details[i].rowdetailshidden == false) {
                                h += this.details[i].rowdetailsheight
                            }
                        }
                    }
                    if (h < l || h > l + n) {
                        this.scrollto(0, h);
                        o = true
                    }
                }
            }
            return o
        },
        ensurecellvisible: function (h, d) {
            var k = this.hScrollBar.jqxScrollBar("value");
            var q = this.ensurerowvisible(h);
            var e = 0;
            var p = this;
            if (this.columns.records) {
                var n = k;
                var o = this.host.width();
                var l = 0;
                var f = this.vScrollBar.css("visibility") == "visible" ? 20 : 0;
                var g = false;
                b.each(this.columns.records, function () {
                    if (this.datafield == d) {
                        var r = 0;
                        if (e + this.width > n + o - f) {
                            r = e + this.width - n - o + f;
                            p.scrollleft(r + n);
                            g = true
                        } else {
                            if (e <= n) {
                                r = e - this.width;
                                p.scrollleft(r);
                                g = true
                            }
                        }
                        if (l == 0) {
                            p.scrollleft(0);
                            g = true
                        } else {
                            if (l == p.columns.records.length - 1) {
                                if (p.hScrollBar.css("visibility") == "visible") {
                                    p.scrollleft(p.hScrollBar.jqxScrollBar("max"));
                                    g = true
                                }
                            }
                        }
                        return false
                    }
                    l++;
                    e += this.width
                });
                if (!g) {
                    p.scrollleft(n)
                }
            }
            return q
        },
        setrowheight: function (e, d) {
            if (this._loading) {
                alert(this.loadingerrormessage);
                return false
            }
            if (e == null || d == null) {
                return false
            }
            this.heightboundrows[e] = {
                index: e,
                height: d
            };
            e = this.getrowvisibleindex(e);
            if (e < 0) {
                return false
            }
            if (this.rows.records[e]) {
                this.rows.records[e].height = d
            } else {
                row = new a(this, null);
                row.height = d;
                this.rows.replace(e, row)
            }
            this.heights[e] = d;
            this.rendergridcontent(true);
            return true
        },
        getrowheight: function (d) {
            if (d == null) {
                return null
            }
            d = this.getrowvisibleindex(d);
            if (d < 0) {
                return false
            }
            if (this.rows.records[d]) {
                return this.rows.records[d].height
            }
        },
        setrowdetails: function (e, f, d, h) {
            if (e == undefined || e == null || e < 0) {
                return
            }
            var g = this.dataview.generatekey();
            this.detailboundrows[e] = {
                index: e,
                details: {
                    rowdetails: f,
                    rowdetailsheight: d,
                    rowdetailshidden: h,
                    key: g
                }
            };
            e = this.getrowvisibleindex(e);
            if (e < 0) {
                return false
            }
            return this._setrowdetails(e, f, d, h, g)
        },
        getcolumn: function (d) {
            var e = null;
            if (this.columns.records) {
                b.each(this.columns.records, function () {
                    if (this.datafield == d) {
                        e = this;
                        return false
                    }
                })
            }
            return e
        },
        _getcolumnindex: function (e) {
            var d = -1;
            if (this.columns.records) {
                b.each(this.columns.records, function () {
                    d++;
                    if (this.datafield == e) {
                        return false
                    }
                })
            }
            return d
        },
        _getcolumnat: function (d) {
            var e = this.columns.records[d];
            return e
        },
        _getprevvisiblecolumn: function (e) {
            var d = this;
            while (e > 0) {
                e--;
                var f = d.getcolumnat(e);
                if (!f) {
                    return null
                }
                if (!f.hidden) {
                    return f
                }
            }
            return null
        },
        _getnextvisiblecolumn: function (e) {
            var d = this;
            while (e < this.columns.records.length) {
                e++;
                var f = d.getcolumnat(e);
                if (!f) {
                    return null
                }
                if (!f.hidden) {
                    return f
                }
            }
            return null
        },
        getcolumnat: function (d) {
            if (!isNaN(d)) {
                var e = this.columns.records[d];
                return e
            }
            return null
        },
        _getcolumn: function (d) {
            var e = null;
            b.each(this._columns, function () {
                if (this.datafield == d || this.dataField == d) {
                    e = this;
                    return false
                }
            });
            return e
        },
        _setcolumnproperty: function (e, g, h) {
            if (e == null || g == null || h == null) {
                return null
            }
            var f = this.getcolumn(e);
            if (f == null) {
                return
            }
            f[g] = h;
            var d = this._getcolumn(e);
            if (d != null) {
                d[g] = h
            }
            this._cellscache = new Array();
            switch (g) {
            case "text":
                this.prerenderrequired = true;
                this._rendercolumnheaders();
                if (this._groupsheader()) {
                    if (this._initgroupsheader) {
                        this._initgroupsheader()
                    }
                }
                break;
            case "hidden":
            case "hideable":
            case "renderer":
            case "cellsrenderer":
            case "align":
            case "cellsalign":
            case "cellsformat":
            case "pinned":
            case "contenttype":
            case "resizable":
            case "filterable":
            case "groupable":
            case "editable":
            case "cellclass":
            case "class":
                this.prerenderrequired = true;
                this.rendergridcontent(true);
                if (this.updating()) {
                    return false
                }
                this._renderrows(this.virtualsizeinfo);
                break;
            case "width":
            case "minwidth":
            case "maxwidth":
                if (this.updating()) {
                    return false
                }
                this._updatecolumnwidths();
                this._updatecellwidths();
                this._renderrows(this.virtualsizeinfo);
                break
            }
        },
        _getcolumnproperty: function (d, f) {
            if (d == null || f == null) {
                return null
            }
            var e = this.getcolumn(d);
            return e[f]
        },
        setcolumnproperty: function (d, e, f) {
            this._setcolumnproperty(d, e, f)
        },
        getcolumnproperty: function (d, e) {
            return this._getcolumnproperty(d, e)
        },
        hidecolumn: function (d) {
            this._setcolumnproperty(d, "hidden", true)
        },
        showcolumn: function (d) {
            this._setcolumnproperty(d, "hidden", false)
        },
        iscolumnvisible: function (d) {
            return !this._getcolumnproperty(d, "hidden")
        },
        pincolumn: function (d) {
            this._setcolumnproperty(d, "pinned", true)
        },
        unpincolumn: function (d) {
            this._setcolumnproperty(d, "pinned", false)
        },
        iscolumnpinned: function (d) {
            return this._getcolumnproperty(d, "pinned")
        },
        _setrowdetails: function (k, d, p, h, e) {
            if (p == 0) {
                p = 100
            }
            if (k == null || p == null) {
                return false
            }
            if (e != null) {
                this.details[k] = {
                    rowdetails: d,
                    rowdetailsheight: p,
                    rowdetailshidden: h,
                    detailskey: e
                }
            } else {
                var o = this.details[k] != null ? this.details[k].detailskey : null;
                var n = {
                    rowdetails: d,
                    rowdetailsheight: p,
                    rowdetailshidden: h,
                    detailskey: o
                };
                var l = this;
                for (var g = 0; g < this.detailboundrows.length; g++) {
                    if (this.detailboundrows[g] != undefined) {
                        var f = this.detailboundrows[g];
                        if (f.details.key == o) {
                            f.details.rowdetailsheight = n.rowdetailsheight;
                            f.details.rowdetailshidden = n.rowdetailshidden;
                            f.details.rowdetails = n.rowdetails;
                            break
                        }
                    }
                }
                this.details[k] = n
            }
            this.rendergridcontent(true);
            return true
        },
        getrowdetails: function (d) {
            if (d == null) {
                return false
            }
            d = this.getrowvisibleindex(d);
            return this._getrowdetails(d)
        },
        _getrowdetails: function (d) {
            if (d == null) {
                return false
            }
            if (d < 0) {
                return false
            }
            if (this.details[d]) {
                return this.details[d]
            }
        },
        getrecordscount: function () {
            return this.dataview.totalrecords
        },
        showrowdetails: function (d) {
            if (this._loading) {
                alert(this.loadingerrormessage);
                return false
            }
            if (d == null) {
                return false
            }
            d = this.getrowvisibleindex(d);
            if (d < 0) {
                return false
            }
            var e = this._getrowdetails(d);
            return this._setrowdetailsvisibility(d, e, false)
        },
        hiderowdetails: function (d) {
            if (this._loading) {
                alert(this.loadingerrormessage);
                return false
            }
            d = this.getrowvisibleindex(d);
            if (d < 0) {
                return false
            }
            var e = this._getrowdetails(d);
            return this._setrowdetailsvisibility(d, e, true)
        },
        _togglerowdetails: function (g) {
            var d = g.visibleindex;
            var e = this._getrowdetails(d);
            if (e != null) {
                var f = !e.rowdetailshidden;
                return this._setrowdetailsvisibility(d, e, f)
            }
            return false
        },
        _setrowdetailsvisibility: function (e, f, g) {
            if (f != null) {
                this.details[e].rowdetailshidden = g
            } else {
                return false
            }
            var d = this.details[e];
            if (g) {
                this._raiseEvent(21, {
                    rowindex: e,
                    details: d.rowdetails,
                    height: d.rowdetailsheight
                })
            } else {
                this._raiseEvent(20, {
                    rowindex: e,
                    details: d.rowdetails,
                    height: d.rowdetailsheight
                })
            }
            return this._setrowdetails(e, d.rowdetails, d.rowdetailsheight, d.rowdetailshidden)
        },
        getrowvisibleindex: function (d) {
            if (d == undefined || d == null || d < 0) {
                return false
            }
            if (this.virtualmode) {
                var e = this.dataview.loadedrecords[d];
                if (e == undefined) {
                    return -1
                }
                return e.visibleindex
            }
            var e = this.dataview.bounditems[d];
            if (e == undefined) {
                return -1
            }
            return e.visibleindex
        },
        hiderow: function (d) {
            if (this._loading) {
                alert(this.loadingerrormessage);
                return false
            }
            if (d == undefined || d == null || d < 0) {
                return false
            }
            if (d == null) {
                return false
            }
            this.hiddenboundrows[d] = {
                index: d,
                hidden: true
            };
            d = this.getrowvisibleindex(d);
            return this._setrowvisibility(d, true)
        },
        showrow: function (d) {
            if (this._loading) {
                alert(this.loadingerrormessage);
                return false
            }
            if (d == undefined || d == null || d < 0) {
                return false
            }
            if (d == null) {
                return false
            }
            this.hiddenboundrows[d] = {
                index: d,
                hidden: false
            };
            d = this.getrowvisibleindex(d);
            return this._setrowvisibility(d, false)
        },
        isrowhiddenat: function (d) {
            if (d == null) {
                return null
            }
            d = this.getrowvisibleindex(d);
            if (this.rows.records[d]) {
                return this.rows.records[d].hidden
            }
        },
        _setrowvisibility: function (d, f, e) {
            if (d == null) {
                return false
            }
            this.hiddens[d] = f;
            if (e == undefined || e) {
                this.rendergridcontent(true);
                return true
            }
            return false
        },
        _loadrows: function () {
            if (!this._pageviews[this.dataview.pagenum] && !this.pageable) {
                return
            }
            var q = !this.pageable ? this._pageviews[this.dataview.pagenum].top : 0;
            if (!this.pageable && this._pagescache[this.dataview.pagenum] != undefined) {
                return null
            }
            if (!this.virtualsizeinfo) {
                return
            }
            var u = this;
            var l = new Array();
            var r = new Array();
            var e = u.groupable && u.groups.length > 0;
            var h = this.dataview.totalrecords;
            var p = this.virtualsizeinfo.virtualheight;
            var t = 0;
            this.rows.beginupdate();
            var f = this.dataview.pagesize;
            if (this.pageable && e) {
                f = this.dataview.rows.length
            }
            for (i = 0; i < f; i++) {
                if (i >= this.dataview.rows.length) {
                    break
                }
                var k = this.dataview.rows[i];
                var v = null;
                if (!u.rows.records[k.visibleindex]) {
                    v = new a(u, k)
                } else {
                    v = u.rows.records[k.visibleindex];
                    v.setdata(k)
                }
                v.hidden = this.hiddens[v.visibleindex];
                var d = this.details[v.visibleindex];
                if (d) {
                    v.rowdetails = d.rowdetails;
                    v.rowdetailsheight = d.rowdetailsheight;
                    v.rowdetailshidden = d.rowdetailshidden
                } else {
                    v.rowdetails = null
                }
                if (e && this.pageable && v.parentbounddata != null) {
                    var s = l[v.parentbounddata.uniqueid];
                    if (s != null) {
                        var o = this._findgroupstate(s.uniqueid);
                        if (this._setsubgroupsvisibility) {
                            this._setsubgroupsvisibility(this, v.parentbounddata, !o, false)
                        }
                        v.hidden = this.hiddens[v.visibleindex]
                    }
                    if (s != null && s != undefined) {
                        v.parentrow = s;
                        s.subrows[s.subrows.length++] = v
                    }
                }
                if (v.hidden) {
                    continue
                }
                var g = k.visibleindex;
                if (!this.heights[g]) {
                    this.heights[g] = this.rowsheight
                }
                v.height = this.heights[g];
                if (this.rowdetails) {
                    if (v.rowdetails && !v.rowdetailshidden) {
                        v.height += v.rowdetailsheight
                    }
                }
                l[v.uniqueid] = v;
                r[t++] = v;
                v.top = q;
                q += v.height;
                var n = g;
                u.rows.replace(n, v)
            }
            this.rows.resumeupdate();
            if (r.length > 0) {
                this._pagescache[this.dataview.pagenum] = r
            }
        },
        _gettableheight: function () {
            if (this.tableheight != undefined) {
                return this.tableheight
            }
            var e = this.host.height();
            if (this.columnsheader) {
                var d = this.columnsheader.outerHeight();
                if (!this.showheader) {
                    d = 0
                }
            }
            e -= d;
            if (this.hScrollBar.css("visibility") == "visible") {
                e -= this.hScrollBar.outerHeight()
            }
            if (this.pageable) {
                e -= this.pager.outerHeight()
            }
            if (this._groupsheader()) {
                e -= this.groupsheader.outerHeight()
            }
            if (this.showtoolbar) {
                e -= this.toolbarheight
            }
            if (this.showstatusbar) {
                e -= this.statusbarheight
            }
            if (e > 0) {
                this.tableheight = e;
                return e
            }
            return this.host.height()
        },
        _getpagesize: function () {
            if (this.pageable) {
                return this.pagesize
            }
            if (this.virtualmode) {
                var e = Math.round(this.host.height()) + 2 * this.rowsheight;
                var d = Math.round(e / this.rowsheight);
                return d
            }
            if (this.autoheight) {
                if (this.dataview.totalrows == 0) {
                    return 1
                }
                return this.dataview.totalrows
            }
            if (this.dataview.totalrows < 100 && this.dataview.totalrecords < 100 && this.dataview.totalrows > 0) {
                return this.dataview.totalrows
            }
            return 100
        },
        _calculatevirtualheight: function () {
            var p = this;
            var e = Math.round(this.host.height()) + 2 * this.rowsheight;
            realheight = this._gettableheight();
            var r = Math.round(e / this.rowsheight);
            this.heights = new Array();
            this.hiddens = new Array();
            this.details = new Array();
            this.expandedgroups = new Array();
            this.hiddenboundrows = new Array();
            this.heightboundrows = new Array();
            this.detailboundrows = new Array();
            var h = Math.max(this.dataview.totalrows, this.dataview.totalrecords);
            if (this.pageable) {
                h = this.pagesize;
                if (this.pagesize > Math.max(this.dataview.totalrows, this.dataview.totalrecords) && this.autoheight) {
                    h = Math.max(this.dataview.totalrows, this.dataview.totalrecords)
                }
            }
            var n = h * this.rowsheight;
            var o = 0;
            var k = 0;
            var l = 0;
            var f = this._getpagesize();
            var d = f * this.rowsheight;
            var g = 0;
            while (g <= h + f) {
                o += d;
                if (g - f < h && g >= h) {
                    var q = g - h;
                    if (q > 0) {
                        l -= d;
                        this._pageviews[k - 1] = {
                            top: l,
                            height: d - q * this.rowsheight
                        }
                    }
                    break
                } else {
                    this._pageviews[k++] = {
                        top: l,
                        height: d
                    }
                }
                l = o;
                g += f
            }
            this.vScrollBar.jqxScrollBar({
                value: 0
            });
            if (n > realheight && !this.autoheight) {
                this.vScrollBar.css("visibility", "visible");
                this.vScrollBar.jqxScrollBar({
                    max: n - realheight
                })
            } else {
                this.vScrollBar.css("visibility", "hidden")
            }
            this.dataview.pagesize = f;
            this.dataview.updateview();
            return {
                visiblerecords: r,
                virtualheight: n
            }
        },
        _updatepageviews: function () {
            if (this.updating()) {
                return
            }
            this._pagescache = new Array();
            this._pageviews = new Array();
            this.tableheight = null;
            var u = this;
            var d = Math.round(this.host.height()) + 2 * this.rowsheight;
            var v = Math.round(d / this.rowsheight);
            var n = Math.max(this.dataview.totalrows, this.dataview.totalrecords);
            var q = n * this.rowsheight;
            var t = 0;
            var f = 0;
            var o = 0;
            var p = 0;
            var h = 0;
            var g = this._getpagesize();
            if (!this.pageable) {
                for (i = 0; i < n; i++) {
                    var s = {
                        index: i,
                        height: this.heights[i],
                        hidden: this.hiddens[i],
                        details: this.details[i]
                    };
                    if (this.heights[i] == undefined) {
                        this.heights[i] = this.rowsheight;
                        s.height = this.rowsheight
                    }
                    if (this.hiddens[i] == undefined) {
                        this.hiddens[i] = false;
                        s.hidden = false
                    }
                    if (this.details[i] == undefined) {
                        this.details[i] = null
                    }
                    if (s.height != u.rowsheight) {
                        q -= u.rowsheight;
                        q += s.height
                    }
                    if (s.hidden) {
                        q -= s.height
                    } else {
                        f += s.height;
                        var l = 0;
                        if (this.rowdetails) {
                            if (s.details && s.details.rowdetails && !s.details.rowdetailshidden) {
                                l = s.details.rowdetailsheight;
                                f += l;
                                q += l
                            }
                        }
                        t += s.height + l
                    }
                    h++;
                    if (h >= g || i == n - 1) {
                        this._pageviews[o++] = {
                            top: p,
                            height: f
                        };
                        f = 0;
                        p = t;
                        h = 0
                    }
                }
            } else {
                if (this._updatepagedview) {
                    q = this._updatepagedview(n, q, 0)
                }
                if (this.autoheight) {
                    this._arrange()
                }
            }
            var e = this._gettableheight();
            if (q > e) {
                if (this.pageable && this.gotopage) {
                    q = this._pageviews[0].height;
                    if (q < 0) {
                        q = this._pageviews[0].height
                    }
                }
                if (this.vScrollBar.css("visibility") != "visible") {
                    this.vScrollBar.css("visibility", "visible")
                }
                if (q <= e || this.autoheight) {
                    this.vScrollBar.css("visibility", "hidden")
                }
                if (q - e > 0) {
                    var r = q - e;
                    this.vScrollBar.jqxScrollBar({
                        max: r
                    })
                } else {
                    this.vScrollBar.jqxScrollBar({
                        value: 0,
                        max: q
                    })
                }
            } else {
                this.vScrollBar.css("visibility", "hidden");
                this.vScrollBar.jqxScrollBar({
                    value: 0
                })
            }
            this._arrange();
            if (this.autoheight) {
                v = Math.round(this.host.height() / this.rowsheight)
            }
            this.virtualsizeinfo = {
                visiblerecords: v,
                virtualheight: q
            }
        },
        updatebounddata: function () {
            this.databind(this.source)
        },
        refreshdata: function () {
            this._refreshdataview();
            this.render()
        },
        _refreshdataview: function () {
            this.dataview.refresh()
        },
        refresh: function (d) {
            if (d != true) {
                if (this.virtualsizeinfo != null) {
                    this._cellscache = new Array();
                    this._renderrows(this.virtualsizeinfo);
                    this._updatesize()
                }
            }
        },
        render: function () {
            this._render(true, true, true, true)
        },
        clear: function () {
            this.databind(null);
            this.render()
        },
        _render: function (f, g, e, d) {
            if (this.dataview == null) {
                return
            }
            if (this.editcell != null && this.endcelledit) {
                this.endcelledit(this.editcell.row, this.editcell.column, true, false)
            }
            this._removeHandlers();
            this._addHandlers();
            this._initializeRows();
            this._requiresupdate = g != undefined ? g : true;
            if (e) {
                if (!this._requiresupdate) {
                    if (d != false) {
                        this._initmenu()
                    }
                }
                if (this.columns == null) {
                    this.columns = new b.jqx.collection(this.element)
                } else {
                    this._initializeColumns()
                }
            }
            this.tableheight = null;
            this._pagescache = new Array();
            this._pageviews = new Array();
            if (this._requiresupdate) {
                this._clearcaches();
                if (d != false) {
                    this._initmenu()
                }
            }
            this.virtualsizeinfo = null;
            this.prerenderrequired = true;
            if ((this.groupable && this.groups.length > 0 && this.rowdetails) || (this.rowdetails)) {
                if (this.gridcontent) {
                    this._rowdetailscache = new Array();
                    this._rowdetailselementscache = new Array();
                    this.detailboundrows = new Array();
                    this.details = new Array();
                    this.gridcontent.html("");
                    this.gridcontent = null
                }
            }
            if (e) {
                this.content.html("");
                this.columnsheader = this.columnsheader || b('<div style="overflow: hidden;"></div>');
                this.columnsheader.remove();
                this.columnsheader.addClass(this.toTP("jqx-widget-header"));
                this.columnsheader.addClass(this.toTP("jqx-grid-header"))
            } else {
                if (this.gridcontent) {
                    this.gridcontent.html("")
                }
            }
            if (!this.showheader) {
                this.columnsheader.css("display", "none")
            } else {
                if (this.columnsheader) {
                    this.columnsheader.css("display", "block")
                }
            }
            this.gridcontent = this.gridcontent || b('<div style="width: 100%; overflow: hidden; position: absolute;"></div>');
            this.gridcontent.remove();
            this.columnsheader.height(this.columnsheight);
            this.content.append(this.columnsheader);
            this.content.append(this.gridcontent);
            this._arrange();
            if (this._initgroupsheader) {
                this._initgroupsheader()
            }
            this.selectionarea = this.selectionarea || b("<div style='z-index: 99999; visibility: hidden; position: absolute;'></div>");
            this.selectionarea.addClass(this.toThemeProperty("jqx-grid-selectionarea"));
            this.selectionarea.addClass(this.toThemeProperty("jqx-fill-state-pressed"));
            this.content.append(this.selectionarea);
            this.tableheight = null;
            this.rendergridcontent(false, e);
            if (this.groups.length > 0 && this.groupable) {
                this.suspendgroupevents = true;
                if (this.collapseallgroups) {
                    if (!this.groupsexpandedbydefault) {
                        this.collapseallgroups();
                        this._updatescrollbarsafterrowsprerender()
                    } else {
                        this.expandallgroups()
                    }
                }
                this.suspendgroupevents = false
            }
            if (this.pageable && this.updatepagerdetails) {
                this.updatepagerdetails();
                if (this.autoheight) {
                    this._updatepageviews()
                }
            }
            this._updateTouchScrolling();
            if (this.rendered) {
                this.rendered()
            }
        },
        rendergridcontent: function (d, f) {
            if (this.updating()) {
                return false
            }
            if (d == undefined || d == null) {
                d = false
            }
            this._requiresupdate = d;
            var h = this.prerenderrequired;
            if (this.prerenderrequired) {
                this._arrange()
            }
            var g = this;
            var f = f;
            if (f == null || f == undefined) {
                f = true
            }
            this.tableheight = null;
            g.virtualsizeinfo = g.virtualsizeinfo || g._calculatevirtualheight();
            if (g.pageable && !g.autoheight) {
                if (g.dataview.totalrows < g.pagesize) {
                    g._requiresupdate = true
                }
            }
            if (f) {
                g._rendercolumnheaders()
            } else {
                if (this._rendersortcolumn) {
                    this._rendersortcolumn()
                }
                if (this._renderfiltercolumn) {
                    this._renderfiltercolumn()
                }
            }
            g._renderrows(g.virtualsizeinfo);
            if (this.gridcontent[0].scrollTop != 0) {
                this.gridcontent[0].scrollTop = 0
            }
            if (this.gridcontent[0].scrollLeft != 0) {
                this.gridcontent[0].scrollLeft = 0
            }
            if (h) {
                var e = this.tableheight;
                this._arrange();
                if (e != this.tableheight && this.autoheight) {
                    g._renderrows(g.virtualsizeinfo)
                }
            }
            return true
        },
        _updatecolumnwidths: function () {
            var g = this.host.width();
            var f = "";
            if (this.columns == undefined || this.columns.records == undefined) {
                return
            }
            b.each(this.columns.records, function (n, o) {
                if (!(this.hidden && this.hideable)) {
                    if (this.width != "auto" && !this._width) {
                        g -= this.width
                    } else {
                        f += this.text
                    }
                }
            });
            var e = this._gettableheight();
            if (this.virtualsizeinfo && this.virtualsizeinfo.virtualheight > e) {
                if (this.groupable && this.groups.length > 0) {
                    if (this.dataview && this.dataview.loadedrootgroups && !this.groupsexpandedbydefault) {
                        var k = this.dataview.loadedrootgroups.length * this.rowsheight;
                        if (k > e) {
                            g -= this.scrollbarsize + 5
                        }
                    } else {
                        g -= this.scrollbarsize + 5
                    }
                } else {
                    g -= this.scrollbarsize + 5
                }
            }
            var l = this.columnsheader.find("#columntable" + this.element.id);
            if (l.length == 0) {
                return
            }
            var d = l.find(".jqx-grid-column-header");
            var h = 0;
            b.each(this.columns.records, function (n, q) {
                var p = b(d[n]);
                if (this.width != "auto" && !this._width) {
                    p.width(this.width)
                } else {
                    var o = Math.round(g * (this.text.length / f.length));
                    if (isNaN(o)) {
                        o = this.minwidth
                    }
                    if (o < 0) {
                        $element = b("<span>" + this.text + "</span>");
                        b(document.body).append($element);
                        o = 10 + $element.width();
                        $element.remove()
                    }
                    if (o < this.minwidth) {
                        o = this.minwidth
                    }
                    if (o > this.maxwidth) {
                        o = this.maxwidth
                    }
                    this._width = "auto";
                    this.width = o;
                    p.width(this.width)
                }
                p.css("left", h);
                if (!(this.hidden && this.hideable)) {
                    h += this.width
                }
                this._requirewidthupdate = true
            });
            this.columnsheader.width(2 + h)
        },
        _rendercolumnheaders: function () {
            var t = this;
            if (!this.prerenderrequired) {
                if (this._rendersortcolumn) {
                    this._rendersortcolumn()
                }
                if (this._renderfiltercolumn) {
                    this._renderfiltercolumn()
                }
                return
            }
            this._columnsbydatafield = new Array();
            this.columnsheader.find("#columntable" + this.element.id).remove();
            var f = b('<div id="columntable' + this.element.id + '" style="height: 100%; position: relative;"></div>');
            f[0].cells = new Array();
            var h = 0;
            var g = 0;
            var n = "";
            var o = this.host.width();
            var s = new Array();
            var p = new Array();
            b.each(this.columns.records, function (k, u) {
                if (!(this.hidden && this.hideable)) {
                    if (this.width != "auto" && !this._width) {
                        if (this.width < this.minwidth && this.minwidth != "auto") {
                            o -= this.minwidth
                        } else {
                            if (this.width > this.maxwidth && this.maxwidth != "auto") {
                                o -= this.maxwidth
                            } else {
                                o -= this.width
                            }
                        }
                    } else {
                        n += this.text
                    }
                }
                if (this.pinned) {
                    s[s.length] = this
                } else {
                    p[p.length] = this
                }
            });
            for (i = 0; i < s.length; i++) {
                this.columns.replace(i, s[i])
            }
            for (j = 0; j < p.length; j++) {
                this.columns.replace(s.length + j, p[j])
            }
            var r = this.headerZIndex;
            var d = t.groupable ? t.groups.length : 0;
            if (this.rowdetails && this.showrowdetailscolumn) {
                d++
            }
            var l = t.columnsheader.height();
            var e = this._gettableheight();
            if (this.virtualsizeinfo && this.virtualsizeinfo.virtualheight > e) {
                if (this.groupable && this.groups.length > 0) {
                    if (this.dataview && this.dataview.loadedrootgroups && !this.groupsexpandedbydefault) {
                        var q = this.dataview.loadedrootgroups.length * this.rowsheight;
                        if (q > e) {
                            o -= this.scrollbarsize + 5
                        }
                    } else {
                        o -= this.scrollbarsize + 5
                    }
                } else {
                    if (!this.autoheight) {
                        o -= this.scrollbarsize + 5
                    }
                }
            }
            b.each(this.columns.records, function (L, I) {
                var w = b('<div style="position: absolute; height: 100%;"></div>');
                w.addClass(t.toTP("jqx-grid-column-header"));
                w.addClass(t.toTP("jqx-widget-header"));
                if (this.classname != "" && this.classname) {
                    w.addClass(this.classname)
                }
                w.css("z-index", r--);
                var E = this.width;
                if (this.width != "auto" && !this._width) {
                    if (E < this.minwidth && this.minwidth != "auto") {
                        E = this.minwidth
                    }
                    if (E > this.maxwidth && this.maxwidth != "auto") {
                        E = this.maxwidth
                    }
                    w.width(E)
                } else {
                    var H = Math.round(o * (this.text.length / n.length));
                    if (isNaN(H)) {
                        H = this.minwidth
                    }
                    if (H < 0) {
                        $element = b("<span>" + this.text + "</span>");
                        b(document.body).append($element);
                        H = 10 + $element.width();
                        $element.remove()
                    }
                    if (H < this.minwidth) {
                        H = this.minwidth
                    }
                    if (H > this.maxwidth) {
                        H = this.maxwidth
                    }
                    this._width = "auto";
                    this.width = H;
                    E = this.width;
                    w.width(this.width)
                }
                if (this.hidden && this.hideable) {
                    w.css("display", "none")
                }
                var u = b('<div style="height: 100%; width: 100%;"></div>');
                var A = b('<div style="display: none; left: 100%; top: 0%; position: absolute;"></div>');
                var C = b('<div style="width: 100%; height:100%;"></div>');
                C.addClass(t.toTP("jqx-grid-column-menubutton"));
                C.appendTo(A);
                A.height(l);
                if (!t.enableanimations) {
                    A.css("margin-left", -16)
                }
                var F = b('<div class="sortasc" style="float: right; display: none; width: 16px;"><div style="width: 100%; height:100%;"></div></div>');
                var G = b('<div class="sortdesc" style="float: right; display: none; width: 16px;"><div style="width: 100%; height:100%;"></div></div>');
                var K = b('<div class="filtericon" style="float: right; display: none; width: 16px;"><div style="width: 100%; height:100%;"></div></div>');
                if (!t.autoshowfiltericon && this.filterable) {
                    K.css("display", "block")
                }
                F.height(l);
                G.height(l);
                K.height(l);
                F.find("div").addClass(t.toTP("jqx-grid-column-sortascbutton"));
                G.find("div").addClass(t.toTP("jqx-grid-column-sortdescbutton"));
                K.find("div").addClass(t.toTP("jqx-grid-column-filterbutton"));
                this.sortasc = F[0];
                this.sortdesc = G[0];
                this.filtericon = K[0];
                this.columnsmenu = A[0];
                f[0].cells[L] = w[0];
                A.width(t.columnsmenuwidth);
                var z = t.columnsmenu;
                var v = false;
                var J = false;
                if ((t.groupable && d > 0 && h < d) || (t.rowdetails && h < d)) {
                    h++;
                    z &= false;
                    this.sortable = false;
                    this.editable = false;
                    J = true
                } else {
                    if (this.text !== '' && typeof(i18n) === 'object' && this.classname === 'i18n') {
                        this.text = i18n.t(this.text);
                    }
                    var B = this.renderer != null ? this.renderer(this.text, this.align) : t._rendercolumnheader(this.text, this.align);
                    if (B == null) {
                        B = t._rendercolumnheader(this.text, this.align)
                    }
                    z &= true;
                    v = true
                }
                u.append(B);
                if (B != null) {
                    var D = b('<div class="iconscontainer" style="margin-left: -32px; display: block; position: absolute; left: 100%; top: 0%; width: 32px;"></div>');
                    A.addClass(t.toTP("jqx-widget-header"));
                    D.height(l);
                    u.append(D);
                    D.append(K);
                    D.append(F);
                    D.append(G);
                    G.addClass(t.toTP("jqx-widget-header"));
                    F.addClass(t.toTP("jqx-widget-header"));
                    K.addClass(t.toTP("jqx-widget-header"));
                    this.iconscontainer = D
                }
                if (z) {
                    t._handlecolumnsmenu(t, u, w, A, this)
                }
                w.append(u);
                f.append(w);
                if (t.groupable && v) {
                    w[0].id = t.dataview.generatekey();
                    if (t._handlecolumnstogroupsdragdrop) {
                        t._handlecolumnstogroupsdragdrop(this, w)
                    } else {
                        alert("jqxgrid.grouping.js is not loaded")
                    }
                }
                var M = this;
                t.addHandler(w, "click", function (N) {
                    if (t.sorttogglestates > 0 && t._togglesort) {
                        t._togglesort(M)
                    }
                    N.preventDefault();
                    t._raiseEvent(7, {
                        column: M.getcolumnproperties(),
                        datafield: M.datafield,
                        originalEvent: N
                    })
                });
                if (M.resizable && t.columnsresize && !J) {
                    var y = false;
                    var k = "mousemove";
                    if (t.isTouchDevice()) {
                        y = true;
                        k = "touchstart"
                    }
                    t.addHandler(w, k, function (O) {
                        var N = parseInt(O.pageX);
                        var Q = 5;
                        var S = parseInt(w.offset().left);
                        if (t._handlecolumnsresize) {
                            if (y) {
                                var P = t.getTouches(O);
                                var R = P[0];
                                N = R.pageX;
                                Q = 40;
                                if (N >= S + M.width - Q) {
                                    t.resizablecolumn = {
                                        columnelement: w,
                                        column: M
                                    };
                                    w.css("cursor", "col-resize")
                                } else {
                                    w.css("cursor", "");
                                    t.resizablecolumn = null
                                }
                                return true
                            }
                            if (N >= S + M.width - Q) {
                                if (N <= S + M.width + Q) {
                                    t.resizablecolumn = {
                                        columnelement: w,
                                        column: M
                                    };
                                    w.css("cursor", "col-resize");
                                    return false
                                }
                            } else {
                                w.css("cursor", "");
                                t.resizablecolumn = null
                            }
                        }
                    })
                }
                w.css("left", g);
                if (!(this.hidden && this.hideable)) {
                    g += E
                }
            });
            if (g > 0) {
                this.columnsheader.width(2 + g)
            } else {
                this.columnsheader.width(g)
            }
            this.columnsrow = f;
            t.columnsheader.append(f);
            f.width(g);
            if (this._handlecolumnsdragdrop) {
                this._handlecolumnsdragdrop()
            }
            if (this._rendersortcolumn) {
                this._rendersortcolumn()
            }
            if (this._renderfiltercolumn) {
                this._renderfiltercolumn()
            }
            if (this._handlecolumnsresize) {
                this._handlecolumnsresize()
            }
        },
        _handlecolumnsmenu: function (q, e, f, h, n) {
            q.dragmousedown = null;
            h[0].id = q.dataview.generatekey();
            e.append(h);
            f[0].columnsmenu = h[0];
            var l = 16;
            var p = function () {
                if (!n.menu) {
                    return false
                }
                if (!q.resizing) {
                    if (q.menuitemsarray.length > 0) {
                        if (!q.enableanimations) {
                            h.css("display", "block");
                            n.iconscontainer.css("margin-left", "-48px")
                        } else {
                            h.css("display", "block");
                            h.animate({
                                "margin-left": -l
                            }, "fast");
                            n.iconscontainer.animate({
                                "margin-left": -48
                            }, "fast")
                        }
                    }
                }
            };
            q.addHandler(f, "mouseenter", function (r) {
                if (n.menu) {
                    p()
                }
            });
            q.addHandler(f, "mouseleave", function (r) {
                if (q.menuitemsarray.length > 0 && n.menu) {
                    var s = b.data(document.body, "contextmenu" + q.element.id);
                    if (s != undefined && h[0].id == s.columnsmenu.id) {
                        return
                    }
                    if (!q.enableanimations) {
                        h.css("display", "none");
                        n.iconscontainer.css("margin-left", "-32px")
                    } else {
                        h.css("margin-left", -l);
                        h.animate({
                            "margin-left": 0
                        }, "fast", function () {
                            h.css("display", "none")
                        });
                        n.iconscontainer.animate({
                            "margin-left": -32
                        }, "fast")
                    }
                }
            });
            var k = true;
            var d = "";
            var g = b(n.filtericon);
            q.addHandler(h, "mousedown", function (r) {
                k = !b.data(q.gridmenu[0], "contextMenuOpened" + q.gridmenu[0].id);
                d = b.data(document.body, "contextmenu" + q.element.id);
                if (d != null) {
                    d = d.column.datafield
                }
            });
            q.addHandler(g, "mousedown", function (r) {
                k = !b.data(q.gridmenu[0], "contextMenuOpened" + q.gridmenu[0].id);
                d = b.data(document.body, "contextmenu" + q.element.id);
                if (d != null) {
                    d = d.column.datafield
                }
            });
            var o = function () {
                if (!n.menu) {
                    return false
                }
                var u = h.offset();
                var A = h.height();
                if (!k) {
                    k = true;
                    if (d == n.datafield) {
                        q._closemenu();
                        return false
                    }
                }
                if (q.host.width() > parseInt(u.left) + q.gridmenu.width()) {
                    q.gridmenu.jqxMenu("open", u.left, u.top + A)
                } else {
                    q.gridmenu.jqxMenu("open", h.width() + u.left - q.gridmenu.width(), u.top + A)
                }
                if (q.gridmenu.width() < 100) {
                    q._arrangemenu()
                }
                q._hasOpenedMenu = true;
                var y = q._getmenuitembyindex(0);
                var r = q._getmenuitembyindex(1);
                var C = q._getmenuitembyindex(2);
                var z = q._getmenuitembyindex(3);
                var s = q._getmenuitembyindex(4);
                var D = q._getmenuitembyindex(5);
                if (y != null && r != null && C != null) {
                    var v = n.sortable && q.sortable;
                    q.gridmenu.jqxMenu("disable", y.id, !v);
                    q.gridmenu.jqxMenu("disable", r.id, !v);
                    q.gridmenu.jqxMenu("disable", C.id, !v);
                    if (n.datafield) {
                        if (q.sortcolumn == n.datafield) {
                            var w = q.getsortinformation();
                            if (v) {
                                if (w.sortdirection.ascending) {
                                    q.gridmenu.jqxMenu("disable", y.id, true)
                                } else {
                                    q.gridmenu.jqxMenu("disable", r.id, true)
                                }
                            }
                        } else {
                            q.gridmenu.jqxMenu("disable", C.id, true)
                        }
                    }
                }
                if (z != null && s != null) {
                    if (!q.groupable || !n.groupable) {
                        q.gridmenu.jqxMenu("disable", s.id, true);
                        q.gridmenu.jqxMenu("disable", z.id, true)
                    } else {
                        if (q.groups && q.groups.indexOf(n.datafield) != -1) {
                            q.gridmenu.jqxMenu("disable", z.id, true);
                            q.gridmenu.jqxMenu("disable", s.id, false)
                        } else {
                            q.gridmenu.jqxMenu("disable", z.id, false);
                            q.gridmenu.jqxMenu("disable", s.id, true)
                        }
                    }
                }
                if (D != null) {
                    q._updatefilterpanel(q, D, n);
                    var t = 0;
                    if (q.sortable && q._togglesort) {
                        t += 3
                    }
                    if (q.groupable && q.addgroup) {
                        t += 2
                    }
                    var B = t * 27 + 3;
                    if (q.filterable) {
                        if (!n.filterable) {
                            q.gridmenu.height(B);
                            b(q.filteritem).css("display", "none")
                        } else {
                            q.gridmenu.height(B + 176);
                            b(q.filteritem).css("display", "block")
                        }
                    }
                }
                b.data(document.body, "contextmenu" + q.element.id, {
                    column: n,
                    columnsmenu: h[0]
                })
            };
            q.addHandler(g, "click", function (r) {
                if (!n.menu) {
                    return false
                }
                p();
                o();
                return false
            });
            q.addHandler(h, "click", function (r) {
                if (!n.menu) {
                    return false
                }
                o();
                return false
            })
        },
        _rendercolumnheader: function (e, f) {
            if (f == "center") {
                return b('<div style="text-align: center; margin-top: 5px;"><a href="#">' + e + "</a></div>")
            }
            var d = b('<a style="float: ' + f + ';" href="#">' + e + "</a>");
            return d
        },
        _renderrows: function (d) {
            var e = this;
            if ((this.pageable || this.groupable) && this.autoheight) {
                if (this.table != null && this.table[0].rows != null && this.table[0].rows.length != this.dataview.rows.length) {
                    e.prerenderrequired = true
                }
            }
            if (!this.pageable && this.autoheight && (this.virtualmode || this.unboundmode)) {
                var g = this.source.totalrecords;
                if (!isNaN(g)) {
                    if (this.table != null && this.table[0].rows != null && this.table[0].rows.length != g) {
                        e.prerenderrequired = true
                    }
                }
            }
            e._prerenderrows(d);
            if (e._requiresupdate) {
                e._requiresupdate = false;
                e._updatepageviews()
            }
            if (this.virtualmode) {
                var f = function () {
                    if (e.rendergridrows) {
                        var n = e._startboundindex;
                        if (n == undefined) {
                            n = 0
                        }
                        var k = n + 1 + e.dataview.pagesize;
                        if (n != null && k != null) {
                            var l = e.source._source ? true : false;
                            var o = !l ? e.source.recordstartindex : e.source._source.recordstartindex;
                            if (o != n) {
                                if (!l) {
                                    e.source.recordstartindex = n;
                                    e.source.recordendindex = k
                                } else {
                                    e.source._source.recordstartindex = n;
                                    e.source._source.recordendindex = k
                                }
                                e.updatebounddata()
                            }
                        }
                    }
                };
                if (this.loadondemand) {
                    f();
                    this.loadondemand = false
                }
                e._rendervisualrows()
            } else {
                if (navigator && navigator.userAgent.indexOf("Chrome") == -1 && navigator.userAgent.indexOf("Safari") != -1) {
                    this.updatedelay = 1
                }
                if (b.browser.mozilla && this.updatedelay == 0 && this.vScrollInstance.isScrolling()) {
                    h = setTimeout(function () {
                        e._rendervisualrows()
                    }, 0.01);
                    return
                }
                if (this.updatedelay == 0) {
                    e._rendervisualrows()
                } else {
                    var h = b.data(document.body, "Grid" + this.element.id);
                    if (h != null) {
                        clearTimeout(h)
                    }
                    if (this.vScrollInstance.isScrolling() || this.hScrollInstance.isScrolling()) {
                        h = setTimeout(function () {
                            e._rendervisualrows()
                        }, this.updatedelay);
                        b.data(document.body, "Grid" + this.element.id, h)
                    } else {
                        b.data(document.body, "Grid" + this.element.id, null);
                        e._rendervisualrows()
                    }
                }
            }
        },
        _renderhorizontalscroll: function () {
            var k = this.hScrollInstance;
            var n = k.value;
            var f = parseInt(n);
            if (this.table == null) {
                return
            }
            var r = this.table[0].rows.length;
            var q = this.columnsrow;
            var l = this.groupable && this.groups.length > 0 ? this.groups.length : 0;
            var p = this.columns.records.length - l;
            var h = this.columns.records;
            for (i = 0; i < r; i++) {
                var d = this.table[0].rows[i];
                for (j = 0; j < l + p; j++) {
                    var e = d.cells[j];
                    if (e != undefined) {
                        var g = h[j];
                        if (!g.pinned) {
                            e.style.marginLeft = -f + "px";
                            if (i == 0) {
                                var o = q[0].cells[j];
                                o.style.marginLeft = -f + "px"
                            }
                        }
                    }
                }
            }
            if (this.editcell && !this.editrow) {
                if (this._showcelleditor && this.editcell.editing) {
                    this._showcelleditor(this.editcell.row, this.getcolumn(this.editcell.column), this.editcell.element, this.editcell.init)
                }
            }
        },
        _updaterowdetailsvisibility: function () {
            if (this.rowdetails) {
                for (i = 0; i < this._rowdetailselementscache.length; i++) {
                    b(this._rowdetailselementscache[i]).css("display", "none")
                }
            }
        },
        _getvisualcolumnsindexes: function (e, n, h, l, d) {
            if (this.rowdetails) {
                return {
                    start: 0,
                    end: h + l
                }
            }
            var f = 0;
            var k = -1;
            var g = h + l;
            var o = false;
            if (!d) {
                for (j = 0; j < h + l; j++) {
                    var p = j;
                    if (!o) {
                        if (this.columns.records[j].pinned) {
                            o = true
                        }
                    }
                    if (!this.columns.records[j].hidden) {
                        f += this.columns.records[j].width
                    }
                    if (f >= e && k == -1) {
                        k = j
                    }
                    if (f > n + e) {
                        g = j;
                        break
                    }
                }
            }
            g++;
            if (g > h + l) {
                g = h + l
            }
            if (k == -1 || o) {
                k = 0
            }
            return {
                start: k,
                end: g
            }
        },
        _rendervisualrows: function () {
            var O = this.vScrollInstance;
            var o = this.hScrollInstance;
            var f = O.value;
            var y = o.value;
            var n = parseInt(f);
            var h = parseInt(y);
            var v = this._gettableheight();
            var E = this.host.width();
            var z = this.groupable && this.groups.length > 0;
            this.visiblerows = new Array();
            this.hittestinfo = new Array();
            if (this.editcell && this.editrow == undefined) {
                this._hidecelleditor()
            }
            if (this.virtualmode && !this.pageable) {
                this._pagescache = new Array()
            }
            if (this._pagescache.length == 0) {
                this.dataview.updateview();
                this._loadrows()
            }
            if (this.vScrollBar.css("visibility") != "visible") {
                n = 0
            }
            if (!this.pageable) {
                var G = this._findvisiblerow(n, this._pageviews);
                if (G == -1) {
                    this._clearvisualrows();
                    return
                }
                if (G != this.dataview.pagenum) {
                    this.dataview.pagenum = G;
                    this.dataview.updateview();
                    this._loadrows()
                } else {
                    if (!this._pagescache[this.dataview.pagenum]) {
                        this._loadrows()
                    }
                }
            }
            var X = this.groupable && this.groups.length > 0 ? this.groups.length : 0;
            var q = this.columns.records.length - X;
            var R = this._findvisiblerow(n, this._pagescache[this.dataview.pagenum]);
            var H = this._pagescache[this.dataview.pagenum];
            var L = R;
            if (L < 0) {
                L = 0
            }
            var T = 0;
            var Q = 0;
            var K = 0;
            var e = 0;
            var M = this.virtualsizeinfo.visiblerecords;
            var J = this.groupable ? this.groups.length : 0;
            var w = this.toTP("jqx-grid-cell");
            if (z) {
                w = " " + this.toTP("jqx-grid-group-cell")
            }
            if (this.isTouchDevice()) {
                w += " " + this.toTP("jqx-touch")
            }
            var I = this.rowsheight;
            var C = L;
            var W = this._rendercell;
            var r = true;
            var p = this._getvisualcolumnsindexes(h, E, X, q, z);
            var d = p.start;
            var P = p.end;
            if (L >= 0) {
                this._updaterowdetailsvisibility();
                this._startboundindex = H != null ? H[L].bounddata.boundindex : 0;
                for (var l = 0; l < M && Q < M; l++) {
                    var S = H != undefined ? H[L + l] : null;
                    if (S == null) {
                        L = -l;
                        if (this._pagescache[this.dataview.pagenum + 1]) {
                            H = this._pagescache[this.dataview.pagenum + 1];
                            this.dataview.pagenum++
                        } else {
                            var s = this._pageviews.length;
                            do {
                                if (this.dataview.pagenum < this._pageviews.length - 1) {
                                    this.dataview.pagenum++;
                                    H = undefined;
                                    if (this._pageviews[this.dataview.pagenum].height > 0) {
                                        this.dataview.updateview();
                                        this._loadrows();
                                        H = this._pagescache[this.dataview.pagenum]
                                    }
                                } else {
                                    H = undefined;
                                    break
                                }
                            } while (H == undefined && this.dataview.pagenum < s)
                        }
                        if (H != undefined) {
                            S = H[L + l]
                        }
                    }
                    if (S != null) {
                        if (S.hidden) {
                            continue
                        }
                        if (l == 0) {
                            var k = Math.abs(n - S.top);
                            this.table[0].style.top = -k + "px";
                            e = -k
                        }
                        var g = this.table[0].rows[Q];
                        var D = b(g);
                        if (!g) {
                            continue
                        }
                        if (parseInt(g.style.height) != S.height) {
                            D.height(S.height)
                        }
                        K += S.height;
                        var N = this.rowdetails && S.rowdetails;
                        var u = !S.rowdetailshidden;
                        if (N && u) {
                            D.height(S.height - S.rowdetailsheight);
                            M++
                        }
                        var F = this._isrowselected(r, S);
                        for (cindex = d; cindex < P; cindex++) {
                            var U = cindex;
                            this._rendervisualcell(W, w, F, N, u, z, J, g, S, U, Q)
                        }
                        if (S.group != undefined && this._rendergroup) {
                            this._rendergroup(J, g, S, X, q, Q)
                        }
                        this.visiblerows[this.visiblerows.length] = S;
                        this.hittestinfo[this.hittestinfo.length] = {
                            row: S,
                            visualrow: g,
                            details: false
                        };
                        if (N && u) {
                            Q++;
                            var g = this.table[0].rows[Q];
                            this._renderrowdetails(w, g, S, X, q, Q);
                            this.visiblerows[this.visiblerows.length] = S;
                            this.hittestinfo[this.hittestinfo.length] = {
                                row: S,
                                visualrow: g,
                                details: true
                            }
                        }
                        if (K + e >= v) {
                            break
                        }
                    } else {
                        cansetheight = true;
                        this._clearvisualrow(h, z, Q, X, q);
                        if (K + T + parseInt(this.table.css("top")) <= v) {
                            T += I
                        }
                    }
                    Q++
                }
                this._horizontalvalue = h;
                if (T > 0) {
                    if (this.vScrollBar.css("visibility") == "visible") {
                        var V = parseInt(this.table.css("top"));
                        var B = this._pageviews[this._pageviews.length - 1];
                        var t = O.max;
                        var A = B.top + B.height - v;
                        if (this.hScrollBar.css("visibility") == "visible") {
                            A += 6
                        }
                        if (t != A) {
                            O.max = A;
                            O.setPosition(O.max)
                        }
                    }
                }
            }
        },
        _clearvisualrows: function () {
            var e = this.virtualsizeinfo.visiblerecords;
            var f = this.hScrollInstance;
            var d = f.value;
            var g = parseInt(d);
            var h = this.groupable && this.groups.length > 0;
            for (renderindex = 0; renderindex < e; renderindex++) {
                this._clearvisualrow(g, h, renderindex, 0, this.columns.records.length)
            }
        },
        _isrowselected: function (f, e) {
            var d = false;
            if (f && e.bounddata != null) {
                if (this.selectionmode != "singlerow") {
                    if (this.selectedrowindexes.indexOf(e.bounddata.boundindex) != -1) {
                        d = true
                    }
                } else {
                    if (e.bounddata.boundindex == this.selectedrowindex) {
                        d = true
                    }
                }
            }
            return d
        },
        _rendervisualcell: function (A, k, q, n, t, y, l, r, d, h, s) {
            var f = null;
            var g = this.columns.records[h];
            cellvalue = this._getcellvalue(g, d);
            // by gustavohenrique
            if ("function" == typeof(cellvalue)) {
                cellvalue = cellvalue();
            }
            var e = r.cells[h];
            var w = k;
            if (g.cellclassname != "" && g.cellclassname) {
                w += " " + g.cellclassname
            }
            if (this.selectionmode.indexOf("cell") != -1) {
                if (this.selectedcells[d.boundindex + "_" + g.datafield]) {
                    q = true
                } else {
                    q = false
                }
            }
            var p = this.showsortcolumnbackground && this.sortcolumn && g.datafield == this.sortcolumn;
            if (p) {
                w += " " + this.toTP("jqx-grid-cell-sort")
            }
            if (g.filter && this.showfiltercolumnbackground) {
                w += " " + this.toTP("jqx-grid-cell-filter")
            }
            if (g.pinned && this.showpinnedcolumnbackground) {
                w += " " + this.toTP("jqx-grid-cell-pinned")
            }
            if (this.altrows && d.group == undefined) {
                var z = d.visibleindex;
                if (z >= this.altstart) {
                    if ((this.altstart + z) % (1 + this.altstep) == 0) {
                        if (!p) {
                            w += " " + this.toTP("jqx-grid-cell-alt")
                        } else {
                            w += " " + this.toTP("jqx-grid-cell-sort-alt")
                        }
                        if (g.filter && this.showfiltercolumnbackground) {
                            w += " " + this.toTP("jqx-grid-cell-filter-alt")
                        }
                        if (g.pinned && this.showpinnedcolumnbackground) {
                            w += " " + this.toTP("jqx-grid-cell-pinned-alt")
                        }
                    }
                }
            }
            if (h <= l) {
                if (y || this.rowdetails) {
                    var u = b(e);
                    var o = this.columns.records[h].width;
                    if (parseInt(e.style.width) != o) {
                        u.width(o)
                    }
                }
            }
            var v = true;
            if (this.rowdetails && n) {
                if (t && !y) {
                    w += " " + this.toTP("jqx-grid-details-cell")
                } else {
                    if (y) {
                        w += " " + this.toTP("jqx-grid-group-details-cell")
                    }
                }
                if (this.showrowdetailscolumn) {
                    if (d.group == undefined && h == l) {
                        if (t) {
                            w += " " + this.toTP("jqx-grid-group-expand")
                        } else {
                            w += " " + this.toTP("jqx-grid-group-collapse")
                        }
                        v = false
                    }
                }
            }
            if (q && v) {
                w += " " + this.toTP("jqx-grid-cell-selected");
                w += " " + this.toTP("jqx-fill-state-pressed")
            }
            if (e.className != w) {
                e.className = w
            }
            if (d.group != undefined) {
                cellvalue = "";
                e.title = "";
                e.innerHTML = "";
                return
            }
            A(this, g, d, cellvalue, e)
        },
        _rendercell: function (l, f, p, o, e) {
            var g = p.uniqueid + "_" + f.visibleindex;
            if (l.editcell && !l.editrow) {
                if (l.editcell.row == p.boundindex && l.editcell.column == f.datafield) {
                    l.editcell.element = e;
                    if (l.editcell.editing) {
                        if (l._showcelleditor) {
                            l._showcelleditor(l.editcell.row, f, l.editcell.element, l.editcell.init);
                            return
                        }
                    }
                }
            } else {
                if (l.editrow) {
                    if (l.editrow == p.boundindex) {
                        l.editcells[f.datafield].element = e;
                        if (l.editcells[f.datafield].editing) {
                            if (l._showcelleditor) {
                                l._showcelleditor(l.editcells[f.datafield].row, f, e, l.editcells[f.datafield].init);
                                return
                            }
                        }
                    }
                }
            }
            var k = l._cellscache[g];

            if (k) {
                // by gustavohenrique
                k.element = l._defaultcellsrenderer(o, f);
                k.title = o;

                if (f.columntype == "checkbox") {
                    if (l.host.jqxCheckBox) {
                        if (o == "") {
                            o = false
                        }
                        var h = e.innerHTML.toString().length == 0;
                        if (e.checkbox && !l.groupable && !h) {
                            e.checkboxrow = p.boundindex;
                            e.checkbox.jqxCheckBox({
                                checked: o
                            })
                        } else {
                            l._rendercheckboxcell(l, e, f, p, o)
                        }
                        return
                    }
                } else {
                    if (f.columntype == "button") {
                        if (l.host.jqxButton) {
                            if (o == "") {
                                o = false
                            }
                            if (f.cellsrenderer != null) {
                                o = f.cellsrenderer(p.boundindex, f.datafield, o, n, f.getcolumnproperties())
                            }
                            if (e.button && !l.groupable) {
                                e.buttonrow = p.boundindex;
                                e.button.val(o)
                            } else {
                                l._renderbuttoncell(l, e, f, p, o)
                            }
                            return
                        }
                    }
                }
                var d = k.element;
                if (e.innerHTML.toLowerCase() != d.toLowerCase()) {
                    e.innerHTML = d;
                    if (l.enabletooltips) {
                        e.title = k.title
                    }
                }
                return
            }
            if (l.enabletooltips) {
                if (f.cellsformat != "") {
                    if (b.jqx.dataFormat) {
                        if (b.jqx.dataFormat.isNumber(o)) {
                            o = b.jqx.dataFormat.formatnumber(o, f.cellsformat, l.gridlocalization)
                        } else {
                            if (b.jqx.dataFormat.isDate(o)) {
                                o = b.jqx.dataFormat.formatdate(o, f.cellsformat, l.gridlocalization)
                            }
                        }
                    }
                }
                e.title = o
            }
            if (f.columntype == "checkbox") {
                l._rendercheckboxcell(l, e, f, p, o);
                l._cellscache[g] = {
                    element: "",
                    title: o
                };
                return
            } else {
                if (f.columntype == "button") {
                    if (f.cellsrenderer != null) {
                        o = f.cellsrenderer(p.boundindex, f.datafield, o, n, f.getcolumnproperties())
                    }
                    l._renderbuttoncell(l, e, f, p, o);
                    l._cellscache[g] = {
                        element: "",
                        title: o
                    };
                    return
                } else {
                    if (f.columntype == "number") {
                        o = p.visibleindex
                    }
                }
            }
            var n = l._defaultcellsrenderer(o, f);
            var d = null;
            if (f.cellsrenderer != null) {
                d = f.cellsrenderer(p.boundindex, f.datafield, o, n, f.getcolumnproperties())
            } else {
                d = n
            }
            if (d == null) {
                d = n
            }
            l._cellscache[g] = {
                element: d,
                title: o
            };
            e.innerHTML = d;
            return true
        },
        _rendercheckboxcell: function (f, d, e, l, g) {
            if (f.host.jqxCheckBox) {
                var k = b(d);
                if (g == "") {
                    g = false
                }
                if (g == "1") {
                    g = true
                }
                if (g == "0") {
                    g = false
                }
                if (g == 1) {
                    g = true
                }
                if (g == 0) {
                    g = false
                }
                if (g == "true") {
                    g = true
                }
                if (g == "false") {
                    g = false
                }
                if (k.find(".jqx-checkbox").length == 0) {
                    d.innerHTML = '<div tabIndex=0 style="opacity: 0.99; position: absolute; top: 50%; left: 50%; margin-top: -7px; margin-left: -10px;"></div>';
                    b(d.firstChild).jqxCheckBox({
                        enableContainerClick: false,
                        animationShowDelay: 0,
                        animationHideDelay: 0,
                        locked: true,
                        theme: f.theme,
                        checked: g
                    });
                    if (this.editable && e.editable) {
                        b(d.firstChild).jqxCheckBox({
                            locked: false
                        })
                    }
                    d.checkbox = b(d.firstChild);
                    d.checkboxrow = l.boundindex;
                    var h = b.data(d.firstChild, "jqxCheckBox").instance;
                    h.updated = function (p, o) {
                        if (e.editable) {
                            var q = f.table[0].rows.length;
                            var r = f._getcolumnindex(e.datafield);
                            for (currentCheckbox = 0; currentCheckbox < q; currentCheckbox++) {
                                var n = f.table[0].rows[currentCheckbox].cells[r].firstChild;
                                b(n).jqxCheckBox("destroy")
                            }
                            if (f.editcell && f.editcell.validated == false) {
                                f.setcellvalue(d.checkboxrow, e.datafield, !o, true)
                            } else {
                                f._raiseEvent(17, {
                                    rowindex: d.checkboxrow,
                                    datafield: e.datafield,
                                    value: !o,
                                    columntype: e.columntype
                                });
                                f.setcellvalue(d.checkboxrow, e.datafield, o, true);
                                f._raiseEvent(18, {
                                    rowindex: d.checkboxrow,
                                    datafield: e.datafield,
                                    oldvalue: !o,
                                    value: o,
                                    columntype: e.columntype
                                })
                            }
                        }
                    }
                } else {
                    d.checkboxrow = l.boundindex;
                    b(d.firstChild).jqxCheckBox({
                        checked: g
                    })
                }
            }
        },
        _renderbuttoncell: function (f, d, e, k, g) {
            if (f.host.jqxButton) {
                var h = b(d);
                if (g == "") {
                    g = false
                }
                if (h.find(".jqx-button").length == 0) {
                    d.innerHTML = '<input type="button" style="opacity: 0.99; position: absolute; top: 0%; left: 0%; padding: 0px; margin-top: 2px; margin-left: 2px;"/>';
                    b(d.firstChild).val(g);
                    b(d.firstChild).attr("hideFocus", "true");
                    b(d.firstChild).jqxButton({
                        theme: f.theme,
                        height: f.rowsheight - 4,
                        width: e.width - 4
                    });
                    d.button = b(d.firstChild);
                    d.buttonrow = k.boundindex;
                    b(d.firstChild).bind("click", function (l) {
                        if (e.buttonclick) {
                            e.buttonclick(d.buttonrow, l)
                        }
                    })
                } else {
                    d.buttonrow = k.boundindex;
                    b(d.firstChild).val(g)
                }
            }
        },
        _clearvisualrow: function (f, e, p, h, o) {
            var n = this.toTP("jqx-grid-cell");
            if (e) {
                n = " " + this.toTP("jqx-grid-group-cell")
            }
            for (var k = 0; k < h + o; k++) {
                if (this.table[0].rows[p]) {
                    var g = this.table[0].rows[p].cells[k];
                    g.className = n;
                    var d = this.columns.records[k];
                    if (this._horizontalvalue != f && !d.pinned) {
                        b(g).css("margin-left", -f)
                    }
                    var l = d.width;
                    if (l < d.minwidth) {
                        l = d.minwidth
                    }
                    if (l > d.maxwidth) {
                        l = d.maxwidth
                    }
                    if (parseInt(g.style.width) != l) {
                        b(g).width(l)
                    }
                    g.title = "";
                    g.innerHTML = "";
                    b(this.table[0].rows[p]).height(this.rowsheight)
                }
            }
        },
        _findgroupstate: function (e) {
            var d = this._findgroup(e);
            if (d == null) {
                return false
            }
            return d.expanded
        },
        _findgroup: function (e) {
            var d = null;
            if (this.expandedgroups[e]) {
                return this.expandedgroups[e]
            }
            return d
        },
        _clearcaches: function () {
            this._columnsbydatafield = new Array();
            this._pagescache = new Array();
            this._pageviews = new Array();
            this._cellscache = new Array();
            this.heights = new Array();
            this.hiddens = new Array();
            this.hiddenboundrows = new Array();
            this.heightboundrows = new Array();
            this.detailboundrows = new Array();
            this.details = new Array();
            this.expandedgroups = new Array();
            this._rowdetailscache = new Array();
            this._rowdetailselementscache = new Array();
            if (b.jqx.dataFormat) {
                b.jqx.dataFormat.cleardatescache()
            }
            this.tableheight = null
        },
        _getColumnText: function (d) {
            if (this._columnsbydatafield == undefined) {
                this._columnsbydatafield = new Array()
            }
            if (this._columnsbydatafield[d]) {
                return this._columnsbydatafield[d]
            }
            var e = d;
            b.each(this.columns.records, function () {
                if (this.datafield == d) {
                    e = this.text;
                    return false
                }
            });
            this._columnsbydatafield[d] = e;
            return e
        },
        isscrollingvertically: function () {
            var d = (this.vScrollBar.jqxScrollBar("isScrolling"));
            return d
        },
        _renderrowdetails: function (q, w, d, v, o, z) {
            var B = b(w);
            var g = 0;
            var s = this.rowdetails && this.showrowdetailscolumn ? (1 + this.groups.length) * this.groupindentwidth : (this.groups.length) * this.groupindentwidth;
            if (this.groupable && this.groups.length > 0) {
                for (var r = 0; r <= o; r++) {
                    var e = b(w.cells[r]);
                    e[0].innerHTML = "";
                    e[0].className = "jqx-grid-details-cell"
                }
            }
            var e = b(w.cells[g]);
            e.css("width", "100%");
            B.height(d.rowdetailsheight);
            e[0].className = q;
            var p = d.bounddata.boundindex;
            var l = p + "_";
            if (this._rowdetailscache[l]) {
                var t = this._rowdetailscache[l];
                var A = t.html;
                if (this.initrowdetails) {
                    if (this._rowdetailscache[l].element) {
                        var f = this._rowdetailscache[l].element;
                        var k = e.offset();
                        var y = this.gridcontent.offset();
                        var u = parseInt(k.top) - parseInt(y.top);
                        var n = parseInt(k.left) - parseInt(y.left);
                        b(f).css("top", u);
                        b(f).css("left", n);
                        b(f).css("display", "block")
                    }
                } else {
                    e[0].innerHTML = A
                }
                return
            }
            e[0].innerHTML = "";
            if (!this.enablerowdetailsindent) {
                s = 0
            }
            var h = '<div style="overflow: hidden; width: 100%; height: 100%; margin-left: ' + s + 'px;">' + d.rowdetails + "</div>";
            this._rowdetailscache[l] = {
                id: w.id,
                html: h
            };
            if (this.initrowdetails) {
                var f = b(h)[0];
                b(this.gridcontent).prepend(b(f));
                b(f).css("position", "absolute");
                b(f).width(this.host.width() - s);
                b(f).height(e.height());
                var k = e.offset();
                b(f).css("z-index", 2000);
                if (this.isTouchDevice()) {
                    b(f).css("z-index", 99999)
                }
                var k = e.offset();
                var y = this.gridcontent.offset();
                var u = parseInt(k.top) - parseInt(y.top);
                var n = parseInt(k.left) - parseInt(y.left);
                b(f).css("top", u);
                b(f).css("left", n);
                this.content[0].scrollTop = 0;
                this.content[0].scrollLeft = 0;
                this.initrowdetails(p, f, this.element);
                this._rowdetailscache[l].element = f;
                this._rowdetailselementscache[p] = f
            } else {
                e[0].innerHTML = h
            }
        },
        _defaultcellsrenderer: function (e, d) {
            // by gustavohenrique
            if ("function" == typeof(e)) {
                e = e();
            }
            if (e.hasOwnProperty("name")) {
                e = e.name;
            }

            if (d.cellsformat != "") {
                if (!this.enabletooltips) {
                    if (b.jqx.dataFormat) {
                        if (b.jqx.dataFormat.isDate(e)) {
                            e = b.jqx.dataFormat.formatdate(e, d.cellsformat, this.gridlocalization)
                        } else {
                            if (b.jqx.dataFormat.isNumber(e)) {
                                e = b.jqx.dataFormat.formatnumber(e, d.cellsformat, this.gridlocalization)
                            }
                        }
                    }
                }
            }
            if (d.cellsalign == "center") {
                return '<div style="text-align: center; margin-top: 5px;">' + e + "</div>"
            }
            return '<span style="margin: 4px; float: ' + d.cellsalign + ';">' + e + "</span>"
        },
        _getcellvalue: function (d, f) {
            var e = null;
            e = f.bounddata[d.datafield];
            if (e == null) {
                e = ""
            }
            return e
        },
        getcell: function (h, d) {
            if (h == null || d == null) {
                return null
            }
            var e = parseInt(h);
            var g = h;
            var f = "";
            if (!isNaN(e)) {
                g = this.getrowdata(e)
            }
            if (g != null) {
                f = g[d]
            }
            return this._getcellresult(f, h, d)
        },
        getrenderedcell: function (h, d) {
            if (h == null || d == null) {
                return null
            }
            var e = parseInt(h);
            var g = h;
            var f = "";
            if (!isNaN(e)) {
                g = this.getrenderedrowdata(e)
            }
            if (g != null) {
                f = g[d]
            }
            return this._getcellresult(f, h, d)
        },
        _getcellresult: function (n, q, e) {
            var f = this.getcolumn(e);
            if (f == null || f == undefined) {
                return null
            }
            var k = f.getcolumnproperties();
            var g = k.hidden;
            var d = k.width;
            var p = k.pinned;
            var h = k.cellsalign;
            var l = k.cellsformat;
            var o = this.getrowheight(q);
            if (o == false) {
                return null
            }
            return {
                value: n,
                row: q,
                column: e,
                width: d,
                height: o,
                hidden: g,
                pinned: p,
                align: h,
                format: l
            }
        },
        setcellvalue: function (v, k, t, r) {
            if (v == null || k == null) {
                return false
            }
            var u = parseInt(v);
            var f = u;
            var q = v;
            if (!isNaN(u)) {
                q = this.getrowdata(u)
            }
            var h = false;
            if (this.filterable && this._initfilterpanel && this.dataview.filters.length) {
                h = true
            }
            if (this.virtualmode) {
                this._pagescache = new Array()
            }
            var n = "";
            if (q != null && q[k] != t) {
                n = q[k];
                q[k] = t;
                var l = this.getrenderedrowdata(u, true);
                l[k] = t;
                if (h) {
                    f = q.dataindex;
                    this.dataview.cachedrecords[q.dataindex][k] = t
                }
            } else {
                this._renderrows(this.virtualsizeinfo);
                return false
            }
            if (this.sortcolumn && this.dataview.sortby) {
                var d = this.getsortinformation();
                this.dataview.clearsortdata();
                this.dataview.sortby(d.sortcolumn, d.sortdirection.ascending)
            }
            this._cellscache = new Array();
            if (this.source.updaterow) {
                this.source.updaterow(f, q)
            }
            var e = this.getrowid(v);
            var p = this.vScrollInstance.value;
            if (r == true || r == undefined) {
                var s = this;
                var o = function () {
                    if (s.pageable && s.updatepagerdetails) {
                        s.updatepagerdetails();
                        if (s.autoheight) {
                            s._updatepageviews()
                        }
                    }
                };
                if (h) {
                    this.dataview.refresh();
                    this.rendergridcontent(true, true);
                    o()
                } else {
                    if (this.sortcolumn) {
                        this.dataview.reloaddata();
                        this.rendergridcontent(true, true);
                        o()
                    } else {
                        if (this.groupable && this.groups.length > 0) {
                            this.dataview.reloaddata();
                            this.render();
                            var q = this.getrowdata(v);
                            var l = this.getrenderedrowdata(u, true);
                            var g = l.parentItem;
                            this._setgroupstate(g, true, true)
                        } else {
                            this.dataview.updateview();
                            this._renderrows(this.virtualsizeinfo)
                        }
                    }
                }
            }
            this.vScrollInstance.setPosition(p);
            this._raiseEvent(19, {
                rowindex: v,
                datafield: k,
                newvalue: t,
                oldvalue: n
            });
            return true
        },
        getcellvalue: function (h, d) {
            if (h == null || d == null) {
                return null
            }
            var e = parseInt(h);
            var g = h;
            if (!isNaN(e)) {
                g = this.getrowdata(e)
            }
            if (g != null) {
                var f = g[d];
                return f
            }
            return null
        },
        getrows: function () {
            var f = this.dataview.records.length;
            if (this.dataview.sortdata) {
                var g = new Array();
                for (var d = 0; d < f; d++) {
                    var e = {};
                    e = b.extend({}, this.dataview.sortdata[d].value);
                    g[d] = e
                }
                return g
            } else {
                return this.dataview.records
            }
        },
        getrowdata: function (d) {
            if (d == undefined) {
                d = 0
            }
            if (this.virtualmode) {
                var e = this.dataview.records[d];
                return e
            } else {
                if (d >= 0 && d < this.dataview.bounditems.length) {
                    var e = this.dataview.records[d];
                    return e
                }
            }
            return null
        },
        getrenderedrowdata: function (d, f) {
            if (d == undefined) {
                d = 0
            }
            if (this.virtualmode) {
                var g = this.getrowvisibleindex(d);
                var e = this.dataview.loadedrecords[g];
                return e
            }
            if (d >= 0 && d < this.dataview.bounditems.length) {
                if (this.groupable && this.groups.length > 0) {
                    var g = this.getrowvisibleindex(d);
                    var e = this.dataview.loadedrecords[g]
                } else {
                    var e = this.dataview.loadedrecords[d];
                    if (this.pageable && (f == undefined || f == false)) {
                        var e = this.dataview.loadedrecords[this.dataview.pagesize * this.dataview.pagenum + d]
                    }
                }
                return e
            }
            return null
        },
        getrowid: function (d) {
            if (d == undefined) {
                d = 0
            }
            if (d >= 0 && d < this.dataview.bounditems.length) {
                var e = this.dataview.bounditems[d].uid;
                return e
            }
            return null
        },
        updaterow: function (e, h, d) {
            if (e != undefined && h != undefined) {
                var f = this.dataview.updaterow(e, h);
                var g = this.vScrollInstance.value;
                if (d == undefined || d == true) {
                    this._datachanged = true;
                    if (this._updating == undefined || this._updating == false) {
                        this._updateGridData()
                    }
                }
                if (this.source.updaterow) {
                    this.source.updaterow(e, h)
                }
                this.vScrollInstance.setPosition(g);
                return f
            }
            return false
        },
        _updateGridData: function () {
            var d = false;
            if (this.filterable && this._initfilterpanel && this.dataview.filters.length) {
                d = true
            }
            if (d) {
                this.dataview.refresh();
                this.render()
            } else {
                if (this.sortcolumn || (this.groupable && this.groups.length > 0)) {
                    this.dataview.reloaddata();
                    this.render()
                } else {
                    this._cellscache = new Array();
                    this._pagescache = new Array();
                    this._renderrows(this.virtualsizeinfo)
                }
            }
        },
        deleterow: function (d) {
            if (d != undefined) {
                this._datachanged = true;
                var f = this.vScrollInstance.value;
                var e = this.dataview.deleterow(d);
                if (this._updating == undefined || this._updating == false) {
                    this._render(true, true, false)
                }
                if (this.source.deleterow) {
                    this.source.deleterow(d)
                }
                this.vScrollInstance.setPosition(f);
                return e
            }
            return false
        },
        addrow: function (e, h, d) {
            if (h != undefined) {
                this._datachanged = true;
                if (d == undefined) {
                    d = "last"
                }
                var g = this.vScrollInstance.value;
                var f = this.dataview.addrow(e, h, d);
                if (this._updating == undefined || this._updating == false) {
                    this._render(true, true, false)
                }
                if (this.source.addrow) {
                    this.source.addrow(h.uid, h, d)
                }
                this.vScrollInstance.setPosition(g);
                return f
            }
            return false
        },
        _findvisiblerow: function (g, h) {
            if (g == undefined) {
                g = parseInt(this.vScrollInstance.value)
            }
            var e = 0;
            if (h == undefined || h == null) {
                h = this.rows.records
            }
            var d = h.length;
            while (e <= d) {
                mid = parseInt((e + d) / 2);
                var f = h[mid];
                if (f == undefined) {
                    break
                }
                if (f.top > g && f.top + f.height > g) {
                    d = mid - 1
                } else {
                    if (f.top < g && f.top + f.height < g) {
                        e = mid + 1
                    } else {
                        return mid;
                        break
                    }
                }
            }
            return -1
        },
        _updatecellwidths: function () {
            var f = this.virtualsizeinfo;
            var o = this;
            if (this.gridcontent == undefined) {
                return
            }
            this.table = this.gridcontent.find("#contenttable" + this.element.id);
            var k = this.groupable && this.groups.length > 0;
            var p = 0;
            var l = f.visiblerecords;
            if (this.pageable && this.autoheight) {
                l = this.dataview.pagesize;
                if (this.groupable) {
                    this.dataview.updateview();
                    l = this.dataview.rows.length
                }
            }
            if (!this.pageable && this.autoheight) {
                l = this.dataview.totalrecords
            }
            if (this.rowdetails) {
                l += this.dataview.pagesize
            }
            var q = this.columns.records.length;
            for (i = 0; i < l; i++) {
                var d = this.table[0].rows[i];
                if (!d) {
                    break
                }
                var r = d.cells;
                var h = 0;
                for (j = 0; j < q; j++) {
                    var g = this.columns.records[j];
                    var e = g.width;
                    var n = b(r[j]);
                    n.css("left", h);
                    n.width(e);
                    n[0].left = h;
                    if (!(g.hidden && g.hideable)) {
                        h += e
                    } else {
                        n.css("display", "none")
                    }
                }
                if (p == 0) {
                    this.table.width(parseInt(h) + 2);
                    p = h
                }
            }
            this._updatescrollbarsafterrowsprerender()
        },
        _updatescrollbarsafterrowsprerender: function () {
            var d = this.hScrollBar.css("visibility");
            var f = 0;
            if (this.vScrollBar.css("visibility") == "visible") {
                f = this.scrollbarsize + 3
            }
            if (this.table.width() - 2 > this.host.width() - f) {
                if (d != "visible") {
                    this.hScrollBar.css("visibility", "visible");
                    this._arrange()
                }
                if (this.vScrollBar.css("visibility") == "visible") {
                    var e = this.vScrollBar.jqxScrollBar("max");
                    this.vScrollBar.jqxScrollBar("max", e + this.scrollbarsize + 4)
                }
                this.hScrollBar.jqxScrollBar("max", f + this.table.width() - this.host.width())
            } else {
                if (d != "hidden") {
                    this.hScrollBar.css("visibility", "hidden");
                    this._arrange()
                }
            }
            this._renderhorizontalscroll()
        },
        _prerenderrows: function (f) {
            var q = this;
            if (this.prerenderrequired == true) {
                this.prerenderrequired = false;
                if (this.editable && this._destroyeditors) {
                    this._destroyeditors()
                }
                if (this.gridcontent == undefined) {
                    return
                }
                this.gridcontent.find("#contenttable" + this.element.id).remove();
                if (this.table != null) {
                    this.table.remove();
                    this.table = null
                }
                this.table = b('<div id="contenttable' + this.element.id + '" style="overflow: hidden; position: relative;" height="100%"></div>');
                this.gridcontent.addClass(this.toTP("jqx-grid-content"));
                this.gridcontent.addClass(this.toTP("jqx-widget-content"));
                this.gridcontent.append(this.table);
                var k = this.groupable && this.groups.length > 0;
                var r = 0;
                this.table[0].rows = new Array();
                var p = this.toTP("jqx-grid-cell");
                if (k) {
                    p = " " + this.toTP("jqx-grid-group-cell")
                }
                var n = f.visiblerecords;
                if (this.pageable && this.autoheight) {
                    n = this.dataview.pagesize;
                    if (this.groupable) {
                        this.dataview.updateview();
                        n = this.dataview.rows.length
                    }
                }
                if (!this.pageable && this.autoheight) {
                    n = this.dataview.totalrecords
                }
                if (this.groupable && this.autoheight && !this.pageable) {
                    n = this.dataview.rows.length
                }
                if (this.rowdetails) {
                    n += this.dataview.pagesize
                }
                var s = this.columns.records.length;
                if (b.browser.msie && b.browser.version > 8) {
                    this.table.css("opacity", "0.99")
                }
                if (b.browser.mozilla) {
                    this.table.css("opacity", "0.99")
                }
                var l = b.browser.msie && b.browser.version < 8;
                if (l) {
                    this.host.attr("hideFocus", "true")
                }
                var t = this.tableZIndex;
                if (n * s > t) {
                    t = n * s
                }
                for (i = 0; i < n; i++) {
                    var d = b('<div style="position: relative;" id="row' + i + this.element.id + '"></div>');
                    var h = 0;
                    this.table[0].rows[i] = d[0];
                    this.table[0].rows[i].cells = new Array();
                    for (j = 0; j < s; j++) {
                        var g = this.columns.records[j];
                        var e = g.width;
                        if (e < g.minwidth) {
                            e = g.minwidth
                        }
                        if (e > g.maxwidth) {
                            e = g.maxwidth
                        }
                        var o = b('<div style="overflow: hidden; position: absolute; height: 100%;" class="' + p + '"></div>');
                        d.append(o);
                        o.css("left", h);
                        o.css("z-index", t--);
                        o.width(e);
                        o[0].left = h;
                        if (!(g.hidden && g.hideable)) {
                            h += e
                        } else {
                            o.css("display", "none")
                        }
                        this.table[0].rows[i].cells[j] = o[0]
                    }
                    if (l) {
                        d.css("z-index", t--)
                    }
                    if (r == 0) {
                        this.table.width(parseInt(h) + 2);
                        r = h
                    }
                    this.table.append(d);
                    d.height(this.rowsheight)
                }
                this._updatescrollbarsafterrowsprerender()
            }
        },
        _groupsheader: function () {
            return this.groupable && this.showgroupsheader
        },
        _arrange: function () {
            var v = null;
            var s = null;
            this.tableheight = null;
            var z = this;
            var n = false;
            var l = false;
            if (this.width != null && this.width.toString().indexOf("px") != -1) {
                v = this.width
            } else {
                if (this.width != undefined && !isNaN(this.width)) {
                    v = this.width
                }
            }
            if (this.width != null && this.width.toString().indexOf("%") != -1) {
                v = this.width;
                n = true
            }
            if (this.height != null && this.height.toString().indexOf("px") != -1) {
                s = this.height
            } else {
                if (this.height != undefined && !isNaN(this.height)) {
                    s = this.height
                }
            }
            if (this.height != null && this.height.toString().indexOf("%") != -1) {
                s = this.height;
                l = true
            }
            var k = function () {
                var A = 0;
                var B = z.showheader ? z.columnsheader != null ? z.columnsheader.height() + 2 : 0 : 0;
                A += B;
                if (z.pageable) {
                    A += z.pagerheight
                }
                if (z._groupsheader()) {
                    A += z.groupsheaderheight
                }
                if (z.showtoolbar) {
                    A += z.toolbarheight
                }
                if (z.showstatusbar) {
                    A += z.statusbarheight
                }
                if (z.hScrollBar.css("visibility") == "visible") {
                    A += 20
                }
                return A
            };
            if (this.autoheight && this.virtualsizeinfo) {
                if (this.pageable && this.gotopage) {
                    var w = this.host.height() - this._gettableheight();
                    s = w + (this._pageviews[0] ? this._pageviews[0].height : 0);
                    if (s == 0) {
                        s = k()
                    }
                } else {
                    var w = this.host.height() - this._gettableheight();
                    if (this._pageviews.length > 0) {
                        s = w + this._pageviews[this._pageviews.length - 1].height + this._pageviews[this._pageviews.length - 1].top;
                        this.vScrollBar.css("visibility", "hidden")
                    }
                }
            } else {
                if (this.autoheight) {
                    s = this.dataview.totalrecords * this.rowsheight;
                    if (this._loading) {
                        s = 250;
                        this.dataloadelement.height(s)
                    }
                    s += k();
                    if (s > 10000) {
                        s = 10000
                    }
                }
            }
            var e = this.host.css("border-width");
            if (e == null) {
                e = 0
            }
            if (v != null) {
                v = parseInt(v);
                this.host.width(this.width);
                if (n) {
                    v = this.host.width();
                    if (v <= 2) {
                        v = 600;
                        this.host.width(v)
                    }
                    if (!this._oldWidth) {
                        this._oldWidth = v
                    }
                }
            } else {
                this.host.width(250)
            }
            if (s != null) {
                if (!l) {
                    s = parseInt(s)
                }
                this.host.height(s);
                if (l && !this.autoheight) {
                    s = this.host.height();
                    if (s == 0) {
                        s = 400;
                        this.host.height(s)
                    }
                    if (!this._oldHeight) {
                        this._oldHeight = s
                    }
                }
            } else {
                this.host.height(250)
            }
            if (this.autoheight) {
                this.tableheight = null;
                this._gettableheight()
            }
            var r = 0;
            if (this.showtoolbar) {
                this.toolbar.width(v);
                this.toolbar.height(this.toolbarheight - 1);
                this.toolbar.css("top", 0);
                r += this.toolbarheight;
                s -= parseInt(this.toolbarheight)
            } else {
                this.toolbar.height(0)
            }
            if (this.showstatusbar) {
                this.statusbar.width(v);
                this.statusbar.height(this.statusbarheight - 1)
            } else {
                this.statusbar.height(0)
            }
            if (this._groupsheader()) {
                this.groupsheader.width(v);
                this.groupsheader.height(this.groupsheaderheight);
                this.groupsheader.css("top", r);
                var t = this.groupsheader.height() + 1;
                r += t;
                if (s > t) {
                    s -= parseInt(t)
                }
            } else {
                this.groupsheader.width(v);
                this.groupsheader.height(this.groupsheaderheight);
                this.groupsheader.css("top", r);
                this.content.css("top", r + this.groupsheader.height())
            }
            var d = this.scrollbarsize;
            if (isNaN(d)) {
                d = parseInt(d);
                if (isNaN(d)) {
                    d = "17px"
                } else {
                    d = d + "px"
                }
            }
            d = parseInt(d);
            var p = 4;
            var g = 2;
            var h = 0;
            if (this.vScrollBar.css("visibility") == "visible") {
                h = d + p
            }
            if (this.hScrollBar.css("visibility") == "visible") {
                g = d + p + 2
            }
            var q = 0;
            if (this.pageable) {
                q = this.pagerheight;
                g += this.pagerheight
            }
            if (this.showstatusbar) {
                g += this.statusbarheight;
                q += this.statusbarheight
            }
            this.hScrollBar.height(d);
            this.hScrollBar.css({
                top: r + s - p - d - q + "px",
                left: "0px"
            });
            this.hScrollBar.width(v - d - p + "px");
            if (h == 0) {
                this.hScrollBar.width(v - 2)
            }
            this.vScrollBar.width(d);
            this.vScrollBar.height(parseInt(s) - g + "px");
            this.vScrollBar.css({
                left: parseInt(v) - parseInt(d) - p + "px",
                top: r
            });
            var o = this.vScrollInstance;
            o.disabled = this.disabled;
            o.refresh();
            var u = this.hScrollInstance;
            u.disabled = this.disabled;
            u.refresh();
            if ((this.vScrollBar.css("visibility") == "visible") && (this.hScrollBar.css("visibility") == "visible")) {
                this.bottomRight.css("visibility", "visible");
                this.bottomRight.css({
                    left: 1 + parseInt(this.vScrollBar.css("left")),
                    top: parseInt(this.hScrollBar.css("top"))
                });
                this.bottomRight.width(parseInt(d) + 3);
                this.bottomRight.height(parseInt(d) + 4)
            } else {
                this.bottomRight.css("visibility", "hidden")
            }
            this.content.width(v - h);
            this.content.height(s - g + 2);
            this.content.css("top", r);
            if (this.showstatusbar) {
                this.statusbar.css("top", 1 + r + s - this.statusbarheight - (this.pageable ? this.pagerheight : 0))
            }
            if (this.pageable) {
                this.pager.width(v);
                this.pager.height(this.pagerheight);
                this.pager.css("top", r + s - this.pagerheight)
            } else {
                this.pager.height(0)
            }
            if (this.table != null) {
                var f = 0;
                if (this.vScrollBar.css("visibility") == "visible") {
                    f = this.scrollbarsize + 3
                }
                var y = f + this.table.width() - this.host.width();
                this.hScrollBar.jqxScrollBar("max", y);
                if (this.hScrollBar.css("visibility") == "visible" && y == 0) {
                    this.hScrollBar.css("visibility", "hidden");
                    this._arrange()
                }
            }
            this.dataloadelement.width(this.host.width());
            this.dataloadelement.height(this.host.height())
        },
        destroy: function () {
            if (this.host.jqxDropDownList) {
                var g = b(b.find("#filterclearbutton" + this.element.id));
                var f = b(b.find("#filterbutton" + this.element.id));
                var l = b(b.find("#filter1" + this.element.id));
                var e = b(b.find("#filter2" + this.element.id));
                var k = b(b.find("#filter3" + this.element.id));
                var h = b(b.find(".filtertext1" + this.element.id));
                var d = b(b.find(".filtertext2" + this.element.id));
                if (h.length > 0 && d.length > 0) {
                    h.removeClass();
                    d.removeClass();
                    h.remove();
                    d.remove()
                }
                this.removeHandler(g, "click");
                this.removeHandler(f, "click");
                l.jqxDropDownList("destroy");
                e.jqxDropDownList("destroy");
                k.jqxDropDownList("destroy")
            }
            if (this.host.jqxMenu) {
                if (this.gridmenu) {
                    this.removeHandler(b(document), "click.menu" + this.element.id);
                    this.removeHandler(this.gridmenu, "keydown");
                    this.removeHandler(this.gridmenu, "closed");
                    this.removeHandler(this.gridmenu, "itemclick");
                    this.gridmenu.jqxMenu("destroy");
                    this.gridmenu.remove()
                }
            }
            if (this.pagershowrowscombo) {
                this.pagershowrowscombo.jqxDropDownList("destroy")
            }
            if (this.pagerrightbutton) {
                this.removeHandler(this.pagerrightbutton, "mousedown");
                this.removeHandler(this.pagerrightbutton, "mouseup");
                this.removeHandler(this.pagerrightbutton, "click");
                this.pagerrightbutton.jqxButton("destroy")
            }
            if (this.pagerleftbutton) {
                this.removeHandler(this.pagerleftbutton, "mousedown");
                this.removeHandler(this.pagerleftbutton, "mouseup");
                this.removeHandler(this.pagerleftbutton, "click");
                this.pagerleftbutton.jqxButton("destroy")
            }
            this.removeHandler(b(document), "mousedown.resize" + this.element.id);
            this.removeHandler(b(document), "mouseup.resize" + this.element.id);
            this.removeHandler(b(document), "mousemove.resize" + this.element.id);
            this.columns = new b.jqx.collection(this.element);
            this.rows = new b.jqx.collection(this.element);
            this.hScrollInstance.destroy();
            this.vScrollInstance.destroy();
            this.hScrollBar.remove();
            this.vScrollBar.remove();
            this._removeHandlers();
            this._clearcaches();
            this.dataview._clearcaches();
            this.content.remove();
            this.host.remove()
        },
        _initializeColumns: function () {
            var g = this;
            var d = new b.jqx.collection(this.element);
            var f = 0;
            if (!this._columns) {
                this._columns = this.columns
            } else {
                this.columns = this._columns
            }
            if (this.groupable) {
                b.each(this.groups, function (h) {
                    var k = new c(g, this);
                    k.visibleindex = f++;
                    k.width = g.groupindentwidth;
                    d.add(k)
                })
            }
            if (this.rowdetails && this.showrowdetailscolumn) {
                var e = new c(g, this);
                e.visibleindex = f++;
                e.width = g.groupindentwidth;
                e.pinned = true;
                d.add(e)
            }
            b.each(this.columns, function (h) {
                var k = new c(g, this);
                k.visibleindex = f++;
                d.add(k)
            });
            this.columns = d
        },
        _initializeRows: function () {
            var d = new b.jqx.collection(this.element);
            this.rows = d
        },
        _raiseEvent: function (h, e) {
            if (e == undefined) {
                e = {
                    owner: null
                }
            }
            var f = this.events[h];
            args = e;
            args.owner = this;
            var g = new jQuery.Event(f);
            g.owner = this;
            g.args = args;
            var d = this.host.trigger(g);
            e = g.args;
            return d
        },
        wheel: function (f, e) {
            if (e.autoheight) {
                f.returnValue = true;
                return true
            }
            var g = 0;
            if (!f) {
                f = window.event
            }
            if (f.originalEvent && f.originalEvent.wheelDelta) {
                f.wheelDelta = f.originalEvent.wheelDelta
            }
            if (f.wheelDelta) {
                g = f.wheelDelta / 120
            } else {
                if (f.detail) {
                    g = -f.detail / 3
                }
            }
            if (g) {
                var d = e._handleDelta(g);
                if (d) {
                    if (f.preventDefault) {
                        f.preventDefault()
                    }
                    if (f.originalEvent != null) {
                        f.originalEvent.mouseHandled = true
                    }
                    if (f.stopPropagation != undefined) {
                        f.stopPropagation()
                    }
                }
                if (d) {
                    d = false;
                    f.returnValue = d;
                    return d
                } else {
                    return false
                }
            }
            if (f.preventDefault) {
                f.preventDefault()
            }
            f.returnValue = false
        },
        _handleDelta: function (f) {
            var e = this.vScrollInstance.value;
            if (f < 0) {
                this.scrollDown()
            } else {
                this.scrollUp()
            }
            var d = this.vScrollInstance.value;
            if (e != d) {
                return true
            }
            return false
        },
        scrollDown: function () {
            if (this.vScrollBar.css("visibility") == "hidden") {
                return
            }
            var d = this.vScrollInstance;
            if (d.value + this.rowsheight <= d.max) {
                d.setPosition(parseInt(d.value) + this.rowsheight)
            } else {
                d.setPosition(d.max)
            }
        },
        scrollUp: function () {
            if (this.vScrollBar.css("visibility") == "hidden") {
                return
            }
            var d = this.vScrollInstance;
            if (d.value - this.rowsheight >= d.min) {
                d.setPosition(parseInt(d.value) - this.rowsheight)
            } else {
                d.setPosition(d.min)
            }
        },
        _removeHandlers: function () {
            var d = this;
            this.removeHandler(this.vScrollBar, "valuechanged");
            this.removeHandler(this.hScrollBar, "valuechanged");
            var e = "mousedown";
            if (this.isTouchDevice()) {
                e = "touchend"
            }
            this.removeHandler(this.host, e);
            this.removeHandler(this.content, "mousemove");
            this.removeHandler(this.host, "mouseleave");
            this.removeHandler(this.content, "mouseenter");
            this.removeHandler(this.content, "mouseleave");
            this.removeHandler(this.content, "selectstart." + this.element.id);
            this.removeHandler(this.host, "dragstart." + this.element.id);
            this.removeHandler(this.host, "keydown.edit" + this.element.id);
            this.removeHandler(b(document), "keydown.edit" + this.element.id);
            this.removeHandler(b(document), "mousemove.selection" + this.element.id);
            this.removeHandler(b(document), "mouseup.selection" + this.element.id)
        },
        _addHandlers: function () {
            var e = this;
            this.addHandler(this.host, "dragstart." + this.element.id, function (h) {
                return false
            });
            var d = e.isTouchDevice();
            this.vScrollInstance.valuechanged = function (h) {
                e._closemenu();
                e._renderrows(e.virtualsizeinfo);
                if (!e.pageable && !e.groupable && e.dataview.virtualmode) {
                    if (e.loadondemandupdate) {
                        clearTimeout(e.loadondemandupdate)
                    }
                    e.loadondemandupdate = setTimeout(function () {
                        e.loadondemand = true;
                        e._renderrows(e.virtualsizeinfo)
                    }, 100)
                }
                if (d) {
                    e._lastScroll = new Date()
                }
            };
            this.hScrollInstance.valuechanged = function (h) {
                e._closemenu();
                if (navigator && navigator.userAgent.indexOf("Safari") != -1) {
                    setTimeout(function () {
                        e._renderhorizontalscroll();
                        e._renderrows(e.virtualsizeinfo);
                        if (e.editcell && !e.editrow) {
                            if (e._showcelleditor && e.editcell.editing) {
                                e._showcelleditor(e.editcell.row, e.getcolumn(e.editcell.column), e.editcell.element, e.editcell.init)
                            }
                        }
                    }, 1)
                } else {
                    e._renderhorizontalscroll();
                    e._renderrows(e.virtualsizeinfo);
                    if (e.editcell && !e.editrow) {
                        if (e._showcelleditor && e.editcell.editing) {
                            e._showcelleditor(e.editcell.row, e.getcolumn(e.editcell.column), e.editcell.element, e.editcell.init)
                        }
                    }
                }
                if (d) {
                    e._lastScroll = new Date()
                }
            };
            this._mousewheelfunc = this._mousewheelfunc ||
            function (h) {
                if (!e.editcell && e.enablemousewheel) {
                    e.wheel(h, e);
                    return false
                }
            };
            this.removeHandler(this.host, "mousewheel", this._mousewheelfunc);
            this.addHandler(this.host, "mousewheel", this._mousewheelfunc);
            var g = "mousedown";
            if (this.isTouchDevice()) {
                g = "touchend"
            }
            this.addHandler(this.host, g, function (k) {
                if (e.isTouchDevice()) {
                    e._newScroll = new Date();
                    if (e._newScroll - e._lastScroll < 500) {
                        return false
                    }
                    if (b(k.target).ischildof(e.vScrollBar)) {
                        return false
                    }
                    if (b(k.target).ischildof(e.hScrollBar)) {
                        return false
                    }
                }
                e._mousedown = new Date();
                var h = e._handlemousedown(k, e);
                if (e.isNestedGrid) {
                    k.stopPropagation()
                }
                e._lastmousedown = new Date();
                return h
            });
            this.addHandler(this.host, "dblclick", function (h) {
                if (e.editable && e.begincelledit && e.editmode == "dblclick") {
                    e._handledblclick(h, e)
                }
                e.mousecaptured = false;
                return true
            });
            this.addHandler(this.content, "mousemove", function (h) {
                if (e._handlemousemove) {
                    return e._handlemousemove(h, e)
                }
            });
            this.addHandler(b(document), "mousemove.selection" + this.element.id, function (h) {
                if (e._handlemousemoveselection) {
                    return e._handlemousemoveselection(h, e)
                }
            });
            this.addHandler(b(document), "mouseup.selection" + this.element.id, function (h) {
                if (e._handlemouseupselection) {
                    e._handlemouseupselection(h, e)
                }
            });
            if (window.frameElement) {
                if (window.top != null) {
                    var f = function (h) {
                        if (e._handlemouseupselection) {
                            e._handlemouseupselection(h, e)
                        }
                    };
                    if (window.top.document.addEventListener) {
                        window.top.document.addEventListener("mouseup", f, false)
                    } else {
                        if (window.top.document.attachEvent) {
                            window.top.document.attachEvent("onmouseup", f)
                        }
                    }
                }
            }
            this.focused = false;
            this.addHandler(this.content, "mouseenter", function (h) {
                e.focused = true
            });
            this.addHandler(this.content, "mouseleave", function (h) {
                if (e._handlemousemove) {
                    if (e.enablehover) {
                        e._clearhoverstyle()
                    }
                }
                e.focused = false
            });
            this.addHandler(this.content, "selectstart." + this.element.id, function (h) {
                if (!e.editcell) {
                    return false
                }
            });
            this.addHandler(b(document), "keydown.edit" + this.element.id, function (l) {
                var k = l.charCode ? l.charCode : l.keyCode ? l.keyCode : 0;
                if (e.editable && e.editcell) {
                    if (k == 13 || k == 27) {
                        if (e._handleeditkeydown) {
                            h = e._handleeditkeydown(l, e)
                        }
                    }
                }
                if (k == 27) {
                    e.mousecaptured = false;
                    if (e.selectionarea.css("visibility") == "visible") {
                        e.selectionarea.css("visibility", "hidden")
                    }
                }
                if (b.browser.msie && e.focused && !e.isNestedGrid) {
                    var h = true;
                    var k = l.charCode ? l.charCode : l.keyCode ? l.keyCode : 0;
                    if (!e.editcell && e.editable && e.editmode != "programmatic") {
                        if (e._handleeditkeydown) {
                            h = e._handleeditkeydown(l, e)
                        }
                    }
                    if (h && e.keyboardnavigation && e._handlekeydown) {
                        h = e._handlekeydown(l, e);
                        if (!h) {
                            if (l.preventDefault) {
                                l.preventDefault()
                            }
                            if (l.stopPropagation != undefined) {
                                l.stopPropagation()
                            }
                        }
                        return h
                    }
                }
                return true
            });
            this.addHandler(this.host, "keydown.edit" + this.element.id, function (k) {
                var h = true;
                if (e.editable && e.editmode != "programmatic") {
                    if (e._handleeditkeydown) {
                        h = e._handleeditkeydown(k, e)
                    }
                }
                if (!b.browser.msie) {
                    if (h && e.keyboardnavigation && e._handlekeydown) {
                        h = e._handlekeydown(k, e);
                        if (e.isNestedGrid) {
                            k.stopPropagation()
                        }
                    }
                } else {
                    if (e.isNestedGrid) {
                        if (h && e.keyboardnavigation && e._handlekeydown) {
                            h = e._handlekeydown(k, e);
                            k.stopPropagation()
                        }
                    }
                }
                if (!h) {
                    if (k.preventDefault) {
                        k.preventDefault()
                    }
                    if (k.stopPropagation != undefined) {
                        k.stopPropagation()
                    }
                }
                return h
            })
        },
        _hittestrow: function (u, s) {
            if (this.vScrollInstance == null || this.hScrollInstance == null) {
                return
            }
            if (u == undefined) {
                u = 0
            }
            if (s == undefined) {
                s == 0
            }
            var n = this.vScrollInstance;
            var l = this.hScrollInstance;
            var e = n.value;
            if (this.vScrollBar.css("visibility") != "visible") {
                e = 0
            }
            var o = l.value;
            if (this.hScrollBar.css("visibility") != "visible") {
                o = 0
            }
            var t = parseInt(e) + s;
            var k = parseInt(o) + u;
            if (this.visiblerows == null) {
                return
            }
            var h = this._findvisiblerow(t, this.visiblerows);
            if (h >= 0) {
                var q = this.visiblerows[h];
                var d = this.rowdetails && q.rowdetails;
                var p = !q.rowdetailshidden;
                if (d) {
                    var f = this.visiblerows[h - 1];
                    if (f == q) {
                        q = f;
                        h--
                    }
                    if (p) {
                        var g = b(this.hittestinfo[h].visualrow).position().top + parseInt(this.table.css("top"));
                        var r = b(this.hittestinfo[h].visualrow).height();
                        if (!(s >= g && s <= g + r)) {
                            h++;
                            q = this.visiblerows[h]
                        }
                    }
                }
            }
            return {
                index: h,
                row: q
            }
        },
        getcellatposition: function (k, s) {
            var t = this;
            var A = this.showheader ? this.columnsheader.height() + 2 : 0;
            var u = this._groupsheader() ? this.groupsheader.height() : 0;
            var C = this.showtoolbar ? this.toolbarheight : 0;
            u += C;
            var g = this.host.offset();
            var r = k - g.left;
            var p = s - A - g.top - u;
            var d = this._hittestrow(r, p);
            var l = d.row;
            var n = d.index;
            var v = this.table[0].rows[n];
            if (this.dataview && this.dataview.records.length == 0) {
                var q = this.table[0].rows;
                var D = 0;
                for (i = 0; i < q.length; i++) {
                    if (p >= D && p < D + this.rowsheight) {
                        v = q[i];
                        break
                    }
                    D += this.rowsheight
                }
                l = {
                    boundindex: i
                }
            }
            if (v == null) {
                return true
            }
            var w = this.hScrollInstance;
            var z = w.value;
            var f = 0;
            var o = this.groupable ? this.groups.length : 0;
            for (i = 0; i < v.cells.length; i++) {
                var h = parseInt(b(this.columnsrow[0].cells[i]).css("left"));
                var k = h - z;
                if (t.columns.records[i].pinned) {
                    k = h
                }
                var B = k + b(this.columnsrow[0].cells[i]).width();
                if (B >= r && r >= k) {
                    f = i;
                    break
                }
            }
            if (l != null) {
                var e = this._getcolumnat(f);
                return {
                    row: l.boundindex,
                    column: e.datafield,
                    value: this.getcellvalue(l.boundindex, e.datafield)
                }
            }
            return null
        },
        _handlemousedown: function (F, z) {
            if (F.target == null) {
                return true
            }
            if (z.disabled) {
                return true
            }
            if (b(F.target).ischildof(this.columnsheader)) {
                return true
            }
            var I;
            if (F.which) {
                I = (F.which == 3)
            } else {
                if (F.button) {
                    I = (F.button == 2)
                }
            }
            if (I) {
                return true
            }
            var N;
            if (F.which) {
                N = (F.which == 2)
            } else {
                if (F.button) {
                    N = (F.button == 1)
                }
            }
            if (N) {
                return true
            }
            var H = this.showheader ? this.columnsheader.height() + 2 : 0;
            var A = this._groupsheader() ? this.groupsheader.height() : 0;
            var M = this.showtoolbar ? this.toolbarheight : 0;
            A += M;
            var h = this.host.offset();
            var l = parseInt(F.pageX);
            var w = parseInt(F.pageY);
            if (this.isTouchDevice()) {
                var v = z.getTouches(F);
                var q = v[0];
                l = parseInt(q.pageX);
                w = parseInt(q.pageY);
                if (z.touchmode == true) {
                    l = parseInt(q._pageX);
                    w = parseInt(q._pageY)
                }
            }
            var t = l - h.left;
            var s = w - H - h.top - A;
            var d = this._hittestrow(t, s);
            var o = d.row;
            var p = d.index;
            var D = F.target.className;
            var B = this.table[0].rows[p];
            if (B == null) {
                return true
            }
            z.mousecaptured = true;
            z.mousecaptureposition = {
                left: F.pageX,
                top: F.pageY - A
            };
            var C = this.hScrollInstance;
            var E = C.value;
            var g = -1;
            var r = this.groupable ? this.groups.length : 0;
            for (var G = 0; G < B.cells.length; G++) {
                var k = parseInt(b(this.columnsrow[0].cells[G]).css("left"));
                var l = k - E;
                if (z.columns.records[G].pinned) {
                    l = k
                }
                var f = this._getcolumnat(G);
                if (f != null && f.hidden) {
                    continue
                }
                var L = l + b(this.columnsrow[0].cells[G]).width();
                if (L >= t && t >= l) {
                    g = G;
                    break
                }
            }
            if (o != null && g >= 0) {
                this._raiseEvent(1, {
                    rowindex: o.boundindex,
                    visibleindex: o.visibleindex,
                    group: o.group
                });
                var f = this._getcolumnat(g);
                this._raiseEvent(8, {
                    rowindex: o.boundindex,
                    column: f ? f.getcolumnproperties() : null,
                    datafield: f ? f.datafield : null,
                    columnindex: g
                });
                var K = false;
                if (this._lastmousedown != null) {
                    if (this._mousedown - this._lastmousedown < 300) {
                        if (this._clickedrowindex == o.boundindex) {
                            this._raiseEvent(22, {
                                rowindex: o.boundindex,
                                visibleindex: o.visibleindex,
                                group: o.group
                            });
                            if (this._clickedcolumn == f.datafield) {
                                this._raiseEvent(23, {
                                    rowindex: o.boundindex,
                                    column: f ? f.getcolumnproperties() : null,
                                    datafield: f ? f.datafield : null,
                                    columnindex: g
                                })
                            }
                            K = true;
                            this._clickedrowindex = -1;
                            this._clickedcolumn = null
                        }
                    }
                }
                if (!K) {
                    this._clickedrowindex = o.boundindex;
                    this._clickedcolumn = f.datafield
                }
                if (D.indexOf("jqx-grid-group-expand") != -1 || D.indexOf("jqx-grid-group-collapse") != -1) {
                    if (r > 0 && g < r && this._togglegroupstate) {
                        this._togglegroupstate(o.bounddata, true)
                    } else {
                        if (g == r && this.rowdetails && this.showrowdetailscolumn) {
                            this._togglerowdetails(o.bounddata, true);
                            this.gridcontent[0].scrollTop = 0;
                            this.gridcontent[0].scrollLeft = 0
                        }
                    }
                } else {
                    if (o.boundindex != -1) {
                        var J = this.selectedrowindexes.slice(0);
                        var n = false;
                        if (z.selectionmode != "none" && this._selectrowwithmouse) {
                            if (z.selectionmode == "multiplecellsextended" || z.selectionmode == "multiplerowsextended") {
                                if (!F.ctrlKey && !F.shiftKey) {
                                    z.selectedrowindexes = new Array();
                                    z.selectedcells = new Array()
                                }
                            }
                            if (z.selectionmode.indexOf("cell") == -1) {
                                if ((z.selectionmode != "singlerow") || (z.selectedrowindex != o.boundindex && z.selectionmode == "singlerow")) {
                                    this._applyrowselection(o.boundindex, true, false, null, f.datafield);
                                    this._selectrowwithmouse(z, d, J, f.datafield, F.ctrlKey, F.shiftKey)
                                }
                            } else {
                                if (f.datafield != null) {
                                    this._selectrowwithmouse(z, d, J, f.datafield, F.ctrlKey, F.shiftKey);
                                    this._applycellselection(o.boundindex, f.datafield, true, false)
                                }
                            }
                            if (z._oldselectedcell) {
                                if (z._oldselectedcell.datafield == z.selectedcell.datafield && z._oldselectedcell.rowindex == z.selectedcell.rowindex) {
                                    n = true
                                }
                            }
                            z._oldselectedcell = z.selectedcell
                        }
                        if (z.editable && z.begincelledit) {
                            var e = z.editmode == "click" || (n && z.editmode == "selectedcell");
                            if (z.selectionmode.indexOf("cell") == -1) {
                                e = true
                            }
                            if (e) {
                                if (o.boundindex != undefined && f.editable) {
                                    var u = z.begincelledit(o.boundindex, f.datafield, f.defaulteditorvalue);
                                    if (u) {
                                        return true
                                    }
                                }
                            }
                            if (z.selectionmode.indexOf("cell") != -1) {
                                if (z.editmode == "selectedcell" && !n && z.editcell) {
                                    z.endcelledit(z.editcell.row, z.editcell.column, false, true)
                                }
                            }
                            return true
                        }
                    }
                }
            }
            return true
        },
        _columnPropertyChanged: function (e, d, g, f) {},
        _rowPropertyChanged: function (g, d, f, e) {},
        propertyChangedHandler: function (d, e, h, g) {
            if (this.isInitialized == undefined || this.isInitialized == false) {
                return
            }
            switch (e) {
            case "touchmode":
                d._removeHandlers();
                d.touchDevice = null;
                d.vScrollBar.jqxScrollBar({
                    touchMode: g
                });
                d.hScrollBar.jqxScrollBar({
                    touchMode: g
                });
                d._updateTouchScrolling();
                d._addHandlers();
                break;
            case "rendergridrows":
                d.updatebounddata();
                break;
            case "editmode":
                d._removeHandlers();
                d._addHandlers();
                break;
            case "source":
                d.virtualsizeinfo = null;
                d.updatebounddata();
                if (d.virtualmode && !d._loading) {
                    d.loadondemand = true;
                    d._renderrows(d.virtualsizeinfo)
                }
                break;
            case "horizontalscrollbarstep":
            case "verticalscrollbarstep":
            case "horizontalscrollbarlargestep":
            case "verticalscrollbarlargestep":
                this.vScrollBar.jqxScrollBar({
                    step: this.verticalscrollbarstep,
                    largestep: this.verticalscrollbarlargestep
                });
                this.hScrollBar.jqxScrollBar({
                    step: this.horizontalscrollbarstep,
                    largestep: this.horizontalscrollbarlargestep
                });
                break;
            case "closeablegroups":
                if (d._initgroupsheader) {
                    d._initgroupsheader()
                }
                break;
            case "showgroupsheader":
                d.rendergridcontent();
                break;
            case "theme":
                if (d.pager) {
                    d.pager.removeClass();
                    d.pager.addClass(d.toTP("jqx-grid-pager"));
                    d.pager.addClass(d.toTP("jqx-widget-header"));
                    if (d.pageable && d._updatepagertheme) {
                        d._updatepagertheme()
                    }
                }
                if (d.groupsheader) {
                    d.groupsheader.removeClass();
                    d.groupsheader.addClass(d.toTP("jqx-grid-groups-header"));
                    d.groupsheader.addClass(d.toTP("jqx-widget-header"))
                }
                d.toolbar.removeClass();
                d.toolbar.addClass(d.toTP("jqx-grid-toolbar"));
                d.toolbar.addClass(d.toTP("jqx-widget-header"));
                d.statusbar.removeClass();
                d.statusbar.addClass(d.toTP("jqx-grid-statusbar"));
                d.statusbar.addClass(d.toTP("jqx-widget-content"));
                d.vScrollBar.jqxScrollBar({
                    theme: d.theme
                });
                d.hScrollBar.jqxScrollBar({
                    theme: d.theme
                });
                d.host.removeClass();
                d.host.addClass(d.toTP("jqx-grid"));
                d.host.addClass(d.toTP("jqx-reset"));
                d.host.addClass(d.toTP("jqx-rc-all"));
                d.host.addClass(d.toTP("jqx-widget"));
                d.host.addClass(d.toTP("jqx-widget-content"));
                d.bottomRight.removeClass();
                d.bottomRight.addClass(d.toTP("jqx-grid-bottomright"));
                d.toolbar.addClass(d.toTP("jqx-grid-toolbar"));
                d.toolbar.addClass(d.toTP("jqx-widget-header"));
                d.statusbar.addClass(d.toTP("jqx-grid-statusbar"));
                d.statusbar.addClass(d.toTP("jqx-widget-header"));
                d.render();
                break;
            case "showtoolbar":
            case "toolbarheight":
                d._arrange();
                d.refresh();
                break;
            case "showstatusbar":
            case "statusbarheight":
                d._arrange();
                d.refresh();
                break;
            case "filterable":
                if (h != g) {
                    d.render()
                }
                break;
            case "autoshowfiltericon":
            case "showfiltercolumnbackground":
            case "showpinnedcolumnbackground":
            case "showsortcolumnbackground":
                d.rendergridcontent();
                break;
            case "showrowdetailscolumn":
                d.render();
                break;
            case "scrollbarsize":
                d._arrange();
                break;
            case "width":
                if (h != g) {
                    if (!this._loading) {
                        if (g != h) {
                            d._arrange();
                            d._updatecolumnwidths();
                            d._updatecellwidths();
                            d._renderrows(d.virtualsizeinfo)
                        }
                    }
                }
                break;
            case "height":
                if (h != g) {
                    if (!this._loading) {
                        if (g != h) {
                            var k = d.groupable && d.groups.length > 0;
                            var f = d.vScrollBar.css("visibility") != "visible";
                            if (!k) {
                                d._arrange();
                                d.virtualsizeinfo = d._calculatevirtualheight();
                                if (parseInt(g) >= parseInt(h)) {
                                    d.prerenderrequired = true
                                }
                                d._renderrows(d.virtualsizeinfo)
                            } else {
                                if (g >= h) {
                                    d._render(true, false, false)
                                } else {
                                    d.rendergridcontent(true, false)
                                }
                            }
                            if (f && d.vScrollBar.css("visibility") == "visible") {
                                d._arrange();
                                d._updatecolumnwidths();
                                d._updatecellwidths()
                            }
                        }
                    }
                }
                break;
            case "altrows":
            case "altstart":
            case "altstep":
                d._renderrows(d.virtualsizeinfo);
                break;
            case "groupsheaderheight":
                d._arrange();
                if (d._initgroupsheader) {
                    d._initgroupsheader()
                }
                break;
            case "pagerheight":
                if (h != g) {
                    d._initpager()
                }
                break;
            case "selectedrowindex":
                d.selectrow(g);
                break;
            case "selectionmode":
                if (h != g) {
                    if (g == "none") {
                        d.selectedrowindexes = new Array();
                        d.selectedcells = new Array();
                        d.selectedrowindex = -1
                    }
                    d._renderrows(d.virtualsizeinfo)
                }
                break;
            case "showheader":
                if (g) {
                    d.columnsheader.css("display", "block")
                } else {
                    d.columnsheader.css("display", "none")
                }
                break;
            case "virtualmode":
                d.dataview.virtualmode = d.virtualmode;
                d.dataview.refresh(false);
                d._render(false, false, false);
                break;
            case "columnsmenu":
                if (h != g) {
                    d.render()
                }
                break;
            case "columns":
                d._columns = null;
                d.render();
                break;
            case "autoheight":
                if (h != g) {
                    d._render(false, false, true)
                }
                break;
            case "pagesizeoptions":
            case "pageable":
            case "pagesize":
                if (h != g) {
                    if (d._loading) {
                        alert(d.loadingerrormessage);
                        return
                    }
                    if (d._initpager) {
                        d.dataview.pageable = d.pageable;
                        d.dataview.pagenum = 0;
                        d.dataview.pagesize = d._getpagesize();
                        if (d.virtualmode) {
                            d.updatebounddata()
                        }
                        d.dataview.refresh(true);
                        d._initpager();
                        if (e == "pagesizeoptions") {
                            if (g != null && g.length > 0) {
                                d.pagesize = g[0];
                                d.dataview.pagesize = g[0];
                                d.prerenderrequired = true;
                                d._requiresupdate = true;
                                d.dataview.pagenum = -1;
                                d.gotopage(0)
                            }
                        }
                    }
                    d._render(false, false, false)
                }
                break;
            case "groups":
                d.updatebounddata();
                break;
            case "groupable":
                d.dataview.groupable = d.groupable;
                d.dataview.pagenum = 0;
                d.dataview.refresh(false);
                d._render(false, false, true);
                break
            }
        }
    });

    function c(d, e) {
        this.owner = d;
        this.datafield = null;
        this.text = "";
        this.sortable = true;
        this.hideable = true;
        this.editable = true;
        this.hidden = false;
        this.groupable = true;
        this.renderer = null;
        this.cellsrenderer = null;
        this.checkchange = null, this.buttonclick = null, this.columntype = null;
        this.cellsformat = "";
        this.align = "left";
        this.cellsalign = "left";
        this.width = "auto";
        this.minwidth = 25;
        this.maxwidth = "auto";
        this.pinned = false;
        this.visibleindex = -1;
        this.filterable = true;
        this.filter = null;
        this.resizable = true;
        this.initeditor = null;
        this.createeditor = null;
        this.validation = null;
        this.classname = "";
        this.cellclassname = "";
        this.cellendedit = null;
        this.cellbeginedit = null;
        this.menu = true;
        this.getcolumnproperties = function () {
            return {
                sortable: this.sortable,
                hideable: this.hideable,
                hidden: this.hidden,
                groupable: this.groupable,
                width: this.width,
                align: this.align,
                editable: this.editable,
                minwidth: this.minwidth,
                maxwidth: this.maxwidth,
                resizable: this.resizable,
                datafield: this.datafield,
                text: this.text,
                cellsalign: this.cellsalign,
                pinned: this.pinned,
                cellsformat: this.cellsformat,
                columntype: this.columntype,
                classname: this.classname,
                cellclassname: this.cellclassname,
                menu: this.menu
            }
        }, this.setproperty = function (f, g) {
            if (this[f]) {
                var h = this[f];
                this[f] = g;
                this.owner._columnPropertyChanged(this, f, g, h)
            }
        };
        this._initfields = function (f) {
            if (f != null) {
                if (f.datafield != undefined) {
                    this.datafield = f.datafield
                }
                if (f.dataField != undefined) {
                    this.datafield = f.dataField
                }
                if (f.text != undefined) {
                    this.text = f.text
                }
                if (f.sortable != undefined) {
                    this.sortable = f.sortable
                }
                if (f.hideable != undefined) {
                    this.hideable = f.hideable
                }
                if (f.hidden != undefined) {
                    this.hidden = f.hidden
                }
                if (f.groupable != undefined) {
                    this.groupable = f.groupable
                }
                if (f.renderer != undefined) {
                    this.renderer = f.renderer
                }
                if (f.align != undefined) {
                    this.align = f.align
                }
                if (f.cellsalign != undefined) {
                    this.cellsalign = f.cellsalign
                }
                if (f.cellsformat != undefined) {
                    this.cellsformat = f.cellsformat
                }
                if (f.width != undefined) {
                    this.width = f.width
                }
                if (f.minwidth != undefined) {
                    this.minwidth = f.minwidth
                }
                if (f.maxwidth != undefined) {
                    this.maxwidth = f.maxwidth
                }
                if (f.cellsrenderer != undefined) {
                    this.cellsrenderer = f.cellsrenderer
                }
                if (f.columntype != undefined) {
                    this.columntype = f.columntype
                }
                if (f.checkchange != undefined) {
                    this.checkchange = f.checkchange
                }
                if (f.buttonclick != undefined) {
                    this.buttonclick = f.buttonclick
                }
                if (f.pinned != undefined) {
                    this.pinned = f.pinned
                }
                if (f.visibleindex != undefined) {
                    this.visibleindex = f.visibleindex
                }
                if (f.filterable != undefined) {
                    this.filterable = f.filterable
                }
                if (f.filter != undefined) {
                    this.filter = f.filter
                }
                if (f.resizable != undefined) {
                    this.resizable = f.resizable
                }
                if (f.editable != undefined) {
                    this.editable = f.editable
                }
                if (f.initeditor != undefined) {
                    this.initeditor = f.initeditor
                }
                if (f.createeditor != undefined) {
                    this.createeditor = f.createeditor
                }
                if (f.validation != undefined) {
                    this.validation = f.validation
                }
                if (f.cellbeginedit != undefined) {
                    this.cellbeginedit = f.cellbeginedit
                }
                if (f.cellendedit != undefined) {
                    this.cellendedit = f.cellendedit
                }
                if (f.classname != undefined) {
                    this.classname = f.classname
                }
                if (f.cellclassname != undefined) {
                    this.cellclassname = f.cellclassname
                }
                if (f.menu != undefined) {
                    this.menu = f.menu
                }
            }
        };
        this._initfields(e);
        return this
    }
    function a(d, e) {
        this.setdata = function (f) {
            if (f != null) {
                this.bounddata = f;
                this.boundindex = f.boundindex;
                this.visibleindex = f.visibleindex;
                this.group = f.group;
                this.parentbounddata = f.parentItem;
                this.uniqueid = f.uniqueid;
                this.level = f.level
            }
        };
        this.setdata(e);
        this.parentrow = null;
        this.subrows = new Array();
        this.owner = d;
        this.height = 25;
        this.hidden = false;
        this.rowdetails = null;
        this.rowdetailsheight = 100;
        this.rowdetailshidden = true;
        this.top = -1;
        this.getrowinfo = function () {
            return {
                hidden: this.hidden,
                rowdetails: this.rowdetails,
                rowdetailsheight: this.rowdetailsheight,
                showdetails: !this.rowdetailshidden,
                height: this.height,
                index: this.visibleindex
            }
        };
        this.setrowinfo = function (f) {
            this.hidden = f.hidden;
            this.rowdetails = f.rowdetails;
            this.rowdetailsheight = f.rowdetailsheight;
            this.rowdetailshidden = !f.showdetails;
            this.height = f.height
        };
        return this
    }
    b.jqx.collection = function (d) {
        this.records = new Array();
        this.owner = d;
        this.updating = false;
        this.beginupdate = function () {
            this.updating = true
        };
        this.resumeupdate = function () {
            this.updating = false
        };
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (f) {
                var e = this.length;
                var g = Number(arguments[1]) || 0;
                g = (g < 0) ? Math.ceil(g) : Math.floor(g);
                if (g < 0) {
                    g += e
                }
                for (; g < e; g++) {
                    if (g in this && this[g] === f) {
                        return g
                    }
                }
                return -1
            }
        }
        this._raiseEvent = function (e) {
            var f = new jQuery.Event("collectionchanged");
            f.owner = this.owner;
            f.args = e;
            b(this.owner).trigger(f)
        };
        this.replace = function (f, e) {
            this.records[f] = e;
            if (!this.updating) {
                this._raiseEvent({
                    type: "replace",
                    element: e
                })
            }
        };
        this.isempty = function (e) {
            if (this.records[e] == undefined) {
                return true
            }
            return false
        };
        this.initialize = function (e) {
            if (e < 1) {
                e = 1
            }
            this.records[e - 1] = -1
        };
        this.length = function () {
            return this.records.length
        };
        this.indexOf = function (e) {
            return this.records.indexOf(e)
        };
        this.add = function (e) {
            if (e == null) {
                return false
            }
            this.records[this.records.length] = e;
            if (!this.updating) {
                this._raiseEvent({
                    type: "add",
                    element: e
                })
            }
            return true
        };
        this.insertAt = function (f, e) {
            if (f == null || f == undefined) {
                return false
            }
            if (e == null) {
                return false
            }
            if (f >= 0) {
                if (f < this.records.length) {
                    this.records.splice(f, 0, e);
                    if (!this.updating) {
                        this._raiseEvent({
                            type: "insert",
                            index: f,
                            element: e
                        })
                    }
                    return true
                } else {
                    return this.add(e)
                }
            }
            return false
        };
        this.remove = function (f) {
            if (f == null || f == undefined) {
                return false
            }
            var e = this.records.indexOf(f);
            if (e != -1) {
                this.records.splice(e, 1);
                if (!this.updating) {
                    this._raiseEvent({
                        type: "remove",
                        element: f
                    })
                }
                return true
            }
            return false
        };
        this.removeAt = function (f) {
            if (f == null || f == undefined) {
                return false
            }
            if (f < 0) {
                return false
            }
            if (f < this.records.length) {
                var e = this.records[f];
                this.records.splice(f, 1);
                if (!this.updating) {
                    this._raiseEvent({
                        type: "removeAt",
                        index: f,
                        element: e
                    })
                }
                return true
            }
            return false
        };
        return this
    };
    b.jqx.dataview = function () {
        this.self = this;
        this.grid = null;
        this.uniqueId = "id";
        this.records = [];
        this.rows = [];
        this.columns = [];
        this.groups = [];
        this.filters = new Array();
        this.updated = null;
        this.update = null;
        this.suspend = false;
        this.pagesize = 0;
        this.pagenum = 0;
        this.totalrows = 0;
        this.totalrecords = 0;
        this.groupable = true;
        this.loadedrecords = [];
        this.loadedrootgroups = [];
        this.loadedgroups = [];
        this.loadedgroupsByKey = [];
        this.virtualmode = true;
        this._cachegrouppages = new Array();
        this.source = null;
        this.changedrecords = new Array();
        this.rowschangecallback = null;
        this.suspendupdate = function () {
            this.suspend = true
        }, this.isupdating = function () {
            return this.suspend
        }, this.resumeupdate = function (d) {
            this.suspend = false;
            if (d == undefined) {
                d = true
            }
            this.refresh(d)
        }, this.getrecords = function () {
            return this.records
        }, this.clearrecords = function () {
            this.recordids = new Array()
        };
        this.databind = function (d, o) {
            var p = d._source ? true : false;
            var e = null;
            if (p) {
                e = d;
                d = d._source
            } else {
                e = new b.jqx.dataAdapter(d, {
                    autoBind: false
                })
            }
            var g = function (u) {
                e._options.virtualmode = u.virtualmode;
                e._options.totalrecords = u.totalrecords;
                e._options.originaldata = u.originaldata;
                e._options.recordids = u.recordids;
                e._options.cachedrecords = new Array();
                e._options.pagenum = u.pagenum;
                e._options.pageable = u.pageable;
                if (d.type != undefined) {
                    e._options.type = d.type
                }
                if (d.formatdata != undefined) {
                    e._options.formatData = d.formatdata
                }
                if (d.contenttype != undefined) {
                    e._options.contentType = d.contenttype
                }
                if (d.async != undefined) {
                    e._options.async = d.async
                }
                if (d.updaterow != undefined) {
                    e._options.updaterow = d.updaterow
                }
                if (d.addrow != undefined) {
                    e._options.addrow = d.addrow
                }
                if (d.deleterow != undefined) {
                    e._options.deleterow = d.deleterow
                }
                if (u.pagesize == 0) {
                    u.pagesize = 10
                }
                e._options.pagesize = u.pagesize
            };
            var r = function (v) {
                v.totalrecords = e.totalrecords;
                if (!v.virtualmode) {
                    v.originaldata = e.originaldata;
                    v.records = e.records;
                    v.recordids = e.recordids;
                    v.cachedrecords = e.cachedrecords
                } else {
                    var u = {
                        startindex: v.pagenum * v.pagesize,
                        endindex: (v.pagenum * v.pagesize + v.pagesize)
                    };
                    if (d.recordstartindex) {
                        u.startindex = d.recordstartindex
                    }
                    if (d.recordendindex) {
                        u.endindex = d.recordendindex
                    } else {
                        if (!v.grid.pageable) {
                            u.endindex = u.startindex + 100;
                            if (v.grid.autoheight) {
                                u.endindex = u.startindex + v.totalrecords
                            }
                        }
                    }
                    u.data = e.records;
                    if (v.grid.rendergridrows && v.totalrecords > 0) {
                        d.records = v.grid.rendergridrows(u)
                    }
                    if (!d.records || v.totalrecords == 0) {
                        d.records = new Array()
                    }
                    v.originaldata = d.records;
                    v.records = d.records;
                    v.cachedrecords = d.records
                }
            };
            g(this);
            this.source = d;
            if (o !== undefined) {
                uniqueId = o
            }
            var s = this;
            switch (d.datatype) {
            case "local":
            case "array":
            default:
                if (d.localdata == null) {
                    d.localdata = []
                }
                if (d.localdata != null) {
                    e.unbindBindingUpdate(s.grid.element.id);
                    e.dataBind();
                    var q = function (u) {
                        r(s);
                        if (u == "updateData") {
                            s.refresh();
                            s.grid._updateGridData()
                        } else {
                            if (d.recordstartindex && this.virtualmode) {
                                s.updateview(d.recordstartindex, d.recordstartindex + s.pagesize)
                            } else {
                                s.refresh()
                            }
                            s.update()
                        }
                    };
                    q();
                    e.bindBindingUpdate(s.grid.element.id, q)
                }
                break;
            case "json":
            case "jsonp":
            case "xml":
            case "xhtml":
            case "script":
            case "text":
            case "csv":
            case "tab":
                if (d.localdata != null) {
                    e.unbindBindingUpdate(s.grid.element.id);
                    e.dataBind();
                    var q = function (u) {
                        r(s);
                        if (u == "updateData") {
                            s.refresh();
                            s.grid._updateGridData()
                        } else {
                            if (d.recordstartindex) {
                                s.updateview(d.recordstartindex, d.recordstartindex + s.pagesize)
                            } else {
                                s.refresh()
                            }
                            s.update()
                        }
                    };
                    q();
                    e.bindBindingUpdate(s.grid.element.id, q);
                    return
                }
                var n = {};
                var k = 0;
                var t = {};
                for (x = 0; x < this.filters.length; x++) {
                    var l = this.filters[x].datafield;
                    var f = this.filters[x].filter;
                    var h = f.getfilters();
                    t[l + "operator"] = f.operator;
                    for (m = 0; m < h.length; m++) {
                        h[m].datafield = l;
                        t["filtervalue" + k] = h[m].value;
                        t["filtercondition" + k] = h[m].condition;
                        t["filteroperator" + k] = h[m].operator;
                        t["filterdatafield" + k] = l;
                        k++
                    }
                }
                t.filterscount = k;
                t.groupscount = s.groups.length;
                for (x = 0; x < s.groups.length; x++) {
                    t["group" + x] = s.groups[x]
                }
                if (d.recordstartindex == undefined) {
                    d.recordstartindex = 0
                }
                if (d.recordendindex == undefined || d.recordendindex == 0) {
                    if (s.grid.height && s.grid.height.toString().indexOf("%") == -1) {
                        d.recordendindex = parseInt(s.grid.height) / s.grid.rowsheight;
                        d.recordendindex += 2
                    } else {
                        d.recordendindex = b(window).height() / s.grid.rowsheight
                    }
                }
                b.extend(t, {
                    sortdatafield: s.sortfield,
                    sortorder: s.sortfielddirection,
                    pagenum: s.pagenum,
                    pagesize: s.grid.pagesize,
                    recordstartindex: d.recordstartindex,
                    recordendindex: d.recordendindex
                });
                if (e._options.data) {
                    b.extend(e._options.data, t)
                } else {
                    if (d.data) {
                        b.extend(t, d.data)
                    }
                    e._options.data = t
                }
                var q = function () {
                    r(s);
                    if (d.recordstartindex) {
                        s.updateview(d.recordstartindex, d.recordstartindex + s.pagesize)
                    } else {
                        s.refresh()
                    }
                    s.update()
                };
                e.unbindDownloadComplete(s.grid.element.id);
                e.bindDownloadComplete(s.grid.element.id, q);
                e.dataBind()
            }
        };
        this.getid = function (g, e, f) {
            if (b(g, e).length > 0) {
                return b(g, e).text()
            }
            if (g) {
                if (g.toString().length > 0) {
                    var d = b(e).attr(g);
                    if (d != null && d.toString().length > 0) {
                        return d
                    }
                }
            }
            return f
        };
        this.getvaluebytype = function (g, d) {
            var e = g;
            if (d.type == "date") {
                var f = new Date(g);
                if (f.toString() == "NaN" || f.toString() == "Invalid Date") {
                    if (b.jqx.dataFormat) {
                        g = b.jqx.dataFormat.tryparsedate(g)
                    } else {
                        g = f
                    }
                } else {
                    g = f
                }
                if (g == null) {
                    g = e
                }
            } else {
                if (d.type == "float") {
                    var g = parseFloat(g);
                    if (isNaN(g)) {
                        g = e
                    }
                } else {
                    if (d.type == "int") {
                        var g = parseInt(g);
                        if (isNaN(g)) {
                            g = e
                        }
                    } else {
                        if (d.type == "bool") {
                            if (g != null) {
                                if (g.toLowerCase() == "false") {
                                    g = false
                                } else {
                                    if (g.toLowerCase() == "true") {
                                        g = true
                                    }
                                }
                            }
                            if (g == 1) {
                                g = true
                            } else {
                                if (g == 0) {
                                    g = false
                                } else {
                                    g = ""
                                }
                            }
                        }
                    }
                }
            }
            return g
        };
        this.setpaging = function (d) {
            if (d.pageSize != undefined) {
                this.pagesize = d.pageSize
            }
            if (d.pageNum != undefined) {
                this.pagenum = Math.min(d.pageNum, Math.ceil(this.totalrows / this.pagesize))
            }
            this.refresh()
        };
        this.getpagingdetails = function () {
            return {
                pageSize: this.pagesize,
                pageNum: this.pagenum,
                totalrows: this.totalrows
            }
        };
        this._clearcaches = function () {
            this.sortcache = {};
            this.sortdata = [];
            this.changedrecords = new Array();
            this.records = new Array();
            this.cacheddata = new Array();
            this.originaldata = new Array();
            this.bounditems = new Array();
            this.loadedrecords = new Array();
            this.loadedrootgroups = new Array();
            this.loadedgroups = new Array();
            this.loadedgroupsByKey = new Array();
            this._cachegrouppages = new Array();
            this.recordsbyid = {}
        };
        this.addfilter = function (f, e) {
            var d = -1;
            for (m = 0; m < this.filters.length; m++) {
                if (this.filters[m].datafield == f) {
                    d = m;
                    break
                }
            }
            if (d == -1) {
                this.filters[this.filters.length] = {
                    filter: e,
                    datafield: f
                }
            } else {
                this.filters[d] = {
                    filter: e,
                    datafield: f
                }
            }
        };
        this.removefilter = function (d) {
            for (i = 0; i < this.filters.length; i++) {
                if (this.filters[i].datafield == d) {
                    this.filters.splice(i, 1);
                    break
                }
            }
        };
        this.getItemFromIndex = function (d) {
            return this.records[d]
        };
        this.updaterow = function (e, g) {
            if (g != undefined && e != undefined) {
                g.uid = e;
                if (!(g[this.source.id])) {
                    g[this.source.id] = g.uid
                }
                var d = this.recordsbyid["id" + e];
                var f = this.records.indexOf(d);
                this.records[f] = g;
                this.refresh();
                this.changedrecords[g.uid] = {
                    Type: "Update",
                    OldData: d,
                    Data: g
                };
                return true
            }
            return false
        };
        this.addrow = function (g, h, d) {
            if (h != undefined) {
                if (!g) {
                    h.uid = this.getid(this.source.id, h, this.totalrecords);
                    var e = this.recordsbyid["id" + h.uid];
                    while (e != null) {
                        var f = Math.floor(Math.random() * 10000).toString();
                        h.uid = f;
                        e = this.recordsbyid["id" + f]
                    }
                } else {
                    h.uid = g
                }
                if (!(h[this.source.id])) {
                    h[this.source.id] = h.uid
                }
                if (d == "last") {
                    this.records.push(h)
                } else {
                    this.records.splice(0, 0, h)
                }
                this.totalrecords++;
                this.refresh();
                this.changedrecords[h.uid] = {
                    Type: "New",
                    Data: h
                };
                return true
            }
            return false
        };
        this.deleterow = function (e) {
            if (e != undefined) {
                if (this.recordsbyid["id" + e]) {
                    var d = this.recordsbyid["id" + e];
                    var f = this.records.indexOf(d);
                    this.changedrecords[e] = {
                        Type: "Delete",
                        Data: this.records[f]
                    };
                    this.records.splice(f, 1);
                    this.totalrecords--;
                    this.refresh();
                    return true
                }
                return false
            }
            return false
        };
        this.reload = function (f, d, u, g, h, y, w) {
            var p = this;
            var o = new Array();
            var r = f;
            var k = d;
            var l = u;
            var s = g;
            var n = k.length;
            var A = 0;
            var e = 0;
            var v, q;
            this.columns = [];
            this.bounditems = new Array();
            this.loadedrecords = new Array();
            this.loadedrootgroups = new Array();
            this.loadedgroups = new Array();
            this.loadedgroupsByKey = new Array();
            this._cachegrouppages = new Array();
            this.recordsbyid = {};
            if (this.totalrecords == 0) {
                Object.size = function (D) {
                    var C = 0,
                        B;
                    for (B in D) {
                        if (D.hasOwnProperty(B)) {
                            C++
                        }
                    }
                    return C
                };
                var z = Object.size(r);
                this.totalrecords = z;
                b.each(this.records, function (C) {
                    var D = this;
                    var B = 0;
                    b.each(D, function (E, F) {
                        p.columns[B++] = E
                    });
                    return false
                })
            }
            if (this.virtualmode) {
                if (this.pageable) {
                    this.updateview();
                    return
                }
                var y = 0;
                if (!this.groupable) {
                    this.updateview();
                    return
                } else {
                    var w = this.totalrecords
                }
            } else {
                var y = 0;
                var w = this.totalrecords
            }
            if (this.groupable && this.groups.length > 0 && this.loadgrouprecords) {
                var t = y;
                t = this.loadgrouprecords(0, y, w, l, e, s, k, n, o)
            } else {
                A = this.loadflatrecords(y, w, l, e, s, k, n, o)
            }
            if (n > e) {
                k.splice(e, n - e)
            }
            if (this.groups.length > 0 && this.groupable) {
                this.totalrows = t
            } else {
                this.totalrows = A
            }
            return o
        };
        this.loadflatrecords = function (d, p, e, q, l, v, o, r) {
            var u = this;
            var k = d;
            var n = d;
            p = Math.min(p, this.totalrecords);
            var g = this.sortdata != null;
            var f = this.source.id && (this.source.datatype == "local" || this.source.datatype == "array" || this.source.datatype == "");
            var h = g ? this.sortdata : this.records;
            for (obj = d; obj < p; obj++) {
                var t = {};
                if (!g) {
                    t = b.extend({}, h[obj]);
                    id = t[u.uniqueId];
                    t.boundindex = k;
                    u.loadedrecords[k] = t;
                    if (!t.uid) {
                        t.uid = u.getid(u.source.id, t, k)
                    }
                    u.recordsbyid["id" + t.uid] = h[obj];
                    t.uniqueid = u.generatekey();
                    u.bounditems[this.bounditems.length] = t
                } else {
                    t = b.extend({}, h[obj].value);
                    id = t[u.uniqueId];
                    t.boundindex = h[obj].index;
                    if (!t.uid) {
                        t.uid = u.getid(u.source.id, t, t.boundindex)
                    }
                    u.recordsbyid["id" + t.uid] = h[obj].value;
                    u.loadedrecords[k] = t;
                    t.uniqueid = u.generatekey();
                    u.bounditems[t.boundindex] = t
                }
                if (q >= o || id != v[q][u.uniqueId] || (l && l[id])) {
                    r[r.length] = q
                }
                v[q] = t;
                q++;
                t.visibleindex = n;
                n++;
                k++
            }
            if (u.grid.summaryrows) {
                var s = k;
                b.each(u.grid.summaryrows, function () {
                    var w = b.extend({}, this);
                    w.boundindex = p++;
                    u.loadedrecords[s] = w;
                    w.uniqueid = u.generatekey();
                    u.bounditems[u.bounditems.length] = w;
                    v[q] = w;
                    q++;
                    w.visibleindex = n;
                    n++;
                    s++
                })
            }
            return n
        }, this.updateview = function (o, p) {
            var r = this;
            var k = this.pagesize * this.pagenum;
            var n = 0;
            var s = new Array();
            var e = this.filters;
            var h = this.updated;
            var l = s.length;
            if (this.pageable) {
                if (this.virtualmode) {
                    if (!this.groupable || this.groups.length == 0) {
                        this.loadflatrecords(this.pagesize * this.pagenum, this.pagesize * (1 + this.pagenum), e, n, h, s, l, []);
                        this.totalrows = s.length
                    } else {
                        if (this.groupable && this.groups.length > 0 && this.loadgrouprecords) {
                            if (this._cachegrouppages[this.pagenum + "_" + this.pagesize] != undefined) {
                                this.rows = this._cachegrouppages[this.pagenum + "_" + this.pagesize];
                                this.totalrows = this.rows.length;
                                return
                            }
                            this.loadgrouprecords(0, this.pagesize * this.pagenum, this.pagesize * (1 + this.pagenum), e, n, h, s, l, []);
                            this._cachegrouppages[this.pagenum + "_" + this.pagesize] = this.rows;
                            this.totalrows = this.rows.length;
                            return
                        }
                    }
                }
            } else {
                if (this.virtualmode && (!this.groupable || this.groups.length == 0)) {
                    var g = this.pagesize;
                    if (g == 0) {
                        g = Math.min(100, this.totalrecords)
                    }
                    var d = g * this.pagenum;
                    if (this.loadedrecords.length == 0) {
                        d = 0
                    }
                    if (o != null && p != null) {
                        this.loadflatrecords(o, p, e, n, h, s, l, [])
                    } else {
                        this.loadflatrecords(this.pagesize * this.pagenum, this.pagesize * (1 + this.pagenum), e, n, h, s, l, [])
                    }
                    this.totalrows = this.loadedrecords.length;
                    this.rows = s;
                    if (s.length >= g) {
                        return
                    }
                }
            }
            if (this.groupable && this.pageable && this.groups.length > 0 && this._updategroupsinpage) {
                s = this._updategroupsinpage(r, e, k, n, l, this.pagesize * this.pagenum, this.pagesize * (1 + this.pagenum))
            } else {
                for (i = this.pagesize * this.pagenum; i < this.pagesize * (1 + this.pagenum); i++) {
                    var q = i < this.loadedrecords.length ? this.loadedrecords[i] : null;
                    if (q == null) {
                        continue
                    }
                    if (!this.pagesize || (k >= this.pagesize * this.pagenum && k <= this.pagesize * (this.pagenum + 1))) {
                        s[n] = q;
                        n++
                    }
                    k++
                }
            }
            if ((s.length == 0 || s.length < this.pagesize) && !this.pageable && this.virtualmode) {
                n = s.length;
                var f = s.length;
                for (i = this.pagesize * this.pagenum; i < this.pagesize * (1 + this.pagenum) - f; i++) {
                    var q = {};
                    q.boundindex = i + f;
                    q.visibleindex = i + f;
                    q.uniqueid = r.generatekey();
                    q.empty = true;
                    r.bounditems[i + f] = q;
                    s[n] = q;
                    n++
                }
            }
            this.rows = s
        };
        this.generatekey = function () {
            var d = function () {
                return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
            };
            return (d() + d() + "-" + d() + "-" + d() + "-" + d() + "-" + d() + d() + d())
        };
        this.reloaddata = function () {
            this.reload(this.records, this.rows, this.filter, this.updated, true)
        };
        this.refresh = function (h) {
            if (this.suspend) {
                return
            }
            if (h == undefined) {
                h = true
            }
            var n = this.rows.length;
            var l = this.totalrows;
            if (this.filters.length > 0 && !this.virtualmode) {
                var e = "";
                var g = this.cachedrecords.length;
                var t = new Array();
                this.totalrecords = 0;
                var o = this.cachedrecords;
                this._dataIndexToBoundIndex = new Array();
                var f = this.filters.length;
                if (this.source != null && this.source.filter != undefined && this.source.localdata != undefined) {
                    t = this.source.filter(this.filters, o, g);
                    if (t == undefined) {
                        t = new Array()
                    }
                    this.records = t
                } else {
                    if (this.source.filter == null || this.source.filter == undefined) {
                        for (row = 0; row < g; row++) {
                            var p = o[row];
                            var d = undefined;
                            for (j = 0; j < f; j++) {
                                var e = this.filters[j].filter;
                                var s = p[this.filters[j].datafield];
                                var u = e.evaluate(s);
                                if (d == undefined) {
                                    d = u
                                } else {
                                    if (e.operator == "or") {
                                        d = d || u
                                    } else {
                                        d = d && u
                                    }
                                }
                            }
                            if (d) {
                                t[t.length] = b.extend({
                                    dataindex: row
                                }, p);
                                this._dataIndexToBoundIndex[row] = {
                                    boundindex: t.length - 1
                                }
                            } else {
                                this._dataIndexToBoundIndex[row] = null
                            }
                        }
                        this.records = t
                    }
                }
                if (this.sortdata) {
                    var k = this.sortfield;
                    if (this.sortcache[k]) {
                        this.sortdata = null;
                        var q = this.sortcache[k].direction;
                        this.sortcache[k] = null;
                        this.sortby(this.sortfield, q);
                        return
                    }
                }
            } else {
                if (this.filters.length == 0 && !this.virtualmode) {
                    if (this.cachedrecords) {
                        this.totalrecords = 0;
                        var o = this.cachedrecords;
                        this.records = o;
                        if (this.sortdata) {
                            var k = this.sortfield;
                            if (this.sortcache[k]) {
                                this.sortdata = null;
                                var q = this.sortcache[k].direction;
                                this.sortcache[k] = null;
                                this.sortby(this.sortfield, q);
                                return
                            }
                        }
                    }
                }
            }
            var r = this.reload(this.records, this.rows, this.filter, this.updated, h);
            this.updated = null;
            if (this.rowschangecallback != null) {
                if (l != totalrows) {
                    this.rowschangecallback({
                        type: "PagingChanged",
                        data: getpagingdetails()
                    })
                }
                if (n != rows.length) {
                    this.rowschangecallback({
                        type: "RowsCountChanged",
                        data: {
                            previous: n,
                            current: rows.length
                        }
                    })
                }
                if (r.length > 0 || n != rows.length) {
                    this.rowschangecallback({
                        type: "RowsChanged",
                        data: {
                            previous: n,
                            current: rows.length,
                            diff: r
                        }
                    })
                }
            }
        };
        return this
    }
})(jQuery);
