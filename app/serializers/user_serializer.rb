class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :height, :username

  has_many :check_ins
  has_many :goals 
end
