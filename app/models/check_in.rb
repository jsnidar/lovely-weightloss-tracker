class CheckIn < ApplicationRecord
  validates :weight, presence: true, numericality: { greater_than: 0 }
  validates_date :date, on_or_before: lambda { Date.current }

  belongs_to :user
end
