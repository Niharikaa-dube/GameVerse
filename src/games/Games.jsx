
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft as Left, ArrowRight } from "lucide-react";
import "./Games.css";

function GameFrame({ game, children, score, reset, help }) {
  return (
    <div className="play-page">
      <button className="back-btn" onClick={game.onExit}><ArrowLeft size={18}/> BACK TO GAMES</button>
      <div className="play-heading">
        <div className="eyebrow">GAMEVERSE ARCADE</div>
        <h1>{game.name}</h1>
        <p>{help}</p>
      </div>
      <div className="play-score"><Trophy size={18}/> SCORE: <strong>{score}</strong></div>
      <div className="game-stage">{children}</div>
      <button className="secondary-btn reset-btn" onClick={reset}><RotateCcw size={16}/> RESTART GAME</button>
    </div>
  );
}

function Snake({ finish }) {
  const [snake,setSnake] = useState([[7,7],[6,7],[5,7]]);
  const [food,setFood] = useState([10,7]);
  const [dir,setDir] = useState([1,0]);
  const [score,setScore] = useState(0);
  const [dead,setDead] = useState(false);
  const direction = useRef([1,0]);
  const size = 15;

  const reset = () => {
    setSnake([[7,7],[6,7],[5,7]]);
    setFood([10,7]); setDir([1,0]); direction.current=[1,0];
    setScore(0); setDead(false);
  };

  useEffect(() => {
    const key = e => {
      const map = {ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0]};
      const d=map[e.key];
      if(d && d[0] !== -direction.current[0] && d[1] !== -direction.current[1]) {
        direction.current=d; setDir(d);
      }
    };
    window.addEventListener("keydown",key);
    return () => window.removeEventListener("keydown",key);
  },[]);

  useEffect(() => {
    if(dead) return;
    const timer=setInterval(()=>{
      setSnake(old=>{
        const d=direction.current;
        const head=[old[0][0]+d[0],old[0][1]+d[1]];
        const eating=head[0]===food[0] && head[1]===food[1];
        if(head[0]<0||head[0]>=size||head[1]<0||head[1]>=size||old.slice(0,eating?old.length:old.length-1).some(p=>p[0]===head[0]&&p[1]===head[1])){
          setDead(true); return old;
        }
        const next=[head,...old.slice(0,eating?old.length:old.length-1)];
        if(eating){setScore(s=>s+10);setFood([Math.floor(Math.random()*size),Math.floor(Math.random()*size)]);}
        return next;
      });
    },150);
    return ()=>clearInterval(timer);
  },[dead,food]);

  useEffect(()=>{if(dead) finish(score);},[dead]);

  return <GameFrame game={{name:"Neon Snake",onExit:()=>finish(null)}} score={score} reset={reset} help="Use arrow keys or WASD to collect food. Don't hit the walls or yourself.">
    <div className="snake-board">
      {Array.from({length:size*size},(_,i)=>{
        const x=i%size,y=Math.floor(i/size);
        const head=snake[0][0]===x&&snake[0][1]===y;
        const body=snake.some((p,j)=>j>0&&p[0]===x&&p[1]===y);
        const isFood=food[0]===x&&food[1]===y;
        return <div key={i} className={`snake-cell ${head?"snake-head":body?"snake-body":isFood?"snake-food":""}`}/>;
      })}
    </div>
    {dead&&<div className="game-overlay"><h2>GAME OVER!</h2><p>Final score: {score}</p><button className="primary-btn" onClick={reset}>PLAY AGAIN</button></div>}
    <div className="mobile-controls">{[[0,-1,"↑"],[-1,0,"←"],[0,1,"↓"],[1,0,"→"]].map(([x,y,label])=><button key={label} onClick={()=>{if(x!==-direction.current[0]&&y!==-direction.current[1])direction.current=[x,y]}}>{label}</button>)}</div>
  </GameFrame>;
}

function TicTacToe({finish}) {
  const [board,setBoard]=useState(Array(9).fill(""));
  const [turn,setTurn]=useState("X");
  const [winner,setWinner]=useState("");
  const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  const reset=()=>{setBoard(Array(9).fill(""));setTurn("X");setWinner("");};
  const play=i=>{
    if(board[i]||winner)return;
    const next=[...board];next[i]=turn;setBoard(next);
    const won=lines.some(line=>line.every(n=>next[n]===turn));
    if(won){setWinner(turn);if(turn==="X")finish(100);}
    else if(next.every(Boolean))setWinner("Draw");
    else setTurn(turn==="X"?"O":"X");
  };
  return <GameFrame game={{name:"Tic Tac Toe",onExit:()=>finish(null)}} score={winner==="X"?100:0} reset={reset} help="Take turns placing X and O. Get three in a row to win.">
    <div className="tic-game"><h2>{winner?winner==="Draw"?"IT'S A DRAW!":`${winner} WINS!`:`PLAYER ${turn}'S TURN`}</h2><div className="tic-board">{board.map((v,i)=><button key={i} className={v==="X"?"tic-x":"tic-o"} onClick={()=>play(i)}>{v}</button>)}</div>{winner&&<button className="primary-btn" onClick={reset}>PLAY AGAIN</button>}</div>
  </GameFrame>;
}

