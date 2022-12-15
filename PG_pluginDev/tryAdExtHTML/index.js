var jsPluginName = (function (jspsych) {
  "use strict";

  const info = {                                                                                    //static object with name and parameters property
    name      : "PuzzleGame",
    parameters: {
      /** The path of the trial */
      url: {
        type       : jspsych.ParameterType.STRING,
        pretty_name: "URL",
        default    : undefined,
      },

      /* Image URL */
      imgurl: {
        type       : jspsych.ParameterType.STRING,
        pretty_name: "Image URL",
        default    : undefined,
      },

      /** The button to continue to the next page get by ID. */
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
   * **PuzzleGame**
   *
   * This plugin adpated some parts of it's code from Erik Weitnauer's external html plugin but adds a puzzle game 
   * functionality.
   *
   * @author Ilaria Siriner
   * @see {@link https://DOCUMENTATION_URL DOCUMENTATION LINK TEXT}
   */
  class PuzzleGame {
    constructor(jsPsych) {                                                                          //is passed a reference to the instance of the JsPsych class it 
      this.jsPsych = jsPsych;  //should store this reference so that the plugin can access 
    }                                                                                               //functionality from the core library and its modules

    trial(display_element, trial, on_load) {                                                        //disp.elem. is the DOM element where jsPsych content is rendered
      //you can also have a third parameter (on_load); in the trial method, you can pretty much do whatever you want; e.g., change contents of display using innerHTML 
      //-> clear the innerHTML after the trial = ' '; you can set and remove timeouts, collect keyboard responses and add asynchronous loading      
      // data saving 

      /* PLUGIN BEGINS HERE */
      // hold the .resolve() function from the Promise that ends the trial
      let trial_complete;
      var url = trial.url;  // trial is an object containing all of the parameters specified in the corresponding TimelineNode -> access the code url parameter

      fetch(url)                                                                                    //the fetch API takes the url specified and returns a promise                                                             
        .then((response) => {                                                                       //this promise gets resolved using the callback function then with a response object
          return response.text();                                                                   //the response object then gets turned into text (https://gomakethings.com/getting-html-with-fetch-in-vanilla-js/) and is used as an input for the next promise (promise chaining)
        })
        .then((html) => {                                                                           //the string now gets turned into an html element
          display_element.innerHTML = html;  //this html element is now the inner html of the new webpage
          on_load();                                                                                //"The on_load callback can be added to any trial. The callback will trigger once the trial has completed loading. For most plugins, this will occur once the display has been initially updated but before any user interactions or timed events (e.g., animations) have occurred."
          var t0 = performance.now();  //"Indicates which method of recording time to use. The 'performance' method uses calls to performance.now(), which is the standard way of measuring timing in jsPsych" and sets it to t0

          const finish = () => {                                                                    //an anonymous arrow function gets set to the constant finish and only finishes the trial when the check function returns true
            if (trial.check_fn && !trial.check_fn(display_element)) {                               //by default, the check_fn parameter is set to an arrow function that returns true
              return;
            }
            var trial_data = {                                                                      //this stores reaction time and the url and later this variable gets passed to the finish trial function
              rt : Math.round(performance.now() - t0),   //here, I could also track in which ways the tiles were moved
              url: trial.url,
            };
            display_element.innerHTML = "";  //empty the inner HTML so that the screen gets cleared after each trial
            this.jsPsych.finishTrial(trial_data);                                                   //the trial data object gets passed to the finishTrial function and finishComplete() gets called
            trial_complete();
          };

          if (trial.cont_btn) {
            display_element.querySelector("#" + trial.cont_btn).addEventListener("click", finish);  //if the continue button clicked (accessed through id (#)), the finish function is called
          }
        })

        .catch((err) => {                                                                           //if the gets rejected, throw an error
          console.error(`Something went wrong with fetch() in plugin-external-html.`, err);
        });

      return new Promise((resolve) => {                                                             //no matter what, the promises status gets set to resolved and the resolve function is assigned to the variable trial complete (see line 61)
        trial_complete = resolve;
      });
    }



  }
  PuzzleGame.info = info;

  return PuzzleGame;
})(jsPsychModule);
