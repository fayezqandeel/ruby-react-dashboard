class CreateReports < ActiveRecord::Migration[5.2]
  def change
    create_table :reports do |t|
      t.references :advertiser, foreign_key: true
      t.references :campaign, foreign_key: true
      t.date :date
      t.integer :impressions
      t.integer :clicks
      t.integer :installs
      t.bigint :cost_micros
    end
  end
end
