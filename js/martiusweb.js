// smooth scroll
/*! http://mths.be/smoothscroll v1.5.2 by @mathias */
;(function(document, $) {

    var $scrollElement = (function() {
        // Find out what to scroll (html or body)
            var $html = $(document.documentElement),
                $body = $(document.body),
                bodyScrollTop;
            if ($html.scrollTop()) {
                return $html;
            } else {
                bodyScrollTop = $body.scrollTop();
                // If scrolling the body doesn’t do anything
                if ($body.scrollTop(bodyScrollTop + 1).scrollTop() == bodyScrollTop) {
                    return $html;
                } else {
                    // We actually scrolled, so undo it
                    return $body.scrollTop(bodyScrollTop);
                }
            }
        }());

    $.fn.smoothScroll = function(speed) {
        speed = ~~speed || 400;
        // Look for links to anchors (on any page)
        return this.find('a[href*="#"]').click(function(event) {
            var hash = this.hash,
                $hash = $(hash); // The in-document element the link points to
            // If it’s a link to an anchor in the same document
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                // If the anchor actually exists…
                if ($hash.length) {
                    // …don’t jump to the link right away…
                    event.preventDefault();
                    var dest = (hash == '#home') ? 0 : $hash.offset().top;
                    // …and smoothly scroll to it
                    $scrollElement.stop().animate({ 'scrollTop': dest }, speed, function() {
                        location.hash = hash;
                    });
                }
            }
        }).end();
    };

}(document, jQuery));

// Martiusweb
(function($) {

$('html').smoothScroll(400);

// Open external links in new tabs
$('a:link').each(function() {
    if(this.href.indexOf(window.location.host) == -1)
        $(this).click(function(e) {
            window.open(this.href);
            e.preventDefault();
        });
});

// Sticky header :)
var sticky = false, $sticky = $('#sticky-wrap');;

var setSticky = function() {
    var $header = $('header');
    var origOffsetY = $('header .navbar')[0].offsetTop - 8;
    $sticky.css('paddingTop', $header.height());

    $(window).on('scroll.sticky', function() {
      if(window.scrollY >= origOffsetY) {
            $header.addClass('sticky');
            $header.css('top', '-' + origOffsetY + 'px');
      }
      else {
            $header.removeClass('sticky');
            $header.css('top', 0);
      }
    });

    Sticky = true;
};

if($(document).width() > 767) {
    setSticky();
}
$(window).on('resize', function() {
    if($(document).width() > 767) {
        if(!sticky) {
            setSticky();
        }
    }
    else {
        $('#sticky-wrap').css('paddingTop', 0);
        $(window).off('scroll.sticky');
    }
});

})(window.jQuery);
