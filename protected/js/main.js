const addMeal = e => {

    console.log("addMeal");
    var token = localStorage.getItem("token");
    var name = $("#mealName").val();
    var desc = $("#mealDescription").val();
    var ingredients = [ $("#ingredient1").val(), $("#ingredient2").val(), $("#ingredient3").val(),
                        $("#ingredient4").val(), $("#ingredient5").val(), $("#ingredient6").val() ];
    var cuisine = $("input:radio[name=option]:checked").val();
    var type = "Main Dish";
    var price = $("#price").val()    ;
     
    var obj = {"name":name, "description" : desc, "ingredients" : ingredients, "owner": token, "cuisine" : cuisine, "type" : type, "price": price};
     
    db.collection('Meals').add(obj).then(() => {
      console.log("Meal successfully added!");
      $("#addResult").show();

      updateReadyMeals(obj);
      
    })
    .catch((error) => {
      console.error("Error writing Meal: ", error);
    }); 
}

// update Meals Table once new meal is added
const updateReadyMeals = (entry) => {
  var markup = "<tr><td>"+entry.name+"</td><td>" + entry.type + "</td><td>" + entry.cuisine + "</td><td>"+ entry.price+"</td></tr>";
  $("#readyMeals").append(markup);
}

// Update Order table once new order is received
const updateIncomingOrders = (entry) => {
  var markup = "<tr><td>"+entry.orderNo+"</td><td>" + obj.buyer + "</td><td>" + obj.mealID + "</td><td>"+ obj.orderTime+"</td></tr>";
    $("#orderTable").append(markup);
}

const fillMealsAndOrders = e => {
  console.log("Token  " + localStorage.getItem("token"));
  db.collection('Meals').get().then((snapshots)=> {
    var meal;
    var tableHTML = "<tr><thead><tr> <th>Name</th><th>Type</th><th>Cuisine</th><th>Price</th></tr></thead>";

    snapshots.docs.forEach((doc) => {
        meal = doc.data();
        tableHTML += "<th scope='row'>" + meal.name + "</th>";
        tableHTML += "<th scope='row'>" + meal.type + "</th>";
        tableHTML += "<td>" + meal.cuisine + "</td>";
        tableHTML += "<td>" + meal.price + "</td>";
      //}
      tableHTML += "</tr>";
  
    });
    document.getElementById("readyMeals").innerHTML = tableHTML;

    
})


db.collection('Orders').get().then((snapshots)=> {
  var order;
  var orderTable= "<tr><thead><tr> <th>#</th><th>Customer</th><th>Meal</th><th>Time</th></tr></thead>";

  snapshots.docs.forEach((doc) => {
      order = doc.data();
      orderTable += "<th scope='row'>" + doc.id + "</th>";
      orderTable += "<th scope='row'>" + order.buyer + "</th>";
      orderTable += "<td>" + order.mealID + "</td>";
      orderTable += "<td>" + order.orderTime.toDate().toLocaleString() + "</td>";
    //}
    orderTable += "</tr>";

  });
  document.getElementById("orderTable").innerHTML = orderTable;

  
})
   
}