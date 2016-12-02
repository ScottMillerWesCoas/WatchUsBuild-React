class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = this._startValue();
    this._update = this._update.bind(this);
    this._submit = this._submit.bind(this);
    this._unclick = this._unclick.bind(this);
    this._highScore = this._highScore.bind(this);
    this._checkHighScore = this._checkHighScore.bind(this);
    this._refresh = this._refresh.bind(this);
    this._clearWord = this._clearWord.bind(this);
  }

    _highScore(){
        var dataTable = this.state.highScores; 
        return dataTable.map((el, i) => {
          return(
            <span>
            <Comment 
              name = {el.name}
              score = {el.score}
              key = {i}
            />
            </span>
          )
        })
        
    }

    _refresh(){
      var newBoard = this._startValue(); 
      this.setState({boxValues: newBoard.boxValues, wordArr: [], submitArr: [], score: 0, isClicked: [], color: {}, canBeClicked: {}, canBeUnclicked: [], canBeUnclickedID: []}); 
    }

    _clearWord(){
      this.setState({wordArr: [], isClicked: [], color: {}, canBeClicked: {}, canBeUnclicked: [], canBeUnclickedID: []}); 
    }

    _checkHighScore(){
      var that = this, counter = 0, flag = false; 
      var dataTable = this.state.highScores;
      dataTable.forEach(function(el, i){
          if (el.name === name) {
            flag = true;
            if (el.score < that.state.score) {
              dataTable.splice(i, 1, {name: name, score: that.state.score}) 
              localStorage.setItem('highScores', JSON.stringify(dataTable));   
              that.setState({highScores: dataTable});    
            }
          }
        }); 
        if (flag === false){
          dataTable.forEach(function(el, i){
            for (var x in el){
              if (typeof el[x] === "number" && el[x] < that.state.score && counter === 0) {
                dataTable.splice(i, 1, {name: name, score: that.state.score})    
              }
            }
          });
          localStorage.setItem('highScores', JSON.stringify(dataTable));  
          that.setState({highScores: dataTable}); 
        } 
    }

  _update(e){
    for (var a = 0; a < 25; a++){
      this.state.canBeClicked[a] = false; 
    } 
    var b = parseInt(e.target.id); 
    this.state.canBeUnclickedID.push(b); 
    if (b === 0){
      this.state.canBeClicked[1] = true; 
      this.state.canBeClicked[5] = true; 
      this.state.canBeClicked[6] = true; 
    }
    else if (b === 4){
      this.state.canBeClicked[3] = true; 
      this.state.canBeClicked[8] = true; 
      this.state.canBeClicked[9] = true; 
    }
    else if (b === 5 || b === 10 || b === 15){
      this.state.canBeClicked[b-5] = true; 
      this.state.canBeClicked[b-4] = true; 
      this.state.canBeClicked[b+1] = true; 
      this.state.canBeClicked[b+5] = true; 
      this.state.canBeClicked[b+6] = true; 
    }
     else if (b === 9 || b === 14 || b === 19){
      this.state.canBeClicked[b-6] = true; 
      this.state.canBeClicked[b-5] = true; 
      this.state.canBeClicked[b-1] = true; 
      this.state.canBeClicked[b+4] = true; 
      this.state.canBeClicked[b+5] = true; 
    }
     else if (b === 20){
      this.state.canBeClicked[b-5] = true; 
      this.state.canBeClicked[b-4] = true; 
      this.state.canBeClicked[b+1] = true; 
    }
     else if (b === 24){
      this.state.canBeClicked[b-6] = true; 
      this.state.canBeClicked[b-5] = true; 
      this.state.canBeClicked[b-1] = true; 
    }
    else {
      for (var j = 4; j < 7; j++){
        this.state.canBeClicked[b + j] = true; 
        this.state.canBeClicked[b - j] = true; 
      }
      this.state.canBeClicked[b - 1] = true; 
      this.state.canBeClicked[b + 1] = true;  
    }
    
      this.state.wordArr.push([e.target.name])
      var  i = e.target.id; 
      this.state.canBeUnclicked.push(b); 
      var newIsClicked = 0; 
      this.state.isClicked = e.target.id; 
      this.setState({wordArr: this.state.wordArr, isClicked: this.state.isClicked, canBeClicked: this.state.canBeClicked, canBeUnclicked: this.state.canBeUnclicked, canBeUnclickedID: this.state.canBeUnclickedID}); 
  }

  _unclick(e){
    var i = parseInt(e.target.id);
    for (var a = 0; a < 25; a++){
      this.state.canBeClicked[a] = false; 
    } 
    this.state.wordArr.pop(); 
    this.state.canBeUnclickedID.pop(); 
    if (this.state.wordArr.length === 0) {
      for (var a = 0; a < 25; a++){
        this.state.canBeClicked[a] = true; 
      } 
    } else {
      var newUC = this.state.canBeUnclickedID[this.state.canBeUnclickedID.length-1]; 
      for (var a = 0; a < 25; a++){
        this.state.canBeClicked[a] = false; 
      }
      for (var j = 4; j < 7; j++){
      this.state.canBeClicked[newUC + j] = true; 
      this.state.canBeClicked[newUC - j] = true; 
      }
      this.state.canBeClicked[newUC - 1] = true; 
      this.state.canBeClicked[newUC + 1] = true;  
    } 
    var newColor = this.state.color; 
    newColor[i] = '#99D6FF'; 
    this.state.canBeUnclicked.pop(); 
    this.setState({wordArr: this.state.wordArr, color: newColor, canBeClicked: this.state.canBeClicked, canBeUnclicked: this.state.canBeUnclicked, canBeUnclickedID: this.state.canBeUnclickedID})
  }

  _submit(e){ 
    var that = this; 
    var wordCheck = $('#wordCheck'); 
    var submitted = e.target.name; 
    var testArr = this.state.submitArr.map(function(el){
      return el.toString(); 
    }); 
    var submittedID = e.target.id; 
      if (testArr.indexOf(submitted.toString()) !== -1){
        $('#wordCheck').text("You already found " + submitted + "!  Stop bein' silly!").css({'marginTop':'-10%', 'color': '#FFF', 'font-family': 'Oswald', 'font-weight':'bold'}).animate({'opacity': 1}, 1500, function(){
          $('#wordCheck').delay(500).animate({'opacity': 0}, 1000); 
        }); 
        that.setState({wordArr: [], canBeClicked: {}, color: {}, canBeUnclicked: [], canBeUnclickedID: []});
      }
      else {
        $.get("/dictionaryObj.txt", function(data){
        var words = JSON.parse(data);
        if (words[submitted] === 1){
          $('#wordCheck').text("Nice! " + submitted + " is a real word!").css({'marginTop':'-10%', 'color': '#FFF', 'font-family': 'Oswald', 'font-weight':'bold'}).animate({'opacity': 1}, 1500, function(){
          $('#wordCheck').delay(500).animate({'opacity': 0}, 1000); }); 
         
          that.state.submitArr.push([submitted])
          that.state.canBeUnclickedID.push([submittedID])
          if (submitted.length < 3) {
            that.state.score += 0; 
          }
          else if (submitted.length >= 3 && submitted.length < 5){
            that.state.score += 1
          }
          else if (submitted.length === 5){
            that.state.score += 2
          }
          else if (submitted.length === 6){
            that.state.score += 3
          }
          else if (submitted.length === 7){
            that.state.score += 5
          }
          else if (submitted.length > 7){
            that.state.score += 11
          }
          that._checkHighScore(); 
          that.setState({submitArr: that.state.submitArr, score: that.state.score, wordArr: [], canBeClicked: {}, color: {}, canBeUnclicked: [], canBeUnclickedID: []}); 
        } 
        else { 
        wordCheck.text(submitted + "'s not a real word, foo!").css({'marginTop':'-10%', 'color': '#FFF', 'font-family': 'Oswald', 'font-weight':'bold'}).animate({'opacity': 1}, 1500, function(){
        $('#wordCheck').delay(500).animate({'opacity': 0}, 1500); }); 
        that.setState({wordArr: [], canBeClicked: {}, color: {}, canBeUnclicked: [], canBeUnclickedID: []});
        }
      }); 
      // if (this._dictionary(e.target.name)) console.log(e.target.name, ' exists in dictionary'); 
      // else console.log(e.target.name, ' does not exist in dictionary'); 
     }
      
  }


    _startValue(){
      var winnerList = [
       {name: 'Mike', score: 3},
       {name: 'Scott', score: 0}
      ]; 
      //localStorage.setItem('highScores', JSON.stringify(winnerList)); 
        var savedData = localStorage.getItem('highScores'); 
      if (savedData){
        winnerList = JSON.parse(savedData); 
      }
      const dieArray = ['aaafrs','aaeeee', 'aafirs','adennn','aeeeem','aeegmu','aegmnn','afirsy','bjkqxz','ccenst','ceiilt','ceilpt','ceipst','ddhnot','dhhlor','dhlnor','dhlnor','eiiitt','emottt','ensssu','fiprsy','gorrvw','iprrry','nootuw','ooottu']; 
      var capLetterArr = []; 
      var letterArr = []; 
      for (var i = 0; i < dieArray.length; i++){
          capLetterArr.push(dieArray[i].toUpperCase());
      }
  
      function randLetter (){
         return Math.ceil(Math.random() * 5); 
      }
 
      for (var i = 0; i < capLetterArr.length; i++){
        if (capLetterArr[i][randLetter()] === 'Q' || capLetterArr[i][randLetter()] === 'q' ){ 
          letterArr.push('Qu')
        }
        else letterArr.push(capLetterArr[i][randLetter()]); 
      }

      return {boxValues: letterArr, wordArr: [], submitArr: [], score: 0, isClicked: [], color: {}, canBeClicked: {}, canBeUnclicked: [], canBeUnclickedID: [], highScores: winnerList}; 
    }



    render(){
        const winners = this._highScore() || [];
        return (
            <div>
              <img className='pic' src='http://1.bp.blogspot.com/-PwkH4sY6ML8/VcD8DygakRI/AAAAAAAAFao/CkqIOkFkQUI/s640/Boggle_Logo_PR_150804_6PM_CET.png' style={{'marginLeft':'15%', 'marginTop':'-20%' }}/>
               <h5 style={{'color':'white', 'marginLeft':'15%',  'marginTop':'-1%' }}>{winners}</h5>
               <WordTest />
              <Box state={this.state} _update={this._update} _unclick={this._unclick}/>
              <WordBuild state={this.state} _submit={this._submit} _refresh={this._refresh} _clearWord={this._clearWord} />
              <ScoreBoard state={this.state} />
            </div>
            )
    }
}


 class Box extends React.Component{
    render(){

       var boxes = []; 
       for (var i = 0; i < 25; i++){
        if (this.props.state.canBeUnclicked[this.props.state.canBeUnclicked.length-1] === i) {
            var box = (<button className="box" style={{'color': '#000', 'backgroundColor':'#FAFAFA'}} id={i} key={i} name={this.props.state.boxValues[i]} onClick={this.props._unclick}>{this.props.state.boxValues[i]}</button>)
          }
        else if (this.props.state.canBeClicked[i] === true || this.props.state.canBeClicked[i] === undefined){
          var box = (<button className="box" style={{'color':'#FAFAFA', 'backgroundColor':'#000'}} id={i} key={i} name={this.props.state.boxValues[i]} onClick={this.props._update}>{this.props.state.boxValues[i]}</button>)
          }

          else {
            var box = (<button className="box" style={{'color': '#FAFAFA', 'backgroundColor':'#334455'}} id={i} key={i} name={this.props.state.boxValues[i]}>{this.props.state.boxValues[i]}</button>)
          }
          boxes.push(box); 
       }
        
        return(
        <div>{boxes}</div>
        )
    }

 }



 class WordTest extends React.Component {
  render() {
    return(
      <div className='wordTest'>
        <h2 style={{'marginBottom': '-1%', 'color': '#FFF'}}><u>Word Test:</u></h2>
        <span id='wordCheck'></span>
      </div>
    );
  }
}
 

 class Comment extends React.Component {
  render() {
    return(
      <span className='highScore'>
        <span>{this.props.name} || {this.props.score}</span>
      </span>
    );
  }
}

  class WordBuild extends React.Component{
    render(){
        return(
          <div>
            <button className='submitButton' name={this.props.state.wordArr.join('')} onClick={this.props._submit}>Submit Word</button>
            <button className='refreshButton' onClick={this.props._refresh} title=''>New Board</button>
            <button className='clearButton' onClick={this.props._clearWord} title=''>Clear Current Word</button>
            <div className='wordArr'>
              <h2 style={{'marginBottom': '-1%', 'color': '#FAFAFA'}}><u>Current Word:</u></h2>
              <h1 className='word'>{this.props.state.wordArr}</h1> 
            </div>
          </div>
        )
    }

 }

 class ScoreBoard extends React.Component{
    render(){ 
        return(
        <div className='scoreBoard'>
         <h2 style={{'marginBottom': '-1%', 'color': '#FAFAFA'}}><u>Score: {this.props.state.score}</u></h2>
          <ul className='wordUl'>
              {this.props.state.submitArr.map(function(elem, i){
                return <li className='word2' style={{'color': '#FAFAFA', 'fontWeight': 'bold', 'marginLeft':'-20%', 'marginTop':'-5%'}} key={i}>{elem}</li>;
              })
              }
          </ul>
        </div>
        )
    }

 }



// jQuery(function() {
  ReactDOM.render(
        <Game />,
    document.getElementById('game-box')
  );
// })
