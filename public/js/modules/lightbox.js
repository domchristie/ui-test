(function() {
  LP.lightbox = (function() {
    var $content, $document, $overlay, close, open, setContent, _positionContent;

    $overlay = $('<div class="lightbox" />');
    $content = $('<div class="lightbox__content">');
    $overlay.append($content);
    open = function(content) {
      if (content) {
        setContent(content);
      }
      $('body').append($overlay);
      return _positionContent();
    };
    close = function() {
      return $overlay.remove();
    };
    setContent = function(content) {
      $content.html(content);
      return _positionContent();
    };
    _positionContent = function() {
      return $content.css({
        marginTop: -$content.outerHeight() / 2,
        marginLeft: -$content.outerWidth() / 2
      });
    };
    $document = $(document);
    $document.on('click', '[data-lightbox-img]', function(evt) {
      evt.preventDefault();
      return open($("<img src=" + ($(this).data('lightbox-img')) + " />"));
    });
    $document.on('click', '.lightbox', function(evt) {
      if (evt.target === this) {
        return close();
      }
    });
    $document.on('keyup', function(evt) {
      if (evt.keyCode === 13 || evt.keyCode === 27) {
        return close();
      }
    });
    return {
      open: open,
      close: close,
      setContent: setContent
    };
  })();

}).call(this);
