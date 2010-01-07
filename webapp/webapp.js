function load() {
  var wrapper = new XPCNativeWrapper(window.content);
  wrapper.fullScreen = true;
  
  var doc = wrapper
    .QueryInterface(Ci.nsIInterfaceRequestor)
    .getInterface(Ci.nsIWebNavigation)
    .QueryInterface(Ci.nsIDocShellTreeItem)
    .rootTreeItem
    .QueryInterface(Ci.nsIInterfaceRequestor)
    .getInterface(Ci.nsIDOMWindow)
    .document;
  
  var sidebar = doc.getElementById("browser_sidebar");
  var container = sidebar.parentNode;
  
  var headers = container.getElementsByTagName("hbox");
  container.removeChild(headers[0]);      
  
  container.setAttribute("collapsed", false);
  container.setAttribute("width", 400);
  
  sidebar.setAttribute("src", wrapper.document.location);
  //wrapper.document.location = "about:blank";
}
