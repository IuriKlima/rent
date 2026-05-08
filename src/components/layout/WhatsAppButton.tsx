import { buildWhatsappContactUrl } from "@/store/cart";

export function WhatsAppButton() {
  return (
    <a
      href={buildWhatsappContactUrl("Olá! Gostaria de mais informações sobre os equipamentos.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      aria-label="Falar pelo WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.666.596 1.216.774 1.388.861.173.086.274.072.375-.043.101-.115.433-.505.549-.68.116-.173.231-.144.39-.086.159.058 1.011.477 1.184.564.173.087.289.129.332.202.043.073.043.423-.101.828z" />
        <path d="M11.994 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18.253c-1.465 0-2.846-.36-4.045-.992l-4.614 1.211 1.233-4.502c-.689-1.242-1.077-2.684-1.077-4.218 0-4.832 3.931-8.763 8.766-8.763 4.836 0 8.768 3.932 8.768 8.764 0 4.832-3.932 8.763-8.768 8.763z" />
      </svg>
    </a>
  );
}
