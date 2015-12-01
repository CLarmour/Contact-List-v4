class ContactModel < ActiveRecord::Migration
  def change
   # Add code to create the table here
   # HINT: check out ActiveRecord::Migration.create_table
   create_table :contact do |t|
     # column definitions go here
     # Use the AR migration guide for syntax reference
     t.string :name
     t.string :email
     t.string :address
     t.string :phone
     t.timestamps
    end
  end

end