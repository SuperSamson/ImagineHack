$( document ).ready(function(){
    var
      $progress       = $('.rapid .ui.progress'),
      updateEvent
    ;
    // restart to zero
    clearInterval(window.fakeProgress)
    $progress.progress('reset');
     // updates every 10ms until complete
    window.fakeProgress = setInterval(function() {
      $progress.progress('increment');
      // stop incrementing when complete
      if($progress.progress('is complete')) {
        clearInterval(window.fakeProgress)
      }
    }, 10);
  })
;
$('.rapid .ui.progress')
  .progress({
    duration : 100,
    total    : 100,
    text     : {
      active: '{value}% of support'
    }
  })
;
