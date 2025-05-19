let perguntas = [];
let perguntaAtual = 0;
let pontos = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const explanationEl = document.getElementById("explanation");
const explanationTextEl = document.getElementById("explanation-text");

// Perguntas com explicações
const perguntasComExplicacoes = [
  {
    pergunta: "Quem foi o primeiro imperador do Brasil?",
    opcoes: ["Dom João VI", "Dom Pedro I", "Tiradentes", "Dom Pedro II"],
    resposta: "Dom Pedro I",
    explicacao:
      "Dom Pedro I foi o primeiro imperador do Brasil! Ele proclamou a independência do Brasil em 7 de setembro de 1822, com o famoso 'Grito do Ipiranga'. Ele governou o Brasil até 1831, quando abdicou do trono em favor de seu filho, Dom Pedro II.",
  },
  {
    pergunta: "Em que ano o Brasil se tornou independente de Portugal?",
    opcoes: ["1500", "1822", "1889", "1808"],
    resposta: "1822",
    explicacao:
      "O Brasil se tornou independente de Portugal em 1822! Foi no dia 7 de setembro que Dom Pedro I declarou a independência às margens do rio Ipiranga. Antes disso, o Brasil era uma colônia de Portugal desde o ano 1500, quando Pedro Álvares Cabral chegou aqui.",
  },
];

function mostrarPergunta() {
  nextBtn.disabled = true;
  optionsEl.innerHTML = "";
  explanationEl.style.display = "none";

  const q = perguntasComExplicacoes[perguntaAtual];
  questionEl.textContent = q.pergunta;

  q.opcoes.forEach((opcao) => {
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.classList.add("option-btn");
    btn.onclick = () => verificarResposta(btn, q.resposta, q.explicacao);
    optionsEl.appendChild(btn);
  });
}

function verificarResposta(btn, respostaCorreta, explicacao) {
  const botoes = document.querySelectorAll(".option-btn");
  botoes.forEach((b) => (b.disabled = true));

  if (btn.textContent === respostaCorreta) {
    btn.classList.add("correct");
    pontos++;
    new Audio("assets/sounds/correct.mp3")
      .play()
      .catch((e) => console.log("Erro ao reproduzir áudio:", e));

    // Mostrar explicação
    explanationTextEl.textContent = explicacao;
    explanationEl.style.display = "flex";

    // Animação do bonequinho
    const character = document.querySelector(".character");
    character.style.animation = "none";
    setTimeout(() => {
      character.style.animation = "jump 0.5s";
    }, 10);
  } else {
    btn.classList.add("wrong");
    new Audio("assets/sounds/wrong.mp3")
      .play()
      .catch((e) => console.log("Erro ao reproduzir áudio:", e));

    // Encontrar a resposta correta e destacá-la
    botoes.forEach((b) => {
      if (b.textContent === respostaCorreta) {
        b.classList.add("correct");
      }
    });
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  perguntaAtual++;
  if (perguntaAtual < perguntasComExplicacoes.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
});

function mostrarResultado() {
  questionEl.textContent = `Você acertou ${pontos} de ${perguntasComExplicacoes.length}!`;
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  explanationEl.style.display = "none";
}

// Iniciar o quiz
mostrarPergunta();

// Adicionar animação CSS dinamicamente
const style = document.createElement("style");
style.textContent = `
  @keyframes jump {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`;
document.head.appendChild(style);
