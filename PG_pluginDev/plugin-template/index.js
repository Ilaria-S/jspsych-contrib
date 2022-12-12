var jsPluginName = (function (jspsych) {
  "use strict";

  const info = {                                                                                      //static object with name and parameters property
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
    constructor(jsPsych) {                                                                              //is passed a reference to the instance of the JsPsych class it 
      this.jsPsych = jsPsych;                                                                           //should store this reference so that the plugin can access 
    }                                                                                                   //functionality from the core library and its modules

    trial(display_element, trial) {                                                                     //disp.elem. is the DOM element where jsPsych content is rendered
      //you can also have a third parameter (on_load); in the trial method, you can pretty much do whatever you want; e.g., change contents of display using innerHTML 
      //-> clear the innerHTML after the trial = ' '; you can set and remove timeouts, collect keyboard responses and add asynchronous loading      
      // data saving                                                                                    
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
