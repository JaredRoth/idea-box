$(document).ready(function(){
  getIdeas();
  $("#create-idea").on('click', createIdea)
  $("#ideas").on('click', '.delete-idea', deleteIdea)
  $("#ideas").on('click', '.thumb_up', thumbUp)
  $("#ideas").on('click', '.thumb_down', thumbDown)
});

function getIdeas(){
  $.getJSON('/api/v1/ideas').then(function(ideas){
    renderIdeas(ideas);
  });
}

function renderIdeas(ideas) {
  $(ideas).each(function(index, idea){
    $("#ideas").append(printIdea(idea));
  });
}

function createIdea(){
  var ideaTitle = $("#new-idea #title").val();
  var ideaBody = $("#new-idea #body").val();
  var ideaData = { idea: { title: ideaTitle, body: ideaBody } };
  $.ajax({
    method: 'POST',
    url: '/api/v1/ideas',
    dataType: "JSON",
    data: ideaData,
    success: function(idea){
      $("#ideas").prepend(printIdea(idea));
      $("#new-idea #title").val('');
      $("#new-idea #body").val('');
    }
  });
}

function deleteIdea() {
  var ideaId = $(this).parents('.idea').data('id');
  $.ajax({
    method: 'DELETE',
    url: '/api/v1/ideas/' + ideaId,
    dataType: "JSON",
    success: function(){
      $(".idea[data-id="+ideaId+"]").remove();
    }
  })
}

function thumbUp() {
  var ideaId = $(this).parents('.idea').data('id');
  var quality = $(this).siblings('.quality')
  $.ajax({
    method: 'PATCH',
    url: '/api/v1/ideas/' + ideaId,
    dataType: "JSON",
    data: {amount: '1'},
    success: function(){showQualityChange(quality, "up")}
  })
}

function thumbDown() {
  var ideaId = $(this).parents('.idea').data('id');
  var quality = $(this).siblings('.quality')
  $.ajax({
    method: 'PATCH',
    url: '/api/v1/ideas/' + ideaId,
    dataType: "JSON",
    data: {amount: '-1'},
    success: function(){showQualityChange(quality, "down")}
  })
}

function showQualityChange(quality, direction) {
  var up = {  "Swill": "Plausible",
              "Plausible": "Genius",
              "Genius": "Genius"};
  var down = {"Swill": "Swill",
              "Plausible": "Swill",
              "Genius": "Plausible"};
  var oldQuality = quality.text();
  quality.text(eval(direction)[oldQuality]);
}

function printIdea(idea) {
  return "<div class='idea row' id='idea" + idea.id + "' data-id='" + idea.id +
  "'><div class='title'>" + idea.title + "</div><div class='body'>" + idea.body +
  "</div>" + "Quality: <span class='quality'>" + _.capitalize(idea.quality) + "</span>" +
  " <i class='tiny material-icons thumb_down'>thumb_down</i> " +
  "<i class='tiny material-icons thumb_up'>thumb_up</i>" +
  "<div><a href='#' class='delete-idea'>Delete</a></div></div>"
}
