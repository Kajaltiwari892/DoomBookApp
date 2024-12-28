const loginData = JSON.parse(localStorage.getItem("loginData"));

if(!loginData || loginData.email !== "admin@empher.com"){
    alert("Admin not logged in!");
    window.location.href ="index.html";
}

document.getElementById("logoutButton").addEventListener("click",function(){
    localStorage.removeItem("loginData");
    window.location.href = "index.html";
});