class CreateInterventions < ActiveRecord::Migration[5.2]
  def change
    create_table :interventions do |t|
      t.integer :author_id
      t.integer :customer_id
      t.integer :building_id
      t.integer :battery_id
      t.integer :column_id
      t.integer :elevator_id
      t.integer :employee_id
      t.datetime :intervention_started
      t.datetime :intervention_ended
      t.string :intervention_result
      t.text :intervention_report
      t.string :intervention_status

      t.timestamps
    end
  end
end
