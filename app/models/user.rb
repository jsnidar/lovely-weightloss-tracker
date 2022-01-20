class User < ApplicationRecord
  has_secure_password
  validates :email, confirmation: true, uniqueness: true
  validates :name, :username, :email_confirmation, :height, presence: true
  validates :height, numericality: { greater_than: 36 }
  validates :username, uniqueness: true 

  has_many :check_ins
  has_many :goals 
end
