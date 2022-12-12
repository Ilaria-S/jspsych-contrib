var jsPluginName = (function (jspsych) {
  "use strict";

  const info = {                                                                                    //static object with name and parameters property
    name: "PuzzleGame",
    parameters: {
      /** The path of the trial */
      url: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "URL",
        default: undefined,
      },

      /* Image URL */
      imgurl: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "Image URL",
        default: undefined,
      },

      /** The button to continue to the next page get by ID. */
      cont_btn: {
        type: jspsych.ParameterType.STRING,
        pretty_name: "Continue button",
        default: null,
      },

      /** Function to check whether user is allowed to continue after clicking cont_key or clicking cont_btn */
      check_fn: {
        type: jspsych.ParameterType.FUNCTION,
        pretty_name: "Check function",
        default: () => true,
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
      this.jsPsych = jsPsych;                                                                       //should store this reference so that the plugin can access 
    }                                                                                               //functionality from the core library and its modules

    trial(display_element, trial, on_load) {                                                        //disp.elem. is the DOM element where jsPsych content is rendered
      //you can also have a third parameter (on_load); in the trial method, you can pretty much do whatever you want; e.g., change contents of display using innerHTML 
      //-> clear the innerHTML after the trial = ' '; you can set and remove timeouts, collect keyboard responses and add asynchronous loading      
      // data saving 

      /* PLUGIN BEGINS HERE */
      // hold the .resolve() function from the Promise that ends the trial
      let trial_complete;
      var url = trial.url;                                                                          // trial is an object containing all of the parameters specified in the corresponding TimelineNode -> access the code url parameter

      fetch(url)                                                                                    //the fetch API takes the url specified and returns a promise                                                             
        .then((response) => {                                                                       //this promise gets resolved using the callback function then with a response object
          return response.text();                                                                   //the response object then gets turned into text (https://gomakethings.com/getting-html-with-fetch-in-vanilla-js/) and is used as an input for the next promise (promise chaining)
        })
        .then((html) => {
          display_element.innerHTML = html;
          on_load();
          var t0 = performance.now();
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
              rt: Math.round(performance.now() - t0),
              url: trial.url,
            };
            display_element.innerHTML = "";
            this.jsPsych.finishTrial(trial_data);
            trial_complete();
          };
          // by default, scripts on the external page are not executed with XMLHttpRequest().
          // To activate their content through DOM manipulation, we need to relocate all script tags
          if (trial.execute_script) {
            // changed for..of getElementsByTagName("script") here to for i loop due to TS error:
            // Type 'HTMLCollectionOf<HTMLScriptElement>' must have a '[Symbol.iterator]()' method that returns an iterator.ts(2488)
            var all_scripts = display_element.getElementsByTagName("script");
            for (var i = 0; i < all_scripts.length; i++) {
              const relocatedScript = document.createElement("script");
              const curr_script = all_scripts[i];
              relocatedScript.text = curr_script.text;
              curr_script.parentNode.replaceChild(relocatedScript, curr_script);
            }
          }
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

      var data = {
        parameter_name: "parameter value",
      };
      // end trial
      this.jsPsych.finishTrial(data);                                                                  //pass an object of data as the parameter to the finishTrial
    }

  }
  PuzzleGame.info = info;

  return PuzzleGame;
})(jsPsychModule);
