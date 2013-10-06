#
# Lightbox
# ========
# Binds to clicks on elements with a `data-lightbox-img` attribute and displays
# the referenced image in a lightbox
# Can also display custom content using `setContent` and `open` methods
# 

LP.lightbox = (->
  $overlay = $('<div class="lightbox" />')
  $content = $('<div class="lightbox__content">')
  $overlay.append($content)

  # Public methods

  open = (content) ->
    setContent(content) if content
    $('body').append($overlay)
    _positionContent()
    $overlay

  close = ->
    $overlay.remove()

  setContent = (content) ->
    $content.html(content)
    _positionContent()

  # Private Methods

  _positionContent = ->
    $content.css(
      marginTop: -$content.outerHeight() / 2
      marginLeft: -$content.outerWidth() / 2
    )

  # DOM event handlers

  $document = $(document)
  $document.on('click', '[data-lightbox-img]', (evt) ->
    evt.preventDefault()
    open $("<img src=#{$(this).data('lightbox-img')} />")
  )

  $document.on('click', '.lightbox', (evt) -> close() if evt.target == this)
  $document.on('keyup', (evt) ->
    close() if evt.keyCode is 13 or evt.keyCode is 27
  )

  return {
    open: open
    close: close
    setContent: setContent
  }
)()