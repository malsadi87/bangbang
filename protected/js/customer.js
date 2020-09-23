const fillMeals = e => {
  console.log("Token  " + localStorage.getItem("token"));
  db.collection('Meals').get().then((snapshots)=> {
    var meal;
    var tableHTML = "<tr><thead><tr> <th>Name</th><th>Cuisine</th><th>Price</th><th>Order</th></tr></thead>";

    snapshots.docs.forEach((doc) => {
        meal = doc.data();
        tableHTML += "<th scope='row'>" + meal.name + "</th>";
        tableHTML += "<td>" + meal.cuisine + "</td>";
        tableHTML += "<td>" + meal.price + "</td>";
        tableHTML += "<td>" + '<a href="viewMeal.html?id=' + doc.id + '">View</a>' +"</td>";
      //}
      tableHTML += "</tr>";
  
    });
    document.getElementById("mealsTable").innerHTML = tableHTML;
})
}

const loadMealDetails = e => {
  var mealID = location.search.split('id=')[1];
  db.collection('Meals').doc(mealID).get().then((docRef) => { 
    console.log(docRef.data());     

    var meal = docRef.data();
    $("#mealTitle").text(meal.name);
    $('#mealDescription').text(meal.description).css("color", 'purple');
    $('#mealType').text(meal.type).css("color", 'purple');
    $('#mealOwner').text(meal.owner).css("color", 'purple');

    var ingredients = meal.ingredients;
    console.log(ingredients);
    ingredients.forEach((entry, index) => {
      $('#ingredient'+(index+1)).text(entry).css("color", 'purple');
  });

})
  .catch((error) => { });
}

const orderMeal = e => {
  
  
  var obj = {"mealID" : location.search.split('id=')[1], "buyer" : localStorage.getItem("token"), "seller" : $('#mealOwner').text(), "orderTime": new Date()}
  db.collection('Orders').add(obj).then((transaction) => {
    console.log("Order successfully written!");
    $("#orderResult").show();

    
    //var data = {"buyer":obj.buyer, "mealID":obj.mealID, "orderTime":obj.orderTime, "orderNo": transaction.id};
    //var markup = "<tr><td>"+data.orderNo+"</td><td>" + data.buyer + "</td><td>" + data.mealID + "</td><td>"+ data.orderTime+"</td></tr>";
    //$("#orderTable").append(markup);
  })
  .catch((error) => {
    console.error("Error writing Order: ", error);
  }); 

}

const loadMyOrders = e => {

    db.collection("Orders").where("buyer", "==", localStorage.getItem("token"))
    .get()
    .then(function(querySnapshot) {
      var order ;
      var orderTable= "<tr><thead><tr> <th>#</th><th>Customer</th><th>Meal</th><th>Time</th></tr></thead>";
        querySnapshot.forEach(function(doc) {
           
            order = doc.data();
            orderTable += "<th scope='row'>" + truncateString(doc.id,5) + "</th>";
                                                 orderTable += "<td>" + truncateString(order.buyer,5) + "</td>";
                                                 orderTable += "<td>" + truncateString(order.mealID,5) + "</td>";
                                                 orderTable += "<td>" + order.orderTime.toDate().toLocaleString() + "</td>";
                                               //}
                                               orderTable += "</tr>";

        });
        document.getElementById("myOrders").innerHTML = orderTable;

    })
    .catch(function(error) {
        alert("Error getting orders: ", error);
    });


}


const truncateString = (string, maxLength = 50) => {
  if (!string) return null;
  if (string.length <= maxLength) return string;
  return `${string.substring(0, maxLength)}...`;
};


