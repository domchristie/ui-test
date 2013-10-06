#
# ReadMoreWidget
# ==============
# Adds a show/hide toggle behaviour to a given element
# By default, the behaviour is attached to `.read-more-container` elements
# This behaviour can be triggered externally by accessing the ReadMoreWidget instance e.g.:
# `$('.read-more-container').data('readMoreWidget').expand();`
#

class LP.ReadMoreWidget

  constructor: (@$el) ->
    @_getElDimensions()
    @_appendButton() if @expandedHeight > @contractedHeight
    @$el.data('readMoreWidget', @)

  # Public methods

  expand: ->
    @$el.animate(maxHeight: @expandedHeight)
    @_isExpanded = true
    @_setButtonText()


  contract: ->
    @$el.animate(maxHeight: @contractedHeight)
    @_isExpanded = false
    @_setButtonText()

  # _Private_ methods

  _getElDimensions: ->
    @contractedHeight = @$el.outerHeight()

    $clone = @$el.clone().css(
      height: 'auto'
      maxHeight: 'none'
    )
    @$el.after($clone)

    @expandedHeight = $clone.outerHeight()
    $clone.remove()

  _appendButton: ->
    @$el.after @_createButton()

  # Creates a button and adds the click event handler
  _createButton: ->
    @$btn = $btn = $('<a class="button" href="#" />')
    @_setButtonText()
    $btn.on 'click', (evt) =>
      evt.preventDefault()
      if @_isExpanded then @contract() else @expand()

  _setButtonText: ->
    text = if @_isExpanded then 'Read Less' else 'Read More'
    @$btn.text(text)

# Default behaviour:
# create a new widget for each `.read-more-container`
$ ->
  $('.read-more-container').each (i, el) ->
    new LP.ReadMoreWidget $(el)
