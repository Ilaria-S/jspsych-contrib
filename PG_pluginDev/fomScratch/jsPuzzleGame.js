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
      var start_time = performance.now();                                                           //this variable is later used to calculate the rt
      var new_html = '<div class = "trayS" id = "t4">' +  '</div>' + '<div class = "board" id = "b4">' + '</div>' + '<button class = "startExp2" id = "np_t4">Next puzzle</button>' + '<input  type = "button" value = "Need help?" class = "helpBtn">';
      
      var rows    = 3;  //I split the image into 4 wide and 3 high
      var columns = 4;
      var currTile;
      var otherTile;


      function build_html() {                                                                        
        display_element.innerHTML = new_html;                                                       //set up the basic structure for the trial

        display_element                                                                             //add an event listener to the element with the class name startExp2
          .querySelector(".startExp2")
          .addEventListener("click", () => {                                                        //if that button is clicked, it calles the endtrial function
            end_trial();
          }
        );

        display_element
          .querySelector(".helpBtn")
          .addEventListener("click", () =>{
            new_popup();
          },
        );
      }

      const end_trial = () => {
        this.jsPsych.pluginAPI.clearAllTimeouts();                                                  // kill any remaining setTimeout handlers
        
        // gather the data to store for the trial
        var end_time = performance.now();                                                           //grab current time to calculate total puzzle time below
        var rt = Math.round(end_time - start_time);                                                 //calculate reaction time
        var data = {                                                                                //store more data; more characteristics to add later but this is good for now
            reactionTime: rt,
            image_used: trial.imagepath,
        };
        
        display_element.innerHTML = "";                                                             // clear the display (kinda how you need to clear the screen in matlab after a trial)
        
        this.jsPsych.finishTrial(data);                                                             // move on to the next trial by passing an object of data as the parameter to the finishTrial
      };

      const new_popup = () => {
        var popupwin = window.open('./acadia/acadia_help.jpg', 'anyname');
        setTimeout(function(){popupwin.close();}, 10000)                                    //closes the window after 10s
      };

      function load_img() {
        for (let r = 0; r < rows; r++) {                                                                //for each element in our board matrix, the html element image is created -> <img>
          for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./blank.jpg";          //and put a blank white image there              
            document.getElementById("b4").append(tile);
          }
        }

        let tray = [];
        for (let i = 1; i <= rows * columns; i++) {                                                       //because I called the images "1.jpg" etc., this will create an array with numbers 1 to 12 as strings
          tray.push(i.toString());                                                                    //put "1" to "12" into the array (puzzle images names)
        }
        for (let i = 0; i < tray.length; i++) {                                                          //randomize pieces order by returning a random number from 1 to 12
          let j = Math.floor(Math.random() * tray.length);

          //swap
          let tmp = tray[i];
          tray[i] = tray[j];
          tray[j] = tmp;
        }
        tray.reverse();
        for (let i = 0; i < tray.length; i++) {                                                         //initializing the tray with the random ordered images, add same functionality as with the board
          let tile = document.createElement("img");
          tile.src = "./acadia/" + tray[i] + ".jpg";

          document.getElementById("t4").append(tile);
        }
      }


      build_html();                                                                                  //call show html function
      load_img();

    }
  }
  jsPuzzleGame.info = info;

  return jsPuzzleGame;
})(jsPsychModule);
