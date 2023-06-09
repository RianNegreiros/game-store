Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth/v1/user'

  namespace :admin, defaults: { format: :json } do
    namespace :v1 do
      get "home" => "home#index"
      resources :categories
      resources :products
      resources :coupons
      resources :users
      resources :games, only: [], shallow: true do
        resources :licenses
      end
    end
  end

  namespace :front do
    namespace :v1 do
    end
  end
end
