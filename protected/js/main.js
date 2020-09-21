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
      updateReadyMeals(obj);
      
    })
    .catch((error) => {
      console.error("Error writing Meal: ", error);
    }); 
}

const updateReadyMeals = (entry) => {

  var markup = "<tr><td>"+entry.name+"</td><td>" + entry.type + "</td><td>" + entry.cuisine + "</td><td>"+ entry.price+"</td></tr>";
  $("#readyMeals").append(markup);
}