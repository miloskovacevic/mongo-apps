$(document).ready(function () {
    $('#add_category').submit(addCategory);
    $('#edit_category').submit(updateCategory);
    $('body').on('click', '.btn-edit-category',  setCategory);
    $('body').on('click', '.btn-delete-category', deleteCategory);
});

function getTasks(){

}

var api_key = 'xQwEfYp4PIRcRUGVunieXhPEvHv3ZUUm';

function getCategories(){

    $.get('https://api.mongolab.com/api/1/databases/taskmanager/collections/categories?apiKey=' + api_key, function (podaci) {
        var output = '<ul class="list-group">';
        $.each(podaci, function (key, pojedinacan_podatak) {
            output += '<li class="list-group-item category">' + pojedinacan_podatak.category_name + '<div class="pull-right"><a class="btn btn-primary btn-edit-category" data-category-id="' + pojedinacan_podatak._id.$oid + '">Edit</a><a class="btn btn-danger btn-delete-category" data-category-id="'+ pojedinacan_podatak._id.$oid + '">Delete</a></div>' + '</li>';
        });
        output += '</ul>';
        $("#categories").html(output);
    });
}

function addCategory(){
    var category_name = $("#category_name").val();
    $.ajax({
        url: "https://api.mongolab.com/api/1/databases/taskmanager/collections/categories?apiKey=" + api_key,
        data: JSON.stringify({"category_name" : category_name}),
        type: "POST",
        contentType: "application/json",
        success: function(data){
            window.location.href = "categories.html";
        },
        error: function(xhr, status, err){
            console.log(err);
        }
    });
    return false;
}

function updateCategory(){
    var category_name = $("#category_name").val();
    var category_id = sessionStorage.getItem('currentCategoryId');

    $.ajax({
        url: "https://api.mongolab.com/api/1/databases/taskmanager/collections/categories/" + category_id + "?apiKey=" + api_key,
        data: JSON.stringify({"category_name" : category_name}),
        type: "PUT",
        contentType: "application/json",
        success: function(data){
            window.location.href = "categories.html";
        },
        error: function(xhr, status, err){
            console.log(err);
        }
    });
    return false;
}

function setCategory(){
    var category_id = $(this).data('category-id');
    sessionStorage.setItem('currentCategoryId', category_id);
    window.location.href = 'editcategory.html';
    return false;
}

function deleteCategory(){
    var category_id = $(this).data('category-id');

    $.ajax({
        url: "https://api.mongolab.com/api/1/databases/taskmanager/collections/categories/" + category_id + "?apiKey=" + api_key,
        type: "DELETE",
        async: true,
        success: function(data){
            window.location.href = "categories.html";
        },
        error: function(xhr, status, err){
            console.log(err);
        }
    });
    return false;
}

function getCategory(){
    var category_id = sessionStorage.getItem('currentCategoryId');

    $.get("https://api.mongolab.com/api/1/databases/taskmanager/collections/categories/" + category_id + "?apiKey=" + api_key, function (podatak) {
        $("#category_name").val(podatak.category_name);
    })
}