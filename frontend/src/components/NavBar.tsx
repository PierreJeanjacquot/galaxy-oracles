import { useState } from "react";
import Logo from "./Logo";
import ConnectButton from "./ConnectButton";
import { Button } from "./ui/button";

function HomeMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="navbar  top-0 left-0 z-50 w-full border-stroke bg-violet-400 duration-300 mb-20">
      <div className="container relative lg:max-w-[1305px] lg:px-10">
        <div className="flex items-center justify-between">
          <div className="block py-4 lg:py-0">
            <a href="/" className="block max-w-[145px] sm:max-w-[180px] ">
              <Logo className="text-yellow-400" width={100} height={100} />
            </a>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="navbarOpen absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center space-y-[6px] font-bold lg:hidden"
            aria-label="navbarOpen"
            name="navbarOpen"
          >
            <span className="block h-[2px] w-7 bg-black "></span>
            <span className="block h-[2px] w-7 bg-black "></span>
            <span className="block h-[2px] w-7 bg-black "></span>
          </button>

          <div
            className={`menu-wrapper relative ${
              isOpen ? "" : "hidden"
            } justify-between lg:flex`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="navbarClose fixed top-10 right-10 z-[9999] flex h-10 w-10 flex-col items-center justify-center font-bold lg:hidden"
              name="navbarClose"
              aria-label="navbarClose"
            >
              <span className="block h-[2px] w-7 rotate-45 bg-black "></span>
              <span className="-mt-[2px] block h-[2px] w-7 -rotate-45 bg-black "></span>
            </button>

            <nav className="fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-white bg-opacity-95 text-center backdrop-blur-sm lg:static lg:h-auto lg:w-max lg:bg-transparent lg:backdrop-blur-none ">
              <ul className="items-center space-y-3 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-10">
                <li className="menu-item">
                  <Button
                    asChild
                    variant="link"
                    className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7"
                  >
                    <a href="/create">Create</a>
                  </Button>
                </li>
                <li className="menu-item">
                  <Button
                    asChild
                    variant="link"
                    className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7"
                  >
                    <a href="/oracles">Gallery</a>
                  </Button>
                </li>
                <li className="menu-item">
                  <Button
                    asChild
                    variant="link"
                    className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7"
                  >
                    <a href="/oracle/1">My Oracle</a>
                  </Button>
                </li>
                <li className="menu-item">
                  <Button
                    asChild
                    variant="link"
                    className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-redpraha   lg:py-7"
                  >
                    <a href="#team">Contact</a>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mr-8 flex items-center justify-end lg:mr-0">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HomeMenu;
