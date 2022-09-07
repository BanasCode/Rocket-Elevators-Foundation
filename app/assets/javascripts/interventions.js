//= require jquery

$(document).ready(function () {

    customerTable();
    employeeTable();
    $('#selectCustomers').on('input', function () {
        buildingClear();
        buildingTable();
    });
    $('#selectBuilding').on('input', function () {
        batteryClear();
        batteryTable();
    });
    $('#selectBattery').on('input', function () {
        columnClear();
        columnTable();
    });
    $('#selectColumn').on('input', function () {
        elevatorClear();
        elevatorTable();
    });
    $('#selectElevator').on('input', function () {
    });






    function customerTable() {
        $.ajax({
            type: "GET",
            url: "/customer/search",
            datatype: "json",
            success: function(result) {
                for (email in result) {
                    $('#selectCustomers').append(`<option value="${result[email].id}"> ${result[email].email} </option>`);
                }
            }
        })
    };

    function employeeTable() {
        $.ajax({
            type: "GET",
            url: "/employee/search",
            datatype: "json",
            success: function(result) {
                for (employee in result) {
                    $('#selectEmployee').append(`<option value="${result[employee].id}"> ${result[employee].first_name} ${result[employee].last_name} </option>`);
                }
            }
        })
    };

    function buildingTable() {
        $('#selectBuilding-show').show();
        $('#selectBuilding').append(`<option value="">---Select---</option>`);
        var customer = $('#selectCustomers').val();
        $.ajax({
            type: "GET",
            url: "/building/search",
            datatype: "json",
            data: {'customer': customer},
            success: function(result) {
                for (building in result) {
                    $('#selectBuilding').append(`<option value="${result[building].id}"> ${result[building].address} </option>`);
                }
            }
        })
    };

    function batteryTable() {
        $('#selectBattery-show').show();
        $('#selectBattery').append(`<option value="">---Select---</option>`);
        var building = $('#selectBuilding').val();
        $.ajax({
            type: "GET",
            url: "/battery/search",
            datatype: "json",
            data: {'building': building},
            success: function(result) {
                for (battery in result) {
                    $('#selectBattery').append(`<option value="${result[battery].id}"> ${result[battery].id} </option>`);
                }
            }
        })
    };

    function columnTable() {
        $('#selectColumn-show').show();
        $('#selectColumn').append(`<option value="">---Select---</option>`);
        var battery = $('#selectColumn').val();
        $.ajax({
            type: "GET",
            url: "/column/search",
            datatype: "json",
            data: {'battery': battery},
            success: function(result) {
                for (column in result) {
                    $('#selectColumn').append(`<option value="${result[column].id}"> ${result[column].id} </option>`);

                }
            }
        })
    };

    function elevatorTable() {
        $('#selectElevator-show').show();
        $('#selectElevator').append(`<option value="">---Select---</option>`);
        var column = $('#selectElevator').val();
        $.ajax({
            type: "GET",
            url: "/elevator/search",
            datatype: "json",
            data: {'column': column},
            success: function(result) {
                for (elevator in result) {
                    $('#selectElevator').append(`<option value="${result[elevator].id}"> ${result[elevator].id} </option>`);
                }
            }
        })
    };




    function buildingClear () {
        $('#selectBuilding').empty();
        $('#selectBattery').empty();
        $('#selectColumn').empty();
        $('#selectElevator').empty();
    };

    function batteryClear () {
        $('#selectBattery').empty();
        $('#selectColumn').empty();
        $('#selectElevator').empty();
    };

    function columnClear () {
        $('#selectColumn').empty();
        $('#selectElevator').empty();
    };

    function elevatorClear () {
        $('#selectElevator').empty();
    };

});