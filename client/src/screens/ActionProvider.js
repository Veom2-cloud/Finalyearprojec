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
    const message = this.createChatBotMessage("Buy items", {
      widget: "Buyitems",
    });

    this.updateChatbotState(message);
  };

  handleotp = () => {
    const message = this.createChatBotMessage("otp", {
      widget: "otp",
    });

    this.updateChatbotState(message);
  };

  handleotp1 = () => {
    const message = this.createChatBotMessage("otp1", {
      widget: "otp1",
    });

    this.updateChatbotState(message);
  };

  handlefile1 = () => {
    const message = this.createChatBotMessage("Filescreen", {
      widget: "Filescreen",
    });

    this.updateChatbotState(message);
  };

  handleEducationList = () => {
    const message = this.createChatBotMessage("Upload", {
      widget: "UploadFile",
    });

    this.updateChatbotState(message);
  };

  handleorderList = () => {
    const message = this.createChatBotMessage("Order", {
      widget: "Ordersscreen",
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
