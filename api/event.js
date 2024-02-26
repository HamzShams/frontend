$(document).ready(function () {
  getAllEvent();
  // Start Get All Event
  function getAllEvent() {
    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/events",
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
      let icon = "";
      if (localStorage.getItem("role") == 0) {
        icon = ""
      }
      else{
        icon = `<i class="fa fa-times" data-id=${item.id} id="delete"></i>
        `
      }
      console.log(localStorage.getItem("access_token"));

      if (items.length !== 0) {
        // console.log(items);
        $.each(items, function (key, item) {
          output += `
            <div class="col-lg-4 col-md-6 col-xs-12">
            <div class="card">
            `+ icon +`
              <img
                class="card-img-top"data-enlargable
                src="https://institute.tagit-global.com/backend/public/storage/Event_images/${item.image}"
              />
              <div class="card-body">
                <h4>${item.event_name}</h4>
                <h5>${item.place}</h5>
                <h6>${item.date}</h6>
                <p class="card-text des">${item.description}
                </p>
              </div>
            </div>
          </div>
                `;
        });
        $("#event").empty().append(output);
      } else {
        $("#event")
          .empty()
          .append(`<div class="nodata">There Is No Data.</div>`);
      }
    });
  }
  //Add Event
  $("body").on("submit", "#addEvent", function (e) {
    e.preventDefault();

    var data = new FormData(this);

    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/event",
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
      error: function () {
        console.log("bad");
        alert("You Cant");
      },
    });
  });
  //Delete Event
  $("body").on("click", "#delete", function (e) {
    e.preventDefault();

    let id = $(this).data("id");
    console.log(id);

    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/event/" + id,
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
  //Serach Event
  $("body").on("input", "#search", function (e) {
    e.preventDefault();

    let val = $(this).val();
    if (val == "") {
      getAllEvent();
      return;
    }
    console.log(val);
    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/events",
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
        $("#event").empty().append(output);
      },
    }).done(function (items) {
      let output = "";
      console.log(localStorage.getItem("access_token"));

      if (items.length !== 0) {
        console.log(items);
        $.each(items, function (key, item) {
          output += `
          <div class="col-lg-4 col-md-6 col-xs-12">
          <div class="card">
          <i class="fa fa-times" data-id=${item.id} id="delete"></i>
            <img
              class="card-img-top"data-enlargable
              src="https://institute.tagit-global.com/backend/public/storage/Event_images/${item.image}"
            />
            <div class="card-body">
              <h4>${item.event_name}</h4>
              <h5>${item.place}</h5>
              <h6>${item.date}</h6>
              <p class="card-text des">${item.description}
              </p>
            </div>
          </div>
        </div>
              `;
        });
        $("#event").empty().append(output);
      } else {
        $("#event")
          .empty()
          .append(`<div class="nodata">There Is No Data.</div>`);
      }
    });
  });
});
