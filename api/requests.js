$(document).ready(function () {
  getAllRequests();
  // Start Get All Employee
  function getAllRequests() {
    $.ajax({
      url: "https://institute.tagit-global.com/backend/public/api/shipments",
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

      if (items.length !== 0) {
        $.each(items, function (key, item) {
          if (item.state == 0) {
            state = `
            <button class="btn btn-danger canceledButton"  id=""  data-id="${item.id}">Cancel</button>
            <button class="btn btn-success acceptButton"  id="" data-id="${item.id}">Accept</button>
            `;
          } else if(item.state == 1){
            state = ``;
            value = "Accepted"
          }
          else {
            state = ``;
            value = "Canceled"
          }
          output +=
            `
            <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card text-center">
            <img data-enlargable
              class="card-img-top"
              src="https://institute.tagit-global.com/backend/public/storage/Shipment_images/${item.image}"
            />
              <div class="container">
                <h4>${item.user.first_name} ${item.user.last_name}</h4>
                <h5>${item.amount}sp</h5>
                <p> ` +
                value +
                ` </p>
                <div class="request-footer">
                ` +
            state +
            `
                </div>
              </div>
            </div>
          </div>
                `;
        });
        $("#request").empty().append(output);
      } else {
        $("#request")
          .empty()
          .append(`<div class="nodata">There Is No Data.</div>`);
      }
    });
  }
  // On Accept click
  $("body").on("click", ".acceptButton", function (e) {
    e.preventDefault();

    localStorage.setItem("card_id", $(this).data("id"));
    $.ajax({
      url:
        "https://institute.tagit-global.com/backend/public/api/accept-shipment/" +
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
        alert("no");
      },
    });
  });

  // Cancel Request
  $("body").on("click", ".canceledButton", function (e) {
    e.preventDefault();

    localStorage.setItem("card_id", $(this).data("id"));
    $.ajax({
      url:
        "https://institute.tagit-global.com/backend/public/api/cancel-shipment/" +
        localStorage.getItem("card_id"),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      type: "POST",
      dataType: "JSON",
      success: function (data) {
        alert("Canceled Successfully..");
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
