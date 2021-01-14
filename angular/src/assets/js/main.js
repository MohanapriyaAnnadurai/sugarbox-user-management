$(document).on('show', '.accordion', function (e) {
  $(e.target).prev('.drop-arrow').addClass('accordion-opened');
});

$(document).on('hide', '.accordion', function (e) {
  $(this).find('.drop-arrow').not($(e.target)).removeClass('accordion-opened');
});
function toggleIcon(e) {
  $(e.target).prev('.panel-heading').find(".dropicon").toggleClass('fa-angle-down fa-angle-right');
  $(e.target).prev('.panel-heading').find(".selecticon").toggleClass('active');
}

function togglesIcon(e) {
  $(e.target).prev('.panel-heading').find(".dropicon").toggleClass('fa-angle-down fa-angle-right');
  $(e.target).prev('.panel-heading').find(".selecticon").toggleClass('active');
}


$(function () {
  $('.panel-group').on('hidden.bs.collapse', toggleIcon);
  $('.panel-group').on('shown.bs.collapse', toggleIcon);
  $('.inner-panel').on('hidden.bs.collapse', togglesIcon);
  $('.inner-panel').on('shown.bs.collapse', togglesIcon);
//   $('.datepicker-cal').datepicker({
//     format: "mm/dd/yyyy",
//     autoclose: true
//   });

//   $('.select2').select2();
//   $('.selectpro').select2();
  $('[data-toggle="tooltip"]').tooltip();


  $('.btn-toggle').click(function () {
    $(this).find('.btn').toggleClass('active');
    if ($(this).find('.btn-primary').size() > 0) {
      $(this).find('.btn').toggleClass('btn-primary');
    }
    $(this).find('.btn').toggleClass('btn-default');
  });
  
  
});

