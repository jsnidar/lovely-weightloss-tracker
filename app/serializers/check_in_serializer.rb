class CheckInSerializer < ActiveModel::Serializer
  attributes :id, :date, :weight, :left_arm_measurement, :left_thigh_measurement, :waist, :chest, :hips, :notes 
end
