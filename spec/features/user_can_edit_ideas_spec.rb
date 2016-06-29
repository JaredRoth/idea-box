require 'rails_helper'

RSpec.feature "User can edit idea content" do
  context "when they click on the title" do
    scenario "the title is editable and changes in db and on page", js: true do
      create(:idea)

      visit root_path

      within("#idea1") do
        find('.title').click
      end
    end
  end

  context "when they click on the body" do
    scenario "the body is editable and changes in db and on page", js: true do
      create(:idea)

      visit root_path

      within("#idea1") do
        find('.body').click
      end
    end
  end
end
