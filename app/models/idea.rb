class Idea < ActiveRecord::Base
  validates :title, presence: true
  validates :body, presence: true

  enum quality: %w(Swill Plausible Genius)
  default_scope { order(created_at: :desc) }
end
