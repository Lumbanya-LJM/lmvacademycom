import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "260974534253";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const WhatsAppFloatingButton = () => {
  return (
    <Button
      asChild
      size="icon"
      className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-elevated bg-primary text-primary-foreground hover:bg-primary/90"
    >
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact LMV Academy on WhatsApp"
        title="WhatsApp: +260 974 534 253"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </Button>
  );
};

export default WhatsAppFloatingButton;
