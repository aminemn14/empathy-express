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
            className="text-blue-500 hover:text-blue-700 font-semibold text-lg transition duration-300"
          >
            Back to Game
          </Link>
        </div>
      </div>
      <div className="p-6">
        <h1 className="text-4xl font-bold mt-16 mb-10">
          Game Rules and Overview
        </h1>
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
                onClick={() => scrollToSection("setup")}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Setup
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("level1")}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                How to Play: Level 1
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("level2")}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                How to Play: Level 2
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
                Example Gameplay
              </button>
            </li>
          </ul>
        </div>

        {/* Sections */}
        <section id="objective" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Objective of the Game</h2>
          <p>
            Develop your soft skills by responding to realistic workplace
            scenarios. Players earn points by identifying the best skill to
            solve a problem. The first player to reach 20 points wins!
          </p>
        </section>

        <section id="players" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Number of Players</h2>
          <p>2 to 6 players</p>
        </section>

        <section id="duration" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Duration of the Game</h2>
          <p>
            30 to 45 minutes, depending on the number of players and rounds.
          </p>
        </section>

        <section id="equipment" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Equipment Required</h2>
          <ul className="list-disc pl-6">
            <li>Situation Cards (35): Realistic workplace scenarios.</li>
            <li>
              Soft Skills Cards (10 per player): Skills include Accountability,
              Being reliable / Dependable, Common sense, Constructive criticism,
              Team spirit / Being a good team player, Active Listening, Empathy,
              Problem-Solving, Assertive Communication, Leadership.
            </li>
            <li>Persona Cards (4): Used in Level 2 for character roles.</li>
            <li>Virtual Progress Board: Tracks scores for all players.</li>
            <li>Colored Tokens: Represent each player on the board.</li>
            <li>QR Code: To access the virtual board.</li>
          </ul>
        </section>

        <section id="setup" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Setup</h2>
          <ul className="list-disc pl-6">
            <li>Deal 10 Soft Skills cards to each player.</li>
            <li>Shuffle the Situation cards and place them face down.</li>
            <li>
              (For Level 2) Shuffle the Persona cards and place them face down.
            </li>
            <li>Scan the QR code to set up the virtual progress board.</li>
            <li>Decide the order of play randomly.</li>
          </ul>
        </section>

        <section id="level1" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">How to Play: Level 1</h2>
          <ol className="list-decimal pl-6">
            <li>Draw a Situation Card and read it aloud.</li>
            <li>Players choose a Soft Skill they think solves the problem.</li>
            <li>Reveal the cards and assign points for correct answers.</li>
            <li>Update the progress board and move to the next player.</li>
          </ol>
        </section>

        <section id="level2" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">How to Play: Level 2</h2>
          <ol className="list-decimal pl-6">
            <li>Draw a Persona Card and embody its role and traits.</li>
            <li>Draw a Situation Card and describe it using the Persona.</li>
            <li>Players choose a Soft Skill they think solves the problem.</li>
            <li>Reveal the cards and assign points for correct answers.</li>
            <li>
              The active player earns a bonus point for a creative Persona
              description.
            </li>
            <li>Update the progress board and move to the next player.</li>
          </ol>
        </section>

        <section id="victoryConditions" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Conditions of Victory</h2>
          <ul className="list-disc pl-6">
            <li>Score Mode: The first player to reach 20 points wins.</li>
            <li>
              Rounds Mode: If all rounds are played, the player with the highest
              score wins.
            </li>
          </ul>
        </section>

        <section id="quickSummary" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">
            Quick Summary of Game Stages
          </h2>
          <ul className="list-disc pl-6">
            <li>
              Level 1: Draw, describe, propose Soft Skills, assign points.
            </li>
            <li>
              Level 2: Add Persona card, describe with traits, assign points.
            </li>
          </ul>
        </section>

        <section id="advice" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Advice</h2>
          <ul className="list-disc pl-6">
            <li>Focus on analyzing Situations and Personas (Level 2).</li>
            <li>Encourage group discussions to foster learning.</li>
          </ul>
        </section>

        <section id="example" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Example Gameplay</h2>
          <p>
            <strong>Level 1:</strong> Player A draws a Situation card: "A team
            member missed a deadline." The optimal skill is "Accountability."
            Players who chose it gain 1 point.
          </p>
          <p>
            <strong>Level 2:</strong> Player A draws a Persona card: "Manager –
            Inspirational" and describes a scenario. The optimal skill is
            "Empathy." Players who chose it gain 1 point. Player A earns a bonus
            point for a creative Persona description.
          </p>
        </section>
      </div>
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