function Memory({finish}) {
  const symbols=["🚀","👾","🎮","💎","🔥","⭐","🛸","⚡"];
  const shuffle=()=>[...symbols,...symbols].sort(()=>Math.random()-.5).map((v,i)=>({id:i,v}));
  const [cards,setCards]=useState(shuffle);
  const [open,setOpen]=useState([]);
  const [matched,setMatched]=useState([]);
  const [moves,setMoves]=useState(0);
  const [locked,setLocked]=useState(false);
  const reset=()=>{setCards(shuffle());setOpen([]);setMatched([]);setMoves(0);setLocked(false);};
  const pick=i=>{
    if(locked||open.includes(i)||matched.includes(i))return;
    if(open.length===0){setOpen([i]);return;}
    setOpen([open[0],i]);setMoves(m=>m+1);setLocked(true);
    if(cards[open[0]].v===cards[i].v){
      setMatched(old=>{const next=[...old,open[0],i];if(next.length===16)finish(Math.max(10,200-moves*5));return next;});
      setOpen([]);setLocked(false);
    } else {
      setTimeout(()=>{setOpen([]);setLocked(false);},750);
    }
  };
  return <GameFrame game={{name:"Memory Match",onExit:()=>finish(null)}} score={matched.length*10} reset={reset} help={`Find all matching pairs. Moves: ${moves}`}>
    <div className="memory-board">{cards.map((c,i)=><button key={c.id} className={`memory-card ${open.includes(i)||matched.includes(i)?"flipped":""}`} onClick={()=>pick(i)}>{open.includes(i)||matched.includes(i)?c.v:"?"}</button>)}</div>
    {matched.length===16&&<h2 className="win-message">YOU WON! 🎉</h2>}
  </GameFrame>;
}

