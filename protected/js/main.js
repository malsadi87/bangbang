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

      //updateReadyMeals(obj);
      
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

const loadMyMeals = e => {
  console.log("Token  " + localStorage.getItem("token"));
  db.collection('Meals').get().then((snapshots)=> {
    var meal;
    var tableHTML = "<tr><thead><tr> <th>Name</th><th>Type</th><th>Cuisine</th><th>Price</th></tr></thead>";

    snapshots.docs.forEach((doc) => {
        meal = doc.data();
        if(meal.owner == localStorage.getItem("token")){
        tableHTML += "<th scope='row'>" + meal.name + "</th>";
        tableHTML += "<th scope='row'>" + meal.type + "</th>";
        tableHTML += "<td>" + meal.cuisine + "</td>";
        tableHTML += "<td>" + meal.price + "</td>";
      //}
      tableHTML += "</tr>";
        }
    });
    document.getElementById("readyMeals").innerHTML = tableHTML;

    
})
}

const loadIncomingOrders = e => {

  db.collection('Orders').get().then((snapshots)=> {
    var order;
    var orderTable= "<tr><thead><tr> <th>#</th><th>Customer</th><th>Meal</th><th>Time</th></tr></thead>";
  
    snapshots.docs.forEach((doc) => {
        order = doc.data();
        if(order.seller == localStorage.getItem("token")){
        orderTable += "<th scope='row'>" + truncateString(doc.id,5) + "</th>";
                                               orderTable += "<td>" + truncateString(order.buyer,5) + "</td>";
                                               orderTable += "<td>" + truncateString(order.mealID,5) + "</td>";
                                               orderTable += "<td>" + order.orderTime.toDate().toLocaleString() + "</td>";
                                             //}
                                             orderTable += "</tr>";
        }
                                        
    });
    document.getElementById("orderTable").innerHTML = orderTable;
  })
}

const getUsername = async(id) => {
  firebase.firestore().collection('customers').doc(id).get()
                                          
                                           .then(function (querySnapshot) {
                                               //console.log(querySnapshot.id, querySnapshot.data());
                                               var c = querySnapshot.data();
                                               console.log("the name of the customer is " + c.name);
                                               return c.name;
                                           }).catch(function(error) {
                                               console.log("Error getting documents: ", error);
                                          });
}

const truncateString = (string, maxLength = 50) => {
  if (!string) return null;
  if (string.length <= maxLength) return string;
  return `${string.substring(0, maxLength)}...`;
};
