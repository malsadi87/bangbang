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
  db.collection('Orders').add(obj).then(() => {
    console.log("Order successfully written!");
  })
  .catch((error) => {
    console.error("Error writing Order: ", error);
  }); 

}

