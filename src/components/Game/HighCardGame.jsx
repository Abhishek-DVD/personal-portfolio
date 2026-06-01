import { useMemo, useState } from "react";
import { FaCrown, FaRotateRight } from "react-icons/fa6";
import MagneticButton from "../UI/MagneticButton";

const suits = [
  { symbol: "\u2660", color: "text-zinc-900" },
  { symbol: "\u2665", color: "text-rose-600" },
  { symbol: "\u2666", color: "text-rose-600" },
  { symbol: "\u2663", color: "text-zinc-900" },
];

const ranks = [
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "10", value: 10 },
  { label: "J", value: 11 },
  { label: "Q", value: 12 },
  { label: "K", value: 13 },
  { label: "A", value: 14 },
];

const buildDeck = () =>
  suits.flatMap((suit) =>
    ranks.map((rank) => ({
      id: `${rank.label}${suit.symbol}`,
      label: rank.label,
      value: rank.value,
      suit: suit.symbol,
      color: suit.color,
    }))
  );

const drawRandomCard = (deck) => {
  const index = Math.floor(Math.random() * deck.length);
  return { card: deck[index], nextDeck: deck.filter((_, cardIndex) => cardIndex !== index) };
};

const PlayingCard = ({ card, title, isWinner }) => (
  <div className="flex flex-col items-center gap-3">
    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">{title}</p>
    <div
      className={`relative h-56 w-40 rounded-lg bg-slate-100 p-4 text-zinc-950 shadow-2xl transition-transform duration-300 ${
        isWinner ? "translate-y-[-6px] shadow-cyan-500/30 ring-4 ring-cyan-300/40" : "shadow-black/40"
      }`}
    >
      {card ? (
        <>
          <div className={`text-3xl font-black ${card.color}`}>
            <p>{card.label}</p>
            <p>{card.suit}</p>
          </div>
          <div className={`absolute inset-0 flex items-center justify-center text-6xl ${card.color}`}>
            {card.suit}
          </div>
          <div className={`absolute bottom-4 right-4 rotate-180 text-3xl font-black ${card.color}`}>
            <p>{card.label}</p>
            <p>{card.suit}</p>
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center rounded-md bg-[#070b16] text-center text-sm font-bold text-cyan-100">
          Draw
          <br />
          Card
        </div>
      )}
    </div>
  </div>
);

const HighCardGame = () => {
  const initialDeck = useMemo(() => buildDeck(), []);
  const [deck, setDeck] = useState(initialDeck);
  const [playerCard, setPlayerCard] = useState(null);
  const [computerCard, setComputerCard] = useState(null);
  const [score, setScore] = useState({ player: 0, computer: 0, ties: 0 });
  const [message, setMessage] = useState("One draw. Higher card wins.");

  const drawCards = () => {
    const currentDeck = deck.length < 2 ? initialDeck : deck;
    const playerDraw = drawRandomCard(currentDeck);
    const computerDraw = drawRandomCard(playerDraw.nextDeck);

    setPlayerCard(playerDraw.card);
    setComputerCard(computerDraw.card);
    setDeck(computerDraw.nextDeck);

    if (playerDraw.card.value > computerDraw.card.value) {
      setScore((current) => ({ ...current, player: current.player + 1 }));
      setMessage("You win this draw.");
      return;
    }

    if (playerDraw.card.value < computerDraw.card.value) {
      setScore((current) => ({ ...current, computer: current.computer + 1 }));
      setMessage("Computer wins this draw.");
      return;
    }

    setScore((current) => ({ ...current, ties: current.ties + 1 }));
    setMessage("Tie draw. Same card value.");
  };

  const resetGame = () => {
    setDeck(initialDeck);
    setPlayerCard(null);
    setComputerCard(null);
    setScore({ player: 0, computer: 0, ties: 0 });
    setMessage("One draw. Higher card wins.");
  };

  const playerWins = playerCard && computerCard && playerCard.value > computerCard.value;
  const computerWins = playerCard && computerCard && computerCard.value > playerCard.value;

  return (
    <div className="text-white">
      <div className="rounded-lg border border-white/10 bg-zinc-950/95 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur md:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Mini Game</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">High Card Duel</h2>
            <p className="mt-3 max-w-2xl text-sm text-gray-300 md:text-base">
              A 52-card deck game: you draw once, the computer draws once, and the higher card wins.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-cyan-300/10 px-4 py-2 text-cyan-100 ring-1 ring-cyan-200/15">You: {score.player}</span>
            <span className="rounded-full bg-violet-300/10 px-4 py-2 text-violet-100 ring-1 ring-violet-200/15">Computer: {score.computer}</span>
            <span className="rounded-full bg-white/10 px-4 py-2">Ties: {score.ties}</span>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <PlayingCard card={playerCard} title="Player" isWinner={playerWins} />
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-200/30 bg-cyan-300/10 text-cyan-100 shadow-lg shadow-cyan-950/40">
              <FaCrown size={28} />
            </div>
            <p className="max-w-48 text-center text-sm font-semibold text-gray-200">{message}</p>
            <p className="text-xs text-gray-500">{deck.length} cards left</p>
            <div className="flex flex-wrap justify-center gap-3">
              <MagneticButton onClick={drawCards}>Draw Cards</MagneticButton>
              <MagneticButton onClick={resetGame} className="bg-white/10 text-sm ring-1 ring-white/15 md:text-base">
                <FaRotateRight size={16} />
                Reset
              </MagneticButton>
            </div>
          </div>
          <PlayingCard card={computerCard} title="Computer" isWinner={computerWins} />
        </div>
      </div>
    </div>
  );
};

export default HighCardGame;
