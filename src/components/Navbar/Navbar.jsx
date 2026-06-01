import { RiCloseLine, RiMenu2Line } from "@remixicon/react";
import { useState } from "react";

const Navbar = ({ onOpenGame }) => {
    //purpose of these state variables is for managing our display in small devices
    //we have showMenu as true by default because when we go to small devices we will have a menu hamburger menu
    //and menu is by default false becaue when user will first time open the screen he will only see that hamburger icon
    //on clicking it we toggle openMenu and  menu as true which will show all the items as block
    //when menu is false all items are hidden
    const [menu,openMenu] = useState(false);
    const [showMenu,setShowMenu] = useState(true);
  return (
    <nav className="relative z-30 flex flex-wrap justify-between md:items-center text-white px-10 pt-6 md:px-20">
        {/* tracking wide will increase the space between text */}
        <span className="text-xl font-bold tracking-wide">Portfolio</span>
            <ul className={`${menu?"block":"hidden"} mx-24 py-2 mt-4 font-semibold md:mt-5 bg-black px-2 rounded-xl bg-opacity-70 md:border-none text-center 
            md:bg-transparent md:static md:mx-0 md:flex gap-6`}>
                <a href="#About"><li className="text-md transition-all duration-300 p-1 md:p-0 hover:text-cyan-300">About</li></a>
                <a href="#Experience"><li className="text-md transition-all duration-300 p-1 md:p-0 hover:text-cyan-300">Experience</li></a>
                <a href="#Projects"><li className="text-md transition-all duration-300 p-1 md:p-0 hover:text-cyan-300">Projects</li></a>
                <a href="#Contact"><li className="text-md transition-all duration-300 p-1 md:p-0 hover:text-cyan-300">Contact</li></a>
                <li className="p-1 md:p-0">
                    <button
                        type="button"
                        onClick={onOpenGame}
                        className="rounded-full border border-cyan-200/20 bg-cyan-300/10 px-3 py-1 text-sm transition-all duration-300 hover:bg-cyan-300/20 hover:text-cyan-100"
                    >
                        Game
                    </button>
                </li>
            </ul>
            {showMenu ? (<RiMenu2Line size={30} className="md:hidden absolute right-10 top-6 transition-all duration-300" onClick={()=>{
                openMenu(!menu);
                setShowMenu(!showMenu);
            }}/>):<RiCloseLine size={30} className="md:hidden absolute right-10 top-6 transition-all duration-300" onClick={()=>{
                openMenu(!menu);
                setShowMenu(!showMenu);
            }}/>}
    </nav>
  )
}

export default Navbar
