class CreateGoals < ActiveRecord::Migration[6.1]
  def change
    create_table :goals do |t|
      t.string :goal_name
      t.date :goal_start_date
      t.integer :goal_weight
      t.date :goal_end_date
      t.boolean :goal_met
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
