
    var name, inputValue; 
  swal({
    title: "Hi There!",
    text: "What's your name?",
    type: "input",
    showCancelButton: true,
    closeOnConfirm: false,
    animation: "slide-from-top",
    inputPlaceholder: "We'll use it to record high scores!"
  },
  function(inputValue){
    if (inputValue === false) return false;
    
    if (inputValue === "") {
      swal.showInputError("You need to write something!");
      return false; 
    }
    
    swal("Nice!", "Thanks, " + inputValue + '!');
    name = inputValue; 
    console.log('name', name); 
  }
  );
   
  