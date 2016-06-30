require 'rails_helper'

RSpec.feature "User can search ideas" do
  scenario "the ideas filter as they type", js: true do
    create(:idea, title: "Definitely Can Find Me")
    create(:idea, title: "Sometimes Can Find Me")
    create(:idea, title: "Not Me")

    visit root_path

    fill_in "search", with: 'Definitely'

    within("#ideas") do
      expect(page).to have_content("Definitely Can Find Me")
      expect(page).to_not have_content("Sometimes Can Find Me")
      expect(page).to_not have_content("Not Me")
    end

    fill_in "search", with: 'Me'

    within("#ideas") do
      expect(page).to have_content("Definitely Can Find Me")
      expect(page).to have_content("Sometimes Can Find Me")
      expect(page).to have_content("Not Me")
    end

    fill_in "search", with: 'Find'

    within("#ideas") do
      expect(page).to have_content("Definitely Can Find Me")
      expect(page).to have_content("Sometimes Can Find Me")
      expect(page).to_not have_content("Not Me")
    end
  end
end
