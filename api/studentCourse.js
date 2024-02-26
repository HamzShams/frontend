$(document).ready(function () {
  $("body").on("click", ".but", function (e) {
    e.preventDefault();

    let id = $(this).data("id");

    localStorage.setItem("group_id", id);
    console.log(id);
    $(location).attr("href", "../Student/details.html");
  });
  getAllCourses();
  // Start Get All Courses
  function getAllCourses() {
    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/available-courses",
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

      if (items.length !== 0) {
        $.each(items, function (key, item) {
          output += ` 
            <div class="col-lg-4 col-md-6 col-sm-12 div">
            <div class="card">
            <img
            class="card-img-top"data-enlargable
            src="https://institute.tagit-global.com/backend/public/storage/Course_images/${item.image}"
              />
              <div class="row information">
                <h5 class="col-6">Name:</h5>
                <div class="col-6">${item.course_name}</div>
                <h5 class="col-6">teacher Name:</h5>
                <div class="col-6">${item.teacher_name}</div>
                <h5 class="col-6">Cost:</h5>
                <div class="col-6">${item.cost}</div>
                <h5 class="col-6">Total Students:</h5>
                <div class="col-6">${item.total_student}</div>
                <h5 class="col-6">Current Students:</h5>
                <div class="col-6">${item.curr_student}</div>
                <h5 class="col-6">Hours:</h5>
                <div class="col-6">${item.total_hours}</div>
                <h5 class="col-6">Status:</h5>
                <div class="col-6 done">Available</div>
              </div>
              <form class="footer text-center">
                <button class="btn btn-success reservationButton" name="" data-id="${item.id}">
                Reservation
                </button>
                <button class="btn btn-primary but" data-id=${item.id}>
                  More
                </button>
              </form>
            </div>
          </div>
            `;
        });
        $("#showCourse").empty().append(output);
      } else {
        $("#showCourse")
          .empty()
          .append(`<div class="nodata">There Is No Data.</div>`);
      }
    });
  }
  //Serach Course
  $("body").on("input", "#search", function (e) {
    e.preventDefault();

    let val = $(this).val();
    if (val == "") {
      getAllCourses();
      return;
    }
    console.log(val);
    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/available-courses",
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
        $("#showCourse").empty().append(output);
      },
    }).done(function (items) {
      let output = "";

      // console.log(localStorage.getItem("access_token"));

      if (items.length !== 0) {
        $.each(items, function (key, item) {
          output += ` 
          <div class="col-lg-4 col-md-6 col-sm-12 div">
          <div class="card">
          <img
          class="card-img-top"data-enlargable
          src="https://institute.tagit-global.com/backend/public/storage/Course_images/${item.image}"
            />
            <div class="row information">
              <h5 class="col-6">Name:</h5>
              <div class="col-6">${item.course_name}</div>
              <h5 class="col-6">teacher Name:</h5>
              <div class="col-6">${item.teacher_name}</div>
              <h5 class="col-6">Cost:</h5>
              <div class="col-6">${item.cost}</div>
              <h5 class="col-6">Total Students:</h5>
              <div class="col-6">${item.total_student}</div>
              <h5 class="col-6">Current Students:</h5>
              <div class="col-6">${item.curr_student}</div>
              <h5 class="col-6">Hours:</h5>
              <div class="col-6">${item.total_hours}</div>
              <h5 class="col-6">Status:</h5>
              <div class="col-6 done">Available</div>
            </div>
            <form class="footer text-center">
              <button class="btn btn-success" id="cancel" name="" data-id="">
                <a data-toggle="modal" data-target=".modal4">Resrvation
                </a>
              </button>
              <button class="btn btn-primary" id="more" name="" data-id="">
                <a href="details.html">
                  More
                </a>
              </button>
            </form>
          </div>
        </div>
          `;
        });
        $("#showCourse").empty().append(output);
      } else {
        $("#showCourse")
          .empty()
          .append(`<div class="nodata">There Is No Data.</div>`);
      }
    });
  });
  // Reservation The Course
  $("body").on("click", ".reservationButton", function (e) {
    e.preventDefault();

    localStorage.setItem("card_id", $(this).data("id"));
    console.log(localStorage.getItem("card_id"))
    $.ajax({
      url:
        "https://institute.tagit-global.com/backend/public/api/reservation/" +
        localStorage.getItem("card_id"),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      type: "POST",
      dataType: "JSON",
      success: function (data) {
        alert("Accepted Successfully..");
        localStorage.removeItem("card_id");
        location.reload();
      },
      error: function () {
        console.log("Error");
        alert("You Are In Course");
      },
    });
  });
});
