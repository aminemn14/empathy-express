import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Summary = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="font-sans">
      {/* Barre fixe avec le lien */}
      <div
        className={`fixed top-0 left-0 w-full bg-white px-6 py-4 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        } flex justify-end`}
      >
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-700 font-semibold text-lg transition duration-300"
        >
          Back to Game
        </Link>
      </div>
      <div className="p-6 pt-12">
        <h1 className="text-4xl font-bold mt-16 mb-20">Summary of the Game</h1>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Objective of the Game</h2>
          <p>
            The goal is to develop your behavioural skills (soft skills) by
            responding to realistic situations. Players earn points by
            identifying the best skill to use for problem solving, while taking
            into account character traits of characters (personas). The first
            player to score 20 points wins!
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Number of Players</h2>
          <p>From 2 to 6 players.</p>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Duration of the Game</h2>
          <p>
            Approximately 30 to 45 minutes, depending on the number of players
            and rounds.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Equipment Required</h2>
          <ul className="list-disc pl-6">
            <li>
              Persona cards (4): Each card describes a character with specific
              traits.
            </li>
            <li>
              Situation cards (35): Each card offers a realistic business
              scenario.
            </li>
            <li>
              Soft Skills cards (10 per player): Accountability, Being reliable
              / Dependable, Common sense, Constructive criticism, Team spirit /
              Being a good team player, Active Listening, Empathy,
              Problem-Solving, Assertive Communication, Leadership.
            </li>
            <li>Virtual progress board: To track the scores of players.</li>
            <li>Colored Chips: To represent each player on the board.</li>
            <li>QR code.</li>
          </ul>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Implementation</h2>
          <ul className="list-disc pl-6">
            <li>
              Deal 10 Soft Skills cards to each player (one for each skill).
            </li>
            <li>
              Mix up the Persona cards and place them face down in a stack.
            </li>
            <li>
              Mix up the Situation cards and place them face down in a stack.
            </li>
            <li>Scan the progress tray (digital).</li>
            <li>Decide on a game order (by random draw).</li>
          </ul>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">
            How the Game is Played
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <strong>Draw a Persona Card:</strong> The active player draws a
              Persona card that describes a role and a character trait. They
              must play this role for the turn.
            </li>
            <li>
              <strong>Draw a Situation Card:</strong> The active player then
              draws a Situation card that describes a workplace scenario.
            </li>
            <li>
              <strong>Describe the Situation:</strong> The active player
              describes the situation while embodying the Persona they drew,
              using the character traits.
            </li>
            <li>
              <strong>Choose Soft Skills:</strong> The other players analyze the
              situation and choose which Soft Skill they think best solves the
              problem. Each player places their Soft Skill card face down.
            </li>
            <li>
              <strong>Resolution and Points:</strong> All Soft Skill cards are
              turned over. If a card matches the optimal response (according to
              the Situation and Persona combination), the players who chose that
              Soft Skill earn points. The active player also earns a bonus point
              if they described the situation creatively and consistently.
            </li>
            <li>
              <strong>Progress on the Board:</strong> The earned points are
              added to each player’s score, and their colored pawn moves forward
              on the scoreboard.
            </li>
            <li>
              <strong>Move to the Next Player:</strong> The turn moves to the
              next player, and the game continues until one player reaches the
              target score or all cards are used.
            </li>
          </ol>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Conditions of Victory</h2>
          <ul className="list-disc pl-6">
            <li>
              <strong>Score mode:</strong> The first player to reach the target
              score wins (e.g., 20 points).
            </li>
            <li>
              <strong>Rounds mode:</strong> If all rounds are played, the player
              with the most points wins.
            </li>
          </ul>
        </section>

        <section className="mb-20">
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

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Advice</h2>
          <ul className="list-disc pl-6">
            <li>
              Players must focus on the character traits of the Persona and the
              context of the Situation to choose the best skill.
            </li>
            <li>Encourage discussion to justify choices and learn together.</li>
          </ul>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Example of Game</h2>
          <p>
            Player A draws a Persona card: <em>"Manager"</em>. Draws a Situation
            card:
            <em>"One member of the team appears unmotivated."</em>
            They play the role of the manager in describing the situation. Other
            players lay their Soft Skills cards face down. The optimal answer is{" "}
            <strong>"Empathy."</strong>
            Players who decide this skill gain 1 point. Player A gets 1 bonus
            point for their inspirational description.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Summary;
