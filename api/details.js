$(document).ready(function () {
  getCourseDetails();
  if (localStorage.getItem("role") == 1 || localStorage.getItem("role") == 2) {
    getCourseStudent();
  }
  // Start Get Course Deatil
  function getCourseDetails() {
    $.ajax({
      url:
        "https://institute.tagit-global.com/backend/public/api/course/" +
        localStorage.getItem("group_id"),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      dataType: "json",
      success: function (data) { },
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
      let state = "";
      let value = "";
      let first = "";
      console.log(items.super_mark);
      
      // console.log(localStorage.getItem("access_token"));
      // console.log(localStorage.getItem("group_id"));
      if(items.super_mark == -1){
        first = "Not Ready"
      }
      else{
        first = items.super_mark
      }
      if (items.course.state == 0) {
        state = `
          <button class="btn btn-success" id="startButton" name="" data-id=${items.course.id} >
          Start
        </button>
        <button class="btn btn-danger" id="delete" name="" data-id=${items.course.id} >
        Delete
      </button>
              `;
        value = "Available";
      } else if (items.course.state == 1) {
        state = `
          <button class="btn btn-danger" id="finishButton" name="" data-id=${items.course.id} >
          Finish
        </button>
          `;
        value = "Started";
      } else if (items.course.state == 2) {
        state = `
          <button class="btn btn-primary" id="" name="" data-id="">
          <a href="results.html">
            Add Result
          </a>
        </button>
          `;
        value = "Finished";
      } else {
        state = `<button class="btn btn-danger" id="delete" name="" data-id=${items.course.id} >
          Delete
        </button>`;
        value = "Completed";
      }
      output +=
        `
          <div class="col-lg-8 margin  div">
          <div class="card ">
          <img
          class="card-img-top"data-enlargable
          src="https://institute.tagit-global.com/backend/public/storage/Course_images/${items.course.image}"
            />
            <div class="row information">
            <h5 class="col-6">Name:</h5>
            <div class="col-6">${items.course.course_name}</div>
            <h5 class="col-6">teacher Name:</h5>
            <div class="col-6">${items.course.teacher_name}</div>
            <h5 class="col-6">Cost:</h5>
            <div class="col-6">${items.course.cost}</div>
            <h5 class="col-6">Total Students:</h5>
            <div class="col-6">${items.course.total_student}</div>
            <h5 class="col-6">Current Students:</h5>
            <div class="col-6">${items.course.curr_student}</div>
            <h5 class="col-6">Hours:</h5>
            <div class="col-6">${items.course.total_hours}</div>
            <h5 class="col-6">Status:</h5>
            <div class="col-6 done">` +
               value +
            `</div>
              <h5 class="col-6">Description:</h5>
              <p class=" lead ">${items.course.description}</p>
              <div class="box">
              <img src="../images/prize.jpg">
              <h3>`+ first +`</h3>
            </div>
            </div>
          </div>
        </div>
                `;
      $("#detail").empty().append(output);
    });
  }
  // Start Get Course Deatil
  function getCourseStudent() {
    $.ajax({
      url:
        "https://institute.tagit-global.com/backend/public/api/course-students/" +
        localStorage.getItem("group_id"),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      dataType: "json",
      success: function (data) { },
      error: function () {
        alert("You Are Not An Admin");
      },
    }).done(function (items) {
      let output = "";
      // console.log(localStorage.getItem("access_token"));
      if (items.length !== 0) {
        $.each(items, function (key, item) {
          output += `
          <h5 class="col-6">Student:</h5>
          <div class="col-6">${item.first_name} ${item.last_name}</div>
              `;
        });
        $("#information").empty().append(output);
      } else {
        $("#information")
          .empty()
          .append(`<div class="nodata">No Students</div>`);
      }
    });
  }
});
