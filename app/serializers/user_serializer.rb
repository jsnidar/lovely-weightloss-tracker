class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :admin, :password_digest, :height
end
