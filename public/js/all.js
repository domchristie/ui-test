(function() {
  window.LP = {};

}).call(this);

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

(function() {
  LP.ReadMoreWidget = (function() {
    function ReadMoreWidget($el) {
      this.$el = $el;
      this._getElDimensions();
      if (this.expandedHeight > this.contractedHeight) {
        this._appendButton();
      }
    }

    ReadMoreWidget.prototype.expand = function() {
      this.$el.css({
        maxHeight: 'none'
      });
      this._isExpanded = true;
      return this._setButtonText();
    };

    ReadMoreWidget.prototype.contract = function() {
      this.$el.css({
        maxHeight: ''
      });
      this._isExpanded = false;
      return this._setButtonText();
    };

    ReadMoreWidget.prototype._getElDimensions = function() {
      var $clone;

      this.contractedHeight = this.$el.outerHeight();
      $clone = this.$el.clone().css({
        height: 'auto',
        maxHeight: 'none'
      });
      this.$el.after($clone);
      this.expandedHeight = $clone.outerHeight();
      return $clone.remove();
    };

    ReadMoreWidget.prototype._appendButton = function() {
      return this.$el.after(this._createButton());
    };

    ReadMoreWidget.prototype._createButton = function() {
      var $btn,
        _this = this;

      this.$btn = $btn = $('<a class="button" href="#" />');
      this._setButtonText();
      return $btn.on('click', function(evt) {
        evt.preventDefault();
        if (_this._isExpanded) {
          return _this.contract();
        } else {
          return _this.expand();
        }
      });
    };

    ReadMoreWidget.prototype._setButtonText = function() {
      var text;

      text = this._isExpanded ? 'Read Less' : 'Read More';
      return this.$btn.text(text);
    };

    return ReadMoreWidget;

  })();

  $(function() {
    return $('.read-more-container').each(function(i, el) {
      return new LP.ReadMoreWidget($(el));
    });
  });

}).call(this);