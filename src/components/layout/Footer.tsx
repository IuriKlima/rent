import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

import logo from "@/assets/logo.webp";

export function Footer() {
  return (
    <footer className="mt-24 bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Rent Fitness" className="h-12 w-auto brightness-0 invert" />
            </div>
            <p className="mt-4 max-w-md text-sm text-white/60">
              Locação de academias profissionais para condomínios de alto padrão.
              Equipamentos premium, manutenção inclusa e atualização contínua.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white/90 uppercase">
              Navegação
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li><Link to="/" className="hover:text-primary transition">Início</Link></li>
              <li><Link to="/produtos" className="hover:text-primary transition">Catálogo</Link></li>
              <li><Link to="/contato" className="hover:text-primary transition">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white/90 uppercase">
              Contato
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                contato@rentfitness.com.br
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-primary" />
                +55 11 92491-3426
              </li>
              <li className="flex items-start gap-2">
                <a href="https://www.instagram.com/rentfitnessbr/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-primary transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 text-primary"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  @rentfitnessbr
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                São Paulo, SP — Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Rent Fitness. Todos os direitos reservados.</p>
          <p>CNPJ 61.752.748/0001-35</p>
        </div>
      </div>
    </footer>
  );
}
