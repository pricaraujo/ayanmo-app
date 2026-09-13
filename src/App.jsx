import React, { useState, useEffect, useRef } from 'react';

// ============================================================
// AYANMO — Assistente de Estilo
// ============================================================

// Brand Colors
const COLORS = {
  bg: '#F7F6F2',
  brown: '#5A3B2E',
  blue: '#111A24',
  accent: '#5A8BA8',
};

// Total de etapas do fluxo
const TOTAL_STEPS = 13;


// ============================================================
// REUSABLE ACCESSIBLE BUTTON
// ============================================================

const Button = ({
  onClick,
  children,
  variant = 'primary',
  className = '',
  'aria-label': ariaLabel,
  disabled,
  type = 'button',
}) => {
  const variants = {
    primary: `
      bg-[#5A3B2E]
      text-white
      border-2 border-[#5A3B2E]
      hover:bg-[#40281F]
      hover:border-[#40281F]
    `,

    secondary: `
      bg-transparent
      text-[#111A24]
      border-2 border-[#111A24]/20
      hover:border-[#5A8BA8]
      hover:bg-[#5A8BA8]/8
    `,

    selected: `
      bg-[#5A8BA8]
      text-white
      border-2 border-[#5A8BA8]
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        w-full
        min-h-[58px]
        px-5
        py-4

        rounded-md

        font-['Inter']
        font-semibold
        text-base

        text-left

        transition-all
        duration-200

        focus:outline-none
        focus:ring-4
        focus:ring-[#5A8BA8]/30

        disabled:opacity-40
        disabled:cursor-not-allowed

        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};


// ============================================================
// INPUT FIELD
// ============================================================

const InputField = ({
  label,
  id,
  type = 'text',
  value = '',
  onChange,
}) => (
  <div className="mb-5 w-full text-left">
    <label
      htmlFor={id}
      className="
        block
        font-['Inter']
        font-semibold
        text-[#111A24]
        mb-2
        text-sm
      "
    >
      {label}
    </label>

    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="
        w-full
        min-h-[56px]
        px-4
        py-3

        border-2
        border-[#111A24]/15
        rounded-md

        bg-white/50
        text-[#111A24]

        font-['Inter']
        text-base

        transition-all

        focus:outline-none
        focus:border-[#5A8BA8]
        focus:ring-4
        focus:ring-[#5A8BA8]/20
      "
      aria-required="true"
    />
  </div>
);


// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [step, setStep] = useState(1);

  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    email: '',
    phone: '',
    birthday: '',
  });

  const [answers, setAnswers] = useState({});

  const mainRef = useRef(null);


  // ==========================================================
  // FOCUS MANAGEMENT
  // ==========================================================

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.focus();
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [step]);


  // ==========================================================
  // NAVIGATION
  // ==========================================================

  const nextStep = () => {
    setStep((current) => Math.min(current + 1, TOTAL_STEPS));
  };

  const previousStep = () => {
    setStep((current) => Math.max(current - 1, 1));
  };

  const userName = userData.name || 'Você';


  // ==========================================================
  // SINGLE CHOICE
  // ==========================================================

  const handleSingleChoice = (questionId, value) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }));

    nextStep();
  };


  // ==========================================================
  // RENDER SCREENS
  // ==========================================================

  const renderScreen = () => {
    switch (step) {

      // ------------------------------------------------------
      // 1 — SPLASH
      // ------------------------------------------------------

      case 1:
        return (
          <div className="
            w-full
            min-h-[70vh]
            flex
            flex-col
            items-center
            justify-center
            text-center
            relative
          ">

            {/* Elemento geométrico */}
            <div
              aria-hidden="true"
              className="
                absolute
                top-8
                left-1/2
                -translate-x-1/2

                w-16
                h-16

                border
                border-[#5A8BA8]/40

                rotate-45
              "
            />

            <div className="relative z-10">

              <div
                className="
                  font-['Poppins']
                  text-5xl
                  sm:text-7xl
                  font-black
                  tracking-[0.12em]
                  text-[#5A3B2E]
                  mb-5
                "
              >
                AYANMO
              </div>

              <div
                className="
                  w-12
                  h-px
                  bg-[#5A8BA8]
                  mx-auto
                  mb-5
                "
              />

              <p
                className="
                  font-['Inter']
                  text-lg
                  sm:text-xl
                  text-[#111A24]
                  mb-10
                "
              >
                sua assistente de estilo
              </p>

              <div className="w-full max-w-sm mx-auto">
                <Button
                  onClick={nextStep}
                  aria-label="Toque para começar o questionário"
                  className="text-center justify-center"
                >
                  toque para começar
                </Button>
              </div>

            </div>
          </div>
        );


      // ------------------------------------------------------
      // 2 — REGISTRATION
      // ------------------------------------------------------

      case 2:
        return (
          <div className="w-full max-w-xl mx-auto">

            <div className="mb-8">

              <span
                className="
                  block
                  font-['Inter']
                  text-xs
                  font-bold
                  tracking-[0.18em]
                  uppercase
                  text-[#5A8BA8]
                  mb-4
                "
              >
                Cadastro
              </span>

              <h1
                className="
                  font-['Poppins']
                  text-3xl
                  sm:text-4xl
                  font-bold
                  leading-[1.08]
                  tracking-tight
                  text-[#5A3B2E]
                  mb-4
                "
              >
                Que bom ter você aqui.
              </h1>

              <p
                className="
                  font-['Inter']
                  text-base
                  sm:text-lg
                  leading-relaxed
                  text-[#111A24]/75
                "
              >
                Informe seus dados para começarmos sua experiência.
              </p>

            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                nextStep();
              }}
            >

              <InputField
                label="Nome"
                id="nome"
                value={userData.name}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    name: e.target.value,
                  })
                }
              />

              <InputField
                label="Gênero"
                id="genero"
                value={userData.gender}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    gender: e.target.value,
                  })
                }
              />

              <InputField
                label="E-mail"
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  })
                }
              />

              <InputField
                label="Telefone"
                id="telefone"
                type="tel"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    phone: e.target.value,
                  })
                }
              />

              <InputField
                label="Aniversário"
                id="aniversario"
                type="date"
                value={userData.birthday}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    birthday: e.target.value,
                  })
                }
              />

              <div className="mt-8">
                <Button
                  type="submit"
                  aria-label="Ir para o próximo passo"
                  className="text-center justify-center"
                >
                  Próximo
                  <span
                    aria-hidden="true"
                    className="ml-2"
                  >
                    →
                  </span>
                </Button>
              </div>

            </form>
          </div>
        );


      // ------------------------------------------------------
      // 3 — ACCESSIBILITY
      // ------------------------------------------------------

      case 3:
        return (
          <div className="w-full max-w-xl mx-auto">

            <div className="mb-10">

              <span
                className="
                  block
                  font-['Inter']
                  text-xs
                  font-bold
                  tracking-[0.18em]
                  uppercase
                  text-[#5A8BA8]
                  mb-4
                "
              >
                Acessibilidade
              </span>

              <h1
                className="
                  font-['Poppins']
                  text-3xl
                  sm:text-4xl
                  font-bold
                  leading-[1.08]
                  text-[#5A3B2E]
                "
              >
                Você precisa de recursos de acessibilidade?
              </h1>

            </div>

            <div className="flex flex-col gap-3">

              <Button
                onClick={nextStep}
                aria-label="Sim, preciso de recursos de acessibilidade"
              >
                <span>Sim</span>
                <span aria-hidden="true">→</span>
              </Button>

              <Button
                onClick={nextStep}
                variant="secondary"
                aria-label="Não, não preciso de recursos de acessibilidade"
              >
                <span>Não</span>
                <span aria-hidden="true">→</span>
              </Button>

            </div>

          </div>
        );


      // ------------------------------------------------------
      // 4 — GOAL
      // ------------------------------------------------------

      case 4:
        return (
          <QuestionScreen
            eyebrow="Seu objetivo"
            title="O que você procura hoje?"
            options={[
              'look Casual',
              'look Esportivo',
              'look para Trabalho',
              'look de Festa',
              'Moda Praia',
              'look para viagem',
              'Moda íntima',
            ]}
            selected={answers.goal}
            onSelect={(val) => handleSingleChoice('goal', val)}
          />
        );


      // ------------------------------------------------------
      // 5 — Q1
      // ------------------------------------------------------

      case 5:
        return (
          <QuestionScreen
            eyebrow="Seu estilo"
            title="O que mais importa pra você numa roupa?"
            options={[
              'Conforto',
              'Elegância',
              'Delicadeza',
              'Sensualidade',
              'Impacto',
              'Discrição',
              'Criatividade',
            ]}
            selected={answers.q1}
            onSelect={(val) => handleSingleChoice('q1', val)}
          />
        );


      // ------------------------------------------------------
      // 6 — Q2
      // ------------------------------------------------------

      case 6:
        return (
          <QuestionScreen
            eyebrow="Seu estilo"
            title="Qual tipo de tecido te atrai mais?"
            options={[
              'Macio e confortável',
              'Fino e sofisticado',
              'Leve e fluido',
              'Justo e elástico',
              'Estruturado com forma firme',
              'Neutro e simples',
              'Colorido ou diferente',
            ]}
            selected={answers.q2}
            onSelect={(val) => handleSingleChoice('q2', val)}
          />
        );


      // ------------------------------------------------------
      // 7 — Q3
      // ------------------------------------------------------

      case 7:
        return (
          <QuestionScreen
            eyebrow="Seu guarda-roupa"
            title="Do que você mais gosta no seu guarda-roupa?"
            options={[
              'Roupas confortáveis',
              'Roupas elegantes e bem cortadas',
              'Peças delicadas e românticas',
              'Roupas que valorizam o corpo',
              'Peças marcantes e diferentes',
              'Itens básicos e fáceis de combinar',
              'Peças criativas, coloridas ou únicas',
            ]}
            selected={answers.q3}
            onSelect={(val) => handleSingleChoice('q3', val)}
          />
        );


      // ------------------------------------------------------
      // 8 — Q4
      // ------------------------------------------------------

      case 8:
        return (
          <QuestionScreen
            eyebrow="Cores"
            title="Como você mistura as cores nas suas roupas?"
            options={[
              'Cores intensas e marcantes',
              'Peças e acessórios em tons parecidos',
              'Vários tons da mesma cor',
              'Cores neutras e suaves',
              'Cores contrastantes e chamativas',
              'Cores que estão na moda de forma ousada',
              'Poucas cores e escolhas simples',
            ]}
            selected={answers.q4}
            onSelect={(val) => handleSingleChoice('q4', val)}
          />
        );


      // ------------------------------------------------------
      // 9 — Q5
      // ------------------------------------------------------

      case 9:
        return (
          <QuestionScreen
            eyebrow="Estampas"
            title="Se fosse escolher uma estampa, qual seria?"
            options={[
              'Neutra',
              'Geométrica e exagerada',
              'Várias estampas misturadas',
              'Listrado ou xadrez',
              'Floral delicado',
              'Animal print',
            ]}
            selected={answers.q5}
            onSelect={(val) => handleSingleChoice('q5', val)}
          />
        );


      // ------------------------------------------------------
      // 10 — STYLE RESULT
      // ------------------------------------------------------

      case 10:
        return (
          <div className="w-full max-w-xl mx-auto">

            <div className="mb-8">

              <span
                className="
                  block
                  font-['Inter']
                  text-xs
                  font-bold
                  tracking-[0.18em]
                  uppercase
                  text-[#5A8BA8]
                  mb-4
                "
              >
                Seu resultado
              </span>

              <h1
                className="
                  font-['Poppins']
                  text-3xl
                  sm:text-4xl
                  font-bold
                  leading-[1.08]
                  text-[#5A3B2E]
                  mb-5
                "
              >
                {userName}, quanta personalidade!
              </h1>

              <p
                className="
                  font-['Inter']
                  text-lg
                  sm:text-xl
                  leading-relaxed
                  text-[#111A24]/80
                "
              >
                Estes são os seus estilos predominantes:
              </p>

            </div>

            {/* Resultado visual */}
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-3
                mb-10
              "
            >

              <div
                className="
                  border
                  border-[#5A3B2E]/15
                  bg-white/40
                  p-6
                  rounded-md
                "
              >
                <span
                  className="
                    block
                    text-xs
                    uppercase
                    tracking-[0.15em]
                    font-bold
                    text-[#5A8BA8]
                    mb-3
                  "
                >
                  Estilo 01
                </span>

                <strong
                  className="
                    font-['Poppins']
                    text-2xl
                    text-[#5A3B2E]
                  "
                >
                  Elegante
                </strong>
              </div>

              <div
                className="
                  border
                  border-[#5A3B2E]/15
                  bg-white/40
                  p-6
                  rounded-md
                "
              >
                <span
                  className="
                    block
                    text-xs
                    uppercase
                    tracking-[0.15em]
                    font-bold
                    text-[#5A8BA8]
                    mb-3
                  "
                >
                  Estilo 02
                </span>

                <strong
                  className="
                    font-['Poppins']
                    text-2xl
                    text-[#5A3B2E]
                  "
                >
                  Exuberante
                </strong>
              </div>

            </div>

            <Button
              onClick={nextStep}
              aria-label="Ir para o próximo passo"
              className="text-center justify-center"
            >
              Próximo
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Button>

          </div>
        );


      // ------------------------------------------------------
      // 11 — CAMERA INTRO
      // ------------------------------------------------------

      case 11:
        return (
          <div className="w-full max-w-xl mx-auto">

            <div className="mb-10">

              <span
                className="
                  block
                  font-['Inter']
                  text-xs
                  font-bold
                  tracking-[0.18em]
                  uppercase
                  text-[#5A8BA8]
                  mb-4
                "
              >
                Análise corporal
              </span>

              <h1
                className="
                  font-['Poppins']
                  text-3xl
                  sm:text-4xl
                  font-bold
                  leading-[1.08]
                  text-[#5A3B2E]
                  mb-5
                "
              >
                {userName}, vamos conhecer melhor seu corpo.
              </h1>

              <p
                className="
                  font-['Inter']
                  text-base
                  sm:text-lg
                  leading-relaxed
                  text-[#111A24]/75
                "
              >
                Para realizarmos a análise do seu biotipo, abra a
                câmera, se posicione no local indicado, abra os
                braços e não se mova.
              </p>

            </div>

            <Button
              onClick={nextStep}
              aria-label="Abrir câmera para análise"
              className="text-center justify-center"
            >
              Abrir Câmera
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Button>

          </div>
        );


      // ------------------------------------------------------
      // 12 — PERCEPTION MULTI SELECT
      // ------------------------------------------------------

      case 12:
        return (
          <MultiSelectQuestionScreen
            userName={userName}
            selected={answers.perception || []}
            setSelected={(value) =>
              setAnswers((current) => ({
                ...current,
                perception:
                  typeof value === 'function'
                    ? value(current.perception || [])
                    : value,
              }))
            }
            onNext={nextStep}
          />
        );


      // ------------------------------------------------------
      // 13 — FINAL CART
      // ------------------------------------------------------

      case 13:
        return (
          <div className="w-full max-w-xl mx-auto">

            <div className="mb-10">

              <span
                className="
                  block
                  font-['Inter']
                  text-xs
                  font-bold
                  tracking-[0.18em]
                  uppercase
                  text-[#5A8BA8]
                  mb-4
                "
              >
                Tudo pronto
              </span>

              <h1
                className="
                  font-['Poppins']
                  text-3xl
                  sm:text-4xl
                  font-bold
                  leading-[1.08]
                  text-[#5A3B2E]
                  mb-5
                "
              >
                {userName}, agora que identificamos seu tipo físico,
                sei exatamente as melhores opções para te sugerir.
              </h1>

              <p
                className="
                  font-['Inter']
                  text-base
                  sm:text-lg
                  leading-relaxed
                  text-[#111A24]/75
                "
              >
                É só escolher suas opções favoritas e adicionar
                ao seu carrinho. Ótimas compras!
              </p>

            </div>

            <Button
              onClick={() => alert('Acessando loja...')}
              aria-label="Ir para o carrinho de compras"
              className="text-center justify-center"
            >
              Ir para o carrinho
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Button>

          </div>
        );


      // ------------------------------------------------------
      // DEFAULT
      // ------------------------------------------------------

      default:
        return (
          <div className="text-center">
            <h1>Erro: Passo desconhecido.</h1>
          </div>
        );
    }
  };


  // ==========================================================
  // MAIN LAYOUT
  // ==========================================================

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800;900&display=swap');

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          padding: 0;
          background: ${COLORS.bg};
          color: ${COLORS.blue};
          font-family: 'Inter', sans-serif;
        }

        button,
        input {
          font-family: inherit;
        }

        ::selection {
          background: ${COLORS.accent};
          color: white;
        }
      `}</style>


      <main
        className="
          min-h-screen
          bg-[#F7F6F2]
          flex
          flex-col
          text-[#111A24]
        "
        aria-live="polite"
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <header
          className="
            w-full
            px-5
            sm:px-8
            pt-5
            sm:pt-7
          "
        >

          <div
            className="
              max-w-5xl
              mx-auto
              flex
              items-center
              justify-between
              relative
            "
          >

            {/* VOLTAR */}

            <div className="w-24">

              {step > 1 && (
                <button
                  type="button"
                  onClick={previousStep}
                  className="
                    group

                    inline-flex
                    items-center
                    gap-2

                    text-[#5A3B2E]

                    font-['Inter']
                    font-semibold
                    text-sm
                    sm:text-base

                    px-2
                    py-2

                    rounded-md

                    transition-all
                    duration-200

                    hover:-translate-x-1

                    focus:outline-none
                    focus:ring-4
                    focus:ring-[#5A8BA8]/30
                  "
                  aria-label="Voltar para a etapa anterior"
                >

                  <span
                    aria-hidden="true"
                    className="
                      text-xl
                      leading-none
                      transition-transform
                      group-hover:-translate-x-0.5
                    "
                  >
                    ←
                  </span>

                  <span>
                    Voltar
                  </span>

                </button>
              )}

            </div>


            {/* MARCA */}

            <div
              className="
                absolute
                left-1/2
                -translate-x-1/2
                text-center
              "
              aria-label="Ayanmo"
            >

              <div
                className="
                  font-['Poppins']
                  font-black
                  tracking-[0.18em]
                  text-[#5A3B2E]
                  text-base
                  sm:text-lg
                "
              >
                AYANMO
              </div>

            </div>


            {/* PROGRESSO */}

            <div
              className="
                w-24
                text-right
                font-['Inter']
                text-xs
                sm:text-sm
                font-semibold
                tracking-wide
                text-[#5A8BA8]
              "
              aria-label={`Etapa ${step} de ${TOTAL_STEPS}`}
            >

              {String(step).padStart(2, '0')}

              <span className="text-[#111A24]/25 mx-1">
                /
              </span>

              {String(TOTAL_STEPS).padStart(2, '0')}

            </div>

          </div>


          {/* LINHA DE PROGRESSO */}

          <div
            className="
              max-w-5xl
              mx-auto
              mt-5
            "
          >

            <div
              className="
                h-px
                bg-[#5A3B2E]/10
                relative
                overflow-hidden
              "
            >

              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  bg-[#5A8BA8]
                  transition-all
                  duration-500
                  ease-out
                "
                style={{
                  width: `${(step / TOTAL_STEPS) * 100}%`,
                }}
              />

            </div>

          </div>

        </header>


        {/* ==================================================
            CONTENT
        ================================================== */}

        <section
          ref={mainRef}
          tabIndex="-1"
          className="
            flex-1
            w-full
            px-5
            sm:px-8
            py-10
            sm:py-16
            outline-none
          "
        >

          <div
            className="
              max-w-2xl
              mx-auto

              min-h-[calc(100vh-150px)]

              flex
              items-center
              justify-center
            "
          >

            {renderScreen()}

          </div>

        </section>


        {/* ==================================================
            FOOTER DISCRETO
        ================================================== */}

        <footer
          className="
            w-full
            px-5
            sm:px-8
            pb-5
          "
        >

          <div
            className="
              max-w-5xl
              mx-auto
              flex
              justify-center
              items-center
              gap-1.5
            "
            aria-hidden="true"
          >

            {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
              <span
                key={index}
                className={`
                  block
                  h-1
                  transition-all
                  duration-300
                  ${
                    index + 1 === step
                      ? 'w-5 bg-[#5A3B2E]'
                      : index + 1 < step
                        ? 'w-2 bg-[#5A8BA8]'
                        : 'w-1.5 bg-[#5A3B2E]/15'
                  }
                `}
              />
            ))}

          </div>

        </footer>

      </main>
    </>
  );
}


// ============================================================
// GENERIC QUESTION SCREEN
// ============================================================

const QuestionScreen = ({
  eyebrow,
  title,
  options,
  onSelect,
  selected,
}) => (
  <div className="w-full max-w-xl mx-auto">

    {/* TÍTULO */}

    <div className="mb-8 sm:mb-10">

      {eyebrow && (
        <span
          className="
            block
            font-['Inter']
            text-xs
            font-bold
            tracking-[0.18em]
            uppercase
            text-[#5A8BA8]
            mb-4
          "
        >
          {eyebrow}
        </span>
      )}

      <h1
        id="question-title"
        className="
          font-['Poppins']
          text-3xl
          sm:text-4xl
          font-bold
          leading-[1.08]
          tracking-tight
          text-[#5A3B2E]
        "
      >
        {title}
      </h1>

    </div>


    {/* OPÇÕES */}

    <div
      className="
        flex
        flex-col
        gap-3
      "
      role="radiogroup"
      aria-labelledby="question-title"
    >

      {options.map((opt, idx) => {

        const isSelected = selected === opt;

        return (
          <Button
            key={idx}
            variant={isSelected ? 'selected' : 'secondary'}
            onClick={() => onSelect(opt)}
            aria-label={`Selecionar opção: ${opt}`}
            aria-pressed={isSelected}
            className="
              group

              flex
              items-center
              justify-between
              gap-4

              hover:translate-x-1
            "
          >

            <span>
              {opt}
            </span>

            <span
              aria-hidden="true"
              className="
                text-[#5A8BA8]
                text-xl
                opacity-40
                group-hover:opacity-100
                transition-opacity
              "
            >
              →
            </span>

          </Button>
        );

      })}

    </div>

  </div>
);


// ============================================================
// MULTI SELECT QUESTION
// ============================================================

const MultiSelectQuestionScreen = ({
  userName,
  selected,
  setSelected,
  onNext,
}) => {

  const options = [
    'Profissional',
    'Confiante',
    'Acessível',
    'Criativa',
    'Elegante',
    'Marcante',
  ];


  const toggleSelection = (opt) => {

    setSelected((current) => {

      if (current.includes(opt)) {
        return current.filter((item) => item !== opt);
      }

      if (current.length < 2) {
        return [...current, opt];
      }

      return current;
    });

  };


  return (
    <div className="w-full max-w-xl mx-auto">

      {/* TÍTULO */}

      <div className="mb-8 sm:mb-10">

        <span
          className="
            block
            font-['Inter']
            text-xs
            font-bold
            tracking-[0.18em]
            uppercase
            text-[#5A8BA8]
            mb-4
          "
        >
          Percepção
        </span>

        <h1
          className="
            font-['Poppins']
            text-3xl
            sm:text-4xl
            font-bold
            leading-[1.08]
            tracking-tight
            text-[#5A3B2E]
            mb-4
          "
        >
          Como você quer ser percebida com este look?
        </h1>

        <p
          className="
            font-['Inter']
            text-base
            sm:text-lg
            text-[#111A24]/70
          "
          aria-live="polite"
        >
          {userName}, escolha até 2 opções.
          <span className="font-semibold text-[#5A3B2E]">
            {' '}
            {2 - selected.length}
          </span>{' '}
          restantes.
        </p>

      </div>


      {/* OPÇÕES */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-3
          mb-8
        "
      >

        {options.map((opt, idx) => {

          const isSelected = selected.includes(opt);

          const isDisabled =
            !isSelected &&
            selected.length >= 2;

          return (
            <Button
              key={idx}
              variant={isSelected ? 'selected' : 'secondary'}
              onClick={() => toggleSelection(opt)}
              aria-pressed={isSelected}
              disabled={isDisabled}
              aria-label={
                isSelected
                  ? `Remover seleção: ${opt}`
                  : `Selecionar opção: ${opt}`
              }
              className="
                min-h-[64px]

                flex
                items-center
                justify-between
                gap-3

                text-left
              "
            >

              <span>
                {opt}
              </span>

              <span
                aria-hidden="true"
                className="
                  flex
                  items-center
                  justify-center

                  w-5
                  h-5

                  border
                  border-current

                  rounded-full

                  text-xs
                  shrink-0
                "
              >
                {isSelected ? '✓' : ''}
              </span>

            </Button>
          );

        })}

      </div>


      {/* CONTINUAR */}

      <Button
        onClick={onNext}
        disabled={selected.length === 0}
        aria-label="Confirmar seleções e ir para o próximo passo"
        className="text-center justify-center"
      >
        Continuar
        <span
          aria-hidden="true"
          className="ml-2"
        >
          →
        </span>
      </Button>

    </div>
  );
};