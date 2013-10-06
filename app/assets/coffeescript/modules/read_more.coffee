#
# ReadMoreWidget
# ==============
# Adds a show/hide toggle behaviour to a given element
# By default, the behaviour is attached to `.read-more-container` elements
#

class LP.ReadMoreWidget

  constructor: (@$el) ->
    @_appendButton()

  # Public methods

  expand: ->
    @$el.css(maxHeight: 'none')
    @_isExpanded = true
    @_setButtonText()

  contract: ->
    @$el.css(maxHeight: '')
    @_isExpanded = false
    @_setButtonText()

  # _Private_ methods

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
