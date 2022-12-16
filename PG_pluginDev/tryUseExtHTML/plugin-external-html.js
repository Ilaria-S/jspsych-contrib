var jsPsychPuzzleGame = (function (jspsych) {
  'use strict';

  const info = {
      name      : "PuzzleGame",
      parameters: {
          /** The url of the external html page */
          url: {
              type       : jspsych.ParameterType.STRING,
              pretty_name: "URL",
              default    : undefined,
          },
          /** The key to continue to the next page. */
          cont_key: {
              type       : jspsych.ParameterType.KEY,
              pretty_name: "Continue key",
              default    : null,
          },
          /** The button to continue to the next page. */
          cont_btn: {
              type       : jspsych.ParameterType.STRING,
              pretty_name: "Continue button",
              default    : null,
          },
          /** Function to check whether user is allowed to continue after clicking cont_key or clicking cont_btn */
          check_fn: {
              type       : jspsych.ParameterType.FUNCTION,
              pretty_name: "Check function",
              default    : () => true,
          },
          
      },
  };
  /**
   * **external-html**
   *
   * jsPsych plugin to load and display an external html page. To proceed to the next trial, the
   * user might either press a button on the page or a specific key. Afterwards, the page will be hidden and
   * the experiment will continue.
   *
   * @author Erik Weitnauer
   * @see {@link https://www.jspsych.org/plugins/jspsych-external-html/ external-html plugin documentation on jspsych.org}
   */
  class PuzzleGame {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
      }

      trial(display_element, trial, on_load) {
          function exteralhtml(){
                // hold the .resolve() function from the Promise that ends the trial

                let trial_complete;
                var url = trial.url;
                
                fetch(url)
                    .then((response) => {
                    return response.text();
                })
                    .then((html) => {
                    display_element.innerHTML = html;
                    on_load();
                    var   t0           = performance.now();
                    const key_listener = (e) => {
                        if (this.jsPsych.pluginAPI.compareKeys(e.key, trial.cont_key)) {
                            finish();
                        }
                    };
                    const finish = () => {
                        if (trial.check_fn && !trial.check_fn(display_element)) {
                            return;
                        }
                        if (trial.cont_key) {
                            display_element.removeEventListener("keydown", key_listener);
                        }
                        var trial_data = {
                            rt : Math.round(performance.now() - t0),
                            url: trial.url,
                        };
                        display_element.innerHTML = "";
                        this.jsPsych.finishTrial(trial_data);
                        trial_complete();
                    };

                    if (trial.cont_btn) {
                        display_element.querySelector("#" + trial.cont_btn).addEventListener("click", finish);
                    }
                    if (trial.cont_key) {
                        display_element.addEventListener("keydown", key_listener);
                    }
                })
                    .catch((err) => {
                    console.error(`Something went wrong with fetch() in plugin-external-html.`, err);
                });
                
                return new Promise((resolve) => {
                    trial_complete = resolve;
                });
            }
          

            /*Start of the puzzle game code*/
            function setup_puzzle() {
                var rows    = 3;  //I split the image into 4 wide and 3 high
                var columns = 4;

                var currTile;
                var otherTile;

                window.onload = function() {                                                                        //initialize the 5x5 board when the browser window is leaded
                    for (let r = 0; r < rows; r++) {                                                                //for each element in our board matrix, the html element image is created -> <img>
                        for (let c = 0; c < columns; c++) {
                            let tile     = document.createElement("img");
                                tile.src = "./blank.jpg";                  //and put a blank white image there

                                //DRAG FUNCTIONALITY -> make all tiles dragabble                                    //the event listener adds multiple events to our tile element without overwriting each other
                            tile.addEventListener("dragstart", dragStart);                                          //click on image to drag
                            tile.addEventListener("dragover", dragOver);                                            //drag an image
                            tile.addEventListener("dragenter", dragEnter);                                          //dragging an image into another one
                            tile.addEventListener("dragleave", dragLeave);                                          //dragging an image away from another one
                            tile.addEventListener("drop", dragDrop);                                                //drop an image onto another one
                            tile.addEventListener("dragend", dragEnd);                                              //after you completed dragDrop

                            document.getElementById("b4").append(tile);
                        };
                    };
                };
            };

            exteralhtml();
            setup_puzzle();

            


            
        };
    }
    PuzzleGame.info = info;

    return PuzzleGame;

})(jsPsychModule);
