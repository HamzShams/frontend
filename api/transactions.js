$(document).ready(function () {
  getAllTransactions();
  // Start Get All Transactions
  function getAllTransactions() {
    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/reservations",
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
      let value = "";
      console.log(localStorage.getItem("access_token"));

      if (items.length !== 0) {
        console.log(items);
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
            <td>${item.user.first_name} ${item.user.last_name}</td>
            <td>${item.course.course_name}</td>
            <td>${item.course.cost}</td>
            <td>${item.course.teacher_name}</td>
            <td> ` + value
             +
            `</td>
          </tr>
                  `;
        });
        $("#transaction").append(output);
      } else {
        $("#transaction").append(`<div class="nodata">There Is No Data.</div>`);
      }
    });
  }
});
