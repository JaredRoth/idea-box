$(document).ready(function(){
  getIdeas();
  $("#create-idea").on('click', createIdea)
});

function getIdeas(){
  $.getJSON('/api/v1/ideas').then(function(ideas){
    renderIdeas(ideas);
  });
}

function renderIdeas(ideas) {
  $(ideas).each(function(index, idea){renderIdea(index, idea)})
}

function renderIdea(index, idea){
  $("#ideas").append(
    "<div class='idea row' id='idea" + idea.id + "'><div class='title'>" +
    idea.title + "</div><div class='body'>" + idea.body + "</div>"
  );
};

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
      $("#ideas").prepend(
        "<div class='idea row' id='idea" + idea.id + "'><div class='title'>" +
        idea.title + "</div><div class='body'>" + idea.body + "</div>"
      );
    }
  });
  $("#new-idea #title").val('');
  $("#new-idea #body").val('');
}
