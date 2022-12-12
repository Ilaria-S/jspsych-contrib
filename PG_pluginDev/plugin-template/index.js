var jsPluginName = (function (jspsych) {
  "use strict";

  const info = {                                                                                      //static object with name and parameters property
    name: "PuzzleGame",
    parameters: {
      parameter_name: {                                                                               //substitute with whatever your want, e.g., name = image_duration
        type: jspsych.ParameterType.INT,                                                              //and then default 500 for 500ms
        default: undefined,                                                                           //if the default value is undefined then a user must specify a 
      },                                                                                              //val for this  when creating a trial using the plugin on timeline

      parameter_name2: {
        type: jspsych.ParameterType.IMAGE,
        default: undefined,
      },
    },
  };



  /**
   * **PuzzleGame**
   *
   * this plugin takes an image and slices it into 12 pieces which the participant then can put together to solve the puzzle
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
