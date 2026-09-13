import React, { useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(1);

  // Controle simples de navegação para o exemplo
  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#4A3025] font-['Inter'] flex justify-center p-4 sm:p-8">
      {/* Contêiner centralizado limitando a largura máxima (max-w-md) para não esticar */}
      <main className="w-full max-w-md flex flex-col relative">
        
        {/* Botão de Voltar */}
        {step > 1 && (
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-[#4A3025] font-medium mb-8 hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#56839A] rounded px-2 py-1 -ml-2 w-max"
            aria-label="Voltar para a tela anterior"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
        )}

        {/* Tela de Cadastro (Exemplo no Step 1) */}
        {step === 1 && (
          <div className="flex flex-col animate-fade-in pt-4">
            <h1 className="font-['Poppins'] text-2xl font-bold mb-8 text-[#4A3025] leading-snug">
              Que bom ter você aqui! Por favor, informe seus dados para cadastro.
            </h1>

            <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
              <div className="flex flex-col gap-1">
                <label htmlFor="nome" className="text-sm font-semibold text-[#4A3025]">Nome</label>
                <input 
                  type="text" 
                  id="nome"
                  className="bg-transparent border-b border-[#56839A] py-2 outline-none focus:border-[#4A3025] focus:border-b-2 transition-colors text-base"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="genero" className="text-sm font-semibold text-[#4A3025]">Gênero</label>
                <input 
                  type="text" 
                  id="genero"
                  className="bg-transparent border-b border-[#56839A] py-2 outline-none focus:border-[#4A3025] focus:border-b-2 transition-colors text-base"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-semibold text-[#4A3025]">E-mail</label>
                <input 
                  type="email" 
                  id="email"
                  className="bg-transparent border-b border-[#56839A] py-2 outline-none focus:border-[#4A3025] focus:border-b-2 transition-colors text-base"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="telefone" className="text-sm font-semibold text-[#4A3025]">Telefone</label>
                <input 
                  type="tel" 
                  id="telefone"
                  className="bg-transparent border-b border-[#56839A] py-2 outline-none focus:border-[#4A3025] focus:border-b-2 transition-colors text-base"
                  required
                />
              </div>

              <div className="flex flex-col gap-1 relative">
                <label htmlFor="aniversario" className="text-sm font-semibold text-[#4A3025]">Aniversário</label>
                <input 
                  type="date" 
                  id="aniversario"
                  className="bg-transparent border-b border-[#56839A] py-2 outline-none focus:border-[#4A3025] focus:border-b-2 transition-colors text-base w-full pr-8 appearance-none"
                  required
                />
                <Calendar className="absolute right-0 bottom-2 text-[#4A3025] pointer-events-none" size={20} />
              </div>

              <button 
                type="submit"
                className="mt-8 bg-[#56839A] text-[#F7F5F0] font-['Poppins'] font-bold py-3 px-6 rounded hover:bg-[#4A3025] transition-colors focus:outline-none focus:ring-4 focus:ring-[#56839A]/50 self-start"
              >
                Próximo
              </button>
            </form>
          </div>
        )}

        {/* Tela de Acessibilidade (Step 2) */}
        {step === 2 && (
          <div className="flex flex-col animate-fade-in">
            <h1 className="font-['Poppins'] text-2xl font-bold mb-6 text-[#4A3025] leading-snug">
              Você precisa de recursos de acessibilidade para navegação?
            </h1>
            <p className="mb-8 text-[#4A3025]">
              Ajustamos nossa interface para oferecer a melhor experiência, com suporte a leitores de tela e alto contraste.
            </p>

            <div className="flex flex-col gap-4">
              <button className="border-2 border-[#56839A] text-[#4A3025] font-semibold py-4 px-6 rounded-lg hover:bg-[#56839A] hover:text-[#F7F5F0] transition-colors text-left focus:outline-none focus:ring-4 focus:ring-[#56839A]/50">
                Sim, ativar leitor de tela otimizado
              </button>
              <button className="border-2 border-[#56839A] text-[#4A3025] font-semibold py-4 px-6 rounded-lg hover:bg-[#56839A] hover:text-[#F7F5F0] transition-colors text-left focus:outline-none focus:ring-4 focus:ring-[#56839A]/50">
                Não, manter navegação padrão
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}