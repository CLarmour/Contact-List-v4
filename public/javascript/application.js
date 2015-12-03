$(document).ready(function() {

  // function getContacts() {
  //   return new Promise(function(resolve, reject) {
  //     $.getJSON('', function(data) {
  //       var transformedData = data.each();

  //       if (error) {
  //         return reject(error);
  //       }

  //       resolve(data);
  //     });
  //   });
  // }

  // getContacts()
  //   .then(function(data) {
  //     displayData(data);
  //   })
  //   .catch(function(error) {

  //   });

  var handlers = {
    container: $("#contacts").find('tbody'),
    addContact: function(index, contact) {
      var tr = $("<tr>").appendTo(handlers.container);
      $("<td contentEditable='false'>").text(contact.name).appendTo(tr);
      $("<td contentEditable='false'>").text(contact.email).appendTo(tr);
      $("<td contentEditable='false'>").text(contact.phone).appendTo(tr);
      $("<td contentEditable='false'>").append("<button class='delete_contact'>Delete</button>").append("<button class='update_contact'>Update</button>").appendTo(tr);
      
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
      $("<td>").append("<button class='delete_contact'>Delete</button>").append("<button class='update_contact'>Update</button>").appendTo(tr);
    },
    searchReceiveContacts: function(contacts) {
      handlers.container.empty();
      $.each(contacts, handlers.searchAddContact);
    },
    searchGetContacts: function() {
      $.getJSON("/contacts", handlers.searchReceiveContacts);
    },

    newDefineContact: function() {
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
    },

    deleteContact: function(ev) {
      var row = $(ev.target).parent().parent();
      var email = $(this).closest('tr').children('td:nth-child(2)').text();

      $.ajax({
        method: 'delete',
        url: '/contact/' + email,
        accepts: 'application/json',
        success: function(data) {
          console.log(data);
          data = JSON.parse(data)
          if (data.result) {
            $(row).remove();
          }
        },
      });
    },

    updateContact: function(ev) {
      var value = $(this).closest('tr').children('td:nth-child(1)').attr('contentEditable');
      if (value == 'false') {
        $(this).closest('tr').children('td:nth-child(1)').attr('contentEditable', 'true');
        $(this).closest('tr').children('td:nth-child(2)').attr('contentEditable', 'true');
        $(this).closest('tr').children('td:nth-child(3)').attr('contentEditable', 'true');
      } 
      else {
        $(this).closest('tr').children('td:nth-child(1)').attr('contentEditable', 'false');
        $(this).closest('tr').children('td:nth-child(2)').attr('contentEditable', 'false');
        $(this).closest('tr').children('td:nth-child(3)').attr('contentEditable', 'false');
      }

    }
  };
  $(document).on('click', '.delete_contact', handlers.deleteContact);
  $(document).on('click', '.update_contact', handlers.updateContact);
  $("#load_contacts").on('click', handlers.getContacts);
  $("#new_contact").on('click', handlers.newDefineContact);
  $('#search_contact').on('keyup', handlers.searchGetContacts);
  // $('body').on('click', '#delete_contact', handlers.deleteContact);

});
