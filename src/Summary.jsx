import React, { useEffect, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Summary = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Gestion de l'affichage du bouton "Scroll to Top"
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300); // Affiche après 300px de défilement
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fonction pour remonter en haut de la page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fonction pour défiler vers une section spécifique
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-sans">
      <div className="fixed top-0 left-0 w-full bg-white shadow-none transition-shadow duration-300">
        <div className="flex justify-end p-4 shadow-md">
          <Link
            to="/"
            className="text-blue-500  hover:text-blue-700 font-semibold text-lg transition duration-300"
          >
            Back to Game
          </Link>
        </div>
      </div>
      {/* Table des matières */}
      <div className="p-6">
        <h1 className="text-4xl font-bold mt-16 mb-10">Summary of the Game</h1>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <button
                onClick={() => scrollToSection("objective")}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Objective of the Game
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("players")}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Number of Players
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("duration")}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Duration of the Game
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("equipment")}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Equipment Required
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("implementation")}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Implementation
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("howToPlay")}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                How the Game is Played
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("victoryConditions")}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Conditions of Victory
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("quickSummary")}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Quick Summary of Game Stages
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("advice")}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Advice
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("example")}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Example of Game
              </button>
            </li>
          </ul>
        </div>

        {/* Sections */}
        <section id="objective" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Objective of the Game</h2>
          <p>
            The goal is to develop your behavioural skills (soft skills) by
            responding to realistic situations. Players earn points by
            identifying the best skill to use for problem solving, while taking
            into account character traits of characters (personas). The first
            player to score 20 points wins!
          </p>
        </section>

        <section id="players" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Number of Players</h2>
          <p>From 2 to 6 players.</p>
        </section>

        <section id="duration" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Duration of the Game</h2>
          <p>
            Approximately 30 to 45 minutes, depending on the number of players
            and rounds.
          </p>
        </section>

        <section id="equipment" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Equipment Required</h2>
          <ul className="list-disc pl-6">
            <li>Persona cards (4): Character descriptions with traits.</li>
            <li>Situation cards (35): Business scenarios.</li>
            <li>Soft Skills cards (10 per player).</li>
            <li>Virtual progress board for tracking scores.</li>
            <li>Colored chips to represent players.</li>
            <li>QR code for digital elements.</li>
          </ul>
        </section>

        <section id="implementation" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Implementation</h2>
          <ul className="list-disc pl-6">
            <li>Distribute 10 Soft Skills cards to each player.</li>
            <li>Shuffle and stack Persona and Situation cards.</li>
            <li>Set up the virtual progress board.</li>
            <li>Decide on the turn order.</li>
          </ul>
        </section>

        <section id="howToPlay" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">
            How the Game is Played
          </h2>
          <ol className="list-decimal pl-6">
            <li>Draw a Persona card and play the role.</li>
            <li>Draw a Situation card.</li>
            <li>Describe the situation while embodying the Persona.</li>
            <li>Other players choose Soft Skills to solve the problem.</li>
            <li>Compare answers and assign points.</li>
            <li>Update the scoreboard.</li>
            <li>Next player's turn.</li>
          </ol>
        </section>

        <section id="victoryConditions" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Conditions of Victory</h2>
          <ul className="list-disc pl-6">
            <li>Score mode: First to reach the target score wins.</li>
            <li>Rounds mode: Most points after all rounds wins.</li>
          </ul>
        </section>

        <section id="quickSummary" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">
            Quick Summary of Game Stages
          </h2>
          <ul className="list-disc pl-6">
            <li>Draw a Persona card.</li>
            <li>Draw a Situation card.</li>
            <li>Describe the situation according to the Persona.</li>
            <li>Players offer a Soft Skill.</li>
            <li>Assign points.</li>
          </ul>
        </section>

        <section id="advice" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Advice</h2>
          <ul className="list-disc pl-6">
            <li>Focus on Persona traits and Situation context.</li>
            <li>Encourage discussion to justify choices and learn together.</li>
          </ul>
        </section>

        <section id="example" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Example of Game</h2>
          <p>
            Player A draws a Persona card: <em>"Manager"</em>. Draws a Situation
            card: <em>"One member of the team appears unmotivated."</em> They
            play the role of manager in describing the situation. Other players
            lay their soft skills cards face down. The optimal answer is{" "}
            <strong>"Empathy"</strong>. Players who decide this skill gain 1
            point. Player A gets 1 bonus point for their inspirational
            description.
          </p>
        </section>
      </div>

      {/* Bouton "Scroll to Top" */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="h-6 w-6 text-blue-500" />
        </button>
      )}
    </div>
  );
};

export default Summary;
