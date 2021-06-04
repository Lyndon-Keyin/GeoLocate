function main(){

    let but_press = document.getElementById("but1");
    but_press.addEventListener("click",rollOut);

    localStorage.setItem("map_email", "map_email@example.com");
    localStorage.setItem("map_password", "0000")
}

function rollOut(){
    let map_login = document.getElementById("txt1").value;
    let map_pass = document.getElementById("txt2").value;

    let admin_e = localStorage.getItem("map_email");
    let admin_p = localStorage.getItem("map_password");

    if (map_login === admin_e){
        console.log("great!!")
        if (map_pass === admin_p){
            console.log("GREAT!!!")
            redirect()
        }else{
            alert("WRONG PASSWORD!!")
        }
    }else{
        alert("reeneter email")
    }
}

function redirect(){
    window.location.href = "map.html"
};


window.addEventListener('load', main);