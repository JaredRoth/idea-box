require 'rails_helper'

RSpec.feature "User can edit idea content" do
  context "when they click on the title" do
    scenario "the title is editable and changes in db and on page", js: true do
      idea = create(:idea)

      visit root_path

      within("#idea1") do
        title = find('.title')
        title.click
        title.set("New Title")
      end
      find('h4').click
      sleep(1)
      expect(page).to have_content(idea.body)
      expect(page).to have_content("New Title")

      expect(Idea.find(idea.id).title).to eq("New Title")
    end
  end

  context "when they click on the body" do
    scenario "the body is editable and changes in db and on page", js: true do
      idea = create(:idea)

      visit root_path

      within("#idea1") do
        body = find('.body')
        body.click
        body.set("New Body")
      end
      find('h4').click
      sleep(1)
      expect(page).to have_content(idea.title)
      expect(page).to have_content("New Body")

      expect(Idea.find(idea.id).body).to eq("New Body")
    end
  end
end
