require 'rails_helper'

RSpec.feature "User can search ideas" do
  scenario "the ideas filter as they type", js: true do
    create_list(:idea, 4)

    visit root_path


  end
end
