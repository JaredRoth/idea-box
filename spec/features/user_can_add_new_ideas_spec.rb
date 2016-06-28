require "rails_helper"

RSpec.feature "User can add new ideas" do
  scenario "the new idea appears at the top of the list", js: true do
    create_list(:idea, 3)

    visit root_path

    fill_in 'title', with:'Best Idea Evar'
    fill_in 'body', with:'Sharks with frikin lazer beams'
    click_on 'Save'

    within("#idea4") do
      expect(page).to have_content("Best Idea Evar")
      expect(page).to have_content("Sharks with frikin lazer beams")
    end

    expect('Title').to_not have_content("Best Idea Evar")
    expect('Body').to_not have_content("Sharks with frikin lazer beams")

    idea = Idea.find(4)
    expect(idea.title).to eq("Best Idea Evar")
    expect(idea.body).to eq("Sharks with frikin lazer beams")
  end
end
