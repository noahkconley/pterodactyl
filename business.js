$(document).ready(function(){
    var collapsed = true;

    $("#discount").click(function(){
        if (collapsed)
            $("#chevron").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");   
        else
            $("#chevron").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");

        collapsed = !collapsed;
    });
    
    $("#set").click(function(){
        alert("Your reminder has been set!");
        $("#remind").click();
    });
});