$(document).ready(function () {
  $("body").on("click", ".but", function (e) {
    e.preventDefault();

    let id = $(this).data("id");

    localStorage.setItem("group_id", id);
    console.log(id);
    $(location).attr("href", "../Admin/details.html");
  });
  getAllCourses();
  // Start Get All Courses
  function getAllCourses() { 
    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/courses",
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
      let state = "";
      let value = "";
      // console.log(localStorage.getItem("access_token"));

      if (items.length !== 0) {
        $.each(items, function (key, item) {
          if (item.state == 0) {
            state = `
            <button class="btn btn-success" id="startButton" name="" data-id=${item.id} >
            Start
          </button>
          <button class="btn btn-danger" id="delete" name="" data-id=${item.id} >
          Delete
        </button>
                `;
            value = "Available";
          } else if (item.state == 1) {
            state = `
            <button class="btn btn-danger" id="finishButton" name="" data-id=${item.id} >
            Finish
          </button>
            `;
            value = "Started";
          } else if (item.state == 2) {
            state = `
            <button class="btn btn-primary" id="" name="" data-id="">
            <a href="results.html">
              Add Result
            </a>
          </button>
            `;
            value = "Finished";
          } else {
            state = `<button class="btn btn-danger" id="delete" name="" data-id=${item.id} >
            Delete
          </button>`;
            value = "Completed";
          }
          output +=
            `
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
                <div class="col-6 done"> ` +
            value +
            `</div>
              </div>
              <form class="footer text-center">
                <button class="btn btn-primary but" data-id=${item.id}>
                  More
                </button>
                ` +
            state +
            `
              </form>
            </div>
          </div>
                `;
        });
        $("#course").empty().append(output);
      } else {
        $("#course")
          .empty()
          .append(`<div class="nodata">There Is No Data.</div>`);
      }
    });
  }
  //Add Course
  $("body").on("submit", "#addCourse", function (e) {
    e.preventDefault();

    var data = new FormData(this);

    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/course",
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
  //Delete Course
  $("body").on("click", "#delete", function (e) {
    e.preventDefault();

    let id = $(this).data("id");
    console.log(id);

    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/course/" + id,
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
      url: "https://institute.tagit-global.com/backend/public/api/courses",
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
      let state = "";
      let value = "";
      // console.log(localStorage.getItem("access_token"));

      if (items.length !== 0) {
        $.each(items, function (key, item) {
          if (item.state == 0) {
            state = `
            <button class="btn btn-success" id="startButton" name="" data-id=${item.id} >
            Start
          </button>
          <button class="btn btn-danger" id="delete" name="" data-id=${item.id} >
          Delete
        </button>
                `;
            value = "Available";
          } else if (item.state == 1) {
            state = `
            <button class="btn btn-danger" id="finishButton" name="" data-id=${item.id} >
            Finish
          </button>
            `;
            value = "Started";
          } else if (item.state == 2) {
            state = `
            <button class="btn btn-primary" id="" name="" data-id="">
            <a href="results.html">
              Add Result
            </a>
          </button>
            `;
            value = "Finished";
          } else {
            state = `<button class="btn btn-danger" id="delete" name="" data-id=${item.id} >
            Delete
          </button>`;
            value = "Completed";
          }
          output +=
            `
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
                <div class="col-6 done"> ` +
            value +
            `</div>
              </div>
              <form class="footer text-center">
                <button class="btn btn-primary but" data-id=${item.id}>
                  More
                </button>
                ` +
            state +
            `
              </form>
            </div>
          </div>
                `;
        });
        $("#course").empty().append(output);
      } else {
        $("#course")
          .empty()
          .append(`<div class="nodata">There Is No Data.</div>`);
      }
    });
  });
  // On Start click
  $("body").on("click", "#startButton", function (e) {
    e.preventDefault();

    localStorage.setItem("card_id", $(this).data("id"));
    $.ajax({
      url:
        "https://institute.tagit-global.com/backend/public/api/start-course/" +
        localStorage.getItem("card_id"),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      type: "POST",
      dataType: "JSON",
      success: function (data) {
        alert("Started Successfully..");
        localStorage.removeItem("card_id");
        location.reload();
      },
      error: function () {
        console.log("The course does not have any student");
        alert("The course does not have any student");
      },
    });
  });
  // On Finish click
  $("body").on("click", "#finishButton", function (e) {
    e.preventDefault();

    localStorage.setItem("card_id", $(this).data("id"));
    $.ajax({
      url:
        "https://institute.tagit-global.com/backend/public/api/finish-course/" +
        localStorage.getItem("card_id"),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      type: "POST",
      dataType: "JSON",
      success: function (data) {
        alert("Finished Successfully..");
        localStorage.removeItem("card_id");
        location.reload();
      },
      error: function () {
        console.log("Error");
        alert("no");
      },
    });
  });
});
