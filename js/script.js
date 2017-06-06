/**
 * Created by mac_ori on 06/06/2017.
 */
$(document).ready(function() {
    //get the default subReddits:
    subReddit();
    $("#searchBtn").on("click", function(){
        var x = document.getElementById("myText").value;
        if ((x != null) && (x.length > 0)){
            subReddit(x);
        }
    });
    $("#myText").keypress(function(event) {
        if (event.keyCode == 13){
            var x = document.getElementById("myText").value;
            if ((x != null) && (x.length > 0)){
                subReddit(x);
            }
        }
    })
});

function subReddit(text){
    $(".posts").empty();
    if (!text){
        text = "wallpaper";
    }
    reddit.top(text).limit(500)
        .fetch(function(res) {
            if (res){
                var j =-1;
                for (var i=0; i < res.data.children.length; i++){
                    var item = res.data.children[i]
                    if (item.data.thumbnail){
                        j++;
                        var content = "<div class='post col-xs-12 col-md-3'><a target='_blank' href='" + "http://reddit.com" + item.data.permalink + "' class='thumbnail'><h5 class='postTitle'>" + item.data.title + "</h5><img src='" + item.data.thumbnail + "' /></a></div>";
                        if (j==0 || j%4 == 0){
                            $(".posts").append("<div class='row'>");
                        }
                        $(".posts").append(content);
                        $(".posts").append("</div>");
                    }
                    if (j==11){break;}
                }
                if (j==-1){
                    $(".posts").append("<h4>No images were found for this sub-reddit :" + text + " :(</h4>");
                }
            }
        }, function(err){
            console.log(err);
        });
}