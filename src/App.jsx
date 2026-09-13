import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Esta linha é obrigatória para injetar o layout

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Brand Colors
const COLORS = {
  bg: '#F7F6F2',
  brown: '#5A3B2E',
  blue: '#111A24',
  accent: '#5A8BA8',
};

// Reusable Accessible Button
const Button = ({ onClick, children, variant = 'primary', className = '', 'aria-label': ariaLabel, disabled }) => {
  const baseStyle = "w-full py-4 px-6 rounded-lg font-bold text-lg transition-colors focus:outline-none focus:ring-4 focus:ring-[#5A8BA8]";
  const variants = {
    primary: "bg-[#5A3B2E] text-white hover:bg-[#3d271e]",
    secondary: "bg-transparent border-2 border-[#5A8BA8] text-[#111A24] hover:bg-[#5A8BA8] hover:text-white",
    selected: "bg-[#5A8BA8] text-white border-2 border-[#5A8BA8]",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

// Reusable Input Field
const InputField = ({ label, id, type = "text", value, onChange }) => (
  <div className="mb-6 w-full text-left">
    <label htmlFor={id} className="block font-['Poppins'] font-semibold text-[#111A24] mb-2 text-lg">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="w-full p-4 border-2 border-[#5A8BA8] rounded-lg bg-transparent text-[#111A24] font-['Inter'] text-lg focus:outline-none focus:ring-4 focus:ring-[#5A3B2E]"
      aria-required="true"
    />
  </div>
);

export default function App() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({ name: '' });
  const [answers, setAnswers] = useState({});
  const mainRef = useRef(null);

  // Focus management for screen readers on step change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.focus();
    }
    window.scrollTo(0, 0);
  }, [step]);

  const nextStep = () => setStep((s) => Math.min(s + 1, 13));
  const userName = userData.name || 'Você';

  // Helper for single choice questions
  const handleSingleChoice = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
    nextStep();
  };

  const renderScreen = () => {
    switch (step) {
      case 1: // Splash
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <h1 className="font-['Poppins'] text-6xl md:text-8xl font-black text-[#5A3B2E] mb-4 tracking-tighter">
              AYANMO
            </h1>
            <p className="font-['Inter'] text-2xl text-[#111A24] mb-12">
              sua assistente de estilo
            </p>
            <Button onClick={nextStep} aria-label="Toque para começar o questionário">
              toque para começar
            </Button>
          </div>
        );

      case 2: // Registration
        return (
          <div className="w-full max-w-md mx-auto">
            <h1 className="font-['Poppins'] text-3xl font-bold text-[#5A3B2E] mb-8">
              Que bom ter você aqui! Por favor, informe seus dados para cadastro.
            </h1>
            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <InputField label="Nome" id="nome" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
              <InputField label="Gênero" id="genero" />
              <InputField label="E-mail" id="email" type="email" />
              <InputField label="Telefone" id="telefone" type="tel" />
              <InputField label="Aniversário" id="aniversario" type="date" />
              <Button onClick={nextStep} type="submit" aria-label="Ir para o próximo passo">
                Próximo
              </Button>
            </form>
          </div>
        );

      case 3: // Accessibility Check
        return (
          <div className="w-full max-w-md mx-auto text-center">
            <h1 className="font-['Poppins'] text-3xl font-bold text-[#5A3B2E] mb-8">
              Você precisa de recursos de acessibilidade?
            </h1>
            <div className="flex flex-col gap-4">
              <Button onClick={nextStep} aria-label="Sim, preciso de recursos de acessibilidade">Sim</Button>
              <Button onClick={nextStep} variant="secondary" aria-label="Não, não preciso de recursos de acessibilidade">Não</Button>
            </div>
          </div>
        );

      case 4: // Goal
        return (
          <QuestionScreen
            title="O que você procura hoje?"
            options={["look Casual", "look Esportivo", "look para Trabalho", "look de Festa", "Moda Praia", "look para viagem", "Moda íntima"]}
            onSelect={(val) => handleSingleChoice('goal', val)}
          />
        );
      case 5: // Q1
        return (
          <QuestionScreen
            title="O que mais importa pra você numa roupa?"
            options={["Conforto", "Elegância", "Delicadeza", "Sensualidade", "Impacto", "Discrição", "Criatividade"]}
            onSelect={(val) => handleSingleChoice('q1', val)}
          />
        );
      case 6: // Q2
        return (
          <QuestionScreen
            title="Qual tipo de tecido te atrai mais?"
            options={["Macio e confortável", "Fino e sofisticado", "Leve e fluido", "Justo e elástico", "Estruturado com forma firme", "Neutro e simples", "Colorido ou diferente"]}
            onSelect={(val) => handleSingleChoice('q2', val)}
          />
        );
      case 7: // Q3
        return (
          <QuestionScreen
            title="Do que você mais gosta no seu guarda-roupa?"
            options={["Roupas confortáveis", "Roupas elegantes e bem cortadas", "Peças delicadas e românticas", "Roupas que valorizam o corpo", "Peças marcantes e diferentes", "Itens básicos e fáceis de combinar", "Peças criativas, coloridas ou únicas"]}
            onSelect={(val) => handleSingleChoice('q3', val)}
          />
        );
      case 8: // Q4
        return (
          <QuestionScreen
            title="Como você mistura as cores nas suas roupas?"
            options={["Cores intensas e marcantes", "Peças e acessórios em tons parecidos", "Vários tons da mesma cor", "Cores neutras e suaves", "Cores contrastantes e chamativas", "Cores que estão na moda de forma ousada", "Poucas cores e escolhas simples"]}
            onSelect={(val) => handleSingleChoice('q4', val)}
          />
        );
      case 9: // Q5
        return (
          <QuestionScreen
            title="Se fosse escolher uma estampa, qual seria?"
            options={["Neutra", "Geométrica e exagerada", "Várias estampas misturadas", "Listrado ou xadrez", "Floral delicado", "Animal print"]}
            onSelect={(val) => handleSingleChoice('q5', val)}
          />
        );

      case 10: // Style Result
        return (
          <div className="w-full max-w-md mx-auto text-center">
            <h1 className="font-['Poppins'] text-3xl font-bold text-[#5A3B2E] mb-6">
              {userName}, quanta personalidade!
            </h1>
            <p className="font-['Inter'] text-xl text-[#111A24] mb-8">
              Estes são os seus estilos predominantes: <strong>Elegante, Exuberante.</strong>
            </p>
            <Button onClick={nextStep} aria-label="Ir para o próximo passo">Próximo</Button>
          </div>
        );

      case 11: // Camera Intro
        return (
          <div className="w-full max-w-md mx-auto text-center">
            <h1 className="font-['Poppins'] text-3xl font-bold text-[#5A3B2E] mb-6">
              {userName}, para realizarmos a análise do seu biotipo, abra a câmera, se posicione no local indicado, abra os braços e não se mova.
            </h1>
            <Button onClick={nextStep} aria-label="Abrir câmera para análise">Abrir Câmera</Button>
          </div>
        );

      case 12: // Perception (Multi-select)
        return <MultiSelectQuestionScreen userName={userName} onNext={nextStep} />;

      case 13: // Final Cart
        return (
          <div className="w-full max-w-md mx-auto text-center">
            <h1 className="font-['Poppins'] text-3xl font-bold text-[#5A3B2E] mb-6">
              {userName}, agora que identificamos seu tipo físico, sei exatamente as melhores opções para te sugerir.
            </h1>
            <p className="font-['Inter'] text-xl text-[#111A24] mb-8">
              É só escolher suas opções favoritas e adicionar ao seu carrinho. Ótimas compras!
            </p>
            <Button onClick={() => alert("Acessando loja...")} aria-label="Ir para o carrinho de compras">Ir para o carrinho</Button>
          </div>
        );

      default:
        return <div>Erro: Passo desconhecido.</div>;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@600;700;900&display=swap');
        body { background-color: #F7F6F2; margin: 0; padding: 0; }
      `}</style>
      <main
        className="min-h-screen bg-[#F7F6F2] font-['Inter',sans-serif] text-[#111A24] flex flex-col p-6 selection:bg-[#5A8BA8] selection:text-white"
        aria-live="polite"
      >
        <div
          ref={mainRef}
          tabIndex="-1"
          className="w-full max-w-2xl mx-auto flex-grow flex flex-col justify-center outline-none"
        >
          {renderScreen()}
        </div>
      </main>
    </>
  );
}

// Generic Question Screen for Single Choice
const QuestionScreen = ({ title, options, onSelect }) => (
  <div className="w-full max-w-md mx-auto">
    <h1 className="font-['Poppins'] text-3xl font-bold text-[#5A3B2E] mb-8 text-center" id="question-title">
      {title}
    </h1>
    <div className="flex flex-col gap-4" role="radiogroup" aria-labelledby="question-title">
      {options.map((opt, idx) => (
        <Button
          key={idx}
          variant="secondary"
          onClick={() => onSelect(opt)}
          aria-label={`Selecionar opção: ${opt}`}
          className="text-left"
        >
          {opt}
        </Button>
      ))}
    </div>
  </div>
);

// Specific Screen for Multi-Select (Step 12)
const MultiSelectQuestionScreen = ({ userName, onNext }) => {
  const [selected, setSelected] = useState([]);
  const options = ["Profissional", "Confiante", "Acessível", "Criativa", "Elegante", "Marcante"];

  const toggleSelection = (opt) => {
    if (selected.includes(opt)) {
      setSelected(selected.filter(i => i !== opt));
    } else if (selected.length < 2) {
      setSelected([...selected, opt]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="font-['Poppins'] text-3xl font-bold text-[#5A3B2E] mb-4 text-center">
        Como você quer ser percebida com este look?
      </h1>
      <p className="font-['Inter'] text-lg text-[#111A24] mb-8 text-center" aria-live="polite">
        Escolha até 2 opções. {2 - selected.length} restantes.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {options.map((opt, idx) => {
          const isSelected = selected.includes(opt);
          return (
            <Button
              key={idx}
              variant={isSelected ? 'selected' : 'secondary'}
              onClick={() => toggleSelection(opt)}
              aria-pressed={isSelected}
              disabled={!isSelected && selected.length >= 2}
            >
              {opt}
            </Button>
          );
        })}
      </div>
      <Button
        onClick={onNext}
        disabled={selected.length === 0}
        aria-label="Confirmar seleções e ir para o próximo passo"
      >
        Próximo
      </Button>
    </div>
  );
};