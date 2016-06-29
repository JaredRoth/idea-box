require "rails_helper"

RSpec.feature "User can delete an idea" do
  scenario "the idea is removed from the db and the page", js: true do
    create(:idea, title: "First Idea", body: "Here's the thing...")
    create(:idea, title: "Second Idea", body: "You know what...")

    visit root_path

    within("#idea2") do
      click_on "Delete"
    end

    within("#idea1") do
      expect(page).to have_content("First Idea")
      expect(page).to have_content("Here's the thing...")
    end

    expect(page).to_not have_css("#idea2")
    expect(page).to_not have_content("Second Idea")
    expect(page).to_not have_content("You know what...")

    expect(Idea.find_by(title: "Second Idea")).to eq(nil)
  end
end
