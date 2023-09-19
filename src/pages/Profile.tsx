import { useEffect, useRef } from "react";
import rocket from "../assets/img/rocket.png";
import { useScrollWindow } from "../hooks/useScrollWindow";
import charid from "../assets/img/charid.png";
import glass from "../assets/img/glass.svg";
const Profile = () => {
  const scrollHeight = useScrollWindow();
  const web3Ref = useRef<HTMLDivElement>(null);
  const web2Ref = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (scrollHeight >= 1280) {
      web3Ref.current?.classList.add("scale-100");
      web2Ref.current?.classList.add("scale-100");
      glassRef.current?.classList.add("left-[40px]")
      glassRef.current?.classList.add("top-[30px]")
      glassRef.current?.classList.add("scale-90")
      glassRef.current?.classList.add("rotate-[360deg]")
    } else {
      web3Ref.current?.classList.remove("scale-100");
      web2Ref.current?.classList.remove("scale-100");
      glassRef.current?.classList.remove("left-[40px]")
      glassRef.current?.classList.remove("top-[30px]")
      glassRef.current?.classList.remove("scale-90")
      glassRef.current?.classList.remove("rotate-[360deg]")
    }
  }, [scrollHeight]);
  return (
    <div className="flex">
      <div className="basis-[50%] bg-[#c4e2ff] h-screen flex flex-col">
        <div className="flex items-center p-4 relative">
          <img src={charid} alt="charid" className="w-[80px] rounded-full" />
          <p className="NormalFont text-[32px] font-bold pl-4">Chaird</p>
          <img
            ref={glassRef}
            src={glass}
            alt="glass"
            className="absolute w-[32px] top-[40px] left-[210px] transition-all duration-1000 ease-linear rota"
          />
        </div>
      </div>
      <div className="basis-[50%] bg-[#8bc7ff] h-screen flex flex-col justify-center items-center relative ">
        <div
          ref={web3Ref}
          className="PixelFont text-[40px] border-black border-[3px] p-2 rounded-xl bg-[#dfff67] absolute top-[100px] left-[50%] -translate-x-[50%] transition-all ease-linear duration-300 scale-0"
        >
          WEB3
        </div>
        <img
          src={rocket}
          alt="rocket"
          className="md:w-[430px] rounded-[12%] border-black border-[4px] "
        />
        <div
          ref={web2Ref}
          className="PixelFont text-[40px] border-black border-[3px] p-2 rounded-xl bg-[#C0A8E6] absolute bottom-[100px] left-[50%] -translate-x-[50%] transition-all ease-linear duration-300 scale-0"
        >
          WEB2
        </div>
      </div>
    </div>
  );
};

export default Profile;
