class CreateCheckIns < ActiveRecord::Migration[6.1]
  def change
    create_table :check_ins do |t|
      t.float :weight
      t.float :left_arm_measurement
      t.float :left_thigh_measurement
      t.float :waist
      t.float :hips
      t.float :chest
      t.date :date
      t.belongs_to :user_id, null: false, foreign_key: true
      t.string :notes

      t.timestamps
    end
  end
end
