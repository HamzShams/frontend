$(document).ready(function () {
  
  //Show Employee icon Just For Super Admin
  if (localStorage.getItem("role") == 1) {
    document.getElementsByClassName("hide")[0].style.display = "none";
  }

  // Sign Up
  $("#registerForm").submit(function (e) {
    e.preventDefault();

    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/register",
      type: "POST",
      data: $("#registerForm").serialize(),
      dataType: "json",
      success: function (data) {
        console.log("yes");
        //   localStorage.setItem("access_token", data.message.token);
        $(location).attr("href", "login.html");
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

  // Login
  $("#loginForm").submit(function (e) {
    e.preventDefault();

    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/login",
      type: "POST",
      data: $("#loginForm").serialize(),
      dataType: "JSON",
      success: function (data) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("role", data.role);
        // console.log(localStorage.getItem('access_token'));
        // console.log(data.role);
        if (data.role == 0) {
          $(location).attr("href", "Student/allCourses.html");
        } else {
          $(location).attr("href", "Admin/courses.html");
        }
      },
      error: function () {
        console.log("error");
        $(".error-message")
          .empty()
          .append(
            '<span class="badge badge-danger">Invalid login details</span>'
          );
      },
    });
  });

  //Logout
  $("#checkOut").click(function (e) {
    e.preventDefault();
    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/logout",
      type: "POST",
      crossDomain: true,
      CrossOrigin: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      dataType: "json",
      success: function (data) {
        localStorage.removeItem("access_token");
        console.log("yes");
        // localStorage.removeItem('permission-method');
        $(location).attr("href", "../login.html");
      },
      error: function (error) {
        console.log("No");
      },
    });
  });
});
