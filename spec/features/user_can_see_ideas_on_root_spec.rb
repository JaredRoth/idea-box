require "rails_helper"

RSpec.feature "User can view ideas index" do
  scenario "they see all ideas on the page in descending chronological order", js: true do
    create(:idea, title: "First Idea", body: "Here's the thing...")
    create(:idea, title: "Second Idea", body: "You know what...")
    create(:idea, title: "Third Idea", body: "I think I forgot this")

    visit root_path

    within("#idea1") do
      expect(page).to have_content("First Idea")
      expect(page).to have_content("Here's the thing...")
    end
    within("#idea2") do
      expect(page).to have_content("Second Idea")
      expect(page).to have_content("You know what...")
    end
    within("#idea3") do
      expect(page).to have_content("Third Idea")
      expect(page).to have_content("I think I forgot this")
    end
  end
end
