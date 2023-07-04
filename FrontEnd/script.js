$(document).ready(function () {
    var selectedWarehouse = "Warehouse 1"; // Default selected warehouse

    // Warehouse Selection Button Click Event
    $(".warehouse-btn").click(function () {
        // Remove active class from all buttons
        $(".warehouse-btn").removeClass("active");

        // Add active class to the clicked button
        $(this).addClass("active");

        // Get the selected warehouse
        selectedWarehouse = $(this).data("warehouse");

        // Call the getData function to update the displayed data based on the selected warehouse
        getData();
    });

    // Data Insertion Form Submit Event
    $("#insert-form").submit(function (event) {
        event.preventDefault();

        // Get the form data
        var formData = {
            warehouse: $("#warehouse-select").val(),
            datetime: $("#datetime").val(),
            temperature: parseFloat($("#temperature").val()),
            humidity: parseFloat($("#humidity").val()),
            methane: parseFloat($("#methane").val())
        };

        // Insert the data into the database
        insertData(formData);

        // Reset the form
        $("#insert-form")[0].reset();
    });

    // Function to insert data into the database
    function insertData(data) {
        // Perform an AJAX POST request to the server
        $.ajax({
            url: "http://192.168.1.119:8000/insert",
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function () {
                console.log("Data inserted successfully!");

                // Refresh the displayed data based on the selected warehouse
                getData();
            },
            error: function (error) {
                console.error("Error inserting data:", error);
            }
        });
    }

    // Function to get data from the server and update the displayed data
    function getData() {
        // Perform an AJAX GET request to the server
        $.get("http://192.168.1.119:8000/data?warehouse=" + selectedWarehouse, function (data) {
            var html = "";

            for (var i = 0; i < data.length; i++) {
                // Format the date and time
                var datetimeString = data[i].data.datetime;

                // Extract the date and time components
                var datetimeArray = datetimeString.split("T");
                var dateString = datetimeArray[0];
                var timeString = datetimeArray[1].substring(0, 5);

                console.log("Date: " + dateString);
                console.log("Time: " + timeString);

                // Access the data properties correctly
                var temperature = data[i].data.temperature;
                var humidity = data[i].data.humidity;
                var methane = data[i].data.methane;

                // Calculate the lifespan remaining
                var lifespan_constant = 1000;
                var lifespanInDays = (humidity / 100.0) * Math.exp(0.05 * (temperature - 20.0)) * (lifespan_constant / methane);
                var lifespanDays = Math.floor(lifespanInDays);
                var lifespanHours = Math.floor((lifespanInDays - lifespanDays) * 24);
                var lifespanMinutes = Math.floor((((lifespanInDays - lifespanDays) * 24) - lifespanHours) * 60);

                // Generate the HTML for the data
                html += "<div style='border: 1px solid black; padding: 10px;'>";
                html += "<p>Date: " + dateString + "</p>";
                html += "<p>Time: " + timeString + "</p>";
                html += "<p>Temperature: " + temperature + " C</p>";
                html += "<p>Humidity: " + humidity + "%</p>";
                html += "<p>Methane Emission: " + methane + " ml</p>";
                html += "<p>Lifespan Remaining: " + lifespanDays + " Day(s) - " + lifespanHours + " Hour(s) - " + lifespanMinutes + " Min(s)</p>";
                html += "</div>";
            }

            // Update the displayed data
            $("#data").html(html);
        });
    }


    // Call the getData function initially to populate the data based on the default selected warehouse
    getData();
});
