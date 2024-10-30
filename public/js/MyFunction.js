
function wh_location(my_id, my_location){
    var map = document.getElementById(my_id);

    map.src = "https://maps.google.com/maps?q=" + my_location + "&output=embed";
    //map.src = map.src;
    document.getElementById(my_id).src = document.getElementById(my_id).src;
}