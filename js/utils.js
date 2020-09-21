const registerUser = e => {

    var type = $("input:radio[name=option]:checked").val();
    
    var obj = {"name": $("#firstName").val(), "email" : $("#email").val(), "phone":$("#phone").val(), "password": $("#password").val(), "gender": $("#gender").val(), "cuisine":$("#cuisine").val()};

    var clt = type == "provider" ? 'providers' : 'customers';

  /*  
  fetch(url, {
  method: 'POST',
  body: JSON.stringify(obj),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
.then(response => response.json())
.then(json => {console.log("success" + json); $('#result').show(); });*/

db.collection(clt).add(obj).then(() => {
  console.log("Document successfully written!");
  $('#result').show();
})
.catch((error) => {
  console.error("Error writing document: ", error);
});  
}

const loginUser = e => {
	    
    var mail = $("#email").val();
    var pass = $("#password").val();
    var type = $("input:radio[name=option]:checked").val();
    
    var clt = type == "provider" ? 'providers' : 'customers';
    db.collection(clt).get().then((snapshots)=> {
        var objs;
        snapshots.docs.forEach((doc) => {
            objs = doc.data();
            console.log(objs);
            
            console.log(objs.email  === mail);
            console.log(objs.password === pass);

            if(objs.email === mail && objs.password === pass){
                localStorage.setItem("token",doc.id);
                type == "provider" ? location.href = './protected/index.html' : location.href = './protected/cindex.html'
            }
        });
        
    })
    $("#error").show();

    /*console.log(mail);
    console.log(pass);
    console.log(type);
    
    var url = type == "provider" ? 'http://localhost:3000/providers' : 'http://localhost:3000/customers';

fetch(url+'?email='+mail+'&password='+pass+'')
.then(response => response.json())
.then(json => {console.log("success" + JSON.stringify(json));
      json.length == 1 ? (type == "provider" ? location.href = './protected/index.html' : location.href = './protected/cindex.html'): $("#error").show();
 });*/

  }