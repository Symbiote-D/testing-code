

(function () {
    function Start() {
      console.log("App Started...");
      let deletebuttons = document.querySelectorAll(".btn-sm");
      for (button of deletebuttons) {
        button.addEventListener("click", (event) => {
          if (!confirm("Are you sure?")) {
            event.preventDefault();
            window.location.assign("/Tournament-list");
          }
        });
      }
    }
    window.addEventListener("load", Start);
  })();