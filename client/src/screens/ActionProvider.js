// ActionProvider starter code
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }
  greet() {
    const greetingMessage = this.createChatBotMessage(
      "Hello, What do you want ?",
      {
        widget: "CvOptions",
      }
    );
    this.updateChatbotState(greetingMessage);
  }

  handleLinksList = () => {
    const message = this.createChatBotMessage("Stationary Products", {
      widget: "Buyitems",
    });

    this.updateChatbotState(message);
  };

  handleOptionFile = () => {
    const message = this.createChatBotMessage("Reached Stationary" ,{
      widget: "Optionfile",
    });

    this.updateChatbotState(message);
  };

  
  handleOptionCanteen = () => {
    const message = this.createChatBotMessage("Reached Canteen", {
      widget: "OptionCanteen",
    });

    this.updateChatbotState(message);
  };

  handlefile1 = () => {
    const message = this.createChatBotMessage("Printout orders", {
      widget: "Filescreen",
    });

    this.updateChatbotState(message);
  };

  handleEducationList = () => {
    const message = this.createChatBotMessage("Upload docs", {
      widget: "UploadFile",
    });

    this.updateChatbotState(message);
  };

  handleorderList = () => {
    const message = this.createChatBotMessage("Stationary orders", {
      widget: "Ordersscreen",
    });

    this.updateChatbotState(message);
  };

  handlecanteenorder = () => {
    const message = this.createChatBotMessage("Select items", {
      widget: "CanteenOrderscreen",
    });

    this.updateChatbotState(message);
  };

  handlecanteenorderlist = () => {
    const message = this.createChatBotMessage("Food orders", {
      widget: "CanteenOrderscreenList",
    });

    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
