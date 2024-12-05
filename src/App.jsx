import React, { useState, useEffect } from "react";
import {
  XMarkIcon,
  InformationCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { useGame } from "./GameContext.jsx";

const colors = [
  "bg-red-500",
  "bg-emerald-500",
  "bg-sky-300",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
];

function App() {
  const {
    players,
    setPlayers,
    gameStarted,
    setGameStarted,
    currentPlayerIndex,
    setCurrentPlayerIndex,
    winner,
    setWinner,
  } = useGame();
  const [playerName, setPlayerName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

  useEffect(() => {
    // Récupère le niveau depuis localStorage si disponible
    const storedLevel = localStorage.getItem("selectedLevel");
    if (storedLevel) {
      setSelectedLevel(storedLevel);
    }
  }, []);

  const openLevelModal = () => {
    if (players.length >= 2) {
      setIsLevelModalOpen(true);
    } else {
      toast.error("At least 2 players are required to start the game.");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);

  useEffect(() => {
    if (isModalOpen) {
      // Désactive le scroll sur l'arrière-plan
      document.body.style.overflow = "hidden";
    } else {
      // Réactive le scroll sur l'arrière-plan
      document.body.style.overflow = "";
    }
    // Nettoyage pour s'assurer que le style est réinitialisé
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const togglePlayerSelection = (playerId) => {
    setSelectedPlayerIds((prevSelected) =>
      prevSelected.includes(playerId)
        ? prevSelected.filter((id) => id !== playerId)
        : [...prevSelected, playerId]
    );
  };

  const [situations, setSituations] = useState([]);
  const [selectedSituation, setSelectedSituation] = useState(null);

  const levelSituations = {
    1: [
      {
        situation: "Active Listening",
        answers: [
          "You are interrupted in the middle of an important discussion and cut off without reason.",
          "You are asked to participate in an activity, but you are clearly made to feel that you are not welcome.",
          "You send an important message and are completely ignored without explanation.",
          "You are asked to participate in an activity, but you are clearly made to feel that you are not welcome.",
        ],
      },
      {
        situation: "Empathy",
        answers: [
          "You learn that someone has revealed a very private secret that you had confided to them.",
          "You do your best to help someone, but you are blamed for not doing enough or for doing wrong.",
          "Your concerns or difficulties are minimized, and others have more important problems.",
          "You do your best to help someone, but you are blamed for not doing enough or for doing wrong.",
        ],
      },
      {
        situation: "Problem-Solving",
        answers: [
          "You are asked to do urgent work when you do not have all the information necessary to do it properly.",
          "You propose a practical solution to a problem, but it is rejected without argument, then someone else proposes the same and is applauded.",
          "You are given a very complicated explanation of a task and then blamed for not having done it well.",
          "You propose a practical solution to a problem, but it is rejected without argument, then someone else proposes the same and is applauded.",
        ],
      },
      {
        situation: "Assertive Communication",
        answers: [
          "You are being pressured to accept an important decision without the opportunity to express your opinion.",
          "You are told that your ideas are bad or useless, without taking into account your point of view.",
          "You are asked a personal question in front of a group to make you uncomfortable.",
        ],
      },
      {
        situation: "Leadership",
        answers: [
          "You are organizing an event, but no one is following the rules or the program you have set up.",
          "You have a conflict with someone, and that person is posing as the victim to others.",
          "You are consistently compared to someone else in an unfavorable way, no matter how hard you try.",
        ],
      },
      {
        situation: "Accountability",
        answers: [
          "You are given a responsibility, but then left to do it all alone, without support or guidance.",
          "You are asked to change your job after the fact, but without giving you clear new directions.",
          "You share an original idea, and someone takes credit in front of everyone.",
        ],
      },
      {
        situation: "Being Reliable / Dependable",
        answers: [
          "You are given an important promise, but the person does not keep it without warning you.",
          "You are asked to be available at any time for a project, without respecting your schedule.",
          "You are wrongly accused of doing something that you did not do, and no one is trying to verify the facts.",
        ],
      },
      {
        situation: "Common Sense",
        answers: [
          "You are asked to make a quick decision, but you do not have all the information necessary to be sure of your choice.",
          "Someone makes a decision that directly affects you without consulting you.",
          "You are forced to do something that you don’t want, on the pretext that it is for 'your own good'.",
        ],
      },
      {
        situation: "Constructive Criticism",
        answers: [
          "You are being criticized 'constructively', but it is worded in a way that is unnecessarily hurtful.",
          "You are publicly criticized for a project that you have spent a lot of time on, without recognizing your efforts.",
          "You speak on a subject that you know, but people doubt you for no good reason.",
        ],
      },
      {
        situation: "Team Spirit / Being a Good Team Player",
        answers: [
          "You are doing a collaborative work, but someone refuses to participate while criticizing the result.",
          "You make an effort to reconcile with someone, but they categorically reject your attempts.",
          "You are organizing an event, but no one is following the rules or the program you have set up.",
        ],
      },
    ],
    2: [
      {
        situation: "#1",
        answers: [
          {
            role: "Co-Worker",
            skill: "Active Listening",
            description:
              "Calmly restore respect by actively listening to others and encouraging a respectful dialogue.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Understand why your partner might have interrupted and address the underlying issue.",
          },
          {
            role: "Friend",
            skill: "Assertive Communication",
            description:
              "Politely but firmly assert the need to be heard and complete your thoughts.",
          },
          {
            role: "Customer",
            skill: "Problem-Solving",
            description:
              "Focus on resolving the interruption constructively to maintain the customer relationship.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Regain control of the conversation with authority while encouraging open communication.",
          },
        ],
      },
      {
        situation: "#2",
        answers: [
          {
            role: "Co-Worker",
            skill: "Accountability",
            description:
              "Address the breach of trust calmly and clarify expectations for confidentiality moving forward.",
          },
          {
            role: "Life Partner",
            skill: "Leadership",
            description:
              "Take responsibility for discussing boundaries and repairing the trust in your relationship.",
          },
          {
            role: "Friend",
            skill: "Constructive Criticism",
            description:
              "Provide honest feedback to your friend about how this affected you and your trust.",
          },
          {
            role: "Customer",
            skill: "Assertive Communication",
            description:
              "Clearly express the impact of the breach and establish professional boundaries.",
          },
          {
            role: "Manager",
            skill: "Empathy",
            description:
              "Try to understand why the breach occurred, then guide the team on confidentiality expectations.",
          },
        ],
      },
      {
        situation: "#3",
        answers: [
          {
            role: "Co-Worker",
            skill: "Being Reliable / Dependable",
            description:
              "Focus on clarifying expectations to avoid future misunderstandings.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Understand their perspective and discuss how you can better support each other.",
          },
          {
            role: "Friend",
            skill: "Assertive Communication",
            description:
              "Calmly explain the effort you put in and discuss how they feel it could have been improved.",
          },
          {
            role: "Customer",
            skill: "Problem-Solving",
            description:
              "Address their dissatisfaction by offering practical solutions to improve the outcome.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Take responsibility, accept feedback, and guide the conversation toward solutions.",
          },
        ],
      },
      {
        situation: "#4",
        answers: [
          {
            role: "Co-Worker",
            skill: "Common Sense",
            description:
              "Ask questions and focus on gathering the minimum required information to start.",
          },
          {
            role: "Life Partner",
            skill: "Problem-Solving",
            description:
              "Work together to find a way to get the needed details efficiently.",
          },
          {
            role: "Friend",
            skill: "Accountability",
            description:
              "Take responsibility for clarifying what you can and cannot do given the circumstances.",
          },
          {
            role: "Customer",
            skill: "Assertive Communication",
            description:
              "Clearly explain why more information is needed and propose a realistic timeline.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Demonstrate initiative by organizing resources and filling in gaps in information.",
          },
        ],
      },
      {
        situation: "#5",
        answers: [
          {
            role: "Co-Worker",
            skill: "Constructive Criticism",
            description:
              "Stay professional and seek specific feedback to improve future outcomes.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Share your feelings calmly and ask for understanding about your efforts.",
          },
          {
            role: "Friend",
            skill: "Assertive Communication",
            description:
              "Explain how the criticism affects you and discuss how they can give feedback constructively.",
          },
          {
            role: "Customer",
            skill: "Problem-Solving",
            description:
              "Focus on resolving the issue rather than dwelling on the negative feedback.",
          },
          {
            role: "Manager",
            skill: "Accountability",
            description:
              "Take responsibility for the project’s shortcomings while highlighting your effort.",
          },
        ],
      },
      {
        situation: "#6",
        answers: [
          {
            role: "Co-Worker",
            skill: "Common Sense",
            description:
              "Assess the situation and decide whether to proceed or excuse yourself gracefully.",
          },
          {
            role: "Life Partner",
            skill: "Team Spirit / Being a Good Team Player",
            description:
              "Encourage an open conversation about how you can work together on the activity.",
          },
          {
            role: "Friend",
            skill: "Assertive Communication",
            description:
              "Express how their attitude makes you feel and seek clarity about their behavior.",
          },
          {
            role: "Customer",
            skill: "Empathy",
            description:
              "Try to understand their hesitance and offer ways to make the interaction smoother.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Take the lead in addressing the behavior and fostering inclusivity.",
          },
        ],
      },
      {
        situation: "#7",
        answers: [
          {
            role: "Co-Worker",
            skill: "Constructive Criticism",
            description:
              "Ask for specific feedback and clarify the reasoning behind their assessment.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Understand the reasons behind their reaction and work to improve communication.",
          },
          {
            role: "Friend",
            skill: "Problem-Solving",
            description:
              "Discuss alternative ways to present your ideas or improve collaboration.",
          },
          {
            role: "Customer",
            skill: "Assertive Communication",
            description:
              "Defend your idea respectfully and explain its value in a way they understand.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Show confidence in your idea while being open to constructive input.",
          },
        ],
      },
      {
        situation: "#8",
        answers: [
          {
            role: "Co-Worker",
            skill: "Accountability",
            description:
              "Calmly provide factual explanations and evidence to clear up the misunderstanding.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Understand why your partner might think this and discuss the situation without blame.",
          },
          {
            role: "Friend",
            skill: "Assertive Communication",
            description:
              "Calmly but firmly assert your innocence and request they listen to your side.",
          },
          {
            role: "Customer",
            skill: "Problem-Solving",
            description:
              "Focus on resolving the misunderstanding and maintaining a professional relationship.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Stay composed and lead the discussion with clear facts to clarify the situation.",
          },
        ],
      },
      {
        situation: "#9",
        answers: [
          {
            role: "Co-Worker",
            skill: "Assertive Communication",
            description:
              "Respectfully request the chance to share your perspective and explain its importance.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Try to understand why they’re pressuring you, then calmly express your feelings and viewpoint.",
          },
          {
            role: "Friend",
            skill: "Constructive Criticism",
            description:
              "Give respectful feedback about the importance of mutual decision-making in friendships.",
          },
          {
            role: "Customer",
            skill: "Accountability",
            description:
              "Explain your constraints and how a better discussion could improve the decision process.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Take the opportunity to calmly propose an alternative solution or approach.",
          },
        ],
      },
      {
        situation: "#10",
        answers: [
          {
            role: "Co-Worker",
            skill: "Problem-Solving",
            description:
              "Stay professional and rephrase your request to encourage cooperation.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Address the tone calmly and explore why they might have reacted that way.",
          },
          {
            role: "Friend",
            skill: "Assertive Communication",
            description:
              "Explain how their reaction affects you and request mutual respect in the future.",
          },
          {
            role: "Customer",
            skill: "Common Sense",
            description:
              "Redirect the conversation toward practical solutions and mutual respect.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Guide the conversation back to constructive dialogue with authority and professionalism.",
          },
        ],
      },
      {
        situation: "#11",
        answers: [
          {
            role: "Co-Worker",
            skill: "Assertive Communication",
            description:
              "Firmly explain why you are not comfortable with the request and suggest alternatives.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Discuss why they think it’s necessary and share your perspective openly.",
          },
          {
            role: "Friend",
            skill: "Problem-Solving",
            description:
              "Propose a compromise that respects both your comfort and their intent.",
          },
          {
            role: "Customer",
            skill: "Accountability",
            description:
              "Acknowledge their intent while professionally asserting your boundaries.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Explain your reasoning calmly and confidently while proposing alternative actions.",
          },
        ],
      },
      {
        situation: "#12",
        answers: [
          {
            role: "Co-Worker",
            skill: "Common Sense",
            description:
              "Request clarification on expectations in the future to avoid similar issues.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Acknowledge their frustration and suggest working together to improve communication.",
          },
          {
            role: "Friend",
            skill: "Constructive Criticism",
            description:
              "Point out the lack of clarity and suggest more open communication moving forward.",
          },
          {
            role: "Customer",
            skill: "Problem-Solving",
            description:
              "Focus on resolving the issue and offer to adjust your work based on clearer guidelines.",
          },
          {
            role: "Manager",
            skill: "Accountability",
            description:
              "Take responsibility for the misunderstanding while discussing how to improve clarity.",
          },
        ],
      },
      {
        situation: "#13",
        answers: [
          {
            role: "Co-Worker",
            skill: "Common Sense",
            description:
              "Weigh the risks and make the most logical choice based on available information.",
          },
          {
            role: "Life Partner",
            skill: "Problem-Solving",
            description:
              "Discuss the decision together to gather input and reach a joint solution.",
          },
          {
            role: "Friend",
            skill: "Accountability",
            description:
              "Take responsibility for making the best choice you can, even if the outcome is uncertain.",
          },
          {
            role: "Customer",
            skill: "Assertive Communication",
            description:
              "Communicate the constraints and propose a realistic approach for decision-making.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Take initiative and make a confident decision while acknowledging the limitations.",
          },
        ],
      },
      {
        situation: "#14",
        answers: [
          {
            role: "Co-Worker",
            skill: "Accountability",
            description:
              "Take ownership of the task while seeking out any available resources or support.",
          },
          {
            role: "Life Partner",
            skill: "Team Spirit / Being a Good Team Player",
            description:
              "Express your feelings and ask for collaboration to share the burden.",
          },
          {
            role: "Friend",
            skill: "Assertive Communication",
            description:
              "Calmly explain why you need support and request their involvement.",
          },
          {
            role: "Customer",
            skill: "Common Sense",
            description:
              "Work with what you have and focus on practical ways to get the job done.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Show initiative by taking control of the task and addressing any challenges head-on.",
          },
        ],
      },
      {
        situation: "#15",
        answers: [
          {
            role: "Co-Worker",
            skill: "Assertive Communication",
            description:
              "Politely but firmly explain why your concerns are valid and deserve attention.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Acknowledge their perspective, but share why your difficulties matter to you.",
          },
          {
            role: "Friend",
            skill: "Accountability",
            description:
              "Express your feelings calmly and explain why your situation also deserves recognition.",
          },
          {
            role: "Customer",
            skill: "Problem-Solving",
            description:
              "Redirect the focus toward addressing your concerns without minimizing theirs.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Acknowledge others' priorities while ensuring your concerns are addressed as well.",
          },
        ],
      },
      {
        situation: "#16",
        answers: [
          {
            role: "Co-Worker",
            skill: "Leadership",
            description:
              "Reinforce the importance of the program and diplomatically encourage adherence.",
          },
          {
            role: "Life Partner",
            skill: "Team Spirit / Being a Good Team Player",
            description:
              "Ask for collaboration to refocus on the shared goal of the event.",
          },
          {
            role: "Friend",
            skill: "Problem-Solving",
            description:
              "Work together to adjust the program and regain control of the event.",
          },
          {
            role: "Customer",
            skill: "Assertive Communication",
            description:
              "Politely but firmly ensure that the event objectives are respected.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Take charge and redirect the participants while maintaining a positive atmosphere.",
          },
        ],
      },
      {
        situation: "#17",
        answers: [
          {
            role: "Co-Worker",
            skill: "Assertive Communication",
            description:
              "Politely assert your contribution and ask for recognition.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Discuss why they might have done this and express your feelings calmly.",
          },
          {
            role: "Friend",
            skill: "Accountability",
            description:
              "Hold them accountable for their actions in a constructive and calm manner.",
          },
          {
            role: "Customer",
            skill: "Leadership",
            description:
              "Redirect the credit diplomatically to ensure fairness and recognition.",
          },
          {
            role: "Manager",
            skill: "Problem-Solving",
            description:
              "Handle the situation professionally and clarify your contribution without escalating.",
          },
        ],
      },
      {
        situation: "#18",
        answers: [
          {
            role: "Co-Worker",
            skill: "Active Listening",
            description:
              "Follow up respectfully to understand if there was a reason for the silence.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Try to understand if something prevented them from responding and discuss it calmly.",
          },
          {
            role: "Friend",
            skill: "Constructive Criticism",
            description:
              "Gently address the lack of response and suggest better communication in the future.",
          },
          {
            role: "Customer",
            skill: "Problem-Solving",
            description:
              "Proactively follow up and offer alternative ways to move forward.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Set an example by maintaining professionalism and ensuring follow-up communication.",
          },
        ],
      },
      {
        situation: "#19",
        answers: [
          {
            role: "Co-Worker",
            skill: "Assertive Communication",
            description:
              "Request clear instructions to ensure proper execution of the task.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Discuss the change and ask for clarity while understanding their perspective.",
          },
          {
            role: "Friend",
            skill: "Problem-Solving",
            description:
              "Work together to clarify the task and ensure mutual understanding.",
          },
          {
            role: "Customer",
            skill: "Accountability",
            description:
              "Take responsibility for clarifying the scope and ensuring alignment.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Lead by requesting clear objectives and organizing the workflow effectively.",
          },
        ],
      },
      {
        situation: "#20",
        answers: [
          {
            role: "Co-Worker",
            skill: "Problem-Solving",
            description:
              "Address the decision calmly and propose adjustments if necessary.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Understand their reasoning and share how it impacts you to find common ground.",
          },
          {
            role: "Friend",
            skill: "Constructive Criticism",
            description:
              "Gently point out the importance of involving you in decisions that affect you.",
          },
          {
            role: "Customer",
            skill: "Assertive Communication",
            description:
              "Politely but firmly explain your concerns and seek mutual agreement.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Approach the decision professionally and suggest improvements if needed.",
          },
        ],
      },
      {
        situation: "#21",
        answers: [
          {
            role: "Co-Worker",
            skill: "Problem-Solving",
            description:
              "Focus on the facts and calmly address the situation with transparency.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Explore their feelings while sharing your side to resolve the conflict.",
          },
          {
            role: "Friend",
            skill: "Accountability",
            description:
              "Take responsibility for your part in the conflict and discuss the issue openly.",
          },
          {
            role: "Customer",
            skill: "Assertive Communication",
            description:
              "Explain your perspective professionally and seek a resolution.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Lead the conversation toward facts and solutions, avoiding emotional escalation.",
          },
        ],
      },
      {
        situation: "#22",
        answers: [
          {
            role: "Co-Worker",
            skill: "Assertive Communication",
            description:
              "Address the comparisons directly and emphasize your unique contributions.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Discuss the impact of the comparisons and encourage constructive support.",
          },
          {
            role: "Friend",
            skill: "Team Spirit / Being a Good Team Player",
            description:
              "Encourage collaboration instead of competition to build mutual respect.",
          },
          {
            role: "Customer",
            skill: "Accountability",
            description:
              "Focus on delivering your best and avoid engaging in unnecessary comparisons.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Demonstrate confidence in your abilities and use the comparisons as motivation.",
          },
        ],
      },
      {
        situation: "#23",
        answers: [
          {
            role: "Co-Worker",
            skill: "Accountability",
            description:
              "Stay professional and focus on the success of the solution, not the recognition.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Discuss the situation calmly and express your feelings about being overlooked.",
          },
          {
            role: "Friend",
            skill: "Assertive Communication",
            description:
              "Point out the situation respectfully and request fairness in the future.",
          },
          {
            role: "Customer",
            skill: "Problem-Solving",
            description:
              "Focus on the shared goal of resolving the issue, regardless of credit.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Acknowledge the solution’s merit and take the lead in giving credit where it is due.",
          },
        ],
      },
      {
        situation: "#24",
        answers: [
          {
            role: "Co-Worker",
            skill: "Assertive Communication",
            description:
              "Politely redirect the conversation to a less personal topic.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Discuss why this made you uncomfortable and set boundaries together.",
          },
          {
            role: "Friend",
            skill: "Constructive Criticism",
            description:
              "Explain why the question was inappropriate and suggest mutual respect in the future.",
          },
          {
            role: "Customer",
            skill: "Common Sense",
            description:
              "Respond neutrally or deflect the question professionally.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Model professional behavior by redirecting the discussion and maintaining decorum.",
          },
        ],
      },
      {
        situation: "#25",
        answers: [
          {
            role: "Co-Worker",
            skill: "Accountability",
            description:
              "Acknowledge your effort and respect their decision while leaving the door open for future dialogue.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Understand their perspective and allow time for the relationship to heal.",
          },
          {
            role: "Friend",
            skill: "Problem-Solving",
            description:
              "Evaluate what went wrong and decide if further efforts are worth pursuing.",
          },
          {
            role: "Customer",
            skill: "Assertive Communication",
            description:
              "Acknowledge their feelings but clarify your intent and professionalism.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Maintain professionalism and focus on fostering a positive working relationship moving forward.",
          },
        ],
      },
      {
        situation: "#26",
        answers: [
          {
            role: "Co-Worker",
            skill: "Accountability",
            description:
              "Calmly explain how you contributed to the solution and highlight its value.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Acknowledge their perspective and focus on a shared goal instead of personal credit.",
          },
          {
            role: "Friend",
            skill: "Team Spirit",
            description:
              "Celebrate the success while gently reminding of your contribution.",
          },
          {
            role: "Customer",
            skill: "Assertive Communication",
            description:
              "Politely clarify that the idea was yours without creating conflict.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Take pride in contributing to the success and focus on motivating the team.",
          },
        ],
      },
      {
        situation: "#27",
        answers: [
          {
            role: "Co-Worker",
            skill: "Being Reliable / Dependable",
            description:
              "Address the broken promise professionally and work to maintain trust.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Understand their reasons while explaining how it affected you.",
          },
          {
            role: "Friend",
            skill: "Accountability",
            description:
              "Clarify your expectations and discuss ways to improve communication in the future.",
          },
          {
            role: "Customer",
            skill: "Assertive Communication",
            description:
              "Firmly but politely remind them of the commitment and seek a solution.",
          },
          {
            role: "Manager",
            skill: "Problem-Solving",
            description:
              "Find alternatives to mitigate the situation and ensure success despite the setback.",
          },
        ],
      },
      {
        situation: "#28",
        answers: [
          {
            role: "Co-Worker",
            skill: "Assertive Communication",
            description:
              "Politely redirect the conversation or set a boundary while staying professional.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Calmly acknowledge the question and express your discomfort in a constructive way.",
          },
          {
            role: "Friend",
            skill: "Active Listening",
            description:
              "Understand their intentions and respond diplomatically.",
          },
          {
            role: "Customer",
            skill: "Common Sense",
            description:
              "Politely sidestep the question or respond with humor to defuse the situation.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Handle the situation calmly, showing confidence and setting an example for others.",
          },
        ],
      },
      {
        situation: "#29",
        answers: [
          {
            role: "Co-Worker",
            skill: "Constructive Criticism",
            description:
              "Model a positive way to give feedback and address the tone professionally.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Acknowledge their intent and express how the words impacted you.",
          },
          {
            role: "Friend",
            skill: "Active Listening",
            description:
              "Understand the feedback but also share your feelings about the way it was delivered.",
          },
          {
            role: "Customer",
            skill: "Assertive Communication",
            description:
              "Politely explain your perspective and seek to clarify expectations.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Respond professionally by focusing on the substance of the feedback rather than the tone.",
          },
        ],
      },
      {
        situation: "#30",
        answers: [
          {
            role: "Co-Worker",
            skill: "Problem-Solving",
            description:
              "Look for alternative approaches to mend the relationship or keep things professional.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Understand their reasons and give them space while keeping communication open.",
          },
          {
            role: "Friend",
            skill: "Team Spirit",
            description:
              "Acknowledge their feelings and focus on rebuilding the relationship over time.",
          },
          {
            role: "Customer",
            skill: "Assertive Communication",
            description:
              "Communicate your goodwill clearly and respect their decision.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Show emotional intelligence by staying professional and focusing on solutions for future collaboration.",
          },
        ],
      },
      {
        situation: "#31",
        answers: [
          {
            role: "Co-Worker",
            skill: "Problem-Solving",
            description:
              "Encourage collaboration by addressing their concerns while redistributing the tasks fairly.",
          },
          {
            role: "Life Partner",
            skill: "Team Spirit",
            description:
              "Focus on the shared goal and communicate to ensure equal participation.",
          },
          {
            role: "Friend",
            skill: "Accountability",
            description:
              "Take responsibility for your part, but also hold others accountable for their contributions.",
          },
          {
            role: "Customer",
            skill: "Assertive Communication",
            description:
              "Clearly express the need for cooperation and find ways to engage them constructively.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Lead by example, fostering a team spirit and encouraging full participation from all members.",
          },
        ],
      },
      {
        situation: "#32",
        answers: [
          {
            role: "Co-Worker",
            skill: "Being Reliable / Dependable",
            description:
              "Set clear boundaries while showing your willingness to contribute to the project's success.",
          },
          {
            role: "Life Partner",
            skill: "Assertive Communication",
            description:
              "Express your need for personal time and discuss a balanced approach to shared commitments.",
          },
          {
            role: "Friend",
            skill: "Common Sense",
            description:
              "Decide if this commitment is reasonable, and respectfully set limits if necessary.",
          },
          {
            role: "Customer",
            skill: "Accountability",
            description:
              "Clarify your availability upfront and explain the need for balanced expectations.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Model professionalism by setting realistic work-life balance expectations for the team.",
          },
        ],
      },
      {
        situation: "#33",
        answers: [
          {
            role: "Co-Worker",
            skill: "Accountability",
            description:
              "Explain your reasoning calmly and assertively, highlighting your previous contribution.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Express understanding, but share how it made you feel, focusing on positive resolution.",
          },
          {
            role: "Friend",
            skill: "Team Spirit",
            description:
              "Celebrate the success of the solution, but gently remind them of your prior input.",
          },
          {
            role: "Customer",
            skill: "Assertive Communication",
            description:
              "Assert your idea with confidence, demonstrating its value without causing conflict.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Support the team by acknowledging contributions while reinforcing the value of all ideas.",
          },
        ],
      },
      {
        situation: "#34",
        answers: [
          {
            role: "Co-Worker",
            skill: "Accountability",
            description:
              "Address the broken promise calmly and work toward a solution to regain trust.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Try to understand their reasons for not keeping the promise, but express your disappointment.",
          },
          {
            role: "Friend",
            skill: "Assertive Communication",
            description:
              "Clearly express how the unkept promise affected you and discuss expectations moving forward.",
          },
          {
            role: "Customer",
            skill: "Problem-Solving",
            description:
              "Look for solutions to overcome the consequences of the broken promise, and discuss future commitments.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Lead with integrity by holding others accountable and addressing broken promises professionally.",
          },
        ],
      },
      {
        situation: "#35",
        answers: [
          {
            role: "Co-Worker",
            skill: "Assertive Communication",
            description:
              "Politely deflect the question or set a boundary without escalating the situation.",
          },
          {
            role: "Life Partner",
            skill: "Empathy",
            description:
              "Understand the possible intention behind the question and respond with humor or tact.",
          },
          {
            role: "Friend",
            skill: "Common Sense",
            description:
              "Decide whether to answer or deflect, based on how comfortable you feel in the situation.",
          },
          {
            role: "Customer",
            skill: "Active Listening",
            description:
              "Listen attentively to the question and, if needed, politely redirect the conversation to a more appropriate topic.",
          },
          {
            role: "Manager",
            skill: "Leadership",
            description:
              "Handle the situation calmly, setting a clear example for how to deal with uncomfortable situations professionally.",
          },
        ],
      },
    ],
  };

  // Met à jour les questions en fonction du niveau sélectionné
  useEffect(() => {
    if (selectedLevel) {
      const level = parseInt(selectedLevel.split(" ")[1]);
      setSituations(levelSituations[level] || []);
      setSelectedSituation(null); // Réinitialise la sélection
    }
  }, [selectedLevel]);

  const givePoint = () => {
    if (selectedPlayerIds.length > 0) {
      const updatedPlayers = players.map((player) =>
        selectedPlayerIds.includes(player.id)
          ? { ...player, points: player.points + 1 }
          : player
      );

      setPlayers(updatedPlayers);

      const winnerPlayer = updatedPlayers.find((player) => player.points >= 20);
      if (winnerPlayer) {
        setWinner(winnerPlayer.name);
        setIsModalOpen(false);
        return;
      }

      setSelectedPlayerIds([]);
      setIsModalOpen(false);
      setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    }
  };

  const addPlayer = () => {
    if (playerName.trim() === "") {
      toast.error("Please enter the player's name.");
      return;
    }

    if (!selectedColor) {
      toast.error("Please choose a color for the player.");
      return;
    }

    setPlayers([
      ...players,
      { id: uuidv4(), name: playerName, color: selectedColor, points: 0 },
    ]);
    setPlayerName("");
    setSelectedColor("");
  };

  const removePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const skipTurn = () => {
    setSelectedPlayerIds([]);
    setIsModalOpen(false);
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const startGame = (level) => {
    if (players.length >= 2) {
      setSelectedLevel(level);
      localStorage.setItem("selectedLevel", level); // Enregistre le niveau dans localStorage
      const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
      setPlayers(shuffledPlayers);
      setGameStarted(true);
      setCurrentPlayerIndex(0);
      setIsLevelModalOpen(false);
    } else {
      toast.error("At least 2 players are required to start the game.");
    }
  };

  const restartGame = () => {
    setPlayers([]);
    setGameStarted(false);
    setWinner(null);
    setCurrentPlayerIndex(0);
    setSelectedLevel(null);
    localStorage.removeItem("selectedLevel"); // Supprime le niveau stocké
  };

  return (
    <div className="relative flex flex-col items-center justify-start h-screen bg-gray-100">
      {/* Icône "Information" */}
      {!gameStarted && (
        <Link
          to="/summary"
          className="absolute top-4 right-4 text-blue-500 bg-white shadow-md rounded-full hover:text-blue-700 transition duration-300"
          title="Game Summary"
        >
          <InformationCircleIcon className="h-8 w-8" />
        </Link>
      )}

      {/* Ajouter des joueurs (avant le début du jeu) */}
      {!gameStarted && (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm mt-16">
          <h1 className="text-xl font-bold mb-4">Add a player</h1>
          <input
            type="text"
            placeholder="Player's name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            disabled={players.length >= 6}
          />
          <label className="block text-gray-600 mb-2">Choose a color:</label>
          <div className="flex justify-between mb-4">
            {colors.map((color) => (
              <div
                key={color}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition duration-300 ${
                  players.some((player) => player.color === color)
                    ? "opacity-20 cursor-not-allowed"
                    : ""
                }`}
                style={{
                  border:
                    selectedColor === color
                      ? "2px solid black"
                      : "2px solid transparent",
                }}
              >
                <button
                  className={`w-8 h-8 rounded-full ${color}`}
                  onClick={() =>
                    !players.some((player) => player.color === color) &&
                    setSelectedColor(color)
                  }
                  disabled={players.some((player) => player.color === color)}
                ></button>
              </div>
            ))}
          </div>

          <button
            onClick={addPlayer}
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition"
            disabled={players.length >= 6}
          >
            Add player
          </button>
          <ToastContainer />
        </div>
      )}

      {/* Liste des joueurs et bouton "Let's Play" */}
      {!gameStarted && (
        <div className="mt-12 w-full px-8 max-w-md">
          <AnimatePresence>
            {players.map((player) => (
              <motion.div
                key={player.id}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between bg-gray-50 p-4 mb-2 rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full ${player.color}`}></div>
                  <span className="text-gray-800">{player.name}</span>
                </div>
                <button
                  onClick={() => removePlayer(player.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {players.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 w-full flex justify-center p-4 shadow-md"
            >
              <button
                onClick={openLevelModal}
                className="bg-green-500 text-white py-2 px-6 w-full max-w-md rounded-md hover:bg-green-600 transition"
              >
                Let's play!
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* Section du jeu */}
      {gameStarted && (
        <motion.div
          className="flex flex-col items-center px-8 justify-center h-full w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
            <h1 className="text-2xl font-bold mb-6">
              {players[currentPlayerIndex].name}'s Turn
            </h1>

            <div className="mt-12 mb-20">
              {players.map((player) => (
                <div key={player.id} className="mb-4">
                  <p className="text-lg font-semibold mb-4">{player.name}</p>
                  <div
                    className="grid grid-cols-10"
                    style={{
                      gap: "0.5rem",
                    }}
                  >
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-full ${
                          i < player.points
                            ? player.color
                            : `${player.color} opacity-20`
                        }`}
                        style={{
                          height: "clamp(0.75rem, 1vw, 1.25rem)",
                          width: "clamp(0.75rem, 1vw, 1.25rem)",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Choose Player to Give Point
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Modale du gagnant */}
      {winner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center px-8 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-6 px-12 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              🎉 {winner} wins! 🎉
            </h2>
            <button
              onClick={restartGame}
              className="bg-blue-500 text-white py-2 w-full rounded-md hover:bg-blue-600 transition"
            >
              Restart Game
            </button>
          </motion.div>
        </motion.div>
      )}

      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center px-8 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-6 px-12 w-full max-w-xl modal-content"
          >
            {/* Contenu de la modal */}
            <div className="relative w-full mb-8">
              <select
                value={selectedSituation?.situation || ""}
                onChange={(e) => {
                  const situationText = e.target.value;
                  const selected = situations.find(
                    (q) => q.situation === situationText
                  );
                  setSelectedSituation(selected || null);
                }}
                className="w-full py-2 px-2 border rounded-md appearance-none"
              >
                <option value="" disabled>
                  Select the situation drawn
                </option>
                {situations.map((q) => (
                  <option key={q.situation} value={q.situation}>
                    {q.situation}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute top-1/2 right-2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>

            {selectedSituation && (
              <div className="mb-12">
                <h3 className="text-lg font-semibold">Answers:</h3>
                <ul className="list-disc list-inside">
                  {selectedSituation.answers.map((answer, index) =>
                    typeof answer === "string" ? (
                      <li key={index}>{answer}</li>
                    ) : (
                      <li key={index} className="text-xs mb-4">
                        <p>
                          <strong>Role:</strong> {answer.role}
                        </p>
                        <p>
                          <strong>Skill:</strong> {answer.skill}
                        </p>
                        <p>
                          <strong>Description:</strong> {answer.description}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            <div className="space-y-4">
              {players
                .filter(
                  (player) => player.id !== players[currentPlayerIndex].id
                )
                .map((player) => (
                  <button
                    key={player.id}
                    onClick={() => togglePlayerSelection(player.id)}
                    className={`w-full py-2 px-2 rounded-md border-2 transition duration-300 ${
                      selectedPlayerIds.includes(player.id)
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-100"
                    } flex items-center justify-between`}
                  >
                    <span>{player.name}</span>
                    <div
                      className={`w-6 h-6 rounded-full ${player.color}`}
                    ></div>
                  </button>
                ))}
            </div>
            <div className="flex gap-4 mt-12">
              <button
                onClick={givePoint}
                className="flex-1 bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600 transition duration-300"
                disabled={selectedPlayerIds.length === 0}
              >
                Confirm
              </button>
              <button
                onClick={skipTurn}
                className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-400 transition duration-300"
              >
                Skip
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {isLevelModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center px-8 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-6 px-12 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Select a Level
            </h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => startGame("Level 1")}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              >
                Level 1
              </button>
              <button
                onClick={() => startGame("Level 2")}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
              >
                Level 2
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
