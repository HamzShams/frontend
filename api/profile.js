$(document).ready(function () {
  getProfile();
  if (localStorage.getItem("role") == 0) {
    getCourses();
  }
  // Start Get All Employee
  function getProfile() {
    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/user",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      type: "GET",
      dataType: "json",
      success: function (data) {},
      error: function () {
        alert("You Are Not An Admin");
      },
    }).done(function (items) {
      let output = "";
      // console.log(localStorage.getItem("access_token"));
      // console.log(items.user)

      output += `
          <div class="card text-center">
          <a
          ><i
            class="fa fa-pencil" data-toggle="modal" data-target=".modal4" data-id=""></i></a>          
          <img src="../images/user.webp" alt="Avatar" />
          <h4>${items.user.first_name} ${items.user.last_name} </h4>
          <h5>${items.user.email} </h5>
          <h6>${items.user.phone_number} </h6>
          <p>${items.user.balance} </p>
        </div>
                `;
      $("#profile").empty().append(output);
    });
  }
  // Update Info
  $("body").on("submit", "#updateInfo", function (e) {
    e.preventDefault();

    let first = $("#first").val();
    let last = $("#last").val();
    let email = $("#email").val();
    let number = $("#number").val();

    let data = {};
    if (first != "") {
      data["first_name"] = first;
    }
    if (last != "") {
      data["last_name"] = last;
    }
    if (email != "") {
      data["email"] = email;
    }
    if (number != "") {
      data["phone_number"] = number;
    }

    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/user",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      type: "PUT",
      data: data,
      dataType: "json",
      success: function (data) {
        console.log("good");
        alert("Updated Successfully..");
        console.log(data.data);
        location.reload();
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
  // Start Get All Courses
  function getCourses() {
    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/student-reservations",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      dataType: "json",
      success: function (data) {},
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
    }).done(function (items) {
      let output = "";
      let value = "";
      // console.log(localStorage.getItem("access_token"));

      if (items.length !== 0) {
        $.each(items, function (key, item) {
          if (item.course.state == 0) {
            value = "Available";
          } else if (item.course.state == 1) {
            value = "Started";
          } else if (item.course.state == 2) {
            value = "Finished";
          } else if (item.course.state == 3) {
            value = "Completed";
          }
          output +=
            `
              <tr class="lodding">
              <td>${item.course.course_name}</td>
              <td>${item.course.cost}</td>
              <td>${item.course.teacher_name}</td>
              <td> ` +
            value +
            `</td>
            </tr>
                    `;
        });
        $("#transaction").append(output);
      } else {
        $("#transaction").append(`<th class="nodata">There Is No Data.</th>`);
      }
    });
  }
});
