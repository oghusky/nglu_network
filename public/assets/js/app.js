// checks to see if navigator(browser) supports service workers
if ("serviceWorker" in navigator) {
  // registers worker file
  navigator.serviceWorker.register("../../sw.js")
    // reg and err are built in objects from register method
    .then((reg) => console.log("SERVICE WORKER REGISTERED:", reg))
    .catch((err) => console.log("SOMETHING WENT WRONG!:", err))
}