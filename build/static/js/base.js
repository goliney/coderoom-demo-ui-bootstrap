'use strict';

var editor;

(function () {
    'use strict';

    var $contentEl = $('#content');
    var $editorEl = $('#editor');
    var $iframeEl = $('#iframe');
    var $backdrop = $('#backdrop');

    activateResizable();

    function activateResizable() {
        var minWidth = 200;
        var $handle = $('#resize-handle');

        $handle.bind('mousedown', function (e) {
            var initialX = e.pageX;
            var contentWidth = $contentEl.outerWidth();
            var iframeWidth = $iframeEl.outerWidth();
            var editorWidth = $editorEl.outerWidth();

            $backdrop.removeClass('hidden');
            $backdrop.bind({
                mousemove: function mousemove(e) {
                    var delta = initialX - e.pageX;
                    if (editorWidth - delta > minWidth && iframeWidth + delta > minWidth) {
                        var percentage = (iframeWidth + delta) * 100 / contentWidth;
                        $iframeEl.css('width', percentage + '%');
                        editor.resize();
                    }
                },
                mouseup: function mouseup() {
                    $backdrop.off('mousemove mouseup');
                    $backdrop.addClass('hidden');
                }
            });
        });
    }
})();