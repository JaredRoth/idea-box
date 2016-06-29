require "rails_helper"

RSpec.feature "User can alter idea quality" do
  context "valid increment" do
    scenario "increases quality one step in db and on page", js: true do
      create(:idea, quality: 0)

      visit root_path

      within("#idea1") do
        expect(".quality").to have_content("Swill")
        click_on "thumb_up"
        expect(".quality").to have_content("Plausible")
      end
    end
  end
  context "invalid increment" do
    scenario "leaves quality at 'genius'", js: true do
      create(:idea, quality: 2)

      visit root_path

      within("#idea1") do
        expect(".quality").to have_content("Genius")
        click_on "thumb_up"
        expect(".quality").to have_content("Genius")
      end
    end
  end
  context "valid decrement" do
    scenario "decreases quality one step in db and on page", js: true do
      create(:idea, quality: 2)

      visit root_path

      within("#idea1") do
        expect(".quality").to have_content("Genius")
        click_on "thumb_down"
        expect(".quality").to have_content("Plausible")
      end
    end
  end
  context "invalid decrement" do
    scenario "leaves quality at 'swill'", js: true do
      create(:idea, quality: 0)

      visit root_path
      within("#idea1") do
        expect(".quality").to have_content("Swill")
        click_on "thumb_down"
        expect(".quality").to have_content("Swill")
      end
    end
  end
end
