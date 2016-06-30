$(document).ready(function(){
  getIdeas();
  $("#create-idea").on('click', createIdea);
  $(".materialize-textarea").on('keydown', function(event){
    if ((event.keyCode == 13 || event.keyCode == 13) && event.ctrlKey){createIdea()}
  });
  $("#ideas").on('click', '.delete-idea', deleteIdea)
             .on('click', '.thumb_up', {direction: "up"}, changeThumb)
             .on('click', '.thumb_down', {direction: "down"}, changeThumb)
             .on('click', '.title, .body', editIdea)
             .on('keydown focusout', '.title, .body', updateIdea);
  $("#search").on('keyup', searchIdeas);
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

function changeThumb(params) {
  var ideaId = $(this).parents('.idea').data('id');
  var quality = $(this).parent().siblings('.quality')
  var change = params.data.direction === "up" ? "1" : "-1";

  $.ajax({
    method: 'PATCH',
    url: '/api/v1/ideas/' + ideaId,
    dataType: "JSON",
    data: {amount: change},
    success: function(){showQualityChange(quality, params.data.direction)}
  })
}

function editIdea() {
  this.setAttribute('contentEditable', 'true');
}

function updateIdea(event){
  var ideaId = $(this).parents('.idea').data('id');
  var oldText = $(this).text();
  var div = $(this);
  var field = _.last(this.classList);
  if (event.keyCode == 10 || event.keyCode == 13 || event.type == "focusout"){
    this.setAttribute('contentEditable', 'false')
    $.ajax({
      method: 'PATCH',
      url: '/api/v1/ideas/' + ideaId,
      dataType: "JSON",
      data: {[field]: $(this).text()},
      error: function(){div.html(oldText)}
    })
  }
}

function searchIdeas() {
  var filter = $(this).val();

  $(".card-content").each(function(){
    if ($(this).clone().children('a').remove().end().text().search(new RegExp(filter, "i")) < 0) {
      $(this).parents(".idea").hide();
    } else {
      $(this).parents(".idea").show();
    }
  });
}

function showQualityChange(quality, direction) {
  var hashes = {
    up: { "Swill": "Plausible",
          "Plausible": "Genius",
          "Genius": "Genius"},
  down: { "Swill": "Swill",
          "Plausible": "Swill",
          "Genius": "Plausible"}
  }
  var oldQuality = quality.text();
  quality.text(hashes[direction][oldQuality]);
}

function printIdea(idea) {
return "<div class='idea row' id='idea" + idea.id + "' data-id='" + idea.id + "'>" +
          "<div class='card blue-grey darken-1'>" +
            "<div class='card-content white-text'>" +
              "<span class='card-title hoverable title'>" + idea.title + "</span>" +
              "<a href='#' class='delete-idea right chip'>Delete</a>" +
              "<p class='hoverable body'>"+ idea.body + "</p>" +
            "</div>" +
            "<div class='white-text card-action'>" +
              "Idea Quality: <span class='quality'>" + _.capitalize(idea.quality) + "</span>" +
              "<div class='right'>" +
                "<i class='small material-icons thumb_up'>thumb_up</i>" +
                "<i class='small material-icons right thumb_down'>thumb_down</i>" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>"
}
