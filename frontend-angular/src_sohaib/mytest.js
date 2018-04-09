$(document).ready(function() {
  // display popover on initial page load:
  $('mybody').addClass('greyscreen-open');
  
  $('a[href*="popover"]').click(function() {
    $('mybody').addClass('greyscreen-open');
    return false;
  });
  
  $('.popover').click(function() {
    $('mybody').removeClass('greyscreen-open');
  });
});