function Blocks({finish}) {
  const make=()=>Array.from({length:4},()=>Array(4).fill(0));
  const [grid,setGrid]=useState(()=>{let g=make();g[0][0]=2;g[2][2]=2;return g;});
  const [score,setScore]=useState(0);
  const reset=()=>{let g=make();g[0][0]=2;g[2][2]=2;setGrid(g);setScore(0);};
  const move=(direction)=>{
    let g=grid.map(r=>[...r]), gained=0;
    for(let n=0;n<4;n++){
      let vals=direction==="left"||direction==="right"?g[n]:g.map(r=>r[n]);
      if(direction==="right"||direction==="down")vals.reverse();
      vals=vals.filter(Boolean);
      for(let i=0;i<vals.length-1;i++)if(vals[i]===vals[i+1]){vals[i]*=2;gained+=vals[i];vals.splice(i+1,1);}
      while(vals.length<4)vals.push(0);
      if(direction==="right"||direction==="down")vals.reverse();
      if(direction==="left"||direction==="right")g[n]=vals;
      else vals.forEach((v,i)=>g[i][n]=v);
    }
    if(JSON.stringify(g)===JSON.stringify(grid))return;
    let empty=[];g.forEach((r,y)=>r.forEach((v,x)=>{if(!v)empty.push([x,y]);}));
    if(empty.length){const [x,y]=empty[Math.floor(Math.random()*empty.length)];g[y][x]=Math.random()<.1?4:2;}
    setGrid(g);setScore(s=>s+gained);
    if(g.some(r=>r.includes(2048)))finish(score+gained+1000);
  };
  useEffect(()=>{
    const key=e=>{const m={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down"};if(m[e.key]){e.preventDefault();move(m[e.key]);}};
    window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key);
  });
  return <GameFrame game={{name:"Block Puzzle",onExit:()=>finish(null)}} score={score} reset={reset} help="Use arrow keys to merge matching tiles. Reach 2048!">
    <div className="blocks-board">{grid.flat().map((v,i)=><div key={i} className="block-tile" data-value={v}>{v||""}</div>)}</div>
    <div className="mobile-controls">{["up","left","down","right"].map(d=><button key={d} onClick={()=>move(d)}>{d==="up"?"↑":d==="down"?"↓":d==="left"?"←":"→"}</button>)}</div>
  </GameFrame>;
}

function Space({finish}) {
  const [score,setScore]=useState(0);
  const [time,setTime]=useState(30);
  const [target,setTarget]=useState({x:45,y:45});
  const [started,setStarted]=useState(false);
  useEffect(()=>{
    if(!started||time<=0)return;
    const t=setInterval(()=>setTime(v=>v-1),1000);
    return()=>clearInterval(t);
  },[started,time]);
  useEffect(()=>{if(time===0)finish(score);},[time]);
  const hit=()=>{if(time>0){setScore(s=>s+10);setTarget({x:8+Math.random()*78,y:8+Math.random()*78});}};
  return <GameFrame game={{name:"Space Shooter",onExit:()=>finish(null)}} score={score} reset={()=>{setScore(0);setTime(30);setStarted(false);setTarget({x:45,y:45});}} help="Click the alien targets before the timer runs out.">
    <div className="space-arena">
      <div className="space-time">TIME: {time}s</div>
      {!started&&<div className="game-overlay"><h2>READY, PILOT?</h2><button className="primary-btn" onClick={()=>setStarted(true)}>START MISSION</button></div>}
      {started&&time>0&&<button className="space-target" style={{left:target.x+"%",top:target.y+"%"}} onClick={hit}>👾</button>}
      {time===0&&<div className="game-overlay"><h2>MISSION COMPLETE!</h2><p>Score: {score}</p><button className="primary-btn" onClick={()=>{setScore(0);setTime(30);setStarted(false);}}>PLAY AGAIN</button></div>}
    </div>
  </GameFrame>;
}

function Breaker({finish}) {
  const [ball,setBall]=useState({x:50,y:65,dx:1.1,dy:-1});
  const [paddle,setPaddle]=useState(43);
  const [bricks,setBricks]=useState(()=>Array.from({length:4},(_,y)=>Array.from({length:7},(_,x)=>({x,y,alive:true}))).flat());
  const [score,setScore]=useState(0);
  const [lost,setLost]=useState(false);
  const reset=()=>{setBall({x:50,y:65,dx:1.1,dy:-1});setPaddle(43);setBricks(Array.from({length:4},(_,y)=>Array.from({length:7},(_,x)=>({x,y,alive:true}))).flat());setScore(0);setLost(false);};
  useEffect(()=>{
    const key=e=>{if(e.key==="ArrowLeft")setPaddle(p=>Math.max(0,p-5));if(e.key==="ArrowRight")setPaddle(p=>Math.min(82,p+5));};
    window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key);
  },[]);
  useEffect(()=>{
    if(lost)return;
    const t=setInterval(()=>{
      setBall(b=>{
        let x=b.x+b.dx,y=b.y+b.dy,dx=b.dx,dy=b.dy;
        if(x<2||x>98)dx=-dx;
        if(y<2)dy=-dy;
        if(y>88&&x>paddle&&x<paddle+18){dy=-Math.abs(dy);dx+=(x-(paddle+9))*.04;}
        if(y>100){setLost(true);return b;}
        let hit=bricks.find(br=>br.alive&&Math.abs(x-(8+br.x*14))<6&&Math.abs(y-(12+br.y*11))<5);
        if(hit){setBricks(old=>old.map(br=>br===hit?{...br,alive:false}:br));setScore(s=>s+10);dy=-dy;}
        return{x,y,dx,dy};
      });
    },25);
    return()=>clearInterval(t);
  },[lost,paddle,bricks]);
  useEffect(()=>{if(lost)finish(score);},[lost]);
  return <GameFrame game={{name:"Brick Breaker",onExit:()=>finish(null)}} score={score} reset={reset} help="Move the paddle with arrow keys. Keep the ball alive and break the bricks.">
    <div className="breaker-arena">
      {bricks.filter(b=>b.alive).map(b=><div key={b.x+"-"+b.y} className="brick" style={{left:(2+b.x*14)+"%",top:(7+b.y*11)+"%"}}/>)}
      <div className="breaker-ball" style={{left:ball.x+"%",top:ball.y+"%"}}/>
      <div className="breaker-paddle" style={{left:paddle+"%"}}/>
      {lost&&<div className="game-overlay"><h2>GAME OVER</h2><p>Score: {score}</p><button className="primary-btn" onClick={reset}>PLAY AGAIN</button></div>}
    </div>
    <div className="mobile-controls"><button onClick={()=>setPaddle(p=>Math.max(0,p-8))}>←</button><button onClick={()=>setPaddle(p=>Math.min(82,p+8))}>→</button></div>
  </GameFrame>;
}

export default function Games({game,onExit,onSaveScore}) {
  const finished=useRef(false);
  const handleFinish=score=>{
    if(score===null){onExit();return;}
    if(!finished.current){finished.current=true;onSaveScore(game.name,score);}
  };
  useEffect(()=>{finished.current=false;},[game.id]);
  const props={finish:handleFinish};
  switch(game.id){
    case "snake":return <Snake {...props}/>;
    case "blocks":return <Blocks {...props}/>;
    case "tic":return <TicTacToe {...props}/>;
    case "memory":return <Memory {...props}/>;
    case "space":return <Space {...props}/>;
    case "breaker":return <Breaker {...props}/>;
    default:return null;
  }
}
