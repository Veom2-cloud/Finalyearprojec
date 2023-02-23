let greetings = ["home","hello", "hi", "good morning", "good evening", "good afternoon", "morning", "hey", "yo", "options", "help"]

// MessageParser starter code
class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
        const lowerCaseMessage = message.toLowerCase()

        for(let i=0, len=greetings.length; i<len; i++) {
            if (lowerCaseMessage.includes(greetings[i])) {
                this.actionProvider.greet()
            }
        }
        
        if (lowerCaseMessage.includes("upload") || lowerCaseMessage.includes("uploads")){
            this.actionProvider.handleEducationList();
        }
        if (lowerCaseMessage.includes("buy") || lowerCaseMessage.includes("buys") ){
            this.actionProvider.handleLinksList();
        }
        if (lowerCaseMessage.includes("otp") || lowerCaseMessage.includes("orderotp")){
            this.actionProvider.handleotp();
        }
        if (lowerCaseMessage.includes("fileotp") || lowerCaseMessage.includes("otp1") ){
            this.actionProvider.handleotp1();
        }
        if (lowerCaseMessage.includes("file") || lowerCaseMessage.includes("files")){
            this.actionProvider.handlefile1();
        }
        if (lowerCaseMessage.includes("order") || lowerCaseMessage.includes("orders")){
            this.actionProvider.handleorderList();
        }
        if (lowerCaseMessage.includes("stationary")){
            this.actionProvider.handleOptionFile();
        }
        if (lowerCaseMessage.includes("canteen")){
            this.actionProvider.handleOptionCanteen();
        }
       
        
        
       
    }
  }
  
  export default MessageParser;