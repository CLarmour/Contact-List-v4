$(document).ready(function() {

  var handlers = {
    container: $("#contacts").find('tbody'),
    addContact: function(index, contact) {
      var tr = $("<tr>").appendTo(handlers.container);
      $("<td>").text(contact.name).appendTo(tr);
      $("<td>").text(contact.email).appendTo(tr);
      $("<td>").text(contact.phone).appendTo(tr);
    },
    receiveContacts: function(contacts) {
      $.each(contacts, handlers.addContact);
    },
    getContacts: function() {
      handlers.container.empty();
      $.getJSON("/contacts", handlers.receiveContacts);
    },
    searchAddContact: function(index, contact) {
      var tr = $("<tr>").appendTo(handlers.container);
      var search_val = $("#search_contact").val();
      var myExp = new RegExp(search_val, "i");
      if ((contact.name.search(myExp) != -1) || (contact.email.search(myExp) != -1) || (contact.phone.search(myExp) != -1)) {
      $("<td>").text(contact.name).appendTo(tr);
      $("<td>").text(contact.email).appendTo(tr);
      $("<td>").text(contact.phone).appendTo(tr)};
    },
    searchReceiveContacts: function(contacts) {
      handlers.container.empty();
      $.each(contacts, handlers.searchAddContact);
    },
    searchGetContacts: function() {
      $.getJSON("/contacts", handlers.searchReceiveContacts);
    },
  };

  $("#load_contacts").on('click', handlers.getContacts);

  $("#new_contact").on('click', function() {
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var contact = {name: name, email: email, phone: phone};
    
    $.post("/new_contact", contact, function(data) {
      if (data.result) {
        handlers.addContact(0, contact);  
      } else {
        alert("Unable to create contact.");
      }
    }, 'json');
  });


  $('#search_contact').keyup(function() {
    handlers.container.empty();
    $.getJSON("/contacts", handlers.searchReceiveContacts);
  });



});
