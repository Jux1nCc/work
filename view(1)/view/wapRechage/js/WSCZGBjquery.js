/* 
 * Autocompleter v0.1.2.1 - 2014-05-23 
 * Simple, easy, customisable and with cache support. 
 * http://github.com/ArtemFitiskin/jquery-autocompleter 
 * 
 * Copyright 2014 Artem Fitiskin; MIT Licensed 
 */ 

;(function ($, window) {
    "use strict";

    var guid = 0,
        ignoredKeyCode = [9, 13, 17, 19, 20, 27, 33, 34, 35, 36, 37, 39, 44, 92, 113, 114, 115, 118, 119, 120, 122, 123, 144, 145],
        allowOptions = ['source', 'empty', 'limit', 'cache', 'focusOpen', 'selectFirst', 'changeWhenSelect', 'highlightMatches', 'ignoredKeyCode', 'customLabel', 'customValue', 'template', 'offset', 'combine', 'callback'],
        userAgent = (window.navigator.userAgent||window.navigator.vendor||window.opera),
        isFirefox = /Firefox/i.test(userAgent),
        isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(userAgent),
        isFirefoxMobile = (isFirefox && isMobile),
        $body = null,
        localStorageKey = 'autocompleterCache',
        supportLocalStorage = (function () {
            var supported = typeof window.localStorage !== 'undefined';
            if (supported) {
                try {
                    localStorage.setItem("autocompleter", "autocompleter");
                    localStorage.removeItem("autocompleter");
                } catch (e) {
                    supported = false;
                }
            }
            return supported;
        })();

    /**
	 * @options
	 * @param source [(string|object)] <null> "URL to the server or a local object"
	 * @param empty [boolean] <true> "Launch if value is empty"
	 * @param limit [int] <10> "Number of results to be displayed"
	 * @param customClass [array] <[]> "Array with custom classes for autocompleter element"
	 * @param cache [boolean] <true> "Save xhr data to localStorage to avoid the repetition of requests"
	 * @param focusOpen [boolean] <true> "Launch autocompleter when input gets focus"
	 * @param hint [boolean] <false> "Add hint to input with first matched label, correct styles should be installed"
	 * @param selectFirst [boolean] <false> "If set to true, first element in autocomplete list will be selected automatically, ignore if changeWhenSelect is on"
	 * @param changeWhenSelect [boolean] <true> "Allows to change input value using arrow keys navigation in autocomplete list"
	 * @param highlightMatches [boolean] <false> "This option defines <strong> tag wrap for matches in autocomplete results"
	 * @param ignoredKeyCode [array] <[]> "Array with ignorable keycodes"
	 * @param customLabel [boolean] <false> "The name of object's property which will be used as a label"
	 * @param customValue [boolean] <false> "The name of object's property which will be used as a value"
     * @param template [(string|boolean)] <false> "Custom template for list items"
     * @param offset [(string|boolean)] <false> "Source response offset, for example: response.items.posts"
	 * @param combine [function] <$.noop> "Returns an object which extends ajax data. Useful if you want to pass some additional server options"
	 * @param callback [function] <$.noop> "Select value callback function. Arguments: value, index"
	 */
    var options = {
        source: null,
        empty: true,
        limit: 10,
        customClass: [],
        cache: true,
        focusOpen: true,
        hint: false,
        selectFirst: false,
        changeWhenSelect: true,
        highlightMatches: false,
        ignoredKeyCode: [],
        customLabel: false,
        customValue: false,
        template: false,
        offset: false,
        combine: $.noop,
        callback: $.noop
    };

    var publics = {

        /**
         * @method
         * @name defaults
         * @description Sets default plugin options
         * @param opts [object] <{}> "Options object"
         * @example $.autocompleter("defaults", opts);
         */
        defaults: function (opts) {
            options = $.extend(options, opts || {});
            return $(this);
        },

        /**
         * @method
         * @name option
         * @description Open autocompleter list
         */
        option: function (properties) {
            return $(this).each(function(i, input) {
                var data = $(input).next(".autocompleter").data("autocompleter");

                for (var property in properties) {
                    if ($.inArray(property, allowOptions) !== -1) {
                        data[property] = properties[property];
                    }
                }
            });
        },

        /**
         * @method
         * @name open
         * @description Open autocompleter list
         */
        open: function () {
            return $(this).each(function(i, input) {
                var data = $(input).next(".autocompleter").data("autocompleter");

                if (data) {
                    _open(null, data);
                }
            });
        },

        /**
         * @method
         * @name close
         * @description Close autocompleter list
         */
        close: function () {
            return $(this).each(function(i, input) {
                var data = $(input).next(".autocompleter").data("autocompleter");

                if (data) {
                    _close(null, data);
                }
            });
        },

        /**
         * @method
         * @name clearCache
         * @description Remove localStorage cache
         */
        clearCache: function () {
            _deleteCache();
        },

        /**
         * @method
         * @name destroy
         * @description Removes instance of plugin
         * @example $(".target").autocompleter("destroy");
         */
        destroy: function () {
            return $(this).each(function (i, input) {
                var data = $(input).next(".autocompleter").data("autocompleter");

                if (data) {
                    // Abort xhr
                    if (data.jqxhr) {
                        data.jqxhr.abort();
                    }

                    // If has selected item & open - confirm it
                    if (data.$autocompleter.hasClass("open")) {
                        data.$autocompleter.find(".autocompleter-selected")
                                            .trigger("click.autocompleter");
                    }

                    // Restore original autocomplete attr
                    if(!data.originalAutocomplete) {
                        data.$node.removeAttr("autocomplete");
                    } else {
                        data.$node.attr("autocomplete", data.originalAutocomplete);
                    }

                    // Remove autocompleter & unbind events
                    data.$node.off(".autocompleter")
                               .removeClass("autocompleter-node");
                    data.$autocompleter.off(".autocompleter")
                                         .remove();
                }
            });
        }
    };

    /**
     * @method private
     * @name _init
     * @description Initializes plugin
     * @param opts [object] "Initialization options"
     */
    function _init(opts) {
        // Local options
        opts = $.extend({}, options, opts || {});

        // Check for Body
        if ($body === null) {
            $body = $("body");
        }

        // Apply to each element
        var $items = $(this);
        for (var i = 0, count = $items.length; i < count; i++) {
            _build($items.eq(i), opts);
        }

        return $items;
    }

    /**
	 * @method private
	 * @name _build
	 * @description Builds each instance
	 * @param $node [jQuery object] "Target jQuery object"
	 * @param opts [object] <{}> "Options object"
	 */
    function _build($node, opts) {
        if (!$node.hasClass("autocompleter-node")) {
            // Extend options
            opts = $.extend({}, opts, $node.data("autocompleter-options"));

            var html = '<div class="autocompleter '+opts.customClass.join(' ')+'" id="autocompleter-'+(guid+1)+'">';
                if (opts.hint) {
                    html += '<div class="autocompleter-hint"></div>';
                }
                html += '<ul class="autocompleter-list"></ul>';
                html += '</div>';

            $node.addClass("autocompleter-node")
                 .after(html);

            var $autocompleter = $node.next(".autocompleter").eq(0);

            // Set autocomplete to off for warn overlay
            var originalAutocomplete = $node.attr("autocomplete");
            $node.attr("autocomplete", "off");

            // Store plugin data
            var data = $.extend({
                $node: $node,
                $autocompleter: $autocompleter,
                $selected: null,
                $list: null,
                index: -1,
                hintText: false,
                source: false,
                jqxhr: false,
                response: null,
                focused: false,
                query: '',
                originalAutocomplete: originalAutocomplete,
                guid: guid++
            }, opts);

            // Bind autocompleter events
            data.$autocompleter.on("mousedown.autocompleter", ".autocompleter-item", data, _select)
                                .data("autocompleter", data);

            // Bind node events
            data.$node.on("keyup.autocompleter", data, _onKeyup)
                      .on("keydown.autocompleter", data, _onKeydownHelper)
                      .on("focus.autocompleter", data, _onFocus)
                      .on("blur.autocompleter", data, _onBlur)
                      .on("mousedown.autocompleter", data, _onMousedown);
        }
    }

    /**
     * @method private
     * @name _search
     * @description Local search function, return best collation
     * @param query [string] "Query string"
     * @param source [object] "Source data"
     * @param limit [integer] "Results length"
     */
    function _search(query, source, limit) {
        var response = [];
        query = query.toUpperCase();

        if (source.length) {
            for (var i = 0; i < 2; i++) {
                for (var item in source) {
                    if (response.length < limit) {
                        switch (i) {
                            case 0:
                                if (source[item].label.toUpperCase().search(query) === 0) {
                                    response.push(source[item]);
                                    delete source[item];
                                }
                            break;

                            case 1:
                                if (source[item].label.toUpperCase().search(query) !== -1) {
                                    response.push(source[item]);
                                    delete source[item];
                                }
                            break;
                        }
                    }
                }
            }
        }

        return response;
    }

    /**
     * @method private
     * @name _launch
     * @description Use source locally or create xhr
     * @param data [object] "Instance data"
     */
    function _launch(data) {
        data.query = $.trim(data.$node.val());

        if (!data.empty && data.query.length === 0) {
            _clear(data);
            return;
        } else {
            if (typeof data.source === 'object') {
                _clear(data);

                // Local search
                var search = _search(data.query, _clone(data.source), data.limit);
                if (search.length) {
                    _response(search, data);
                }
            } else {
                if (data.jqxhr) {
                    data.jqxhr.abort();
                }

                var ajaxData = $.extend({
                    limit: data.limit,
                    query: data.query
                }, data.combine());

                data.jqxhr = $.ajax({
                    url:        data.source,
                    dataType:   "json",
                    data:       ajaxData,
                    beforeSend: function (xhr) {
                        data.$autocompleter.addClass('autocompleter-ajax');
                        _clear(data);
                        if (data.cache) {
                            var stored = _getCache(this.url);
                            if (stored) {
                                xhr.abort();
                                _response(stored, data);
                            }
                        }
                    }
                })
                .done(function (response) {
                    // Get subobject from responce
                    if (data.offset) {
                        response = _grab(response, data.offset);
                    }
                    if (data.cache) {
                        _setCache(this.url, response);
                    }
                    _response(response, data);
                })
                .always(function () {
                    data.$autocompleter.removeClass('autocompleter-ajax');
                });
            }
        }
    }

    /**
     * @method private
     * @name _clear
     * @param data [object] "Instance data"
     */
    function _clear(data) {
        // Clear data
        data.response = null;
        data.$list = null;
        data.$selected = null;
        data.index = 0;
        data.$autocompleter.find(".autocompleter-list").empty();
        data.$autocompleter.find('.autocompleter-hint').removeClass('autocompleter-hint-show').empty();
        data.hintText = false;

        _close(null, data);
    }

    /**
     * @method private
     * @name _response
     * @description Main source response function
     * @param response [object] "Source data"
     * @param data [object] "Instance data"
     */
    function _response(response, data) {
        _buildList(response, data);

        if (data.$autocompleter.hasClass('autocompleter-focus')) {
            _open(null, data);
        }
    }

    /**
     * @method private
     * @name _buildList
     * @description Generate autocompleter-list and update instance data by source
     * @param list [object] "Source data"
     * @param data [object] "Instance data"
     */
    function _buildList(list, data) {
        var menu = '';

        for (var item = 0, count = list.length; item < count; item++) {
            var classes = ["autocompleter-item"];

            if (data.selectFirst && item === 0 && !data.changeWhenSelect) {
                classes.push("autocompleter-item-selected");
            }

            var highlightReg = new RegExp(data.query, "gi");
            var label = (data.customLabel && list[item][data.customLabel]) ? list[item][data.customLabel] : list[item].label;

            var clear = label;

            label = data.highlightMatches ? label.replace(highlightReg, "<strong>$&</strong>") : label;

            var value = (data.customValue && list[item][data.customValue]) ? list[item][data.customValue] : list[item].value;

            // Apply custom template
            if (data.template) {
                var template = data.template.replace(/({{ label }})/gi, label);

                for (var property in list[item]) {
                    if (list[item].hasOwnProperty(property)) {
                        var regex = new RegExp('{{ '+ property +' }}', 'gi');
                        template = template.replace(regex, list[item][property]);
                    }
                }

                label = template;
            }

            if (value) {
                menu += '<li data-value="'+value+'" data-label="'+clear+'" class="'+classes.join(' ')+'">'+label+'</li>';
            } else {
                menu += '<li data-label="'+clear+'" class="'+classes.join(' ')+'">'+label+'</li>';
            }
        }

        // Set hint
        if (list.length && data.hint) {
            var hint = ( list[0].label.substr(0, data.query.length).toUpperCase() === data.query.toUpperCase() ) ? list[0].label : false;
            if (hint && (data.query !== list[0].label)) {
                var hintReg = new RegExp(data.query, "i");
                var hintText = hint.replace(hintReg, "<span>"+data.query+"</span>");
                data.$autocompleter.find('.autocompleter-hint').addClass('autocompleter-hint-show').html(hintText);
                data.hintText = hintText;
            }
        }

        // Update data
        data.response = list;
        data.$autocompleter.find(".autocompleter-list").html(menu);
        data.$selected = (data.$autocompleter.find(".autocompleter-item-selected").length) ? data.$autocompleter.find(".autocompleter-item-selected") : null;
        data.$list = (list.length) ? data.$autocompleter.find(".autocompleter-item") : null;
        data.index = data.$selected ? data.$list.index(data.$selected) : -1;
        data.$autocompleter.find(".autocompleter-item").each(function (i, j) {
            $(j).data(data.response[i]);
        });
    }

    /**
     * @method private
     * @name _onKeyup
     * @description Keyup events in node, up/down autocompleter-list navigation, typing and enter button callbacks
     * @param e [object] "Event data"
     */
    function _onKeyup(e) {
        var data = e.data;
        var code = e.keyCode ? e.keyCode : e.which;

        if ( (code === 40 || code === 38) && data.$autocompleter.hasClass('autocompleter-show') ) {
            // Arrows up & down
            var len = data.$list.length,
                next,
                prev;

            if (len) {
                // Determine new index
                if (len > 1) {
                    if (data.index === len - 1) {
                        next = data.changeWhenSelect ? -1 : 0;
                        prev = data.index - 1;
                    } else if (data.index === 0) {
                        next = data.index + 1;
                        prev = data.changeWhenSelect ? -1 : len - 1;
                    } else if (data.index === -1) {
                        next = 0;
                        prev = len - 1;
                    } else {
                        next = data.index + 1;
                        prev = data.index - 1;
                    }
                } else if (data.index === -1) {
                    next = 0;
                    prev = 0;
                } else {
                    prev = -1;
                    next = -1;
                }
                data.index = (code === 40) ? next : prev;

                // Update HTML
                data.$list.removeClass("autocompleter-item-selected");
                if (data.index !== -1) {
                    data.$list.eq(data.index).addClass("autocompleter-item-selected");
                }
                data.$selected = data.$autocompleter.find(".autocompleter-item-selected").length ? data.$autocompleter.find(".autocompleter-item-selected") : null;
                if (data.changeWhenSelect) {
                    _setValue(data);
                }
            }
        } else if ($.inArray(code, ignoredKeyCode) === -1 && $.inArray(code, data.ignoredKeyCode) === -1) {
            // Typing
            _launch(data);
        }
    }

    /**
     * @method private
     * @name _onKeydownHelper
     * @description Keydown events in node, up/down for prevent cursor moving and right arrow for hint
     * @param e [object] "Event data"
     */
    function _onKeydownHelper(e) {
        var code = e.keyCode ? e.keyCode : e.which;
        var data = e.data;

        if (code === 40 || code === 38 ) {
            e.preventDefault();
            e.stopPropagation();
        } else if (code === 39) {
            // Right arrow
            if (data.hint && data.hintText && data.$autocompleter.find('.autocompleter-hint').hasClass('autocompleter-hint-show')) {
                e.preventDefault();
                e.stopPropagation();

                var hintOrigin = data.$autocompleter.find(".autocompleter-item").length ? data.$autocompleter.find(".autocompleter-item").eq(0).attr('data-label') : false;
                if (hintOrigin) {
                    data.query = hintOrigin;
                    _setHint(data);
                }
            }
        } else if (code === 13) {
            // Enter
            if (data.$autocompleter.hasClass('autocompleter-show') && data.$selected) {
                _select(e);
            }
        }
    }

    /**
     * @method private
     * @name _onFocus
     * @description Handles instance focus
     * @param e [object] "Event data"
     * @param internal [boolean] "Called by plugin"
     */
    function _onFocus(e, internal) {
        if (!internal) {
            var data = e.data;

            data.$autocompleter.addClass("autocompleter-focus");

            if (!data.$node.prop("disabled") && !data.$autocompleter.hasClass('autocompleter-show')) {
                if (data.focusOpen) {
                    _launch(data);
                    data.focused = true;
                    setTimeout(function () {
                        data.focused = false;
                    }, 500);
                }
            }
        }
    }

    /**
     * @method private
     * @name _onBlur
     * @description Handles instance blur
     * @param e [object] "Event data"
     * @param internal [boolean] "Called by plugin"
     */
    function _onBlur(e, internal) {
        e.preventDefault();
        e.stopPropagation();

        var data = e.data;

        if (!internal) {
            data.$autocompleter.removeClass("autocompleter-focus");
            _close(e);
        }
    }

    /**
     * @method private
     * @name _onMousedown
     * @description Handles mousedown to node
     * @param e [object] "Event data"
     */
    function _onMousedown(e) {
        // Disable middle & right mouse click
        if (e.type === "mousedown" && $.inArray(e.which, [2, 3]) !== -1) { return; }

        var data = e.data;
        if (data.$list && !data.focused) {
            if (!data.$node.is(":disabled")) {
                if (isMobile && !isFirefoxMobile) {
                    var el = data.$select[0];
                    if (window.document.createEvent) { // All
                        var evt = window.document.createEvent("MouseEvents");
                        evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        el.dispatchEvent(evt);
                    } else if (el.fireEvent) { // IE
                        el.fireEvent("onmousedown");
                    }
                } else {
                    // Delegate intent
                    if (data.$autocompleter.hasClass("autocompleter-closed")) {
                        _open(e);
                    } else if (data.$autocompleter.hasClass("autocompleter-show")) {
                        _close(e);
                    }
                }
            }
        }
    }

    /**
     * @method private
     * @name _open
     * @description Opens option set
     * @param e [object] "Event data"
     * @param instanceData [object] "Instance data"
     */
    function _open(e, instanceData) {
        var data = e ? e.data : instanceData;

        if (!data.$node.prop("disabled") && !data.$autocompleter.hasClass("autocompleter-show") && data.$list && data.$list.length ) {
            data.$autocompleter.removeClass("autocompleter-closed").addClass("autocompleter-show");
            $body.on("click.autocompleter-" + data.guid, ":not(.autocompleter-item)", data, _closeHelper);
        }
    }

    /**
     * @method private
     * @name _closeHelper
     * @description Determines if event target is outside instance before closing
     * @param e [object] "Event data"
     */
    function _closeHelper(e) {
        if ( $(e.target).hasClass('autocompleter-node') ) {
            return;
        }

        if ($(e.currentTarget).parents(".autocompleter").length === 0) {
            _close(e);
        }
    }

    /**
     * @method private
     * @name _close
     * @description Closes option set
     * @param e [object] "Event data"
     * @param instanceData [object] "Instance data"
     */
    function _close(e, instanceData) {
        var data = e ? e.data : instanceData;

        if (data.$autocompleter.hasClass("autocompleter-show")) {
            data.$autocompleter.removeClass("autocompleter-show").addClass("autocompleter-closed");
            $body.off(".autocompleter-" + data.guid);
        }
    }

    /**
     * @method private
     * @name _select
     * @description Select item from .autocompleter-list
     * @param e [object] "Event data"
     */
    function _select(e) {
        // Disable middle & right mouse click
        if (e.type === "mousedown" && $.inArray(e.which, [2, 3]) !== -1) { return; }

        var data = e.data;

        e.preventDefault();
        e.stopPropagation();

        if (e.type === "mousedown" && $(this).length) {
            data.$selected = $(this);
            data.index = data.$list.index(data.$selected);
        }

        if (!data.$node.prop("disabled")) {
            _close(e);
            _update(data);

            if (e.type === "click") {
                data.$node.trigger("focus", [true]);
            }
        }
    }

    /**
     * @method private
     * @name _setHint
     * @description Set autocompleter by hint
     * @param data [object] "Instance data"
     */
    function _setHint(data) {
        _setValue(data);
        _handleChange(data);
        _launch(data);
    }

    /**
     * @method private
     * @name _setValue
     * @description Set value for native field
     * @param data [object] "Instance data"
     */
    function _setValue(data) {
        if (data.$selected) {
            if (data.hintText && data.$autocompleter.find('.autocompleter-hint').hasClass('autocompleter-hint-show')) {
                data.$autocompleter.find('.autocompleter-hint').removeClass('autocompleter-hint-show');
            }
            var value = data.$selected.attr('data-value') ? data.$selected.attr('data-value') : data.$selected.attr('data-label');
            data.$node.val(value);
        } else {
            if (data.hintText && !data.$autocompleter.find('.autocompleter-hint').hasClass('autocompleter-hint-show')) {
                data.$autocompleter.find('.autocompleter-hint').addClass('autocompleter-hint-show');
            }
            data.$node.val(data.query);
        }
    }

    /**
     * @method private
     * @name _update
     * @param data [object] "Instance data"
     */
    function _update(data) {
        _setValue(data);
        _handleChange(data);
        _clear(data);
    }

    /**
     * @method private
     * @name _handleChange
     * @description Trigger node change event and call the callback function
     * @param data [object] "Instance data"
     */
    function _handleChange(data) {
        data.callback.call(data.$autocompleter, data.$node.val(), data.index, data.response[data.index]);
        data.$node.trigger("change");
    }

    /**
     * @method private
     * @name _grab
     * @description Grab sub-object from object
     * @param response [object] "Native object"
     * @param offset [string] "Offset string"
     */
    function _grab(response, offset) {
        offset = offset.split('.');
        while ( response && offset.length ) {
            response = response[offset.shift()];
        }
        return response;
    }

    /**
     * @method private
     * @name _getCache
     * @description Store AJAX response in plugin cache
     * @param url [string] "AJAX get query string"
     * @param data [object] "AJAX response data"
     */
    function _setCache(url, data) {
        if (!supportLocalStorage) { return; }
        if (url && data) {
            cache[url] = {
                value: data
            };

            // Proccess to localStorage
            try {
                  localStorage.setItem(localStorageKey, JSON.stringify(cache));
            } catch (e) {
                  var code = e.code || e.number || e.message;
                  if (code === 22) {
                    _deleteCache();
                  } else {
                    throw(e);
                  }
            }
        }
    }

    /**
     * @method private
     * @name _getCache
     * @description Get cached data by url if exist
     * @param url [string] "AJAX get query string"
     */
    function _getCache(url) {
        if (!url) { return; }
        var response = (cache[url] && cache[url].value) ? cache[url].value : false;
        return response;
    }

    /**
     * @method private
     * @name _loadCache
     * @description Load all plugin cache from localStorage
     */
    function _loadCache() {
        if (!supportLocalStorage) { return; }
        var json = localStorage.getItem(localStorageKey) || '{}';
        return JSON.parse(json);
    }

    /**
	 * @method private
     * @name _deleteCache
     * @description Delete all plugin cache from localStorage
     */
    function _deleteCache() {
        try {
            localStorage.removeItem(localStorageKey);
            cache = _loadCache();
        } catch (e) {
            throw(e);
        }
    }

    /**
     * @method private
     * @name _clone
     * @description Clone JavaScript object
     */
    function _clone(obj) {
        if (null === obj || "object" !== typeof obj) {
            return obj;
        }
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }
        return copy;
    }

    // Load cache
    var cache = _loadCache();

    $.fn.autocompleter = function (method) {
        if (publics[method]) {
            return publics[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return _init.apply(this, arguments);
        }
        return this;
    };

    $.autocompleter = function (method) {
        if (method === "defaults") {
            publics.defaults.apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (method === "clearCache") {
            publics.clearCache.apply(this, null);
        }
    };
})(jQuery, window);



var TouchSlide = function(a) {
    a = a || {};
    var b = {
        slideCell: a.slideCell || "#touchSlide",
        titCell: a.titCell || ".hd li",
        mainCell: a.mainCell || ".bd",
        effect: a.effect || "left",
		direction: a.direction || "vertical",
        autoPlay: a.autoPlay || !1,
        delayTime: a.delayTime || 200,
        interTime: a.interTime || 2500,
        defaultIndex: a.defaultIndex || 0,
        titOnClassName: a.titOnClassName || "on",
        autoPage: a.autoPage || !1,
        prevCell: a.prevCell || ".prev",
        nextCell: a.nextCell || ".next",
        pageStateCell: a.pageStateCell || ".pageState",
        pnLoop: "undefined " == a.pnLoop ? !0 : a.pnLoop,
        startFun: a.startFun || null,
        endFun: a.endFun || null,
        switchLoad: a.switchLoad || null
    },
    c = document.getElementById(b.slideCell.replace("#", ""));
    if (!c) return ! 1;
    var d = function(a, b) {
        a = a.split(" ");
        var c = [];
        b = b || document;
        var d = [b];
        for (var e in a) 0 != a[e].length && c.push(a[e]);
        for (var e in c) {
            if (0 == d.length) return ! 1;
            var f = [];
            for (var g in d) if ("#" == c[e][0]) f.push(document.getElementById(c[e].replace("#", "")));
            else if ("." == c[e][0]) for (var h = d[g].getElementsByTagName("*"), i = 0; i < h.length; i++) {
                var j = h[i].className;
                j && -1 != j.search(new RegExp("\\b" + c[e].replace(".", "") + "\\b")) && f.push(h[i])
            } else for (var h = d[g].getElementsByTagName(c[e]), i = 0; i < h.length; i++) f.push(h[i]);
            d = f
        }
        return 0 == d.length || d[0] == b ? !1 : d
    },
    e = function(a, b) {
        var c = document.createElement("div");
        c.innerHTML = b,
        c = c.children[0];
        var d = a.cloneNode(!0);
        return c.appendChild(d),
        a.parentNode.replaceChild(c, a),
        m = d,
        c
    },
    g = function(a, b) { ! a || !b || a.className && -1 != a.className.search(new RegExp("\\b" + b + "\\b")) || (a.className += (a.className ? " ": "") + b)
    },
    h = function(a, b) { ! a || !b || a.className && -1 == a.className.search(new RegExp("\\b" + b + "\\b")) || (a.className = a.className.replace(new RegExp("\\s*\\b" + b + "\\b", "g"), ""))
    },
    i = b.effect,
    j = d(b.prevCell, c)[0],
    k = d(b.nextCell, c)[0],
    l = d(b.pageStateCell)[0],
    m = d(b.mainCell, c)[0];
    if (!m) return ! 1;
    var N, O, n = m.children.length,
    o = d(b.titCell, c),
    p = o ? o.length: n,
    q = b.switchLoad,
    r = parseInt(b.defaultIndex),
    s = parseInt(b.delayTime),
    t = parseInt(b.interTime),
    u = "false" == b.autoPlay || 0 == b.autoPlay ? !1 : !0,
    v = "false" == b.autoPage || 0 == b.autoPage ? !1 : !0,
    w = "false" == b.pnLoop || 0 == b.pnLoop ? !1 : !0,
    x = r,
    y = null,
    z = null,
    A = null,
    B = 0,
    C = 0,
    D = 0,
    E = 0,
    G = /hp-tablet/gi.test(navigator.appVersion),
    H = "ontouchstart" in window && !G,
    I = H ? "touchstart": "mousedown",
    J = H ? "touchmove": "",
    K = H ? "touchend": "mouseup",
    M = m.parentNode.clientWidth,
    P = n;
    if (0 == p && (p = n), v) {
        p = n,
        o = o[0],
        o.innerHTML = "";
        var Q = "";
        if (1 == b.autoPage || "true" == b.autoPage) for (var R = 0; p > R; R++) Q += "<li>" + (R + 1) + "</li>";
        else for (var R = 0; p > R; R++) Q += b.autoPage.replace("$", R + 1);
        o.innerHTML = Q,
        o = o.children
    }
    "leftLoop" == i && (P += 2, m.appendChild(m.children[0].cloneNode(!0)), m.insertBefore(m.children[n - 1].cloneNode(!0), m.children[0])),
    N = e(m, '<div class="tempWrap" style="overflow:hidden; position:relative;"></div>'),
    m.style.cssText = "width:" + P * M + "px;" + "position:relative;overflow:hidden;padding:0;margin:0;";
    for (var R = 0; P > R; R++) m.children[R].style.cssText = "display:table-cell;vertical-align:top;width:" + M + "px";
    var S = function() {
        "function" == typeof b.startFun && b.startFun(r, p)
    },
    T = function() {
        "function" == typeof b.endFun && b.endFun(r, p)
    },
    U = function(a) {
        var b = ("leftLoop" == i ? r + 1 : r) + a,
        c = function(a) {
            for (var b = m.children[a].getElementsByTagName("img"), c = 0; c < b.length; c++) b[c].getAttribute(q) && (b[c].setAttribute("src", b[c].getAttribute(q)), b[c].removeAttribute(q))
        };
        if (c(b), "leftLoop" == i) switch (b) {
        case 0:
            c(n);
            break;
        case 1:
            c(n + 1);
            break;
        case n:
            c(0);
            break;
        case n + 1 : c(1)
        }
    },
    V = function() {
        M = N.clientWidth,
        m.style.width = P * M + "px";
        for (var a = 0; P > a; a++) m.children[a].style.width = M + "px";
        var b = "leftLoop" == i ? r + 1 : r;
        W( - b * M, 0)
    };
    window.addEventListener("resize", V, !1);
    var W = function(a, b, c) {
        c = c ? c.style: m.style,
        c.webkitTransitionDuration = c.MozTransitionDuration = c.msTransitionDuration = c.OTransitionDuration = c.transitionDuration = b + "ms",
        c.webkitTransform = "translate(" + a + "px,0)" + "translateZ(0)",
        c.msTransform = c.MozTransform = c.OTransform = "translateX(" + a + "px)"
    },
    X = function(a) {
        switch (i) {
        case "left":
            r >= p ? r = a ? r - 1 : 0 : 0 > r && (r = a ? 0 : p - 1),
            null != q && U(0),
            W( - r * M, s),
            x = r;
            break;
        case "leftLoop":
            null != q && U(0),
            W( - (r + 1) * M, s),
            -1 == r ? (z = setTimeout(function() {
                W( - p * M, 0)
            },
            s), r = p - 1) : r == p && (z = setTimeout(function() {
                W( - M, 0)
            },
            s), r = 0),
            x = r
        }
        S(),
        A = setTimeout(function() {
            T()
        },
        s);
        for (var c = 0; p > c; c++) h(o[c], b.titOnClassName),
        c == r && g(o[c], b.titOnClassName);
        0 == w && (h(k, "nextStop"), h(j, "prevStop"), 0 == r ? g(j, "prevStop") : r == p - 1 && g(k, "nextStop")),
        l && (l.innerHTML = "<span>" + (r + 1) + "</span>/" + p)
    };
    if (X(), u && (y = setInterval(function() {
        r++,
        X()
    },
    t)), o) for (var R = 0; p > R; R++) !
    function() {
        var a = R;
        o[a].addEventListener("click",
        function() {
            clearTimeout(z),
            clearTimeout(A),
            r = a,
            X()
        })
    } ();
    k && k.addEventListener("click",
    function() { (1 == w || r != p - 1) && (clearTimeout(z), clearTimeout(A), r++, X())
    }),
    j && j.addEventListener("click",
    function() { (1 == w || 0 != r) && (clearTimeout(z), clearTimeout(A), r--, X())
    });
    var Y = function(a) {
        clearTimeout(z),
        clearTimeout(A),
        O = void 0,
        D = 0;
        var b = H ? a.touches[0] : a;
        B = b.pageX,
        C = b.pageY,
        m.addEventListener(J, Z, !1),
        m.addEventListener(K, $, !1)
    },
    Z = function(a) {
        if (!H || !(a.touches.length > 1 || a.scale && 1 !== a.scale)) {
            var b = H ? a.touches[0] : a;
            if (D = b.pageX - B, E = b.pageY - C, "undefined" == typeof O && (O = !!(O || Math.abs(D) < Math.abs(E))), !O) {
                switch (a.preventDefault(), u && clearInterval(y), i) {
                case "left":
                    (0 == r && D > 0 || r >= p - 1 && 0 > D) && (D = .4 * D),
                    W( - r * M + D, 0);
                    break;
                case "leftLoop":
                    W( - (r + 1) * M + D, 0)
                }
                null != q && Math.abs(D) > M / 3 && U(D > -0 ? -1 : 1)
            }
        }
    },
    $ = function(a) {
        0 != D && (a.preventDefault(), O || (Math.abs(D) > M / 10 && (D > 0 ? r--:r++), X(!0), u && (y = setInterval(function() {
            r++,
            X()
        },
        t))), m.removeEventListener(J, Z, !1), m.removeEventListener(K, $, !1))
    };
    m.addEventListener(I, Y, !1)
};



(function($){
    $.fn.FontScroll = function(options){
        var d = {time: 3000,s: 'fontColor',num: 1}
        var o = $.extend(d,options);
        

        this.children('ul').addClass('line');
        var _con = $('.line').eq(0);
        var _conH = _con.height(); //锟斤拷锟斤拷锟杰高讹拷
        // var _conChildH = _con.children().eq(0).height();//一锟轿癸拷锟斤拷锟竭讹拷
        var _conChildH = 40;
        var _temp = _conChildH;  //锟斤拷时锟斤拷锟斤拷
        var _time = d.time;  //锟斤拷锟斤拷锟斤拷锟�
        var _s = d.s;  //锟斤拷锟斤拷锟斤拷锟�


        _con.clone().insertAfter(_con);//锟斤拷始锟斤拷锟斤拷隆

        //锟斤拷式锟斤拷锟斤拷
        var num = d.num;
        var _p = this.find('li');
        var allNum = _p.length;

        _p.eq(num).addClass(_s);


        var timeID = setInterval(Up,_time);
		this.hover(function(){clearInterval(timeID)},function(){timeID = setInterval(Up,_time);});

        function Up(){
            _con.animate({marginTop: '-'+_conChildH});
            //锟斤拷式锟斤拷锟斤拷
            _p.removeClass(_s);
            num += 1;
            _p.eq(num).addClass(_s);
            
            if(_conH == _conChildH){
                _con.animate({marginTop: '-'+_conChildH},"normal",over);
            } else {
                _conChildH += _temp;
            }
        }
        function over(){
            _con.attr("style",'margin-top:0');
            _conChildH = _temp;
            num = 1;
            _p.removeClass(_s);
            _p.eq(num).addClass(_s);
        }
    }
})(jQuery);




//璺戦┈鐏晥鏋�
var scrlSpeed=1  
		// decreasing speed for mozilla  
		scrlSpeed=(document.all)? scrlSpeed : Math.max(1, scrlSpeed-1)  
		function initScroll(container,object){  
		    if (document.getElementById(container) != null){  
		        var contObj=document.getElementById(container);  
		        var obj=document.getElementById(object);  
		        contObj.style.visibility = "visible";  
		        contObj.scrlSpeed = scrlSpeed;  
		        widthContainer = contObj.offsetWidth;  
		        obj.style.left=parseInt(widthContainer)+"px";  
		        widthObject=obj.offsetWidth;  
		        interval=setInterval("objScroll('"+ container +"','"+ object +"',"+ widthContainer +")",20);  
		        contObj.onmouseover = function(){  
		            contObj.scrlSpeed=0;  
		        }  
		        contObj.onmouseout = function(){  
		            contObj.scrlSpeed=scrlSpeed;  
		        }   
		    }  
		}  
		  
		function objScroll(container,object,widthContainer){  
		    var contObj=document.getElementById(container);  
		    var obj=document.getElementById(object);  
		    widthObject=obj.offsetWidth;  
		    if (parseInt(obj.style.left)>(widthObject*(-1))){  
		        obj.style.left=parseInt(obj.style.left)-contObj.scrlSpeed+"px";  
		    } else {  
		        obj.style.left=parseInt(widthContainer)+"px";  
		    }  
		}  
		  		  
	// on page load we initiate scrolling  
window.onload=function(){   
	initScroll("scrlContainer", "scrlContent"); 
}  

 
var tempradio= null;    
function check(checkedRadio)    
{    
  if(tempradio== checkedRadio){  
    tempradio.checked=false;  
    tempradio=null;  
  }   
  else{  
    tempradio= checkedRadio;    
  }  
}

$(function(){
    $('#FontScroll').FontScroll({time: 3000,num: 1});
 });

$(function(){
 
	
	
//	var old = null; //鐢ㄦ潵淇濆瓨鍘熸潵鐨勫璞�  
//	$("input[name='yhq']").each(function(){//寰幆缁戝畾浜嬩欢  
//	    if(this.checked){  
//	        old = this; //濡傛灉褰撳墠瀵硅薄閫変腑锛屼繚瀛樿瀵硅薄  
//	    }  
//	    this.onclick = function(){  
//	        if(this == old){//濡傛灉鐐瑰嚮鐨勫璞″師鏉ユ槸閫変腑鐨勶紝鍙栨秷閫変腑  
//	            this.checked = false;  
//	            old = null;  
//	        } else{  
//	            old = this;  
//	        }  
//	    }  
//	}); 
	
	//banner婊戝姩
	TouchSlide({ 
		slideCell:"#slideBox",titCell:".hd ul", mainCell:".bd ul", effect:"leftLoop", delayTime:"500",interTime:"3000",autoPage:true,autoPlay:true 
	});

	//杈撳叆鎵嬫満鍙风爜鍖归厤閫氳褰�
	$('.cz_num input').click(function(){
		$('.cz_num span.hmms').hide();
		$(this).attr('placeholder','');
		$('.num_list').show();
		$('.num_list ul li').click(function(){
			var nb = $(this).find('p').text();
			var nm = $(this).find('span').text();
			$('.cz_num input').val(nb);
			//$('.cz_num input').attr('placeholder','138 1384');
			$('.hmms').text(nm);
			$('.hmms').show();
			$('.num_list').hide();
		})
		
	})

	$('.cz_num input').keyup(function(){
		$('.num_error').show();
		$('.num_error ul li p').click(function(){
			var nb1 = $(this).text();
			var nm1 = $(this).next().next().text();
			$('.cz_num input').val(nb1);
			//$('.cz_num input').attr('placeholder','138 1384');
			$('.hmms').text(nm1);
			$('.hmms').show();
			$('.num_error').hide();
		})
		$('.p_close').click(function(){
			$('.num_error').hide();
		})

	})
	
	//灞曞紑鏀惰捣
	//var onoff = true;
	$('.zj_text ul li a').click(function(){
		$(this).find('span').toggle();
		$(this).parent().find('p.p2').slideToggle();
		if($(this).parent().attr("class")=="l_bod"){
            $(this).parent().removeClass('l_bod')
			$(this).parent().addClass('active');	
			$(this).parent().find('p.p1').css('color','#fe7519')
			//$(this).find('a').children('span').show();
		    $(this).parent().find('p.p2').show();
		    //$(this).find('.arrow-down').hide();
		     //$(this).find('.arrow-up').show();
        }

  	else{
  		    $(this).parent().removeClass('active');
			$(this).parent().addClass('l_bod');
			$(this).parent().find('p.p1').css('color','#1c92d5')
          // $(this).find('a').children('span').hide();
		    $(this).parent().find('p.p2').hide();
		   
		    //$(this).find('.arrow-up').show();
		    //$(this).find('.arrow-down').hide();
  	    }
	})

//	//鍏呭€奸€変腑閲戦(WSCZGB.js涓璦as鎺у埗)
//	$('.czje-sel ul li').bind('click',function(){
//
//				$(this).siblings().removeClass('sel');
//				$(this).addClass('sel');
//				//$('.czxx > .tsxx').eq($('.czje ul li').index(this)).show().siblings().hide();
//				
//			});

	//浼樻儬娲诲姩閫夐」鍗�
	$('.ya_tab ul li').click(function(){
		$(this).addClass('act').siblings().removeClass('act');
		$('.yhact_con > .yh').eq($('.ya_tab ul li').index(this)).show().siblings().hide();
		$('.czje_con > .czje').eq($('.ya_tab ul li').index(this)).show().siblings().hide();

	})


	//鏀粯鏂瑰紡灞曞紑鏀惰捣
	$('.t_arr').click(function(){
		$('.d_hide').slideToggle();
		$(this).find('i').toggle();
		$(this).find('span').toggle();
	})

    
	$('.tab_way ul li').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		$('.cz_text > .way').hide();
		$('.cz_text > .way').eq($('.tab_way ul li').index(this)).show();
		if($('.tab_way ul li').eq(0).hasClass('cur')){
			$('.notice').show();
		}
		else{
			$('.notice').hide();
		}
		if($(this).html() == "鐗╄仈缃戝厖鍊�") {
			$("#firstIndexDiv div").eq(1).hide();
		}else{
			$("#firstIndexDiv div").eq(1).show();
		}
	})
	
	$('#wlwAmount ul li').bind('click',function(){
        $(this).siblings().removeClass('sel');
        $(this).addClass('sel');
    })



	var op = $('.num_list ul li p').text();


})



/*window.onload = function(){
	var oInput = document.getElementById('nope');
	var oList = document.getElementById('num_list');
	var oP = oList.getElementsByTagName('p');
	alert(oP[0])
	oInput.onclick =function(){
		for(var i =0; i<oP[i].length; i++){
			alert(oP[i]);
		}
	}


}
*/









