// Main.js
$(function() {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDLx0CZkWl9C4UWJ7eplmh3ROsJGUIw82U",
        authDomain: "m12-exercise1.firebaseapp.com",
        databaseURL: "https://m12-exercise1.firebaseio.com",
        storageBucket: "m12-exercise1.appspot.com",
        messagingSenderId: "71779520569"
    };
    firebase.initializeApp(config);

    // Reading Data: Create new database reference 'todos'
    var todos = firebase.database().ref('todos');

    // Reading Data:
    // Set listener: on change, empty the todo list, and iterate through to make a new list
    todos.on('value', function(snapshot){
      var data = snapshot.val();
      var todo_list = $('#todo-list');
      todo_list.empty();

      Object.keys(data).forEach(function(keys){
        renderTodo(keys, data[keys]);
      })
    })


    // Rendering Data: Function to make todos
    var renderTodo = function(id, content) {

        // Create new todo <div> with classes 'todo', and the priority of the item
        var item = $('<div>').attr('class', 'todo ' +  content.priority);

        // Create an <h5> element, set it's text to the description, and class as the status
        var descr = $('<h5>').text(content.description);
        item.append(descr);

        // Update Data: create a check icon with click event

        var check = $('<i>').attr('class', 'fa fa-check fa-2x' + content.status);

        // Flip the status on click
        check.on('click', function(){
          var currStatus = content.status;
          if(currStatus == 'incomplete'){
            currStatus = 'complete';
          } else{
            currStatus = 'incomplete';
          }

          // Set the child values of the item
          todos.child(id).set({
            description: content.description,
            priority: content.priority,
            status: currStatus
          })
        })



        // Deleting data: Delete icon: on click, remove the reference
        var del = $('<i>').attr('class', 'fa fa-times');

        del.on('click', function(){
          todos.child(id).remove();
        })

        // Update/Delete data: append the icons to the newTodo item
        item.append(check);
        item.append(del);

        // Append newTodo item to item with id #todo-list
        $('#todo-list').append(item);


    };

    // Reading Data: Form submission
    $('form').on('submit', function(event) {
        event.preventDefault();

        // Get values
        var priority = $(this).find('input:checked')[0].id;
        var text = $(this).find('input').val();

        // Reading Data: Push new item into `todos` reference
        todos.push({
            description: text,
            priority: priority,
            status: 'incomplete'
        });
        // Reset the form
        this.reset();
    });
});
