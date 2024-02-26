$(document).ready(function () {
  getAllEmployee();
  // Start Get All Employee
  function getAllEmployee() {
    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/users",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      dataType: "json",
      success: function (data) {},
      error: function () {
        alert("You Are Not An Admin");
      },
    }).done(function (items) {
      let output = "";
      console.log(localStorage.getItem("access_token"));

      if (items.length !== 0) {
        // console.log(items);
        $.each(items, function (key, item) {
          output += `
          <div class="col-lg-3 col-md-6 col-xs-12">
            <div class="card text-center">
            <i class="fa fa-times" data-id=${item.id} id="delete"></i>
              <img src="../images/user.webp" alt="Avatar" />
              <h4>${item.first_name} ${item.last_name}</h4>
              <h5>${item.email}</h5>
              <h6>${item.phone_number}</h6>
            </div>
          </div>
              `;
        });
        $("#employee").empty().append(output);
      } else {
        $("#employee")
          .empty()
          .append(`<div class="nodata">There Is No Data.</div>`);
      }
    });
  }
  //Add Employee
  $("body").on("submit", "#addEmployee", function (e) {
    e.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/add-employee",
      type: "POST",
      data: $(this).serialize(),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      dataType: "json",
      success: function (data) {
        console.log("good");
        alert("Added Successfully..");
        location.reload();
        // console.log(data);
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
  //Delete Employee
  $("body").on("click", "#delete", function (e) {
    e.preventDefault();

    let id = $(this).data("id");
    console.log(id);

    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/user/" + id,
      type: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      dataType: "json",
      success: function (item) {
        console.log("good");
        alert("Deleted Successfully..");
        location.reload();
      },
      error: function () {
        console.log("bad");
      },
    });
  });
  //Serach Employee
  $("body").on("input", "#search", function (e) {
    e.preventDefault();

    let val = $(this).val();
    if (val == "") {
      getAllEmployee();
      return;
    }
    console.log(val);
    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/users",
      type: "POST",
      data: {
        query: val,
      },

      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      dataType: "json",
      success: function (data) {
        console.log("Ok Search");
      },
      error: function () {
        console.log("bad");
        let output = `
            <div class="nodata">There Is No Data.</div>
          `;
        $("#employee").empty().append(output);
      },
    }).done(function (items) {
      let output = "";
      console.log(localStorage.getItem("access_token"));

      if (items.length !== 0) {
        console.log(items);
        $.each(items, function (key, item) {
          output += `
            <div class="col-lg-3 col-md-6 col-xs-12">
              <div class="card text-center">
              <i class="fa fa-times" data-id=${item.id} id="delete"></i>
                <img src="../images/user.webp" alt="Avatar" />
                <h4>${item.first_name} ${item.last_name}</h4>
                <h5>${item.email}</h5>
                <h6>${item.phone_number}</h6>
              </div>
            </div>
                `;
        });
        $("#employee").empty().append(output);
      } else {
        $("#employee")
          .empty()
          .append(`<div class="nodata">There Is No Data.</div>`);
      }
    });
  });
});
