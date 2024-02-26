
$(document).ready(function () {

    //Add Shipment
    $("body").on("submit", "#addShipment", function (e) {
      e.preventDefault();
  
      var data = new FormData(this);
  
      $.ajax({
        url: "https://institute.tagit-global.com/backend/public/api/shipment",
        type: "POST",
        data: data,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        dataType: "json",
        processData: false,
        contentType: false,
        success: function (data) {
          console.log("good");
          alert("Added Successfully..");
          location.reload();
          console.log(data);
        },
        error: function (error) {
          console.log("no");
  
          output = "";
  
          for (var er in error.responseJSON.errors) {
            output += `
                          ${error.responseJSON.errors[er][0]}
                          <br>
                      `;
          }
          console.log(error);
          $(".error-message")
            .empty()
            .append('<span class="badge badge-danger">' + output + "</span>");
        },
      });
    });

  });
  