/* =========================================================
   RAKHI SURPRISE — FINAL SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =======================================================
     ELEMENTS
  ======================================================= */

  const screens = Array.from(
    document.querySelectorAll(".screen")
  );

  const openFirst =
    document.getElementById("open-first");

  const dontOpen =
    document.getElementById("dont-open");

  const dontMessage =
    document.getElementById("dont-message");

  const giftBox =
    document.getElementById("gift-box");

  const openBox =
    document.getElementById("open-box");

  const rakhiScene =
    document.getElementById("rakhi-scene");

  const replay =
    document.getElementById("replay");


  let currentPage = 1;

  let boxIsOpening = false;


  /* =======================================================
     PAGE NAVIGATION
     ======================================================= */

  function showPage(pageNumber) {

    const target =
      document.getElementById(
        `screen-${pageNumber}`
      );


    if (!target) {

      console.error(
        `screen-${pageNumber} does not exist.`
      );

      return;

    }


    screens.forEach(screen => {

      screen.classList.remove("active");

      screen.style.display = "none";

    });


    target.classList.add("active");

    target.style.display = "flex";


    currentPage =
      pageNumber;


    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });

  }


  /* =======================================================
     PAGE 1 — OPEN
     ======================================================= */

  if (openFirst) {

    openFirst.addEventListener(
      "click",
      () => {

        showPage(2);

      }
    );

  }


  /* =======================================================
     PAGE 1 — DON'T OPEN
     ======================================================= */

  if (dontOpen) {

    dontOpen.addEventListener(
      "click",
      () => {

        /*
         * Hide DON'T OPEN
         */

        dontOpen.style.display =
          "none";


        /*
         * Show:
         * "Neeku DON'T OPEN option ledhu"
         */

        if (dontMessage) {

          dontMessage.hidden =
            false;

          dontMessage.style.display =
            "block";

        }


        /*
         * Make OPEN button bigger
         */

        if (openFirst) {

          openFirst.classList.add(
            "open-after-denied"
          );

          openFirst.textContent =
            "OPEN 😌";

        }

      }
    );

  }


  /* =======================================================
     PAGE 2 — OPEN RAKHI BOX
     ======================================================= */

  function openRakhiBox() {

    /*
     * Prevent double-clicking.
     */

    if (boxIsOpening) {
      return;
    }


    boxIsOpening = true;


    /*
     * Disable OPEN THE BOX button.
     */

    if (openBox) {

      openBox.disabled =
        true;

      openBox.textContent =
        "OPENING... ❤️";

    }


    /*
     * Start the box animation.
     */

    if (giftBox) {

      giftBox.classList.add(
        "open"
      );

    }


    /*
     * Reveal the Rakhi.
     */

    if (rakhiScene) {

      setTimeout(() => {

        rakhiScene.classList.add(
          "revealed"
        );

      }, 180);

    }


    /*
     * Move to Page 3.
     *
     * Short enough that the user sees
     * the animation, but there is no
     * chance of getting stuck.
     */

    setTimeout(() => {

      showPage(3);

      boxIsOpening = false;

    }, 850);

  }


  if (openBox) {

    openBox.addEventListener(
      "click",
      openRakhiBox
    );

  }


  /*
   * Clicking the box itself also opens it.
   */

  if (giftBox) {

    giftBox.addEventListener(
      "click",
      openRakhiBox
    );

  }


  /* =======================================================
     ALL NEXT BUTTONS
     ======================================================= */

  const nextButtons =
    document.querySelectorAll(
      "[data-next]"
    );


  nextButtons.forEach(button => {

    /*
     * Page 1 OPEN already has
     * its own event listener.
     */

    if (button === openFirst) {
      return;
    }


    button.addEventListener(
      "click",
      () => {

        const destination =
          parseInt(
            button.dataset.next,
            10
          );


        if (
          Number.isInteger(destination)
        ) {

          showPage(destination);

        }

      }
    );

  });


  /* =======================================================
     PAGE 6 — REPLAY
     ======================================================= */

  if (replay) {

    replay.addEventListener(
      "click",
      () => {

        /*
         * Reset Page 1
         */

        if (dontOpen) {

          dontOpen.style.display =
            "inline-flex";

        }


        if (dontMessage) {

          dontMessage.hidden =
            true;

          dontMessage.style.display =
            "none";

        }


        if (openFirst) {

          openFirst.classList.remove(
            "open-after-denied"
          );

          openFirst.textContent =
            "OPEN 🎁";

        }


        /*
         * Reset Rakhi box
         */

        if (giftBox) {

          giftBox.classList.remove(
            "open"
          );

        }


        if (rakhiScene) {

          rakhiScene.classList.remove(
            "revealed"
          );

        }


        if (openBox) {

          openBox.disabled =
            false;

          openBox.textContent =
            "OPEN THE BOX";

        }


        boxIsOpening =
          false;


        /*
         * Start again.
         */

        showPage(1);

      }
    );

  }


  /* =======================================================
     OPTIONAL KEYBOARD SUPPORT
     ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      /*
       * Escape goes back one page.
       */

      if (
        event.key === "Escape" &&
        currentPage > 1
      ) {

        showPage(
          currentPage - 1
        );

      }

    }
  );


  /* =======================================================
     INITIALIZE
     ======================================================= */

  showPage(1);

});