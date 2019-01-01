class CreateCampaigns < ActiveRecord::Migration[5.2]
  def change
    create_table :campaigns do |t|
      t.references :advertiser, foreign_key: true
      t.string :name
      t.date :start_date
      t.date :end_date
      t.string :cost_model
      t.decimal :cost, precision: 10, scale: 2
    end
  end
end
