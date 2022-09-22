$(document).ready(function () {
    // updating the data from local
    updatefromlocal();
    function updatefromlocal() {
        localdatastr = localStorage.getItem("localdata");
        if (localdatastr) {
            localdataarray = JSON.parse(localdatastr);
            $("#tablebd").empty();
        }
        else {
            localdataarray = [];

        }
        let htmli = "";
        localdataarray.forEach((element, index) => {
            htmli += `  <tr>
            <td data-id="${index}" id="arrayid">${index + 1}</td>
            <td class="name">${element.name}</td>
            <td class="number">${element.contact}</td>
            <td class="altnum">${element.altnum}</td>
            <td class="address">${element.addresss}</td>
            <td class="text-center"><button class='btn btn-sm btn-success btn-edit'> Edit</button><button class='btn btn-sm btn-danger btndel mx-3'> Delete</button></td>
        </tr>
            `;
            $("#tablebd").html(htmli)
        });

    };

    // adding the line if there is no record
    emptyrow();
    function emptyrow() {
        if ($("#tablebd").children().length == 0) {

            $("#tablebd").append("<tr><td colspan='6' class='text-center'> No Records Available</td></tr>")
        }
    }

    function clearform() {
        $("#txtName").val('');
        $("#txtContact").val("");
        $("#txtAltNo").val('');
        $("#txtAddress").val('');
    }
    // clreaing the full record
    $("#btnClear").click(function () {
        localStorage.clear();
        $("#tablebd").empty();
        emptyrow();
    })
    // adding the items in local storage
    $("#btnSave").click(function () {
        if(!$(".form-control").val()==""){
            if ($(this).text() == "Update") {

                updateEdit();
            }
            else {
                addtolocal();
    
            }
        }
        else{
            alert("Please enter something!")
        }
    
    });

    function addtolocal() {
        localdatastr = localStorage.getItem("localdata")
        if (localdatastr) {
            localdataarray = JSON.parse(localdatastr)
        }
        else {
            localdataarray = [];
        }
        obg = {
            id: localdataarray.length + 1,
            name: $("#txtName").val(),
            contact: $("#txtContact").val(),
            altnum: $("#txtAltNo").val(),
            addresss: $("#txtAddress").val()
        }
        localdataarray.push(obg)
        localStorage.setItem("localdata", JSON.stringify(localdataarray))
        updatefromlocal();
        clearform();
    };
// delete an item from local
    $("#tablebd").on("click", ".btndel", function () {
        const id = $(this).parent().parent().find("#arrayid").attr("data-index");
        localdatastr = localStorage.getItem("localdata");
        localdataarray = JSON.parse(localdatastr);
        localdataarray.splice(id, 1);
        localStorage.setItem("localdata", JSON.stringify(localdataarray));
        updatefromlocal();
        emptyrow();

    })
    // when click on edit button
    $("#tablebd").on("click", ".btn-edit", function () {
        let localid = $(this).parent().parent().find("#arrayid").text();
        let localname = $(this).parent().parent().find(".name").html();
        let localnumber = $(this).parent().parent().find(".number").html();
        let localaltnum = $(this).parent().parent().find(".altnum").html();
        let localaddress = $(this).parent().parent().find(".address").html();

        $("#txtName").val(localname);
        $("#txtContact").val(localnumber);
        $("#txtAltNo").val(localaltnum);
        $("#txtAddress").val(localaddress);
        $("#txtId").val(localid);
        $("#btnSave").text("Update");
    })
    // adding editable data back in local and update
    function updateEdit() {
        let localdatastr = localStorage.getItem("localdata");
        let localdataarray = JSON.parse(localdatastr);
        const localedit = localdataarray.find(m => m.id == $("#txtId").val());
        localedit.name = $("#txtName").val();
        localedit.contact = $("#txtContact").val();
        localedit.altnum = $("#txtAltNo").val();
        localedit.addresss = $("#txtAddress").val();
        localStorage.setItem("localdata", JSON.stringify(localdataarray));
        $("#btnSave").text("Save");
        updatefromlocal();
        clearform();
    }
})
