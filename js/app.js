let Messenger = function(el){

  let that = this;
console.log(el);
  that.init = function(){
    that.codeLetters = "@$%#&*+£§$"; //random characters
    that.message = 0; //message no
    that.currentLength = 0; //length of current message
    that.fadeBuffer = false;
    that.messages = [
      'Good Evening, Mr. K',
      'Your mission, should you choose to accept it, involves the recovery of a stolen item designated Chimera.',
      'You may select any two team members',
      'As always, should any member of your team be caught or killed, the Secretary will disavow all knowledge of your actions. ',
      'end of message'
    ];
    setTimeout(that.animateIn, 100);
  };

  that.generateRandomString = function(length){
    let randomText = '';
    while(randomText.length < length){
      randomText += that.codeLetters.charAt(Math.floor(Math.random() * that.codeLetters.length));
    }
    return randomText;
  };

  that.animateIn = function(){
    if(that.currentLength < that.messages[that.message].length){

      that.currentLength += 2;

      if(that.currentLength > that.messages[that.message].length){
        that.currentLength = that.messages[that.message].length;
      }

      let message = that.generateRandomString(that.currentLength);
      $(el).text(message);
      setTimeout(that.animateIn, 20);
    }else {
      setTimeout(that.animateFadeBuffer, 20);
    }
  };

  that.animateFadeBuffer = function(){
    if(that.fadeBuffer === false){
      that.fadeBuffer = [];
      for(var i = 0; i < that.messages[that.message].length; i++){
        that.fadeBuffer.push({
          c : (Math.floor(Math.random()*12)) + 1,
          l : that.messages[that.message].charAt(i)
        });
      }
    }

    let doCycles = false;
    let message = '';
    for(var i = 0; i < that.fadeBuffer.length; i++){
      let fader = that.fadeBuffer[i];
      if(fader.c > 0){
        doCycles = true;
        fader.c--;
        message += that.codeLetters.charAt(Math.floor(Math.random() * that.codeLetters.length));
      }else {
        message += fader.l
      }
    }

    $(el).text(message);
    if(doCycles == true){
      setTimeout(that.animateFadeBuffer, 20);
    }else {
      setTimeout(that.cycleText, 2000);
    }
  };

  that.cycleText = function(){
    that.message += 1;
    if(that.message >= that.messages.length){
      return;
    }

    that.currentLength = 0;
    that.fadeBuffer = false;
    $(el).text('');
    setTimeout(that.animateIn, 200);
  };

that.init();
}

let mess = new Messenger(document.getElementsByClassName('secret'));
