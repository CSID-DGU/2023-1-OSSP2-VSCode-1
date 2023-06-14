$(document).ready(function () {
    var initialMouseX = 0;
    var initialMouseY = 0;
    var initialScrollX = 0;
    var initialScrollY = 0;
    var isDragging = false;

    $(document).on('mousedown', function (event) {
        initialMouseX = event.clientX;
        initialMouseY = event.clientY;
        initialScrollX = $(window).scrollLeft();
        initialScrollY = $(window).scrollTop();
        isDragging = true;

        // Change the cursor shape to "grabbing" during dragging
        $('#trainLine').css('cursor', 'move');

        // Disable text selection during dragging
        $(document).on('selectstart dragstart', false);
    });

    $(document).on('mousemove', function (event) {
        if (isDragging) {
            var deltaX = event.clientX - initialMouseX;
            var deltaY = event.clientY - initialMouseY;
            $(window).scrollLeft(initialScrollX - deltaX);
            $(window).scrollTop(initialScrollY - deltaY);
        }
    });

    $(document).on('mouseup', function () {
        isDragging = false;

        // Change the cursor shape back to default after dragging
        $('#trainLine').css('cursor', 'auto');

        // Enable text selection after dragging
        $(document).off('selectstart dragstart');
    });
});

