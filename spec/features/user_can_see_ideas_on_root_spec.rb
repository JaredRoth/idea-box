require "rails_helper"

RSpec.feature "User can view ideas index" do
  scenario "they see all ideas on the page in descending chronological order" do
    

    visit root

    ideas = page.all("div#ideas div.idea")

    expect(ideas[0]).to have_content("First Idea")
    expect(ideas[0]).to have_content("Here's the thing...")
  end
end
