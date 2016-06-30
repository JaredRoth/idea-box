$(document).ready(function(){
  getIdeas();
  $("#create-idea").on('click', createIdea);
  $("#ideas").on('click', '.delete-idea', deleteIdea);
  $("#ideas").on('click', '.thumb_up', {direction: "up"}, changeThumb);
  $("#ideas").on('click', '.thumb_down', {direction: "down"}, changeThumb);
  $("#ideas").on('click', '.title', editIdea);
  $("#ideas").on('click', '.body', editIdea);
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
  var ideaId = $(this).parents('.idea').data('id');
  var oldText = $(this).text();
  var div = $(this);
  var field = _.last(this.classList);

  this.setAttribute('contentEditable', 'true');

  $(this).on('blur', function(event){
    this.setAttribute('contentEditable', 'false')
    $.ajax({
      method: 'PATCH',
      url: '/api/v1/ideas/' + ideaId,
      dataType: "JSON",
      data: {[field]: $(this).text()},
      error: function(){div.html(oldText)}
    })
  });
}

function searchIdeas() {
  var filter = $(this).val();

  $(".card-content").each(function(){
    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
      $(this).parent().hide();
    } else {
      $(this).parent().show();
    }
  });
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
return "<div class='idea row' id='idea" + idea.id + "' data-id='" + idea.id + "'>" +
          "<div class='card blue-grey darken-1'>" +
            "<div class='card-content white-text'>" +
              "<span class='card-title hoverable title'>" + idea.title + "</span>" +
              "<a href='#' class='delete-idea right chip'>Delete</a>" +
              "<p class='hoverable body'>"+ idea.body + "</p>" +
            "</div>" +
            "<div class='white-text card-action'>" +
              "<span class='quality'>" + _.capitalize(idea.quality) + "</span>" +
              "<div class='right'>" +
                "<i class='small material-icons thumb_up'>thumb_up</i>" +
                "<i class='small material-icons right thumb_down'>thumb_down</i>" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>"
}
