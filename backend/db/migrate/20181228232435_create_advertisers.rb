class CreateAdvertisers < ActiveRecord::Migration[5.2]
  def change
    create_table :advertisers do |t|
      t.string :name
    end
  end
end
