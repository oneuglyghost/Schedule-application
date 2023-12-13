

$(document).ready(function(){

  //change time-block color based on the time
    function updateStyles(){
    const currentHour =dayjs().hour();
    
    $(".time-block").each(function(){
      const blockHour =parseInt($(this).attr("id").split("-")[1]);


      if(blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      }else if (blockHour === currentHour){
        $(this).removeClass("past future").addClass("present");
      } else{
        $(this).removeClass("past present").addClass("future");
      }
    });
  }
  // calls function to update time 
  updateStyles();

  //updates styles every minute
  setInterval(updateStyles,60000);

  //save button saves to local storage 
  $(".saveBtn").on("click", function(){
    const description = $(this).siblings(".description").val();
    //look for the parent element of the button 
    const timeBlockId= $(this).closest(".time-block").attr("id");

    //saves the id and text input content
    if (description.trim() !== "") {
      const dataTosave = {
        description: description,
        timeBlockId: timeBlockId,
      };
      // make data to string to save to local storage
      localStorage.setItem(timeBlockId, JSON.stringify(dataTosave));
    }
    // print id to console just to confirm
    console.log("time block ID:", timeBlockId);


    // shows message if succesfully saved an item 
    var hourText = $("#"+timeBlockId).text();
    console.log("saved", hourText)

    $("#saved").text("Added event to " + hourText )
    // clears text after a couple of seconds 
    setTimeout(function(){
      $("#saved").text("");
    },3000);
  })

  function loadDataFromLocalStorage(){
    $(".time-block").each(function(){
      const timeBlockId= $(this).closest(".time-block").attr("id");
      const storedData = localStorage.getItem(timeBlockId);

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const description = parsedData.description;

        // set the items in the text area
        $(this).find(".description").val(description);
      }
    })
  }

// call the function to load data to page
loadDataFromLocalStorage();


  // shows the current date at the top of page
  $("#currentDay").text(dayjs().format("dddd, MMMM D"))
})
