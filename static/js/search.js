'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

(function () {
    'use strict';

    updateRooms(ROOT);
    function updateRooms(room) {
        var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        room.items.forEach(function (item, index) {
            item.index = index;
            updateRooms(item, depth + 1);
        });
    }

    // menu item
    Vue.component('menu-item', {
        delimiters: ['${', '}'],
        props: ['room', 'pathToParent'],
        template: '#menu-item-tpl',
        methods: {
            getRoomUrl: function getRoomUrl() {
                var pathToRoot = Array(DEPTH).join('../');
                return './' + pathToRoot + 'tpls/' + this.pathToRoom + 'index.html';
            }
        },
        computed: {
            pathToRoom: function pathToRoom() {
                return '' + (this.pathToParent || '') + this.room.index + '/';
            },
            isActive: function isActive() {
                // TODO: must be better way of doing this
                var href = this.getRoomUrl().replace(/.+?(?=\/tpls)/, '');
                return document.URL.indexOf(href) !== -1;
            }
        }
    });

    // Sidebar
    new Vue({
        delimiters: ['${', '}'],
        el: '#sidebar',
        data: {
            root: ROOT,
            search: '',
            mounted: false,
            isSearchFocused: false
        },
        mounted: function mounted() {
            this.mounted = true;
            this.focusSearch();
        },

        computed: {
            /**
             * Return rooms which title or children title contains search query.
             * Nesting is preserved
             *
             * @returns {Array} - root items which satisfy query
             */
            filteredItems: function filteredItems() {
                var query = this.search.toLowerCase().trim();
                var filteredRoot = _traverse(_extends({}, this.root, { title: '' }));
                return filteredRoot ? filteredRoot.items : [];

                function _traverse(room) {
                    // return whole room with items if title matches
                    if (room.title.toLowerCase().indexOf(query) > -1) {
                        return room;
                    }
                    // find items that match
                    var items = room.items.reduce(function (acc, item) {
                        var traversedItem = _traverse(item);
                        if (traversedItem) {
                            acc.push(traversedItem);
                        }
                        return acc;
                    }, []);
                    // return room with only those items, that match
                    if (items.length > 0) {
                        return _extends({}, room, { items: items });
                    }
                }
            }
        },
        methods: {
            clearSearch: function clearSearch() {
                this.search = '';
                this.focusSearch();
            },
            focusSearch: function focusSearch() {
                this.$refs.search.focus();
            }
        }
    });
})();