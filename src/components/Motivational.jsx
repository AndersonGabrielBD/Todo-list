import { useState, useEffect } from "react";

function Motivational() {
  const [currentQuote, setCurrentQuote] = useState({ frase: "", autor: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/devmatheusguerra/frasesJSON/main/frases.json"
        );
        const data = await response.json();


        // Verifique se o array de frases tem elementos
        if (data && data.length > 0) {
          const randomQuote = data[Math.floor(Math.random() * data.length)];
          setCurrentQuote({
            frase: randomQuote.frase || "Frase não encontrada",
            autor: randomQuote.autor || "Autor desconhecido",
          });
        } else {
          setCurrentQuote({ frase: "Nenhuma frase encontrada.", autor: "" });
        }
      } catch (error) {
        console.error("Erro ao buscar frases:", error);
        setCurrentQuote({ frase: "Erro ao carregar frase.", autor: "" });
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();

    const interval = setInterval(fetchQuotes, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="motivacional-quote">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <p>{`"${currentQuote.frase}" - ${currentQuote.autor}`}</p>
      )}
    </div>
  );
}

export default Motivational;
