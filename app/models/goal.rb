class Goal < ApplicationRecord
  
  validates :goal_weight, presence: true, numericality: { greater_than: 0 }
  validates_date :goal_start_date
  validates_date :goal_end_date, on_or_after: :goal_start_date
  validates :goal_name, presence: true 
  
  belongs_to :user

  def goal_check_ins
    self.user.check_ins.where(date: self.goal_start_date..self.goal_end_date)
  end
  
end
