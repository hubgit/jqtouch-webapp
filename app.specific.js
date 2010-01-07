app.settings = {
  feed: "http://hublog.hubmed.org/index.atom", // feed to load
  count: "20" // number of items to load
};

var feed = {
  init: function(settings){
    if (!app.settings.feed){
      app.showSettings();
      return false;
    }
    
    $("#items").html("<li id='loading'><img src='images/loading.gif'/></li>");
    
    $.getJSON("http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&scoring=h&callback=?&q=" + encodeURIComponent(app.settings.feed) + "&num=" + app.settings.count, feed.showItems);
  },

  showItems: function(data){  
    if (data.responseStatus != 200){
      $("#loading").text("Error loading feed");
      return false; 
    }
    
    $("#items").empty();
    
    $("#title").text(data.responseData.feed.title);
        
    for (var i in data.responseData.feed.entries)     
      feed.showItem(data.responseData.feed.entries[i]);
  },

  showItem: function(item){    
    var a = $("<a rel='external' target='_content'/>")
      .attr("href", item.link)
      .append($("<span/>").addClass("title").text(item.title));
    
    $("#items").append($("<li class='item'/>").append(a));
  }
};

app.main = feed.init;
