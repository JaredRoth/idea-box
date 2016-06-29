$(document).ready(function(){
  getIdeas();
  $("#create-idea").on('click', createIdea)
  $("#ideas").on('click', '.delete-idea', deleteIdea)
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
    method: "POST",
    url: '/api/v1/ideas',
    dataType: "JSON",
    data: ideaData,
    success: function(idea){
      $("#ideas").prepend(printIdea(idea));
    }
  });
  $("#new-idea #title").val('');
  $("#new-idea #body").val('');
}

function deleteIdea() {
  var ideaId = $(this).parent().data('idea-id');
  $.ajax({
    method: "DELETE",
    url: '/api/v1/ideas/' + ideaId,
    dataType: "JSON",
    success: function(){
      $(".idea[data-idea-id="+ideaId+"]").remove();
    }
  })
}

function printIdea(idea) {
  return "<div class='idea row' id='idea" + idea.id + "' data-idea-id='" +
  idea.id + "'><div class='title'>" + idea.title + "</div><div class='body'>" +
  idea.body + "</div><a href='#' class='delete-idea'>Delete</a></div>"
}
