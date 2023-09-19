import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { TypeAnimation } from "react-type-animation";
import contact from "../assets/img/contact.svg";
import weixin from "../assets/img/weixin.svg";
import weChat from "../assets/img/weChat.png";
import logo from "../assets/img/logo.png";
import MyButton from "../components/MyButton";

const Hero = () => {
  const node = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const [weChatShow, setWeChatShow] = useState(false);
  const handleAnimation = () => {
    node.current?.classList.add("-translate-x-1/2");
    setTimeout(() => {
      right.current?.classList.remove("translate-y-full");
      node.current?.classList.add("-translate-y-full");
    }, 1000);
    setTimeout(() => {
      let Engine = Matter.Engine,
        Render = Matter.Render,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies;
      // create engine
      var engine = Engine.create(),
        world = engine.world;

      // create renderer
      var render = Render.create({
        element: boxRef.current,
        engine: engine,
        canvas: canvasRef.current,
        options: {
          width: window.innerWidth / 2,
          height: window.innerHeight,
          background: "transparent",
          wireframes: false,
          showAngleIndicator: false,
        },
      });

      for (let i = 0; i < 9; i++) {
        const circle = Matter.Bodies.circle(i * 80, 80, 80, {
          friction: 0.3,
          frictionAir: 0.02,
          restitution: 0.8,
          render: {
            sprite: {
              // 使用精灵
              texture: `./matterjs/matterjs${i}.png`, // 图片纹理位置
            },
          },
        });
        Composite.add(world, circle);
      }

      Composite.add(world, [
        // walls
        // Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(
          window.innerWidth / 4,
          window.innerHeight,
          window.innerWidth / 2,
          2,
          {
            isStatic: true,
            render: {
              fillStyle: "#26263D",
            },
          }
        ),
        Bodies.rectangle(
          window.innerWidth / 2,
          window.innerHeight / 2,
          1,
          6400,
          {
            isStatic: true,
            render: {
              fillStyle: "#26263D",
            },
          }
        ),
        // 左偏移  中心向下    宽度     长度
        Bodies.rectangle(0, window.innerHeight / 2, 1, 6400, {
          isStatic: true,
          render: {
            fillStyle: "#26263D",
          },
        }),
      ]);

      let mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.1,
            render: {
              visible: false,
            },
          },
        });

      Composite.add(world, mouseConstraint);
      // allow scroll through the canvas
      mouseConstraint.mouse.element.removeEventListener(
        "mousewheel",
        mouseConstraint.mouse.mousewheel
      );
      mouseConstraint.mouse.element.removeEventListener(
        "DOMMouseScroll",
        mouseConstraint.mouse.mousewheel
      );
      Matter.Runner.run(engine);
      Render.run(render);
    }, 1000);
  };

  useEffect(() => {
    if (document.readyState === "complete") {
      handleAnimation();
    } else {
      window.addEventListener("load", handleAnimation);
      return () => {
        window.removeEventListener("load", handleAnimation);
      };
    }
  }, []);

  return (
    <>
      <div className="w-full h-screen flex relative overflow-hidden">
        {/* mask */}
        <div
          ref={node}
          className="absolute left-0 top-0 w-full h-full bg-[#dfff67] z-200  duration-1000"
        ></div>
        {/* right */}
        <div
          ref={right}
          className="relative basis-[50%]  bg-[#dfff67] flex-col justify-center translate-y-full duration-1000 pt-[10px] px-[40px] pb-[120px]"
        >
          <img src={logo} alt="logo" className="w-[200px]" />
          <div className="text-[3vw] font-bold mt-[50px] PixelFont mb-[80px]">
            <div>Welcome! </div>
            <div className="text-[#ff6d01] bg-[#38d996]">
              <TypeAnimation
                sequence={[
                  "I am Charid", // Types 'One'
                  1000, // Waits 1s
                  "a Dapp developer", // Deletes 'One' and types 'Two'
                  2000, // Waits 2s
                  () => {
                    // console.log("Sequence completed");
                  },
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ fontSize: "0.8em", display: "inline-block" }}
              />
            </div>
            <div className="pt-2">Pursue</div>
            <div className="pt-2">Perfect UX</div>
          </div>
          <div className="flex  gap-5">
            <MyButton />
            <MyButton />
            <MyButton />
            <MyButton />
          </div>

          <div className="font-bold">
            <div className="flex mt-[50px] ">
              <img src={contact} alt="contact" className="w-[30px]" />
              <span className="text-[32px] NormalFont pl-2">Contact me:</span>
            </div>
            <div className="flex relative">
              {weChatShow && (
                <div className="z-10 absolute w-[200px] h-[220px]  p-4 bg-white top-[-220px] left-0 border-[3px] border-black rounded-xl">
                  <img src={weChat} alt="weChat" className="" />
                  <p className="NormalFont text-[16px] text-center">WeChat</p>
                </div>
              )}

              <div className="flex">
                <img src={weixin} alt="contact" className="w-[30px]" />
                <span
                  className="text-[32px] NormalFont pl-2 cursor-pointer underline decoration-4"
                  onMouseEnter={() => {
                    setWeChatShow(true);
                  }}
                  onMouseLeave={() => {
                    setWeChatShow(false);
                  }}
                >
                  WeChat
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* left */}
        <div className="basis-[50%] bg-black">
          <div className="bg-transparent w-full" ref={boxRef}>
            <div className="absolute text-[#dfff67]  px-[25%] pt-4 w-full cursor-pointer NormalFont text-[32px] font-bold">
              Skills House
            </div>
            <canvas className="bg-transparent" ref={canvasRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
