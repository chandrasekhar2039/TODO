if("serviceWorker" in navigator){
  window.addEventListener("load", ()=>{
    navigator.serviceWorker.register("./serviceworker.js")
    .then((registration)=>{
      // console.log("sucess", registration);
    })
    .catch((err)=>{
      // console.log("Uhh ! ", err);
      // fail silently
    })
  })
}
