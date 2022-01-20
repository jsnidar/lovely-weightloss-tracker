class CreateGoals < ActiveRecord::Migration[6.1]
  def change
    create_table :goals do |t|
      t.string :goal_name
      t.date :goal_start_date
      t.date :goal_end_date
      t.integer :goal_weight
      t.belongs_to :user_id, null: false, foreign_key: true
      t.boolean :goal_met

      t.timestamps
    end
  end
end
