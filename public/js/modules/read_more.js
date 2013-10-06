(function() {
  LP.ReadMoreWidget = (function() {
    function ReadMoreWidget($el) {
      this.$el = $el;
      this._appendButton();
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
