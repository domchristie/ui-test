$ ->

  window.LP = (->

    initialHeight = 400

    return {

      open : $('.button').on 'click', ->
        if $('.read-more-container').height() > 400
          $('.read-more-container').animate(
            height: initialHeight
          , 500)
          $(this).text('Read more')
        else
          $('.read-more-container').animate(
            height: 1600
          , 500)
          $(this).text('Read less')
        false
    }

  )()