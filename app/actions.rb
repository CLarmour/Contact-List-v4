# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  Contact.all.to_json
end

post '/new_contact' do
  results = {result: false}
  name = params[:name]
  email = params[:email]
  phone = params[:phone]

  contact = Contact.new name: name, email: email, phone: phone

  if contact.save
    results[:result] = true
    results[:contact_id] = contact.id
  end

  results.to_json

end