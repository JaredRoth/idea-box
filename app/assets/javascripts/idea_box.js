$(document).ready(function(){
  getIdeas();
});

function getIdeas(){
  $.getJSON('/api/v1/ideas').then(function(ideas){
    renderIdeas(ideas);
  });
}

function renderIdeas(ideas) {
  $(ideas).each(function(index, idea){
    $("#ideas").append(
      "<div class='idea row' id='idea" + idea.id + "'><div class='title'>" +
      idea.title + "</div><div class='body'>" + idea.body + "</div>"
    );
  });
}
