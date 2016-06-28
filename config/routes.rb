Rails.application.routes.draw do
  root "public#index"

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :ideas, only: [:index]
    end
  end
end
