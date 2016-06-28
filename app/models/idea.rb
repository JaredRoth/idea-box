class Idea < ActiveRecord::Base
  validates :title, presence: true
  validates :body, presence: true

  enum quality: %w(swill plausible genius)
  default_scope { order(created_at: :desc) }
end
