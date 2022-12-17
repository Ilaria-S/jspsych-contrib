var jsPuzzleGame = (function (jspsych) {
  "use strict";

  const info = {                                                                                    //static object with name and parameters property
    name: "jsPuzzleGame",
    parameters: {
      imagepath: {                                                                                  //substitute with whatever your want, e.g., name = image_duration
        type: jspsych.ParameterType.STRING,                                                         //and then default 500 for 500ms
        default: undefined,                                                                         //if the default value is undefined then a user must specify a 
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



  class jsPuzzleGame {
    constructor(jsPsych) {                                                                          //is passed a reference to the instance of the JsPsych class it 
      this.jsPsych = jsPsych;                                                                       //should store this reference so that the plugin can access 
    }                                                                                               //functionality from the core library and its modules

    trial(display_element, trial) {                                                                 //disp.elem. is the DOM element where jsPsych content is rendered
      //you can also have a third parameter (on_load); in the trial method, you can pretty much do whatever you want; e.g., change contents of display using innerHTML 
      //-> clear the innerHTML after the trial = ' '; you can set and remove timeouts, collect keyboard responses and add asynchronous loading 

      /*declare all neccessary variables*/
      var start_time = performance.now();                                                           //this variable is later used to 
      
    
      var new_html = '<div class = "trayS" id = "t4">' +  '</div>' + '<div class = "board" id = "b4">' + '</div>' + '<button class = "startExp2" id = "np_t4">Next puzzle</button>' + '<input  type = "button" onclick = "new_popup()" value = "Need help?" class = "helpBtn">';
      // display_element.innerHTML = new_html;
      


      
      // data saving                                                                                    
      // var data = {                                                                               //somehow it throws me an error when I try to do this
      //   image_used: trial.imagepath,
      // };


      function show_html(){
        display_element.innerHTML = new_html;
        
      }

      


      

      show_html();

      // end trial
      this.jsPsych.finishTrial(data);                                                                  //pass an object of data as the parameter to the finishTrial
    }

  }
  jsPuzzleGame.info = info;

  return jsPuzzleGame;
})(jsPsychModule);
