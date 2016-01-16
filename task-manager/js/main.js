$(document).ready(function () {
    $('#add_category').submit(addCategory);
    $('#edit_category').submit(updateCategory);
    $('#add_task').submit(addTask);
    $('#edit_task').submit(updateTask);

    $('body').on('click', '.btn-edit-category',  setCategory);
    $('body').on('click', '.btn-delete-category', deleteCategory);

    $('body').on('click', '.btn-edit-task', setTask);
    $('body').on('click', '.btn-delete-task', deleteTask);

});

var api_key = 'xQwEfYp4PIRcRUGVunieXhPEvHv3ZUUm';

function getTasks(){
    $.get('https://api.mongolab.com/api/1/databases/taskmanager/collections/tasks?apiKey=' + api_key, function (podaci) {
        var lista = '<ul class="list-group">';

        $.each(podaci, function (key, pojedinacan_podatak) {
            lista += '<li class="list-group-item category">Task name:' + pojedinacan_podatak.task_name +
            ' | Category: ' + pojedinacan_podatak.category + ' | Due Date: ' + pojedinacan_podatak.due_date +
            ' | Is Urgent: ' + pojedinacan_podatak.is_urgent + '<div class="pull-right"> <a class="btn btn-primary btn-edit-task"' +
            ' data-task-id="' + pojedinacan_podatak._id.$oid + '">Edit</a><a class="btn btn-danger btn-delete-task" data-task-id="'
            + pojedinacan_podatak._id.$oid + '">Delete</a> </div> </li>';
        });

        lista += '</ul>';
        $("#tasks").append(lista);
    });
}

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

function addTask(){
    var taskName = $('#task_name').val();
    var category = $('#category').val();
    var due_date = $('#due_date').val();
    var is_urgent = $('#is_urgent').val();

    $.ajax({
        url: "https://api.mongolab.com/api/1/databases/taskmanager/collections/tasks?apiKey=" + api_key,
        data: JSON.stringify({
            "task_name" : taskName,
            "category"  : category,
            "due_date"  : due_date,
            "is_urgent" : is_urgent
        }),
        type: "POST",
        contentType: "application/json",
        success: function(data){
            window.location.href = "index.html";
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

function updateTask(){
    var task_name = $('#task_name').val();
    var task_id = sessionStorage.getItem('currentTaskId');
    var category = $('#category').val();
    var due_date = $('#due_date').val();
    var is_urgent = $('#is_urgent').val();

    $.ajax({
        url: "https://api.mongolab.com/api/1/databases/taskmanager/collections/tasks/" + task_id + "?apiKey=" + api_key,
        data: JSON.stringify({
            "task_name" : task_name,
            "category" : category,
            "due_date" : due_date,
            "is_urgent" : is_urgent
        }),
        type: "PUT",
        contentType: "application/json",
        success: function(data){
            window.location.href = "index.html";
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

function setTask(){
    var task_id = $(this).data('task-id');
    sessionStorage.setItem('currentTaskId', task_id);
    window.location.href = "edittask.html";
    return false;
}

function deleteTask(){
    var task_id = $(this).data('task-id');

    $.ajax({
        url: "https://api.mongolab.com/api/1/databases/taskmanager/collections/tasks/" + task_id + "?apiKey=" + api_key,
        type: "DELETE",
        async: true,
        success: function(data){
            window.location.href = "index.html";
        },
        error: function(xhr, status, err){
            console.log(err);
        }
    });

    return false;
}

function getTask(){

    var task_id = sessionStorage.getItem('currentTaskId');

    $.get("https://api.mongolab.com/api/1/databases/taskmanager/collections/tasks/" + task_id + "?apiKey=" + api_key, function(podatak){
        $("#task_name").val(podatak.task_name);
        $("#category").val(podatak.category);
        $("#due_date").val(podatak.due_date);
        if(podatak.is_urgent == 'yes'){
            $("#is_urgent").val("yes");
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

function getCategoryOptions(){
    $.get('https://api.mongolab.com/api/1/databases/taskmanager/collections/categories?apiKey=' + api_key, function (podaci) {
        var output;
        $.each(podaci, function (key, pojedinacan_podatak) {
            console.log('Podatak ' + pojedinacan_podatak);
            output += '<option value="' + pojedinacan_podatak.category_name + '">' + pojedinacan_podatak.category_name + '</option>'  ;
        });
        $("#category").append(output);
    });
}


