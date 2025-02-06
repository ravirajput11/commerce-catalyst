import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import tanyaChatBotIcon from "@/assets/tanya-chatbot/chat-with-tanya.png";
import dotsHorizontal from "@/assets/tanya-chatbot/dots-horizontal.png";
import arrowDown from "@/assets/tanya-chatbot/arrow-down.png";

const TanyaShoppingAssistant = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded">
          <img src={tanyaChatBotIcon} alt="Chat with Tanya" />{" "}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 bg-white">
        {/* header */}
        <div className="space-y-2 bg-[#552864] flex rounded">
          <img src={tanyaChatBotIcon} alt="Chat with Tanya" width={40} />{" "}
          <div>
            <p className="text-xs text-white">Chat with</p>
            <p className="font-bold text-white">
              TANYA <span className="text-xs">(Shopping Assistant)</span>
            </p>
          </div>
          <div className="flex justify-between items-center gap-3">
            <img src={dotsHorizontal} alt="Chat with Tanya" width={20} />
            <img src={arrowDown} alt="Chat with Tanya" width={20} />
          </div>
        </div>
        {/* body */}
        <div className="p-2">
          <p className="text-sm text-[#000000] bg-[#F1DCFF] p-3">
            Hey there! I'm Tanya, your new AI shopping assistant. Think of me as
            yoursuper helpful friend who knows all the best stuff at Claire's.
            Ready to find something amazing?
          </p>

          <div className="rounded">
            <textarea
              placeholder="Ask me anything"
              className="w-full h-10 bg-gray-100 rounded p-2"
            ></textarea>
            <button>Send</button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TanyaShoppingAssistant;
